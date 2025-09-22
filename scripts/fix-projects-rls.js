const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function fixProjectsRLS() {
  try {
    console.log('🔧 Fixing RLS policies for projects table...')
    
    // Test if we can query projects with service role key
    const { data: testData, error: testError } = await supabase
      .from('projects')
      .select('id')
      .limit(1)
    
    if (testError) {
      console.error('Error testing projects table access:', testError)
    } else {
      console.log('✅ Service role key can access projects table')
    }
    
    // Apply RLS fix via SQL
    const sqlCommands = [
      // Ensure RLS is enabled
      `ALTER TABLE projects ENABLE ROW LEVEL SECURITY;`,
      
      // Drop existing policies
      `DROP POLICY IF EXISTS "Public can view projects" ON projects;`,
      `DROP POLICY IF EXISTS "Allow public read access to projects" ON projects;`,
      `DROP POLICY IF EXISTS "Enable read access for all users" ON projects;`,
      
      // Create new comprehensive policy for public read access
      `CREATE POLICY "Enable read access for all users" ON projects
       FOR SELECT
       USING (true);`,
      
      // Also fix testimonials
      `ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;`,
      `DROP POLICY IF EXISTS "Public can view testimonials" ON testimonials;`,
      `DROP POLICY IF EXISTS "Enable read access for all users" ON testimonials;`,
      `CREATE POLICY "Enable read access for all users" ON testimonials
       FOR SELECT
       USING (true);`,
      
      // Also fix translations
      `ALTER TABLE translations ENABLE ROW LEVEL SECURITY;`,
      `DROP POLICY IF EXISTS "Public can view translations" ON translations;`,
      `DROP POLICY IF EXISTS "Enable read access for all users" ON translations;`,
      `CREATE POLICY "Enable read access for all users" ON translations
       FOR SELECT
       USING (true);`
    ]
    
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
        break
      }
    }
    
    // Test with anon key
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const anonSupabase = createClient(supabaseUrl, anonKey)
    
    console.log('\n🧪 Testing with anon key...')
    const { data: projects, error: projectsError } = await anonSupabase
      .from('projects')
      .select('id, title, slug')
      .limit(3)
    
    if (projectsError) {
      console.error('❌ Anon key cannot access projects:', projectsError)
      console.log('\n⚠️  The RLS policies might need to be applied manually in the Supabase dashboard:')
      console.log('1. Go to https://supabase.com/dashboard/project/qrnzasjjubparpljaibc/editor')
      console.log('2. Navigate to Authentication → Policies')
      console.log('3. Find the "projects" table')
      console.log('4. Add a new policy:')
      console.log('   - Name: "Enable read access for all users"')
      console.log('   - Policy command: SELECT')
      console.log('   - Target roles: anon, authenticated')
      console.log('   - Policy definition: true')
    } else {
      console.log(`✅ Anon key can access projects! Found ${projects.length} projects:`)
      projects.forEach(p => console.log(`   - ${p.title} (${p.slug})`))
    }
    
  } catch (error) {
    console.error('Error:', error)
  }
}

fixProjectsRLS()