import { NextResponse } from 'next/server'
import { getProjects } from '@/lib/data'

export async function GET() {
  try {
    const projects = await getProjects()
    
    return NextResponse.json({
      success: true,
      count: projects.length,
      projects: projects
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      projects: []
    }, { status: 500 })
  }
}