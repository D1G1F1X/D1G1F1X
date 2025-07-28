const BLOB_BASE_URL = "https://0clhhm0umusm8qjw.public.blob.vercel-storage.com" // Updated to the correct public Vercel Blob URL

interface PreloadResult {
  loaded: number
  total: number
  failed: number
  totalTime: number
}

// Cache for image URLs to avoid repeated blob calls
const imageUrlCache = new Map<string, string>()

/**
 * Generates the primary, standardized image path for a given card ID and element.
 * This format uses zero-padded numbers and hyphenated suit/element.
 * Example: "03-cord-spirit.jpg" for cardId "3-Cord" and element "spirit".
 */
export function generateCardImagePath(cardId: string, element: string): string {
  const [numberStr, suitStr] = cardId.split("-")
  const paddedNumber = numberStr.padStart(2, "0")
  const lowerSuit = suitStr?.toLowerCase() || ""
  const lowerElement = element.toLowerCase()
  return `${paddedNumber}-${lowerSuit}-${lowerElement}.jpg`
}

/**
 * Generates an array of possible filename variants for a given card ID and element.
 * This accounts for different naming conventions that might exist in the blob storage.
 * The variants are just the filenames, without the '/cards/' prefix.
 */
export function generateCardImagePathVariants(cardId: string, element: string): string[] {
  const [numberStr, suitStr] = cardId.split("-")
  const paddedNumber = numberStr.padStart(2, "0")
  const lowerSuit = suitStr?.toLowerCase() || ""
  const lowerElement = element.toLowerCase()

  const variants = new Set<string>()

  // 1. Standard format: 09-suit-element.jpg (e.g., 03-cord-spirit.jpg)
  variants.add(`${paddedNumber}-${lowerSuit}-${lowerElement}.jpg`)
  variants.add(`${paddedNumber}-${lowerSuit}-${lowerElement}.jpeg`) // Include .jpeg extension

  // 2. Non-padded number format: 9-suit-element.jpg (e.g., 3-cord-spirit.jpg)
  variants.add(`${numberStr}-${lowerSuit}-${lowerElement}.jpg`)
  variants.add(`${numberStr}-${lowerSuit}-${lowerElement}.jpeg`)

  // 3. Non-hyphenated number-suit format: 09suit-element.jpg (e.g., 01cauldron-air.jpg, 25sword-air.jpg)
  variants.add(`${paddedNumber}${lowerSuit}-${lowerElement}.jpg`)
  variants.add(`${paddedNumber}${lowerSuit}-${lowerElement}.jpeg`)

  // 4. Non-padded, non-hyphenated number-suit format: 9suit-element.jpg (e.g., 1cauldron-air.jpg)
  variants.add(`${numberStr}${lowerSuit}-${lowerElement}.jpg`)
  variants.add(`${numberStr}${lowerSuit}-${lowerElement}.jpeg`)

  // 5. Card ID only format (if element is sometimes omitted in filename, e.g., 9-stone.jpg)
  // This is a less common but possible fallback.
  variants.add(`${cardId.toLowerCase()}.jpg`)
  variants.add(`${cardId.toLowerCase()}.jpeg`)

  return Array.from(variants)
}

export async function getCardImageUrl(cardId: string, baseElement: string): Promise<string> {
  const cacheKey = `${cardId}-${baseElement}`
  if (imageUrlCache.has(cacheKey)) {
    return imageUrlCache.get(cacheKey)!
  }

  // Use the primary generated path for direct URL construction
  const fileName = generateCardImagePath(cardId, baseElement)
  const blobPath = `cards/${fileName}` // Assuming images are in a 'cards' folder in your blob storage

  try {
    // Construct the public image URL using the correct BLOB_BASE_URL
    const imageUrl = `${BLOB_BASE_URL}/${blobPath}`
    imageUrlCache.set(cacheKey, imageUrl)
    return imageUrl
  } catch (error) {
    console.warn(`Could not find blob for ${fileName}, falling back to placeholder. Error:`, error)
    // Fallback to a generic placeholder if the specific image is not found
    return `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardId)}`
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
  const totalImages = cardIds.length * elements.length // Assuming each card has an image for each element

  const imagePromises: Promise<void>[] = []

  for (const cardId of cardIds) {
    for (const element of elements) {
      const cacheKey = `${cardId}-${element}`
      if (imageUrlCache.has(cacheKey)) {
        loadedCount++
        onProgress?.(loadedCount, totalImages)
        continue
      }

      // Use the primary generated path for preloading attempt
      const fileName = generateCardImagePath(cardId, element)
      const blobPath = `cards/${fileName}`

      imagePromises.push(
        (async () => {
          try {
            const imageUrl = `${BLOB_BASE_URL}/${blobPath}`
            const img = new Image()
            img.crossOrigin = "anonymous" // Set crossOrigin for CORS
            img.src = imageUrl
            await new Promise((resolve, reject) => {
              img.onload = () => {
                imageUrlCache.set(cacheKey, imageUrl)
                loadedCount++
                onProgress?.(loadedCount, totalImages)
                resolve(void 0)
              }
              img.onerror = (e) => {
                console.warn(`Failed to load image: ${imageUrl}`, e)
                failedCount++
                onProgress?.(loadedCount, totalImages)
                // Store placeholder URL in cache for failed images
                imageUrlCache.set(cacheKey, `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardId)}`)
                resolve(void 0) // Resolve even on error to allow Promise.all to complete
              }
            })
          } catch (error) {
            console.warn(`Error preloading image ${fileName}:`, error)
            failedCount++
            onProgress?.(loadedCount, totalImages)
            imageUrlCache.set(cacheKey, `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardId)}`)
          }
        })(),
      )
    }
  }

  await Promise.all(imagePromises)

  const totalTime = Date.now() - startTime
  return { loaded: loadedCount, total: totalImages, failed: failedCount, totalTime }
}
