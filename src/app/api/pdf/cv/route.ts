import path from 'node:path'
import { spawn } from 'node:child_process'

import { NextResponse } from 'next/server'

import { sampleCVData } from '@/lib/pdf/sample-data'
import type { CVData, CVProjectEntry } from '@/lib/pdf/types'
import type { Database } from '@/lib/supabase'
import { getServiceSupabase } from '@/lib/server/supabase-admin'
import { uploadJobDocument } from '@/lib/storage'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_PROJECT_SELECTION = 4

type ProjectRow = Database['public']['Tables']['projects']['Row']

function resolvePortraitUrl(input?: string | null) {
  if (input) {
    return input
  }

  // Use public URL - file paths don't work on Vercel serverless
  return 'https://dev.sen.studio/denis.png'
}

function mapProjectToCvEntry(project: ProjectRow): CVProjectEntry {
  const techStack = Array.isArray(project.tech_stack)
    ? Array.from(new Set(project.tech_stack.filter((item): item is string => Boolean(item && item.trim()))))
    : []

  const screenshots = Array.isArray(project.screenshots) ? project.screenshots : []
  const caseStudyUrl = project.slug ? `https://dev.sen.studio/projects/${project.slug}` : undefined
  const liveUrl = project.link_live || undefined
  const createdYear = project.created_at ? new Date(project.created_at).getFullYear().toString() : undefined

  return {
    title: project.title,
    summary: project.summary,
    techStack,
    year: createdYear,
    caseStudyUrl,
    liveUrl,
    thumbnail: screenshots.length > 0 ? screenshots[0] : undefined
  }
}

async function loadSelectedProjects(projectIds: string[]): Promise<CVProjectEntry[]> {
  if (projectIds.length === 0) {
    return []
  }

  try {
    const supabase = getServiceSupabase()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .in('id', projectIds)

    if (error) {
      console.error('Failed to fetch projects for CV PDF:', error)
      return []
    }

    if (!data) {
      return []
    }

    const projectMap = new Map<string, ProjectRow>()
    for (const project of data as ProjectRow[]) {
      projectMap.set(project.id, project)
    }

    const ordered = projectIds
      .map((projectId) => projectMap.get(projectId))
      .filter((project): project is ProjectRow => Boolean(project))
      .slice(0, MAX_PROJECT_SELECTION)

    return ordered.map(mapProjectToCvEntry)
  } catch (error) {
    console.error('Unexpected error while loading selected projects for CV PDF:', error)
    return []
  }
}

// External PDF service (Railway/Render deployment)
async function renderPdfExternal(data: CVData, portraitUrl?: string): Promise<Buffer> {
  const serviceUrl = process.env.PDF_SERVICE_URL
  if (!serviceUrl) {
    throw new Error('PDF_SERVICE_URL not configured')
  }

  const response = await fetch(`${serviceUrl}/api/pdf/cv`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data, portraitUrl })
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `PDF service returned ${response.status}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

// Direct rendering fallback
async function renderPdfDirect(data: CVData, portraitUrl?: string): Promise<Buffer> {
  try {
    const { renderCvPdf } = await import('@/lib/pdf/CVDocument')
    return await renderCvPdf(data, portraitUrl)
  } catch (error) {
    console.error('Direct PDF rendering failed:', error)
    throw new Error(`Failed to render PDF: ${error instanceof Error ? error.message : String(error)}`)
  }
}

function renderPdfWithChildProcess(payload: Record<string, unknown>): Promise<Buffer> {
  const scriptPath = path.resolve(process.cwd(), 'scripts/render-pdf.tsx')

  // Use tsx from node_modules for both dev and production
  const tsxPath = path.resolve(process.cwd(), 'node_modules', '.bin', 'tsx')
  const executable = tsxPath
  const args = [scriptPath, 'cv']

  return new Promise((resolveBuffer, reject) => {
    const child = spawn(executable, args, {
      stdio: ['pipe', 'pipe', 'pipe']
    })

    const stdoutChunks: Buffer[] = []
    let stderr = ''

    child.stdout.on('data', (chunk) => {
      stdoutChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
    })

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString()
    })

    child.on('error', (error) => reject(error))

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(stderr || `PDF renderer exited with code ${code}`))
        return
      }

      try {
        const base64 = Buffer.concat(stdoutChunks).toString('utf8').trim()
        resolveBuffer(Buffer.from(base64, 'base64'))
      } catch (error) {
        reject(error)
      }
    })

    child.stdin.write(JSON.stringify(payload))
    child.stdin.end()
  })
}

// Choose rendering method based on environment
async function renderPdf(data: CVData, portraitUrl?: string): Promise<Buffer> {
  // Use external PDF service if configured (recommended for Vercel)
  if (process.env.PDF_SERVICE_URL) {
    return renderPdfExternal(data, portraitUrl)
  }

  // On Vercel or production, try direct import
  const useDirectImport = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'

  if (useDirectImport) {
    return renderPdfDirect(data, portraitUrl)
  }

  // Fallback to child process in development
  return renderPdfWithChildProcess({ data, portraitUrl })
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const baseData = (body?.data as CVData | undefined) ?? sampleCVData
    const projectIds = Array.isArray(body?.project_ids)
      ? body.project_ids.filter((id: unknown): id is string => typeof id === 'string' && id.length > 0)
      : []
    const jobId = body?.job_id as string | undefined

    let projects = baseData.projects

    if (projectIds.length > 0) {
      const selected = await loadSelectedProjects(projectIds)
      if (selected.length > 0) {
        projects = selected
      }
    }

    const data: CVData = {
      ...baseData,
      projects
    }
    const portraitUrl = resolvePortraitUrl(body?.portraitUrl)

    const buffer = await renderPdf(data, portraitUrl)

    // If job_id is provided, store the PDF in the bucket and update the job record
    if (jobId) {
      try {
        const uploadResult = await uploadJobDocument(jobId, 'cv', buffer, 'cv.pdf')
        
        if (uploadResult) {
          // Update the job application record with the new CV path
          const supabase = getServiceSupabase()
          const { error: updateError } = await (supabase
            .from('job_applications') as any)
            .update({ cv_path: uploadResult.path })
            .eq('id', jobId)

          if (updateError) {
            console.error('Failed to update job with CV path:', updateError)
          }

          return NextResponse.json({
            success: true,
            path: uploadResult.path,
            url: uploadResult.url
          })
        } else {
          throw new Error('Failed to upload CV to storage')
        }
      } catch (storageError) {
        console.error('Failed to store CV PDF:', storageError)
        return NextResponse.json({ error: 'Failed to store CV PDF' }, { status: 500 })
      }
    }

    // Return PDF directly if no job_id provided (preview mode)
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="cv-preview.pdf"'
      }
    })
  } catch (error) {
    console.error('Failed to generate CV PDF:', error)
    const message = error instanceof Error ? error.message : 'Failed to generate CV PDF'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}