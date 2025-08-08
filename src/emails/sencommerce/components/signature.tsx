import { Link, Text, Section } from '@react-email/components'

export default function SenCommerceSignature() {
  return (
    <Section className="border-t border-gray-200 pt-6">
      <Text className="text-gray-600 text-sm mb-2">
        Best regards,<br />
        <strong>SenCommerce Team</strong><br />
        E-commerce Solutions<br />
        <Link href="https://shop.sen.studio" className="text-orange-500">shop.sen.studio</Link>
      </Text>
      
      <Text className="text-gray-500 text-xs mt-4">
        SenCommerce ™ – Fast-track your e-commerce success with full-stack solutions
      </Text>
      
      <Text className="text-gray-400 text-xs mt-3 leading-4">
        <strong>SEN.CO UG (haftungsbeschränkt)</strong><br />
        Paradiesgasse 53, 60594 Frankfurt am Main, Germany<br />
        Phone: <Link href="tel:+4915566179807" className="text-gray-400">+49 15566179807</Link> | 
        Email: <Link href="mailto:shop@sen.studio" className="text-gray-400">shop@sen.studio</Link><br />
        Registered: Local Court Frankfurt am Main, HRB 129222<br />
        VAT ID: DE358821685
      </Text>
    </Section>
  )
}