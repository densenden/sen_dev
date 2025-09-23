import path from 'node:path'

import { spawn } from 'node:child_process'

import { NextResponse } from 'next/server'

import { sampleCVData } from '@/lib/pdf/sample-data'
import type { CVData } from '@/lib/pdf/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function resolvePortraitUrl(input?: string | null) {
  if (input) {
    return input
  }

  return path.join(process.cwd(), 'public', 'denis.png')
}

function renderPdfWithChildProcess(payload: Record<string, unknown>): Promise<Buffer> {
  const scriptPath = path.resolve(process.cwd(), 'scripts/render-pdf.tsx')
  const tsxExecutable = path.resolve(
    process.cwd(),
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'tsx.cmd' : 'tsx'
  )

  return new Promise((resolveBuffer, reject) => {
    const child = spawn(tsxExecutable, [scriptPath, 'cv'], {
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

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const data = (body?.data as CVData | undefined) ?? sampleCVData
    const portraitUrl = resolvePortraitUrl(body?.portraitUrl)

    const buffer = await renderPdfWithChildProcess({
      data,
      portraitUrl
    })

    return new NextResponse(buffer, {
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
