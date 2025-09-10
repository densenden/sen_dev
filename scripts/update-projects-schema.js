const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Project data with all the missing display fields
const projectUpdates = {
  'senflix': {
    headline: 'SenFlix - AI Streaming',
    subline: 'Personalized Content Discovery',
    logo: 'SF',
    logo_type: 'text',
    icon_name: 'Play',
    features: ['1K+ Users', 'AI Recommendations', 'Real-time Analytics'],
    category: 'Entertainment',
    github_url: null,
    is_featured: true
  },
  'synapsee': {
    headline: 'Synapsee - Knowledge Management',
    subline: 'AI-Powered Team Collaboration',
    logo: 'SY',
    logo_type: 'text',
    icon_name: 'Brain',
    features: ['50% Productivity Boost', 'AI Knowledge Graphs', 'Team Insights'],
    category: 'Productivity',
    github_url: null,
    is_featured: true
  },
  'kria-training': {
    headline: 'Kria Training - Learning Platform',
    subline: 'Professional Development',
    logo: 'KT',
    logo_type: 'text',
    icon_name: 'Brain',
    features: ['500+ Certified Professionals', 'Interactive Courses', '95% Completion Rate'],
    category: 'Education',
    github_url: null,
    is_featured: false
  },
  'forkit': {
    headline: 'Fork:it - Food Discovery',
    subline: 'Social Restaurant Platform',
    logo: 'FI',
    logo_type: 'text',
    icon_name: 'Smartphone',
    features: ['10K+ Reviews', 'Social Discovery', 'Local Gems'],
    category: 'Mobile',
    github_url: null,
    is_featured: true
  },
  'beauty-machine': {
    headline: 'Beauty Machine - AI Beauty',
    subline: 'Personalized Recommendations',
    logo: 'BM',
    logo_type: 'text',
    icon_name: 'Sparkles',
    features: ['95% Match Accuracy', 'Facial Analysis', 'Personalized Products'],
    category: 'AI',
    github_url: null,
    is_featured: false
  },
  'pepe': {
    headline: 'Pepe Shows - Meme Trading',
    subline: 'Crypto Meme Platform',
    logo: 'PE',
    logo_type: 'text',
    icon_name: 'TrendingUp',
    features: ['$2M+ Daily Volume', 'Social Sentiment', 'Real-time Analytics'],
    category: 'Web3',
    github_url: null,
    is_featured: true
  },
  'paradieshof': {
    headline: 'Paradieshof - Luxury Real Estate',
    subline: 'Premium Property Platform',
    logo: 'PH',
    logo_type: 'text',
    icon_name: 'Building2',
    features: ['€50M+ Properties', '3D Virtual Tours', 'Elite Clientele'],
    category: 'Real Estate',
    github_url: null,
    is_featured: true
  },
  'senrecorder': {
    headline: 'SenRecorder - AI Screen Recording',
    subline: 'Professional Recording Suite',
    logo: 'SR',
    logo_type: 'text',
    icon_name: 'Brain',
    features: ['5K+ Creators', 'AI Transcription', 'Cloud Collaboration'],
    category: 'Productivity',
    github_url: null,
    is_featured: false
  },
  'senscript': {
    headline: 'SenScript - AI Screenwriting',
    subline: 'Intelligent Writing Assistant',
    logo: 'SS',
    logo_type: 'text',
    icon_name: 'Brain',
    features: ['500+ Scripts', 'Character Development', 'Industry Formatting'],
    category: 'AI',
    github_url: null,
    is_featured: false
  },
  'sencommerce': {
    headline: 'Sencommerce - E-commerce Platform',
    subline: 'Modern Shopping Experience',
    logo: 'SC',
    logo_type: 'text',
    icon_name: 'Building2',
    features: ['Modern Design', 'Stripe Integration', 'Seamless UX'],
    category: 'E-commerce',
    github_url: 'https://github.com/densenden/sencommerce',
    is_featured: true
  }
}

async function updateProjectsSchema() {
  console.log('🔄 Updating projects with display fields...')

  try {
    // Get all projects
    const { data: projects, error: fetchError } = await supabase
      .from('projects')
      .select('id, slug, title')

    if (fetchError) {
      console.error('Error fetching projects:', fetchError)
      return
    }

    console.log(`Found ${projects?.length || 0} projects to update`)

    // Update each project with new display fields
    for (const project of projects || []) {
      const updates = projectUpdates[project.slug]
      if (updates) {
        const { error: updateError } = await supabase
          .from('projects')
          .update({
            ...updates,
            updated_at: new Date().toISOString()
          })
          .eq('id', project.id)

        if (updateError) {
          console.error(`❌ Error updating ${project.title}:`, updateError)
        } else {
          console.log(`✅ Updated ${project.title}`)
        }
      } else {
        console.log(`⚠️  No update data found for ${project.slug}`)
      }
    }

    console.log('\n🎉 Projects schema update completed!')

  } catch (error) {
    console.error('❌ Schema update failed:', error)
  }
}

updateProjectsSchema()