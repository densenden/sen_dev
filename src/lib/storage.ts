import { supabase } from './supabase'

export class StorageError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message)
    this.name = 'StorageError'
  }
}

export async function uploadProjectImage(file: File, projectSlug: string): Promise<string> {
  if (!supabase) {
    throw new StorageError('Supabase client not initialized')
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${projectSlug}/${Date.now()}.${fileExt}`
  
  try {
    const { data, error } = await supabase.storage
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