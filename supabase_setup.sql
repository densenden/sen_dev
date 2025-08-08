-- SenDev Database Setup Script
-- Run this in your Supabase SQL Editor

-- =====================================
-- CREATE APPOINTMENTS TABLE
-- =====================================

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

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for appointments table
DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;
CREATE TRIGGER update_appointments_updated_at 
    BEFORE UPDATE ON appointments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access
DROP POLICY IF EXISTS "Allow all operations for service role" ON appointments;
CREATE POLICY "Allow all operations for service role" ON appointments
    FOR ALL 
    TO service_role 
    USING (true) 
    WITH CHECK (true);

-- Create policy for authenticated users (for future admin panel)
DROP POLICY IF EXISTS "Allow authenticated users" ON appointments;
CREATE POLICY "Allow authenticated users" ON appointments
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- =====================================
-- UPDATE PROJECTS TABLE
-- =====================================

-- Ensure projects table exists with all needed columns
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  screenshots TEXT[] NOT NULL DEFAULT '{}',
  video_demo TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  client_name TEXT NOT NULL,
  outcome TEXT NOT NULL,
  link_live TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create trigger for projects table
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security for projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to projects
DROP POLICY IF EXISTS "Allow public read access" ON projects;
CREATE POLICY "Allow public read access" ON projects
    FOR SELECT 
    USING (true);

-- Create policy for service role full access
DROP POLICY IF EXISTS "Allow all operations for service role on projects" ON projects;
CREATE POLICY "Allow all operations for service role on projects" ON projects
    FOR ALL 
    TO service_role 
    USING (true) 
    WITH CHECK (true);

-- =====================================
-- CREATE STORAGE BUCKETS
-- =====================================

-- Create project-images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images', 
  'project-images', 
  true, 
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create storage policy for public read access
DROP POLICY IF EXISTS "Public read access for project images" ON storage.objects;
CREATE POLICY "Public read access for project images" ON storage.objects
    FOR SELECT 
    USING (bucket_id = 'project-images');

-- Create storage policy for service role upload/delete
DROP POLICY IF EXISTS "Service role full access to project images" ON storage.objects;
CREATE POLICY "Service role full access to project images" ON storage.objects
    FOR ALL 
    TO service_role 
    USING (bucket_id = 'project-images');

-- Create storage policy for authenticated users upload
DROP POLICY IF EXISTS "Authenticated users upload access" ON storage.objects;
CREATE POLICY "Authenticated users upload access" ON storage.objects
    FOR INSERT 
    TO authenticated 
    WITH CHECK (bucket_id = 'project-images');

-- =====================================
-- INSERT SAMPLE PROJECTS DATA
-- =====================================

-- Insert sample projects (you can modify these)
INSERT INTO projects (title, slug, summary, description, tech_stack, screenshots, tags, client_name, outcome, link_live) VALUES
('Senflix', 'senflix', 'AI-powered streaming platform for personalized content discovery', 'A Netflix-like streaming platform with AI-powered content recommendations, built with modern web technologies for optimal user experience.', 
 ARRAY['React', 'Next.js', 'Node.js', 'PostgreSQL', 'OpenAI API'], 
 ARRAY['/project-images/senflix-1.jpg', '/project-images/senflix-2.jpg'], 
 ARRAY['streaming', 'ai', 'entertainment'], 
 'Senflix Entertainment', 
 'Launched successfully with 10k+ active users', 
 'https://senflix.example.com'),

('Synapsee', 'synapsee', 'Knowledge management system for teams', 'Collaborative knowledge base with AI-powered search and organization features for distributed teams.', 
 ARRAY['Vue.js', 'FastAPI', 'Elasticsearch', 'Docker'], 
 ARRAY['/project-images/synapsee-1.jpg', '/project-images/synapsee-2.jpg'], 
 ARRAY['productivity', 'ai', 'collaboration'], 
 'Synapsee Inc', 
 'Improved team productivity by 40%', 
 'https://synapsee.example.com'),

('Meme Machine', 'meme-machine', 'AI meme generator for social media', 'Creative AI tool that generates viral memes using advanced computer vision and natural language processing.', 
 ARRAY['Python', 'Flask', 'OpenAI API', 'React', 'Redis'], 
 ARRAY['/project-images/meme-machine-1.jpg', '/project-images/meme-machine-2.jpg'], 
 ARRAY['ai', 'social-media', 'creativity'], 
 'Social Buzz Agency', 
 'Generated 1M+ memes, featured in TechCrunch', 
 'https://meme-machine.example.com'),

('Fork:it', 'fork-it', 'Code collaboration platform', 'Advanced code review and collaboration platform with integrated CI/CD pipelines and team management.', 
 ARRAY['TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Docker'], 
 ARRAY['/project-images/fork-it-1.jpg', '/project-images/fork-it-2.jpg'], 
 ARRAY['development', 'collaboration', 'devops'], 
 'DevCorp Solutions', 
 'Reduced code review time by 60%', 
 'https://fork-it.example.com'),

('Kria Training', 'kria-training', 'Corporate training management system', 'Comprehensive LMS with interactive courses, progress tracking, and certification management for enterprise clients.', 
 ARRAY['React', 'Node.js', 'MongoDB', 'AWS', 'Stripe'], 
 ARRAY['/project-images/kria-1.jpg', '/project-images/kria-2.jpg'], 
 ARRAY['education', 'enterprise', 'lms'], 
 'Kria Corp', 
 'Trained 5000+ employees across 50+ companies', 
 'https://kria-training.example.com')

ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  description = EXCLUDED.description,
  tech_stack = EXCLUDED.tech_stack,
  screenshots = EXCLUDED.screenshots,
  tags = EXCLUDED.tags,
  client_name = EXCLUDED.client_name,
  outcome = EXCLUDED.outcome,
  link_live = EXCLUDED.link_live,
  updated_at = timezone('utc'::text, now());

-- =====================================
-- CREATE TESTIMONIALS TABLE
-- =====================================

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  avatar_url TEXT,
  project_id UUID REFERENCES projects(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to testimonials
DROP POLICY IF EXISTS "Allow public read access to testimonials" ON testimonials;
CREATE POLICY "Allow public read access to testimonials" ON testimonials
    FOR SELECT 
    USING (true);

-- Create policy for service role full access to testimonials
DROP POLICY IF EXISTS "Allow all operations for service role on testimonials" ON testimonials;
CREATE POLICY "Allow all operations for service role on testimonials" ON testimonials
    FOR ALL 
    TO service_role 
    USING (true) 
    WITH CHECK (true);

-- Insert sample testimonials
INSERT INTO testimonials (name, role, company, content, project_id) VALUES
('Alex Johnson', 'CTO', 'Senflix Entertainment', 'SenDev delivered an exceptional streaming platform that exceeded our expectations. The AI recommendations are spot-on!', (SELECT id FROM projects WHERE slug = 'senflix')),
('Sarah Chen', 'Product Manager', 'Synapsee Inc', 'The knowledge management system transformed how our team collaborates. Highly recommend SenDev!', (SELECT id FROM projects WHERE slug = 'synapsee')),
('Mike Rodriguez', 'Creative Director', 'Social Buzz Agency', 'The Meme Machine went viral and drove incredible engagement for our clients. Amazing work!', (SELECT id FROM projects WHERE slug = 'meme-machine')),
('Lisa Wang', 'Engineering Lead', 'DevCorp Solutions', 'Fork:it revolutionized our code review process. The team at SenDev is incredibly talented.', (SELECT id FROM projects WHERE slug = 'fork-it')),
('David Brown', 'L&D Director', 'Kria Corp', 'The training platform is intuitive and powerful. Our employee engagement has never been higher.', (SELECT id FROM projects WHERE slug = 'kria-training'))
ON CONFLICT DO NOTHING;

-- =====================================
-- FINAL VERIFICATION
-- =====================================

-- Display table counts to verify setup
SELECT 'appointments' as table_name, count(*) as record_count FROM appointments
UNION ALL
SELECT 'projects' as table_name, count(*) as record_count FROM projects
UNION ALL
SELECT 'testimonials' as table_name, count(*) as record_count FROM testimonials;

-- Display storage buckets
SELECT * FROM storage.buckets WHERE id = 'project-images';