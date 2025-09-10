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

// Map logo filenames to project slugs
const logoMapping = {
  'KRIA.svg': 'kria-training',
  'forkit_dark_logo.svg': 'forkit',
  'logo_north.svg': 'nortpatrol',
  'mm_dark.svg': 'beauty-machine', // Meme Machine / Beauty Machine
  'senflix.svg': 'senflix',
  'synapsee.svg': 'synapsee'
}

async function uploadLogos() {
  console.log('🚀 Starting logo upload to Supabase...')
  
  const logosDir = path.join(__dirname, '../public/logos')
  const uploadResults = []
  const uploadedLogos = {}
  
  try {
    // First, ensure the logos bucket exists
    const { data: buckets } = await supabase.storage.listBuckets()
    const logosBucket = buckets.find(bucket => bucket.name === 'logos')
    
    if (!logosBucket) {
      console.log('📦 Creating logos bucket...')
      const { error: createError } = await supabase.storage.createBucket('logos', {
        public: true
      })
      
      if (createError) {
        console.error('❌ Failed to create logos bucket:', createError)
        return
      }
      console.log('✅ Logos bucket created')
    }
    
    // Upload each logo
    for (const [filename, projectSlug] of Object.entries(logoMapping)) {
      const logoPath = path.join(logosDir, filename)
      
      if (!fs.existsSync(logoPath)) {
        console.log(`⚠️  Logo not found: ${logoPath}`)
        uploadResults.push({ file: filename, status: 'not_found', slug: projectSlug })
        continue
      }
      
      try {
        console.log(`📤 Uploading ${filename} for project ${projectSlug}...`)
        
        // Read the SVG file
        const svgContent = fs.readFileSync(logoPath, 'utf8')
        
        // Upload to Supabase storage with project slug as filename
        const logoFileName = `${projectSlug}.svg`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('logos')
          .upload(logoFileName, svgContent, {
            contentType: 'image/svg+xml',
            upsert: true
          })
          
        if (uploadError) {
          console.error(`❌ Upload failed for ${filename}:`, uploadError)
          uploadResults.push({ file: filename, status: 'failed', error: uploadError.message, slug: projectSlug })
          continue
        }
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('logos')
          .getPublicUrl(logoFileName)
          
        const publicUrl = urlData.publicUrl
        uploadedLogos[projectSlug] = publicUrl
        uploadResults.push({ file: filename, status: 'success', url: publicUrl, slug: projectSlug })
        
        console.log(`✅ Uploaded: ${publicUrl}`)
        
      } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error)
        uploadResults.push({ file: filename, status: 'error', error: error.message, slug: projectSlug })
      }
    }
    
    // Update database with logo URLs
    console.log('\n📝 Updating database with logo URLs...')
    
    for (const [slug, logoUrl] of Object.entries(uploadedLogos)) {
      try {
        const { error: updateError } = await supabase
          .from('projects')
          .update({ 
            logo: logoUrl,
            logo_type: 'svg'
          })
          .eq('slug', slug)
          
        if (updateError) {
          console.error(`❌ Database update failed for ${slug}:`, updateError)
        } else {
          console.log(`✅ Updated ${slug} with logo URL`)
        }
      } catch (error) {
        console.error(`❌ Error updating ${slug}:`, error)
      }
    }
    
  } catch (error) {
    console.error('❌ Logo upload script failed:', error)
    return
  }

  // Summary
  const successful = uploadResults.filter(r => r.status === 'success').length
  const failed = uploadResults.filter(r => r.status === 'failed' || r.status === 'error').length
  const notFound = uploadResults.filter(r => r.status === 'not_found').length
  
  console.log(`\n📊 Logo Upload Summary:`)
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
    console.log('\n⚠️  Logos not found:')
    uploadResults.filter(r => r.status === 'not_found').forEach(r => {
      console.log(`  - ${r.file} for project ${r.slug}`)
    })
  }

  console.log('\n🎉 Logo upload completed!')
  console.log(`📊 Successfully uploaded ${successful} logos and updated database`)
  
  return uploadResults
}

// Run the upload
uploadLogos()
  .then(results => {
    console.log('\n🎉 Logo upload process completed!')
    process.exit(0)
  })
  .catch(error => {
    console.error('❌ Upload process failed:', error)
    process.exit(1)
  })