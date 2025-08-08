import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
} from '@react-email/components'
import { ReactNode } from 'react'

interface BaseEmailLayoutProps {
  children: ReactNode
  previewText: string
  title: string
  logoUrl?: string
  logoAlt?: string
}

export default function BaseEmailLayout({
  children,
  previewText,
  title,
  logoUrl = "https://shop.sen.studio/logo.svg",
  logoAlt = "SenCommerce"
}: BaseEmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Header */}
            <Section className="text-center mb-8">
              <Img
                src={logoUrl}
                width="25"
                height="25"
                alt={logoAlt}
                className="mx-auto mb-4"
              />
              <Heading className="text-2xl font-light text-gray-900 tracking-wide">
                {title}
              </Heading>
            </Section>

            {/* Content */}
            {children}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}