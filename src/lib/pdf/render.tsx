import React from 'react'

import { CVDocument } from './CVDocument'
import { CoverLetterDocument } from './CoverLetterDocument'
import { ensurePdfFonts } from './fonts'
import type { CVData, CoverLetterData } from './types'

// Keep React in scope for JSX
void React

async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  const chunks: Uint8Array[] = []
  for await (const chunk of stream) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export async function renderCoverLetterPdf(
  data: CoverLetterData,
  signatureUrl?: string
): Promise<Buffer> {
  const { renderToStream } = await import('@react-pdf/renderer')
  await ensurePdfFonts()
  const stream = await renderToStream(<CoverLetterDocument data={data} signatureUrl={signatureUrl} />)
  return streamToBuffer(stream)
}

export async function renderCvPdf(
  data: CVData,
  portraitUrl?: string
): Promise<Buffer> {
  const { renderToStream } = await import('@react-pdf/renderer')
  await ensurePdfFonts()
  const stream = await renderToStream(<CVDocument data={data} portraitUrl={portraitUrl} />)
  return streamToBuffer(stream)
}
