// Comprehensive blob storage manager for all card images with local fallback
const BLOB_STORAGE_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com"
const CARDS_PREFIX = "cards/"

// Enhanced interfaces for comprehensive image management
interface BlobImageMetadata {
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
}

interface ImageLoadingProgress {
  total: number
  loaded: number
  failed: number
  currentFile: string
  percentage: number
  errors: string[]
  warnings: string[]
}

interface ComprehensiveImageCache {
  images: Map<string, BlobImageMetadata>
  byCardId: Map<string, BlobImageMetadata[]>
  bySuit: Map<string, BlobImageMetadata[]>
  byElement: Map<string, BlobImageMetadata[]>
  lastUpdated: number
  totalSize: number
  validImages: number
  invalidImages: number
}

// Global cache instance
const comprehensiveCache: ComprehensiveImageCache = {
  images: new Map(),
  byCardId: new Map(),
  bySuit: new Map(),
  byElement: new Map(),
  lastUpdated: 0,
  totalSize: 0,
  validImages: 0,
  invalidImages: 0,
}

// Performance tracking
interface PerformanceMetrics {
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  averageLoadTime: number
  cacheHitRate: number
  lastRefreshTime: number
  refreshCount: number
}

const performanceMetrics: PerformanceMetrics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  averageLoadTime: 0,
  cacheHitRate: 0,
  lastRefreshTime: 0,
  refreshCount: 0,
}

/**
 * Get all known card images from the project files
 */
function getKnownLocalImages(): Array<{
  filename: string
  url: string
  size: number
  uploadedAt: string
  source: "local"
}> {
  // Based on the existing card files in the project
  const knownImages = [
    "01cauldron-fire.jpg",
    "01cauldron-air.jpg",
    "01cauldron-earth.jpg",
    "01cauldron-water.jpg",
    "01cauldron-spirit.jpg",
    "10cauldron-fire.jpg",
    "10cauldron-air.jpg",
    "10cauldron-earth.jpg",
    "10cauldron-water.jpg",
    "10cauldron-spirit.jpg",
    "25sword-fire.jpg",
    "25sword-air.jpg",
    "25sword-earth.jpg",
    "25sword-water.jpg",
    "25sword-spirit.jpg",
    "38cord-fire.jpg",
    "38cord-air.jpg",
    "38cord-earth.jpg",
    "38cord-water.jpg",
    "38cord-spirit.jpg",
    "47spear-fire.jpg",
    "47spear-air.jpg",
    "47spear-earth.jpg",
    "47spear-water.jpg",
    "47spear-spirit.jpg",
    "52sword-fire.jpg",
    "52sword-air.jpg",
    "52sword-earth.jpg",
    "52sword-water.jpg",
    "52sword-spirit.jpg",
    "69stone-fire.jpg",
    "69stone-air.jpg",
    "69stone-earth.jpg",
    "69stone-water.jpg",
    "69stone-spirit.jpg",
    "74spear-fire.jpg",
    "74spear-air.jpg",
    "74spear-earth.jpg",
    "74spear-water.jpg",
    "74spear-spirit.jpg",
    "83cord-fire.jpg",
    "83cord-air.jpg",
    "83cord-earth.jpg",
    "83cord-water.jpg",
    "83cord-spirit.jpg",
    "96stone-fire.jpg",
    "96stone-air.jpg",
    "96stone-earth.jpg",
    "96stone-water.jpg",
    "96stone-spirit.jpg",
  ]

  return knownImages.map((filename) => ({
    filename,
    url: `/cards/${filename}`,
    size: 0, // Unknown size for local files
    uploadedAt: new Date().toISOString(),
    source: "local" as const,
  }))
}

/**
 * Fetch blob list through our API endpoint (server-side with token)
 */
async function fetchBlobList(): Promise<any[]> {
  try {
    const response = await fetch("/api/blob/list-cards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (data.fallback) {
      console.log("🔄 Blob storage not available, using local images")
      return []
    }

    return data.blobs || []
  } catch (error) {
    console.error("Failed to fetch blob list through API:", error)
    return []
  }
}

/**
 * Comprehensive function to fetch ALL available card images from multiple sources
 */
export async function fetchAllCardImages(onProgress?: (progress: ImageLoadingProgress) => void): Promise<{
  success: boolean
  images: BlobImageMetadata[]
  totalFound: number
  validImages: number
  invalidImages: number
  errors: string[]
  loadTime: number
}> {
  const startTime = Date.now()
  const errors: string[] = []
  const warnings: string[] = []

  try {
    // Step 1: Get local images first (always available)
    onProgress?.({
      total: 0,
      loaded: 0,
      failed: 0,
      currentFile: "Loading local card images...",
      percentage: 0,
      errors: [],
      warnings: [],
    })

    const localImages = getKnownLocalImages()
    console.log(`📁 Found ${localImages.length} local card images`)

    // Step 2: Try to get blob storage images (optional)
    onProgress?.({
      total: localImages.length,
      loaded: 0,
      failed: 0,
      currentFile: "Checking blob storage...",
      percentage: 10,
      errors: [],
      warnings: [],
    })

    let blobImages: any[] = []
    try {
      blobImages = await fetchBlobList()
      if (blobImages.length > 0) {
        console.log(`☁️ Found ${blobImages.length} additional images in blob storage`)
      } else {
        console.log("☁️ No additional images found in blob storage")
      }
    } catch (blobError) {
      console.warn("Blob storage not accessible:", blobError)
      warnings.push("Blob storage not accessible - using local images only")
    }

    // Step 3: Combine all image sources
    const allImageSources = [
      ...localImages.map((img) => ({ ...img, source: "local" as const })),
      ...blobImages.map((img) => ({ ...img, source: "blob" as const })),
    ]

    if (allImageSources.length === 0) {
      throw new Error("No card images found from any source")
    }

    console.log(`🎴 Processing ${allImageSources.length} total images from all sources`)

    // Step 4: Process each image and extract metadata
    const imageMetadata: BlobImageMetadata[] = []
    let validCount = 0
    let invalidCount = 0

    for (let i = 0; i < allImageSources.length; i++) {
      const imageSource = allImageSources[i]
      const filename = imageSource.filename

      onProgress?.({
        total: allImageSources.length,
        loaded: i,
        failed: invalidCount,
        currentFile: filename,
        percentage: 20 + (i / allImageSources.length) * 40, // 20-60% for processing
        errors: errors.slice(-5),
        warnings: warnings.slice(-5),
      })

      try {
        const metadata = await processImageSource(imageSource, filename)
        imageMetadata.push(metadata)

        if (metadata.isValid) {
          validCount++
        } else {
          invalidCount++
          warnings.push(`Invalid image format or naming: ${filename}`)
        }
      } catch (error) {
        invalidCount++
        const errorMsg = `Failed to process ${filename}: ${error instanceof Error ? error.message : "Unknown error"}`
        errors.push(errorMsg)
        console.warn(errorMsg)
      }
    }

    // Step 5: Verify image accessibility (sample verification for performance)
    onProgress?.({
      total: imageMetadata.length,
      loaded: 0,
      failed: invalidCount,
      currentFile: "Verifying image accessibility...",
      percentage: 60,
      errors: errors.slice(-5),
      warnings: warnings.slice(-5),
    })

    const verifiedImages: BlobImageMetadata[] = []

    // Verify a sample of images for performance (verify first 10 and every 5th after that)
    for (let i = 0; i < imageMetadata.length; i++) {
      const metadata = imageMetadata[i]
      const shouldVerify = i < 10 || i % 5 === 0

      onProgress?.({
        total: imageMetadata.length,
        loaded: i,
        failed: invalidCount,
        currentFile: shouldVerify ? `Verifying ${metadata.filename}...` : `Processing ${metadata.filename}...`,
        percentage: 60 + (i / imageMetadata.length) * 40, // 60-100% for verification
        errors: errors.slice(-5),
        warnings: warnings.slice(-5),
      })

      if (shouldVerify) {
        try {
          const verificationResult = await verifyImageAccessibility(metadata)
          verifiedImages.push({
            ...metadata,
            isValid: verificationResult.isAccessible,
            loadTime: verificationResult.loadTime,
            lastVerified: new Date().toISOString(),
          })

          if (!verificationResult.isAccessible) {
            warnings.push(`Image not accessible: ${metadata.filename}`)
          }
        } catch (error) {
          errors.push(
            `Verification failed for ${metadata.filename}: ${error instanceof Error ? error.message : "Unknown error"}`,
          )
          verifiedImages.push({
            ...metadata,
            isValid: false,
            lastVerified: new Date().toISOString(),
          })
        }
      } else {
        // Skip verification for performance, assume valid
        verifiedImages.push({
          ...metadata,
          lastVerified: new Date().toISOString(),
        })
      }
    }

    // Step 6: Update comprehensive cache
    updateComprehensiveCache(verifiedImages)

    // Step 7: Update performance metrics
    performanceMetrics.totalRequests++
    performanceMetrics.successfulRequests++
    performanceMetrics.lastRefreshTime = Date.now()
    performanceMetrics.refreshCount++

    const loadTime = Date.now() - startTime

    onProgress?.({
      total: verifiedImages.length,
      loaded: verifiedImages.length,
      failed: invalidCount,
      currentFile: "Complete!",
      percentage: 100,
      errors: errors.slice(-5),
      warnings: warnings.slice(-5),
    })

    console.log(`✅ Successfully processed ${verifiedImages.length} images in ${loadTime}ms`)
    console.log(`📊 Sources: ${localImages.length} local, ${blobImages.length} blob`)

    return {
      success: true,
      images: verifiedImages,
      totalFound: allImageSources.length,
      validImages: verifiedImages.filter((img) => img.isValid).length,
      invalidImages: verifiedImages.filter((img) => !img.isValid).length,
      errors,
      loadTime,
    }
  } catch (error) {
    performanceMetrics.totalRequests++
    performanceMetrics.failedRequests++

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    errors.push(errorMessage)

    console.error("❌ Failed to fetch card images:", errorMessage)

    return {
      success: false,
      images: [],
      totalFound: 0,
      validImages: 0,
      invalidImages: 0,
      errors,
      loadTime: Date.now() - startTime,
    }
  }
}

/**
 * Process individual image source and extract card metadata
 */
async function processImageSource(imageSource: any, filename: string): Promise<BlobImageMetadata> {
  // Extract card information from filename
  const cardInfo = parseCardFilename(filename)

  return {
    filename,
    url: imageSource.url,
    size: imageSource.size || 0,
    uploadedAt: imageSource.uploadedAt || new Date().toISOString(),
    cardId: cardInfo.cardId,
    element: cardInfo.element,
    suit: cardInfo.suit,
    number: cardInfo.number,
    isValid: cardInfo.isValid && isValidImageFormat(filename),
    source: imageSource.source || "local",
  }
}

/**
 * Parse card filename to extract card information
 */
function parseCardFilename(filename: string): {
  cardId?: string
  element?: string
  suit?: string
  number?: string
  isValid: boolean
} {
  try {
    // Remove file extension
    const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp)$/i, "")

    // Common patterns for card filenames
    const patterns = [
      // Pattern: 01cauldron-fire.jpg
      /^(\d{1,2})([a-z]+)-([a-z]+)$/i,
      // Pattern: 1-cauldron-fire.jpg
      /^(\d{1,2})-([a-z]+)-([a-z]+)$/i,
      // Pattern: cauldron01fire.jpg
      /^([a-z]+)(\d{1,2})([a-z]+)$/i,
      // Pattern: 01_cauldron_fire.jpg
      /^(\d{1,2})_([a-z]+)_([a-z]+)$/i,
    ]

    for (const pattern of patterns) {
      const match = nameWithoutExt.match(pattern)
      if (match) {
        const [, numberPart, suitPart, elementPart] = match

        // Normalize the parts
        const number = numberPart.padStart(2, "0")
        const suit = suitPart.toLowerCase()
        const element = elementPart.toLowerCase()

        // Validate suit and element
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
 * Verify that an image is accessible and loads properly
 */
async function verifyImageAccessibility(
  metadata: BlobImageMetadata,
): Promise<{ isAccessible: boolean; loadTime: number }> {
  return new Promise((resolve) => {
    const startTime = Date.now()
    const img = new Image()
    img.crossOrigin = "anonymous"

    const timeout = setTimeout(() => {
      resolve({ isAccessible: false, loadTime: Date.now() - startTime })
    }, 5000) // Reduced timeout for better performance

    img.onload = () => {
      clearTimeout(timeout)
      resolve({ isAccessible: true, loadTime: Date.now() - startTime })
    }

    img.onerror = () => {
      clearTimeout(timeout)
      resolve({ isAccessible: false, loadTime: Date.now() - startTime })
    }

    img.src = metadata.url
  })
}

/**
 * Update the comprehensive cache with new image data
 */
function updateComprehensiveCache(images: BlobImageMetadata[]): void {
  // Clear existing cache
  comprehensiveCache.images.clear()
  comprehensiveCache.byCardId.clear()
  comprehensiveCache.bySuit.clear()
  comprehensiveCache.byElement.clear()

  let totalSize = 0
  let validCount = 0
  let invalidCount = 0

  // Populate cache
  images.forEach((image) => {
    // Main images map
    comprehensiveCache.images.set(image.filename, image)

    // Group by card ID
    if (image.cardId) {
      if (!comprehensiveCache.byCardId.has(image.cardId)) {
        comprehensiveCache.byCardId.set(image.cardId, [])
      }
      comprehensiveCache.byCardId.get(image.cardId)!.push(image)
    }

    // Group by suit
    if (image.suit) {
      if (!comprehensiveCache.bySuit.has(image.suit)) {
        comprehensiveCache.bySuit.set(image.suit, [])
      }
      comprehensiveCache.bySuit.get(image.suit)!.push(image)
    }

    // Group by element
    if (image.element) {
      if (!comprehensiveCache.byElement.has(image.element)) {
        comprehensiveCache.byElement.set(image.element, [])
      }
      comprehensiveCache.byElement.get(image.element)!.push(image)
    }

    totalSize += image.size
    if (image.isValid) validCount++
    else invalidCount++
  })

  // Update cache metadata
  comprehensiveCache.lastUpdated = Date.now()
  comprehensiveCache.totalSize = totalSize
  comprehensiveCache.validImages = validCount
  comprehensiveCache.invalidImages = invalidCount

  console.log(`🔄 Cache updated: ${images.length} images, ${validCount} valid, ${invalidCount} invalid`)
}

// Export all the existing functions...
export function getCardImageFromCache(cardId: string, element: string): BlobImageMetadata | null {
  const cardImages = comprehensiveCache.byCardId.get(cardId) || []
  return cardImages.find((img) => img.element === element.toLowerCase()) || null
}

export function getAllImagesForCard(cardId: string): BlobImageMetadata[] {
  return comprehensiveCache.byCardId.get(cardId) || []
}

export function getImagesBySuit(suit: string): BlobImageMetadata[] {
  return comprehensiveCache.bySuit.get(suit.toLowerCase()) || []
}

export function getImagesByElement(element: string): BlobImageMetadata[] {
  return comprehensiveCache.byElement.get(element.toLowerCase()) || []
}

export function getCacheStatistics(): {
  totalImages: number
  validImages: number
  invalidImages: number
  totalSize: number
  lastUpdated: number
  cacheAge: number
  cardCoverage: number
  elementCoverage: number
  suitCoverage: number
  performance: PerformanceMetrics
  sourceBreakdown: { local: number; blob: number; placeholder: number }
} {
  const cacheAge = Date.now() - comprehensiveCache.lastUpdated

  // Calculate source breakdown
  const sourceBreakdown = { local: 0, blob: 0, placeholder: 0 }
  Array.from(comprehensiveCache.images.values()).forEach((img) => {
    sourceBreakdown[img.source]++
  })

  return {
    totalImages: comprehensiveCache.images.size,
    validImages: comprehensiveCache.validImages,
    invalidImages: comprehensiveCache.invalidImages,
    totalSize: comprehensiveCache.totalSize,
    lastUpdated: comprehensiveCache.lastUpdated,
    cacheAge,
    cardCoverage: comprehensiveCache.byCardId.size,
    elementCoverage: comprehensiveCache.byElement.size,
    suitCoverage: comprehensiveCache.bySuit.size,
    performance: { ...performanceMetrics },
    sourceBreakdown,
  }
}

export function searchImages(query: {
  cardId?: string
  suit?: string
  element?: string
  number?: string
  validOnly?: boolean
  source?: "local" | "blob" | "placeholder"
}): BlobImageMetadata[] {
  let results = Array.from(comprehensiveCache.images.values())

  if (query.cardId) {
    results = results.filter((img) => img.cardId === query.cardId)
  }

  if (query.suit) {
    results = results.filter((img) => img.suit === query.suit.toLowerCase())
  }

  if (query.element) {
    results = results.filter((img) => img.element === query.element.toLowerCase())
  }

  if (query.number) {
    results = results.filter((img) => img.number === query.number)
  }

  if (query.validOnly) {
    results = results.filter((img) => img.isValid)
  }

  if (query.source) {
    results = results.filter((img) => img.source === query.source)
  }

  return results
}

export async function preloadImages(
  images: BlobImageMetadata[],
  onProgress?: (loaded: number, total: number) => void,
): Promise<{ loaded: number; failed: number }> {
  let loaded = 0
  let failed = 0

  const loadPromises = images.map(async (image, index) => {
    try {
      const img = new Image()
      img.crossOrigin = "anonymous"

      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("Timeout")), 5000)

        img.onload = () => {
          clearTimeout(timeout)
          loaded++
          onProgress?.(loaded, images.length)
          resolve()
        }

        img.onerror = () => {
          clearTimeout(timeout)
          failed++
          onProgress?.(loaded, images.length)
          reject(new Error("Load failed"))
        }

        img.src = image.url
      })
    } catch (error) {
      failed++
      onProgress?.(loaded, images.length)
    }
  })

  await Promise.allSettled(loadPromises)
  return { loaded, failed }
}

export function clearComprehensiveCache(): void {
  comprehensiveCache.images.clear()
  comprehensiveCache.byCardId.clear()
  comprehensiveCache.bySuit.clear()
  comprehensiveCache.byElement.clear()
  comprehensiveCache.lastUpdated = 0
  comprehensiveCache.totalSize = 0
  comprehensiveCache.validImages = 0
  comprehensiveCache.invalidImages = 0

  console.log("🧹 Comprehensive cache cleared")
}

export function exportCacheData(): any {
  return {
    images: Array.from(comprehensiveCache.images.entries()),
    byCardId: Array.from(comprehensiveCache.byCardId.entries()),
    bySuit: Array.from(comprehensiveCache.bySuit.entries()),
    byElement: Array.from(comprehensiveCache.byElement.entries()),
    metadata: {
      lastUpdated: comprehensiveCache.lastUpdated,
      totalSize: comprehensiveCache.totalSize,
      validImages: comprehensiveCache.validImages,
      invalidImages: comprehensiveCache.invalidImages,
    },
    performance: performanceMetrics,
  }
}

// New functions for blob management
import { list, del } from "@vercel/blob"

interface BlobInfo {
  url: string
  pathname: string
  size: number
  uploadedAt: Date
  contentType?: string
}

/**
 * Lists all blobs in the storage.
 * @param prefix Optional prefix to filter blobs (e.g., "cards/").
 * @returns A promise that resolves to an array of BlobInfo.
 */
export async function listAllBlobs(prefix?: string): Promise<BlobInfo[]> {
  try {
    const { blobs } = await list({ prefix })
    return blobs.map((blob) => ({
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      uploadedAt: new Date(blob.uploadedAt),
      contentType: blob.contentType,
    }))
  } catch (error) {
    console.error("Error listing blobs:", error)
    throw new Error(`Failed to list blobs: ${error.message}`)
  }
}

/**
 * Deletes a blob from the storage.
 * @param url The URL or pathname of the blob to delete.
 * @returns A promise that resolves when the blob is deleted.
 */
export async function deleteBlob(url: string | string[]): Promise<void> {
  try {
    await del(url)
  } catch (error) {
    console.error("Error deleting blob:", error)
    throw new Error(`Failed to delete blob: ${error.message}`)
  }
}
