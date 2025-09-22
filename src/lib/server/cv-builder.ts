import path from 'node:path'
import React from 'react'

import { renderToBuffer } from '@react-pdf/renderer'

import { cvProfileBase, defaultProjectHighlights } from '@/lib/pdf/profile'
import { CVDocument } from '@/lib/pdf/CVDocument'
import type { CVData, CVProjectEntry } from '@/lib/pdf/types'
import { supabase } from '@/lib/supabase'

export async function fetchProjects(projectIds: string[]): Promise<CVProjectEntry[]> {
  if (!supabase || projectIds.length === 0) {
    return []
  }

  const { data, error } = await supabase
    .from('projects')
    .select('id, title, summary, tech_stack, slug, screenshots, created_at')
    .in('id', projectIds)

  if (error || !data) {
    console.error('Failed to fetch projects for CV:', error)
    return []
  }

  return data.map((project) => ({
    title: project.title,
    summary: project.summary,
    techStack: project.tech_stack ?? [],
    year: project.created_at ? new Date(project.created_at).getFullYear().toString() : undefined,
    caseStudyUrl: project.slug ? `https://dev.sen.studio/projects/${project.slug}` : undefined,
    thumbnail: Array.isArray(project.screenshots) && project.screenshots.length > 0
      ? project.screenshots[0]
      : undefined
  }))
}

export async function buildCvData(projectIds: string[]): Promise<CVData> {
  const projects = await fetchProjects(projectIds)

  return {
    ...cvProfileBase,
    projects: projects.length > 0 ? projects : defaultProjectHighlights
  }
}

export async function renderCvDocument(projectIds: string[]): Promise<Buffer> {
  const data = await buildCvData(projectIds)
  const portraitUrl = path.join(process.cwd(), 'public', 'denis.png')
  const creationDate = new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  const element = React.createElement(CVDocument, { data, portraitUrl, creationDate })
  return renderToBuffer(element)
}
