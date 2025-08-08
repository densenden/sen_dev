import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Sample projects with real image paths
const projects = [
  {
    title: 'Senflix',
    slug: 'senflix',
    summary: 'AI-powered streaming platform for personalized content discovery',
    description: 'A Netflix-like streaming platform with AI-powered content recommendations, built with modern web technologies for optimal user experience. Features include personalized dashboards, advanced search, and seamless video streaming.',
    tech_stack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'OpenAI API', 'Redis', 'Docker'],
    screenshots: ['/random/hero-1.jpg', '/random/hero-2.jpg', '/random/hero-3.jpg'],
    video_demo: null,
    tags: ['streaming', 'ai', 'entertainment', 'react'],
    client_name: 'Senflix Entertainment',
    outcome: 'Launched successfully with 10k+ active users and 95% user satisfaction rating',
    link_live: 'https://flix.sen.studio'
  },
  {
    title: 'Synapsee',
    slug: 'synapsee',
    summary: 'Knowledge management system for distributed teams',
    description: 'Collaborative knowledge base with AI-powered search and organization features for distributed teams. Includes real-time collaboration, smart categorization, and advanced analytics.',
    tech_stack: ['Vue.js', 'FastAPI', 'Elasticsearch', 'Docker', 'PostgreSQL'],
    screenshots: ['/random/hero-4.jpg', '/random/hero-5.jpg', '/random/hero-6.jpg'],
    video_demo: null,
    tags: ['productivity', 'ai', 'collaboration', 'knowledge-management'],
    client_name: 'Synapsee Inc',
    outcome: 'Improved team productivity by 40% and reduced knowledge search time by 60%',
    link_live: null
  },
  {
    title: 'Meme Machine',
    slug: 'meme-machine',
    summary: 'AI meme generator for viral social media content',
    description: 'Creative AI tool that generates viral memes using advanced computer vision and natural language processing. Features automatic trend detection and social media optimization.',
    tech_stack: ['Python', 'Flask', 'OpenAI API', 'React', 'Redis', 'Computer Vision'],
    screenshots: ['/random/hero-7.jpg', '/random/hero-8.jpg', '/random/hero-9.jpg'],
    video_demo: null,
    tags: ['ai', 'social-media', 'creativity', 'computer-vision'],
    client_name: 'Social Buzz Agency',
    outcome: 'Generated 1M+ memes, increased client engagement by 300%, featured in TechCrunch',
    link_live: 'https://beautymachine.sen.studio'
  },
  {
    title: 'Fork:it',
    slug: 'fork-it',
    summary: 'Advanced code collaboration platform',
    description: 'Advanced code review and collaboration platform with integrated CI/CD pipelines and team management. Includes automated testing, deployment workflows, and performance monitoring.',
    tech_stack: ['TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Docker', 'Kubernetes'],
    screenshots: ['/random/hero-10.jpg', '/random/hero-11.jpg', '/random/hero-12.jpg'],
    video_demo: null,
    tags: ['development', 'collaboration', 'devops', 'ci-cd'],
    client_name: 'DevCorp Solutions',
    outcome: 'Reduced code review time by 60% and deployment failures by 80%',
    link_live: 'https://forkit.sen.studio'
  },
  {
    title: 'Kria Training',
    slug: 'kria-training',
    summary: 'Enterprise learning management system',
    description: 'Comprehensive LMS with interactive courses, progress tracking, and certification management for enterprise clients. Features gamification, analytics, and mobile learning.',
    tech_stack: ['React', 'Node.js', 'MongoDB', 'AWS', 'Stripe', 'WebRTC'],
    screenshots: ['/random/hero-13.jpg', '/random/hero-14.jpg', '/random/hero-1.jpg'],
    video_demo: null,
    tags: ['education', 'enterprise', 'lms', 'certification'],
    client_name: 'Kria Corp',
    outcome: 'Trained 5000+ employees across 50+ companies with 98% completion rate',
    link_live: null
  }
]

export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Missing Supabase configuration' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    console.log('🚀 Starting complete database setup...')

    // Step 1: Clear existing data
    console.log('1. Clearing existing data...')
    await supabase.from('testimonials').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    // Step 2: Insert projects
    console.log('2. Inserting projects...')
    const { data: projectsData, error: projectsError } = await supabase
      .from('projects')
      .insert(projects)
      .select()

    if (projectsError) {
      console.error('Error inserting projects:', projectsError)
      return NextResponse.json({ 
        error: 'Failed to insert projects', 
        details: projectsError.message,
        instruction: 'Make sure to run the SQL setup first in Supabase SQL Editor'
      }, { status: 500 })
    }

    // Step 3: Insert testimonials
    console.log('3. Inserting testimonials...')
    const testimonials = [
      {
        name: 'Alex Johnson',
        role: 'CTO',
        company: 'Senflix Entertainment',
        content: 'SenDev delivered an exceptional streaming platform that exceeded our expectations. The AI recommendations are incredibly accurate and user engagement has never been higher.',
        project_id: projectsData.find(p => p.slug === 'senflix')?.id
      },
      {
        name: 'Sarah Chen',
        role: 'Product Manager',
        company: 'Synapsee Inc',
        content: 'The knowledge management system completely transformed how our distributed team collaborates. The AI-powered search finds exactly what we need instantly.',
        project_id: projectsData.find(p => p.slug === 'synapsee')?.id
      },
      {
        name: 'Mike Rodriguez',
        role: 'Creative Director',
        company: 'Social Buzz Agency',
        content: 'The Meme Machine went viral and drove incredible engagement for our clients. The AI understands trends better than most humans!',
        project_id: projectsData.find(p => p.slug === 'meme-machine')?.id
      },
      {
        name: 'Lisa Wang',
        role: 'Engineering Lead',
        company: 'DevCorp Solutions',
        content: 'Fork:it revolutionized our entire development workflow. Code reviews are seamless and deployment process is bulletproof.',
        project_id: projectsData.find(p => p.slug === 'fork-it')?.id
      },
      {
        name: 'David Brown',
        role: 'L&D Director',
        company: 'Kria Corp',
        content: 'The training platform is both intuitive and powerful. Employee engagement scores have reached all-time highs.',
        project_id: projectsData.find(p => p.slug === 'kria-training')?.id
      }
    ]

    const { data: testimonialsData, error: testimonialsError } = await supabase
      .from('testimonials')
      .insert(testimonials)
      .select()

    if (testimonialsError) {
      console.error('Error inserting testimonials:', testimonialsError)
    }

    // Step 4: Test appointments table
    console.log('4. Testing appointments table...')
    const { data: appointmentsTest, error: appointmentsError } = await supabase
      .from('appointments')
      .select('count')
      .limit(1)

    return NextResponse.json({
      success: true,
      message: 'Database setup completed successfully!',
      results: {
        projects: `${projectsData?.length || 0} projects inserted`,
        testimonials: `${testimonialsData?.length || 0} testimonials inserted`,
        appointments: appointmentsError ? `Error: ${appointmentsError.message}` : 'Table accessible ✅'
      },
      nextSteps: [
        'Visit /projects to see the populated projects',
        'Test appointment booking on /contact',
        'Check Supabase dashboard for data verification'
      ]
    })

  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({
      error: 'Database setup failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      instructions: [
        '1. Make sure you have run the SQL setup in Supabase SQL Editor first',
        '2. Check that all environment variables are configured',
        '3. Verify Supabase project is accessible'
      ]
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Database setup endpoint - use POST to run setup',
    requirements: [
      '1. Supabase SQL tables must be created first',
      '2. Environment variables must be configured',
      '3. Service role key must have proper permissions'
    ],
    sqlSetup: 'Run the complete supabase_setup.sql file in your Supabase SQL Editor first'
  })
}