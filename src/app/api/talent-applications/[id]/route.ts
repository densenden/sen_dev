import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'

import { getServiceSupabase } from '@/lib/server/supabase-admin'
import { updateTalentApplication, type TalentApplicationUpdate, normalizeAttachments, type TalentApplicationAttachment } from '@/lib/talent-applications'
import type { Database } from '@/lib/supabase'
import JobApplicationRejectionUser from '@/emails/job-application-rejection-user'

const resend = new Resend(process.env.RESEND_API_KEY)
const DEV_EMAIL = process.env.JOB_APPLICATION_SENDER || 'Studio Sen <dev@sen.studio>'

const STATUS_VALUES = ['new', 'reviewing', 'interview', 'offer', 'hired', 'rejected', 'archived'] as const

type StatusValue = (typeof STATUS_VALUES)[number]

type TalentApplication = Database['public']['Tables']['talent_applications']['Row'] & {
  attachments: TalentApplicationAttachment[]
}

function isValidStatus(value: unknown): value is StatusValue {
  return typeof value === 'string' && STATUS_VALUES.includes(value as StatusValue)
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json({ error: 'Missing application id' }, { status: 400 })
    }

    const client = getServiceSupabase()
    
    const { data, error } = await client
      .from('talent_applications')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Application not found', details: error.message },
        { status: 404 }
      )
    }

    const application: TalentApplication = {
      ...data,
      attachments: normalizeAttachments(data.attachments)
    }

    return NextResponse.json({ data: application })
  } catch (error) {
    console.error('Failed to fetch talent application:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to fetch application', details: errorMessage },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'Missing application id' }, { status: 400 })
  }

  try {
    const body = await request.json()
    const updates: TalentApplicationUpdate = {}

    if ('status' in body) {
      if (!isValidStatus(body.status)) {
        return NextResponse.json({ error: 'Invalid status value' }, { status: 400 })
      }
      updates.status = body.status as StatusValue
    }

    if ('notes' in body) {
      if (body.notes !== null && typeof body.notes !== 'string') {
        return NextResponse.json({ error: 'Notes must be a string or null' }, { status: 400 })
      }
      updates.notes = body.notes
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }

    const client = getServiceSupabase()

    // Fetch current application to check status change and get applicant details
    const { data: currentApp, error: fetchError } = await client
      .from('talent_applications')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !currentApp) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    const previousStatus = currentApp.status
    const newStatus = updates.status

    // Update the application
    const data = await updateTalentApplication(client, id, updates)
    const application: TalentApplication = {
      ...data,
      attachments: normalizeAttachments(data.attachments)
    }

    // Send rejection email if status changed to 'rejected'
    if (newStatus === 'rejected' && previousStatus !== 'rejected') {
      try {
        const locale = (currentApp.locale === 'de' ? 'de' : 'en') as 'en' | 'de'
        const rejectionEmailHtml = await render(JobApplicationRejectionUser({
          name: currentApp.name,
          jobTitle: currentApp.job_title,
          locale
        }))

        await resend.emails.send({
          from: DEV_EMAIL,
          to: [currentApp.email],
          subject: locale === 'de'
            ? `Update zu deiner Bewerbung bei Studio Sen`
            : `Update on your application at Studio Sen`,
          html: rejectionEmailHtml
        })

        console.log(`Rejection email sent to ${currentApp.email} for application ${id}`)
      } catch (emailError) {
        console.error(`Failed to send rejection email for application ${id}:`, emailError)
        // Don't fail the request if email fails - the status was already updated
      }
    }

    return NextResponse.json({ data: application })
  } catch (error) {
    console.error(`Failed to update talent application ${id}:`, error)
    return NextResponse.json({ error: 'Failed to update talent application' }, { status: 500 })
  }
}

