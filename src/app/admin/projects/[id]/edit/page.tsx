"use client"

import { use as usePromise, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Loader2, Upload, Trash2, Image as ImageIcon } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'
import { uploadProjectImage, deleteProjectImage } from '@/lib/storage'

type Project = Database['public']['Tables']['projects']['Row']

type FormState = {
  title: string
  slug: string
  summary: string
  description: string
  tech_stack: string[]
  tags: string[]
  client_name: string
  outcome: string
  link_live: string
  category: string
  github_url: string
  video_demo: string
  development_time_weeks: number | null
  is_featured: boolean
  screenshots: string[]
}

const emptyForm: FormState = {
  title: '',
  slug: '',
  summary: '',
  description: '',
  tech_stack: [],
  tags: [],
  client_name: '',
  outcome: '',
  link_live: '',
  category: '',
  github_url: '',
  video_demo: '',
  development_time_weeks: null,
  is_featured: false,
  screenshots: []
}

interface EditProjectPageProps {
  params: { id: string } | Promise<{ id: string }>
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const resolvedParams = usePromise(Promise.resolve(params))
  const projectId = resolvedParams.id
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [uploading, setUploading] = useState(false)
  const [deletingImage, setDeletingImage] = useState<string | null>(null)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function fetchProject() {
      if (!supabase) {
        setStatusMessage({ type: 'error', text: 'Supabase is not configured. Cannot load project.' })
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single()

        if (error) throw error
        
        if (data) {
          setProject(data)
          setForm({
            title: data.title || '',
            slug: data.slug || '',
            summary: data.summary || '',
            description: data.description || '',
            tech_stack: data.tech_stack || [],
            tags: data.tags || [],
            client_name: data.client_name || '',
            outcome: data.outcome || '',
            link_live: data.link_live || '',
            category: data.category || '',
            github_url: data.github_url || '',
            video_demo: data.video_demo || '',
            development_time_weeks: data.development_time_weeks ?? null,
            is_featured: data.is_featured ?? false,
            screenshots: data.screenshots || []
          })
          setSlugManuallyEdited(false)
        }
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [projectId])

  const generateSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

  const handleArrayInputChange = (field: 'tech_stack' | 'tags', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean)
    setForm(prev => ({ ...prev, [field]: items }))
  }

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    if (!form.slug) {
      setStatusMessage({ type: 'error', text: 'Set a slug before uploading images.' })
      return
    }

    setUploading(true)
    setStatusMessage(null)

    try {
      const uploaded: string[] = []
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) continue
        const url = await uploadProjectImage(file, form.slug)
        uploaded.push(url)
      }

      if (uploaded.length) {
        setForm(prev => ({ ...prev, screenshots: [...prev.screenshots, ...uploaded] }))
        setStatusMessage({ type: 'success', text: 'Images uploaded successfully.' })
      }
    } catch (error) {
      console.error('Image upload failed:', error)
      setStatusMessage({ type: 'error', text: 'Image upload failed. Please try again.' })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDeleteImage = async (imageUrl: string) => {
    setDeletingImage(imageUrl)
    setStatusMessage(null)

    try {
      await deleteProjectImage(imageUrl)
      setForm(prev => ({
        ...prev,
        screenshots: prev.screenshots.filter(url => url !== imageUrl)
      }))
      setStatusMessage({ type: 'success', text: 'Image removed.' })
    } catch (error) {
      console.error('Failed to delete image:', error)
      setStatusMessage({ type: 'error', text: 'Unable to delete image. Please try again.' })
    } finally {
      setDeletingImage(null)
    }
  }

  const handleSave = async () => {
    if (!project) return
    
    setSaving(true)
    setStatusMessage(null)

    try {
      const response = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: project.id,
          title: form.title,
          slug: form.slug,
          summary: form.summary,
          description: form.description,
          tech_stack: form.tech_stack,
          tags: form.tags,
          client_name: form.client_name,
          outcome: form.outcome,
          link_live: form.link_live || null,
          category: form.category || null,
          github_url: form.github_url || null,
          video_demo: form.video_demo || null,
          development_time_weeks: form.development_time_weeks,
          is_featured: form.is_featured,
          screenshots: form.screenshots,
          updated_at: new Date().toISOString()
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || 'Failed to save project')
      }

      setStatusMessage({ type: 'success', text: 'Project updated successfully.' })
      router.push('/admin')
    } catch (error) {
      console.error('Error saving project:', error)
      setStatusMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Unable to save changes.'
      })
    } finally {
      setSaving(false)
    }
  }

  const handleNumberChange = (value: string) => {
    if (value === '') {
      setForm(prev => ({ ...prev, development_time_weeks: null }))
      return
    }

    const parsed = parseInt(value, 10)
    setForm(prev => ({ ...prev, development_time_weeks: Number.isNaN(parsed) ? prev.development_time_weeks : parsed }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link href="/admin">
            <Button>Back to Admin</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Edit Project</h1>
            <p className="text-muted-foreground">{project.title}</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>

        {statusMessage && (
          <div
            className={`mb-6 rounded-md border p-4 text-sm ${
              statusMessage.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-700'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <div className="space-y-8">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(event) => {
                      const value = event.target.value
                      setForm(prev => ({
                        ...prev,
                        title: value,
                        slug: !slugManuallyEdited && value ? generateSlug(value) : prev.slug
                      }))
                    }}
                    placeholder="Enter project title"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(event) => {
                      const value = event.target.value
                      setSlugManuallyEdited(true)
                      setForm(prev => ({ ...prev, slug: value }))
                    }}
                    placeholder="project-url-slug"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  value={form.summary}
                  onChange={(event) => setForm(prev => ({ ...prev, summary: event.target.value }))}
                  placeholder="Brief project summary"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(event) => setForm(prev => ({ ...prev, description: event.target.value }))}
                  placeholder="Detailed project description"
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="tech_stack">Tech Stack (comma-separated)</Label>
                <Input
                  id="tech_stack"
                  value={form.tech_stack.join(', ')}
                  onChange={(event) => handleArrayInputChange('tech_stack', event.target.value)}
                  placeholder="React, Next.js, TypeScript, Supabase"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {form.tech_stack.map((tech, index) => (
                    <Badge key={`${tech}-${index}`} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={form.tags.join(', ')}
                  onChange={(event) => handleArrayInputChange('tags', event.target.value)}
                  placeholder="Web App, MVP, AI Integration"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {form.tags.map((tag, index) => (
                    <Badge key={`${tag}-${index}`} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={form.category}
                    onChange={(event) => setForm(prev => ({ ...prev, category: event.target.value }))}
                    placeholder="Web App, Mobile, AI Tool"
                  />
                </div>
                <div>
                  <Label htmlFor="development_time">Development Time (weeks)</Label>
                  <Input
                    id="development_time"
                    type="number"
                    min={1}
                    max={52}
                    value={form.development_time_weeks ?? ''}
                    onChange={(event) => handleNumberChange(event.target.value)}
                    placeholder="e.g. 8"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_featured"
                  checked={form.is_featured}
                  onCheckedChange={(checked) =>
                    setForm(prev => ({ ...prev, is_featured: Boolean(checked) }))
                  }
                />
                <Label htmlFor="is_featured">Feature this project on the homepage</Label>
              </div>
            </CardContent>
          </Card>

          {/* Links & Media */}
          <Card>
            <CardHeader>
              <CardTitle>Links & Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="link_live">Live URL</Label>
                  <Input
                    id="link_live"
                    value={form.link_live}
                    onChange={(event) => setForm(prev => ({ ...prev, link_live: event.target.value }))}
                    placeholder="https://project.com"
                  />
                </div>
                <div>
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    value={form.github_url}
                    onChange={(event) => setForm(prev => ({ ...prev, github_url: event.target.value }))}
                    placeholder="https://github.com/user/repo"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="video_demo">Video Demo URL</Label>
                <Input
                  id="video_demo"
                  value={form.video_demo}
                  onChange={(event) => setForm(prev => ({ ...prev, video_demo: event.target.value }))}
                  placeholder="https://youtu.be/demo"
                />
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    Upload Screenshots
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Use high-quality images. Slug is required for uploads.
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => handleImageUpload(event.target.files)}
                />

                {form.screenshots.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {form.screenshots.map((url) => (
                      <div key={url} className="relative overflow-hidden rounded-lg border bg-muted">
                        <Image
                          src={url}
                          alt="Project screenshot"
                          width={800}
                          height={450}
                          className="h-48 w-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2 rounded-full bg-background/80 p-1 text-muted-foreground hover:text-foreground"
                          onClick={() => handleDeleteImage(url)}
                          disabled={deletingImage === url}
                        >
                          {deletingImage === url ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                    <ImageIcon className="h-6 w-6" />
                    <p>No screenshots uploaded yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Project Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="client_name">Client Name</Label>
                <Input
                  id="client_name"
                  value={form.client_name}
                  onChange={(event) => setForm(prev => ({ ...prev, client_name: event.target.value }))}
                  placeholder="Client or company name"
                />
              </div>

              <div>
                <Label htmlFor="outcome">Outcome & Results</Label>
                <Textarea
                  id="outcome"
                  value={form.outcome}
                  onChange={(event) => setForm(prev => ({ ...prev, outcome: event.target.value }))}
                  placeholder="Project results, metrics, and outcomes"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end pt-8">
          <Button onClick={handleSave} disabled={saving} size="lg">
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
