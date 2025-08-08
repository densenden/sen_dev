import { Link, Text, Section, Img } from '@react-email/components'

export default function Signature() {
  return (
    <Section className="border-t border-gray-200 pt-6">
      <Text className="text-gray-600 text-sm mb-2">
        Best regards,<br />
        <strong>Denis Kreuzer</strong><br />
        Managing Director<br />
        <Link href="https://dev.sen.studio" className="text-orange-500">dev.sen.studio</Link>
      </Text>
      
      <Text className="text-gray-500 text-xs mt-4">
        SenDev ™ – Fast-track MVPs and startup infrastructures with full-stack Vibe Coding
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
  )
}