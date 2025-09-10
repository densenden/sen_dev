#!/usr/bin/env tsx

// Load environment variables
import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey)

console.log('Supabase client created for migration script')

// Fallback project data from the component
const fallbackProjects = [
  {
    title: "Senflix",
    slug: "senflix",
    summary: "AI-Powered Streaming Platform",
    description: "Netflix-style platform with intelligent content recommendations. Built with React, Next.js, and OpenAI integration.",
    tech_stack: ["React", "Next.js", "Supabase", "OpenAI"],
    tags: ["Entertainment", "AI"],
    client_name: "Internal",
    outcome: "1K+ Active Users",
    link_live: "https://flix.sen.studio",
    github_url: null,
    category: "Entertainment",
    development_time_weeks: 8,
    is_featured: true,
    screenshots: []
  },
  {
    title: "Synapsee",
    slug: "synapsee",
    summary: "AI Knowledge Management",
    description: "Revolutionary platform connecting ideas through intelligent knowledge graphs. 50% productivity improvement for distributed teams.",
    tech_stack: ["Vue.js", "Node.js", "PostgreSQL", "GPT-4"],
    tags: ["Productivity", "AI"],
    client_name: "Synapsee Inc.",
    outcome: "50% Productivity Boost",
    link_live: null,
    github_url: null,
    category: "Productivity",
    development_time_weeks: 12,
    is_featured: true,
    screenshots: []
  },
  {
    title: "Kria Training",
    slug: "kria-training",
    summary: "Professional Development Platform",
    description: "Comprehensive training ecosystem with interactive courses and certification management. 95% completion rate.",
    tech_stack: ["Angular", "NestJS", "MongoDB", "Stripe"],
    tags: ["Education", "Platform"],
    client_name: "Kria Education",
    outcome: "500+ Certified Professionals",
    link_live: null,
    github_url: null,
    category: "Education",
    development_time_weeks: 16,
    is_featured: false,
    screenshots: []
  },
  {
    title: "Fork:it",
    slug: "forkit",
    summary: "Food Discovery Platform",
    description: "Social food discovery platform connecting food lovers with local restaurants and hidden gems.",
    tech_stack: ["React Native", "Firebase", "Google Maps API"],
    tags: ["Mobile", "Social", "Food"],
    client_name: "Fork:it Startup",
    outcome: "10K+ Restaurant Reviews",
    link_live: "https://forkit.sen.studio",
    github_url: null,
    category: "Mobile",
    development_time_weeks: 10,
    is_featured: true,
    screenshots: []
  },
  {
    title: "Beauty Machine",
    slug: "beauty-machine",
    summary: "AI Beauty Recommendation Engine",
    description: "AI-powered beauty recommendation platform analyzing facial features to suggest personalized cosmetics and treatments.",
    tech_stack: ["Python", "TensorFlow", "React", "FastAPI"],
    tags: ["AI", "Beauty", "E-commerce"],
    client_name: "Beauty Tech Co.",
    outcome: "95% Match Accuracy",
    link_live: "https://beautymachine.sen.studio",
    github_url: null,
    category: "AI",
    development_time_weeks: 14,
    is_featured: false,
    screenshots: []
  },
  {
    title: "Pepe",
    slug: "pepe",
    summary: "Meme Token Trading Platform",
    description: "Advanced crypto trading platform specializing in meme tokens with real-time analytics and social sentiment tracking.",
    tech_stack: ["React", "Web3.js", "Ethereum", "Node.js"],
    tags: ["Crypto", "DeFi", "Trading"],
    client_name: "Pepe Trading",
    outcome: "$2M+ Daily Volume",
    link_live: null,
    github_url: null,
    category: "Web3",
    development_time_weeks: 10,
    is_featured: true,
    screenshots: ["/projects/pepe.webp"]
  },
  {
    title: "Paradieshof",
    slug: "paradieshof",
    summary: "Luxury Real Estate Platform",
    description: "Exclusive real estate platform for luxury property management and elite clientele in Bavaria, featuring virtual tours and AI-powered property matching.",
    tech_stack: ["Next.js", "Three.js", "Supabase", "Stripe"],
    tags: ["Real Estate", "Luxury", "3D"],
    client_name: "Paradieshof Bavaria",
    outcome: "€50M+ Properties Listed",
    link_live: null,
    github_url: null,
    category: "Real Estate",
    development_time_weeks: 18,
    is_featured: true,
    screenshots: ["/projects/bavaria.webp"]
  },
  {
    title: "SenRecorder",
    slug: "senrecorder",
    summary: "AI-Powered Screen Recording Suite",
    description: "Professional screen recording and editing platform with AI transcription, automatic editing, and cloud collaboration features.",
    tech_stack: ["Electron", "FFmpeg", "React", "OpenAI"],
    tags: ["Desktop", "Productivity", "AI"],
    client_name: "Internal",
    outcome: "5K+ Active Creators",
    link_live: null,
    github_url: null,
    category: "Productivity",
    development_time_weeks: 12,
    is_featured: false,
    screenshots: []
  },
  {
    title: "SenScript",
    slug: "senscript",
    summary: "Intelligent Script Writing Assistant",
    description: "AI-powered screenwriting tool that helps writers craft compelling stories with character development, plot analysis, and industry-standard formatting.",
    tech_stack: ["React", "GPT-4", "Python", "FastAPI"],
    tags: ["AI", "Writing", "Creative"],
    client_name: "Internal",
    outcome: "500+ Scripts Created",
    link_live: null,
    github_url: null,
    category: "AI",
    development_time_weeks: 8,
    is_featured: false,
    screenshots: []
  }
]

async function migrateProjects() {
  console.log('Starting project migration...')

  try {
    // Check if projects already exist
    const { data: existingProjects, error: fetchError } = await supabase
      .from('projects')
      .select('slug')

    if (fetchError) {
      console.error('Error checking existing projects:', fetchError)
      process.exit(1)
    }

    const existingSlugs = new Set(existingProjects?.map(p => p.slug) || [])
    const projectsToInsert = fallbackProjects.filter(p => !existingSlugs.has(p.slug))

    if (projectsToInsert.length === 0) {
      console.log('All projects already exist in the database.')
      return
    }

    console.log(`Inserting ${projectsToInsert.length} projects...`)

    // Insert projects with only existing fields
    const projectsForInsert = projectsToInsert.map(project => ({
      title: project.title,
      slug: project.slug,
      summary: project.summary,
      description: project.description,
      tech_stack: project.tech_stack,
      screenshots: project.screenshots,
      video_demo: null,
      tags: project.tags,
      client_name: project.client_name,
      outcome: project.outcome,
      link_live: project.link_live
    }))

    const { data, error } = await supabase
      .from('projects')
      .insert(projectsForInsert)
      .select()

    if (error) {
      console.error('Error inserting projects:', error)
      process.exit(1)
    }

    console.log(`Successfully migrated ${data?.length || 0} projects:`)
    data?.forEach(project => {
      console.log(`  ✅ ${project.title} (${project.slug})`)
    })

    console.log('\n🎉 Migration completed successfully!')
    console.log('\nNext steps:')
    console.log('1. Add images to the project-images bucket in Supabase Storage')
    console.log('2. Update project screenshots arrays with image URLs')
    console.log('3. Test the admin dashboard to manage projects')

  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

// Run migration if called directly
if (require.main === module) {
  migrateProjects()
}

export { migrateProjects }