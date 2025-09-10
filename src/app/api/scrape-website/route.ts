import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Basic URL validation
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SenDev Portfolio Bot/1.0)'
      }
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch website' }, { status: response.status })
    }

    const html = await response.text()
    
    // Extract basic content using simple regex patterns
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i)
    const descriptionMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i)
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i)
    
    // Remove HTML tags for content analysis
    const textContent = html
      .replace(/<script[^>]*>.*?<\/script>/gs, '')
      .replace(/<style[^>]*>.*?<\/style>/gs, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 2000) // Limit content length

    const content = {
      title: titleMatch?.[1] || '',
      description: descriptionMatch?.[1] || '',
      h1: h1Match?.[1] || '',
      content: textContent
    }

    return NextResponse.json({ content: JSON.stringify(content) })

  } catch (error) {
    console.error('Website scraping error:', error)
    return NextResponse.json({ error: 'Failed to scrape website' }, { status: 500 })
  }
}