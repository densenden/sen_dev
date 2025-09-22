import type { CVData, CVProjectEntry } from '@/lib/pdf/types'

export type CVProfileBase = Omit<CVData, 'projects'>

export const cvProfileBase: CVProfileBase = {
  fullName: 'Denis Leif Kreuzer',
  title: 'Full Stack Creative Technologist',
  summary:
    'Multidisciplinary full-stack developer with 15+ years across design, product, and engineering. I ship AI-powered workflows, composable web systems, and expressive visual tooling for Olympic campaigns, fast-moving startups, and venture studios.',
  technicalSkills: [
    {
      label: 'AI Systems',
      items: ['Claude 3 Opus/Sonnet', 'GPT-4o & o1', 'Prompt Orchestration', 'LangChain', 'Vector & RAG Pipelines']
    },
    {
      label: 'Frontend',
      items: ['TypeScript', 'React/Next.js', 'Tailwind CSS', 'Design Systems', 'Framer Motion']
    },
    {
      label: 'Backend',
      items: ['Python', 'Node.js', 'Supabase/PostgreSQL', 'Prisma', 'REST & GraphQL APIs']
    },
    {
      label: 'Automation',
      items: ['Workflow Engines', 'Make/Zapier', 'Webhook Infrastructure', 'Event Pipelines']
    },
    {
      label: 'Tooling',
      items: ['Headless CMS', 'MDX/Content Layer', 'CI/CD', 'Observability']
    }
  ],
  softSkills: [
    'Empathetic Leadership',
    'Clarity in Communication',
    'Calm Presence Under Pressure',
    'Creative Facilitation',
    'Deep Work & Focused Execution'
  ],
  experience: [
    {
      company: 'Studio Sen',
      role: 'Creative Director & Full-Stack Developer (self-employed)',
      location: 'Frankfurt am Main',
      startDate: 'Oct 2024',
      endDate: 'Present',
      highlights: [
        'Led concept and development of AI-powered web applications and creative tools, resulting in 8+ deployed apps across Studio Sen’s digital ecosystem.',
        'Built a modular design system with 40+ reusable UI components using React, TypeScript, Tailwind, and Flask APIs to support scalable development.',
        'Blended strategy, code, and design to deliver 10 branded subdomains under a unified full-stack architecture with dynamic content capabilities.'
      ],
      website: 'https://sen.studio/'
    },
    {
      company: 'Deutsche Sport Marketing GmbH',
      role: 'Communications Manager',
      startDate: 'Jan 2022',
      endDate: 'Sep 2024',
      highlights: [
        'Led AI-assisted workflow automation for media production and multi-brand content distribution.',
        'Developed scalable design systems across three Olympic Games, including seasonal campaigns for Team Deutschland.'
      ],
      website: 'https://www.dsm-olympia.de/'
    },
    {
      company: 'Deutscher Olympischer Sportbund (DOSB)',
      role: 'Marketing & Creative Director',
      startDate: 'Mar 2019',
      endDate: 'Dec 2021',
      highlights: [
        'Directed creative strategy and led campaigns for five national brands including Team Deutschland and Deutsches Sportabzeichen.',
        'Optimised media production workflows and brand distribution using AI-powered automation, reducing manual workload by over 40%.',
        'Delivered wayfinding systems, visual identities, and packaging for international clients and events.'
      ],
      website: 'https://www.dosb.de/'
    },
    {
      company: 'AGLTY Business Development Interface',
      role: 'Managing Director & Brand Consultant (self-employed)',
      startDate: 'Mar 2016',
      endDate: 'Feb 2019',
      highlights: [
        'Founded and ran a boutique agency for startup branding and digital innovation.',
        'Launched and advised Kickstarter campaigns that resulted in multiple exits and active companies.'
      ]
    },
    {
      company: 'CRKR Design Studio',
      role: 'Creative Director (self-employed)',
      startDate: 'Mar 2013',
      endDate: 'Feb 2016',
      highlights: [
        'Led interactive design projects across large-scale public spaces, exhibitions, and installations.',
        'Combined design direction with technical implementation for orientation systems, digital signage, and generative media.'
      ]
    }
  ],
  education: [
    {
      institution: 'Masterschool',
      program: 'Software Engineering',
      startYear: 'Nov 2024',
      endYear: 'Present',
      details: [
        'Immersive online training shaped by industry partners.',
        'Focus on Python, web applications, OOP, databases, SQL, Linux, Flask, HTML, CSS, Docker, and cloud.'
      ]
    },
    {
      institution: 'University of Applied Sciences Darmstadt',
      program: 'Diploma (Dipl.-Des.) Communication Design',
      startYear: 'Oct 2007',
      endYear: 'Jul 2012',
      details: [
        'Specialisation in interaction design, UX psychology, business design, and design thinking.',
        'Diploma thesis on design systems for digital interaction including prototyping and perception theory.'
      ]
    }
  ],
  languages: ['German (Native)', 'English (C1)', 'French (A2)', 'Spanish (A2)'],
  interests: ['Fitness & Physical Performance', 'Mindfulness & Conscious Living', 'Contemporary & Generative Art'],
  contact: {
    email: 'denis@kreuzer.dk',
    phone: '+49 176 2095 7038',
    location: 'Frankfurt, Germany',
    website: 'https://dev.sen.studio/',
    linktree: 'https://sen.studio',
    socials: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/denisleifkreuzer/' },
      { label: 'GitHub', url: 'https://github.com/densenden' }
    ]
  }
}

export const defaultProjectHighlights: CVProjectEntry[] = [
  {
    title: 'Meme Machine',
    summary: 'WhatsApp-based meme generator with subscription tiers, viral unlock mechanics, and Claude-powered content pipeline.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Twilio API', 'Stripe', 'Claude 3', 'OpenAI Assistants'],
    year: '2025',
    caseStudyUrl: 'https://dev.sen.studio/projects/meme-machine',
    thumbnail: 'https://dummyimage.com/320x200/eff2f6/1f2937&text=Meme+Machine'
  },
  {
    title: 'SenFlix',
    summary: 'Film discovery experience with semantic search, smart playlists, and cross-platform sharing built for creative communities.',
    techStack: ['Python', 'Flask', 'Supabase', 'Tailwind', 'Claude 3', 'OpenAI GPT-4o'],
    year: '2025',
    caseStudyUrl: 'https://dev.sen.studio/projects/senflix',
    thumbnail: 'https://dummyimage.com/320x200/ede9fe/1f2937&text=SenFlix'
  },
  {
    title: 'x-drop',
    summary: 'Screenshot-to-post workflow that drafts on-brand copy with Claude, schedules delivery, and syncs analytics back to Notion.',
    techStack: ['Next.js', 'Edge Runtime', 'Supabase', 'Claude 3 Haiku', 'Vercel KV'],
    year: '2025',
    caseStudyUrl: 'https://dev.sen.studio/projects/x-drop',
    thumbnail: 'https://dummyimage.com/320x200/e0f2fe/1f2937&text=x-drop'
  },
  {
    title: 'slideJSON',
    summary: 'JSON-driven presentation engine for technical demos with realtime theming, AI-assisted slide copy, and PDF export.',
    techStack: ['Flask', 'Tailwind', 'Claude 3 Sonnet', 'OpenAI GPT-4o', 'Vercel'],
    year: '2025',
    caseStudyUrl: 'https://dev.sen.studio/projects/slidejson',
    thumbnail: 'https://dummyimage.com/320x200/f1f5f9/1f2937&text=slideJSON'
  }
]
