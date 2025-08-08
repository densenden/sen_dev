import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import AppointmentReminder from '@/emails/appointment-reminder'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    // Calculate the time 2 hours from now
    const twoHoursFromNow = new Date()
    twoHoursFromNow.setHours(twoHoursFromNow.getHours() + 2)
    
    // Format for database query (considering date and time separately)
    const targetDate = twoHoursFromNow.toISOString().split('T')[0]
    const targetTime = twoHoursFromNow.toTimeString().split(' ')[0].substring(0, 5) // HH:MM format

    // Find appointments that are 2 hours away and haven't had reminders sent
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('status', 'scheduled')
      .eq('reminder_sent', false)
      .eq('appointment_date', targetDate)
      .gte('appointment_time', targetTime)
      .lt('appointment_time', `${String(twoHoursFromNow.getHours() + 1).padStart(2, '0')}:00`) // Within the next hour window

    if (error) {
      console.error('Error fetching appointments for reminders:', error)
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 })
    }

    const reminderResults = []

    for (const appointment of appointments || []) {
      try {
        // Send reminder email
        const emailResult = await resend.emails.send({
          from: 'dev@sen.studio',
          to: [appointment.email],
          subject: `Reminder: Your consultation is in 2 hours - SenDev`,
          react: AppointmentReminder({
            name: appointment.name,
            date: appointment.appointment_date,
            time: appointment.appointment_time,
            appointmentId: appointment.id,
          }),
        })

        if (emailResult.data) {
          // Mark reminder as sent
          await supabase
            .from('appointments')
            .update({ 
              reminder_sent: true,
              updated_at: new Date().toISOString()
            })
            .eq('id', appointment.id)

          reminderResults.push({
            appointmentId: appointment.id,
            email: appointment.email,
            status: 'sent',
            emailId: emailResult.data.id
          })
        } else {
          reminderResults.push({
            appointmentId: appointment.id,
            email: appointment.email,
            status: 'failed',
            error: emailResult.error
          })
        }
      } catch (emailError) {
        console.error(`Error sending reminder for appointment ${appointment.id}:`, emailError)
        reminderResults.push({
          appointmentId: appointment.id,
          email: appointment.email,
          status: 'failed',
          error: emailError
        })
      }
    }

    return NextResponse.json({
      success: true,
      processed: appointments?.length || 0,
      results: reminderResults
    })

  } catch (error) {
    console.error('Error in reminder system:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Optional: Add a GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    message: 'Appointment reminder system endpoint. Use POST to trigger reminder checks.',
    info: 'This endpoint should be called by a cron job every hour to check for appointments that need reminders.'
  })
}