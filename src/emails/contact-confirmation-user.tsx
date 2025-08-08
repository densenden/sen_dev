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
import Signature from './components/signature'

interface ContactConfirmationUserProps {
  name: string
  packageName: string
  message: string
}

export default function ContactConfirmationUser({
  name = 'John Doe',
  packageName = 'Starter Sprint',
  message = 'Looking forward to building an amazing MVP together.',
}: ContactConfirmationUserProps) {
  return (
    <Html>
      <Head />
      <Preview>Your project inquiry has been received - SenDev</Preview>
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
                Thank you for reaching out
              </Heading>
            </Section>

            {/* Content */}
            <Section className="mb-8">
              <Text className="text-gray-700 mb-4">
                Hi {name},
              </Text>
              
              <Text className="text-gray-700 mb-4">
                We've received your project inquiry for <strong>{packageName}</strong> and are excited to learn more about your vision.
              </Text>

              <Text className="text-gray-700 mb-4">
                Your message:
              </Text>
              
              <Section className="bg-gray-50 p-4 rounded-lg mb-6">
                <Text className="text-gray-600 italic">
                  "{message}"
                </Text>
              </Section>

              <Text className="text-gray-700 mb-4">
                We will review your requirements and get back to you within 24 hours with next steps.
              </Text>

              <Text className="text-gray-700 mb-6">
                In the meantime, feel free to explore our <Link href="https://dev.sen.studio/projects" className="text-orange-500 underline">portfolio</Link> or learn more about our <Link href="https://dev.sen.studio/services" className="text-orange-500 underline">services</Link>.
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