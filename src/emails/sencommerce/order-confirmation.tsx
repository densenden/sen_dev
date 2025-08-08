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

interface OrderConfirmationProps {
  customerName: string
  orderNumber: string
  orderTotal: string
  orderDate: string
  items: Array<{
    name: string
    quantity: number
    price: string
  }>
  shippingAddress: {
    street: string
    city: string
    postalCode: string
    country: string
  }
}

export default function OrderConfirmation({
  customerName = 'John Doe',
  orderNumber = '#SC-2024-001',
  orderTotal = '€299.99',
  orderDate = '2024-01-15',
  items = [
    { name: 'Premium Product', quantity: 1, price: '€299.99' }
  ],
  shippingAddress = {
    street: '123 Main Street',
    city: 'Frankfurt',
    postalCode: '60594',
    country: 'Germany'
  }
}: OrderConfirmationProps) {
  return (
    <BaseEmailLayout
      previewText="Your order has been confirmed - SenCommerce"
      title="Order Confirmed"
      logoUrl="https://shop.sen.studio/logo.svg"
      logoAlt="SenCommerce"
    >
      {/* Content */}
      <Section className={emailStyles.layout.section}>
        <Text className={`${emailStyles.typography.sizes.base} text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.sm}`}>
          Hi {customerName},
        </Text>
        
        <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.md}`}>
          Thank you for your order! We're excited to get your products to you. Your order has been confirmed and is being processed.
        </Text>

        {/* Order Details */}
        <Section className={`${emailStyles.components.card.primary} ${emailStyles.layout.sectionSmall}`}>
          <Heading className={`${emailStyles.typography.sizes.lg} ${emailStyles.typography.weights.medium} text-${emailStyles.colors.text.primary} ${emailStyles.layout.spacing.sm}`}>
            Order Details
          </Heading>
          
          <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.xs}`}>
            <strong>Order Number:</strong> {orderNumber}
          </Text>
          
          <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.xs}`}>
            <strong>Order Date:</strong> {orderDate}
          </Text>
          
          <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.sm}`}>
            <strong>Total:</strong> {orderTotal}
          </Text>
        </Section>

        {/* Items */}
        <Section className={`${emailStyles.components.card.neutral} ${emailStyles.layout.sectionSmall}`}>
          <Heading className={`${emailStyles.typography.sizes.lg} ${emailStyles.typography.weights.medium} text-${emailStyles.colors.text.primary} ${emailStyles.layout.spacing.sm}`}>
            Items Ordered
          </Heading>
          
          {items.map((item, index) => (
            <Text key={index} className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.xs}`}>
              {item.quantity}x {item.name} - {item.price}
            </Text>
          ))}
        </Section>

        {/* Shipping Address */}
        <Section className={`${emailStyles.components.card.secondary} ${emailStyles.layout.sectionSmall}`}>
          <Heading className={`${emailStyles.typography.sizes.lg} ${emailStyles.typography.weights.medium} text-${emailStyles.colors.text.primary} ${emailStyles.layout.spacing.sm}`}>
            Shipping Address
          </Heading>
          
          <Text className={`text-${emailStyles.colors.text.secondary}`}>
            {shippingAddress.street}<br />
            {shippingAddress.postalCode} {shippingAddress.city}<br />
            {shippingAddress.country}
          </Text>
        </Section>

        <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.sm}`}>
          You'll receive a shipping confirmation email with tracking information once your order ships.
        </Text>

        <Text className={`text-${emailStyles.colors.text.secondary} ${emailStyles.layout.spacing.md}`}>
          Need help? Visit our <Link href="https://shop.sen.studio/support" className={emailStyles.components.link.underlined}>support center</Link> or reply to this email.
        </Text>
      </Section>

      {/* Action Buttons */}
      <Section className={`text-center ${emailStyles.layout.section}`}>
        <Button
          href={`https://shop.sen.studio/orders/${orderNumber}`}
          className={emailStyles.components.button.primary}
        >
          Track Your Order
        </Button>
      </Section>

      {/* Signature */}
      <SenCommerceSignature />
    </BaseEmailLayout>
  )
}