import { stdin as input } from 'node:process'

import React from 'react'
import { renderToBuffer } from '@react-pdf/renderer'

// Keep React import active for JSX runtime when executed via tsx
void React

import { CVDocument } from '../src/lib/pdf/CVDocument'
import { CoverLetterDocument } from '../src/lib/pdf/CoverLetterDocument'
import { ensurePdfFonts } from '../src/lib/pdf/fonts'
import { sampleCoverLetterData, sampleCVData } from '../src/lib/pdf/sample-data'
import type { CVData, CoverLetterData } from '../src/lib/pdf/types'

type RenderType = 'cover-letter' | 'cv'

interface CoverLetterPayload {
  data?: CoverLetterData
  signatureUrl?: string
}

interface CVPayload {
  data?: CVData
  portraitUrl?: string
}

async function readPayload(): Promise<any> {
  const chunks: Uint8Array[] = []

  for await (const chunk of input) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  const raw = Buffer.concat(chunks).toString('utf8').trim()
  if (!raw) return {}

  try {
    return JSON.parse(raw)
  } catch (error) {
    throw new Error(`Failed to parse payload JSON: ${(error as Error).message}`)
  }
}

async function renderCoverLetter(payload: any) {
  const data = (payload?.data as CoverLetterData | undefined) ?? sampleCoverLetterData
  const signatureUrl = (payload?.signatureUrl as string | undefined) ?? undefined
  const element = <CoverLetterDocument data={data} signatureUrl={signatureUrl} />
  return renderToBuffer(element)
}

async function renderCv(payload: any) {
  const data = (payload?.data as CVData | undefined) ?? sampleCVData
  const portraitUrl = payload?.portraitUrl as string | undefined
  const element = <CVDocument data={data} portraitUrl={portraitUrl} />
  return renderToBuffer(element)
}

// Export functions for direct use (Vercel-compatible)
export async function renderCoverLetterPdf(payload: CoverLetterPayload): Promise<Buffer> {
  await ensurePdfFonts()
  return renderCoverLetter(payload)
}

export async function renderCvPdf(payload: CVPayload): Promise<Buffer> {
  await ensurePdfFonts()
  return renderCv(payload)
}

async function main() {
  const type = process.argv[2] as RenderType | undefined
  if (type !== 'cover-letter' && type !== 'cv') {
    throw new Error(`Unsupported render type: ${type}`)
  }

  const payload = await readPayload()

  await ensurePdfFonts()

  const buffer = type === 'cover-letter' ? await renderCoverLetter(payload) : await renderCv(payload)
  const base64 = buffer.toString('base64')
  process.stdout.write(base64)
}

main().catch((error) => {
  const message = error instanceof Error ? error.stack || error.message : String(error)
  process.stderr.write(message)
  process.exitCode = 1
})
