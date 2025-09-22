import 'server-only'

import { ContentGenerationError, type GeneratedContent, type ProjectInput } from '@/lib/project-content'

const USER_AGENT = 'SenDevAdminBot/1.0 (+https://example.com)'

export async function generateProjectContentServer(input: ProjectInput): Promise<GeneratedContent> {
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY

  if (!anthropicApiKey) {
    throw new ContentGenerationError('ANTHROPIC_API_KEY not configured')
  }

  try {
    const [githubContent, packageJsonContent] = await fetchGitHubContent(input.githubUrl)
    const liveContent = await fetchLiveContent(input.liveUrl)

    const prompt = buildPrompt({
      title: input.title,
      category: input.category,
      githubContent,
      packageJsonContent,
      liveContent
    })

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
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

    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new ContentGenerationError('Could not extract JSON from Claude response')
    }

    const generatedContent = JSON.parse(jsonMatch[0]) as GeneratedContent

    if (!generatedContent.title || !generatedContent.summary || !generatedContent.description) {
      throw new ContentGenerationError('Generated content missing required fields')
    }

    return generatedContent
  } catch (error) {
    if (error instanceof ContentGenerationError) throw error
    throw new ContentGenerationError('Failed to generate content', error as Error)
  }
}

async function fetchGitHubContent(githubUrl?: string): Promise<[string, string]> {
  if (!githubUrl) {
    return ['', '']
  }

  const readmeUrl = githubUrl.replace('github.com', 'raw.githubusercontent.com') + '/main/README.md'
  const packageJsonUrl = githubUrl.replace('github.com', 'raw.githubusercontent.com') + '/main/package.json'

  const [readmeContent, packageContent] = await Promise.all([
    fetchText(readmeUrl),
    fetchText(packageJsonUrl)
  ])

  return [readmeContent, packageContent]
}

async function fetchLiveContent(liveUrl?: string): Promise<string> {
  if (!liveUrl) {
    return ''
  }

  try {
    const response = await fetch(liveUrl, {
      headers: { 'User-Agent': USER_AGENT }
    })

    if (!response.ok) return ''

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('text')) return ''

    return await response.text()
  } catch (error) {
    console.warn('Could not fetch live URL:', error)
    return ''
  }
}

async function fetchText(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT }
    })

    if (!response.ok) return ''
    return await response.text()
  } catch (error) {
    console.warn('Failed to fetch text resource:', url, error)
    return ''
  }
}

function buildPrompt({
  title,
  category,
  githubContent,
  packageJsonContent,
  liveContent
}: {
  title?: string
  category?: string
  githubContent: string
  packageJsonContent: string
  liveContent: string
}) {
  return `
You are an expert technical writer creating project case studies for a design-development agency portfolio.

Based on the provided information, generate a compelling project case study with the following structure:

Available Information:
- Project Title Hint: ${title || 'Not provided'}
- Category Hint: ${category || 'Not provided'}
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
}
