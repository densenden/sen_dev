export interface CVTechnicalSkillGroup {
  label: string
  items: string[]
}

export interface CVExperienceEntry {
  company: string
  role: string
  location?: string
  startDate: string
  endDate: string | 'Present'
  highlights: string[]
  website?: string
}

export interface CVDegree {
  institution: string
  program: string
  startYear: string
  endYear: string
  details?: string[]
}

export interface CVProjectEntry {
  title: string
  summary: string
  techStack: string[]
  year?: string
  caseStudyUrl?: string
  liveUrl?: string
  thumbnail?: string
}

export interface CVData {
  fullName: string
  title: string
  summary: string
  summaryLines?: string[]
  technicalSkills: CVTechnicalSkillGroup[]
  softSkills: string[]
  experience: CVExperienceEntry[]
  education: CVDegree[]
  projects: CVProjectEntry[]
  languages: string[]
  interests: string[]
  contact: {
    email: string
    phone: string
    location: string
    website?: string
    linktree?: string
    socials?: Array<{ label: string; url: string }>
  }
}

export interface CoverLetterRecipient {
  company: string
  contactPerson?: string
  role: string
  addressLines?: string[]
  city?: string
}

export interface CoverLetterData {
  applicant: {
    fullName: string
    street: string
    city: string
    phone: string
    email: string
    linktree?: string
    socials?: Array<{ label: string; url: string }>
  }
  recipient: CoverLetterRecipient
  jobUrl?: string
  subject: string
  body: string
  date: string
}
