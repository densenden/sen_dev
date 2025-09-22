import fs from 'node:fs'
import path from 'node:path'

import React from 'react'
import { renderToFile } from '@react-pdf/renderer'

import { CVDocument } from '@/lib/pdf/CVDocument'
import { CoverLetterDocument } from '@/lib/pdf/CoverLetterDocument'
import type { CVData, CoverLetterData } from '@/lib/pdf/types'

const projectRoot = process.cwd()
const publicDir = path.join(projectRoot, 'public')
const prototypesDir = path.join(publicDir, 'prototypes')

if (!fs.existsSync(prototypesDir)) {
  fs.mkdirSync(prototypesDir, { recursive: true })
}

const portraitPath = path.join(publicDir, 'denis.png')

const cvData: CVData = {
  fullName: 'Denis Leif Kreuzer',
  title: 'Full Stack Creative Technologist',
  summary:
    'Creative technologist with 10+ years blending product strategy, interaction design, and modern web engineering. I focus on lightning-fast MVPs, AI-enhanced workflows, and immersive brand experiences that ship to production.',
  technicalSkills: [
    {
      label: 'Frontend',
      items: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Framer Motion']
    },
    {
      label: 'Backend',
      items: ['Node.js', 'Supabase', 'PostgreSQL', 'tRPC', 'REST APIs']
    },
    {
      label: 'AI & Automation',
      items: ['OpenAI', 'Anthropic', 'LangChain', 'Workflow Orchestration', 'RAG']
    },
    {
      label: 'CMS & Tooling',
      items: ['Sanity', 'Storyblok', 'Notion', 'Make', 'HubSpot']
    }
  ],
  softSkills: [
    'Stakeholder facilitation & workshop leadership',
    'Rapid prototyping and design sprints',
    'Team enablement & technical coaching',
    'Clear communication between business & tech'
  ],
  experience: [
    {
      company: 'SEN.DEV Studio',
      role: 'Founder & Principal Creative Technologist',
      location: 'Frankfurt am Main',
      startDate: '2021',
      endDate: 'Present',
      highlights: [
        'Lead cross-functional squads delivering full-stack products from discovery to launch.',
        'Built reusable design system and tech stack powering 20+ client engagements.',
        'Integrated AI copilots for research synthesis, content, and code acceleration.'
      ],
      website: 'https://sen.dev'
    },
    {
      company: 'UNIT9 Berlin',
      role: 'Creative Developer',
      location: 'Berlin',
      startDate: '2018',
      endDate: '2021',
      highlights: [
        'Shipped award-winning interactive installations and campaign sites for global brands.',
        'Designed realtime data visualisations and physical computing prototypes.',
        'Partnered with designers to craft narrative-driven digital experiences.'
      ],
      website: 'https://unit9.com'
    }
  ],
  education: [
    {
      institution: 'Masterschool',
      program: 'AI Software Engineering Program',
      startYear: '2023',
      endYear: '2024',
      details: ['Focus on LLM integration, prompt engineering, and applied machine learning.']
    },
    {
      institution: 'Hochschule RheinMain',
      program: 'B.A. Media & Design Management',
      startYear: '2012',
      endYear: '2016'
    }
  ],
  projects: [
    {
      title: 'SenCommerce',
      summary: 'Composable e-commerce platform with personalised product storytelling and AI-driven CRM workflows.',
      techStack: ['Next.js', 'Supabase', 'Stripe'],
      year: '2024',
      caseStudyUrl: 'https://dev.sen.studio/projects/sencommerce'
    },
    {
      title: 'EduFlow LMS',
      summary: 'Learning management MVP for internal enablement with granular analytics and adaptive content.',
      techStack: ['Next.js', 'tRPC', 'PostgreSQL'],
      year: '2023',
      caseStudyUrl: 'https://dev.sen.studio/projects/eduflow'
    },
    {
      title: 'Motion Lab Berlin',
      summary: 'Immersive installation combining projection mapping, sensor inputs, and custom audio-reactive visuals.',
      techStack: ['Three.js', 'WebGL', 'TouchDesigner'],
      year: '2022'
    }
  ],
  languages: ['German (native)', 'English (fluent)', 'Spanish (basic)'],
  interests: ['Generative art', 'Futures research', 'Jazz piano', 'Cycling'],
  contact: {
    email: 'hello@sen.dev',
    phone: '+49 173 1234567',
    location: 'Frankfurt am Main',
    website: 'https://sen.dev'
  }
}

const coverLetterData: CoverLetterData = {
  applicant: {
    fullName: 'Denis Leif Kreuzer',
    street: 'Paradiesgasse 53',
    city: '60594 Frankfurt am Main',
    phone: '+49 173 1234567',
    email: 'hello@sen.dev'
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
  date: new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date()),
  body: `Sehr geehrter Herr Luderschmidt,\n\n` +
    'die ausgeschriebene Position im Drittmittelprojekt DiValuation hat mich sofort angesprochen, da sie meine Kompetenzen in Datenvisualisierung, Interface Design und wissenschaftlicher Analyse ideal verbindet.' +
    '\n\nIn meiner bisherigen Laufbahn habe ich kreative und technische Projekte von der Konzeption bis zur Umsetzung verantwortet. Dabei habe ich Erfahrungen in der Analyse qualitativer Daten, der strukturierenden Aufbereitung komplexer Inhalte sowie der Entwicklung interaktiver Visualisierungen gesammelt.' +
    '\n\nMeine Ausbildung und Praxis als Softwareentwickler und Designer sowie meine Fortbildung zum AI Software Engineer haben mir ein interdisziplinäres Profil ermöglicht, das analytische Genauigkeit mit visueller Kreativität verbindet.' +
    '\n\nSehr gerne möchte ich meine Expertise einbringen, um die Hochschule RheinMain in diesem Forschungsprojekt tatkräftig zu unterstützen.' +
    '\n\nIch freue mich über die Einladung zu einem persönlichen Gespräch.'
}

async function generatePrototypes() {
  const cvOutputPath = path.join(prototypesDir, 'cv-prototype.pdf')
  const coverLetterOutputPath = path.join(prototypesDir, 'cover-letter-prototype.pdf')

  await renderToFile(<CVDocument data={cvData} portraitUrl={portraitPath} />, cvOutputPath)
  await renderToFile(<CoverLetterDocument data={coverLetterData} />, coverLetterOutputPath)

  console.log('Generated PDF prototypes:')
  console.log(` - ${path.relative(projectRoot, cvOutputPath)}`)
  console.log(` - ${path.relative(projectRoot, coverLetterOutputPath)}`)
}

generatePrototypes().catch((error) => {
  console.error('Failed to generate prototypes', error)
  process.exit(1)
})
