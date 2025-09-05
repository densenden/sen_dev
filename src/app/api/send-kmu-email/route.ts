import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { KMUContactEmail } from '@/components/emails/kmu-contact-email'
import { KMUConfirmationEmail } from '@/components/emails/kmu-confirmation-email'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, phone, company, package: selectedPackage, message } = data

    // Send notification email to sen.dev team
    const { error: teamError } = await resend.emails.send({
      from: 'KMU Landing <noreply@sen.studio>',
      to: ['dev@sen.studio'],
      subject: `Neue KMU Anfrage von ${name}`,
      react: KMUContactEmail({ 
        name, 
        email, 
        phone, 
        company, 
        selectedPackage, 
        message 
      }),
    })

    if (teamError) {
      console.error('Error sending team notification:', teamError)
      return NextResponse.json({ error: 'Failed to send team notification' }, { status: 500 })
    }

    // Send confirmation email to client
    const { error: clientError } = await resend.emails.send({
      from: 'sen.dev Team <dev@sen.studio>',
      to: [email],
      subject: 'Ihre Anfrage ist bei uns eingegangen',
      react: KMUConfirmationEmail({ 
        name,
        selectedPackage
      }),
    })

    if (clientError) {
      console.error('Error sending client confirmation:', clientError)
      // Don't fail the entire request if confirmation email fails
    }

    return NextResponse.json({ message: 'Emails sent successfully' })
  } catch (error) {
    console.error('Error in send-kmu-email:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}