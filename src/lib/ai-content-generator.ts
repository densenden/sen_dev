import { ContentGenerationError, type GeneratedContent, type ProjectInput } from '@/lib/project-content'

export async function generateProjectContent(input: ProjectInput): Promise<GeneratedContent> {
  if (typeof window !== 'undefined') {
    const response = await fetch('/api/generate-project-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new ContentGenerationError(errorData?.error || 'Failed to generate project content')
    }

    return response.json()
  }

  const { generateProjectContentServer } = await import('@/lib/server/ai-content-generator')
  return generateProjectContentServer(input)
}

export function createFallbackContent(input: ProjectInput): GeneratedContent {
  return {
    title: input.title || 'Custom Project',
    summary: 'Innovative digital solution',
    description: 'A custom-built application designed to solve specific business challenges with modern technology stack and user-centric design.',
    techStack: ['React', 'TypeScript', 'Node.js'],
    tags: ['Web', 'Custom'],
    outcome: 'Successfully delivered',
    developmentTimeWeeks: 6,
    clientName: 'Client Company',
    category: input.category || 'Web'
  }
}

export { ContentGenerationError }
export type { GeneratedContent, ProjectInput }
