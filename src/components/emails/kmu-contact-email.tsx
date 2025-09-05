import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
  Tailwind,
} from '@react-email/components'

interface KMUContactEmailProps {
  name: string
  email: string
  phone: string
  company?: string
  selectedPackage?: string
  message: string
}

export const KMUContactEmail = ({
  name,
  email,
  phone,
  company,
  selectedPackage,
  message,
}: KMUContactEmailProps) => {
  const packageLabels = {
    'mvp-sprint': 'MVP Sprint – ab 2.450 €',
    'corporate-website': 'Corporate Website + AI – ab 1.625 €',
    'agentur-partner': 'Agentur-Partner Retainer – ab 875 €/Monat',
    'beratung': 'Kostenlose Beratung',
    'individuell': 'Individuelles Projekt'
  }

  return (
    <Html>
      <Head />
      <Preview>Neue KMU Anfrage von {name}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Header */}
            <Section className="text-center mb-8">
              <Img
                src="https://dev.sen.studio/logo.svg"
                width="25"
                height="25"
                alt="sen.dev"
                className="mx-auto mb-4"
              />
              <Heading className="text-2xl font-light text-gray-900 tracking-wide">
                Neue KMU Anfrage
              </Heading>
            </Section>
          
            {/* Content */}
            <Section className="mb-8">
              <Text className="text-gray-700 mb-4">
                Eine neue Projektanfrage ist über die KMU Landing Page eingegangen.
              </Text>

              <Section className="mb-6">
                <Heading className="text-lg font-medium text-gray-900 mb-4">Kontaktdaten</Heading>
                <Text className="text-gray-700 mb-2">
                  <strong>Name:</strong> {name}
                </Text>
                <Text className="text-gray-700 mb-2">
                  <strong>E-Mail:</strong> <Link href={`mailto:${email}`} className="text-orange-500 underline">{email}</Link>
                </Text>
                <Text className="text-gray-700 mb-2">
                  <strong>Telefon:</strong> <Link href={`tel:${phone}`} className="text-orange-500 underline">{phone}</Link>
                </Text>
                {company && (
                  <Text className="text-gray-700 mb-2">
                    <strong>Unternehmen:</strong> {company}
                  </Text>
                )}
              </Section>

              {selectedPackage && (
                <Section className="mb-6">
                  <Heading className="text-lg font-medium text-gray-900 mb-4">Interesse</Heading>
                  <Text className="text-gray-700 mb-2">
                    <strong>Paket:</strong> {packageLabels[selectedPackage as keyof typeof packageLabels] || selectedPackage}
                  </Text>
                </Section>
              )}

              <Section className="mb-6">
                <Heading className="text-lg font-medium text-gray-900 mb-4">Projektbeschreibung</Heading>
                <Section className="bg-gray-50 p-4 rounded-lg">
                  <Text className="text-gray-600 italic">
                    "{message}"
                  </Text>
                </Section>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-6">
              <Text className="text-gray-500 text-xs">
                Diese E-Mail wurde über die KMU Landing Page von sen.dev gesendet.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

