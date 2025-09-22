import { NextResponse } from 'next/server'

import { ContentGenerationError, type ProjectInput } from '@/lib/project-content'
import { generateProjectContentServer } from '@/lib/server/ai-content-generator'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProjectInput
    const content = await generateProjectContentServer(body)
    return NextResponse.json(content)
  } catch (error) {
    if (error instanceof ContentGenerationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.error('AI generation failed:', error)
    return NextResponse.json({ error: 'Failed to generate project content' }, { status: 500 })
  }
}
