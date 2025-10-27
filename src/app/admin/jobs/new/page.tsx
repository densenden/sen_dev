"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { CheckCircle2, Download, Loader2, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'

import AdminFooter from '@/components/admin-footer'
import AdminNav from '@/components/admin-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useProjects } from '@/hooks/use-data'
import { sampleCoverLetterData } from '@/lib/pdf/sample-data'
import { cn } from '@/lib/utils'
import type { Database } from '@/lib/supabase'

const STATUS_OPTIONS = [
  { value: 'in_progress', label: 'Documents ready' },
  { value: 'sent', label: 'Application sent' },
  { value: 'pending', label: 'Pending' },
  { value: 'denied', label: 'Denied' }
] as const

type StatusValue = (typeof STATUS_OPTIONS)[number]['value']

const MAX_PROJECT_SELECTION = 4

type ProjectRow = Database['public']['Tables']['projects']['Row']

const KEYWORD_REGEX = /[a-z0-9+#]+/gi

const APPLICANT_FILE_STEM = 'DenisLeifKreuzer'

type PreviewType = 'cv' | 'cover-letter'

function extractKeywords(input?: string | null): string[] {
  if (!input) return []

  const matches = input.match(KEYWORD_REGEX)
  if (!matches) return []

  return Array.from(new Set(matches.map((token) => token.toLowerCase()).filter((token) => token.length > 1)))
}

function countKeywordMatches(values: Array<string | null | undefined>, jobKeywords: Set<string>): number {
  let matches = 0

  for (const value of values) {
    if (!value) continue
    for (const token of extractKeywords(value)) {
      if (jobKeywords.has(token)) {
        matches += 1
      }
    }
  }

  return matches
}

function suggestProjectIds(
  projects: ProjectRow[],
  details: { role?: string; company?: string; description?: string }
): string[] {
  const jobKeywords = new Set<string>()
  for (const keyword of extractKeywords(details.role)) jobKeywords.add(keyword)
  for (const keyword of extractKeywords(details.company)) jobKeywords.add(keyword)
  for (const keyword of extractKeywords(details.description)) jobKeywords.add(keyword)

  const scored = projects.map((project) => {
    const tags = Array.isArray(project.tags) ? project.tags : []
    const techStack = Array.isArray(project.tech_stack) ? project.tech_stack : []

    const tagMatches = countKeywordMatches(tags, jobKeywords)
    const techMatches = countKeywordMatches(techStack, jobKeywords)
    const titleMatches = countKeywordMatches([project.title], jobKeywords)
    const summaryMatches = countKeywordMatches([project.summary], jobKeywords)
    const categoryMatches = countKeywordMatches([project.category ?? null], jobKeywords)

    const score = tagMatches * 3 + techMatches * 2 + titleMatches * 2 + Math.min(summaryMatches, 3) + categoryMatches

    return {
      id: project.id,
      score,
      isFeatured: project.is_featured,
      createdAt: project.created_at,
      title: project.title
    }
  })

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    if (a.isFeatured !== b.isFeatured) {
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
    }
    if (a.createdAt && b.createdAt) {
      return b.createdAt.localeCompare(a.createdAt)
    }
    return a.title.localeCompare(b.title)
  })

  const selected: string[] = []

  for (const entry of scored) {
    if (selected.includes(entry.id)) continue
    if (selected.length < MAX_PROJECT_SELECTION) {
      if (entry.score > 0 || jobKeywords.size === 0) {
        selected.push(entry.id)
      }
    }
  }

  if (selected.length < MAX_PROJECT_SELECTION) {
    const fallback = projects
      .filter((project) => !selected.includes(project.id))
      .sort((a, b) => {
        if (a.is_featured !== b.is_featured) {
          return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0)
        }
        return a.title.localeCompare(b.title)
      })
      .map((project) => project.id)

    for (const id of fallback) {
      if (selected.length >= MAX_PROJECT_SELECTION) break
      selected.push(id)
    }
  }

  return selected.slice(0, MAX_PROJECT_SELECTION)
}

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
  const [selectionError, setSelectionError] = useState<string | null>(null)
  const [pdfPreviews, setPdfPreviews] = useState<Record<PreviewType, string | undefined>>({
    cv: undefined,
    'cover-letter': undefined
  })
  const [previewScale, setPreviewScale] = useState<Record<PreviewType, number>>({
    cv: 1,
    'cover-letter': 1
  })
  const [activePreviewTab, setActivePreviewTab] = useState<PreviewType>('cover-letter')
  const [previewLoading, setPreviewLoading] = useState<Record<PreviewType, boolean>>({
    cv: false,
    'cover-letter': false
  })
  const previewUrlsRef = useRef<Record<PreviewType, string | undefined>>({
    cv: undefined,
    'cover-letter': undefined
  })

  useEffect(() => {
    previewUrlsRef.current = pdfPreviews
  }, [pdfPreviews])

  useEffect(() => {
    return () => {
      Object.values(previewUrlsRef.current).forEach((url) => {
        if (url) {
          URL.revokeObjectURL(url)
        }
      })
    }
  }, [])

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
      let scrapedTitle = ''
      if (payload?.content) {
        try {
          const parsed = JSON.parse(payload.content)
          scrapedTitle = (parsed.h1 || parsed.title || '').toString().trim()
          combined = [parsed.title, parsed.description, parsed.h1, parsed.content]
            .filter(Boolean)
            .join('\n\n')
        } catch {
          combined = payload.content
        }
      }

      const inferCompanyFromUrl = () => {
        try {
          const host = new URL(form.jobUrl).hostname
          const parts = host.replace(/^www\./, '').split('.')
          const base = parts[parts.length - 2] || parts[0]
          return base ? base.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : ''
        } catch {
          return ''
        }
      }

      const inferredRole = scrapedTitle || combined.split('\n')[0]?.trim() || ''
      const inferredCompany = inferCompanyFromUrl()

      setForm((prev) => ({
        ...prev,
        role: prev.role || inferredRole,
        company: prev.company || inferredCompany,
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
      const today = new Date().toISOString().slice(0, 10)

      const suggestedProjectIds =
        projects.length > 0
          ? suggestProjectIds(projects, {
              role: data.role || form.role,
              company: data.company || form.company,
              description: data.jobDescription || form.jobDescription
            })
          : []

      if (suggestedProjectIds.length > 0) {
        setSelectionError(null)
      }

      const fallback = {
        contactName: 'Hiring Manager',
        contactEmail: 'name@example.com',
        location: 'Remote / Frankfurt',
        notes: 'Next follow-up, warm intro, tone preferences...'
      }

      setForm((prev) => ({
        ...prev,
        role: data.role || prev.role,
        company: data.company || prev.company,
        jobUrl: data.jobUrl || prev.jobUrl,
        contactName: data.contactName || prev.contactName || fallback.contactName,
        contactEmail: data.contactEmail || prev.contactEmail || fallback.contactEmail,
        location: data.location || prev.location || fallback.location,
        jobDescription: data.jobDescription || prev.jobDescription,
        coverLetter: data.coverLetter || prev.coverLetter,
        notes: prev.notes || fallback.notes,
        status: prev.status || data.status || 'pending',
        appliedDate: prev.appliedDate || data.appliedDate || today,
        projectIds:
          suggestedProjectIds.length > 0
            ? suggestedProjectIds
            : prev.projectIds.slice(0, MAX_PROJECT_SELECTION)
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to generate AI draft')
    } finally {
      setDrafting(false)
    }
  }

  const handleToggleProject = (projectId: string) => {
    setSelectionError(null)

    setForm((prev) => {
      const isSelected = prev.projectIds.includes(projectId)

      if (isSelected) {
        return {
          ...prev,
          projectIds: prev.projectIds.filter((id) => id !== projectId)
        }
      }

      if (prev.projectIds.length >= MAX_PROJECT_SELECTION) {
        setSelectionError(`Select up to ${MAX_PROJECT_SELECTION} projects.`)
        return prev
      }

      return {
        ...prev,
        projectIds: [...prev.projectIds, projectId]
      }
    })
  }

  const fetchPdf = async (type: PreviewType, { focusTab = true }: { focusTab?: boolean } = {}) => {
    const endpoint = type === 'cv' ? '/api/pdf/cv' : '/api/pdf/cover-letter'

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

    setPreviewLoading((prev) => ({ ...prev, [type]: true }))
    setError(null)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null)
        const message = errorPayload?.error ?? 'PDF generation failed'
        throw new Error(message)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      setPdfPreviews((prev) => {
        if (prev[type]) {
          URL.revokeObjectURL(prev[type] as string)
        }
        const next = { ...prev, [type]: url }
        previewUrlsRef.current = next
        return next
      })
      setPreviewScale((prev) => ({ ...prev, [type]: 1 }))
      if (focusTab) {
        setActivePreviewTab(type)
      }
      return url
    } catch (err) {
      console.error('Unable to generate preview PDF:', err)
      setError(err instanceof Error ? err.message : 'Unable to generate preview PDF')
      return undefined
    } finally {
      setPreviewLoading((prev) => ({ ...prev, [type]: false }))
    }
  }

  const handlePreviewPdf = async (type: PreviewType) => {
    await fetchPdf(type, { focusTab: true })
  }

  const buildDownloadFileName = (type: PreviewType) => {
    const rawCompany = form.company?.trim() ?? ''
    const sanitizedCompany = rawCompany
      .replace(/[^a-z0-9]+/gi, '')
      .slice(0, 40)
    const companySegment = sanitizedCompany || 'Company'

    if (type === 'cv') {
      return `CV_${APPLICANT_FILE_STEM}_${companySegment}.pdf`
    }

    return `Coverletter_${APPLICANT_FILE_STEM}_${companySegment}.pdf`
  }

  const handleDownloadPdf = async (type: PreviewType) => {
    const existingUrl = pdfPreviews[type]
    const url = existingUrl || (await fetchPdf(type, { focusTab: false }))

    if (!url) return

    const link = document.createElement('a')
    link.href = url
    link.download = buildDownloadFileName(type)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const adjustPreviewScale = (type: PreviewType, delta: number) => {
    setPreviewScale((prev) => {
      const current = prev[type]
      const next = Math.min(2, Math.max(0.5, parseFloat((current + delta).toFixed(2))))
      return { ...prev, [type]: next }
    })
  }

  const resetPreviewScale = (type: PreviewType) => {
    setPreviewScale((prev) => ({ ...prev, [type]: 1 }))
  }

  const renderPreviewPanel = (type: PreviewType) => {
    const isLoading = previewLoading[type]
    const url = pdfPreviews[type]
    const hasPdf = Boolean(url)
    const scale = previewScale[type]
    const canZoomOut = scale > 0.55
    const canZoomIn = scale < 1.95

    return (
      <div className="mt-4 space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            {hasPdf
              ? 'Use the zoom controls or download the PDF below.'
              : 'Use the circular arrow beside the tab label to create a fresh preview.'}
          </p>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => adjustPreviewScale(type, -0.15)}
              disabled={!hasPdf || isLoading || !canZoomOut}
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => resetPreviewScale(type)}
              disabled={!hasPdf || isLoading || scale === 1}
              aria-label="Reset zoom"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => adjustPreviewScale(type, 0.15)}
              disabled={!hasPdf || isLoading || !canZoomIn}
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <span className="ml-2 text-xs font-medium text-muted-foreground">{Math.round(scale * 100)}%</span>
          </div>
        </div>
        <div className="relative h-[460px] overflow-hidden rounded-lg border bg-background">
          {isLoading ? (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : hasPdf ? (
            <div className="flex h-full w-full items-start justify-center overflow-auto bg-muted/10 p-4">
              <div
                className="min-w-[600px]"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'top center',
                  width: `${(1 / scale) * 100}%`
                }}
              >
                <iframe
                  src={url}
                  title={type === 'cv' ? 'CV preview' : 'Cover letter preview'}
                  className="h-[820px] w-full border-0"
                />
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
              {type === 'cv'
                ? 'Use the circular arrow next to the CV tab to generate a preview.'
                : 'Use the circular arrow next to the cover letter tab to generate a preview.'}
            </div>
          )}
        </div>
      </div>
    )
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

          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/10 p-6 text-center">
            <Button type="button" onClick={handleGenerateDraft} disabled={drafting}>
              {drafting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating…
                </>
              ) : (
                'Generate AI Draft'
              )}
            </Button>
            {drafting ? (
              <div className="w-48">
                <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-full animate-pulse bg-primary" />
                </div>
              </div>
            ) : null}
            <p className="text-xs text-muted-foreground">
              {drafting ? 'Generating cover letter draft…' : 'Generate an AI draft once the job description looks good.'}
            </p>
          </div>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>2. AI Draft & Details</CardTitle>
                <CardDescription>
                  Fill in key fields, generate the cover letter draft, then refine as needed.
                </CardDescription>
              </div>
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
              </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Projects & Assets</CardTitle>
            <CardDescription>
              Select the portfolio work that should appear across your documents.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Label>Matching projects</Label>
                  <span className="text-xs text-muted-foreground">
                    {form.projectIds.length}/{MAX_PROJECT_SELECTION} selected
                  </span>
                </div>

                {projects.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {projects.map((project) => {
                      const isSelected = form.projectIds.includes(project.id)
                      const reachedLimit = form.projectIds.length >= MAX_PROJECT_SELECTION && !isSelected
                      const keywords = Array.isArray(project.tags) ? project.tags.slice(0, 4) : []
                      const techStack = Array.isArray(project.tech_stack)
                        ? Array.from(new Set(project.tech_stack)).slice(0, 6)
                        : []

                      return (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() => handleToggleProject(project.id)}
                          aria-pressed={isSelected}
                          aria-disabled={reachedLimit}
                          className={cn(
                            'group flex h-full flex-col gap-3 rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                            isSelected
                              ? 'border-primary bg-primary/5 shadow-sm'
                              : 'hover:border-primary/40 hover:bg-muted/40',
                            reachedLimit ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                          )}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-snug text-foreground">
                                {project.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {project.client_name}
                              </p>
                            </div>
                            <CheckCircle2
                              aria-hidden
                              className={cn(
                                'h-5 w-5 shrink-0 text-primary transition-opacity',
                                isSelected ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </div>

                          <p className="text-xs text-muted-foreground">
                            {project.summary}
                          </p>

                          {keywords.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {keywords.map((keyword) => (
                                <Badge
                                  key={`${project.id}-keyword-${keyword}`}
                                  variant="secondary"
                                  className="text-[10px] uppercase tracking-wide"
                                >
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          ) : null}

                          {techStack.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {techStack.map((tech) => (
                                <Badge
                                  key={`${project.id}-tech-${tech}`}
                                  variant="outline"
                                  className="text-[10px]"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          ) : null}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No projects available yet.</p>
                )}

              {selectionError ? (
                <p className="text-xs text-destructive">{selectionError}</p>
              ) : null}
            </div>

              {error ? (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              ) : null}

          </CardContent>
        </Card>

        <div className="rounded-lg border border-dashed border-muted-foreground/30 bg-muted/10 p-6">
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-base font-medium">PDF Preview</h3>
              <p className="text-xs text-muted-foreground">
                Switch between documents and refresh the active preview after making changes.
              </p>
            </div>

            <Tabs
              value={activePreviewTab}
              onValueChange={(value) => setActivePreviewTab(value as PreviewType)}
              className="w-full"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <TabsList className="flex flex-wrap items-center gap-2 bg-transparent p-0">
                  <div className="flex items-center gap-1">
                    <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handlePreviewPdf('cover-letter')}
                      disabled={previewLoading['cover-letter']}
                      aria-label="Recreate cover letter PDF"
                    >
                      {previewLoading['cover-letter'] ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RotateCcw className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center gap-1">
                    <TabsTrigger value="cv">CV</TabsTrigger>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handlePreviewPdf('cv')}
                      disabled={previewLoading.cv}
                      aria-label="Recreate CV PDF"
                    >
                      {previewLoading.cv ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RotateCcw className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TabsList>
              </div>
              <TabsContent value="cover-letter">
                {renderPreviewPanel('cover-letter')}
              </TabsContent>
              <TabsContent value="cv">
                {renderPreviewPanel('cv')}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-background/60 p-4">
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => handleDownloadPdf('cv')}>
              <Download className="mr-2 h-4 w-4" /> Download CV
            </Button>
            <Button type="button" variant="outline" onClick={() => handleDownloadPdf('cover-letter')}>
              <Download className="mr-2 h-4 w-4" /> Download Letter
            </Button>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={() => router.push('/admin?tab=job')}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving…' : 'Save Application'}
            </Button>
          </div>
        </div>
        </form>
      </main>

      <AdminFooter />
    </div>
  )
}
