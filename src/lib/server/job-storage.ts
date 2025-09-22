import { getServiceSupabase } from '@/lib/server/supabase-admin'

export type JobAssetType = 'cv' | 'cover-letter' | 'zip'

function buildObjectPath(jobId: string, type: JobAssetType, extension = 'pdf') {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  return `${jobId}/${type}-${timestamp}.${extension}`
}

export async function uploadJobAsset(jobId: string, type: JobAssetType, data: ArrayBuffer | Uint8Array, contentType: string) {
  const client = getServiceSupabase()
  const path = buildObjectPath(jobId, type, contentType === 'application/zip' ? 'zip' : 'pdf')

  const payload = data instanceof Uint8Array ? data : new Uint8Array(data)

  const { error } = await client.storage.from('job').upload(path, payload, {
    contentType,
    upsert: true
  })

  if (error) {
    throw error
  }

  return path
}

export async function updateJobAssetPath(jobId: string, fields: Partial<Record<JobAssetType, string>>) {
  const client = getServiceSupabase()

  const payload: Record<string, string | null> = {}
  if (fields['cv']) payload.cv_path = fields['cv']
  if (fields['cover-letter']) payload.cover_letter_path = fields['cover-letter']
  if (fields['zip']) payload.zip_path = fields['zip']

  const { error } = await client
    .from('job_applications')
    .update(payload)
    .eq('id', jobId)

  if (error) {
    throw error
  }
}

export async function createSignedJobUrl(path: string, expiresInSeconds = 60 * 60) {
  const client = getServiceSupabase()
  const { data, error } = await client.storage.from('job').createSignedUrl(path, expiresInSeconds)

  if (error) {
    throw error
  }

  return data.signedUrl
}
