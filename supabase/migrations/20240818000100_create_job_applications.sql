-- Create table to track job applications and associated assets
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    job_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'sent', 'denied')),
    applied_at TIMESTAMPTZ,
    contact_name TEXT,
    contact_email TEXT,
    location TEXT,
    notes TEXT,
    job_description TEXT,
    cv_path TEXT,
    cover_letter_path TEXT,
    zip_path TEXT,
    scraped_at TIMESTAMPTZ,
    gpt_model TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction table to track which projects were selected for an application
CREATE TABLE IF NOT EXISTS job_application_projects (
    job_application_id UUID REFERENCES job_applications(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (job_application_id, project_id)
);

-- Ensure updated_at stays in sync
CREATE TRIGGER update_job_applications_updated_at
    BEFORE UPDATE ON job_applications
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Helpful indexes for dashboard filtering
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_applied_at ON job_applications(applied_at);
CREATE INDEX IF NOT EXISTS idx_job_applications_company ON job_applications(company);

-- Storage bucket to store generated CV / cover-letter assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('job', 'job', false)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users (admins) to manage job assets
CREATE POLICY "Authenticated job asset read" ON storage.objects
FOR SELECT USING (bucket_id = 'job' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated job asset upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'job' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated job asset delete" ON storage.objects
FOR DELETE USING (bucket_id = 'job' AND auth.role() = 'authenticated');
