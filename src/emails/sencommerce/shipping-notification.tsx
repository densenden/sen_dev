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

interface ShippingNotificationProps {
  customerName: string
  orderNumber: string
  trackingNumber: string
  carrier: string
  estimatedDelivery: string
  trackingUrl: string
}

export default function ShippingNotification({
  customerName = 'John Doe',
  orderNumber = '#SC-2024-001',
  trackingNumber = 'DHL123456789',
  carrier = 'DHL',
  estimatedDelivery = '2024-01-18',
  trackingUrl = 'https://www.dhl.com/tracking'
}: ShippingNotificationProps) {
  return (
    <BaseEmailLayout
      previewText="Your order is on its way - SenCommerce"
      title="Your Order Has Shipped"
      logoUrl="https://shop.sen.studio/logo.svg"
      logoAlt="SenCommerce"
    >
      {/* Content */}
      <Section className={emailStyles.layout.section}>
        <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.sm}`}>
          Hi {customerName},
        </Text>
        
        <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.md}`}>
          Great news! Your order <strong>{orderNumber}</strong> has shipped and is on its way to you.
        </Text>

        {/* Shipping Details */}
        <Section className={`${emailStyles.components.card.primary} ${emailStyles.layout.sectionSmall}`}>
          <Heading className={`${emailStyles.typography.sizes.lg} ${emailStyles.typography.weights.medium} text-${emailStyles.colors.text.primary} ${emailStyles.layout.spacing.sm}`}>
            Shipping Details
          </Heading>
          
          <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.xs}`}>
            <strong>Tracking Number:</strong> {trackingNumber}
          </Text>
          
          <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.xs}`}>
            <strong>Carrier:</strong> {carrier}
          </Text>
          
          <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.sm}`}>
            <strong>Estimated Delivery:</strong> {estimatedDelivery}
          </Text>
          
          <Text className={`text-${emailStyles.colors.text.muted} ${emailStyles.typography.sizes.sm}`}>
            📦 You can track your package using the tracking number above or click the button below.
          </Text>
        </Section>

        <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.sm}`}>
          We'll send you another email when your package is delivered.
        </Text>

        <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.md}`}>
          Questions about your shipment? Contact our <Link href="https://shop.sen.studio/support" className={emailStyles.components.link.underlined}>support team</Link>.
        </Text>
      </Section>

      {/* Action Buttons */}
      <Section className={`text-center ${emailStyles.layout.section}`}>
        <Button
          href={trackingUrl}
          className={emailStyles.components.button.primary}
        >
          Track Your Package
        </Button>
      </Section>

      {/* Signature */}
      <SenCommerceSignature />
    </BaseEmailLayout>
  )
}