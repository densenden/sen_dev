export interface ProjectInput {
  githubUrl?: string
  liveUrl?: string
  title?: string
  category?: string
}

export interface GeneratedContent {
  title: string
  summary: string
  description: string
  techStack: string[]
  tags: string[]
  outcome: string
  developmentTimeWeeks: number
  clientName: string
  category: string
}

export class ContentGenerationError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message)
    this.name = 'ContentGenerationError'
  }
}
