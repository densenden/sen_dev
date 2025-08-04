-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    description TEXT NOT NULL,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    screenshots TEXT[] NOT NULL DEFAULT '{}',
    video_demo TEXT,
    tags TEXT[] NOT NULL DEFAULT '{}',
    client_name TEXT NOT NULL,
    outcome TEXT NOT NULL,
    link_live TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    content TEXT NOT NULL,
    avatar_url TEXT,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create translations table
CREATE TABLE IF NOT EXISTS translations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en',
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    UNIQUE(key, language)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS projects_slug_idx ON projects(slug);
CREATE INDEX IF NOT EXISTS projects_tags_idx ON projects USING GIN(tags);
CREATE INDEX IF NOT EXISTS projects_tech_stack_idx ON projects USING GIN(tech_stack);
CREATE INDEX IF NOT EXISTS testimonials_project_id_idx ON testimonials(project_id);
CREATE INDEX IF NOT EXISTS translations_key_language_idx ON translations(key, language);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can view testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can view translations" ON translations FOR SELECT USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::TEXT, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_translations_updated_at BEFORE UPDATE ON translations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO projects (title, slug, summary, description, tech_stack, tags, client_name, outcome, screenshots) VALUES
    ('Senflix', 'senflix', 'Netflix-style streaming platform with AI recommendations', 'A comprehensive streaming platform built with modern web technologies, featuring AI-powered content recommendations, user authentication, and responsive design.', ARRAY['React', 'Next.js', 'Supabase', 'OpenAI', 'Tailwind CSS'], ARRAY['MVP', 'Streaming', 'AI'], 'Internal Project', 'Successful MVP launch with 1000+ active users', ARRAY['https://example.com/senflix1.jpg', 'https://example.com/senflix2.jpg']),
    ('Synapsee', 'synapsee', 'AI-powered knowledge management platform', 'Revolutionary knowledge management system that uses AI to connect ideas and facilitate seamless information discovery and collaboration.', ARRAY['Vue.js', 'Node.js', 'PostgreSQL', 'GPT-4', 'Docker'], ARRAY['AI', 'Productivity', 'SaaS'], 'Synapsee Inc.', '50% improvement in team productivity metrics', ARRAY['https://example.com/synapsee1.jpg']),
    ('Meme-Machine', 'meme-machine', 'Automated meme generation platform', 'Fun social platform that uses AI to generate contextually relevant memes, featuring viral content algorithms and social sharing capabilities.', ARRAY['React Native', 'FastAPI', 'TensorFlow', 'Redis'], ARRAY['Social', 'AI', 'Entertainment'], 'MemeGen LLC', '100K+ memes generated, viral social media presence', ARRAY['https://example.com/meme1.jpg', 'https://example.com/meme2.jpg']),
    ('Kria Training', 'kria-training', 'Professional development training platform', 'Comprehensive training platform for skill development with interactive courses, progress tracking, and certification management.', ARRAY['Angular', 'NestJS', 'MongoDB', 'Stripe'], ARRAY['EdTech', 'B2B', 'Platform'], 'Kria Education', '95% course completion rate, 500+ certified professionals', ARRAY['https://example.com/kria1.jpg']),
    ('Fork:it', 'fork-it', 'Developer collaboration platform', 'GitHub-inspired platform for creative professionals to collaborate on design and development projects with version control.', ARRAY['Svelte', 'Go', 'PostgreSQL', 'AWS'], ARRAY['Developer Tools', 'Collaboration'], 'Fork Technologies', 'Acquired by major tech company after 18 months', ARRAY['https://example.com/fork1.jpg', 'https://example.com/fork2.jpg']);

INSERT INTO testimonials (name, role, company, content, project_id) VALUES
    ('Sarah Chen', 'CEO', 'Synapsee Inc.', 'The Vibe Coding approach transformed our idea into a market-ready product in just 8 weeks. The emotional design really resonates with our users.', (SELECT id FROM projects WHERE slug = 'synapsee')),
    ('Marcus Rodriguez', 'CTO', 'MemeGen LLC', 'Incredible technical execution combined with an intuitive understanding of our brand. The platform scaled effortlessly to 100K users.', (SELECT id FROM projects WHERE slug = 'meme-machine')),
    ('Lisa Wang', 'Founder', 'Kria Education', 'Not just development - they provided strategic insights that shaped our entire business model. True partnership approach.', (SELECT id FROM projects WHERE slug = 'kria-training'));

INSERT INTO translations (key, language, value) VALUES
    ('hero.title', 'en', 'Fast-track MVPs with Vibe Coding'),
    ('hero.title', 'de', 'MVPs beschleunigen mit Vibe Coding'),
    ('hero.subtitle', 'en', 'Built by a designer-engineer for rapid startup growth'),
    ('hero.subtitle', 'de', 'Von einem Designer-Ingenieur für schnelles Startup-Wachstum entwickelt'),
    ('services.mvp', 'en', 'MVP Development'),
    ('services.mvp', 'de', 'MVP-Entwicklung'),
    ('services.branding', 'en', 'Branding & Design'),
    ('services.branding', 'de', 'Branding & Design'),
    ('services.infrastructure', 'en', 'Tech Infrastructure'),
    ('services.infrastructure', 'de', 'Tech-Infrastruktur');