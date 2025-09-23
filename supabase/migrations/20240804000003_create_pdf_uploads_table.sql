-- Create PDF uploads tracking table
CREATE TABLE IF NOT EXISTS pdf_uploads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type TEXT NOT NULL DEFAULT 'application/pdf',
    download_count INTEGER DEFAULT 0,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_downloaded_at TIMESTAMP WITH TIME ZONE,
    upload_ip TEXT,
    is_public BOOLEAN DEFAULT true
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_pdf_uploads_filename ON pdf_uploads(filename);
CREATE INDEX IF NOT EXISTS idx_pdf_uploads_uploaded_at ON pdf_uploads(uploaded_at);

-- Enable RLS (Row Level Security)
ALTER TABLE pdf_uploads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON pdf_uploads
    FOR SELECT USING (is_public = true);

-- Create policy to allow public insert
CREATE POLICY "Allow public insert" ON pdf_uploads
    FOR INSERT WITH CHECK (true);

-- Create policy to allow public update (for download tracking)
CREATE POLICY "Allow public update download count" ON pdf_uploads
    FOR UPDATE USING (true) WITH CHECK (true);