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

interface ContactNotificationEmailProps {
  name: string
  email: string
  phone: string
  company?: string
  industry?: string
  selectedPackage?: string
  budget?: string
  timeline?: string
  message: string
  pageContext?: string
}

export const ContactNotificationEmail = ({
  name,
  email,
  phone,
  company,
  industry,
  selectedPackage,
  budget,
  timeline,
  message,
  pageContext = 'general',
}: ContactNotificationEmailProps) => {
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
      default: return 'General Inquiry'
    }
  }

  return (
    <Html>
      <Head />
      <Preview>New contact inquiry from {name}</Preview>
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
                New Contact Inquiry
              </Heading>
            </Section>
          
            {/* Content */}
            <Section className="mb-8">
              <Text className="text-gray-700 mb-4">
                A new project inquiry has been submitted via the {getContextualTitle()} page.
              </Text>

              <Section className="mb-6">
                <Heading className="text-lg font-medium text-gray-900 mb-4">Contact Details</Heading>
                <Text className="text-gray-700 mb-2">
                  <strong>Name:</strong> {name}
                </Text>
                <Text className="text-gray-700 mb-2">
                  <strong>Email:</strong> <Link href={`mailto:${email}`} className="text-orange-500 underline">{email}</Link>
                </Text>
                {phone && (
                  <Text className="text-gray-700 mb-2">
                    <strong>Phone:</strong> <Link href={`tel:${phone}`} className="text-orange-500 underline">{phone}</Link>
                  </Text>
                )}
                {company && (
                  <Text className="text-gray-700 mb-2">
                    <strong>Company:</strong> {company}
                  </Text>
                )}
                {industry && (
                  <Text className="text-gray-700 mb-2">
                    <strong>Industry:</strong> {industry}
                  </Text>
                )}
              </Section>

              {(selectedPackage || budget || timeline) && (
                <Section className="mb-6">
                  <Heading className="text-lg font-medium text-gray-900 mb-4">Project Details</Heading>
                  {selectedPackage && (
                    <Text className="text-gray-700 mb-2">
                      <strong>Service Interest:</strong> {packageLabels[selectedPackage as keyof typeof packageLabels] || selectedPackage}
                    </Text>
                  )}
                  {budget && (
                    <Text className="text-gray-700 mb-2">
                      <strong>Budget:</strong> {budget}
                    </Text>
                  )}
                  {timeline && (
                    <Text className="text-gray-700 mb-2">
                      <strong>Timeline:</strong> {timeline}
                    </Text>
                  )}
                </Section>
              )}

              <Section className="mb-6">
                <Heading className="text-lg font-medium text-gray-900 mb-4">Project Description</Heading>
                <Section className="bg-gray-50 p-4 rounded-lg">
                  <Text className="text-gray-600 italic whitespace-pre-line">
                    "{message}"
                  </Text>
                </Section>
              </Section>

              <Section className="mb-6 bg-orange-50 p-4 rounded-lg">
                <Heading className="text-lg font-medium text-gray-900 mb-4">Next Steps</Heading>
                <Text className="text-gray-700 mb-2">
                  • Respond within 24 hours for consultation scheduling<br />
                  • Prepare project analysis and questions<br />
                  • Set up 30-minute discovery call
                </Text>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-6">
              <Text className="text-gray-500 text-xs">
                This email was sent via the {getContextualTitle()} contact form on sen.dev
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}