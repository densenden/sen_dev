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

interface ContactConfirmationEmailProps {
  name: string
  selectedPackage?: string
  pageContext?: string
}

export const ContactConfirmationEmail = ({
  name,
  selectedPackage,
  pageContext = 'general',
}: ContactConfirmationEmailProps) => {
  const packageLabels = {
    'consultation': 'Free Consultation',
    'mvp-sprint': 'MVP Sprint – from €2,450',
    'corporate-website': 'Corporate Website + AI – from €1,625',
    'agency-partner': 'Agency Partner Retainer – from €875/month',
    'custom': 'Custom Project'
  }

  const getContextualTitle = () => {
    switch (pageContext) {
      case 'cv': return 'CV & Portfolio Project'
      case 'design': return 'Design Services'
      case 'luxury': return 'Luxury Digital Experience'
      case 'consulting': return 'Consulting Firm Digital Solution'
      default: return 'Your Project Inquiry'
    }
  }

  return (
    <Html>
      <Head />
      <Preview>Your inquiry has been received - sen.dev</Preview>
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
                Thank you for your inquiry!
              </Heading>
            </Section>
          
            {/* Content */}
            <Section className="mb-8">
              <Text className="text-gray-700 mb-4">
                Hello {name},
              </Text>
              
              <Text className="text-gray-700 mb-4">
                Thank you for your interest in sen.dev! Your project inquiry for <strong>{getContextualTitle()}</strong> has been received and we're excited to learn more about your vision.
              </Text>

              {selectedPackage && (
                <Section className="bg-gray-50 p-4 rounded-lg mb-6">
                  <Text className="text-gray-600">
                    <strong>Your selected service:</strong> {packageLabels[selectedPackage as keyof typeof packageLabels] || selectedPackage}
                  </Text>
                </Section>
              )}

              <Section className="mb-8">
                <Heading className="text-lg font-medium text-gray-900 mb-4">What happens next?</Heading>
                
                <Text className="text-gray-700 mb-4">
                  <strong>1. Project Analysis (today)</strong><br />
                  Our team analyzes your requirements and prepares questions for our conversation.
                </Text>
                
                <Text className="text-gray-700 mb-4">
                  <strong>2. Personal Consultation (within 24h)</strong><br />
                  We'll reach out for a non-binding 30-minute consultation call.
                </Text>
                
                <Text className="text-gray-700 mb-4">
                  <strong>3. Tailored Proposal (2-3 days)</strong><br />
                  You'll receive a detailed proposal with timeline and investment.
                </Text>
                
                <Text className="text-gray-700 mb-4">
                  <strong>4. Project Kickoff</strong><br />
                  Upon your approval, we start immediately with implementation.
                </Text>
              </Section>

              <Section className="mb-8">
                <Heading className="text-lg font-medium text-gray-900 mb-4">Direct Contact Options</Heading>
                <Text className="text-gray-700 mb-4">
                  Have questions or want to speak directly?
                </Text>
                <Text className="text-gray-700 mb-4">
                  Email: <Link href="mailto:dev@sen.studio" className="text-orange-500 underline">dev@sen.studio</Link><br />
                  Phone: <Link href="tel:+4915566179807" className="text-orange-500 underline">+49 15566179807</Link>
                </Text>
              </Section>

              <Section className="mb-8">
                <Text className="text-gray-700 mb-4">
                  <strong>Why sen.dev?</strong><br />
                  • Design + Code + AI from one source<br />
                  • 30 days from idea to live product<br />
                  • Transparent pricing and agile methodology<br />
                  • Specialized in innovative solutions that drive revenue
                </Text>
              </Section>
            </Section>

            {/* Signature */}
            <Section className="border-t border-gray-200 pt-6">
              <Text className="text-gray-700 mb-4">
                We look forward to bringing your project to life!
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