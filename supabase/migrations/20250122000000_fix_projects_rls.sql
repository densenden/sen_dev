-- Ensure RLS is enabled on projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view projects" ON projects;
DROP POLICY IF EXISTS "Allow public read access to projects" ON projects;
DROP POLICY IF EXISTS "Enable read access for all users" ON projects;

-- Create a new comprehensive policy for public read access
CREATE POLICY "Enable read access for all users" ON projects
FOR SELECT
USING (true);

-- Also ensure testimonials and translations have public read access
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view testimonials" ON testimonials;
CREATE POLICY "Enable read access for all users" ON testimonials
FOR SELECT
USING (true);

ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view translations" ON translations;
CREATE POLICY "Enable read access for all users" ON translations
FOR SELECT
USING (true);

-- Also enable RLS for other tables with proper policies
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_application_projects ENABLE ROW LEVEL SECURITY;

-- Create admin-only policies for contact_submissions
CREATE POLICY "Admin only access" ON contact_submissions
FOR ALL
USING (auth.role() = 'service_role');

-- Create admin-only policies for appointments
CREATE POLICY "Admin only access" ON appointments
FOR ALL
USING (auth.role() = 'service_role');

-- Create admin-only policies for job_applications
CREATE POLICY "Admin only access" ON job_applications
FOR ALL
USING (auth.role() = 'service_role');

-- Create admin-only policies for job_application_projects
CREATE POLICY "Admin only access" ON job_application_projects
FOR ALL
USING (auth.role() = 'service_role');