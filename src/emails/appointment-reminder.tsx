import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Button,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components'
import Signature from './components/signature'

interface AppointmentReminderProps {
  name: string
  date: string
  time: string
  appointmentId: string
}

export default function AppointmentReminder({
  name = 'John Doe',
  date = '2024-01-15',
  time = '14:00',
  appointmentId = 'abc123',
}: AppointmentReminderProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    }).format(date)
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dev.sen.studio'

  return (
    <Html>
      <Head />
      <Preview>Reminder: Your consultation is in 2 hours - SenDev</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Header */}
            <Section className="text-center mb-8">
              <Img
                src="https://dev.sen.studio/logo.svg"
                width="25"
                height="25"
                alt="SenDev"
                className="mx-auto mb-4"
              />
              <Heading className="text-2xl font-light text-gray-900 tracking-wide">
                Consultation Reminder
              </Heading>
            </Section>

            {/* Content */}
            <Section className="mb-8">
              <Text className="text-gray-700 mb-4">
                Hi {name},
              </Text>
              
              <Text className="text-gray-700 mb-6">
                This is a friendly reminder that your consultation with SenDev is scheduled for today in 2 hours.
              </Text>

              {/* Appointment Details */}
              <Section className="bg-orange-50 p-6 rounded-lg mb-6">
                <Heading className="text-lg font-medium text-gray-900 mb-4">
                  Appointment Details
                </Heading>
                
                <Text className="text-gray-700 mb-2">
                  <strong>Date:</strong> {formatDate(date)}
                </Text>
                
                <Text className="text-gray-700 mb-2">
                  <strong>Time:</strong> {time} (CET)
                </Text>
                
                <Text className="text-gray-700 mb-4">
                  <strong>Duration:</strong> 30 minutes
                </Text>
                
                <Text className="text-gray-600 text-sm">
                  🎥 Video call details will be sent 15 minutes before the appointment.
                </Text>
              </Section>

              {/* Action Buttons */}
              <Section className="text-center mb-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    href={`${baseUrl}/api/appointment/reschedule?id=${appointmentId}`}
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg text-sm font-medium"
                  >
                    🔄 Reschedule Appointment
                  </Button>
                  
                  <Button
                    href={`${baseUrl}/api/appointment/cancel?id=${appointmentId}`}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg text-sm font-medium"
                  >
                    ❌ Cancel Appointment
                  </Button>
                </div>
              </Section>

              <Text className="text-gray-700 mb-4">
                We&apos;re looking forward to discussing your project and exploring how we can help bring your vision to life!
              </Text>

              <Text className="text-gray-600 text-sm">
                If you need immediate assistance, please reply to this email.
              </Text>
            </Section>

            {/* Signature */}
            <Signature />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}