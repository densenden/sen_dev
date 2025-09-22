const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

async function applyStorageRLS() {
  try {
    console.log('🔧 Applying storage RLS policies via REST API...')
    
    // Use the REST API directly with service role key
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        query: `
          -- Drop all existing policies
          DROP POLICY IF EXISTS "Public Access" ON storage.objects;
          DROP POLICY IF EXISTS "Allow uploads for authenticated users" ON storage.objects;
          DROP POLICY IF EXISTS "Allow delete for authenticated users" ON storage.objects;
          DROP POLICY IF EXISTS "Allow anon uploads" ON storage.objects;
          DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
          DROP POLICY IF EXISTS "Allow anon updates" ON storage.objects;
          DROP POLICY IF EXISTS "Allow anon deletes" ON storage.objects;
          DROP POLICY IF EXISTS "project_images_select" ON storage.objects;
          DROP POLICY IF EXISTS "project_images_insert" ON storage.objects;
          DROP POLICY IF EXISTS "project_images_update" ON storage.objects;
          DROP POLICY IF EXISTS "project_images_delete" ON storage.objects;
          DROP POLICY IF EXISTS "Anyone can view project images" ON storage.objects;
          DROP POLICY IF EXISTS "Anyone can upload project images" ON storage.objects;
          DROP POLICY IF EXISTS "Anyone can update project images" ON storage.objects;
          DROP POLICY IF EXISTS "Anyone can delete project images" ON storage.objects;
          
          -- Create new permissive policies
          CREATE POLICY "Anyone can view project images" 
          ON storage.objects FOR SELECT 
          USING (bucket_id = 'project-images');
          
          CREATE POLICY "Anyone can upload project images" 
          ON storage.objects FOR INSERT 
          WITH CHECK (bucket_id = 'project-images');
          
          CREATE POLICY "Anyone can update project images" 
          ON storage.objects FOR UPDATE 
          USING (bucket_id = 'project-images');
          
          CREATE POLICY "Anyone can delete project images" 
          ON storage.objects FOR DELETE 
          USING (bucket_id = 'project-images');
        `
      })
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error('Failed to execute SQL:', error)
      console.log('\n⚠️  Manual action required!')
      console.log('Please follow these steps to fix storage policies:')
      console.log('')
      console.log('1. Go to: https://supabase.com/dashboard/project/qrnzasjjubparpljaibc/storage/policies')
      console.log('2. Click on "New policy" button')
      console.log('3. Select "For full customization" option')
      console.log('4. Create these 4 policies:')
      console.log('')
      console.log('Policy 1 - Read:')
      console.log('  - Policy name: "Anyone can view project images"')
      console.log('  - Allowed operation: SELECT')
      console.log('  - Target roles: Leave empty (applies to all)')
      console.log('  - USING expression: bucket_id = \'project-images\'')
      console.log('')
      console.log('Policy 2 - Upload:')
      console.log('  - Policy name: "Anyone can upload project images"')
      console.log('  - Allowed operation: INSERT')
      console.log('  - Target roles: Leave empty (applies to all)')
      console.log('  - WITH CHECK expression: bucket_id = \'project-images\'')
      console.log('')
      console.log('Policy 3 - Update:')
      console.log('  - Policy name: "Anyone can update project images"')
      console.log('  - Allowed operation: UPDATE')
      console.log('  - Target roles: Leave empty (applies to all)')
      console.log('  - USING expression: bucket_id = \'project-images\'')
      console.log('')
      console.log('Policy 4 - Delete:')
      console.log('  - Policy name: "Anyone can delete project images"')
      console.log('  - Allowed operation: DELETE')
      console.log('  - Target roles: Leave empty (applies to all)')
      console.log('  - USING expression: bucket_id = \'project-images\'')
      return
    }
    
    console.log('✅ Storage policies applied successfully!')
    
    // Test with anon key
    const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    
    const pngData = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64')
    const testFile = new Blob([pngData], { type: 'image/png' })
    const fileName = `test-${Date.now()}.png`
    
    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(fileName, testFile)
    
    if (error) {
      console.error('❌ Upload test failed:', error.message)
    } else {
      console.log('✅ Upload test successful!')
      
      // Clean up
      await supabase.storage.from('project-images').remove([fileName])
      console.log('✅ Test file cleaned up')
    }
    
  } catch (error) {
    console.error('Error:', error)
  }
}

applyStorageRLS()