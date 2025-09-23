import path from 'node:path'
import { spawn } from 'node:child_process'

import { NextResponse } from 'next/server'

import { sampleCoverLetterData } from '@/lib/pdf/sample-data'
import type { CoverLetterData } from '@/lib/pdf/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function renderPdfWithChildProcess(payload: Record<string, unknown>): Promise<Buffer> {
  const scriptPath = path.resolve(process.cwd(), 'scripts/render-pdf.tsx')
  const tsxExecutable = path.resolve(
    process.cwd(),
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'tsx.cmd' : 'tsx'
  )

  return new Promise((resolveBuffer, reject) => {
    const child = spawn(tsxExecutable, [scriptPath, 'cover-letter'], {
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

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const incoming = (body?.data as CoverLetterData | undefined) ?? sampleCoverLetterData
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

    const signaturePath = body?.signatureUrl || `${process.cwd()}/public/Unterschrift_Denis-Kreuzer_DK.png`
    const buffer = await renderPdfWithChildProcess({
      data,
      signatureUrl: signaturePath
    })

    return new NextResponse(buffer, {
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
