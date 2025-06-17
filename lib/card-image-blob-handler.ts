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
 * Safely gets a treasure string, handling undefined values
 */
function safeTreasureString(treasure: string | undefined): string {
  if (!treasure || typeof treasure !== "string") {
    return "cauldron" // Default fallback treasure
  }
  return treasure.toLowerCase().trim()
}

/**
 * Generate card image path based on card data
 */
export function generateCardImagePath(
  cardNumber: number,
  treasure: string | undefined,
  element: string | undefined,
): string {
  const safeElement = safeElementString(element)
  const safeTreasure = safeTreasureString(treasure)

  // Format: "01cauldron-fire.jpg" (2-digit number + treasure + element)
  const paddedNumber = cardNumber.toString().padStart(2, "0")
  return `${paddedNumber}${safeTreasure}-${safeElement}.jpg`
}

/**
 * Get card image URL from blob storage or fallback to local
 */
export async function getCardImageUrl(
  cardNumber: number,
  treasure: string | undefined,
  element: string | undefined,
): Promise<string> {
  try {
    const imagePath = generateCardImagePath(cardNumber, treasure, element)

    // Try to get from blob storage first
    const blobUrl = await getBlobImageUrl(imagePath)
    if (blobUrl) {
      return blobUrl
    }

    // Fallback to local public folder
    return `/cards/${imagePath}`
  } catch (error) {
    console.warn(`Error getting card image for ${cardNumber}-${treasure}-${element}:`, error)
    // Return placeholder image as final fallback
    return `/placeholder.svg?height=400&width=300&text=${cardNumber}-${safeTreasureString(treasure)}-${safeElementString(element)}`
  }
}

/**
 * Get image URL from Vercel Blob storage
 */
async function getBlobImageUrl(imagePath: string): Promise<string | null> {
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

    const matchingBlob = blobs.find(
      (blob: BlobFile) => blob.pathname.includes(imagePath) || blob.pathname.endsWith(imagePath),
    )

    return matchingBlob?.url || null
  } catch (error) {
    console.warn(`Error getting blob image for ${imagePath}:`, error)
    return null
  }
}

/**
 * Preload card images for better performance
 */
export async function preloadCardImages(
  cards: Array<{ number: number; treasure: string; element: string }>,
): Promise<void> {
  const imagePromises = cards.map(async (card) => {
    try {
      const imageUrl = await getCardImageUrl(card.number, card.treasure, card.element)

      // Preload the image
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = imageUrl

      return new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error(`Failed to load ${imageUrl}`))
      })
    } catch (error) {
      console.warn(`Error preloading card ${card.number}-${card.treasure}-${card.element}:`, error)
      throw error
    }
  })

  try {
    await Promise.allSettled(imagePromises)
  } catch (error) {
    console.warn("Some card images failed to preload:", error)
  }
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
 * Validate if a card image exists
 */
export async function validateCardImage(
  cardNumber: number,
  treasure: string | undefined,
  element: string | undefined,
): Promise<boolean> {
  try {
    const imageUrl = await getCardImageUrl(cardNumber, treasure, element)

    // If it's a placeholder URL, consider it as not found
    if (imageUrl.includes("placeholder.svg")) {
      return false
    }

    // Try to fetch the image to validate it exists
    const response = await fetch(imageUrl, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.warn(`Error validating card image for ${cardNumber}-${treasure}-${element}:`, error)
    return false
  }
}
