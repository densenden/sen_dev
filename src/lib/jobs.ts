import type { PostgrestError, SupabaseClient } from '@supabase/supabase-js'

import type { Database } from '@/lib/supabase'

export type JobApplicationRow = Database['public']['Tables']['job_applications']['Row']
export type JobApplicationInsert = Database['public']['Tables']['job_applications']['Insert']
export type JobApplicationUpdate = Database['public']['Tables']['job_applications']['Update']

export interface JobApplication extends JobApplicationRow {
  projectIds: string[]
}

export async function fetchJobApplications(client: SupabaseClient<Database>): Promise<JobApplication[]> {
  const { data, error } = await client
    .from('job_applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data?.length) {
    if (error) {
      console.error('Failed to load job applications:', error)
    }
    return []
  }

  const { data: relations, error: relationsError } = await client
    .from('job_application_projects')
    .select('job_application_id, project_id')
    .in(
      'job_application_id',
      data.map((app) => app.id)
    )

  if (relationsError) {
    console.error('Failed to load job application projects:', relationsError)
  }

  const projectMap = new Map<string, string[]>()
  relations?.forEach((row) => {
    const list = projectMap.get(row.job_application_id) ?? []
    list.push(row.project_id)
    projectMap.set(row.job_application_id, list)
  })

  return data.map((application) => ({
    ...application,
    projectIds: projectMap.get(application.id) ?? []
  }))
}

interface MutationResult<T> {
  data?: T
  projectIds?: string[]
  warning?: PostgrestError
  error?: PostgrestError | Error
}

export async function insertJobApplication(
  client: SupabaseClient<Database>,
  input: JobApplicationInsert & { project_ids?: string[] }
): Promise<MutationResult<JobApplicationRow>> {

  const { project_ids: projectIdsInput = [], ...payload } = input
  const projectIds = projectIdsInput

  const { data, error } = await client
    .from('job_applications')
    .insert(payload)
    .select()
    .single()

  if (error || !data) {
    return { error }
  }

  if (projectIds.length > 0) {
    const { error: linkError } = await client
      .from('job_application_projects')
      .insert(projectIds.map((projectId) => ({
        job_application_id: data.id,
        project_id: projectId
      })))

    if (linkError) {
      return { data, warning: linkError, projectIds: [] }
    }
  }

  return { data, projectIds }
}

export async function updateJobApplication(
  id: string,
  client: SupabaseClient<Database>,
  input: JobApplicationUpdate & { project_ids?: string[] }
): Promise<MutationResult<JobApplicationRow>> {
  const { project_ids: projectIdsInput, ...payload } = input
  const projectIds = projectIdsInput

  const { data, error } = await client
    .from('job_applications')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error || !data) {
    return { error }
  }

  if (projectIds) {
    const { error: deleteError } = await client
      .from('job_application_projects')
      .delete()
      .eq('job_application_id', id)

    if (deleteError) {
      return { data, warning: deleteError, projectIds: [] }
    }

    if (projectIds.length > 0) {
      const { error: insertError } = await client
        .from('job_application_projects')
        .insert(projectIds.map((projectId) => ({
          job_application_id: id,
          project_id: projectId
        })))

      if (insertError) {
        return { data, warning: insertError, projectIds: [] }
      }
    }
  }

  return { data, projectIds }
}
