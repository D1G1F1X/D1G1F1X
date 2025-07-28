interface PreloadResult {
  loaded: number
  total: number
  failed: number
  totalTime: number
}

/**
 * This file is responsible for generating standardized card image paths and their variants.
 * These paths do NOT include the Vercel Blob hash, as they are used for logical matching
 * against the actual blob filenames which might include hashes.
 */

// Cache for image URLs to avoid repeated blob calls
// This cache will store the *full blob URL* including any hashes
const imageUrlCache = new Map<string, string>()

/**
 * Generates the primary standardized image path for a given card ID and element.
 * Example: "00-cauldron-spirit.jpg"
 */
export function generateCardImagePath(cardId: string, element: string): string {
  // Normalize cardId (e.g., "0-Cauldron" -> "00-cauldron")
  const [numberPart, suitPart] = cardId.split("-")
  const normalizedNumber = numberPart.padStart(2, "0")
  const normalizedSuit = suitPart.toLowerCase()
  const normalizedElement = element.toLowerCase()

  return `${normalizedNumber}-${normalizedSuit}-${normalizedElement}.jpg` // Default to .jpg
}

/**
 * Generates an array of possible filename variants for a given card ID and element.
 * These variants are used for robust matching against actual blob filenames,
 * which might have slight naming inconsistencies or different extensions.
 */
export function generateCardImagePathVariants(cardId: string, element: string): string[] {
  const variants: string[] = []

  // Normalize inputs
  const [numberPart, suitPart] = cardId.split("-")
  const normalizedNumber = numberPart.padStart(2, "0")
  const normalizedSuit = suitPart.toLowerCase()
  const normalizedElement = element.toLowerCase()

  // Common naming conventions and potential variations
  const baseNames = [
    `${normalizedNumber}-${normalizedSuit}-${normalizedElement}`, // e.g., "00-cauldron-spirit"
    `${numberPart}-${normalizedSuit}-${normalizedElement}`, // e.g., "0-cauldron-spirit"
    `${normalizedNumber}${normalizedSuit}-${normalizedElement}`, // e.g., "00cauldron-spirit"
    `${cardId.toLowerCase()}-${normalizedElement}`, // e.g., "0-cauldron-spirit" (if cardId was "0-Cauldron")
    `${cardId}-${element}`, // Original case, e.g., "0-Cauldron-Spirit"
    `${normalizedNumber}_${normalizedSuit}_${normalizedElement}`, // Underscore variant
    `card_${normalizedNumber}_${normalizedSuit}_${normalizedElement}`, // "card_" prefix
    `${normalizedSuit}${normalizedNumber}${normalizedElement}`, // Suit-number-element
    `${normalizedSuit}_${normalizedNumber}_${normalizedElement}`,
    `${normalizedSuit}-${normalizedNumber}-${normalizedElement}`,
    `${numberPart}-${normalizedSuit}-${normalizedElement}`,
    `${normalizedNumber}${normalizedSuit}${normalizedElement}`,
  ]

  // Add common image extensions
  const extensions = ["jpg", "jpeg", "png", "webp"]

  baseNames.forEach((base) => {
    extensions.forEach((ext) => {
      variants.push(`${base}.${ext}`)
    })
  })

  return Array.from(new Set(variants)) // Ensure uniqueness
}

/**
 * Gets the image URL for a card. This function now relies on the API route
 * to get the *actual* blob URL, including any unique hashes.
 * This is a client-side function.
 */
export async function getCardImageUrl(cardId: string, element: string): Promise<string> {
  const cacheKey = `${cardId}-${element}`
  if (imageUrlCache.has(cacheKey)) {
    return imageUrlCache.get(cacheKey)!
  }

  try {
    // Call the API route to get the verified blob URL
    const response = await fetch(`/api/blob/card-images?cardId=${cardId}&element=${element}`)
    const data = await response.json()

    if (data.success && data.imageUrl) {
      imageUrlCache.set(cacheKey, data.imageUrl)
      return data.imageUrl
    } else {
      console.warn(`API did not return a valid image URL for ${cardId}-${element}:`, data.message || "Unknown error")
      // Fallback to a generic placeholder if API fails
      const placeholderUrl = `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardId)}`
      imageUrlCache.set(cacheKey, placeholderUrl)
      return placeholderUrl
    }
  } catch (error) {
    console.error(`Error fetching image URL from API for ${cardId}-${element}:`, error)
    const placeholderUrl = `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardId)}`
    imageUrlCache.set(cacheKey, placeholderUrl)
    return placeholderUrl
  }
}

export async function preloadCardImages(
  cardIds: string[],
  elements: string[],
  onProgress?: (loaded: number, total: number) => void,
): Promise<PreloadResult> {
  const startTime = Date.now()
  let loadedCount = 0
  let failedCount = 0
  const totalImages = cardIds.length * elements.length

  const imagePromises: Promise<void>[] = []

  for (const cardId of cardIds) {
    for (const element of elements) {
      const cacheKey = `${cardId}-${element}`
      if (imageUrlCache.has(cacheKey)) {
        // If already in cache, check if it's a placeholder.
        // If it's a placeholder, it means it previously failed to load.
        if (imageUrlCache.get(cacheKey)!.includes("placeholder.svg")) {
          failedCount++
        } else {
          loadedCount++
        }
        onProgress?.(loadedCount, totalImages)
        continue
      }

      imagePromises.push(
        (async () => {
          try {
            // Use the getCardImageUrl function which now calls the API
            const imageUrl = await getCardImageUrl(cardId, element)

            // If it's a placeholder, it means the image wasn't found or API failed
            if (imageUrl.includes("placeholder.svg")) {
              failedCount++
              imageUrlCache.set(cacheKey, imageUrl) // Ensure placeholder is cached
            } else {
              const img = new Image()
              img.src = imageUrl
              await new Promise((resolve, reject) => {
                img.onload = () => {
                  imageUrlCache.set(cacheKey, imageUrl)
                  loadedCount++
                  resolve(void 0)
                }
                img.onerror = (e) => {
                  console.warn(`Failed to load preloaded image: ${imageUrl}`, e)
                  failedCount++
                  imageUrlCache.set(
                    cacheKey,
                    `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardId)}`,
                  )
                  resolve(void 0)
                }
              })
            }
          } catch (error) {
            console.warn(`Error preloading image for ${cardId}-${element}:`, error)
            failedCount++
            imageUrlCache.set(cacheKey, `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardId)}`)
          } finally {
            onProgress?.(loadedCount, totalImages) // Update progress after each image attempt
          }
        })(),
      )
    }
  }

  await Promise.all(imagePromises)

  const totalTime = Date.now() - startTime
  return { loaded: loadedCount, total: totalImages, failed: failedCount, totalTime }
}
