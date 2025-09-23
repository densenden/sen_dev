-- Ensure job applications data is persisted in the database for the admin jobs tab
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

CREATE TABLE IF NOT EXISTS job_application_projects (
  job_application_id UUID REFERENCES job_applications(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (job_application_id, project_id)
);

-- Helpful indexes for dashboard queries
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_applied_at ON job_applications(applied_at);
CREATE INDEX IF NOT EXISTS idx_job_applications_company ON job_applications(company);

-- Ensure updated_at trigger exists without duplicating it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_proc
    WHERE proname = 'update_updated_at_column'
      AND pg_function_is_visible(oid)
  ) THEN
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $fn$
    BEGIN
      NEW.updated_at = TIMEZONE('utc'::TEXT, NOW());
      RETURN NEW;
    END;
    $fn$ LANGUAGE plpgsql;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'update_job_applications_updated_at'
  ) THEN
    CREATE TRIGGER update_job_applications_updated_at
      BEFORE UPDATE ON job_applications
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END;
$$;

-- Ensure storage bucket and RLS policies for generated assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('job', 'job', false)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Authenticated job asset read'
  ) THEN
    CREATE POLICY "Authenticated job asset read"
      ON storage.objects
      FOR SELECT
      USING (bucket_id = 'job' AND auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Authenticated job asset upload'
  ) THEN
    CREATE POLICY "Authenticated job asset upload"
      ON storage.objects
      FOR INSERT
      WITH CHECK (bucket_id = 'job' AND auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Authenticated job asset delete'
  ) THEN
    CREATE POLICY "Authenticated job asset delete"
      ON storage.objects
      FOR DELETE
      USING (bucket_id = 'job' AND auth.role() = 'authenticated');
  END IF;
END;
$$;
