// AI Content Generator for Project Descriptions
// Uses Anthropic Claude to generate project content from GitHub and live URLs

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

export async function generateProjectContent(input: ProjectInput): Promise<GeneratedContent> {
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY
  
  if (!anthropicApiKey) {
    throw new ContentGenerationError('ANTHROPIC_API_KEY not configured')
  }

  try {
    // First, gather content from provided URLs
    let githubContent = ''
    let liveContent = ''
    let packageJsonContent = ''

    if (input.githubUrl) {
      const readmeUrl = input.githubUrl.replace('github.com', 'raw.githubusercontent.com') + '/main/README.md'
      const packageJsonUrl = input.githubUrl.replace('github.com', 'raw.githubusercontent.com') + '/main/package.json'
      
      try {
        const readmeResponse = await fetch(readmeUrl)
        if (readmeResponse.ok) {
          githubContent = await readmeResponse.text()
        }
      } catch (error) {
        console.warn('Could not fetch README:', error)
      }

      try {
        const packageResponse = await fetch(packageJsonUrl)
        if (packageResponse.ok) {
          packageJsonContent = await packageResponse.text()
        }
      } catch (error) {
        console.warn('Could not fetch package.json:', error)
      }
    }

    if (input.liveUrl) {
      try {
        const response = await fetch(`/api/scrape-website`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: input.liveUrl })
        })
        
        if (response.ok) {
          const data = await response.json()
          liveContent = data.content || ''
        }
      } catch (error) {
        console.warn('Could not scrape live URL:', error)
      }
    }

    // Generate content using Claude
    const prompt = `
You are an expert technical writer creating project case studies for a design-development agency portfolio. 

Based on the provided information, generate a compelling project case study with the following structure:

Available Information:
- Project Title Hint: ${input.title || 'Not provided'}
- Category Hint: ${input.category || 'Not provided'}
- GitHub Repository Content:
${githubContent || 'Not provided'}

- Package.json Content:
${packageJsonContent || 'Not provided'}

- Live Website Content:
${liveContent || 'Not provided'}

Please generate:
1. **Title**: Catchy project name (if not provided in hint)
2. **Summary**: One-line value proposition (under 50 chars)
3. **Description**: 2-3 sentences explaining what the project does and its impact
4. **Tech Stack**: Array of technologies used (extract from package.json or infer from content)
5. **Tags**: 2-3 relevant tags (e.g., "AI", "E-commerce", "SaaS", "Mobile", "Web3")
6. **Outcome**: Impressive metric or result (be creative but realistic, e.g., "50% faster load times", "1000+ users", "90% satisfaction rate")
7. **Development Time**: Estimated weeks (1-16 weeks based on complexity)
8. **Client Name**: Infer or create a fitting company name
9. **Category**: Primary category (AI, E-commerce, SaaS, Entertainment, Education, Healthcare, Fintech, etc.)

Return ONLY a JSON object with this exact structure:
{
  "title": "Project Name",
  "summary": "One-line description",
  "description": "Detailed description of the project and its impact.",
  "techStack": ["React", "Next.js", "TypeScript"],
  "tags": ["Web", "SaaS"],
  "outcome": "Specific measurable result",
  "developmentTimeWeeks": 8,
  "clientName": "Company Name",
  "category": "SaaS"
}

Focus on making it sound professional, impactful, and fitting for a premium development agency portfolio.
`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    })

    if (!response.ok) {
      throw new ContentGenerationError(`Claude API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.content?.[0]?.text

    if (!content) {
      throw new ContentGenerationError('No content received from Claude API')
    }

    // Parse the JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new ContentGenerationError('Could not extract JSON from Claude response')
    }

    const generatedContent = JSON.parse(jsonMatch[0]) as GeneratedContent
    
    // Validate required fields
    if (!generatedContent.title || !generatedContent.summary || !generatedContent.description) {
      throw new ContentGenerationError('Generated content missing required fields')
    }

    return generatedContent

  } catch (error) {
    if (error instanceof ContentGenerationError) throw error
    throw new ContentGenerationError('Failed to generate content', error as Error)
  }
}

// Fallback function for when AI generation fails
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