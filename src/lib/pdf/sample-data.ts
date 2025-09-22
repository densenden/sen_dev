import type { CVData, CoverLetterData } from '@/lib/pdf/types'
import { cvProfileBase, defaultProjectHighlights } from '@/lib/pdf/profile'

export const sampleCVData: CVData = {
  ...cvProfileBase,
  projects: defaultProjectHighlights.map((project) => ({
    ...project,
    thumbnail: undefined
  }))
}

export const sampleCoverLetterData: CoverLetterData = {
  applicant: {
    fullName: 'Denis Leif Kreuzer',
    street: 'Paradiesgasse 53',
    city: '60594 Frankfurt am Main',
    phone: '+49 173 1234567',
    email: 'hello@sen.dev',
    linktree: 'https://sen.studio',
    socials: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/denisleifkreuzer/' },
      { label: 'GitHub', url: 'https://github.com/densenden' }
    ]
  },
  recipient: {
    company: 'Hochschule RheinMain',
    contactPerson: 'Johannes Luderschmidt',
    role: 'Wissenschaftliche:r Mitarbeiter:in (m/w/d) im Drittmittelprojekt DiValuation',
    addressLines: ['Kurt-Schumacher-Ring 18'],
    city: '65343 Wiesbaden'
  },
  jobUrl: 'https://hs-rheinmain.de/jobs/divaluation',
  subject: 'Bewerbung als Wissenschaftliche:r Mitarbeiter:in (m/w/d) im Drittmittelprojekt DiValuation',
  date: new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date()),
  body: [
    'Sehr geehrter Herr Luderschmidt,',
    '',
    'die ausgeschriebene Position im Drittmittelprojekt DiValuation hat mich sofort angesprochen, da sie meine Kompetenzen in Datenvisualisierung, Interface Design und wissenschaftlicher Analyse ideal verbindet.',
    '',
    'In meiner bisherigen Laufbahn habe ich kreative und technische Projekte von der Konzeption bis zur Umsetzung verantwortet. Dabei habe ich Erfahrungen in der Analyse qualitativer Daten, der strukturierenden Aufbereitung komplexer Inhalte sowie der Entwicklung interaktiver Visualisierungen gesammelt.',
    '',
    'Meine Ausbildung und Praxis als Softwareentwickler und Designer sowie meine Fortbildung zum AI Software Engineer haben mir ein interdisziplinäres Profil ermöglicht, das analytische Genauigkeit mit visueller Kreativität verbindet.',
    '',
    'Sehr gerne möchte ich meine Expertise einbringen, um die Hochschule RheinMain in diesem Forschungsprojekt tatkräftig zu unterstützen.',
    '',
    'Ich freue mich über die Einladung zu einem persönlichen Gespräch.'
  ].join('\n')
}
