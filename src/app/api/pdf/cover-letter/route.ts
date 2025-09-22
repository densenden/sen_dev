import React from 'react'
import { NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'

import { CoverLetterDocument } from '@/lib/pdf/CoverLetterDocument'
import { sampleCoverLetterData } from '@/lib/pdf/sample-data'
import type { CoverLetterData } from '@/lib/pdf/types'

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const data = (body?.data as CoverLetterData | undefined) ?? sampleCoverLetterData
    const signaturePath = body?.signatureUrl || `${process.cwd()}/public/Unterschrift_Denis-Kreuzer_DK.png`

    const element = React.createElement(CoverLetterDocument, { data, signatureUrl: signaturePath })
    const buffer = await renderToBuffer(element)

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="cover-letter-preview.pdf"'
      }
    })
  } catch (error) {
    console.error('Failed to generate cover letter PDF:', error)
    return NextResponse.json({ error: 'Failed to generate cover letter PDF' }, { status: 500 })
  }
}
