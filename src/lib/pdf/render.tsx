import React from 'react'

import { CVDocument } from './CVDocument'
import { CoverLetterDocument } from './CoverLetterDocument'
import { ensurePdfFonts } from './fonts'
import type { CVData, CoverLetterData } from './types'

// Keep React in scope for JSX
void React

export async function renderCoverLetterPdf(
  data: CoverLetterData,
  signatureUrl?: string
): Promise<Buffer> {
  const { pdf } = await import('@react-pdf/renderer')
  await ensurePdfFonts()
  const doc = pdf(<CoverLetterDocument data={data} signatureUrl={signatureUrl} />)
  return doc.toBuffer()
}

export async function renderCvPdf(
  data: CVData,
  portraitUrl?: string
): Promise<Buffer> {
  const { pdf } = await import('@react-pdf/renderer')
  await ensurePdfFonts()
  const doc = pdf(<CVDocument data={data} portraitUrl={portraitUrl} />)
  return doc.toBuffer()
}
