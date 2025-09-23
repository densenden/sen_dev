-- Add extended case study fields for admin experience
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS challenge TEXT,
  ADD COLUMN IF NOT EXISTS solution TEXT,
  ADD COLUMN IF NOT EXISTS process TEXT,
  ADD COLUMN IF NOT EXISTS key_features TEXT[] DEFAULT '{}'::TEXT[],
  ADD COLUMN IF NOT EXISTS results_metrics JSONB DEFAULT '{}'::JSONB,
  ADD COLUMN IF NOT EXISTS lessons_learned TEXT,
  ADD COLUMN IF NOT EXISTS headline TEXT,
  ADD COLUMN IF NOT EXISTS subline TEXT,
  ADD COLUMN IF NOT EXISTS logo TEXT,
  ADD COLUMN IF NOT EXISTS logo_type TEXT DEFAULT 'text',
  ADD COLUMN IF NOT EXISTS icon_name TEXT,
  ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}'::TEXT[];

-- Backfill sensible defaults so the admin UI has data to work with
UPDATE projects
SET
  challenge = COALESCE(
    NULLIF(challenge, ''),
    'Challenge description will be added during detailed case study creation.'
  ),
  solution = COALESCE(
    NULLIF(solution, ''),
    'Solution summary will be authored during detailed case study creation.'
  ),
  process = COALESCE(
    NULLIF(process, ''),
    'Process outline will be documented during detailed case study creation.'
  ),
  key_features = CASE
    WHEN key_features IS NULL OR array_length(key_features, 1) = 0 THEN ARRAY['Feature 1', 'Feature 2', 'Feature 3']
    ELSE key_features
  END,
  results_metrics = CASE
    WHEN results_metrics IS NULL OR results_metrics = '{}'::JSONB THEN '{"users": "1000+", "performance": "50% faster", "conversion": "25% increase"}'::JSONB
    ELSE results_metrics
  END,
  lessons_learned = COALESCE(
    NULLIF(lessons_learned, ''),
    'Key insights and learnings will be documented during case study creation.'
  ),
  headline = COALESCE(headline, title || ' - ' || COALESCE(category, 'Platform')),
  subline = COALESCE(subline, summary),
  logo = COALESCE(NULLIF(logo, ''), UPPER(SUBSTR(title, 1, 2))),
  logo_type = COALESCE(NULLIF(logo_type, ''), 'text'),
  icon_name = COALESCE(
    NULLIF(icon_name, ''),
    CASE
      WHEN tags @> ARRAY['AI'] THEN 'Brain'
      WHEN tags @> ARRAY['Mobile'] THEN 'Smartphone'
      WHEN tags @> ARRAY['E-commerce'] THEN 'Building2'
      WHEN tags @> ARRAY['Real Estate'] THEN 'Building2'
      WHEN tags @> ARRAY['Web3'] OR tags @> ARRAY['Crypto'] THEN 'TrendingUp'
      WHEN tags @> ARRAY['Streaming'] THEN 'Play'
      ELSE 'Globe'
    END
  ),
  features = CASE
    WHEN features IS NULL OR array_length(features, 1) = 0 THEN ARRAY[COALESCE(outcome, 'Signature project outcome')]
    ELSE features
  END
WHERE TRUE;

-- Ensure defaults persist for future inserts
ALTER TABLE projects
  ALTER COLUMN key_features SET DEFAULT '{}'::TEXT[],
  ALTER COLUMN results_metrics SET DEFAULT '{}'::JSONB,
  ALTER COLUMN logo_type SET DEFAULT 'text',
  ALTER COLUMN features SET DEFAULT '{}'::TEXT[];

-- Ensure legacy project enrichment columns exist before backfilling
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS github_url TEXT,
  ADD COLUMN IF NOT EXISTS github_readme TEXT,
  ADD COLUMN IF NOT EXISTS development_time_weeks INTEGER,
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS category TEXT;

-- Storage bucket for project logos used in admin
INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for the logos bucket (idempotent guards)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Public access to logos bucket'
  ) THEN
    CREATE POLICY "Public access to logos bucket"
      ON storage.objects
      FOR SELECT
      USING (bucket_id = 'logos');
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Allow authenticated logo uploads'
  ) THEN
    CREATE POLICY "Allow authenticated logo uploads"
      ON storage.objects
      FOR INSERT
      WITH CHECK (bucket_id = 'logos' AND auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Allow authenticated logo deletions'
  ) THEN
    CREATE POLICY "Allow authenticated logo deletions"
      ON storage.objects
      FOR DELETE
      USING (bucket_id = 'logos' AND auth.role() = 'authenticated');
  END IF;
END;
$$;
