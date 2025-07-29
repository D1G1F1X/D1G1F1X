const BLOB_BASE_URL = "https://0clhhm0umusm8qjw.public.blob.vercel-storage.com"

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
 * This accounts for different naming conventions that might exist in the blob storage or local assets.
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
    console.log(`[getCardImageUrl] Cache hit for ${cacheKey}: ${imageUrlCache.get(cacheKey)}`)
    return imageUrlCache.get(cacheKey)!
  }

  let resolvedUrl: string | null = null
  const placeholderUrl = `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardId)}`

  // Attempt 1: Fetch from the API (which checks blob storage)
  console.log(`[getCardImageUrl] Attempting API fetch for ${cacheKey}...`)
  try {
    const response = await fetch(`/api/blob/card-images?cardId=${cardId}&element=${baseElement}`)
    const data = await response.json()

    if (data.success && data.imageUrl) {
      resolvedUrl = data.imageUrl
      console.log(`[getCardImageUrl] ✅ API provided URL for ${cacheKey}: ${resolvedUrl}`)
    } else {
      console.warn(
        `[getCardImageUrl] API did not provide image URL for ${cacheKey}: ${data.message || "Unknown API error"}`,
      )
    }
  } catch (apiError) {
    console.warn(`[getCardImageUrl] Failed to fetch image URL from API for ${cacheKey}:`, apiError)
  }

  // Attempt 2: Fallback to local static assets if API failed or didn't find it
  if (!resolvedUrl) {
    console.log(`[getCardImageUrl] API failed or not found, attempting local fallbacks for ${cacheKey}...`)
    const localVariants = generateCardImagePathVariants(cardId, baseElement)
    for (const variant of localVariants) {
      const localPath = `/cards/${variant}`
      try {
        // Check if the local image exists by trying to load it
        const img = new Image()
        img.src = localPath
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = () => reject()
        })
        resolvedUrl = localPath
        console.log(`[getCardImageUrl] 📁 Found local fallback for ${cacheKey}: ${resolvedUrl}`)
        break // Found a local image, stop checking
      } catch (localError) {
        console.log(`[getCardImageUrl] Local path failed for ${cacheKey}: ${localPath}`)
        // Continue to next local variant
      }
    }
  }

  // Final Fallback: Placeholder SVG
  if (!resolvedUrl) {
    resolvedUrl = placeholderUrl
    console.warn(`[getCardImageUrl] ❌ All attempts failed for ${cacheKey}. Falling back to placeholder.`)
  }

  imageUrlCache.set(cacheKey, resolvedUrl)
  return resolvedUrl
}

export async function preloadCardImages(
  cardIds: string[],
  elements: string[],
  onProgress?: (loaded: number, total: number) => void,
): Promise<PreloadResult> {
  const startTime = Date.now()
  let loadedCount = 0
  let failedCount = 0
  const totalImages = cardIds.length * elements.length // Assuming all combinations are relevant for preloading

  const imagePromises: Promise<void>[] = []

  for (const cardId of cardIds) {
    for (const element of elements) {
      const cacheKey = `${cardId}-${element}`
      if (imageUrlCache.has(cacheKey)) {
        loadedCount++
        onProgress?.(loadedCount, totalImages)
        continue
      }

      imagePromises.push(
        (async () => {
          let imageUrlToLoad: string | null = null
          try {
            // Fetch the correct URL using the robust getCardImageUrl
            imageUrlToLoad = await getCardImageUrl(cardId, element)

            const img = new Image()
            // Set crossOrigin only for external URLs (blob storage)
            if (imageUrlToLoad.startsWith("http")) {
              img.crossOrigin = "anonymous"
            }
            img.src = imageUrlToLoad

            await new Promise((resolve, reject) => {
              img.onload = () => {
                imageUrlCache.set(cacheKey, imageUrlToLoad!)
                loadedCount++
                onProgress?.(loadedCount, totalImages)
                resolve(void 0)
              }
              img.onerror = (e) => {
                console.warn(`[preloadCardImages] Failed to load preloaded image: ${imageUrlToLoad}`, e)
                failedCount++
                onProgress?.(loadedCount, totalImages)
                // Store placeholder URL in cache for failed images
                imageUrlCache.set(cacheKey, `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardId)}`)
                resolve(void 0) // Resolve even on error to allow Promise.all to complete
              }
            })
          } catch (error) {
            console.warn(`[preloadCardImages] Error preloading image for ${cacheKey}:`, error)
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
