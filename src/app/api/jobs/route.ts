import { NextResponse } from 'next/server'

import { fetchJobApplications, insertJobApplication } from '@/lib/jobs'
import { getServiceSupabase } from '@/lib/server/supabase-admin'
import { loadLocalJobApplications, saveLocalJobApplication } from '@/lib/server/job-local-store'

export async function GET() {
  try {
    const client = getServiceSupabase()
    const applications = await fetchJobApplications(client)
    if (applications.length > 0) {
      return NextResponse.json({ data: applications })
    }
  } catch (error) {
    console.error('Failed to load job applications:', error)
  }

  try {
    const localApps = await loadLocalJobApplications()
    return NextResponse.json({ data: localApps })
  } catch (error) {
    console.error('Failed to load local job applications:', error)
    return NextResponse.json({ error: 'Failed to load job applications' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const client = getServiceSupabase()
    const body = await request.json()

    if (!body.role || !body.company) {
      return NextResponse.json({ error: 'Role and company are required' }, { status: 400 })
    }

    const payload = {
      role: body.role as string,
      company: body.company as string,
      job_url: body.job_url ?? null,
      status: body.status ?? 'pending',
      applied_at: body.applied_at ?? null,
      contact_name: body.contact_name ?? null,
      contact_email: body.contact_email ?? null,
      location: body.location ?? null,
      notes: body.notes ?? null,
      job_description: body.job_description ?? null,
      cv_path: body.cv_path ?? null,
      cover_letter_path: body.cover_letter_path ?? null,
      zip_path: body.zip_path ?? null,
      scraped_at: body.scraped_at ?? null,
      gpt_model: body.gpt_model ?? null,
      project_ids: Array.isArray(body.project_ids) ? body.project_ids : []
    }

    const { data, error, warning, projectIds } = await insertJobApplication(client, payload)

    if (error) {
      const message = error.message || ''
      if (message.includes('Could not find the table')) {
        const localRecord = await saveLocalJobApplication(payload)
        return NextResponse.json({
          data: localRecord,
          warning: 'Supabase table missing. Stored locally.'
        })
      }
      return NextResponse.json({ error: message || 'Failed to create job application' }, { status: 400 })
    }

    return NextResponse.json({
      data: {
        ...data,
        projectIds: projectIds ?? payload.project_ids ?? []
      },
      warning: warning?.message
    })
  } catch (error) {
    console.error('Failed to create job application:', error)
    return NextResponse.json({ error: 'Failed to create job application' }, { status: 500 })
  }
}
