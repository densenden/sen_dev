import { NextResponse } from 'next/server'

import { buildCvData } from '@/lib/server/cv-builder'
import { generateCoverLetter } from '@/lib/server/cover-letter-generator'
import { cvProfileBase } from '@/lib/pdf/profile'
import { sampleCoverLetterData } from '@/lib/pdf/sample-data'

function inferContactName(description?: string) {
  if (!description) return ''
  const patterns = [
    // Match "Herr/Frau Firstname Lastname" patterns
    /(?:Herr|Frau|Mr\.?|Ms\.?|Mrs\.?)\s+([A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ][a-zäöüß]+)*)/i,
    // Match "Ansprechpartner: Name" but limit to 2-3 words max
    /Ansprechpartner(?:in)?:?\s*([A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ][a-zäöüß]+){0,2})/i,
    // Match "Kontaktperson: Name" but limit to 2-3 words max  
    /Kontaktperson:?\s*([A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ][a-zäöüß]+){0,2})/i,
    // Match "Contact: Name" but limit to 2-3 words max
    /Contact:?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})/i,
    // Match "Hiring Manager: Name" but limit to 2-3 words max
    /Hiring Manager:?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})/i
  ]
  for (const pattern of patterns) {
    const match = description.match(pattern)
    if (match?.[1]) {
      let name = match[1].trim()
      // Remove any parenthetical content like "(Senior HR Manager)"
      name = name.replace(/\s*\([^)]*\).*$/, '')
      // Remove any additional text after common separators
      name = name.replace(/\s*[,;:].*$/, '')
      // Limit to reasonable name length (max 3 words)
      const words = name.split(/\s+/)
      if (words.length <= 3) {
        return name
      }
    }
  }
  return ''
}

function inferLocation(description?: string) {
  if (!description) return ''
  
  // Look for location patterns and extract only city names
  const patterns = [
    // Match "Standort: City" or "Location: City"
    /(?:Standort|Location)[:\s]+([A-ZÄÖÜ][a-zäöüß]+(?:\s+[a-zäöüß]+)?)/i,
    // Match standalone cities at beginning of lines
    /^([A-ZÄÖÜ][a-zäöüß]+)(?:\s+[A-Z][a-z]+)?\s*(?:Brand:|Time|Type|Contract)/im,
    // Match cities followed by common job posting keywords
    /([A-ZÄÖÜ][a-zäöüß]+)\s+(?:Brand|Office|Standort|Location)/i
  ]
  
  for (const pattern of patterns) {
    const match = description.match(pattern)
    if (match?.[1]) {
      let location = match[1].trim()
      // Remove any trailing punctuation or extra words
      location = location.replace(/[,;:].*$/, '')
      // Only return if it looks like a city name (1-2 words max)
      const words = location.split(/\s+/)
      if (words.length <= 2 && location.length <= 30) {
        return location
      }
    }
  }
  
  if (/remote/i.test(description)) {
    return 'Remote'
  }
  return ''
}

function inferEmail(description?: string) {
  if (!description) return ''
  const match = description.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
  return match?.[0] ?? ''
}

function inferRole(description?: string) {
  if (!description) return ''
  const lines = description
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const firstLine = lines[0] ?? ''
  return firstLine.slice(0, 140)
}

function inferCompany(jobUrl?: string | null) {
  if (!jobUrl) return ''
  try {
    const host = new URL(jobUrl).hostname.replace(/^www\./, '')
    const parts = host.split('.')
    const core = parts.length > 2 ? parts[parts.length - 2] : parts[0]
    return core.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
  } catch {
    return ''
  }
}

type DraftRequest = {
  role?: string
  company?: string
  job_url?: string
  job_description?: string
  contact_name?: string
  project_ids?: string[]
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DraftRequest

    const jobDescription = body.job_description?.trim()
    const jobUrl = body.job_url?.trim()

    const role = body.role?.trim() || inferRole(jobDescription) || ''
    const company = body.company?.trim() || inferCompany(jobUrl) || ''
    const contactName = body.contact_name?.trim() || inferContactName(jobDescription) || ''
    const contactEmail = inferEmail(jobDescription)
    const location = inferLocation(jobDescription)
    const projectIds = Array.isArray(body.project_ids) ? body.project_ids.filter(Boolean) : []

    const cvData = await buildCvData(projectIds)
    const projects = cvData.projects
    const skills = cvProfileBase.technicalSkills.flatMap((group) => group.items)

    const coverLetter = await generateCoverLetter({
      job: {
        role: role || 'Position',
        company: company || 'Unternehmen',
        jobUrl,
        jobDescription,
        contactName
      },
      applicant: sampleCoverLetterData.applicant,
      projects,
      summary: cvData.summary,
      summaryLines: cvData.summaryLines,
      skills
    })

    const today = new Date().toISOString().slice(0, 10)

    return NextResponse.json({
      data: {
        role: role || coverLetter.recipient.role || '',
        company: company || coverLetter.recipient.company || '',
        jobUrl: jobUrl || coverLetter.jobUrl || '',
        contactName: contactName || coverLetter.recipient.contactPerson || '',
        contactEmail,
        location: location || coverLetter.recipient.city || '',
        jobDescription: jobDescription || '',
        coverLetter: coverLetter.body,
        appliedDate: today,
        status: 'pending'
      }
    })
  } catch (error) {
    console.error('AI draft generation failed:', error)
    return NextResponse.json({ error: 'Failed to generate AI draft' }, { status: 500 })
  }
}
