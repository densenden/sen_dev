import {
  Button,
  Section,
  Text,
  Heading,
  Link,
} from '@react-email/components'
import BaseEmailLayout from './components/base-layout'
import SenCommerceSignature from './components/signature'
import { emailStyles } from './components/email-styles'

interface WelcomeEmailProps {
  customerName: string
  customerEmail: string
  discountCode?: string
}

export default function WelcomeEmail({
  customerName = 'John Doe',
  customerEmail = 'john@example.com',
  discountCode = 'WELCOME10'
}: WelcomeEmailProps) {
  return (
    <BaseEmailLayout
      previewText="Welcome to SenCommerce - Your journey starts here"
      title="Welcome to SenCommerce"
      logoUrl="https://shop.sen.studio/logo.svg"
      logoAlt="SenCommerce"
    >
      {/* Content */}
      <Section className={emailStyles.layout.section}>
        <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.sm}`}>
          Hi {customerName},
        </Text>
        
        <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.md}`}>
          Welcome to SenCommerce! We're thrilled to have you join our community of satisfied customers.
        </Text>

        {/* Account Details */}
        <Section className={`${emailStyles.components.card.neutral} ${emailStyles.layout.sectionSmall}`}>
          <Heading className={`${emailStyles.typography.sizes.lg} ${emailStyles.typography.weights.medium} text-${emailStyles.colors.text.primary} ${emailStyles.layout.spacing.sm}`}>
            Your Account
          </Heading>
          
          <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.xs}`}>
            <strong>Email:</strong> {customerEmail}
          </Text>
          
          <Text className={`text-${emailStyles.colors.text.muted} ${emailStyles.typography.sizes.sm}`}>
            You can now enjoy personalized recommendations, order tracking, and exclusive offers.
          </Text>
        </Section>

        {/* Welcome Discount */}
        {discountCode && (
          <Section className={`${emailStyles.components.card.primary} ${emailStyles.layout.sectionSmall}`}>
            <Heading className={`${emailStyles.typography.sizes.lg} ${emailStyles.typography.weights.medium} text-${emailStyles.colors.text.primary} ${emailStyles.layout.spacing.sm}`}>
              Welcome Gift 🎁
            </Heading>
            
            <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.xs}`}>
              As a welcome gift, here's a special discount code for your first purchase:
            </Text>
            
            <Text className={`text-${emailStyles.colors.text.primary} ${emailStyles.typography.sizes.lg} ${emailStyles.typography.weights.bold} ${emailStyles.layout.spacing.sm}`}>
              {discountCode}
            </Text>
            
            <Text className={`text-${emailStyles.colors.text.muted} ${emailStyles.typography.sizes.sm}`}>
              Use this code at checkout to get 10% off your first order. Valid for 30 days.
            </Text>
          </Section>
        )}

        {/* What's Next */}
        <Section className={emailStyles.layout.sectionSmall}>
          <Heading className={`${emailStyles.typography.sizes.lg} ${emailStyles.typography.weights.medium} text-${emailStyles.colors.text.primary} ${emailStyles.layout.spacing.sm}`}>
            What's Next?
          </Heading>
          
          <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.xs}`}>
            • Explore our <Link href="https://shop.sen.studio/products" className={emailStyles.components.link.underlined}>product catalog</Link>
          </Text>
          <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.xs}`}>
            • Set up your <Link href="https://shop.sen.studio/profile" className={emailStyles.components.link.underlined}>profile preferences</Link>
          </Text>
          <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.xs}`}>
            • Follow us on social media for updates and exclusive offers
          </Text>
        </Section>

        <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.md}`}>
          If you have any questions, our <Link href="https://shop.sen.studio/support" className={emailStyles.components.link.underlined}>support team</Link> is here to help.
        </Text>
      </Section>

      {/* Action Buttons */}
      <Section className={`text-center ${emailStyles.layout.section}`}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            href="https://shop.sen.studio/products"
            className={emailStyles.components.button.primary}
          >
            Start Shopping
          </Button>
          
          <Button
            href="https://shop.sen.studio/profile"
            className={emailStyles.components.button.outline}
          >
            Complete Profile
          </Button>
        </div>
      </Section>

      {/* Signature */}
      <SenCommerceSignature />
    </BaseEmailLayout>
  )
}