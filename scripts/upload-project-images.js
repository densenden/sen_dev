const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Project slug to filename mapping based on what we found in public/projects
const projectImages = {
  'synapsee': 'synapsee.jpg',
  'bavaria': 'bavaria.webp', 
  'kria-training': 'kria.png',
  'senrecorder': 'senrecorder.png',
  'forkit': 'forkit.jpg',
  'beauty-machine': 'mememachine.png',
  'pepe': 'pepe.webp',
  'sencommerce': 'sencommerce.jpg',
  'beautymachine': 'beautymachine.jpeg',
  'senflix': 'senflix.jpg',
  'senscript': 'senscript.png',
  'paradieshof': 'paradieshof.png',
  'nortpatrol': 'nortpatrol.png'
}

async function uploadProjectImages() {
  console.log('🚀 Starting project image upload to Supabase...')
  
  const projectsDir = path.join(__dirname, '../public/projects')
  const uploadResults = []
  const uploadedImages = {}
  
  try {
    // First, get all projects from database
    const { data: projects, error: fetchError } = await supabase
      .from('projects')
      .select('slug, title, screenshots')
      
    if (fetchError) {
      console.error('❌ Error fetching projects:', fetchError)
      return
    }
    
    console.log(`📊 Found ${projects.length} projects in database`)
    
    // Upload each project image
    for (const [slug, filename] of Object.entries(projectImages)) {
      const imagePath = path.join(projectsDir, filename)
      
      if (!fs.existsSync(imagePath)) {
        console.log(`⚠️  Image not found: ${imagePath}`)
        uploadResults.push({ file: filename, status: 'not_found', slug: slug })
        continue
      }
      
      try {
        console.log(`📤 Uploading ${filename} for project ${slug}...`)
        
        // Read the file
        const fileBuffer = fs.readFileSync(imagePath)
        const fileExt = path.extname(filename).toLowerCase()
        const fileName = `${slug}-main${fileExt}`
        
        // Determine content type
        let contentType = 'image/jpeg'
        if (fileExt === '.png') contentType = 'image/png'
        else if (fileExt === '.webp') contentType = 'image/webp'
        else if (fileExt === '.gif') contentType = 'image/gif'
        
        // Upload to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, fileBuffer, {
            contentType,
            upsert: true
          })
          
        if (uploadError) {
          console.error(`❌ Upload failed for ${filename}:`, uploadError)
          uploadResults.push({ file: filename, status: 'failed', error: uploadError.message, slug })
          continue
        }
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName)
          
        const publicUrl = urlData.publicUrl
        uploadedImages[slug] = publicUrl
        uploadResults.push({ file: filename, status: 'success', url: publicUrl, slug })
        
        console.log(`✅ Uploaded: ${publicUrl}`)
        
      } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error)
        uploadResults.push({ file: filename, status: 'error', error: error.message, slug })
      }
    }
    
    // Update database with new URLs
    console.log('\n📝 Updating database with new image URLs...')
    
    for (const [slug, imageUrl] of Object.entries(uploadedImages)) {
      try {
        const { error: updateError } = await supabase
          .from('projects')
          .update({ 
            screenshots: [imageUrl] 
          })
          .eq('slug', slug)
          
        if (updateError) {
          console.error(`❌ Database update failed for ${slug}:`, updateError)
        } else {
          console.log(`✅ Updated ${slug} with image URL`)
        }
      } catch (error) {
        console.error(`❌ Error updating ${slug}:`, error)
      }
    }
    
  } catch (error) {
    console.error('❌ Upload script failed:', error)
    return
  }

  // Summary
  const successful = uploadResults.filter(r => r.status === 'success').length
  const failed = uploadResults.filter(r => r.status === 'failed' || r.status === 'error').length
  const notFound = uploadResults.filter(r => r.status === 'not_found').length
  
  console.log(`\n📊 Upload Summary:`)
  console.log(`✅ Successful: ${successful}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`⚠️  Not Found: ${notFound}`)
  
  if (failed > 0) {
    console.log('\n❌ Failed uploads:')
    uploadResults.filter(r => r.status === 'failed' || r.status === 'error').forEach(r => {
      console.log(`  - ${r.file} (${r.slug}): ${r.error}`)
    })
  }
  
  if (notFound > 0) {
    console.log('\n⚠️  Images not found:')
    uploadResults.filter(r => r.status === 'not_found').forEach(r => {
      console.log(`  - ${r.file} for project ${r.slug}`)
    })
  }

  console.log('\n🎉 Image upload completed!')
  console.log(`📊 Successfully uploaded ${successful} images and updated database`)
  
  return uploadResults
}

// Run the upload
uploadProjectImages()
  .then(results => {
    console.log('\n🎉 Image upload process completed!')
    process.exit(0)
  })
  .catch(error => {
    console.error('❌ Upload process failed:', error)
    process.exit(1)
  })