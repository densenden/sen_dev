import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { register } from 'node:module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

register('ts-node/esm', pathToFileURL(projectRoot + '/'))

await import('./generate-job-pdf-prototypes.ts')
