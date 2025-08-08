// Client-side image utilities

// Get all available random images
export function getAllRandomImages(): string[] {
  // List of all images in the random folder - using only confirmed existing images
  return [
    "/random/hero-1.jpg",
    "/random/hero-2.jpg",
    "/random/hero-3.jpg",
    "/random/hero-4.jpg",
    "/random/hero-5.jpg",
    "/random/hero-6.jpg",
    "/random/hero-7.jpg",
    "/random/hero-8.jpg",
    "/random/hero-9.jpg",
    "/random/hero-10.jpg",
    "/random/hero-11.jpg",
    "/random/hero-12.jpg",
    "/random/hero-13.jpg",
    "/random/hero-14.jpg"
  ]
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
  
  // Requesting ${count} unique images from ${allImages.length} available images
  
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