import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { fileId } = await request.json();
    
    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }
    
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    // Update download count and last downloaded timestamp
    const { error } = await supabase
      .from('pdf_uploads')
      .update({
        download_count: supabase.raw('download_count + 1'),
        last_downloaded_at: new Date().toISOString()
      })
      .eq('id', fileId);
    
    if (error) {
      console.error('Download tracking error:', error);
      return NextResponse.json(
        { error: 'Failed to track download' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      message: 'Download tracked successfully'
    });
  } catch (error) {
    console.error('Track download error:', error);
    return NextResponse.json(
      { error: 'Failed to track download' },
      { status: 500 }
    );
  }
}