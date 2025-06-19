import { list } from "@vercel/blob"

interface BlobFile {
  url: string
  pathname: string
  size: number
  uploadedAt: Date
}

interface CardImagePaths {
  [key: string]: string
}

/**
 * Safely gets an element string, handling undefined values
 */
function safeElementString(element: string | undefined): string {
  if (!element || typeof element !== "string") {
    return "spirit" // Default fallback element
  }
  return element.toLowerCase().trim()
}

/**
 * Generate card image path based on card ID and element using zero-padded format
 */
export function generateCardImagePath(cardId: string, element: string | undefined): string {
  const safeElement = safeElementString(element)

  // Extract number and suit from card ID (e.g., "0-Cauldron" -> "0", "Cauldron")
  const parts = cardId.split("-")
  if (parts.length < 2) {
    console.warn(`Invalid card ID format: ${cardId}`)
    return `placeholder-${cardId}-${safeElement}.jpg`
  }

  const number = parts[0]
  const suit = parts[1].toLowerCase()

  // Format: "00-cauldron-fire.jpg" (zero-padded number + suit + element)
  const paddedNumber = number.padStart(2, "0")
  return `${paddedNumber}-${suit}-${safeElement}.jpg`
}

/**
 * Generate all possible image path variants for fallback support
 */
export function generateCardImagePathVariants(cardId: string, element: string | undefined): string[] {
  const safeElement = safeElementString(element)
  const parts = cardId.split("-")

  if (parts.length < 2) {
    return [`placeholder-${cardId}-${safeElement}.jpg`]
  }

  const originalNumber = parts[0]
  const paddedNumber = originalNumber.padStart(2, "0")
  const suit = parts[1].toLowerCase()

  const variants: string[] = [
    // Primary: Zero-padded format (new standard)
    `${paddedNumber}-${suit}-${safeElement}.jpg`,
  ]

  // Add legacy format if different
  if (originalNumber !== paddedNumber) {
    variants.push(`${originalNumber}-${suit}-${safeElement}.jpg`)
  }

  // Add alternative formats
  variants.push(`${paddedNumber}${suit}-${safeElement}.jpg`, `${cardId.toLowerCase()}-${safeElement}.jpg`)

  return variants
}

/**
 * Get card image URL from blob storage or fallback to local
 */
export async function getCardImageUrl(cardId: string, element: string | undefined): Promise<string> {
  try {
    const primaryPath = generateCardImagePath(cardId, element)
    const allVariants = generateCardImagePathVariants(cardId, element)

    // Try to get from blob storage first
    const blobUrl = await getBlobImageUrl(allVariants)
    if (blobUrl) {
      return blobUrl
    }

    // Fallback to local public folder (try primary path first)
    return `/cards/${primaryPath}`
  } catch (error) {
    console.warn(`Error getting card image for ${cardId}-${element}:`, error)
    // Return placeholder image as final fallback
    return `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(cardId + " " + safeElementString(element))}`
  }
}

/**
 * Get image URL from Vercel Blob storage with fallback support
 */
async function getBlobImageUrl(imagePathVariants: string[]): Promise<string | null> {
  try {
    // Check if we're in a server environment and have the token
    if (typeof window !== "undefined") {
      // Client-side: return null to use fallback
      return null
    }

    // Server-side: try to get from blob
    const { blobs } = await list({
      prefix: "cards/",
      limit: 1000,
    })

    // Try each variant in order of preference
    for (const variant of imagePathVariants) {
      const matchingBlob = blobs.find((blob: BlobFile) => {
        if (!blob.pathname) return false
        return blob.pathname.includes(variant) || blob.pathname.endsWith(variant)
      })

      if (matchingBlob) {
        return matchingBlob.url
      }
    }

    return null
  } catch (error) {
    console.warn(`Error getting blob image for variants:`, imagePathVariants, error)
    return null
  }
}

/**
 * Enhanced preload function with progress tracking using new naming convention
 */
export async function preloadCardImages(
  cardIds: string[],
  elements: string[],
  onProgress?: (loaded: number, total: number) => void,
): Promise<{ loaded: number; failed: number; totalTime: number }> {
  const startTime = Date.now()
  let loaded = 0
  let failed = 0

  // Create all combinations of cards and elements
  const combinations: Array<{ cardId: string; element: string }> = []
  cardIds.forEach((cardId) => {
    elements.forEach((element) => {
      combinations.push({ cardId, element })
    })
  })

  const total = combinations.length

  const imagePromises = combinations.map(async ({ cardId, element }) => {
    try {
      const imageUrl = await getCardImageUrl(cardId, element)

      // Preload the image
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = imageUrl

      return new Promise<void>((resolve, reject) => {
        img.onload = () => {
          loaded++
          if (onProgress) onProgress(loaded, total)
          resolve()
        }
        img.onerror = () => {
          failed++
          if (onProgress) onProgress(loaded, total)
          reject(new Error(`Failed to load ${imageUrl}`))
        }

        // Timeout after 10 seconds
        setTimeout(() => {
          failed++
          if (onProgress) onProgress(loaded, total)
          reject(new Error(`Timeout loading ${imageUrl}`))
        }, 10000)
      })
    } catch (error) {
      failed++
      if (onProgress) onProgress(loaded, total)
      console.warn(`Error preloading card ${cardId}-${element}:`, error)
      throw error
    }
  })

  try {
    await Promise.allSettled(imagePromises)
  } catch (error) {
    console.warn("Some card images failed to preload:", error)
  }

  const totalTime = Date.now() - startTime
  return { loaded, failed, totalTime }
}

/**
 * Get all available card image paths from blob storage
 */
export async function getAvailableCardImages(): Promise<CardImagePaths> {
  try {
    if (typeof window !== "undefined") {
      // Client-side: return empty object
      return {}
    }

    const { blobs } = await list({
      prefix: "cards/",
      limit: 1000,
    })

    const cardPaths: CardImagePaths = {}

    blobs.forEach((blob: BlobFile) => {
      if (!blob.pathname) return

      const filename = blob.pathname.split("/").pop()
      if (filename && filename.endsWith(".jpg")) {
        const key = filename.replace(".jpg", "")
        cardPaths[key] = blob.url
      }
    })

    return cardPaths
  } catch (error) {
    console.warn("Error listing card images from blob:", error)
    return {}
  }
}

/**
 * Validate if a card image exists using new naming convention
 */
export async function validateCardImage(cardId: string, element: string | undefined): Promise<boolean> {
  try {
    const imageUrl = await getCardImageUrl(cardId, element)

    // If it's a placeholder URL, consider it as not found
    if (imageUrl.includes("placeholder.svg")) {
      return false
    }

    // Try to fetch the image to validate it exists
    const response = await fetch(imageUrl, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.warn(`Error validating card image for ${cardId}-${element}:`, error)
    return false
  }
}

/**
 * Batch validate multiple card images
 */
export async function validateMultipleCardImages(
  cards: Array<{ cardId: string; element: string }>,
): Promise<Array<{ cardId: string; element: string; isValid: boolean; path: string }>> {
  const results = await Promise.allSettled(
    cards.map(async ({ cardId, element }) => {
      const path = generateCardImagePath(cardId, element)
      const isValid = await validateCardImage(cardId, element)

      return { cardId, element, isValid, path }
    }),
  )

  return results
    .filter((result): result is PromiseFulfilledResult<any> => result.status === "fulfilled")
    .map((result) => result.value)
}

// Legacy compatibility functions
export async function getCardImageFromBlob(cardId: string, element: string): Promise<string> {
  return getCardImageUrl(cardId, element)
}

// Backward compatibility for old function signatures
export async function getCardImageUrlLegacy(
  cardNumber: number,
  treasure: string | undefined,
  element: string | undefined,
): Promise<string> {
  const cardId = `${cardNumber}-${treasure || "Unknown"}`
  return getCardImageUrl(cardId, element)
}
