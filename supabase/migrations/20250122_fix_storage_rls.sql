-- Drop all existing storage policies for project-images bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow uploads for authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete for authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon to upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon deletes" ON storage.objects;

-- Create comprehensive policies for project-images bucket that allow public operations
-- Policy 1: Allow anyone to view images
CREATE POLICY "Anyone can view project images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'project-images');

-- Policy 2: Allow anyone to upload images (for admin panel with anon key)
CREATE POLICY "Anyone can upload project images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'project-images');

-- Policy 3: Allow anyone to update images
CREATE POLICY "Anyone can update project images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'project-images');

-- Policy 4: Allow anyone to delete images
CREATE POLICY "Anyone can delete project images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'project-images');