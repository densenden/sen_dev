import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components'

interface AppointmentNotificationMasterProps {
  name: string
  email: string
  mobile?: string
  company?: string
  date: string
  time: string
  message: string
}

export default function AppointmentNotificationMaster({
  name = 'John Doe',
  email = 'john@example.com',
  mobile = '+49 123 456 789',
  company = 'Example Corp',
  date = '2024-01-15',
  time = '14:00',
  message = 'Looking forward to discussing my project ideas.',
}: AppointmentNotificationMasterProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    }).format(date)
  }

  return (
    <Html>
      <Head />
      <Preview>New consultation scheduled with {name} - {formatDate(date)} at {time}</Preview>
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
                New Consultation Scheduled
              </Heading>
            </Section>

            {/* Content */}
            <Section className="mb-8">
              <Text className="text-gray-700 mb-6">
                📅 <strong>New consultation scheduled!</strong> A consultation appointment has been booked through the website.
              </Text>

              {/* Appointment Details */}
              <Section className="bg-green-50 p-6 rounded-lg mb-6">
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
                  🔔 Don't forget to send a calendar invite with video call details
                </Text>
              </Section>

              {/* Contact Details */}
              <Section className="bg-gray-50 p-6 rounded-lg mb-6">
                <Heading className="text-lg font-medium text-gray-900 mb-4">
                  Client Information
                </Heading>
                
                <Text className="text-gray-700 mb-2">
                  <strong>Name:</strong> {name}
                </Text>
                
                <Text className="text-gray-700 mb-2">
                  <strong>Email:</strong> <Link href={`mailto:${email}`} className="text-orange-500">{email}</Link>
                </Text>
                
                {mobile && (
                  <Text className="text-gray-700 mb-2">
                    <strong>Mobile:</strong> <Link href={`tel:${mobile}`} className="text-orange-500">{mobile}</Link>
                  </Text>
                )}
                
                {company && (
                  <Text className="text-gray-700 mb-2">
                    <strong>Company:</strong> {company}
                  </Text>
                )}
              </Section>

              {/* Project Interest */}
              <Section className="mb-6">
                <Heading className="text-lg font-medium text-gray-900 mb-4">
                  Project Interest
                </Heading>
                
                <Section className="bg-blue-50 p-4 rounded-lg">
                  <Text className="text-gray-700">
                    {message}
                  </Text>
                </Section>
              </Section>

              <Text className="text-gray-700 mb-4">
                <strong>Action Items:</strong>
              </Text>
              <Text className="text-gray-700 mb-2">• Send calendar invite with video call link</Text>
              <Text className="text-gray-700 mb-2">• Review client's project description</Text>
              <Text className="text-gray-700 mb-2">• Prepare relevant portfolio examples</Text>
              <Text className="text-gray-700">• Set reminder 15 minutes before the call</Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-6">
              <Text className="text-gray-500 text-xs">
                This notification was sent from dev.sen.studio appointment scheduler
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}