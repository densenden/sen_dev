import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    
    if (!filename) {
      return NextResponse.json(
        { error: 'No filename provided' },
        { status: 400 }
      );
    }
    
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename);
    
    try {
      await unlink(filepath);
      return NextResponse.json({
        message: 'File deleted successfully'
      });
    } catch (error) {
      console.error('Delete error:', error);
      return NextResponse.json(
        { error: 'File not found or already deleted' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}