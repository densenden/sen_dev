import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('id');
    
    if (!fileId) {
      return NextResponse.json(
        { error: 'No file ID provided' },
        { status: 400 }
      );
    }
    
    // First, get the file path
    const { data: fileData, error: fetchError } = await supabase
      .from('pdf_uploads')
      .select('file_path')
      .eq('id', fileId)
      .single();
    
    if (fetchError || !fileData) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('pdf-uploads')
      .remove([fileData.file_path]);
    
    if (storageError) {
      console.error('Storage delete error:', storageError);
    }
    
    // Delete from database
    const { error: dbError } = await supabase
      .from('pdf_uploads')
      .delete()
      .eq('id', fileId);
    
    if (dbError) {
      console.error('Database delete error:', dbError);
      return NextResponse.json(
        { error: 'Failed to delete file record' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}