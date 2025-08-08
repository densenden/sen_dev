require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Sample projects with real image paths from our existing random folder
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
    link_live: 'https://synapsee.example.com'
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
    link_live: 'https://kria-training.example.com'
  }
]

// Sample testimonials
const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'CTO',
    company: 'Senflix Entertainment',
    content: 'SenDev delivered an exceptional streaming platform that exceeded our expectations. The AI recommendations are incredibly accurate and user engagement has never been higher.',
    avatar_url: null,
    project_slug: 'senflix'
  },
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'Synapsee Inc',
    content: 'The knowledge management system completely transformed how our distributed team collaborates. The AI-powered search finds exactly what we need instantly.',
    avatar_url: null,
    project_slug: 'synapsee'
  },
  {
    name: 'Mike Rodriguez',
    role: 'Creative Director',
    company: 'Social Buzz Agency',
    content: 'The Meme Machine went viral and drove incredible engagement for our clients. The AI understands trends better than most humans! Amazing work by the SenDev team.',
    avatar_url: null,
    project_slug: 'meme-machine'
  },
  {
    name: 'Lisa Wang',
    role: 'Engineering Lead',
    company: 'DevCorp Solutions',
    content: 'Fork:it revolutionized our entire development workflow. Code reviews are now seamless and our deployment process is bulletproof. The SenDev team is incredibly talented.',
    avatar_url: null,
    project_slug: 'fork-it'
  },
  {
    name: 'David Brown',
    role: 'L&D Director',
    company: 'Kria Corp',
    content: 'The training platform is both intuitive and powerful. Our employee engagement scores have reached all-time highs and the certification process is seamless.',
    avatar_url: null,
    project_slug: 'kria-training'
  }
]

async function setupProjectsDatabase() {
  console.log('🚀 Setting up projects in Supabase...')

  try {
    // First, clear existing projects (optional)
    console.log('Clearing existing projects...')
    await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('testimonials').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    // Insert projects
    console.log('Inserting projects...')
    const { data: projectsData, error: projectsError } = await supabase
      .from('projects')
      .insert(projects)
      .select()

    if (projectsError) {
      console.error('❌ Error inserting projects:', projectsError)
      return
    }

    console.log(`✅ Inserted ${projectsData.length} projects`)

    // Insert testimonials with project references
    console.log('Inserting testimonials...')
    const testimonialsWithIds = []

    for (const testimonial of testimonials) {
      const project = projectsData.find(p => p.slug === testimonial.project_slug)
      if (project) {
        testimonialsWithIds.push({
          ...testimonial,
          project_id: project.id
        })
        delete testimonialsWithIds[testimonialsWithIds.length - 1].project_slug
      }
    }

    const { data: testimonialsData, error: testimonialsError } = await supabase
      .from('testimonials')
      .insert(testimonialsWithIds)
      .select()

    if (testimonialsError) {
      console.error('❌ Error inserting testimonials:', testimonialsError)
    } else {
      console.log(`✅ Inserted ${testimonialsData.length} testimonials`)
    }

    // Verify the setup
    const { data: verifyProjects } = await supabase
      .from('projects')
      .select('title, slug, screenshots')

    const { data: verifyTestimonials } = await supabase
      .from('testimonials')
      .select('name, company')

    console.log('\n📊 Database Setup Complete!')
    console.log(`Projects: ${verifyProjects?.length || 0}`)
    console.log(`Testimonials: ${verifyTestimonials?.length || 0}`)

    console.log('\n🔗 Project URLs:')
    verifyProjects?.forEach(project => {
      console.log(`  - ${project.title}: /projects/${project.slug}`)
    })

    console.log('\n📸 Sample screenshot URLs:')
    verifyProjects?.slice(0, 2).forEach(project => {
      project.screenshots?.slice(0, 1).forEach(screenshot => {
        console.log(`  - ${project.title}: ${screenshot}`)
      })
    })

  } catch (error) {
    console.error('❌ Setup failed:', error)
  }
}

setupProjectsDatabase()