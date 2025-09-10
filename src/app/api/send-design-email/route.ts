import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import DesignReviewConfirmation from '@/emails/design-review-confirmation'
import ContactNotificationMaster from '@/emails/contact-notification-master'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, website, company, package: packageName, message } = body

    // Validate required fields
    if (!name || !email || !website || !packageName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send Design Review confirmation email to user
    console.log('Sending email with data:', { name, email, website, currentDesign: packageName })
    
    const userEmailResult = await resend.emails.send({
      from: 'dev@sen.studio',
      to: [email],
      subject: 'Ihr kostenloses Design-Review ist unterwegs! - SenDev™',
      react: DesignReviewConfirmation({
        name,
        email,
        website,
      }),
    })

    console.log('User email result:', userEmailResult)

    // Send notification email to design team
    const masterEmailResult = await resend.emails.send({
      from: 'dev@sen.studio',
      to: ['design@sen.studio', 'dev@sen.studio'],
      subject: `🎨 Neue Design-Review Anfrage! ${name} - ${packageName}`,
      react: ContactNotificationMaster({
        name,
        email,
        mobile: phone,
        company,
        packageName: `DESIGN: ${packageName}`,
        message: `Website: ${website}\n\nNachricht: ${message}`,
        preferredContact: phone ? 'phone' : 'email',
      }),
    })

    return NextResponse.json({
      success: true,
      userEmailId: userEmailResult.data?.id,
      masterEmailId: masterEmailResult.data?.id,
    })
  } catch (error) {
    console.error('Failed to send design emails:', error)
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    )
  }
}