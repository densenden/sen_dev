import { randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'

import type { JobApplicationInsert, JobApplicationRow } from '@/lib/jobs'

const STORE_PATH = path.join(process.cwd(), 'tmp', 'job-applications.json')

export interface LocalJobApplication extends JobApplicationRow {
  projectIds: string[]
}

async function readStore(): Promise<LocalJobApplication[]> {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return parsed as LocalJobApplication[]
    }
    return []
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === 'ENOENT') {
      return []
    }
    throw error
  }
}

async function writeStore(entries: LocalJobApplication[]) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true })
  await fs.writeFile(STORE_PATH, JSON.stringify(entries, null, 2), 'utf8')
}

function ensureIsoString(value: string | null | undefined) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return null
  }
  return date.toISOString()
}

export async function saveLocalJobApplication(
  input: JobApplicationInsert & { project_ids?: string[] }
): Promise<LocalJobApplication> {
  const now = new Date().toISOString()
  const projectIds = Array.isArray(input.project_ids) ? [...input.project_ids] : []

  const record: LocalJobApplication = {
    id: randomUUID(),
    role: input.role,
    company: input.company,
    job_url: input.job_url ?? null,
    status: input.status ?? 'pending',
    applied_at: ensureIsoString(input.applied_at) ?? now,
    contact_name: input.contact_name ?? null,
    contact_email: input.contact_email ?? null,
    location: input.location ?? null,
    notes: input.notes ?? null,
    job_description: input.job_description ?? null,
    cv_path: input.cv_path ?? null,
    cover_letter_path: input.cover_letter_path ?? null,
    zip_path: input.zip_path ?? null,
    scraped_at: ensureIsoString(input.scraped_at),
    gpt_model: input.gpt_model ?? null,
    created_at: now,
    updated_at: now,
    projectIds
  }

  const entries = await readStore()
  entries.unshift(record)
  await writeStore(entries)

  return record
}

export async function loadLocalJobApplications(): Promise<LocalJobApplication[]> {
  return readStore()
}
