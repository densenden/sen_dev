const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function fixStoragePolicies() {
  try {
    console.log('🔧 Fixing storage policies for project-images bucket...')
    
    // First, ensure the bucket exists
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets()
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError)
      return
    }
    
    const projectImagesBucket = buckets.find(b => b.id === 'project-images')
    
    if (!projectImagesBucket) {
      console.log('Creating project-images bucket...')
      const { data, error } = await supabase
        .storage
        .createBucket('project-images', {
          public: true,
          fileSizeLimit: 10485760 // 10MB
        })
      
      if (error) {
        console.error('Error creating bucket:', error)
        return
      }
      console.log('✅ Created project-images bucket')
    } else {
      console.log('✅ project-images bucket exists')
      
      // Update bucket to be public if it's not
      if (!projectImagesBucket.public) {
        const { error } = await supabase
          .storage
          .updateBucket('project-images', {
            public: true,
            fileSizeLimit: 10485760 // 10MB
          })
        
        if (error) {
          console.error('Error updating bucket:', error)
        } else {
          console.log('✅ Updated bucket to be public')
        }
      }
    }
    
    // Apply SQL to fix storage policies - simpler approach
    const sqlCommands = [
      // First, drop ALL existing policies on storage.objects for clean slate
      `DO $$ 
       DECLARE 
         pol RECORD;
       BEGIN
         FOR pol IN 
           SELECT policyname 
           FROM pg_policies 
           WHERE schemaname = 'storage' 
           AND tablename = 'objects'
         LOOP
           EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
         END LOOP;
       END $$;`,
      
      // Create simple, permissive policies for project-images
      `CREATE POLICY "project_images_select" ON storage.objects 
       FOR SELECT USING (bucket_id = 'project-images');`,
      
      `CREATE POLICY "project_images_insert" ON storage.objects 
       FOR INSERT WITH CHECK (bucket_id = 'project-images');`,
      
      `CREATE POLICY "project_images_update" ON storage.objects 
       FOR UPDATE USING (bucket_id = 'project-images');`,
      
      `CREATE POLICY "project_images_delete" ON storage.objects 
       FOR DELETE USING (bucket_id = 'project-images');`
    ]
    
    console.log('\n🔧 Applying storage policies...')
    for (const sql of sqlCommands) {
      console.log(`Executing: ${sql.split('\n')[0]}...`)
      try {
        const { data, error } = await supabase.rpc('exec_sql', { 
          sql_query: sql 
        })
        
        if (error) {
          console.warn(`Warning: ${error}`)
        }
      } catch (err) {
        // If RPC doesn't exist, we'll note it but continue
        console.log('RPC not available - policies need to be applied manually')
        console.log('\n⚠️  Please apply these policies manually in the Supabase dashboard:')
        console.log('1. Go to https://supabase.com/dashboard/project/qrnzasjjubparpljaibc/storage/buckets')
        console.log('2. Click on the "project-images" bucket')
        console.log('3. Go to Policies tab')
        console.log('4. Remove all existing policies')
        console.log('5. Add new policies:')
        console.log('   - Allow public read: SELECT, bucket_id = \'project-images\', true')
        console.log('   - Allow anon uploads: INSERT, bucket_id = \'project-images\', true')
        console.log('   - Allow anon updates: UPDATE, bucket_id = \'project-images\', true')
        console.log('   - Allow anon deletes: DELETE, bucket_id = \'project-images\', true')
        break
      }
    }
    
    // Test upload with anon key
    console.log('\n🧪 Testing with anon key...')
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const anonSupabase = createClient(supabaseUrl, anonKey)
    
    // Create a simple test image file (1x1 transparent PNG)
    const pngData = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64')
    const testFile = new Blob([pngData], { type: 'image/png' })
    const fileName = `test-${Date.now()}.png`
    
    const { data: uploadData, error: uploadError } = await anonSupabase
      .storage
      .from('project-images')
      .upload(fileName, testFile)
    
    if (uploadError) {
      console.error('❌ Anon key cannot upload:', uploadError)
    } else {
      console.log('✅ Anon key can upload files!')
      
      // Clean up test file
      const { error: deleteError } = await anonSupabase
        .storage
        .from('project-images')
        .remove([fileName])
      
      if (!deleteError) {
        console.log('✅ Test file cleaned up')
      }
    }
    
  } catch (error) {
    console.error('Error:', error)
  }
}

fixStoragePolicies()