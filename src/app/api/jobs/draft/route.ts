import { NextResponse } from 'next/server'

import { buildCvData } from '@/lib/server/cv-builder'
import { generateCoverLetter } from '@/lib/server/cover-letter-generator'
import { cvProfileBase } from '@/lib/pdf/profile'
import { sampleCoverLetterData } from '@/lib/pdf/sample-data'

function inferContactName(description?: string) {
  if (!description) return ''
  const patterns = [
    /Ansprechpartner(?:in)?:?\s*([A-ZÄÖÜ][^\n,]+)/i,
    /Kontaktperson:?\s*([A-ZÄÖÜ][^\n,]+)/i,
    /Contact:?\s*([A-Z][^\n,]+)/i,
    /Hiring Manager:?\s*([A-Z][^\n,]+)/i
  ]
  for (const pattern of patterns) {
    const match = description.match(pattern)
    if (match?.[1]) {
      return match[1].trim()
    }
  }
  return ''
}

function inferLocation(description?: string) {
  if (!description) return ''
  const match = description.match(/(?:Standort|Location)[:\s]+([^\n]+)/i)
  if (match?.[1]) {
    return match[1].replace(/[,;].*$/, '').trim()
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
