const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function fixProjectsTableRLS() {
  try {
    console.log('🔧 Fixing RLS policies for projects table...')
    
    // Test if we can query with service role
    const { data: testData, error: testError } = await supabase
      .from('projects')
      .select('id')
      .limit(1)
    
    if (testError) {
      console.error('Error testing projects table:', testError)
    } else {
      console.log('✅ Service role can access projects table')
    }
    
    // SQL commands to fix projects table RLS
    const sqlCommands = [
      // Ensure RLS is enabled
      `ALTER TABLE projects ENABLE ROW LEVEL SECURITY;`,
      
      // Drop existing policies
      `DROP POLICY IF EXISTS "Enable read access for all users" ON projects;`,
      `DROP POLICY IF EXISTS "Public can view projects" ON projects;`,
      `DROP POLICY IF EXISTS "Allow public read access to projects" ON projects;`,
      `DROP POLICY IF EXISTS "Enable insert for all users" ON projects;`,
      `DROP POLICY IF EXISTS "Enable update for all users" ON projects;`,
      `DROP POLICY IF EXISTS "Enable delete for all users" ON projects;`,
      
      // Create comprehensive policies for projects table
      `CREATE POLICY "Enable read access for all users" ON projects
       FOR SELECT
       USING (true);`,
      
      `CREATE POLICY "Enable insert for all users" ON projects
       FOR INSERT
       WITH CHECK (true);`,
      
      `CREATE POLICY "Enable update for all users" ON projects
       FOR UPDATE
       USING (true);`,
      
      `CREATE POLICY "Enable delete for all users" ON projects
       FOR DELETE
       USING (true);`
    ]
    
    console.log('\n🔧 Applying RLS policies...')
    for (const sql of sqlCommands) {
      console.log(`Executing: ${sql.split('\n')[0]}...`)
      try {
        // Try to execute via a potential RPC function
        const { error } = await supabase.rpc('exec_sql', { 
          sql_query: sql 
        }).catch(() => ({ error: 'RPC not available' }))
        
        if (error && error !== 'RPC not available') {
          console.warn(`Warning: ${error}`)
        }
      } catch (err) {
        console.log('RPC not available')
        break
      }
    }
    
    // Test with anon key
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const anonSupabase = createClient(supabaseUrl, anonKey)
    
    console.log('\n🧪 Testing with anon key...')
    
    // Test SELECT
    const { data: selectData, error: selectError } = await anonSupabase
      .from('projects')
      .select('id, title')
      .limit(1)
    
    if (selectError) {
      console.error('❌ Anon key cannot SELECT:', selectError.message)
    } else {
      console.log('✅ Anon key can SELECT projects')
    }
    
    // Test INSERT with a dummy project
    const testProject = {
      title: 'Test Project ' + Date.now(),
      slug: 'test-project-' + Date.now(),
      summary: 'Test summary',
      description: 'Test description',
      tech_stack: ['Test'],
      screenshots: [],
      tags: ['Test'],
      client_name: 'Test Client',
      outcome: 'Test outcome'
    }
    
    const { data: insertData, error: insertError } = await anonSupabase
      .from('projects')
      .insert(testProject)
      .select()
    
    if (insertError) {
      console.error('❌ Anon key cannot INSERT:', insertError.message)
      console.log('\n⚠️  Manual action required!')
      console.log('Please apply these policies manually in Supabase:')
      console.log('')
      console.log('1. Go to: https://supabase.com/dashboard/project/qrnzasjjubparpljaibc/auth/policies')
      console.log('2. Find the "projects" table')
      console.log('3. Delete all existing policies')
      console.log('4. Add these new policies:')
      console.log('')
      console.log('Policy 1 - SELECT:')
      console.log('  Name: "Enable read access for all users"')
      console.log('  Command: SELECT')
      console.log('  Target roles: Leave empty')
      console.log('  USING expression: true')
      console.log('')
      console.log('Policy 2 - INSERT:')
      console.log('  Name: "Enable insert for all users"')
      console.log('  Command: INSERT')
      console.log('  Target roles: Leave empty')
      console.log('  WITH CHECK expression: true')
      console.log('')
      console.log('Policy 3 - UPDATE:')
      console.log('  Name: "Enable update for all users"')
      console.log('  Command: UPDATE')
      console.log('  Target roles: Leave empty')
      console.log('  USING expression: true')
      console.log('')
      console.log('Policy 4 - DELETE:')
      console.log('  Name: "Enable delete for all users"')
      console.log('  Command: DELETE')
      console.log('  Target roles: Leave empty')
      console.log('  USING expression: true')
    } else {
      console.log('✅ Anon key can INSERT projects')
      
      // Clean up test project
      if (insertData && insertData[0]) {
        const { error: deleteError } = await anonSupabase
          .from('projects')
          .delete()
          .eq('id', insertData[0].id)
        
        if (!deleteError) {
          console.log('✅ Test project cleaned up')
        }
      }
    }
    
  } catch (error) {
    console.error('Error:', error)
  }
}

fixProjectsTableRLS()