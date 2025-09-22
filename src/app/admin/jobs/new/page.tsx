"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import AdminFooter from '@/components/admin-footer'
import AdminNav from '@/components/admin-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useProjects } from '@/hooks/use-data'
import { sampleCoverLetterData } from '@/lib/pdf/sample-data'

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'sent', label: 'Sent' },
  { value: 'denied', label: 'Denied' }
] as const

type StatusValue = (typeof STATUS_OPTIONS)[number]['value']

type JobFormState = {
  role: string
  company: string
  jobUrl: string
  status: StatusValue
  appliedDate: string
  contactName: string
  contactEmail: string
  location: string
  notes: string
  jobDescription: string
  projectIds: string[]
  coverLetter: string
}

const initialFormState: JobFormState = {
  role: '',
  company: '',
  jobUrl: '',
  status: 'pending',
  appliedDate: '',
  contactName: '',
  contactEmail: '',
  location: '',
  notes: '',
  jobDescription: '',
  projectIds: [],
  coverLetter: ''
}

export default function NewJobApplicationPage() {
  const router = useRouter()
  const { projects } = useProjects()

  const [form, setForm] = useState<JobFormState>(initialFormState)
  const [scraping, setScraping] = useState(false)
  const [drafting, setDrafting] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleScrape = async () => {
    if (!form.jobUrl) {
      setError('Please provide a job URL before scraping.')
      return
    }

    setScraping(true)
    setError(null)

    try {
      const response = await fetch('/api/scrape-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: form.jobUrl })
      })

      if (!response.ok) {
        throw new Error('Failed to scrape the job posting')
      }

      const payload = await response.json()
      let combined = ''
      if (payload?.content) {
        try {
          const parsed = JSON.parse(payload.content)
          combined = [parsed.title, parsed.description, parsed.h1, parsed.content]
            .filter(Boolean)
            .join('\n\n')
        } catch {
          combined = payload.content
        }
      }

      setForm((prev) => ({
        ...prev,
        jobDescription: combined || prev.jobDescription
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to scrape job posting')
    } finally {
      setScraping(false)
    }
  }

  const handleGenerateDraft = async () => {
    setDrafting(true)
    setError(null)

    try {
      const response = await fetch('/api/jobs/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: form.role,
          company: form.company,
          job_url: form.jobUrl,
          job_description: form.jobDescription,
          contact_name: form.contactName,
          project_ids: form.projectIds
        })
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Failed to generate AI draft')
      }

      const payload = await response.json()
      const data = payload.data ?? {}

      setForm((prev) => ({
        ...prev,
        role: data.role || prev.role,
        company: data.company || prev.company,
        contactName: data.contactName || prev.contactName,
        jobDescription: data.jobDescription || prev.jobDescription,
        coverLetter: data.coverLetter || prev.coverLetter,
        notes: data.notes || prev.notes
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to generate AI draft')
    } finally {
      setDrafting(false)
    }
  }

  const handlePreviewPdf = async (type: 'cv' | 'cover-letter') => {
    const endpoint = type === 'cv' ? '/api/pdf/cv' : '/api/pdf/cover-letter'

    try {
      const payload =
        type === 'cv'
          ? {
              project_ids: form.projectIds
            }
          : {
              data: {
                applicant: sampleCoverLetterData.applicant,
                recipient: {
                  company: form.company || 'Unternehmen',
                  contactPerson: form.contactName || undefined,
                  role: form.role || 'Position'
                },
                jobUrl: form.jobUrl || undefined,
                subject: `Bewerbung als ${form.role || 'Position'}`,
                body: form.coverLetter || sampleCoverLetterData.body,
                date: new Intl.DateTimeFormat('de-DE', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                }).format(new Date())
              }
            }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('PDF generation failed')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank', 'noopener,noreferrer')
      setTimeout(() => URL.revokeObjectURL(url), 60_000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to generate preview PDF')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const payload = {
        role: form.role,
        company: form.company,
        job_url: form.jobUrl || null,
        status: form.status,
        applied_at: form.appliedDate ? new Date(form.appliedDate).toISOString() : null,
        contact_name: form.contactName || null,
        contact_email: form.contactEmail || null,
        location: form.location || null,
        notes: form.notes || null,
        job_description: form.jobDescription || null,
        project_ids: form.projectIds
      }

      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null)
        throw new Error(errorPayload?.error || 'Failed to create job application')
      }

      router.push('/admin?tab=job')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create job application')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <main className="container mx-auto max-w-3xl py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">New Job Application</h1>
            <p className="text-sm text-muted-foreground">
              Research the posting, generate AI assets, then save everything in one flow.
            </p>
          </div>
          <Link href="/admin?tab=job">
            <Button variant="outline">Back to Job Board</Button>
          </Link>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>1. Job Posting</CardTitle>
              <CardDescription>
                Start with the job URL. We will try to pull relevant copy for the AI draft.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-url">Job URL</Label>
                <div className="flex flex-col gap-2 md:flex-row">
                  <Input
                    id="job-url"
                    type="url"
                    value={form.jobUrl}
                    onChange={(event) => setForm((prev) => ({ ...prev, jobUrl: event.target.value }))}
                    placeholder="https://company.com/careers/..."
                    className="md:flex-1"
                  />
                  <Button type="button" onClick={handleScrape} disabled={scraping}>
                    {scraping ? 'Fetching…' : 'Scrape Posting'}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-description">Raw description</Label>
                <Textarea
                  id="job-description"
                  rows={6}
                  value={form.jobDescription}
                  onChange={(event) => setForm((prev) => ({ ...prev, jobDescription: event.target.value }))}
                  placeholder="Paste or review the extracted job description here."
                />
                <p className="text-xs text-muted-foreground">
                  Edit the text before generating if the scrape was not perfect.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>2. AI Draft & Details</CardTitle>
                <CardDescription>
                  Fill in key fields, generate the cover letter draft, then refine as needed.
                </CardDescription>
              </div>
              <Button type="button" variant="outline" onClick={handleGenerateDraft} disabled={drafting}>
                {drafting ? 'Generating…' : 'Generate AI Draft'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="role">Role / Position</Label>
                  <Input
                    id="role"
                    value={form.role}
                    onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
                    placeholder="Senior Frontend Engineer"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={form.company}
                    onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
                    placeholder="Acme Labs"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="applied-date">Applied on</Label>
                  <Input
                    id="applied-date"
                    type="date"
                    value={form.appliedDate}
                    onChange={(event) => setForm((prev) => ({ ...prev, appliedDate: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(value: StatusValue) => setForm((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Contact</Label>
                  <Input
                    id="contact-name"
                    value={form.contactName}
                    onChange={(event) => setForm((prev) => ({ ...prev, contactName: event.target.value }))}
                    placeholder="Hiring Manager"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    value={form.contactEmail}
                    onChange={(event) => setForm((prev) => ({ ...prev, contactEmail: event.target.value }))}
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
                  placeholder="Remote / Frankfurt"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Internal notes</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  value={form.notes}
                  onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                  placeholder="Next follow-up, warm intro, tone preferences..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover-letter">Cover letter draft</Label>
                <Textarea
                  id="cover-letter"
                  rows={8}
                  value={form.coverLetter}
                  onChange={(event) => setForm((prev) => ({ ...prev, coverLetter: event.target.value }))}
                  placeholder="Generate and refine the AI draft here."
                />
                <div className="flex justify-end">
                  <Button type="button" variant="outline" onClick={() => handlePreviewPdf('cover-letter')}>
                    Preview Letter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Projects & Assets</CardTitle>
              <CardDescription>
                Select matching projects, preview the PDFs, then save the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Matching projects</Label>
                <div className="rounded-md border">
                  <div className="divide-y">
                    {projects.map((project) => (
                      <label key={project.id} className="flex items-start gap-3 px-4 py-3">
                        <input
                          type="checkbox"
                          className="mt-1"
                          checked={form.projectIds.includes(project.id)}
                          onChange={(event) =>
                            setForm((prev) => ({
                              ...prev,
                              projectIds: event.target.checked
                                ? [...prev.projectIds, project.id]
                                : prev.projectIds.filter((id) => id !== project.id)
                            }))
                          }
                        />
                        <span className="text-sm">
                          <span className="font-medium">{project.title}</span>
                          <span className="block text-muted-foreground">
                            {project.tags?.join(' • ') ?? project.summary}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {error ? (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => handlePreviewPdf('cv')}>
                    Preview CV
                  </Button>
                  <Button type="button" variant="outline" onClick={() => handlePreviewPdf('cover-letter')}>
                    Preview Letter
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" onClick={() => router.push('/admin?tab=job')}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? 'Creating…' : 'Create Application'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>

      <AdminFooter />
    </div>
  )
}
