// Dynamic blob storage manager for comprehensive card image retrieval
const BLOB_STORAGE_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com"

// Enhanced interfaces for dynamic image management
interface DynamicImageMetadata {
  filename: string
  url: string
  size: number
  uploadedAt: string
  cardId?: string
  element?: string
  suit?: string
  number?: string
  isValid: boolean
  loadTime?: number
  lastVerified?: string
  source: "blob" | "local" | "placeholder"
  retryCount: number
  errorMessage?: string
}

interface ImageLoadingProgress {
  total: number
  loaded: number
  failed: number
  currentFile: string
  percentage: number
  errors: string[]
  warnings: string[]
  stage: "discovering" | "fetching" | "processing" | "verifying" | "complete"
}

interface DynamicImageCache {
  images: Map<string, DynamicImageMetadata>
  byCardId: Map<string, DynamicImageMetadata[]>
  bySuit: Map<string, DynamicImageMetadata[]>
  byElement: Map<string, DynamicImageMetadata[]>
  lastUpdated: number
  totalSize: number
  validImages: number
  invalidImages: number
  blobImages: number
  localImages: number
}

// Global cache instance
const dynamicCache: DynamicImageCache = {
  images: new Map(),
  byCardId: new Map(),
  bySuit: new Map(),
  byElement: new Map(),
  lastUpdated: 0,
  totalSize: 0,
  validImages: 0,
  invalidImages: 0,
  blobImages: 0,
  localImages: 0,
}

// Performance and retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  timeout: 10000,
  batchSize: 10,
  concurrentVerifications: 5,
}

/**
 * Comprehensive function to discover and fetch ALL available card images
 */
export async function fetchAllDynamicCardImages(onProgress?: (progress: ImageLoadingProgress) => void): Promise<{
  success: boolean
  images: DynamicImageMetadata[]
  totalFound: number
  validImages: number
  invalidImages: number
  blobImages: number
  localImages: number
  errors: string[]
  warnings: string[]
  loadTime: number
}> {
  const startTime = Date.now()
  const errors: string[] = []
  const warnings: string[] = []

  try {
    // Stage 1: Discover all available images from multiple sources
    onProgress?.({
      total: 0,
      loaded: 0,
      failed: 0,
      currentFile: "Discovering available images...",
      percentage: 0,
      errors: [],
      warnings: [],
      stage: "discovering",
    })

    const discoveryResult = await discoverAllImages()

    if (discoveryResult.images.length === 0) {
      throw new Error("No card images discovered from any source")
    }

    console.log(`🔍 Discovered ${discoveryResult.images.length} images from ${discoveryResult.sources.length} sources`)

    // Stage 2: Process and validate all discovered images
    onProgress?.({
      total: discoveryResult.images.length,
      loaded: 0,
      failed: 0,
      currentFile: "Processing discovered images...",
      percentage: 10 + (0 / discoveryResult.images.length) * 40, // 10-50%
      errors: [],
      warnings: discoveryResult.warnings,
      stage: "processing",
    })

    const processedImages = await processAllImages(discoveryResult.images, (processed, total) => {
      onProgress?.({
        total,
        loaded: processed,
        failed: 0,
        currentFile: `Processing image ${processed + 1} of ${total}...`,
        percentage: 10 + (processed / total) * 40, // 10-50%
        errors: errors.slice(-5),
        warnings: warnings.slice(-5),
        stage: "processing",
      })
    })

    // Stage 3: Verify image accessibility with optimized batching
    onProgress?.({
      total: processedImages.length,
      loaded: 0,
      failed: 0,
      currentFile: "Verifying image accessibility...",
      percentage: 50 + (0 / processedImages.length) * 50, // 50-100%
      errors: errors.slice(-5),
      warnings: warnings.slice(-5),
      stage: "verifying",
    })

    const verifiedImages = await verifyAllImages(processedImages, (verified, total, failed) => {
      onProgress?.({
        total,
        loaded: verified,
        failed,
        currentFile: `Verified ${verified} of ${total} images...`,
        percentage: 50 + (verified / total) * 50, // 50-100%
        errors: errors.slice(-5),
        warnings: warnings.slice(-5),
        stage: "verifying",
      })
    })

    // Stage 4: Update cache and calculate statistics
    updateDynamicCache(verifiedImages)

    const stats = calculateImageStatistics(verifiedImages)

    onProgress?.({
      total: verifiedImages.length,
      loaded: verifiedImages.length,
      failed: stats.invalidImages,
      currentFile: "Complete!",
      percentage: 100,
      errors: errors.slice(-5),
      warnings: warnings.slice(-5),
      stage: "complete",
    })

    const loadTime = Date.now() - startTime

    console.log(`✅ Successfully processed ${verifiedImages.length} images in ${loadTime}ms`)
    console.log(`📊 Stats: ${stats.blobImages} blob, ${stats.localImages} local, ${stats.validImages} valid`)

    return {
      success: true,
      images: verifiedImages,
      totalFound: discoveryResult.images.length,
      validImages: stats.validImages,
      invalidImages: stats.invalidImages,
      blobImages: stats.blobImages,
      localImages: stats.localImages,
      errors,
      warnings: [...warnings, ...discoveryResult.warnings],
      loadTime,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    errors.push(errorMessage)

    console.error("❌ Failed to fetch dynamic card images:", errorMessage)

    return {
      success: false,
      images: [],
      totalFound: 0,
      validImages: 0,
      invalidImages: 0,
      blobImages: 0,
      localImages: 0,
      errors,
      warnings,
      loadTime: Date.now() - startTime,
    }
  }
}

/**
 * Discover all available images from multiple sources
 */
async function discoverAllImages(): Promise<{
  images: Array<{ filename: string; url: string; size: number; uploadedAt: string; source: string }>
  sources: string[]
  warnings: string[]
}> {
  const allImages: Array<{ filename: string; url: string; size: number; uploadedAt: string; source: string }> = []
  const sources: string[] = []
  const warnings: string[] = []

  // Source 1: Vercel Blob Storage (comprehensive discovery via API) - Prioritized
  try {
    const blobImages = await discoverBlobStorageImages()
    if (blobImages.length > 0) {
      allImages.push(...blobImages.map((img) => ({ ...img, source: "blob" })))
      sources.push("Vercel Blob Storage")
      console.log(`☁️ Found ${blobImages.length} images in blob storage`)
    } else {
      warnings.push(
        "No images found in Vercel Blob Storage via API. Ensure BLOB_READ_WRITE_TOKEN is set and images exist under 'cards/' prefix.",
      )
    }
  } catch (error) {
    warnings.push(`Blob storage discovery failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    console.warn("Blob storage discovery failed:", error)
  }

  // Source 2: Local project images (static list) - Fallback
  try {
    const localImages = await discoverLocalImages()
    if (localImages.length > 0) {
      // Filter out duplicates that might have been found in blob storage
      const uniqueLocalImages = localImages.filter(
        (localImg) => !allImages.some((existing) => existing.filename === localImg.filename),
      )
      if (uniqueLocalImages.length > 0) {
        allImages.push(...uniqueLocalImages.map((img) => ({ ...img, source: "local" })))
        sources.push("Local Project Files")
        console.log(`📁 Found ${uniqueLocalImages.length} unique local images`)
      }
    }
  } catch (error) {
    warnings.push(`Local image discovery failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    console.warn("Local image discovery failed:", error)
  }

  return { images: allImages, sources, warnings }
}

/**
 * Comprehensive blob storage discovery via API endpoint
 */
async function discoverBlobStorageImages(): Promise<
  Array<{
    filename: string
    url: string
    size: number
    uploadedAt: string
  }>
> {
  try {
    const response = await fetch("/api/blob/comprehensive", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`API request failed: ${response.status} - ${errorData.error || response.statusText}`)
    }

    const data = await response.json()

    if (!data.success || !data.blobs) {
      throw new Error(data.error || "API returned no blobs or was unsuccessful")
    }

    return data.blobs.map((blob: any) => ({
      filename: blob.pathname?.split("/").pop() || blob.filename || "",
      url: blob.url || `${BLOB_STORAGE_URL}/${blob.pathname}`,
      size: blob.size || 0,
      uploadedAt: blob.uploadedAt || new Date().toISOString(),
    }))
  } catch (error) {
    console.warn("Blob storage discovery via API failed:", error)
    throw error // Re-throw to be caught by discoverAllImages
  }
}

/**
 * Discover local project images (static list)
 */
async function discoverLocalImages(): Promise<
  Array<{
    filename: string
    url: string
    size: number
    uploadedAt: string
  }>
> {
  // Known local images from the project structure
  const knownLocalImageFilenames = [
    "00-cauldron-earth.jpg",
    "00-cauldron-spirit.jpg",
    "00-cauldron-fire.jpg",
    "00-cauldron-air.jpg",
    "00-cauldron-water.jpg",
    "01-cauldron-fire.jpg",
    "01-cauldron-water.jpg",
    "01-cauldron-earth.jpg",
    "01-cauldron-air.jpg",
    "01-cauldron-spirit.jpg",
    "02-sword-spirit.jpg",
    "02-sword-water.jpg",
    "02-sword-fire.jpg",
    "02-sword-earth.jpg",
    "02-sword-air.jpg",
    "03-cord-water.jpg",
    "03-cord-earth.jpg",
    "03-cord-spirit.jpg",
    "03-cord-air.jpg",
    "03-cord-fire.jpg",
    "04-spear-air.jpg",
    "04-spear-fire.jpg",
    "04-spear-spirit.jpg",
    "04-spear-earth.jpg",
    "04-spear-water.jpg",
    "05-sword-fire.jpg",
    "05-sword-air.jpg",
    "05-sword-earth.jpg",
    "05-sword-spirit.jpg",
    "05-sword-water.jpg",
    "06-stone-spirit.jpg",
    "06-stone-air.jpg",
    "06-stone-water.jpg",
    "06-stone-fire.jpg",
    "06-stone-earth.jpg",
    "07-spear-spirit.jpg",
    "07-spear-water.jpg",
    "07-spear-air.jpg",
    "07-spear-earth.jpg",
    "07-spear-fire.jpg",
    "08-cord-spirit.jpg",
    "08-cord-water.jpg",
    "08-cord-air.jpg",
    "08-cord-earth.jpg",
    "08-cord-fire.jpg",
    "09-stone-earth.jpg",
    "09-stone-spirit.jpg",
    "09-stone-air.jpg",
    "09-stone-fire.jpg",
    "09-stone-water.jpg",
    "6-9-spirit.jpg", // Specific case
  ]

  // Correctly form URLs for images in the public/cards directory
  return knownLocalImageFilenames.map((filename) => ({
    filename: filename,
    url: `/cards/${filename}`, // This is the correct path for Next.js static assets
    size: 0, // Unknown size for local files
    uploadedAt: new Date().toISOString(),
  }))
}

/**
 * Process all discovered images with enhanced parsing
 */
async function processAllImages(
  discoveredImages: Array<{ filename: string; url: string; size: number; uploadedAt: string; source: string }>,
  onProgress?: (processed: number, total: number) => void,
): Promise<DynamicImageMetadata[]> {
  const processedImages: DynamicImageMetadata[] = []

  for (let i = 0; i < discoveredImages.length; i++) {
    const image = discoveredImages[i]

    try {
      const cardInfo = parseCardFilename(image.filename)
      const metadata: DynamicImageMetadata = {
        filename: image.filename,
        url: image.url,
        size: image.size,
        uploadedAt: image.uploadedAt,
        cardId: cardInfo.cardId,
        element: cardInfo.element,
        suit: cardInfo.suit,
        number: cardInfo.number,
        isValid: cardInfo.isValid && isValidImageFormat(image.filename),
        source: image.source as "blob" | "local",
        retryCount: 0,
      }

      processedImages.push(metadata)
    } catch (error) {
      console.warn(`Failed to process image ${image.filename}:`, error)
      // Still add it as invalid for completeness
      processedImages.push({
        filename: image.filename,
        url: image.url,
        size: image.size,
        uploadedAt: image.uploadedAt,
        isValid: false,
        source: image.source as "blob" | "local",
        retryCount: 0,
        errorMessage: error instanceof Error ? error.message : "Processing failed",
      })
    }

    onProgress?.(i + 1, discoveredImages.length)
  }

  return processedImages
}

/**
 * Verify all images with optimized batching and retry logic
 */
async function verifyAllImages(
  images: DynamicImageMetadata[],
  onProgress?: (verified: number, total: number, failed: number) => void,
): Promise<DynamicImageMetadata[]> {
  const verifiedImages: DynamicImageMetadata[] = []
  let verified = 0
  let failed = 0

  // Process in batches for better performance
  for (let i = 0; i < images.length; i += RETRY_CONFIG.batchSize) {
    const batch = images.slice(i, i + RETRY_CONFIG.batchSize)

    const batchResults = await Promise.allSettled(
      batch.map(async (image) => {
        const verificationResult = await verifyImageWithRetry(image)
        return {
          ...image,
          isValid: verificationResult.isAccessible,
          loadTime: verificationResult.loadTime,
          lastVerified: new Date().toISOString(),
          retryCount: verificationResult.retryCount,
          errorMessage: verificationResult.errorMessage,
        }
      }),
    )

    batchResults.forEach((result) => {
      if (result.status === "fulfilled") {
        verifiedImages.push(result.value)
        if (result.value.isValid) {
          verified++
        } else {
          failed++
        }
      } else {
        failed++
        console.warn("Batch verification failed:", result.reason)
      }
    })

    onProgress?.(verified, images.length, failed)

    // Small delay between batches to avoid overwhelming the server
    if (i + RETRY_CONFIG.batchSize < images.length) {
      await new Promise((resolve) => setTimeout(resolve, 200))
    }
  }

  return verifiedImages
}

/**
 * Verify image accessibility with retry logic
 */
async function verifyImageWithRetry(image: DynamicImageMetadata): Promise<{
  isAccessible: boolean
  loadTime: number
  retryCount: number
  errorMessage?: string
}> {
  let retryCount = 0
  let lastError: string | undefined

  while (retryCount <= RETRY_CONFIG.maxRetries) {
    try {
      const result = await verifyImageAccessibility(image.url)
      return {
        isAccessible: result.isAccessible,
        loadTime: result.loadTime,
        retryCount,
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Unknown error"
      console.error(
        `Image verification failed for ${image.url} (Attempt ${retryCount + 1}/${RETRY_CONFIG.maxRetries + 1}): ${lastError}`,
      )
      retryCount++

      if (retryCount <= RETRY_CONFIG.maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_CONFIG.retryDelay * retryCount))
      }
    }
  }

  return {
    isAccessible: false,
    loadTime: 0,
    retryCount,
    errorMessage: lastError,
  }
}

/**
 * Verify individual image accessibility
 */
async function verifyImageAccessibility(url: string): Promise<{
  isAccessible: boolean
  loadTime: number
}> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    const img = new Image()

    // Only set crossOrigin for blob URLs to avoid issues with local files
    if (url.startsWith(BLOB_STORAGE_URL)) {
      img.crossOrigin = "anonymous"
    }

    const timeout = setTimeout(() => {
      img.onerror = null // Prevent double error handling
      img.onload = null
      reject(new Error(`Image verification timed out for URL: ${url}`))
    }, RETRY_CONFIG.timeout)

    img.onload = () => {
      clearTimeout(timeout)
      resolve({
        isAccessible: true,
        loadTime: Date.now() - startTime,
      })
    }

    img.onerror = (event) => {
      clearTimeout(timeout)
      const errorType = url.startsWith("/cards/") ? "local static asset" : "blob storage image"
      const errorMsg = `Failed to load ${errorType}: ${url}. Event: ${JSON.stringify(event)}`
      console.error(errorMsg)
      resolve({
        isAccessible: false,
        loadTime: Date.now() - startTime,
      })
    }

    try {
      img.src = url
    } catch (e) {
      clearTimeout(timeout)
      const errorType = url.startsWith("/cards/") ? "local static asset" : "blob storage image"
      const errorMsg = `Synchronous error setting src for ${errorType}: ${url}. Error: ${e instanceof Error ? e.message : String(e)}`
      console.error(errorMsg)
      resolve({
        isAccessible: false,
        loadTime: Date.now() - startTime,
      })
    }
  })
}

/**
 * Enhanced card filename parsing
 */
function parseCardFilename(filename: string): {
  cardId?: string
  element?: string
  suit?: string
  number?: string
  isValid: boolean
} {
  try {
    const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp)$/i, "")

    // Pattern 1: XXsuit-element (e.g., 01cauldron-fire, 69stone-spirit)
    const pattern1 = /^(\d{1,2})([a-z]+)-([a-z]+)$/i
    let match = nameWithoutExt.match(pattern1)
    if (match) {
      const [, numberPart, suitPart, elementPart] = match
      const number = numberPart.padStart(2, "0")
      const suit = suitPart.toLowerCase()
      const element = elementPart.toLowerCase()

      const validSuits = ["cauldron", "sword", "spear", "stone", "cord"]
      const validElements = ["fire", "water", "air", "earth", "spirit"]

      if (validSuits.includes(suit) && validElements.includes(element)) {
        return {
          cardId: `${Number.parseInt(numberPart, 10)}-${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
          element,
          suit,
          number,
          isValid: true,
        }
      }
    }

    // Pattern 2: XX-suit-element (e.g., 01-cauldron-fire)
    const pattern2 = /^(\d{1,2})-([a-z]+)-([a-z]+)$/i
    match = nameWithoutExt.match(pattern2)
    if (match) {
      const [, numberPart, suitPart, elementPart] = match
      const number = numberPart.padStart(2, "0")
      const suit = suitPart.toLowerCase()
      const element = elementPart.toLowerCase()

      const validSuits = ["cauldron", "sword", "spear", "stone", "cord"]
      const validElements = ["fire", "water", "air", "earth", "spirit"]

      if (validSuits.includes(suit) && validElements.includes(element)) {
        return {
          cardId: `${Number.parseInt(numberPart, 10)}-${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
          element,
          suit,
          number,
          isValid: true,
        }
      }
    }

    // Specific case: 6-9-spirit.jpg (or similar hyphenated numbers)
    if (nameWithoutExt.toLowerCase() === "6-9-spirit") {
      return {
        cardId: "6-9-Spirit",
        element: "spirit",
        suit: "stone", // Assuming 'stone' as a default suit for this special card
        number: "6-9",
        isValid: true,
      }
    }

    return { isValid: false }
  } catch (error) {
    console.warn(`Failed to parse filename: ${filename}`, error)
    return { isValid: false }
  }
}

/**
 * Check if filename has valid image format
 */
function isValidImageFormat(filename: string): boolean {
  const validExtensions = [".jpg", ".jpeg", ".png", ".webp"]
  return validExtensions.some((ext) => filename.toLowerCase().endsWith(ext))
}

/**
 * Calculate comprehensive image statistics
 */
function calculateImageStatistics(images: DynamicImageMetadata[]): {
  validImages: number
  invalidImages: number
  blobImages: number
  localImages: number
} {
  return images.reduce(
    (stats, image) => {
      if (image.isValid) stats.validImages++
      else stats.invalidImages++

      if (image.source === "blob") stats.blobImages++
      else if (image.source === "local") stats.localImages++

      return stats
    },
    { validImages: 0, invalidImages: 0, blobImages: 0, localImages: 0 },
  )
}

/**
 * Update the dynamic cache with new image data
 */
function updateDynamicCache(images: DynamicImageMetadata[]): void {
  // Clear existing cache
  dynamicCache.images.clear()
  dynamicCache.byCardId.clear()
  dynamicCache.bySuit.clear()
  dynamicCache.byElement.clear()

  let totalSize = 0
  let validCount = 0
  let invalidCount = 0
  let blobCount = 0
  let localCount = 0

  // Populate cache
  images.forEach((image) => {
    dynamicCache.images.set(image.filename, image)

    if (image.cardId) {
      if (!dynamicCache.byCardId.has(image.cardId)) {
        dynamicCache.byCardId.set(image.cardId, [])
      }
      dynamicCache.byCardId.get(image.cardId)!.push(image)
    }

    if (image.suit) {
      if (!dynamicCache.bySuit.has(image.suit)) {
        dynamicCache.bySuit.set(image.suit, [])
      }
      dynamicCache.bySuit.get(image.suit)!.push(image)
    }

    if (image.element) {
      if (!dynamicCache.byElement.has(image.element)) {
        dynamicCache.byElement.set(image.element, [])
      }
      dynamicCache.byElement.get(image.element)!.push(image)
    }

    totalSize += image.size
    if (image.isValid) validCount++
    else invalidCount++
    if (image.source === "blob") blobCount++
    else if (image.source === "local") localCount++
  })

  // Update cache metadata
  dynamicCache.lastUpdated = Date.now()
  dynamicCache.totalSize = totalSize
  dynamicCache.validImages = validCount
  dynamicCache.invalidImages = invalidCount
  dynamicCache.blobImages = blobCount
  dynamicCache.localImages = localCount

  console.log(`🔄 Dynamic cache updated: ${images.length} images, ${validCount} valid, ${invalidCount} invalid`)
}

// Export functions for external use
export function getDynamicCacheStatistics() {
  return {
    totalImages: dynamicCache.images.size,
    validImages: dynamicCache.validImages,
    invalidImages: dynamicCache.invalidImages,
    blobImages: dynamicCache.blobImages,
    localImages: dynamicCache.localImages,
    totalSize: dynamicCache.totalSize,
    lastUpdated: dynamicCache.lastUpdated,
    cacheAge: Date.now() - dynamicCache.lastUpdated,
    cardCoverage: dynamicCache.byCardId.size,
    elementCoverage: dynamicCache.byElement.size,
    suitCoverage: dynamicCache.bySuit.size,
  }
}

export function getDynamicImagesByCard(cardId: string): DynamicImageMetadata[] {
  return dynamicCache.byCardId.get(cardId) || []
}

export function getDynamicImagesByElement(element: string): DynamicImageMetadata[] {
  return dynamicCache.byElement.get(element.toLowerCase()) || []
}

export function getDynamicImagesBySuit(suit: string): DynamicImageMetadata[] {
  return dynamicCache.bySuit.get(suit.toLowerCase()) || []
}

export function searchDynamicImages(query: {
  cardId?: string
  suit?: string
  element?: string
  source?: "blob" | "local"
  validOnly?: boolean
}): DynamicImageMetadata[] {
  let results = Array.from(dynamicCache.images.values())

  if (query.cardId) {
    results = results.filter((img) => img.cardId === query.cardId)
  }
  if (query.suit) {
    results = results.filter((img) => img.suit === query.suit.toLowerCase())
  }
  if (query.element) {
    results = results.filter((img) => img.element === query.element.toLowerCase())
  }
  if (query.source) {
    results = results.filter((img) => img.source === query.source)
  }
  if (query.validOnly) {
    results = results.filter((img) => img.isValid)
  }

  return results
}

export function clearDynamicCache(): void {
  dynamicCache.images.clear()
  dynamicCache.byCardId.clear()
  dynamicCache.bySuit.clear()
  dynamicCache.byElement.clear()
  dynamicCache.lastUpdated = 0
  dynamicCache.totalSize = 0
  dynamicCache.validImages = 0
  dynamicCache.invalidImages = 0
  dynamicCache.blobImages = 0
  dynamicCache.localImages = 0

  console.log("🧹 Dynamic cache cleared")
}
