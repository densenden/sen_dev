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

interface ContactNotificationMasterProps {
  name: string
  email: string
  mobile?: string
  company?: string
  packageName: string
  message: string
  preferredContact: string
}

export default function ContactNotificationMaster({
  name = 'John Doe',
  email = 'john@example.com',
  mobile = '+49 123 456 789',
  company = 'Example Corp',
  packageName = 'Starter Sprint',
  message = 'Looking forward to building an amazing MVP together.',
  preferredContact = 'email',
}: ContactNotificationMasterProps) {
  return (
    <Html>
      <Head />
      <Preview>New project inquiry from {name} - {packageName}</Preview>
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
                New Project Inquiry
              </Heading>
            </Section>

            {/* Content */}
            <Section className="mb-8">
              <Text className="text-gray-700 mb-6">
                🚀 <strong>New prospect arrived!</strong> You have received a new project inquiry through the website.
              </Text>

              {/* Contact Details */}
              <Section className="bg-gray-50 p-6 rounded-lg mb-6">
                <Heading className="text-lg font-medium text-gray-900 mb-4">
                  Contact Information
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
                
                <Text className="text-gray-700 mb-2">
                  <strong>Package:</strong> {packageName}
                </Text>
                
                <Text className="text-gray-700">
                  <strong>Preferred Contact:</strong> {preferredContact}
                </Text>
              </Section>

              {/* Project Message */}
              <Section className="mb-6">
                <Heading className="text-lg font-medium text-gray-900 mb-4">
                  Project Description
                </Heading>
                
                <Section className="bg-blue-50 p-4 rounded-lg">
                  <Text className="text-gray-700">
                    {message}
                  </Text>
                </Section>
              </Section>

              <Text className="text-gray-700">
                Please respond within 24 hours to maintain our service commitment.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-6">
              <Text className="text-gray-500 text-xs">
                This notification was sent from dev.sen.studio contact form
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}