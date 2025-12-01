import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components'
import Signature from './components/signature'

type Locale = 'en' | 'de'

interface JobApplicationRejectionUserProps {
  name: string
  jobTitle: string
  locale?: Locale
}

const copy = {
  en: {
    preview: 'Update on your application at Studio Sen',
    heading: 'Thank you for your application',
    hi: 'Hi',
    intro: 'Thank you for your interest in joining our team and for taking the time to apply for',
    decision: 'After careful consideration, we have decided to move forward with other candidates whose experience more closely aligns with our current needs.',
    encouragement: 'This was not an easy decision, and we genuinely appreciate the effort you put into your application.',
    future: 'We encourage you to keep an eye on our',
    futureLink: 'careers page',
    futureSuffix: 'for future opportunities that might be a better fit.',
    closing: 'We wish you all the best in your career journey and future endeavors.',
    footer: 'This email was sent from dev.sen.studio',
    footerConfidential: 'All applications are treated confidentially'
  },
  de: {
    preview: 'Update zu deiner Bewerbung bei Studio Sen',
    heading: 'Danke für deine Bewerbung',
    hi: 'Hi',
    intro: 'Vielen Dank für dein Interesse an unserem Team und dass du dir die Zeit genommen hast, dich zu bewerben für',
    decision: 'Nach sorgfältiger Prüfung haben wir uns entschieden, mit anderen Kandidaten fortzufahren, deren Erfahrung besser zu unseren aktuellen Anforderungen passt.',
    encouragement: 'Diese Entscheidung war nicht einfach, und wir schätzen den Aufwand, den du in deine Bewerbung gesteckt hast.',
    future: 'Wir ermutigen dich, unsere',
    futureLink: 'Karriereseite',
    futureSuffix: 'im Auge zu behalten für zukünftige Möglichkeiten, die besser passen könnten.',
    closing: 'Wir wünschen dir alles Gute für deine Karriere und deine zukünftigen Vorhaben.',
    footer: 'Diese E-Mail wurde von dev.sen.studio gesendet',
    footerConfidential: 'Alle Bewerbungen werden vertraulich behandelt'
  }
}

export default function JobApplicationRejectionUser({
  name = 'Max Mustermann',
  jobTitle = 'Web Development Praktikum',
  locale = 'en'
}: JobApplicationRejectionUserProps) {
  const t = copy[locale]
  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-8 px-4 max-w-2xl">
            {/* Header */}
            <Section className="text-center mb-8">
              <Img
                src="https://dev.sen.studio/logo.svg"
                width="25"
                height="25"
                alt="SenDev"
                className="mx-auto mb-4"
              />
              <Heading className="text-2xl font-light text-gray-900 tracking-wide">
                {t.heading}
              </Heading>
            </Section>

            {/* Content */}
            <Section className="mb-8">
              <Text className="text-gray-700 mb-4">
                {t.hi} {name},
              </Text>

              <Text className="text-gray-700 mb-4">
                {t.intro} <strong>{jobTitle}</strong>.
              </Text>

              <Text className="text-gray-700 mb-4">
                {t.decision}
              </Text>

              <Text className="text-gray-700 mb-4">
                {t.encouragement}
              </Text>

              <Text className="text-gray-700 mb-4">
                {t.future}{' '}
                <Link href="https://dev.sen.studio/jobs" className="text-orange-500 underline">
                  {t.futureLink}
                </Link>{' '}
                {t.futureSuffix}
              </Text>

              <Text className="text-gray-700 mb-4">
                {t.closing}
              </Text>
            </Section>

            {/* Signature */}
            <Signature />

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-6 mt-8">
              <Text className="text-gray-500 text-xs text-center">
                {t.footer}<br />
                {t.footerConfidential}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
