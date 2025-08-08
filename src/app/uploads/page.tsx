'use client';

import { useState, useEffect } from 'react';
import { Upload, FileText, Copy, Check, Share2, Download, Trash2 } from 'lucide-react';

interface UploadedFile {
  filename: string;
  url: string;
  timestamp: number;
}

export default function UploadsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingFile, setDeletingFile] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('uploadedPDFs');
    if (stored) {
      setUploadedFiles(JSON.parse(stored));
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setError(null);
    } else {
      setError('Please select a PDF file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      const newFile: UploadedFile = {
        filename: data.filename,
        url: data.url,
        timestamp: Date.now(),
      };

      const updatedFiles = [newFile, ...uploadedFiles];
      setUploadedFiles(updatedFiles);
      localStorage.setItem('uploadedPDFs', JSON.stringify(updatedFiles));
      
      setSelectedFile(null);
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = async (url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareUrl = async (url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PDF Document',
          text: 'Check out this PDF',
          url: fullUrl,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const handleDelete = async (file: UploadedFile) => {
    if (!confirm(`Are you sure you want to delete ${file.filename.replace(/^\d+-/, '')}?`)) {
      return;
    }

    setDeletingFile(file.filename);
    
    try {
      const response = await fetch(`/api/delete-pdf?filename=${encodeURIComponent(file.filename)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedFiles = uploadedFiles.filter(f => f.filename !== file.filename);
        setUploadedFiles(updatedFiles);
        localStorage.setItem('uploadedPDFs', JSON.stringify(updatedFiles));
      } else {
        const data = await response.json();
        console.error('Delete failed:', data.error);
      }
    } catch (err) {
      console.error('Failed to delete:', err);
    } finally {
      setDeletingFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">PDF Upload & Share</h1>
          <p className="text-muted-foreground mb-8">
            Upload PDF files and get shareable links
          </p>

          <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              
              <input
                id="file-input"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <label
                htmlFor="file-input"
                className="cursor-pointer inline-block"
              >
                <span className="text-primary hover:underline">
                  Choose a PDF file
                </span>
                <span className="text-muted-foreground"> or drag and drop</span>
              </label>

              {selectedFile && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}

              {error && (
                <p className="mt-4 text-sm text-destructive">{error}</p>
              )}

              {selectedFile && (
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading...' : 'Upload PDF'}
                </button>
              )}
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="bg-card rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Uploaded PDFs</h2>
              
              <div className="space-y-4">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.timestamp}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium text-sm">
                          {file.filename.replace(/^\d+-/, '')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(file.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-background rounded-md transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      
                      <button
                        onClick={() => shareUrl(file.url)}
                        className="p-2 hover:bg-background rounded-md transition-colors"
                        title="Share"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => copyToClipboard(file.url)}
                        className="p-2 hover:bg-background rounded-md transition-colors relative"
                        title="Copy link"
                      >
                        {copiedUrl === file.url ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleDelete(file)}
                        disabled={deletingFile === file.filename}
                        className="p-2 hover:bg-destructive/10 rounded-md transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}