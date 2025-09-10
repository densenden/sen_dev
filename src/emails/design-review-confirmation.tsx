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

interface DesignReviewConfirmationProps {
  name: string
  email: string
  website?: string
  currentDesign?: string
}

export default function DesignReviewConfirmation({
  name = 'John Doe',
  email = 'john@example.com',
  website = 'example.com',
  currentDesign = 'Keine Angabe',
}: DesignReviewConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Ihr kostenloses Design-Review ist unterwegs - SenDev</Preview>
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
              <Heading className="text-2xl font-light text-gray-900">
                Ihr Design-Review ist unterwegs
              </Heading>
            </Section>

            {/* Content */}
            <Section className="mb-8">
              <Text className="text-gray-700 mb-4">
                Hallo {name},
              </Text>
              
              <Text className="text-gray-700 mb-4">
                vielen Dank für Ihr Interesse an unserem kostenlosen Design-Review!
                Wir freuen uns darauf, das Potenzial Ihres Designs zu analysieren.
              </Text>

              <Text className="text-gray-700 mb-4">
                <strong>Das passiert als nächstes:</strong>
              </Text>
              
              <Text className="text-gray-700 mb-2">
                • Heute: Wir analysieren Ihr Projekt{website ? ` (${website})` : ''}
              </Text>
              
              <Text className="text-gray-700 mb-2">
                • Morgen: Unser Design-Experte erstellt Ihr Review
              </Text>
              
              <Text className="text-gray-700 mb-4">
                • In 48h: Sie erhalten detaillierte Empfehlungen
              </Text>

              <Text className="text-gray-700 mb-4">
                <strong>Kostenloser Wert: €490</strong><br />
                Detaillierte Design-Analyse • Conversion-Optimierung • Aktionsplan
              </Text>

              {website && (
                <Text className="text-gray-600 text-sm mb-4">
                  Projekt URL: {website}<br />
                  E-Mail: {email}
                </Text>
              )}

              <Text className="text-gray-700 mb-4">
                Bei Fragen erreichen Sie uns unter{' '}
                <Link href="mailto:dev@sen.studio" className="text-orange-500">
                  dev@sen.studio
                </Link>
              </Text>

              <Text className="text-gray-700">
                Freuen Sie sich auf Ihr Review!
              </Text>
            </Section>

            {/* Footer */}
            <Signature />

          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}