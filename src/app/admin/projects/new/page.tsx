"use client"

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Save,
  Loader2,
  Upload,
  Trash2,
  Image as ImageIcon,
  Wand2
} from "lucide-react"
import Image from 'next/image'
import { generateProjectContent, createFallbackContent } from '@/lib/ai-content-generator'
import { uploadProjectImage, deleteProjectImage } from '@/lib/storage'

type LogoType = 'text' | 'image' | 'svg' | 'icon'

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
  logo: string
  logo_type: LogoType
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
  screenshots: [],
  logo: '',
  logo_type: 'text'
}

interface StatusMessage {
  type: 'success' | 'error'
  text: string
}

const generateSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export default function CreateProjectPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(emptyForm)
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null)
  const [saving, setSaving] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deletingImage, setDeletingImage] = useState<string | null>(null)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const logoFileInputRef = useRef<HTMLInputElement>(null)
  const [logoUploading, setLogoUploading] = useState(false)

  const handleArrayInputChange = (field: 'tech_stack' | 'tags', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean)
    setForm(prev => ({ ...prev, [field]: items }))
  }

  const handleNumberChange = (value: string) => {
    if (value === '') {
      setForm(prev => ({ ...prev, development_time_weeks: null }))
      return
    }
    const parsed = parseInt(value, 10)
    setForm(prev => ({ ...prev, development_time_weeks: Number.isNaN(parsed) ? prev.development_time_weeks : parsed }))
  }

  const handleLogoTypeChange = (value: LogoType) => {
    setForm((prev) => {
      if (value === 'text') {
        const fallback = (prev.title || '').slice(0, 2).toUpperCase()
        return {
          ...prev,
          logo_type: value,
          logo: prev.logo_type === 'text' && prev.logo ? prev.logo : fallback
        }
      }

      if (value === 'icon') {
        return {
          ...prev,
          logo_type: value,
          logo: prev.logo_type === 'icon' ? prev.logo : ''
        }
      }

      return {
        ...prev,
        logo_type: value,
        logo: prev.logo_type === value ? prev.logo : ''
      }
    })
  }

  const handleGenerateContent = async () => {
    if (!form.github_url && !form.link_live) {
      setStatusMessage({ type: 'error', text: 'Please provide at least a GitHub or live URL for AI generation.' })
      return
    }

    setGenerating(true)
    setStatusMessage(null)

    try {
      const generated = await generateProjectContent({
        githubUrl: form.github_url || undefined,
        liveUrl: form.link_live || undefined,
        title: form.title || undefined,
        category: form.category || undefined
      })

      setForm(prev => ({
        ...prev,
        title: generated.title,
        slug: generateSlug(generated.title),
        summary: generated.summary,
        description: generated.description,
        tech_stack: generated.techStack,
        tags: generated.tags,
        outcome: generated.outcome,
        development_time_weeks: generated.developmentTimeWeeks,
        client_name: generated.clientName,
        category: generated.category || prev.category
      }))
      setSlugManuallyEdited(false)

      setStatusMessage({ type: 'success', text: 'AI generated content successfully. Review and adjust if needed.' })
    } catch (error) {
      console.error('AI generation failed:', error)
      const fallback = createFallbackContent({
        githubUrl: form.github_url,
        liveUrl: form.link_live,
        title: form.title,
        category: form.category
      })

      setForm(prev => ({
        ...prev,
        title: fallback.title,
        slug: generateSlug(fallback.title),
        summary: fallback.summary,
        description: fallback.description,
        tech_stack: fallback.techStack,
        tags: fallback.tags,
        outcome: fallback.outcome,
        development_time_weeks: fallback.developmentTimeWeeks,
        client_name: fallback.clientName,
        category: fallback.category || prev.category
      }))
      setSlugManuallyEdited(false)

      setStatusMessage({ type: 'error', text: 'AI generation unavailable. Applied fallback content. Please review.' })
    } finally {
      setGenerating(false)
    }
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

  const handleLogoUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    if (!form.slug) {
      setStatusMessage({ type: 'error', text: 'Set a slug before uploading a logo.' })
      return
    }

    const file = files[0]
    if (!file.type.startsWith('image/')) {
      setStatusMessage({ type: 'error', text: 'Logo must be an image or SVG file.' })
      return
    }

    setLogoUploading(true)
    setStatusMessage(null)

    try {
      const url = await uploadProjectImage(file, form.slug, { folder: 'logo' })
      const isSvg = file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')
      setForm((prev) => ({
        ...prev,
        logo: url,
        logo_type: isSvg ? 'svg' : 'image'
      }))
      setStatusMessage({ type: 'success', text: 'Logo uploaded successfully.' })
    } catch (error) {
      console.error('Logo upload failed:', error)
      setStatusMessage({ type: 'error', text: 'Logo upload failed. Please try again.' })
    } finally {
      setLogoUploading(false)
      if (logoFileInputRef.current) {
        logoFileInputRef.current.value = ''
      }
    }
  }

  const handleClearLogo = () => {
    setForm((prev) => ({
      ...prev,
      logo: (prev.title || '').slice(0, 2).toUpperCase(),
      logo_type: 'text'
    }))
  }

  const handleSave = async () => {
    if (!form.title || !form.slug || !form.summary || !form.description) {
      setStatusMessage({ type: 'error', text: 'Title, slug, summary, and description are required.' })
      return
    }

    setSaving(true)
    setStatusMessage(null)

    try {
      const logoValue = (() => {
        if (form.logo_type === 'text') {
          const fallback = form.logo || form.title.substring(0, 2)
          return fallback ? fallback.toUpperCase() : null
        }
        if (form.logo_type === 'icon') {
          return form.logo || null
        }
        return form.logo || null
      })()

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
          logo: logoValue,
          logo_type: logoValue ? form.logo_type : null
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || 'Failed to create project')
      }

      setStatusMessage({ type: 'success', text: 'Project created successfully.' })
      router.push('/admin')
    } catch (error) {
      console.error('Failed to save project:', error)
      setStatusMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Unable to create project.'
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Create New Project</h1>
            <p className="text-muted-foreground">Start with the project URLs, then refine the AI generated content.</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Create Project
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
          <Card>
            <CardHeader>
              <CardTitle>1. Generate Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    value={form.github_url}
                    onChange={(event) => setForm(prev => ({ ...prev, github_url: event.target.value }))}
                    placeholder="https://github.com/user/repo"
                  />
                </div>
                <div>
                  <Label htmlFor="link_live">Live URL</Label>
                  <Input
                    id="link_live"
                    value={form.link_live}
                    onChange={(event) => setForm(prev => ({ ...prev, link_live: event.target.value }))}
                    placeholder="https://project.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="manual_title">Optional Title Hint</Label>
                  <Input
                    id="manual_title"
                    value={form.title}
                    onChange={(event) => setForm(prev => ({ ...prev, title: event.target.value }))}
                    placeholder="Used to guide AI if provided"
                  />
                </div>
                <div>
                  <Label htmlFor="category_hint">Optional Category Hint</Label>
                  <Input
                    id="category_hint"
                    value={form.category}
                    onChange={(event) => setForm(prev => ({ ...prev, category: event.target.value }))}
                    placeholder="AI, SaaS, Fintech, ..."
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="button" onClick={handleGenerateContent} disabled={generating}>
                  {generating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  {generating ? 'Generating...' : 'Generate with AI'}
                </Button>
                <p className="text-sm text-muted-foreground">
                  Provide at least one URL. We will fetch details and draft the content for you.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Basic Information</CardTitle>
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
                      slug: !slugManuallyEdited && value ? generateSlug(value) : prev.slug,
                      logo: prev.logo_type === 'text' ? (value.slice(0, 2).toUpperCase()) : prev.logo
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

          <Card>
            <CardHeader>
              <CardTitle>3. Technical Details</CardTitle>
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

          <Card>
            <CardHeader>
              <CardTitle>4. Links & Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="video_demo">Video Demo URL</Label>
                <Input
                  id="video_demo"
                  value={form.video_demo}
                  onChange={(event) => setForm(prev => ({ ...prev, video_demo: event.target.value }))}
                  placeholder="https://youtu.be/demo"
                />
              </div>

              <div className="border rounded-lg p-4 space-y-4">
                <div>
                  <Label>Logo Presentation</Label>
                  <p className="text-xs text-muted-foreground">Displayed on project cards across the site.</p>
                </div>
                <div className="max-w-xs">
                  <Select value={form.logo_type} onValueChange={(value) => handleLogoTypeChange(value as LogoType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select logo type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text initials</SelectItem>
                      <SelectItem value="svg">Uploaded SVG</SelectItem>
                      <SelectItem value="image">Uploaded image</SelectItem>
                      <SelectItem value="icon">Icon key</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {form.logo_type === 'text' ? (
                  <div>
                    <Label htmlFor="logo_text">Logo Text</Label>
                    <Input
                      id="logo_text"
                      value={form.logo}
                      maxLength={4}
                      onChange={(event) => setForm(prev => ({ ...prev, logo: event.target.value.toUpperCase() }))}
                      placeholder="MM"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Up to 4 characters, shown inside a badge.</p>
                  </div>
                ) : null}

                {form.logo_type === 'icon' ? (
                  <div>
                    <Label htmlFor="logo_icon">Icon key</Label>
                    <Input
                      id="logo_icon"
                      value={form.logo}
                      onChange={(event) => setForm(prev => ({ ...prev, logo: event.target.value }))}
                      placeholder="mic"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Provide the Lucide icon identifier (e.g. mic, sparkles).</p>
                  </div>
                ) : null}

                {(form.logo_type === 'svg' || form.logo_type === 'image') ? (
                  <div className="space-y-2">
                    {form.logo ? (
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg border border-dashed bg-muted/20 flex items-center justify-center overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={form.logo} alt="Project logo" className="max-w-full max-h-full" />
                        </div>
                        <Button type="button" variant="ghost" onClick={handleClearLogo}>
                          Remove logo
                        </Button>
                      </div>
                    ) : null}
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => logoFileInputRef.current?.click()}
                        disabled={logoUploading}
                      >
                        {logoUploading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4 mr-2" />
                        )}
                        {logoUploading ? 'Uploading…' : 'Upload logo'}
                      </Button>
                      <input
                        ref={logoFileInputRef}
                        type="file"
                        accept=".svg,image/*"
                        className="hidden"
                        onChange={(event) => handleLogoUpload(event.target.files)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">SVG preferred. PNG/JPG supported for image logos.</p>
                  </div>
                ) : null}
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

          <Card>
            <CardHeader>
              <CardTitle>5. Project Story</CardTitle>
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
            Create Project
          </Button>
        </div>
      </div>
    </div>
  )
}
