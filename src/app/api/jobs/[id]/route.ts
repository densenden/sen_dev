import { NextResponse } from 'next/server'

import { updateJobApplication } from '@/lib/jobs'
import { getServiceSupabase } from '@/lib/server/supabase-admin'

async function fetchJobApplication(client: ReturnType<typeof getServiceSupabase>, id: string) {
  const { data, error } = await client
    .from('job_applications')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw error
  }

  const { data: relations, error: relationError } = await client
    .from('job_application_projects')
    .select('project_id')
    .eq('job_application_id', id)

  if (relationError) {
    throw relationError
  }

  return {
    ...data,
    projectIds: relations?.map((row) => row.project_id) ?? []
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const client = getServiceSupabase()
    const application = await fetchJobApplication(client, id)
    return NextResponse.json({ data: application })
  } catch (error) {
    console.error('Failed to load job application:', error)
    return NextResponse.json({ error: 'Failed to load job application' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const client = getServiceSupabase()
    const body = await request.json()

    const payload = {
      role: body.role,
      company: body.company,
      job_url: body.job_url,
      status: body.status,
      applied_at: body.applied_at,
      contact_name: body.contact_name,
      contact_email: body.contact_email,
      location: body.location,
      notes: body.notes,
      job_description: body.job_description,
      cv_path: body.cv_path,
      cover_letter_path: body.cover_letter_path,
      zip_path: body.zip_path,
      scraped_at: body.scraped_at,
      gpt_model: body.gpt_model,
      project_ids: Array.isArray(body.project_ids) ? body.project_ids : undefined
    }

    const { data, error, warning, projectIds } = await updateJobApplication(id, client, payload)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      data: {
        ...data,
        projectIds: projectIds ?? payload.project_ids ?? []
      },
      warning: warning?.message
    })
  } catch (error) {
    console.error('Failed to update job application:', error)
    return NextResponse.json({ error: 'Failed to update job application' }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const client = getServiceSupabase()
    const { error } = await client
      .from('job_applications')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete job application:', error)
    return NextResponse.json({ error: 'Failed to delete job application' }, { status: 500 })
  }
}
