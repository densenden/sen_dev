import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: NextRequest) {
  try {
    // Create admin client with service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    console.log('Setting up database tables...')

    // Create appointments table with all necessary fields
    const createAppointmentsTable = `
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

      -- Create indexes for efficient queries
      CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
      CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
      CREATE INDEX IF NOT EXISTS idx_appointments_reminder ON appointments(reminder_sent, appointment_date, appointment_time);

      -- Enable Row Level Security
      ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

      -- Create policy for service role access
      CREATE POLICY IF NOT EXISTS "Allow all operations for service role" ON appointments
          FOR ALL 
          TO service_role 
          USING (true) 
          WITH CHECK (true);
    `

    // Update projects table to ensure it exists and has all needed columns
    const updateProjectsTable = `
      -- Add any missing columns to projects table
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS video_demo TEXT;
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS link_live TEXT;
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

      -- Ensure projects has RLS enabled
      ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

      -- Create policy for public read access to projects
      CREATE POLICY IF NOT EXISTS "Allow public read access" ON projects
          FOR SELECT 
          USING (true);

      -- Create policy for service role full access
      CREATE POLICY IF NOT EXISTS "Allow all operations for service role" ON projects
          FOR ALL 
          TO service_role 
          USING (true) 
          WITH CHECK (true);
    `

    // Create storage buckets for project images
    const createStorageBuckets = `
      -- Create project-images bucket if it doesn't exist
      INSERT INTO storage.buckets (id, name, public)
      VALUES ('project-images', 'project-images', true)
      ON CONFLICT (id) DO NOTHING;

      -- Create storage policy for public read access
      CREATE POLICY IF NOT EXISTS "Public read access for project images" ON storage.objects
          FOR SELECT 
          USING (bucket_id = 'project-images');

      -- Create storage policy for service role upload
      CREATE POLICY IF NOT EXISTS "Service role upload access" ON storage.objects
          FOR ALL 
          TO service_role 
          USING (bucket_id = 'project-images');
    `

    // Execute all SQL commands
    const sqlCommands = [createAppointmentsTable, updateProjectsTable, createStorageBuckets]
    const results = []

    for (const sql of sqlCommands) {
      try {
        const { data, error } = await supabase.rpc('exec_sql', { sql })
        if (error) {
          console.error('SQL execution error:', error)
          results.push({ error: error.message })
        } else {
          results.push({ success: true })
        }
      } catch (err) {
        console.error('Error executing SQL:', err)
        results.push({ error: 'Failed to execute SQL' })
      }
    }

    // Test the setup by checking if we can query the tables
    const { data: appointmentsTest, error: appointmentsError } = await supabase
      .from('appointments')
      .select('count')
      .limit(1)

    const { data: projectsTest, error: projectsError } = await supabase
      .from('projects')
      .select('count')
      .limit(1)

    return NextResponse.json({
      success: true,
      results,
      tests: {
        appointments: appointmentsError ? appointmentsError.message : 'OK',
        projects: projectsError ? projectsError.message : 'OK'
      },
      message: 'Database setup completed. Check the Supabase SQL editor if any errors occurred.'
    })

  } catch (error) {
    console.error('Database setup error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      instructions: 'Please run the SQL manually in Supabase SQL editor'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Database setup endpoint. Use POST to run migrations.',
    sql: `
      -- Run this SQL in your Supabase SQL editor if the POST request fails:
      
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

      CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
      CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
      CREATE INDEX IF NOT EXISTS idx_appointments_reminder ON appointments(reminder_sent, appointment_date, appointment_time);

      ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

      CREATE POLICY IF NOT EXISTS "Allow all operations for service role" ON appointments
          FOR ALL TO service_role USING (true) WITH CHECK (true);

      -- Create project-images storage bucket
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('project-images', 'project-images', true) 
      ON CONFLICT (id) DO NOTHING;
    `
  })
}