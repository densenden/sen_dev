import fs from 'node:fs'
import path from 'node:path'

import React from 'react'
import { renderToFile } from '@react-pdf/renderer'

import { CVDocument } from '@/lib/pdf/CVDocument'
import { CoverLetterDocument } from '@/lib/pdf/CoverLetterDocument'
import { sampleCVData, sampleCoverLetterData } from '@/lib/pdf/sample-data'

const projectRoot = process.cwd()
const publicDir = path.join(projectRoot, 'public')
const prototypesDir = path.join(publicDir, 'prototypes')

if (!fs.existsSync(prototypesDir)) {
  fs.mkdirSync(prototypesDir, { recursive: true })
}

const portraitPath = path.join(publicDir, 'denis.png')

async function generatePrototypes() {
  const cvOutputPath = path.join(prototypesDir, 'cv-prototype.pdf')
  const coverLetterOutputPath = path.join(prototypesDir, 'cover-letter-prototype.pdf')
  const signaturePath = path.join(publicDir, 'Unterschrift_Denis-Kreuzer_DK.png')
  const creationDate = new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  const cvElement = React.createElement(CVDocument, {
    data: sampleCVData,
    portraitUrl: portraitPath,
    creationDate
  })

  const coverElement = React.createElement(CoverLetterDocument, {
    data: sampleCoverLetterData,
    signatureUrl: signaturePath
  })

  await renderToFile(cvElement, cvOutputPath)
  await renderToFile(coverElement, coverLetterOutputPath)

  console.log('Generated PDF prototypes:')
  console.log(` - ${path.relative(projectRoot, cvOutputPath)}`)
  console.log(` - ${path.relative(projectRoot, coverLetterOutputPath)}`)
}

generatePrototypes().catch((error) => {
  console.error('Failed to generate prototypes', error)
  process.exit(1)
})
