import { NextResponse } from 'next/server'

import { buildCvData } from '@/lib/server/cv-builder'
import { generateCoverLetter } from '@/lib/server/cover-letter-generator'
import { cvProfileBase } from '@/lib/pdf/profile'
import { sampleCoverLetterData } from '@/lib/pdf/sample-data'

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

    const role = body.role?.trim() || ''
    const company = body.company?.trim() || ''
    const jobUrl = body.job_url?.trim()
    const jobDescription = body.job_description?.trim()
    const contactName = body.contact_name?.trim()
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
      summary: cvProfileBase.summary,
      skills
    })

    return NextResponse.json({
      data: {
        role: role || coverLetter.recipient.role || '',
        company: company || coverLetter.recipient.company || '',
        contactName: contactName || coverLetter.recipient.contactPerson || '',
        jobDescription: jobDescription || '',
        coverLetter: coverLetter.body
      }
    })
  } catch (error) {
    console.error('AI draft generation failed:', error)
    return NextResponse.json({ error: 'Failed to generate AI draft' }, { status: 500 })
  }
}
