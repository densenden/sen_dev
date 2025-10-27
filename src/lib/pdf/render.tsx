import 'server-only'

import React from 'react'
import { renderToBuffer } from '@react-pdf/renderer'

import { CVDocument } from './CVDocument'
import { CoverLetterDocument } from './CoverLetterDocument'
import { ensurePdfFonts } from './fonts'
import type { CVData, CoverLetterData } from './types'

export async function renderCoverLetterPdf(
  data: CoverLetterData,
  signatureUrl?: string
): Promise<Buffer> {
  ensurePdfFonts()
  const element = React.createElement(CoverLetterDocument, { data, signatureUrl })
  return renderToBuffer(element)
}

export async function renderCvPdf(
  data: CVData,
  portraitUrl?: string
): Promise<Buffer> {
  ensurePdfFonts()
  const element = React.createElement(CVDocument, { data, portraitUrl })
  return renderToBuffer(element)
}
