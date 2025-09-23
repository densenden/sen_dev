-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-images', 'project-images', true);

-- Create policy to allow public read access to project images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT 
USING (bucket_id = 'project-images');

-- Create policy to allow authenticated users to upload
CREATE POLICY "Allow uploads for authenticated users" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete
CREATE POLICY "Allow delete for authenticated users" ON storage.objects 
FOR DELETE USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile TEXT,
    company TEXT,
    package_name TEXT,
    message TEXT NOT NULL,
    preferred_contact TEXT NOT NULL DEFAULT 'email',
    source_page TEXT NOT NULL, -- 'contact', 'kmu', 'design'
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'archived')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_submissions_updated_at 
    BEFORE UPDATE ON contact_submissions 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Update projects table to better support multiple images and GitHub integration
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'projects'
  ) THEN
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS github_url TEXT;
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS github_readme TEXT;
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS development_time_weeks INTEGER;
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS category TEXT;

    -- Create index on featured projects
    CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
    CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

    -- Ensure projects trigger only created if table exists
    IF NOT EXISTS (
      SELECT 1 FROM pg_trigger WHERE tgname = 'update_projects_updated_at'
    ) THEN
      CREATE TRIGGER update_projects_updated_at
        BEFORE UPDATE ON projects
        FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    END IF;
  END IF;
END;
$$;

-- Create indexes for contact submissions
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_source ON contact_submissions(source_page);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
