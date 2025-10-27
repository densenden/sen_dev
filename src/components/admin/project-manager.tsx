"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2, ExternalLink, Github, Clock, Loader2 } from "lucide-react"
import { useProjects } from '@/hooks/use-data'

interface ActionState {
  error: string | null
  message: string | null
}

export default function ProjectManager() {
  const { projects, loading, error } = useProjects()
  const [items, setItems] = useState(projects)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [{ error: actionError, message: actionMessage }, setActionState] = useState<ActionState>({
    error: null,
    message: null
  })

  useEffect(() => {
    setItems(projects)
  }, [projects])

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>
  }

  const handleDeleteProject = async (projectId: string, projectTitle: string) => {
    if (deletingId) return

    const confirmed = window.confirm(`Delete “${projectTitle}”? This action cannot be undone.`)
    if (!confirmed) {
      return
    }

    setDeletingId(projectId)
    setActionState({ error: null, message: null })

    try {
      const response = await fetch(`/api/projects?id=${projectId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.error || 'Failed to delete project')
      }

      setItems((prev) => prev.filter((project) => project.id !== projectId))
      setActionState({ error: null, message: 'Project deleted successfully.' })
    } catch (deleteError) {
      console.error(deleteError)
      setActionState({
        error: deleteError instanceof Error ? deleteError.message : 'Failed to delete project',
        message: null
      })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Project Management</h2>
          <p className="text-muted-foreground">Maintain portfolio entries with a dedicated create & edit experience.</p>
        </div>
        <Link href="/admin/projects/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-destructive">
          Failed to load projects. Please refresh.
        </div>
      )}

      {actionError ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {actionError}
        </div>
      ) : null}

      {actionMessage ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {actionMessage}
        </div>
      ) : null}

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          No projects yet. Click New Project to add your first case study.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {items.map((project) => (
            <Card key={project.id} className="group h-full">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.summary}</CardDescription>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      {project.development_time_weeks && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {project.development_time_weeks} weeks
                        </span>
                      )}
                      {project.category && (
                        <span className="rounded-full border px-2 py-0.5 text-xs">{project.category}</span>
                      )}
                      {project.is_featured && <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">Featured</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Link href={`/admin/projects/${project.id}/edit`}>
                      <Button size="sm" variant="ghost">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteProject(project.id, project.title)}
                      disabled={Boolean(deletingId)}
                    >
                      {deletingId === project.id ? (
                        <LoaderIcon />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, index) => (
                      <Badge key={`${project.id}-tag-${index}`} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <span>Client: {project.client_name}</span>
                  <span>Outcome: {project.outcome}</span>
                </div>

                <div className="flex gap-2">
                  {project.link_live && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.link_live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {project.github_url ? (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled>
                      <Github className="w-4 h-4" />
                    </Button>
                  )}
                  <Link href={`/admin/projects/${project.id}/edit`}>
                    <Button size="sm" variant="secondary">
                      Manage
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function LoaderIcon() {
  return <Loader2 className="h-4 w-4 animate-spin" />
}
