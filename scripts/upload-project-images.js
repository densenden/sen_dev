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

// Sample project images data
const projectImages = [
  {
    fileName: 'senflix-1.jpg',
    projectSlug: 'senflix',
    description: 'Senflix homepage'
  },
  {
    fileName: 'senflix-2.jpg', 
    projectSlug: 'senflix',
    description: 'Senflix dashboard'
  },
  {
    fileName: 'synapsee-1.jpg',
    projectSlug: 'synapsee', 
    description: 'Synapsee interface'
  },
  {
    fileName: 'synapsee-2.jpg',
    projectSlug: 'synapsee',
    description: 'Synapsee search'
  },
  {
    fileName: 'meme-machine-1.jpg',
    projectSlug: 'meme-machine',
    description: 'Meme Machine generator'
  },
  {
    fileName: 'meme-machine-2.jpg',
    projectSlug: 'meme-machine', 
    description: 'Meme Machine gallery'
  },
  {
    fileName: 'fork-it-1.jpg',
    projectSlug: 'fork-it',
    description: 'Fork:it code review'
  },
  {
    fileName: 'fork-it-2.jpg',
    projectSlug: 'fork-it',
    description: 'Fork:it dashboard'
  },
  {
    fileName: 'kria-1.jpg',
    projectSlug: 'kria-training',
    description: 'Kria training interface'
  },
  {
    fileName: 'kria-2.jpg',
    projectSlug: 'kria-training',
    description: 'Kria progress tracking'
  }
]

async function uploadPlaceholderImages() {
  console.log('Creating placeholder images for projects...')
  
  // Create a simple SVG placeholder
  const createPlaceholderSVG = (projectName, width = 800, height = 600) => {
    return `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <rect x="50" y="50" width="${width-100}" height="${height-100}" fill="#e5e7eb" stroke="#d1d5db" stroke-width="2"/>
        <text x="50%" y="45%" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" fill="#6b7280">
          ${projectName}
        </text>
        <text x="50%" y="55%" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#9ca3af">
          Project Screenshot
        </text>
        <text x="50%" y="65%" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#d1d5db">
          ${width} × ${height}
        </text>
      </svg>
    `
  }

  const uploadResults = []

  for (const imageData of projectImages) {
    try {
      // Create SVG content
      const svgContent = createPlaceholderSVG(
        imageData.projectSlug.replace('-', ' ').toUpperCase(),
        800,
        600
      )
      
      // Convert SVG to buffer (simulating an image file)
      const buffer = Buffer.from(svgContent, 'utf8')
      
      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('project-images')  
        .upload(imageData.fileName, buffer, {
          contentType: 'image/svg+xml',
          upsert: true // Replace if exists
        })

      if (error) {
        console.error(`Failed to upload ${imageData.fileName}:`, error.message)
        uploadResults.push({ file: imageData.fileName, status: 'failed', error: error.message })
      } else {
        console.log(`✅ Uploaded: ${imageData.fileName}`)
        uploadResults.push({ file: imageData.fileName, status: 'success', path: data.path })
      }

    } catch (err) {
      console.error(`Error processing ${imageData.fileName}:`, err)
      uploadResults.push({ file: imageData.fileName, status: 'error', error: err.message })
    }
  }

  // Summary
  const successful = uploadResults.filter(r => r.status === 'success').length
  const failed = uploadResults.filter(r => r.status !== 'success').length
  
  console.log(`\n📊 Upload Summary:`)
  console.log(`✅ Successful: ${successful}`)
  console.log(`❌ Failed: ${failed}`)
  
  if (failed > 0) {
    console.log('\n❌ Failed uploads:')
    uploadResults.filter(r => r.status !== 'success').forEach(r => {
      console.log(`  - ${r.file}: ${r.error}`)
    })
  }

  // Test public access
  if (successful > 0) {
    const firstSuccessful = uploadResults.find(r => r.status === 'success')
    const publicUrl = supabase.storage
      .from('project-images')
      .getPublicUrl(firstSuccessful.file)

    console.log(`\n🔗 Sample public URL: ${publicUrl.data.publicUrl}`)
  }

  return uploadResults
}

// Run the upload
uploadPlaceholderImages()
  .then(results => {
    console.log('\n🎉 Image upload process completed!')
    process.exit(0)
  })
  .catch(error => {
    console.error('❌ Upload process failed:', error)
    process.exit(1)
  })