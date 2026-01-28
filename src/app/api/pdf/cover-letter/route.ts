import path from 'node:path'
import { spawn } from 'node:child_process'

import { NextResponse } from 'next/server'

import { sampleCoverLetterData } from '@/lib/pdf/sample-data'
import type { CoverLetterData } from '@/lib/pdf/types'
import { getServiceSupabase } from '@/lib/server/supabase-admin'
import { uploadJobDocument } from '@/lib/storage'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type PdfVariant = 'tech' | 'gastronomy'

// External PDF service (Railway/Render deployment)
async function renderPdfExternal(data: CoverLetterData, signatureUrl?: string): Promise<Buffer> {
  const serviceUrl = process.env.PDF_SERVICE_URL
  if (!serviceUrl) {
    throw new Error('PDF_SERVICE_URL not configured')
  }

  const response = await fetch(`${serviceUrl}/api/pdf/cover-letter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data, signatureUrl })
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `PDF service returned ${response.status}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

// Direct rendering fallback
async function renderPdfDirect(data: CoverLetterData, signatureUrl?: string, variant?: PdfVariant): Promise<Buffer> {
  try {
    const { renderCoverLetterPdf } = await import('@/lib/pdf/CoverLetterDocument')
    return await renderCoverLetterPdf(data, signatureUrl, variant)
  } catch (error) {
    console.error('Direct PDF rendering failed:', error)
    throw new Error(`Failed to render PDF: ${error instanceof Error ? error.message : String(error)}`)
  }
}

async function renderPdfWithChildProcess(payload: Record<string, unknown>): Promise<Buffer> {
  const scriptPath = path.resolve(process.cwd(), 'scripts/render-pdf.cjs')

  // Use pre-compiled CJS bundle — no tsx needed at runtime
  const executable = process.execPath
  const args = [scriptPath, 'cover-letter']

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

    child.on('error', (error) => {
      reject(error)
    })

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
async function renderPdf(data: CoverLetterData, signatureUrl?: string, variant?: PdfVariant): Promise<Buffer> {
  // Use external PDF service if configured (recommended for Vercel)
  if (process.env.PDF_SERVICE_URL) {
    return renderPdfExternal(data, signatureUrl)
  }

  // Use child process to avoid React/JSX conflicts with Next.js bundler
  return renderPdfWithChildProcess({ data, signatureUrl, variant })
}


export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const incoming = (body?.data as CoverLetterData | undefined) ?? sampleCoverLetterData
    const jobId = body?.job_id as string | undefined
    const variant: PdfVariant | undefined = body?.job_type === 'gastronomy' ? 'gastronomy' : undefined

    const data: CoverLetterData = {
      ...incoming,
      applicant: incoming.applicant ?? sampleCoverLetterData.applicant,
      recipient: {
        ...sampleCoverLetterData.recipient,
        ...incoming.recipient
      },
      subject: incoming.subject || sampleCoverLetterData.subject,
      date:
        incoming.date ||
        new Intl.DateTimeFormat('de-DE', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }).format(new Date()),
      body:
        typeof incoming.body === 'string' && incoming.body.trim().length > 0
          ? incoming.body
          : sampleCoverLetterData.body
    }

    // Use public URL for signature - file paths don't work on Vercel serverless
    const signatureUrl = body?.signatureUrl || 'https://dev.sen.studio/Unterschrift_Denis-Kreuzer_DK.png'
    const buffer = await renderPdf(data, signatureUrl, variant)

    // If job_id is provided, store the PDF in the bucket and update the job record
    if (jobId) {
      try {
        const uploadResult = await uploadJobDocument(jobId, 'cover_letter', buffer, 'cover-letter.pdf')

        if (uploadResult) {
          // Update the job application record with the new cover letter path
          const supabase = getServiceSupabase()
          const { error: updateError } = await (supabase
            .from('job_applications') as any)
            .update({ cover_letter_path: uploadResult.path })
            .eq('id', jobId)

          if (updateError) {
            console.error('Failed to update job with cover letter path:', updateError)
          }

          return NextResponse.json({
            success: true,
            path: uploadResult.path,
            url: uploadResult.url
          })
        } else {
          throw new Error('Failed to upload cover letter to storage')
        }
      } catch (storageError) {
        console.error('Failed to store cover letter PDF:', storageError)
        return NextResponse.json({ error: 'Failed to store cover letter PDF' }, { status: 500 })
      }
    }

    // Return PDF directly if no job_id provided (preview mode)
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="cover-letter-preview.pdf"'
      }
    })
  } catch (error) {
    console.error('Failed to generate cover letter PDF:', error)
    const message = error instanceof Error ? error.message : 'Failed to generate cover letter PDF'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
