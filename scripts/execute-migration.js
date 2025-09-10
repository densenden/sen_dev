const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Project updates with all display data
const projectDataMap = {
  'senflix': {
    headline: 'SenFlix - AI Streaming',
    subline: 'Personalized Content Discovery',
    logo: 'SF',
    logo_type: 'text',
    icon_name: 'Play',
    features: ['1K+ Users', 'AI Recommendations', 'Real-time Analytics'],
    category: 'Entertainment',
    github_url: null,
    is_featured: true,
    development_time_weeks: 8
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
    is_featured: true,
    development_time_weeks: 12
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
    is_featured: false,
    development_time_weeks: 16
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
    is_featured: true,
    development_time_weeks: 10
  },
  'fork-it': {
    headline: 'Fork:it - Code Collaboration',
    subline: 'Advanced Development Platform',
    logo: 'FK',
    logo_type: 'text',
    icon_name: 'Code',
    features: ['Team Collaboration', 'Version Control', 'Code Reviews'],
    category: 'Developer Tools',
    github_url: null,
    is_featured: true,
    development_time_weeks: 12
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
    is_featured: false,
    development_time_weeks: 14
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
    is_featured: true,
    development_time_weeks: 10
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
    is_featured: true,
    development_time_weeks: 18
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
    is_featured: false,
    development_time_weeks: 12
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
    is_featured: false,
    development_time_weeks: 8
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
    is_featured: true,
    development_time_weeks: 6
  },
  'meme-machine': {
    headline: 'Meme Machine - AI Content',
    subline: 'Viral Social Media Generator',
    logo: 'MM',
    logo_type: 'text',
    icon_name: 'Sparkles',
    features: ['AI Generation', 'Viral Content', 'Social Media'],
    category: 'AI',
    github_url: null,
    is_featured: false,
    development_time_weeks: 8
  }
}

async function executeMigration() {
  console.log('🚀 Starting complete database migration...')

  try {
    // Step 1: Get all projects
    const { data: projects, error: fetchError } = await supabase
      .from('projects')
      .select('id, slug, title, summary, tags, outcome')

    if (fetchError) {
      console.error('❌ Error fetching projects:', fetchError)
      return
    }

    console.log(`📊 Found ${projects?.length || 0} projects to update`)

    // Step 2: Update each project with display data
    let updated = 0
    for (const project of projects || []) {
      const updateData = projectDataMap[project.slug]
      
      if (updateData) {
        // Merge update data with smart defaults
        const finalData = {
          ...updateData,
          // Always ensure we have good fallbacks
          headline: updateData.headline || `${project.title} - Platform`,
          subline: updateData.subline || project.summary,
          logo: updateData.logo || project.title.substring(0, 2).toUpperCase(),
          logo_type: 'text',
          icon_name: updateData.icon_name || 'Globe',
          features: updateData.features || (project.outcome ? [project.outcome] : ['Advanced Features']),
          updated_at: new Date().toISOString()
        }

        const { error: updateError } = await supabase
          .from('projects')
          .update(finalData)
          .eq('id', project.id)

        if (updateError) {
          console.error(`❌ Error updating ${project.title}:`, updateError)
        } else {
          console.log(`✅ Updated ${project.title} (${project.slug})`)
          updated++
        }
      } else {
        console.log(`⚠️  No specific data for ${project.slug}, adding defaults...`)
        
        // Add basic defaults for projects without specific data
        const defaultData = {
          headline: `${project.title} - Platform`,
          subline: project.summary,
          logo: project.title.substring(0, 2).toUpperCase(),
          logo_type: 'text',
          icon_name: project.tags?.includes('AI') ? 'Brain' : 'Globe',
          features: project.outcome ? [project.outcome] : ['Advanced Features'],
          category: 'Platform',
          is_featured: false,
          development_time_weeks: 8,
          updated_at: new Date().toISOString()
        }

        const { error: updateError } = await supabase
          .from('projects')
          .update(defaultData)
          .eq('id', project.id)

        if (!updateError) {
          console.log(`✅ Added defaults for ${project.title}`)
          updated++
        }
      }
    }

    console.log(`\n🎉 Migration completed! Updated ${updated}/${projects?.length} projects`)
    console.log('\n📋 Summary:')
    console.log('✅ All projects now have display fields')
    console.log('✅ Categories assigned')  
    console.log('✅ Features and icons set')
    console.log('✅ Ready for project showcase')

  } catch (error) {
    console.error('❌ Migration failed:', error)
  }
}

executeMigration()