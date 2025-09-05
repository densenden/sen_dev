// Campaign images utility with shuffling functionality

const campaignImages = [
  "/campaign/campaign1.jpg",
  "/campaign/campaign2.jpg", 
  "/campaign/campaign3.jpg"
]

/**
 * Get shuffled campaign images for dynamic backgrounds
 * @param count - Number of images to return (default: all)
 * @returns Array of shuffled image paths
 */
export function getShuffledCampaignImages(count?: number): string[] {
  const shuffled = [...campaignImages].sort(() => Math.random() - 0.5)
  return count ? shuffled.slice(0, count) : shuffled
}

/**
 * Get a random campaign image
 * @returns Single random image path
 */
export function getRandomCampaignImage(): string {
  return campaignImages[Math.floor(Math.random() * campaignImages.length)]
}

/**
 * Get all campaign images
 * @returns Array of all campaign image paths
 */
export function getAllCampaignImages(): string[] {
  return [...campaignImages]
}