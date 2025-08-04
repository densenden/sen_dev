import fs from 'fs'
import path from 'path'

// Get all images from the random folder
export function getAllRandomImages(): string[] {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public', 'random')
    const files = fs.readdirSync(imagesDirectory)
    
    // Filter for image files only
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
    })
    
    // Return paths relative to public folder
    return imageFiles.map(file => `/random/${file}`)
  } catch (error) {
    console.error('Error reading random images:', error)
    // Fallback to default images
    return [
      "/random/hero-1.jpg",
      "/random/hero-2.jpg",
      "/random/hero-3.jpg",
      "/random/hero-4.jpg"
    ]
  }
}

// Shuffle array using Fisher-Yates algorithm
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Get unique random images for a page
export function getUniqueRandomImages(count: number): string[] {
  const allImages = getAllRandomImages()
  const shuffled = shuffleArray(allImages)
  
  // If we need more images than available, repeat the shuffled array
  if (count > shuffled.length) {
    const repeated = []
    for (let i = 0; i < count; i++) {
      repeated.push(shuffled[i % shuffled.length])
    }
    return repeated
  }
  
  return shuffled.slice(0, count)
}

// Get a single random image (for hero sections)
export function getRandomImage(): string {
  const images = getAllRandomImages()
  return images[Math.floor(Math.random() * images.length)]
}