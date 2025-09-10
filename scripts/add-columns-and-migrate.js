const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function addColumnsAndMigrate() {
  console.log('🔄 Adding columns and migrating data...')

  try {
    // First, let's try updating just the fields we know exist
    console.log('📊 Updating projects with existing fields...')

    const { data: projects, error: fetchError } = await supabase
      .from('projects')
      .select('id, slug, title, summary, tags, outcome')

    if (fetchError) {
      console.error('❌ Error fetching projects:', fetchError)
      return
    }

    console.log(`Found ${projects?.length || 0} projects`)

    // Update with just the basic fields that should exist
    for (const project of projects || []) {
      let updateData = {}

      // Set live URLs based on slug
      if (project.slug === 'sencommerce') {
        updateData.link_live = 'https://shop.sen.studio'
      } else if (project.slug === 'senflix') {
        updateData.link_live = 'https://flix.sen.studio'
      } else if (project.slug === 'paradieshof') {
        updateData.link_live = 'https://paradieshof.sen.studio'
      } else if (project.slug === 'forkit' || project.slug === 'fork-it') {
        updateData.link_live = 'https://forkit.sen.studio'
      } else if (project.slug === 'beauty-machine' || project.slug === 'meme-machine') {
        updateData.link_live = 'https://beautymachine.sen.studio'
      } else if (project.slug === 'senrecorder') {
        updateData.link_live = 'https://recorder.sen.studio'
      } else if (project.slug === 'senscript') {
        updateData.link_live = 'https://getscript.sen.studio'
      } else if (project.slug === 'synapsee') {
        updateData.link_live = 'https://synapsee.sen.studio'
      } else if (project.slug === 'kria-training') {
        updateData.link_live = 'https://community.kria-training.de'
      } else if (project.slug === 'pepe') {
        updateData.link_live = 'https://www.pepeshows.de'
      }

      if (Object.keys(updateData).length > 0) {
        updateData.updated_at = new Date().toISOString()

        const { error: updateError } = await supabase
          .from('projects')
          .update(updateData)
          .eq('id', project.id)

        if (updateError) {
          console.error(`❌ Error updating ${project.title}:`, updateError)
        } else {
          console.log(`✅ Updated ${project.title} with live URL`)
        }
      }
    }

    console.log('\n✅ Updated projects with live URLs')
    console.log('\n📌 Manual step required:')
    console.log('   Please run the SQL from scripts/add-display-fields.sql in your Supabase SQL Editor')
    console.log('   This will add the missing display columns to make projects show correctly')

  } catch (error) {
    console.error('❌ Operation failed:', error)
  }
}

addColumnsAndMigrate()