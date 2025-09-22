import path from 'node:path'

import React from 'react'
import { NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'

import { CVDocument } from '@/lib/pdf/CVDocument'
import { sampleCVData } from '@/lib/pdf/sample-data'
import type { CVData } from '@/lib/pdf/types'

function resolvePortraitUrl(input?: string | null) {
  if (input) {
    return input
  }

  return path.join(process.cwd(), 'public', 'denis.png')
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const data = (body?.data as CVData | undefined) ?? sampleCVData
    const portraitUrl = resolvePortraitUrl(body?.portraitUrl)

    const element = React.createElement(CVDocument, {
      data,
      portraitUrl
    })

    const buffer = await renderToBuffer(element)

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="cv-preview.pdf"'
      }
    })
  } catch (error) {
    console.error('Failed to generate CV PDF:', error)
    return NextResponse.json({ error: 'Failed to generate CV PDF' }, { status: 500 })
  }
}
