import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  const { searchParams } = new URL(request.url)
  const featured = searchParams.get('featured')
  const category = searchParams.get('category')

  try {
    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.slug || !body.summary || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      )
    }

    const baseInsert = {
      title: body.title,
      slug: body.slug,
      summary: body.summary,
      description: body.description,
      tech_stack: body.tech_stack || [],
      screenshots: body.screenshots || [],
      tags: body.tags || [],
      client_name: body.client_name,
      outcome: body.outcome,
      link_live: body.link_live ?? null,
      logo: body.logo ?? null,
      logo_type: body.logo_type ?? null
    }

    const extendedInsert = {
      ...baseInsert,
      video_demo: body.video_demo ?? null,
      github_url: body.github_url ?? null,
      github_readme: body.github_readme ?? null,
      development_time_weeks: body.development_time_weeks ?? null,
      is_featured: body.is_featured ?? false,
      category: body.category ?? null
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([extendedInsert])
      .select()
      .single()

    if (!error) {
      return NextResponse.json(data, { status: 201 })
    }

    if (!isMissingColumnError(error)) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    const { data: fallbackData, error: fallbackError } = await supabase
      .from('projects')
      .insert([baseInsert])
      .select()
      .single()

    if (fallbackError) {
      return NextResponse.json({ error: fallbackError.message }, { status: 400 })
    }

    return NextResponse.json({ ...fallbackData, __warning: 'optional_fields_skipped' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()
    
    if (!body.id) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
    }

    const baseUpdate = {
      title: body.title,
      slug: body.slug,
      summary: body.summary,
      description: body.description,
      tech_stack: body.tech_stack,
      screenshots: body.screenshots,
      tags: body.tags,
      client_name: body.client_name,
      outcome: body.outcome,
      link_live: body.link_live ?? null,
      logo: body.logo ?? null,
      logo_type: body.logo_type ?? null,
      updated_at: new Date().toISOString()
    }

    const extendedUpdate = {
      ...baseUpdate,
      video_demo: body.video_demo ?? null,
      github_url: body.github_url ?? null,
      github_readme: body.github_readme ?? null,
      development_time_weeks: body.development_time_weeks ?? null,
      is_featured: body.is_featured ?? false,
      category: body.category ?? null
    }

    const { data, error } = await supabase
      .from('projects')
      .update(extendedUpdate)
      .eq('id', body.id)
      .select()
      .single()

    if (!error) {
      return NextResponse.json(data)
    }

    if (!isMissingColumnError(error)) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    const { data: fallbackData, error: fallbackError } = await supabase
      .from('projects')
      .update(baseUpdate)
      .eq('id', body.id)
      .select()
      .single()

    if (fallbackError) {
      return NextResponse.json({ error: fallbackError.message }, { status: 400 })
    }

  return NextResponse.json({ ...fallbackData, __warning: 'optional_fields_skipped' })
  } catch {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  try {
    const { searchParams } = new URL(request.url)
    let projectId = searchParams.get('id')

    if (!projectId) {
      const body = await request.json().catch(() => null)
      projectId = body?.id ?? null
    }

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
    }

    const { error: relationError } = await supabase
      .from('job_application_projects')
      .delete()
      .eq('project_id', projectId)

    if (relationError) {
      console.error('Failed to remove project relations:', relationError)
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}

function isMissingColumnError(error: { message: string }) {
  if (!error?.message) return false
  const msg = error.message.toLowerCase()
  return msg.includes('schema cache') && msg.includes('column')
}
