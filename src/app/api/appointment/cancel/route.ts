import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const appointmentId = searchParams.get('id')

  if (!appointmentId) {
    return NextResponse.json({ error: 'Missing appointment ID' }, { status: 400 })
  }

  // Redirect to the cancel page
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dev.sen.studio'
  return NextResponse.redirect(`${baseUrl}/appointment/cancel/${appointmentId}`)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { appointmentId, reason } = body

    if (!appointmentId) {
      return NextResponse.json({ error: 'Missing appointment ID' }, { status: 400 })
    }

    // Create admin Supabase client for database operations
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get appointment details first
    const { data: appointment, error: fetchError } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .single()

    if (fetchError || !appointment) {
      console.error('Error fetching appointment:', fetchError)
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
    }

    // Update appointment status to cancelled
    const { error: updateError } = await supabase
      .from('appointments')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('id', appointmentId)

    if (updateError) {
      console.error('Error cancelling appointment:', updateError)
      return NextResponse.json({ error: 'Failed to cancel appointment' }, { status: 500 })
    }

    // Send notification email to admin about the cancellation
    await resend.emails.send({
      from: 'dev@sen.studio',
      to: ['dev@sen.studio'],
      subject: `❌ Appointment cancelled: ${appointment.name}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #dc2626; margin-bottom: 20px;">Appointment Cancelled</h2>
          <p>An appointment has been cancelled:</p>
          <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <ul style="margin: 0; padding-left: 20px;">
              <li><strong>Client:</strong> ${appointment.name}</li>
              <li><strong>Email:</strong> ${appointment.email}</li>
              <li><strong>Date:</strong> ${appointment.appointment_date}</li>
              <li><strong>Time:</strong> ${appointment.appointment_time}</li>
              <li><strong>Method:</strong> ${appointment.preferred_contact}</li>
              ${reason ? `<li><strong>Reason:</strong> ${reason}</li>` : ''}
              <li><strong>Cancelled at:</strong> ${new Date().toLocaleString()}</li>
            </ul>
          </div>
          <p style="color: #666; font-size: 14px;">
            The appointment slot is now available for other bookings.
          </p>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in cancel endpoint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}