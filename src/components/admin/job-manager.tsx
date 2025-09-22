"use client"

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { sampleCoverLetterData, sampleCVData } from '@/lib/pdf/sample-data'
import { useProjects } from '@/hooks/use-data'

const STATUS_ORDER = ['pending', 'in_progress', 'sent', 'denied'] as const
const STATUS_LABELS: Record<(typeof STATUS_ORDER)[number], string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  sent: 'Sent',
  denied: 'Denied'
}

const STATUS_TONES: Record<(typeof STATUS_ORDER)[number], { dot: string; text: string; bg: string }> = {
  pending: { dot: 'bg-yellow-400', text: 'text-yellow-700', bg: 'bg-yellow-50' },
  in_progress: { dot: 'bg-sky-500', text: 'text-sky-700', bg: 'bg-sky-50' },
  sent: { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  denied: { dot: 'bg-rose-500', text: 'text-rose-700', bg: 'bg-rose-50' }
}

interface JobApplication {
  id: string
  role: string
  company: string
  status: (typeof STATUS_ORDER)[number]
  applied_at: string | null
  job_url: string | null
  contact_name: string | null
  contact_email: string | null
  location: string | null
  notes: string | null
  job_description: string | null
  cv_path: string | null
  cover_letter_path: string | null
  zip_path: string | null
  projectIds: string[]
  created_at: string
}

interface JobFormState {
  role: string
  company: string
  jobUrl: string
  status: (typeof STATUS_ORDER)[number]
  appliedDate: string
  contactName: string
  contactEmail: string
  location: string
  notes: string
  jobDescription: string
  projectIds: string[]
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
  projectIds: []
}

function formatDate(date: string | null) {
  if (!date) return '—'
  const value = new Date(date)
  if (Number.isNaN(value.getTime())) return '—'
  return value.toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })
}

function StatusBadge({ status }: { status: JobApplication['status'] }) {
  const tone = STATUS_TONES[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
        tone.bg,
        tone.text
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', tone.dot)} />
      {STATUS_LABELS[status]}
    </span>
  )
}

export default function JobManager() {
  const [jobs, setJobs] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null)
  const [form, setForm] = useState<JobFormState>(initialFormState)
  const { projects } = useProjects()

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true)
        const response = await fetch('/api/jobs')
        if (!response.ok) {
          throw new Error('Failed to fetch jobs')
        }
        const payload = await response.json()
        setJobs(payload.data ?? [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load job applications')
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  const statusCounts = useMemo(() => {
    return jobs.reduce(
      (acc, job) => {
        acc[job.status] = (acc[job.status] ?? 0) + 1
        return acc
      },
      Object.fromEntries(STATUS_ORDER.map((status) => [status, 0])) as Record<
        (typeof STATUS_ORDER)[number],
        number
      >
    )
  }, [jobs])

  const handleSelectJob = (job: JobApplication) => {
    setSelectedJob(job)
    setForm({
      role: job.role,
      company: job.company,
      jobUrl: job.job_url ?? '',
      status: job.status,
      appliedDate: job.applied_at ? job.applied_at.split('T')[0] : '',
      contactName: job.contact_name ?? '',
      contactEmail: job.contact_email ?? '',
      location: job.location ?? '',
      notes: job.notes ?? '',
      jobDescription: job.job_description ?? '',
      projectIds: job.projectIds
    })
    setIsSheetOpen(true)
  }

  const handleUpdateJob = async () => {
    if (!selectedJob) return

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

      const response = await fetch(`/api/jobs/${selectedJob.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null)
        throw new Error(errorPayload?.error || 'Failed to update job application')
      }

      const result = await response.json()
      const updated = result.data as JobApplication

      setJobs((prev) => prev.map((job) => (job.id === updated.id ? updated : job)))
      setSelectedJob(updated)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Failed to update job application')
    }
  }

  const handlePreviewPdf = async (type: 'cv' | 'cover-letter') => {
    try {
      const endpoint = type === 'cv' ? '/api/pdf/cv' : '/api/pdf/cover-letter'
      const payload = type === 'cv'
        ? { data: sampleCVData }
        : { data: sampleCoverLetterData }

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
      console.error(err)
      setError('Unable to generate preview PDF')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Job Applications</h2>
          <p className="text-muted-foreground">
            Track outreach progress, generate tailored PDFs, and keep everything in one place.
          </p>
        </div>
        <Link href="/admin/jobs/new">
          <Button>New Application</Button>
        </Link>
      </div>

      {error ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-destructive">
            {error}
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-4">
        {STATUS_ORDER.map((status) => (
          <Card key={status}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{STATUS_LABELS[status]}</CardTitle>
              <span className={cn('h-2 w-2 rounded-full', STATUS_TONES[status].dot)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts[status]}</div>
              <p className="text-xs text-muted-foreground">Current count</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline</CardTitle>
          <CardDescription>Stay on top of outreach with quick actions.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-10 text-center text-sm text-muted-foreground">Loading applications…</div>
          ) : jobs.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No applications yet. Start by creating your first entry.
            </div>
          ) : (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold">{job.role}</span>
                      <span className="text-sm text-muted-foreground">@ {job.company}</span>
                      <StatusBadge status={job.status} />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span>Created {formatDate(job.created_at)}</span>
                      <span>Applied {formatDate(job.applied_at)}</span>
                      {job.job_url ? (
                        <Link href={job.job_url} target="_blank" className="text-blue-600">
                          Job posting
                        </Link>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => handlePreviewPdf('cv')}>
                      Preview CV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handlePreviewPdf('cover-letter')}>
                      Preview Letter
                    </Button>
                    <Button size="sm" onClick={() => handleSelectJob(job)}>
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full overflow-y-auto md:max-w-xl">
          <SheetHeader>
            <SheetTitle>{form.role || selectedJob?.role || 'Job Application'}</SheetTitle>
            <SheetDescription>
              Update status, tweak notes, and trigger document generation.
            </SheetDescription>
          </SheetHeader>

          {selectedJob ? (
            <div className="mt-6 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="sheet-role">Role / Position</Label>
                <Input
                  id="sheet-role"
                  value={form.role}
                  onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sheet-company">Company</Label>
                <Input
                  id="sheet-company"
                  value={form.company}
                  onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sheet-status">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value: JobFormState['status']) =>
                    setForm((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger id="sheet-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_ORDER.map((status) => (
                      <SelectItem key={status} value={status}>
                        {STATUS_LABELS[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sheet-applied">Applied on</Label>
                <Input
                  id="sheet-applied"
                  type="date"
                  value={form.appliedDate}
                  onChange={(event) => setForm((prev) => ({ ...prev, appliedDate: event.target.value }))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sheet-job-url">Job URL</Label>
                <Input
                  id="sheet-job-url"
                  value={form.jobUrl}
                  onChange={(event) => setForm((prev) => ({ ...prev, jobUrl: event.target.value }))}
                />
              </div>

              <div className="grid gap-2 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="sheet-contact">Contact</Label>
                  <Input
                    id="sheet-contact"
                    value={form.contactName}
                    onChange={(event) => setForm((prev) => ({ ...prev, contactName: event.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sheet-email">Email</Label>
                  <Input
                    id="sheet-email"
                    value={form.contactEmail}
                    onChange={(event) => setForm((prev) => ({ ...prev, contactEmail: event.target.value }))}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sheet-location">Location</Label>
                <Input
                  id="sheet-location"
                  value={form.location}
                  onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sheet-description">Job highlights / scraped summary</Label>
                <Textarea
                  id="sheet-description"
                  rows={4}
                  value={form.jobDescription}
                  onChange={(event) => setForm((prev) => ({ ...prev, jobDescription: event.target.value }))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sheet-notes">Notes</Label>
                <Textarea
                  id="sheet-notes"
                  rows={3}
                  value={form.notes}
                  onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                />
              </div>

              <div className="grid gap-3">
                <Label>Highlighted projects</Label>
                <div className="grid gap-2">
                  {projects.map((project) => (
                    <label key={project.id} className="flex items-start gap-2">
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

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => handlePreviewPdf('cv')}>
                  Preview CV
                </Button>
                <Button variant="outline" onClick={() => handlePreviewPdf('cover-letter')}>
                  Preview Letter
                </Button>
                <Button className="ml-auto" onClick={handleUpdateJob}>
                  Save changes
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">Select an application to manage details.</p>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
