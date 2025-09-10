"use client"

import { useState, useCallback, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Toast } from "@/components/ui/toast"
import { Upload, Plus, Edit2, Trash2, ExternalLink, Github, Image as ImageIcon, Loader2, Wand2 } from "lucide-react"
import { useProjects } from '@/hooks/use-data'
import { uploadProjectImage } from '@/lib/storage'
import { generateProjectContent, createFallbackContent } from '@/lib/ai-content-generator'
import type { Database } from '@/lib/supabase'

type Project = Database['public']['Tables']['projects']['Row']
type ProjectInsert = Database['public']['Tables']['projects']['Insert']

interface ProjectForm {
  title: string
  slug: string
  summary: string
  description: string
  tech_stack: string[]
  tags: string[]
  client_name: string
  outcome: string
  link_live: string
  github_url: string
  category: string
  development_time_weeks: number
  is_featured: boolean
}

const initialForm: ProjectForm = {
  title: '',
  slug: '',
  summary: '',
  description: '',
  tech_stack: [],
  tags: [],
  client_name: '',
  outcome: '',
  link_live: '',
  github_url: '',
  category: '',
  development_time_weeks: 6,
  is_featured: false
}

export default function ProjectManager() {
  const { projects, loading, error } = useProjects()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [form, setForm] = useState<ProjectForm>(initialForm)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = useCallback(async (files: FileList | null) => {
    if (!files || !form.slug) return

    setIsUploading(true)
    const newImages: string[] = []

    try {
      for (const file of Array.from(files)) {
        if (file.type.startsWith('image/')) {
          const imageUrl = await uploadProjectImage(file, form.slug)
          newImages.push(imageUrl)
        }
      }
      
      setUploadedImages(prev => [...prev, ...newImages])
    } catch (error) {
      console.error('Image upload failed:', error)
      // Show toast error
    } finally {
      setIsUploading(false)
    }
  }, [form.slug])

  const handleGenerateContent = async () => {
    if (!form.github_url && !form.link_live) {
      // Show toast: "Please provide at least GitHub or live URL"
      return
    }

    setIsGenerating(true)
    
    try {
      const generatedContent = await generateProjectContent({
        githubUrl: form.github_url,
        liveUrl: form.link_live,
        title: form.title,
        category: form.category
      })

      setForm(prev => ({
        ...prev,
        title: generatedContent.title,
        summary: generatedContent.summary,
        description: generatedContent.description,
        tech_stack: generatedContent.techStack,
        tags: generatedContent.tags,
        outcome: generatedContent.outcome,
        development_time_weeks: generatedContent.developmentTimeWeeks,
        client_name: generatedContent.clientName,
        category: generatedContent.category,
        slug: generateSlug(generatedContent.title)
      }))

      // Show toast success
    } catch (error) {
      console.error('Content generation failed:', error)
      
      // Use fallback content
      const fallbackContent = createFallbackContent({
        githubUrl: form.github_url,
        liveUrl: form.link_live,
        title: form.title,
        category: form.category
      })

      setForm(prev => ({
        ...prev,
        ...fallbackContent,
        slug: generateSlug(fallbackContent.title)
      }))
      
      // Show toast: "Using fallback content generation"
    } finally {
      setIsGenerating(false)
    }
  }

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const projectData: ProjectInsert = {
      title: form.title,
      slug: form.slug,
      summary: form.summary,
      description: form.description,
      tech_stack: form.tech_stack,
      tags: form.tags,
      client_name: form.client_name,
      outcome: form.outcome,
      link_live: form.link_live,
      screenshots: uploadedImages
      // TODO: Add these fields after running add-display-fields.sql migration:
      // github_url: form.github_url,
      // category: form.category,
      // development_time_weeks: form.development_time_weeks,
      // is_featured: form.is_featured,
      // logo: form.logo,
      // logo_type: form.logo_type
    }

    try {
      // Call API to create/update project
      const response = await fetch('/api/projects', {
        method: editingProject ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...projectData,
          ...(editingProject && { id: editingProject.id })
        })
      })

      if (response.ok) {
        setIsCreateOpen(false)
        setIsEditOpen(false)
        setForm(initialForm)
        setUploadedImages([])
        setEditingProject(null)
        // Refresh projects list
      }
    } catch (error) {
      console.error('Project save failed:', error)
    }
  }

  const openEdit = (project: Project) => {
    setEditingProject(project)
    setForm({
      title: project.title,
      slug: project.slug,
      summary: project.summary,
      description: project.description,
      tech_stack: project.tech_stack,
      tags: project.tags,
      client_name: project.client_name,
      outcome: project.outcome,
      link_live: project.link_live || '',
      github_url: '', // Not in current schema
      category: '', // Not in current schema
      development_time_weeks: 6, // Not in current schema
      is_featured: false // Not in current schema
    })
    setUploadedImages(project.screenshots)
    setIsEditOpen(true)
  }

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Project Management</h2>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto fixed top-[5%] left-1/2 transform -translate-x-1/2">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Upload images, add URLs, and let AI generate the content
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github-url">GitHub URL</Label>
                  <Input
                    id="github-url"
                    placeholder="https://github.com/user/repo"
                    value={form.github_url}
                    onChange={(e) => setForm(prev => ({ ...prev, github_url: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="live-url">Live URL</Label>
                  <Input
                    id="live-url"
                    placeholder="https://example.com"
                    value={form.link_live}
                    onChange={(e) => setForm(prev => ({ ...prev, link_live: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    variant="outline"
                  >
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    Upload Images
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={handleGenerateContent}
                    disabled={isGenerating || (!form.github_url && !form.link_live)}
                    variant="secondary"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Wand2 className="w-4 h-4 mr-2" />
                    )}
                    Generate Content
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-4">
                    {uploadedImages.map((url, index) => (
                      <div key={index} className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        <img src={url} alt={`Upload ${index + 1}`} className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm(prev => ({ 
                      ...prev, 
                      title: e.target.value,
                      slug: generateSlug(e.target.value)
                    }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Input
                  id="summary"
                  value={form.summary}
                  onChange={(e) => setForm(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="One-line description"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client Name</Label>
                  <Input
                    id="client"
                    value={form.client_name}
                    onChange={(e) => setForm(prev => ({ ...prev, client_name: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="outcome">Outcome</Label>
                  <Input
                    id="outcome"
                    value={form.outcome}
                    onChange={(e) => setForm(prev => ({ ...prev, outcome: e.target.value }))}
                    placeholder="e.g. 1000+ users, 50% faster"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Project</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="group">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.summary}</CardDescription>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="ghost" onClick={() => openEdit(project)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{project.client_name}</span>
                  <span>{project.outcome}</span>
                </div>
                
                <div className="flex gap-2">
                  {project.link_live && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.link_live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  <Button size="sm" variant="outline" disabled>
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto fixed top-[5%] left-1/2 transform -translate-x-1/2">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update project information</DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-github-url">GitHub URL</Label>
                <Input
                  id="edit-github-url"
                  placeholder="https://github.com/user/repo"
                  value={form.github_url}
                  onChange={(e) => setForm(prev => ({ ...prev, github_url: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-live-url">Live URL</Label>
                <Input
                  id="edit-live-url"
                  placeholder="https://example.com"
                  value={form.link_live}
                  onChange={(e) => setForm(prev => ({ ...prev, link_live: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  variant="outline"
                >
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 mr-2" />
                  )}
                  Upload Images
                </Button>
                
                <Button
                  type="button"
                  onClick={handleGenerateContent}
                  disabled={isGenerating || (!form.github_url && !form.link_live)}
                  variant="secondary"
                >
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  Generate Content
                </Button>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {uploadedImages.map((url, index) => (
                    <div key={index} className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                      <img src={url} alt={`Upload ${index + 1}`} className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ 
                    ...prev, 
                    title: e.target.value,
                    slug: generateSlug(e.target.value)
                  }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-slug">Slug</Label>
                <Input
                  id="edit-slug"
                  value={form.slug}
                  onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-summary">Summary</Label>
              <Input
                id="edit-summary"
                value={form.summary}
                onChange={(e) => setForm(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="One-line description"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-client">Client Name</Label>
                <Input
                  id="edit-client"
                  value={form.client_name}
                  onChange={(e) => setForm(prev => ({ ...prev, client_name: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-outcome">Outcome</Label>
                <Input
                  id="edit-outcome"
                  value={form.outcome}
                  onChange={(e) => setForm(prev => ({ ...prev, outcome: e.target.value }))}
                  placeholder="e.g. 1000+ users, 50% faster"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Project</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}