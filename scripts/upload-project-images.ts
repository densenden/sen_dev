#!/usr/bin/env tsx

// Load environment variables
import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Project images to upload
const projectImages = [
  {
    slug: 'pepe',
    localPath: 'public/projects/pepe.webp',
    remotePath: 'pepe/main.webp'
  },
  {
    slug: 'paradieshof',
    localPath: 'public/projects/bavaria.webp',
    remotePath: 'paradieshof/main.webp'
  },
  // Add more images as needed
]

async function uploadProjectImages() {
  console.log('Starting project images upload to Supabase storage...')

  for (const image of projectImages) {
    try {
      const localFilePath = join(process.cwd(), image.localPath)
      
      if (!existsSync(localFilePath)) {
        console.warn(`⚠️  File not found: ${localFilePath}`)
        continue
      }

      console.log(`📤 Uploading ${image.localPath} -> ${image.remotePath}`)
      
      const fileBuffer = readFileSync(localFilePath)
      const fileExt = image.localPath.split('.').pop()
      const contentType = fileExt === 'webp' ? 'image/webp' : 
                         fileExt === 'jpg' || fileExt === 'jpeg' ? 'image/jpeg' : 
                         fileExt === 'png' ? 'image/png' : 'image/webp'

      const { data, error } = await supabase.storage
        .from('project-images')
        .upload(image.remotePath, fileBuffer, {
          contentType,
          cacheControl: '3600',
          upsert: true // Replace if exists
        })

      if (error) {
        console.error(`❌ Error uploading ${image.remotePath}:`, error.message)
        continue
      }

      console.log(`✅ Uploaded ${image.remotePath}`)

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(image.remotePath)

      console.log(`🔗 Public URL: ${publicUrl}`)

      // Update the project's screenshots array in the database
      const { data: updateData, error: updateError } = await supabase
        .from('projects')
        .update({
          screenshots: [publicUrl]
        })
        .eq('slug', image.slug)
        .select()

      if (updateError) {
        console.error(`❌ Error updating project ${image.slug}:`, updateError.message)
      } else {
        console.log(`✅ Updated project ${image.slug} with image URL`)
      }

    } catch (error) {
      console.error(`❌ Error processing ${image.localPath}:`, error)
    }
  }

  console.log('\\n🎉 Image upload completed!')
  console.log('\\nNext steps:')
  console.log('1. Check your Supabase storage bucket for the uploaded images')
  console.log('2. Verify that project screenshots are updated in the database')
  console.log('3. Test the project pages to ensure images are loading correctly')
}

// Run upload if called directly
if (require.main === module) {
  uploadProjectImages()
}

export { uploadProjectImages }