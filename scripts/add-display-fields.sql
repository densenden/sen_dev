-- Add display fields to projects table
-- Run this SQL in your Supabase SQL Editor

-- Add new display fields
ALTER TABLE projects ADD COLUMN IF NOT EXISTS headline text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS subline text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS logo text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS logo_type text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS icon_name text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS features text[];

-- Add fields we already planned but may not be in database yet
ALTER TABLE projects ADD COLUMN IF NOT EXISTS github_url text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS development_time_weeks integer;

-- Update existing projects with basic display data
UPDATE projects SET 
  headline = title || ' - ' || COALESCE(category, 'Platform'),
  subline = summary,
  logo = UPPER(LEFT(title, 2)),
  logo_type = 'text',
  icon_name = CASE 
    WHEN tags @> ARRAY['AI'] THEN 'Brain'
    WHEN tags @> ARRAY['Mobile'] THEN 'Smartphone'
    WHEN tags @> ARRAY['Web App'] THEN 'Globe'
    WHEN tags @> ARRAY['E-commerce'] THEN 'Building2'
    WHEN tags @> ARRAY['Real Estate'] THEN 'Building2'
    ELSE 'Globe'
  END,
  features = ARRAY[outcome],
  is_featured = CASE 
    WHEN slug IN ('senflix', 'paradieshof', 'pepe', 'forkit', 'synapsee', 'sencommerce') THEN true
    ELSE false
  END,
  development_time_weeks = CASE 
    WHEN slug = 'paradieshof' THEN 18
    WHEN slug = 'kria-training' THEN 16
    WHEN slug = 'beauty-machine' THEN 14
    WHEN slug = 'synapsee' THEN 12
    WHEN slug = 'senrecorder' THEN 12
    WHEN slug = 'pepe' THEN 10
    WHEN slug = 'forkit' THEN 10
    WHEN slug = 'senflix' THEN 8
    WHEN slug = 'senscript' THEN 8
    WHEN slug = 'sencommerce' THEN 6
    ELSE 8
  END,
  category = CASE 
    WHEN slug = 'senflix' THEN 'Entertainment'
    WHEN slug = 'synapsee' THEN 'Productivity'
    WHEN slug = 'kria-training' THEN 'Education'
    WHEN slug = 'forkit' THEN 'Mobile'
    WHEN slug = 'beauty-machine' THEN 'AI'
    WHEN slug = 'pepe' THEN 'Web3'
    WHEN slug = 'paradieshof' THEN 'Real Estate'
    WHEN slug = 'senrecorder' THEN 'Productivity'
    WHEN slug = 'senscript' THEN 'AI'
    WHEN slug = 'sencommerce' THEN 'E-commerce'
    ELSE 'Platform'
  END,
  github_url = CASE 
    WHEN slug = 'sencommerce' THEN 'https://github.com/densenden/sencommerce'
    ELSE NULL
  END
WHERE headline IS NULL;