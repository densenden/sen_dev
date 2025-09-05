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

// New project to add - customize these details
const newProject = {
  title: 'EcoTrack',
  slug: 'ecotrack',
  summary: 'Carbon footprint tracking and sustainability analytics platform',
  description: 'A comprehensive platform for businesses to track, analyze, and reduce their carbon footprint. Features real-time emissions monitoring, sustainability reporting, and AI-powered optimization recommendations. Includes supply chain tracking, employee engagement tools, and regulatory compliance dashboards.',
  tech_stack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Python', 'TensorFlow', 'D3.js', 'AWS'],
  screenshots: ['/random/hero-2.jpg', '/random/hero-5.jpg', '/random/hero-8.jpg'],
  video_demo: null,
  tags: ['sustainability', 'analytics', 'ai', 'carbon-tracking', 'enterprise'],
  client_name: 'GreenTech Solutions',
  outcome: 'Helped 50+ companies reduce carbon emissions by 35% on average, saved $2M in operational costs',
  link_live: 'https://ecotrack.example.com'
}

// Optional: Add a testimonial for this project
const newTestimonial = {
  name: 'Emma Green',
  role: 'Head of Sustainability',
  company: 'GreenTech Solutions',
  content: 'EcoTrack transformed our sustainability efforts from reactive to proactive. The AI insights helped us identify emission hotspots we never knew existed, and the reporting features made compliance a breeze.',
  avatar_url: null
}

async function addNewProject() {
  console.log('🚀 Adding new project to Supabase...')

  try {
    // Insert the new project
    console.log(`Adding project: ${newProject.title}...`)
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .insert(newProject)
      .select()
      .single()

    if (projectError) {
      console.error('❌ Error inserting project:', projectError)
      return
    }

    console.log(`✅ Successfully added project: ${projectData.title}`)
    console.log(`   URL: /projects/${projectData.slug}`)
    console.log(`   ID: ${projectData.id}`)

    // Add testimonial if project was successful
    if (newTestimonial) {
      console.log('\nAdding testimonial...')
      const { data: testimonialData, error: testimonialError } = await supabase
        .from('testimonials')
        .insert({
          ...newTestimonial,
          project_id: projectData.id
        })
        .select()
        .single()

      if (testimonialError) {
        console.error('❌ Error inserting testimonial:', testimonialError)
      } else {
        console.log(`✅ Successfully added testimonial from ${testimonialData.name}`)
      }
    }

    // Verify the addition
    console.log('\n📊 Verifying database...')
    const { data: allProjects, error: verifyError } = await supabase
      .from('projects')
      .select('title, slug')
      .order('created_at', { ascending: false })

    if (!verifyError) {
      console.log(`\nTotal projects in database: ${allProjects.length}`)
      console.log('\nLatest 3 projects:')
      allProjects.slice(0, 3).forEach(p => {
        console.log(`  - ${p.title} (/projects/${p.slug})`)
      })
    }

  } catch (error) {
    console.error('❌ Operation failed:', error)
  }
}

addNewProject()