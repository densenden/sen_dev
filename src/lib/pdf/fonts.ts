import path from 'node:path'
import fs from 'node:fs'

// Bundled TTF files – no external fetch at runtime
const fontsDir = path.join(process.cwd(), 'src', 'lib', 'pdf', 'fonts')

let fontsRegistered = false

export async function ensurePdfFonts() {
  if (fontsRegistered) return

  // Use require to avoid ESM/CJS React version conflicts
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Font } = require('@react-pdf/renderer')

  const regularBuf = fs.readFileSync(path.join(fontsDir, 'Inter-Regular.ttf'))
  const semiBoldBuf = fs.readFileSync(path.join(fontsDir, 'Inter-SemiBold.ttf'))

  Font.register({
    family: 'Inter',
    fonts: [
      {
        src: `data:font/ttf;base64,${regularBuf.toString('base64')}`,
        fontWeight: 400
      },
      {
        src: `data:font/ttf;base64,${semiBoldBuf.toString('base64')}`,
        fontWeight: 600
      }
    ]
  })

  fontsRegistered = true
}
