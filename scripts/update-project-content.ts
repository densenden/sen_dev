#!/usr/bin/env tsx

// Load environment variables
import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import { generateProjectContent } from '../src/lib/ai-content-generator'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const anthropicApiKey = process.env.ANTHROPIC_API_KEY

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Projects to update with their URLs
const projectsToUpdate = [
  {
    slug: 'senflix',
    liveUrl: 'https://flix.sen.studio',
    githubUrl: null
  },
  {
    slug: 'forkit',
    liveUrl: 'https://forkit.sen.studio',
    githubUrl: null
  },
  {
    slug: 'beauty-machine',
    liveUrl: 'https://beautymachine.sen.studio',
    githubUrl: null
  }
]

async function updateProjectContent() {
  console.log('Starting project content update using AI and live URLs...')

  if (!anthropicApiKey) {
    console.error('❌ ANTHROPIC_API_KEY not found in environment variables')
    console.log('Please add ANTHROPIC_API_KEY to your .env.local file')
    return
  }

  for (const projectUpdate of projectsToUpdate) {
    try {
      console.log(`\\n🔄 Processing ${projectUpdate.slug}...`)

      // Fetch current project data
      const { data: currentProject, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', projectUpdate.slug)
        .single()

      if (fetchError || !currentProject) {
        console.error(`❌ Project ${projectUpdate.slug} not found in database`)
        continue
      }

      console.log(`📖 Current project: ${currentProject.title}`)

      // Generate new content using AI
      console.log(`🤖 Generating new content for ${projectUpdate.slug}...`)
      
      const generatedContent = await generateProjectContent({
        githubUrl: projectUpdate.githubUrl,
        liveUrl: projectUpdate.liveUrl,
        title: currentProject.title,
        category: currentProject.category
      })

      console.log(`✅ Generated content for ${generatedContent.title}`)

      // Update the project in the database
      const { data, error } = await supabase
        .from('projects')
        .update({
          title: generatedContent.title,
          summary: generatedContent.summary,
          description: generatedContent.description,
          tech_stack: generatedContent.techStack,
          tags: generatedContent.tags,
          outcome: generatedContent.outcome,
          development_time_weeks: generatedContent.developmentTimeWeeks,
          client_name: generatedContent.clientName,
          category: generatedContent.category,
          github_url: projectUpdate.githubUrl,
          link_live: projectUpdate.liveUrl,
          updated_at: new Date().toISOString()
        })
        .eq('slug', projectUpdate.slug)
        .select()

      if (error) {
        console.error(`❌ Error updating ${projectUpdate.slug}:`, error.message)
        continue
      }

      console.log(`✅ Updated ${projectUpdate.slug} successfully`)
      console.log(`   Title: ${generatedContent.title}`)
      console.log(`   Summary: ${generatedContent.summary}`)
      console.log(`   Tech Stack: ${generatedContent.techStack.join(', ')}`)

    } catch (error) {
      console.error(`❌ Error processing ${projectUpdate.slug}:`, error)
      continue
    }
  }

  console.log('\\n🎉 Project content update completed!')
  console.log('\\nUpdated projects with:')
  console.log('- AI-generated descriptions based on live URLs')
  console.log('- Accurate tech stacks')
  console.log('- Realistic outcomes and metrics')
  console.log('- Updated GitHub and live URLs')
  console.log('\\nCheck your projects at http://localhost:3000/projects')
}

// Run update if called directly
if (require.main === module) {
  updateProjectContent()
}

export { updateProjectContent }