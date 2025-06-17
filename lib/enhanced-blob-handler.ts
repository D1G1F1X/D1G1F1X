interface ImageCacheEntry {
  url: string
  timestamp: number
  verified: boolean
}

const imageCache: Record<string, ImageCacheEntry> = {}
let cacheTimestamp = 0
const CACHE_DURATION = 15 * 60 * 1000 // 15 minutes

/**
 * Check if blob storage is available and properly configured
 */
function isBlobStorageAvailable(): boolean {
  return (
    typeof process !== "undefined" &&
    !!process.env.BLOB_READ_WRITE_TOKEN &&
    process.env.BLOB_READ_WRITE_TOKEN.length > 10
  )
}

/**
 * Generate possible image file names for a card
 */
function generateImageNames(cardId: string, element: string): string[] {
  const [number, suit] = cardId.split("-")
  const paddedNumber = number.padStart(2, "0")
  const lowerSuit = suit?.toLowerCase() || ""
  const lowerElement = element.toLowerCase()

  return [
    `${paddedNumber}-${lowerSuit}-${lowerElement}.jpg`,
    `${paddedNumber}${lowerSuit}-${lowerElement}.jpg`,
    `${number}-${lowerSuit}-${lowerElement}.jpg`,
    `${cardId.toLowerCase()}-${lowerElement}.jpg`,
    `${cardId.toLowerCase()}.jpg`,
    `${paddedNumber}-${lowerSuit}-${lowerElement}.png`,
    `${paddedNumber}${lowerSuit}-${lowerElement}.png`,
  ]
}

/**
 * Generate local fallback image path
 */
function getLocalImagePath(cardId: string, element: string): string {
  const [number, suit] = cardId.split("-")
  const paddedNumber = number.padStart(2, "0")
  const lowerSuit = suit?.toLowerCase() || ""
  const lowerElement = element.toLowerCase()

  return `/cards/${paddedNumber}-${lowerSuit}-${lowerElement}.jpg`
}

/**
 * Get card image URL with improved error handling
 */
export async function getCardImageFromBlob(cardId: string, element: string): Promise<string> {
  const cacheKey = `${cardId}-${element}`
  const now = Date.now()

  // Check cache first
  if (imageCache[cacheKey] && now - imageCache[cacheKey].timestamp < CACHE_DURATION) {
    return imageCache[cacheKey].url
  }

  // If blob storage is not available, return local path immediately
  if (!isBlobStorageAvailable()) {
    console.log("Blob storage not available, using local path")
    const localPath = getLocalImagePath(cardId, element)

    imageCache[cacheKey] = {
      url: localPath,
      timestamp: now,
      verified: false,
    }

    return localPath
  }

  try {
    // Try to refresh blob cache if needed
    if (now - cacheTimestamp > CACHE_DURATION) {
      await refreshBlobCache()
    }

    // Try to find the image in blob storage cache
    const possibleNames = generateImageNames(cardId, element)

    for (const imageName of possibleNames) {
      if (imageCache[imageName] && imageCache[imageName].verified) {
        const imageUrl = imageCache[imageName].url
        // Cache the result for this specific card-element combination
        imageCache[cacheKey] = {
          url: imageUrl,
          timestamp: now,
          verified: true,
        }
        return imageUrl
      }
    }

    // If not found in blob, use local path
    const localPath = getLocalImagePath(cardId, element)

    imageCache[cacheKey] = {
      url: localPath,
      timestamp: now,
      verified: false,
    }

    return localPath
  } catch (error) {
    console.warn(`Error getting card image for ${cardId}-${element}:`, error)

    // Fallback to local path
    const localPath = getLocalImagePath(cardId, element)

    imageCache[cacheKey] = {
      url: localPath,
      timestamp: now,
      verified: false,
    }

    return localPath
  }
}

/**
 * Refresh the blob storage cache with improved error handling
 */
async function refreshBlobCache(): Promise<void> {
  if (!isBlobStorageAvailable()) {
    console.log("Blob storage not available for cache refresh")
    return
  }

  try {
    // Dynamic import to avoid issues in environments where @vercel/blob is not available
    const { list } = await import("@vercel/blob")

    const response = await list({
      prefix: "cards/",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    if (!response || !response.blobs) {
      console.warn("Invalid response from blob storage")
      return
    }

    // Clear old verified cache entries
    Object.keys(imageCache).forEach((key) => {
      if (imageCache[key].verified) {
        delete imageCache[key]
      }
    })

    // Populate cache with blob URLs
    response.blobs.forEach((blob) => {
      const filename = blob.pathname.split("/").pop()
      if (filename && blob.url) {
        imageCache[filename] = {
          url: blob.url,
          timestamp: Date.now(),
          verified: true,
        }

        // Also cache without extension
        const nameWithoutExt = filename.replace(/\.[^/.]+$/, "")
        imageCache[nameWithoutExt] = {
          url: blob.url,
          timestamp: Date.now(),
          verified: true,
        }
      }
    })

    cacheTimestamp = Date.now()
    console.log(`Refreshed blob cache with ${response.blobs.length} images`)
  } catch (error) {
    console.warn("Error refreshing blob cache:", error)
    // Don't throw the error, just log it and continue with local images
  }
}

/**
 * Preload card images with better error handling
 */
export async function preloadCardImages(
  cards: Array<{ id: string; baseElement: string; synergisticElement: string }>,
  onProgress?: (loaded: number, total: number) => void,
): Promise<{ loaded: number; failed: number }> {
  let loaded = 0
  let failed = 0
  const total = cards.length

  // Process cards one by one to avoid overwhelming the system
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i]

    try {
      // Try to get image for base element
      await getCardImageFromBlob(card.id, card.baseElement)
      loaded++
    } catch (error) {
      console.warn(`Failed to preload image for ${card.id}-${card.baseElement}:`, error)
      failed++
    }

    onProgress?.(loaded + failed, total)
  }

  return { loaded, failed }
}

/**
 * Load a single image with better error handling
 */
async function loadSingleImage(cardId: string, element: string): Promise<string> {
  try {
    const imageUrl = await getCardImageFromBlob(cardId, element)

    // Only preload in browser if it's not a placeholder
    if (typeof window !== "undefined" && !imageUrl.includes("placeholder.svg")) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = "anonymous"

        const timeout = setTimeout(() => {
          reject(new Error(`Image load timeout for ${imageUrl}`))
        }, 5000) // 5 second timeout

        img.onload = () => {
          clearTimeout(timeout)
          resolve(imageUrl)
        }

        img.onerror = () => {
          clearTimeout(timeout)
          reject(new Error(`Failed to load ${imageUrl}`))
        }

        img.src = imageUrl
      })
    }

    return imageUrl
  } catch (error) {
    throw new Error(`Failed to load image for ${cardId}-${element}: ${error}`)
  }
}

/**
 * Get cache statistics
 */
export function getCacheStats(): {
  totalCached: number
  verifiedFromBlob: number
  localPaths: number
  cacheAge: number
} {
  const now = Date.now()
  let verifiedFromBlob = 0
  let localPaths = 0

  Object.values(imageCache).forEach((entry) => {
    if (entry.verified) {
      verifiedFromBlob++
    } else {
      localPaths++
    }
  })

  return {
    totalCached: Object.keys(imageCache).length,
    verifiedFromBlob,
    localPaths,
    cacheAge: now - cacheTimestamp,
  }
}

/**
 * Clear the image cache
 */
export function clearImageCache(): void {
  Object.keys(imageCache).forEach((key) => delete imageCache[key])
  cacheTimestamp = 0
}
