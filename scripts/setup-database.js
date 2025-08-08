const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const supabaseUrl = 'https://qrnzasjjubparpljaibc.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFybnphc2pqdWJwYXJwbGphaWJjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDQwOTc1OSwiZXhwIjoyMDY5OTg1NzU5fQ.QD211zGzI7b3jvEcv46ZZG5SclPcQBFcJ2MugctCTgs'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runMigration() {
  try {
    console.log('Setting up database...')

    // Read the migration file
    const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', 'create_appointments_table.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8')

    // Execute the migration
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: migrationSQL
    })

    if (error) {
      console.error('Migration failed:', error)
      
      // Try alternative approach - create tables directly
      console.log('Trying direct table creation...')
      
      // Create appointments table
      const { error: tableError } = await supabase
        .from('appointments')
        .select('*')
        .limit(1)

      if (tableError && tableError.message.includes('does not exist')) {
        console.log('Creating appointments table manually...')
        
        // This approach requires executing raw SQL
        // Since we can't use rpc, let's create the table structure programmatically
        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS appointments (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            mobile TEXT,
            company TEXT,
            package_name TEXT NOT NULL,
            message TEXT NOT NULL,
            preferred_contact TEXT NOT NULL DEFAULT 'email',
            appointment_date DATE NOT NULL,
            appointment_time TIME NOT NULL,
            status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
            reminder_sent BOOLEAN NOT NULL DEFAULT false,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
          );
        `
        
        console.log('Please run the following SQL in your Supabase SQL editor:')
        console.log(createTableSQL)
      }
    } else {
      console.log('Migration completed successfully!')
    }

    // Test database connection
    const { data: testData, error: testError } = await supabase
      .from('projects')
      .select('*')
      .limit(1)

    if (testError) {
      console.log('Projects table not accessible:', testError.message)
    } else {
      console.log('Database connection successful!')
      console.log('Projects found:', testData?.length || 0)
    }

  } catch (error) {
    console.error('Setup failed:', error)
  }
}

runMigration()