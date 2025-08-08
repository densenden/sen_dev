import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import ical from 'ical-generator'
import { createClient } from '@supabase/supabase-js'
import AppointmentConfirmationUser from '@/emails/appointment-confirmation-user'
import AppointmentNotificationMaster from '@/emails/appointment-notification-master'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      email, 
      mobile, 
      company, 
      message, 
      appointment,
      consultationMethod = 'zoom' // zoom, teams, phone
    } = body

    // Validate required fields
    if (!name || !email || !appointment || !appointment.date || !appointment.time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate meeting information based on consultation method
    let meetingInfo = {
      location: '',
      description: '',
      meetingLink: ''
    }

    switch (consultationMethod) {
      case 'zoom':
        meetingInfo = {
          location: 'Zoom Meeting: https://us05web.zoom.us/j/8231452967?pwd=AnGpnsyly1txAgp1gozGMho6a9M26U.1',
          meetingLink: 'https://us05web.zoom.us/j/8231452967?pwd=AnGpnsyly1txAgp1gozGMho6a9M26U.1',
          description: `Denis Kreuzer is inviting you to a scheduled Zoom meeting.

Topic: SenDev Consultation with ${name}
Join Zoom Meeting: https://us05web.zoom.us/j/8231452967?pwd=AnGpnsyly1txAgp1gozGMho6a9M26U.1

Meeting ID: 823 145 2967
Passcode: uQE66P`
        }
        break
      case 'teams':
        meetingInfo = {
          location: 'Microsoft Teams: https://teams.microsoft.com/l/chat/0/0?users=dk@studiosen.onmicrosoft.com',
          meetingLink: 'https://teams.microsoft.com/l/chat/0/0?users=dk@studiosen.onmicrosoft.com',
          description: `Denis Kreuzer is inviting you to a Microsoft Teams meeting.

Topic: SenDev Consultation with ${name}
Join Microsoft Teams Meeting: https://teams.microsoft.com/l/chat/0/0?users=dk@studiosen.onmicrosoft.com

Microsoft Teams User: dk@studiosen.onmicrosoft.com`
        }
        break
      case 'phone':
        meetingInfo = {
          location: 'Phone Call: +49 15566179807',
          meetingLink: 'tel:+4915566179807',
          description: `Denis Kreuzer will call you for your consultation.

Topic: SenDev Consultation with ${name}
Phone Number: +49 15566179807

Denis will call you at: ${mobile || 'the number you provided'}`
        }
        break
    }

    // Create calendar event
    const startDateTime = new Date(`${appointment.date}T${appointment.time}:00.000Z`)
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000) // 30 minutes later

    const calendar = ical({ name: 'SenDev Consultation' })
    calendar.createEvent({
      start: startDateTime,
      end: endDateTime,
      summary: `SenDev Consultation with ${name}`,
      description: `Discovery call to discuss your project and explore how SenDev can help bring your vision to life.

${meetingInfo.description}

Client: ${name}
Email: ${email}${mobile ? `\nMobile: ${mobile}` : ''}${company ? `\nCompany: ${company}` : ''}

📱 Denis Mobile: +49 15566179807

Project Interest:
${message}`,
      location: meetingInfo.location,
      organizer: {
        name: 'Densen - SenDev',
        email: 'dev@sen.studio'
      },
      attendees: [
        {
          name: name,
          email: email,
          status: 'accepted'
        },
        {
          name: 'Densen',
          email: 'dev@sen.studio',
          status: 'accepted'
        }
      ]
    })

    const icsContent = calendar.toString()

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

    // Save appointment to database
    let appointmentId = null
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .insert({
            name,
            email,
            mobile: mobile || null,
            company: company || null,
            package_name: 'Free Consultation', // This is a consultation
            message: message || '',
            preferred_contact: consultationMethod, // Use consultation method as preferred contact
            appointment_date: appointment.date,
            appointment_time: appointment.time,
            status: 'scheduled',
            reminder_sent: false
          })
          .select()
          .single()

        if (error) {
          console.error('Error saving appointment to database:', error)
          // Continue with email sending even if database save fails
        } else {
          console.log('Appointment saved to database:', data.id)
          appointmentId = data.id
        }
      } catch (dbError) {
        console.error('Database operation failed:', dbError)
        // Continue with email sending even if database save fails
      }
    }

    // Send confirmation email to user with calendar attachment
    const userEmailResult = await resend.emails.send({
      from: 'dev@sen.studio',
      to: [email],
      subject: 'Your consultation is scheduled - SenDev',
      react: AppointmentConfirmationUser({
        name,
        date: appointment.date,
        time: appointment.time,
        appointmentId: appointmentId || undefined,
        consultationMethod,
        mobile,
      }),
      attachments: [
        {
          filename: 'consultation.ics',
          content: Buffer.from(icsContent).toString('base64'),
          contentType: 'text/calendar',
        }
      ]
    })

    // Send notification email to your inbox with calendar attachment
    const masterEmailResult = await resend.emails.send({
      from: 'dev@sen.studio',
      to: ['dev@sen.studio'],
      subject: `📅 New consultation scheduled! ${name} - ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time}`,
      react: AppointmentNotificationMaster({
        name,
        email,
        mobile,
        company,
        date: appointment.date,
        time: appointment.time,
        message,
      }),
      attachments: [
        {
          filename: 'consultation.ics',
          content: Buffer.from(icsContent).toString('base64'),
          contentType: 'text/calendar',
        }
      ]
    })

    return NextResponse.json({
      success: true,
      userEmailId: userEmailResult.data?.id,
      masterEmailId: masterEmailResult.data?.id,
    })
  } catch (error) {
    console.error('Failed to send appointment emails:', error)
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    )
  }
}