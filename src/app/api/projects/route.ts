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
  } catch (error) {
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

    const { data, error } = await supabase
      .from('projects')
      .insert([{
        title: body.title,
        slug: body.slug,
        summary: body.summary,
        description: body.description,
        tech_stack: body.tech_stack || [],
        screenshots: body.screenshots || [],
        video_demo: body.video_demo,
        tags: body.tags || [],
        client_name: body.client_name,
        outcome: body.outcome,
        link_live: body.link_live,
        github_url: body.github_url,
        github_readme: body.github_readme,
        development_time_weeks: body.development_time_weeks,
        is_featured: body.is_featured || false,
        category: body.category
      }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
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

    const { data, error } = await supabase
      .from('projects')
      .update({
        title: body.title,
        slug: body.slug,
        summary: body.summary,
        description: body.description,
        tech_stack: body.tech_stack,
        screenshots: body.screenshots,
        video_demo: body.video_demo,
        tags: body.tags,
        client_name: body.client_name,
        outcome: body.outcome,
        link_live: body.link_live,
        github_url: body.github_url,
        github_readme: body.github_readme,
        development_time_weeks: body.development_time_weeks,
        is_featured: body.is_featured,
        category: body.category,
        updated_at: new Date().toISOString()
      })
      .eq('id', body.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}