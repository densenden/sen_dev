import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = `pdfs/${filename}`;
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('pdf-uploads')
      .upload(filePath, buffer, {
        contentType: 'application/pdf',
        upsert: false
      });
    
    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload file to storage' },
        { status: 500 }
      );
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('pdf-uploads')
      .getPublicUrl(filePath);
    
    // Track in database
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const { data: dbData, error: dbError } = await supabase
      .from('pdf_uploads')
      .insert({
        filename: filename,
        original_name: file.name,
        file_path: filePath,
        file_size: buffer.length,
        mime_type: file.type,
        upload_ip: clientIp
      })
      .select()
      .single();
    
    if (dbError) {
      console.error('Database insert error:', dbError);
      // Still return success since file was uploaded
    }
    
    return NextResponse.json({
      message: 'File uploaded successfully',
      url: urlData.publicUrl,
      filename: filename,
      id: dbData?.id,
      size: buffer.length
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST method to upload PDF files'
  });
}