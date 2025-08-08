import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('pdf_uploads')
      .select('*')
      .eq('is_public', true)
      .order('uploaded_at', { ascending: false });
    
    if (error) {
      console.error('Database query error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch PDFs' },
        { status: 500 }
      );
    }
    
    // Get public URLs for all files
    const pdfsWithUrls = data.map(pdf => {
      const { data: urlData } = supabase.storage
        .from('pdf-uploads')
        .getPublicUrl(pdf.file_path);
      
      return {
        ...pdf,
        public_url: urlData.publicUrl
      };
    });
    
    return NextResponse.json({
      pdfs: pdfsWithUrls
    });
  } catch (error) {
    console.error('List PDFs error:', error);
    return NextResponse.json(
      { error: 'Failed to list PDFs' },
      { status: 500 }
    );
  }
}