-- Add case study fields to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenge text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS solution text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS process text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS key_features text[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS results_metrics jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS lessons_learned text;

-- Update existing projects with sample case study data
UPDATE projects SET 
  challenge = 'Challenge description will be added during content generation',
  solution = 'Solution approach will be detailed during content generation', 
  process = 'Development process will be documented during content generation',
  key_features = ARRAY['Feature 1', 'Feature 2', 'Feature 3'],
  results_metrics = '{"users": "1000+", "performance": "50% faster", "conversion": "25% increase"}',
  lessons_learned = 'Key insights and learnings will be documented during content generation'
WHERE challenge IS NULL;