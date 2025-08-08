import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import ContactConfirmationUser from '@/emails/contact-confirmation-user'
import ContactNotificationMaster from '@/emails/contact-notification-master'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, mobile, company, package: packageName, message, preferredContact } = body

    // Validate required fields
    if (!name || !email || !packageName || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: 'dev@sen.studio',
      to: [email],
      subject: 'Your project inquiry has been received - SenDev',
      react: ContactConfirmationUser({
        name,
        packageName,
        message,
      }),
    })

    // Send notification email to your inbox
    const masterEmailResult = await resend.emails.send({
      from: 'dev@sen.studio',
      to: ['dev@sen.studio'],
      subject: `🚀 New prospect arrived! ${name} - ${packageName}`,
      react: ContactNotificationMaster({
        name,
        email,
        mobile,
        company,
        packageName,
        message,
        preferredContact,
      }),
    })

    return NextResponse.json({
      success: true,
      userEmailId: userEmailResult.data?.id,
      masterEmailId: masterEmailResult.data?.id,
    })
  } catch (error) {
    console.error('Failed to send contact emails:', error)
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    )
  }
}