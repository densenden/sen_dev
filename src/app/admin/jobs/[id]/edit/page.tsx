'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, ExternalLink, FileText, Loader2, Save, Trash2, Upload } from 'lucide-react'
import { createClient } from '@/lib/supabase'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useProjects } from '@/hooks/use-data'
import type { Database } from '@/lib/supabase'

const STATUS_OPTIONS = [
  { value: 'in_progress', label: 'Documents ready' },
  { value: 'sent', label: 'Application sent' },
  { value: 'pending', label: 'Pending' },
  { value: 'denied', label: 'Denied' }
] as const

type JobStatus = (typeof STATUS_OPTIONS)[number]['value']
type ProjectRow = Database['public']['Tables']['projects']['Row']

interface JobApplication {
  id: string
  role: string
  company: string
  status: JobStatus
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
  updated_at: string
}

export default function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { projects } = useProjects()
  const supabase = createClient()
  
  const [job, setJob] = useState<JobApplication | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<'cv' | 'cover_letter' | null>(null)
  const [generating, setGenerating] = useState<'cv' | 'cover_letter' | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [jobId, setJobId] = useState<string>('')

  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params
      setJobId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (jobId) {
      loadJob()
    }
  }, [jobId])

  async function loadJob() {
    try {
      setLoading(true)
      const response = await fetch(`/api/jobs/${jobId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch job')
      }
      const data = await response.json()
      setJob(data.data)
    } catch (error) {
      console.error('Error loading job:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!job) return
    
    setSaving(true)
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
      })
      
      if (!response.ok) {
        throw new Error('Failed to update job')
      }
      
      router.push('/admin?tab=job')
    } catch (error) {
      console.error('Error saving job:', error)
      alert('Failed to update job application')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!job || !confirm('Are you sure you want to delete this application?')) return
    
    setDeleting(true)
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete job')
      }
      
      router.push('/admin?tab=job')
    } catch (error) {
      console.error('Error deleting job:', error)
      alert('Failed to delete job application')
    } finally {
      setDeleting(false)
    }
  }

  async function handleFileUpload(type: 'cv' | 'cover_letter', file: File) {
    if (!job) return
    
    setUploading(type)
    try {
      const fileName = `${job.id}/${type}_${Date.now()}.pdf`
      const { data, error } = await supabase.storage
        .from('job-applications')
        .upload(fileName, file, {
          contentType: 'application/pdf',
          upsert: true
        })
      
      if (error) throw error
      
      // Update job with new file path
      const pathKey = type === 'cv' ? 'cv_path' : 'cover_letter_path'
      setJob({
        ...job,
        [pathKey]: data.path
      })
      
      // File uploaded successfully
    } catch (error) {
      console.error('Error uploading file:', error)
      alert(`Failed to upload ${type === 'cv' ? 'CV' : 'Cover Letter'}`)
    } finally {
      setUploading(null)
    }
  }

  async function handleDownload(path: string, filename: string) {
    try {
      const { data, error } = await supabase.storage
        .from('job-applications')
        .download(path)
      
      if (error) throw error
      
      // Create download link
      const url = URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading file:', error)
      alert('Failed to download file')
    }
  }

  async function handleGenerateCV() {
    if (!job) return
    
    setGenerating('cv')
    try {
      const response = await fetch('/api/pdf/cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: jobId,
          project_ids: job.projectIds
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate CV')
      }
      
      const result = await response.json()
      if (result.success) {
        // Update job with new CV path
        setJob({
          ...job,
          cv_path: result.path
        })
        alert('CV generated and saved successfully!')
      } else {
        throw new Error(result.error || 'Failed to generate CV')
      }
    } catch (error) {
      console.error('Error generating CV:', error)
      alert('Failed to generate CV')
    } finally {
      setGenerating(null)
    }
  }

  async function handleGenerateCoverLetter() {
    if (!job) return
    
    setGenerating('cover_letter')
    try {
      const response = await fetch('/api/pdf/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: jobId,
          data: {
            recipient: {
              company: job.company,
              name: job.contact_name,
              role: job.role
            },
            subject: `Application as ${job.role}`
          }
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate cover letter')
      }
      
      const result = await response.json()
      if (result.success) {
        // Update job with new cover letter path
        setJob({
          ...job,
          cover_letter_path: result.path
        })
        alert('Cover letter generated and saved successfully!')
      } else {
        throw new Error(result.error || 'Failed to generate cover letter')
      }
    } catch (error) {
      console.error('Error generating cover letter:', error)
      alert('Failed to generate cover letter')
    } finally {
      setGenerating(null)
    }
  }

  function toggleProject(projectId: string) {
    if (!job) return
    
    const newProjectIds = job.projectIds.includes(projectId)
      ? job.projectIds.filter(id => id !== projectId)
      : [...job.projectIds, projectId]
    
    setJob({
      ...job,
      projectIds: newProjectIds
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">Job application not found</p>
            <Link href="/admin?tab=job">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Job Manager
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin?tab=job">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Edit Job Application</h1>
            <p className="text-sm text-muted-foreground">
              {job.role} at {job.company}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Trash2 className="h-4 w-4 mr-2" />
            )}
            Delete
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Core details about the position and company</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={job.role}
                    onChange={(e) => setJob({ ...job, role: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={job.company}
                    onChange={(e) => setJob({ ...job, company: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={job.location || ''}
                    onChange={(e) => setJob({ ...job, location: e.target.value })}
                    placeholder="e.g., Berlin, Germany"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={job.status}
                    onValueChange={(value) => setJob({ ...job, status: value as JobStatus })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job_url">Job Posting URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="job_url"
                    value={job.job_url || ''}
                    onChange={(e) => setJob({ ...job, job_url: e.target.value })}
                    placeholder="https://..."
                  />
                  {job.job_url && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="applied_at">Applied Date</Label>
                <Input
                  id="applied_at"
                  type="date"
                  value={job.applied_at ? new Date(job.applied_at).toISOString().split('T')[0] : ''}
                  onChange={(e) => setJob({ ...job, applied_at: e.target.value || null })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Details about your contact at the company</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact_name">Contact Name</Label>
                  <Input
                    id="contact_name"
                    value={job.contact_name || ''}
                    onChange={(e) => setJob({ ...job, contact_name: e.target.value })}
                    placeholder="e.g., John Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={job.contact_email || ''}
                    onChange={(e) => setJob({ ...job, contact_email: e.target.value })}
                    placeholder="john@company.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description & Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Description & Notes</CardTitle>
              <CardDescription>Additional information about the role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job_description">Job Description</Label>
                <Textarea
                  id="job_description"
                  value={job.job_description || ''}
                  onChange={(e) => setJob({ ...job, job_description: e.target.value })}
                  placeholder="Paste or summarize the job description..."
                  className="min-h-[150px] font-mono text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Personal Notes</Label>
                <Textarea
                  id="notes"
                  value={job.notes || ''}
                  onChange={(e) => setJob({ ...job, notes: e.target.value })}
                  placeholder="Any additional notes, thoughts, or reminders..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Selected Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Projects</CardTitle>
              <CardDescription>Select projects to include in your application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {projects.map((project: ProjectRow) => (
                  <div
                    key={project.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      job.projectIds.includes(project.id)
                        ? 'bg-primary/5 border-primary'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => toggleProject(project.id)}
                  >
                    <input
                      type="checkbox"
                      checked={job.projectIds.includes(project.id)}
                      onChange={() => {}}
                      className="rounded border-gray-300"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{project.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {project.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Application materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* CV */}
              <div className="space-y-2">
                <Label>CV / Resume</Label>
                {job.cv_path ? (
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">CV.pdf</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownload(job.cv_path!, `${job.company}_CV.pdf`)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No CV uploaded</div>
                )}
                <div className="relative">
                  <Input
                    type="file"
                    accept=".pdf"
                    className="cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload('cv', file)
                    }}
                    disabled={uploading === 'cv'}
                  />
                  {uploading === 'cv' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Letter */}
              <div className="space-y-2">
                <Label>Cover Letter</Label>
                {job.cover_letter_path ? (
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Cover_Letter.pdf</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownload(job.cover_letter_path!, `${job.company}_Cover_Letter.pdf`)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No cover letter uploaded</div>
                )}
                <div className="relative">
                  <Input
                    type="file"
                    accept=".pdf"
                    className="cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload('cover_letter', file)
                    }}
                    disabled={uploading === 'cover_letter'}
                  />
                  {uploading === 'cover_letter' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Generate Documents */}
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="sm"
                  onClick={handleGenerateCV}
                  disabled={generating === 'cv'}
                >
                  {generating === 'cv' ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <FileText className="h-4 w-4 mr-2" />
                  )}
                  Generate New CV
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="sm"
                  onClick={handleGenerateCoverLetter}
                  disabled={generating === 'cover_letter'}
                >
                  {generating === 'cover_letter' ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <FileText className="h-4 w-4 mr-2" />
                  )}
                  Generate New Cover Letter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{new Date(job.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span>{new Date(job.updated_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID</span>
                <span className="font-mono text-xs">{job.id.slice(0, 8)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}