"use client"

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const STATUS_ORDER = ['in_progress', 'sent', 'pending', 'denied'] as const
const STATUS_LABELS: Record<(typeof STATUS_ORDER)[number], string> = {
  in_progress: 'Documents ready',
  sent: 'Application sent',
  pending: 'Pending',
  denied: 'Denied'
}

const STATUS_TONES: Record<(typeof STATUS_ORDER)[number], { dot: string; text: string; bg: string }> = {
  in_progress: { dot: 'bg-sky-500', text: 'text-sky-700', bg: 'bg-sky-50' },
  sent: { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  pending: { dot: 'bg-amber-400', text: 'text-amber-700', bg: 'bg-amber-50' },
  denied: { dot: 'bg-rose-500', text: 'text-rose-700', bg: 'bg-rose-50' }
}

const STATUS_OPTIONS = STATUS_ORDER.map((value) => ({ value, label: STATUS_LABELS[value] }))


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
  const [statusUpdating, setStatusUpdating] = useState<Record<string, boolean>>({})

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



  const updateJobStatus = async (jobId: string, nextStatus: JobApplication['status']) => {
    setStatusUpdating((prev) => ({ ...prev, [jobId]: true }))
    setError(null)

    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Failed to update status')
      }

      const payload = await response.json()
      const updated = payload.data as JobApplication

      setJobs((prev) => prev.map((job) => (job.id === jobId ? updated : job)))
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Failed to update status')
    } finally {
      setStatusUpdating((prev) => {
        const next = { ...prev }
        delete next[jobId]
        return next
      })
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
                  <div className="space-y-2">
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
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                    <div className="flex items-center gap-2">
                      <Select
                        value={job.status}
                        onValueChange={(value) => updateJobStatus(job.id, value as JobApplication['status'])}
                        disabled={Boolean(statusUpdating[job.id])}
                      >
                        <SelectTrigger className="h-9 w-full min-w-[180px] sm:w-[200px]" aria-label="Update application status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {statusUpdating[job.id] ? (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      ) : null}
                    </div>
                    <Link href={`/admin/jobs/${job.id}/edit`}>
                      <Button size="sm">
                        Manage
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}
