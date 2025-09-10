const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function runMigration() {
  try {
    console.log('🔄 Running case study fields migration...')

    // Add challenge field
    const { error: challengeError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenge text;'
    })
    
    // Add solution field
    const { error: solutionError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE projects ADD COLUMN IF NOT EXISTS solution text;'
    })
    
    // Add process field
    const { error: processError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE projects ADD COLUMN IF NOT EXISTS process text;'
    })
    
    // Add key_features field
    const { error: featuresError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE projects ADD COLUMN IF NOT EXISTS key_features text[];'
    })
    
    // Add results_metrics field
    const { error: metricsError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE projects ADD COLUMN IF NOT EXISTS results_metrics jsonb;'
    })
    
    // Add lessons_learned field
    const { error: lessonsError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE projects ADD COLUMN IF NOT EXISTS lessons_learned text;'
    })

    if (challengeError || solutionError || processError || featuresError || metricsError || lessonsError) {
      console.error('❌ Migration failed:', { challengeError, solutionError, processError, featuresError, metricsError, lessonsError })
      return
    }
    
    console.log('✅ Database schema updated successfully!')
    console.log('📝 New case study fields added: challenge, solution, process, key_features, results_metrics, lessons_learned')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
  }
}

runMigration()