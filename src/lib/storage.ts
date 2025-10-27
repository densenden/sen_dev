import { supabase } from './supabase'

export class StorageError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message)
    this.name = 'StorageError'
  }
}

export async function uploadProjectImage(
  file: File,
  projectSlug: string,
  options?: { folder?: string }
): Promise<string> {
  if (!supabase) {
    throw new StorageError('Supabase client not initialized')
  }

  const fileExt = file.name.split('.').pop()
  const targetFolder = options?.folder ? `${projectSlug}/${options.folder}` : projectSlug
  const fileName = `${targetFolder}/${Date.now()}.${fileExt}`
  
  try {
    const { error } = await supabase.storage
      .from('project-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw new StorageError(`Failed to upload image: ${error.message}`, error)
    }

    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(fileName)

    return publicUrl
  } catch (error) {
    if (error instanceof StorageError) throw error
    throw new StorageError('Upload failed', error as Error)
  }
}

export async function deleteProjectImage(url: string): Promise<void> {
  if (!supabase) {
    throw new StorageError('Supabase client not initialized')
  }

  try {
    // Extract file path from URL
    const urlParts = url.split('/project-images/')
    if (urlParts.length !== 2) {
      throw new StorageError('Invalid image URL format')
    }
    
    const filePath = urlParts[1]
    
    const { error } = await supabase.storage
      .from('project-images')
      .remove([filePath])

    if (error) {
      throw new StorageError(`Failed to delete image: ${error.message}`, error)
    }
  } catch (error) {
    if (error instanceof StorageError) throw error
    throw new StorageError('Delete failed', error as Error)
  }
}

export async function getProjectImages(projectSlug: string): Promise<string[]> {
  if (!supabase) {
    throw new StorageError('Supabase client not initialized')
  }

  try {
    const { data, error } = await supabase.storage
      .from('project-images')
      .list(projectSlug, {
        limit: 100,
        sortBy: { column: 'created_at', order: 'asc' }
      })

    if (error) {
      throw new StorageError(`Failed to list images: ${error.message}`, error)
    }

    return data.map(file => {
      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(`${projectSlug}/${file.name}`)
      return publicUrl
    })
  } catch (error) {
    if (error instanceof StorageError) throw error
    throw new StorageError('Failed to get images', error as Error)
  }
}

// Job Applications Storage Functions
const JOB_APPLICATIONS_BUCKET = 'job-applications'

export async function ensureJobApplicationsBucket(): Promise<boolean> {
  if (!supabase) {
    throw new StorageError('Supabase client not initialized')
  }
  
  try {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error('Error listing buckets:', listError)
      return false
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === JOB_APPLICATIONS_BUCKET)
    
    if (!bucketExists) {
      const { data, error: createError } = await supabase.storage.createBucket(JOB_APPLICATIONS_BUCKET, {
        public: false,
        allowedMimeTypes: ['application/pdf', 'application/zip'],
        fileSizeLimit: 10485760 // 10MB
      })
      
      if (createError) {
        console.error('Error creating bucket:', createError)
        return false
      }
      
      console.log('Created job-applications bucket:', data)
    }
    
    return true
  } catch (error) {
    console.error('Error ensuring bucket:', error)
    return false
  }
}

export async function uploadJobDocument(
  jobId: string,
  type: 'cv' | 'cover_letter' | 'bundle',
  file: File | Buffer,
  fileName?: string
): Promise<{ path: string; url: string } | null> {
  if (!supabase) {
    throw new StorageError('Supabase client not initialized')
  }
  
  try {
    await ensureJobApplicationsBucket()
    
    const timestamp = Date.now()
    const extension = fileName?.split('.').pop() || 'pdf'
    const filePath = `${jobId}/${type}_${timestamp}.${extension}`
    
    const { data, error } = await supabase.storage
      .from(JOB_APPLICATIONS_BUCKET)
      .upload(filePath, file, {
        contentType: extension === 'zip' ? 'application/zip' : 'application/pdf',
        upsert: true
      })
    
    if (error) {
      console.error('Error uploading file:', error)
      return null
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from(JOB_APPLICATIONS_BUCKET)
      .getPublicUrl(data.path)
    
    return {
      path: data.path,
      url: publicUrl
    }
  } catch (error) {
    console.error('Error in uploadJobDocument:', error)
    return null
  }
}

export async function downloadJobDocument(path: string): Promise<Blob | null> {
  if (!supabase) {
    throw new StorageError('Supabase client not initialized')
  }
  
  try {
    const { data, error } = await supabase.storage
      .from(JOB_APPLICATIONS_BUCKET)
      .download(path)
    
    if (error) {
      console.error('Error downloading file:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error in downloadJobDocument:', error)
    return null
  }
}

export async function deleteJobDocument(path: string): Promise<boolean> {
  if (!supabase) {
    throw new StorageError('Supabase client not initialized')
  }
  
  try {
    const { error } = await supabase.storage
      .from(JOB_APPLICATIONS_BUCKET)
      .remove([path])
    
    if (error) {
      console.error('Error deleting file:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error in deleteJobDocument:', error)
    return false
  }
}

export async function deleteJobDocuments(jobId: string): Promise<boolean> {
  if (!supabase) {
    throw new StorageError('Supabase client not initialized')
  }
  
  try {
    const { data: files, error: listError } = await supabase.storage
      .from(JOB_APPLICATIONS_BUCKET)
      .list(jobId)
    
    if (listError) {
      console.error('Error listing files:', listError)
      return false
    }
    
    if (!files || files.length === 0) {
      return true
    }
    
    const paths = files.map(file => `${jobId}/${file.name}`)
    const { error: deleteError } = await supabase.storage
      .from(JOB_APPLICATIONS_BUCKET)
      .remove(paths)
    
    if (deleteError) {
      console.error('Error deleting files:', deleteError)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error in deleteJobDocuments:', error)
    return false
  }
}

export function getJobDocumentUrl(path: string): string {
  if (!supabase) {
    throw new StorageError('Supabase client not initialized')
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from(JOB_APPLICATIONS_BUCKET)
    .getPublicUrl(path)
  return publicUrl
}
