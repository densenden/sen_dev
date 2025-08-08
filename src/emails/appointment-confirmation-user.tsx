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

interface AppointmentConfirmationUserProps {
  name: string
  date: string
  time: string
  appointmentId?: string
  consultationMethod?: string
  mobile?: string
}

export default function AppointmentConfirmationUser({
  name = 'John Doe',
  date = '2024-01-15',
  time = '14:00',
  appointmentId = 'abc123',
  consultationMethod = 'zoom',
  mobile,
}: AppointmentConfirmationUserProps) {
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
      <Preview>Your consultation is scheduled - SenDev</Preview>
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
                Consultation Scheduled
              </Heading>
            </Section>

            {/* Content */}
            <Section className="mb-8">
              <Text className="text-gray-700 mb-4">
                Hi {name},
              </Text>
              
              <Text className="text-gray-700 mb-6">
                Great! Your 30-minute discovery call has been scheduled. We&apos;re excited to learn about your project and explore how we can help bring your vision to life.
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
                  📧 A calendar file (.ics) is attached to this email for easy import.
                </Text>
              </Section>

              {/* Meeting Details - Dynamic based on consultation method */}
              <Section className="bg-blue-50 p-6 rounded-lg mb-6">
                <Heading className="text-lg font-medium text-gray-900 mb-4">
                  {consultationMethod === 'zoom' && 'Zoom Meeting Details'}
                  {consultationMethod === 'teams' && 'Microsoft Teams Meeting Details'}
                  {consultationMethod === 'phone' && 'Phone Call Details'}
                </Heading>
                
                {consultationMethod === 'zoom' && (
                  <>
                    <Text className="text-gray-700 mb-2">
                      <strong>Denis Kreuzer is inviting you to a scheduled Zoom meeting.</strong>
                    </Text>
                    
                    <Text className="text-gray-700 mb-2">
                      <strong>Topic:</strong> SenDev Consultation with {name}
                    </Text>
                    
                    <Text className="text-gray-700 mb-2">
                      <strong>Join Zoom Meeting:</strong>
                    </Text>
                    <Text className="text-blue-600 text-sm mb-4">
                      https://us05web.zoom.us/j/8231452967?pwd=AnGpnsyly1txAgp1gozGMho6a9M26U.1
                    </Text>
                    
                    <Text className="text-gray-700 mb-1">
                      <strong>Meeting ID:</strong> 823 145 2967
                    </Text>
                    <Text className="text-gray-700 mb-4">
                      <strong>Passcode:</strong> uQE66P
                    </Text>
                  </>
                )}

                {consultationMethod === 'teams' && (
                  <>
                    <Text className="text-gray-700 mb-2">
                      <strong>Denis Kreuzer is inviting you to a Microsoft Teams meeting.</strong>
                    </Text>
                    
                    <Text className="text-gray-700 mb-2">
                      <strong>Topic:</strong> SenDev Consultation with {name}
                    </Text>
                    
                    <Text className="text-gray-700 mb-2">
                      <strong>Join Microsoft Teams Meeting:</strong>
                    </Text>
                    <Text className="text-blue-600 text-sm mb-4">
                      https://teams.microsoft.com/l/chat/0/0?users=dk@studiosen.onmicrosoft.com
                    </Text>
                    
                    <Text className="text-gray-700 mb-4">
                      <strong>Teams User:</strong> dk@studiosen.onmicrosoft.com
                    </Text>
                  </>
                )}

                {consultationMethod === 'phone' && (
                  <>
                    <Text className="text-gray-700 mb-2">
                      <strong>Denis Kreuzer will call you for your consultation.</strong>
                    </Text>
                    
                    <Text className="text-gray-700 mb-2">
                      <strong>Topic:</strong> SenDev Consultation with {name}
                    </Text>
                    
                    <Text className="text-gray-700 mb-4">
                      <strong>Denis will call you at:</strong> {mobile}
                    </Text>
                    
                    <Text className="text-gray-600 text-sm mb-4">
                      Please make sure your phone is available at the scheduled time.
                    </Text>
                  </>
                )}
                
                <Text className="text-gray-700 mb-2">
                  <strong>📱 Denis Mobile:</strong> +49 15566179807
                </Text>
                
                <Text className="text-gray-600 text-sm">
                  All meeting details are included in the calendar attachment.
                </Text>
              </Section>

              {/* What to Prepare */}
              <Section className="mb-6">
                <Heading className="text-lg font-medium text-gray-900 mb-4">
                  What to Prepare
                </Heading>
                
                <Text className="text-gray-700 mb-2">• Your project vision and goals</Text>
                <Text className="text-gray-700 mb-2">• Target audience or market</Text>
                <Text className="text-gray-700 mb-2">• Preferred timeline</Text>
                <Text className="text-gray-700 mb-2">• Budget considerations</Text>
                <Text className="text-gray-700 mb-4">• Any specific features or requirements</Text>
              </Section>

              <Text className="text-gray-700 mb-4">
                If you need to reschedule, please reply to this email at least 2 hours before the appointment.
              </Text>

              <Text className="text-gray-700 mb-6">
                Looking forward to our conversation!
              </Text>
            </Section>

            {/* Action Buttons */}
            <Section className="text-center mb-8">
              <Heading className="text-lg font-medium text-gray-900 mb-4">
                Need to make changes?
              </Heading>
              
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

            {/* Signature */}
            <Signature />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}