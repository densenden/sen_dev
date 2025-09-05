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

interface KMUConfirmationEmailProps {
  name: string
  selectedPackage?: string
}

export const KMUConfirmationEmail = ({
  name,
  selectedPackage,
}: KMUConfirmationEmailProps) => {
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
      <Preview>Ihre Anfrage ist bei uns eingegangen - sen.dev</Preview>
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
                Vielen Dank für Ihre Anfrage!
              </Heading>
            </Section>
          
            {/* Content */}
            <Section className="mb-8">
              <Text className="text-gray-700 mb-4">
                Hallo {name},
              </Text>
              
              <Text className="text-gray-700 mb-4">
                vielen Dank für Ihr Interesse an sen.dev! Ihre Projektanfrage ist bei uns eingegangen und wir freuen uns darauf, mehr über Ihr Vorhaben zu erfahren.
              </Text>

              {selectedPackage && (
                <Section className="bg-gray-50 p-4 rounded-lg mb-6">
                  <Text className="text-gray-600">
                    <strong>Ihr gewähltes Paket:</strong> {packageLabels[selectedPackage as keyof typeof packageLabels] || selectedPackage}
                  </Text>
                </Section>
              )}

              <Section className="mb-8">
                <Heading className="text-lg font-medium text-gray-900 mb-4">Was passiert als Nächstes?</Heading>
                
                <Text className="text-gray-700 mb-4">
                  <strong>1. Projektanalyse (heute)</strong><br />
                  Unser Team analysiert Ihre Anforderungen und bereitet Fragen für das Gespräch vor.
                </Text>
                
                <Text className="text-gray-700 mb-4">
                  <strong>2. Persönliches Gespräch (innerhalb 24h)</strong><br />
                  Wir melden uns bei Ihnen für ein unverbindliches 30-minütiges Beratungsgespräch.
                </Text>
                
                <Text className="text-gray-700 mb-4">
                  <strong>3. Maßgeschneidertes Angebot (2-3 Tage)</strong><br />
                  Sie erhalten ein detailliertes Angebot mit Zeitplan und Investition.
                </Text>
                
                <Text className="text-gray-700 mb-4">
                  <strong>4. Projektstart</strong><br />
                  Bei Ihrer Zustimmung starten wir direkt mit der Umsetzung.
                </Text>
              </Section>

              <Section className="mb-8">
                <Heading className="text-lg font-medium text-gray-900 mb-4">Direkte Kontaktmöglichkeiten</Heading>
                <Text className="text-gray-700 mb-4">
                  Sie haben Fragen oder möchten direkt mit uns sprechen?
                </Text>
                <Text className="text-gray-700 mb-4">
                  E-Mail: <Link href="mailto:dev@sen.studio" className="text-orange-500 underline">dev@sen.studio</Link><br />
                  Telefon: <Link href="tel:+4915566179807" className="text-orange-500 underline">+49 15566179807</Link>
                </Text>
              </Section>

              <Section className="mb-8">
                <Text className="text-gray-700 mb-4">
                  <strong>Warum sen.dev?</strong><br />
                  • Design + Code + AI aus einer Hand<br />
                  • 30 Tage von der Idee zum Live-Produkt<br />
                  • Transparente Preise und agile Arbeitsweise<br />
                  • Spezialisiert auf Mittelstand und Agenturen
                </Text>
              </Section>
            </Section>

            {/* Signature */}
            <Section className="border-t border-gray-200 pt-6">
              <Text className="text-gray-700 mb-4">
                Wir freuen uns darauf, Ihr Projekt zu realisieren!
              </Text>
              
              <Text className="text-gray-600 text-sm mb-2">
                Best regards,<br />
                <strong>Denis Kreuzer</strong><br />
                Managing Director<br />
                <Link href="https://dev.sen.studio" className="text-orange-500">dev.sen.studio</Link>
              </Text>
              
              <Text className="text-gray-500 text-xs mt-4">
                sen.dev - Design + Code + AI
              </Text>
              
              <Text className="text-gray-400 text-xs mt-3 leading-4">
                <strong>SEN.CO UG (haftungsbeschränkt)</strong><br />
                Paradiesgasse 53, 60594 Frankfurt am Main, Germany<br />
                Phone: <Link href="tel:+4915566179807" className="text-gray-400">+49 15566179807</Link> | 
                Email: <Link href="mailto:dev@sen.studio" className="text-gray-400">dev@sen.studio</Link><br />
                Registered: Local Court Frankfurt am Main, HRB 129222<br />
                VAT ID: DE358821685
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

