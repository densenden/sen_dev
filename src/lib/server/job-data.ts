import { getServiceSupabase } from '@/lib/server/supabase-admin'
import type { JobApplication } from '@/lib/jobs'

export async function getJobApplication(id: string): Promise<JobApplication | null> {
  const client = getServiceSupabase()

  const { data, error } = await client
    .from('job_applications')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    console.error('Failed to fetch job application:', error)
    return null
  }

  const { data: relations, error: relationsError } = await client
    .from('job_application_projects')
    .select('project_id')
    .eq('job_application_id', id)

  if (relationsError) {
    console.error('Failed to fetch job application projects:', relationsError)
    return {
      ...data,
      projectIds: []
    }
  }

  return {
    ...data,
    projectIds: relations?.map((row) => row.project_id) ?? []
  }
}
