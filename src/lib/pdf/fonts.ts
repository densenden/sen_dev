import path from 'node:path'
import fontkit from '@react-pdf/fontkit'
import { Font } from '@react-pdf/renderer'

const interVariable = path.join(process.cwd(), 'node_modules', 'typeface-inter', 'Inter Variable', 'Inter.ttf')

let fontsRegistered = false

export function ensurePdfFonts() {
  if (fontsRegistered) return

  Font.register(
    {
      family: 'Inter',
      fonts: [
        {
          src: interVariable,
          fontWeight: 400
        },
        {
          src: interVariable,
          fontWeight: 600
        }
      ]
    },
    { fontkit }
  )

  fontsRegistered = true
}
