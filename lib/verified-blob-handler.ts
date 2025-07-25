/**
 * Verified and optimized card image handler for Vercel Blob Storage
 * URL: https://hebbkx1anhila5yf.public.blob.vercel-storage.com/
 */

import { list, head } from "@vercel/blob"

// Verified blob storage configuration
const VERIFIED_BLOB_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com"
const CARDS_PREFIX = "cards/"

// Enhanced error types for better debugging
export enum ImageRetrievalError {
  NETWORK_ERROR = "NETWORK_ERROR",
  INVALID_FORMAT = "INVALID_FORMAT",
  NOT_FOUND = "NOT_FOUND",
  TIMEOUT = "TIMEOUT",
  BLOB_API_ERROR = "BLOB_API_ERROR",
  CACHE_ERROR = "CACHE_ERROR",
}

interface ImageValidationResult {
  isValid: boolean
  format?: string
  size?: number
  dimensions?: { width: number; height: number }
  error?: string
}

interface EnhancedImageCacheEntry {
  url: string
  timestamp: number
  loadTime: number
  size: number
  format: string
  verified: boolean
  attempts: number
  lastError?: string
}

interface LoadingMetrics {
  totalRequests: number
  successfulLoads: number
  failedLoads: number
  averageLoadTime: number
  cacheHits: number
  networkRequests: number
}

// Enhanced cache with verification tracking
let verifiedImageCache: Record<string, EnhancedImageCacheEntry> = {}
let cacheTimestamp = 0
let loadingMetrics: LoadingMetrics = {
  totalRequests: 0,
  successfulLoads: 0,
  failedLoads: 0,
  averageLoadTime: 0,
  cacheHits: 0,
  networkRequests: 0,
}

const CACHE_DURATION = 15 * 60 * 1000 // 15 minutes
const REQUEST_TIMEOUT = 8000 // 8 seconds
const MAX_RETRY_ATTEMPTS = 3
const SUPPORTED_FORMATS = ["jpg", "jpeg", "png", "webp"]

interface BlobVerificationResult {
  pathname: string
  url: string
  exists: boolean
  verified: boolean
  message: string
}

/**
 * Verifies the existence and basic integrity of a single blob.
 * @param pathname The pathname of the blob to verify (e.g., "cards/my-card.jpg").
 * @returns A promise that resolves to a BlobVerificationResult.
 */
export async function verifyBlob(pathname: string): Promise<BlobVerificationResult> {
  try {
    const blob = await head(pathname) // Use head to get metadata without downloading content
    if (blob) {
      // Check if it's an image based on content-type
      const isImage = blob.contentType?.startsWith("image/")
      return {
        pathname: blob.pathname,
        url: blob.url,
        exists: true,
        verified: isImage, // Consider it "verified" if it's an image type
        message: isImage ? "Blob exists and is an image." : "Blob exists but is not an image.",
      }
    } else {
      return {
        pathname: pathname,
        url: `https://blob.vercel-storage.com/v1/assets/${pathname}`, // Construct potential URL
        exists: false,
        verified: false,
        message: "Blob does not exist.",
      }
    }
  } catch (error) {
    console.error(`Error verifying blob ${pathname}:`, error)
    return {
      pathname: pathname,
      url: `https://blob.vercel-storage.com/v1/assets/${pathname}`,
      exists: false,
      verified: false,
      message: `Verification failed: ${error.message}`,
    }
  }
}

/**
 * Verifies all blobs in the storage, optionally filtered by a prefix.
 * @param prefix Optional prefix to filter blobs (e.g., "cards/").
 * @returns A promise that resolves to an array of BlobVerificationResult.
 */
export async function verifyAllBlobs(prefix?: string): Promise<BlobVerificationResult[]> {
  const results: BlobVerificationResult[] = []
  try {
    const { blobs } = await list({ prefix })

    for (const blob of blobs) {
      const isImage = blob.contentType?.startsWith("image/")
      results.push({
        pathname: blob.pathname,
        url: blob.url,
        exists: true,
        verified: isImage,
        message: isImage ? "Blob exists and is an image." : "Blob exists but is not an image.",
      })
    }
  } catch (error) {
    console.error("Error listing or verifying all blobs:", error)
    results.push({
      pathname: "N/A",
      url: "N/A",
      exists: false,
      verified: false,
      message: `Failed to list blobs: ${error.message}`,
    })
  }
  return results
}

/**
 * Verifies the blob storage URL and lists available images
 */
export async function verifyBlobStorageAndListImages(): Promise<{
  isValid: boolean
  images: any[]
  totalSize: number
  error?: string
}> {
  try {
    console.log(`🔍 Verifying blob storage: ${VERIFIED_BLOB_URL}`)

    const startTime = Date.now()
    const { blobs } = (await Promise.race([
      list({ prefix: CARDS_PREFIX }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Blob listing timeout")), REQUEST_TIMEOUT)),
    ])) as { blobs: any[] }

    const loadTime = Date.now() - startTime
    const totalSize = blobs.reduce((sum, blob) => sum + (blob.size || 0), 0)

    // Verify blob URLs are accessible
    const sampleBlob = blobs[0]
    if (sampleBlob) {
      const isAccessible = await verifyImageAccessibility(sampleBlob.url)
      if (!isAccessible) {
        throw new Error("Blob URLs are not accessible")
      }
    }

    console.log(
      `✅ Blob storage verified: ${blobs.length} images (${(totalSize / 1024 / 1024).toFixed(2)}MB) in ${loadTime}ms`,
    )

    return {
      isValid: true,
      images: blobs,
      totalSize,
    }
  } catch (error) {
    console.error("❌ Blob storage verification failed:", error)
    return {
      isValid: false,
      images: [],
      totalSize: 0,
      error: error instanceof Error ? error.message : "Unknown verification error",
    }
  }
}

/**
 * Verifies if an image URL is accessible and valid
 */
async function verifyImageAccessibility(url: string): Promise<boolean> {
  try {
    const response = (await Promise.race([
      fetch(url, { method: "HEAD" }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Accessibility check timeout")), 3000)),
    ])) as Response

    return response.ok && response.headers.get("content-type")?.startsWith("image/") === true
  } catch (error) {
    console.warn(`Image accessibility check failed for ${url}:`, error)
    return false
  }
}

/**
 * Validates image format and properties
 */
async function validateImageFormat(url: string): Promise<ImageValidationResult> {
  try {
    const response = await fetch(url, { method: "HEAD" })

    if (!response.ok) {
      return { isValid: false, error: `HTTP ${response.status}` }
    }

    const contentType = response.headers.get("content-type")
    const contentLength = response.headers.get("content-length")

    if (!contentType?.startsWith("image/")) {
      return { isValid: false, error: "Invalid content type" }
    }

    const format = contentType.split("/")[1]
    if (!SUPPORTED_FORMATS.includes(format)) {
      return { isValid: false, error: `Unsupported format: ${format}` }
    }

    return {
      isValid: true,
      format,
      size: contentLength ? Number.parseInt(contentLength) : undefined,
    }
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Validation failed",
    }
  }
}

/**
 * Enhanced card image retrieval with comprehensive error handling
 */
export async function getVerifiedCardImage(
  cardId: string,
  element: string,
  retryCount = 0,
): Promise<{
  url: string
  isPlaceholder: boolean
  loadTime: number
  cached: boolean
  error?: string
}> {
  const startTime = Date.now()
  const cacheKey = `${cardId}-${element}`

  loadingMetrics.totalRequests++

  try {
    // Check cache first
    const cached = verifiedImageCache[cacheKey]
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION && cached.verified) {
      loadingMetrics.cacheHits++
      console.log(`📦 Cache hit for ${cacheKey}`)
      return {
        url: cached.url,
        isPlaceholder: false,
        loadTime: Date.now() - startTime,
        cached: true,
      }
    }

    // Refresh cache if needed
    if (Date.now() - cacheTimestamp > CACHE_DURATION) {
      await refreshVerifiedImageCache()
    }

    // Generate possible image names with comprehensive patterns
    const possibleNames = generateComprehensiveImageNames(cardId, element)

    // Try each possible name
    for (const imageName of possibleNames) {
      const cacheEntry = verifiedImageCache[imageName]
      if (cacheEntry?.verified) {
        // Verify the image is still accessible
        const isAccessible = await verifyImageAccessibility(cacheEntry.url)
        if (isAccessible) {
          // Update cache with new timestamp
          verifiedImageCache[cacheKey] = {
            ...cacheEntry,
            timestamp: Date.now(),
            attempts: (cacheEntry.attempts || 0) + 1,
          }

          loadingMetrics.successfulLoads++
          const loadTime = Date.now() - startTime
          updateAverageLoadTime(loadTime)

          console.log(`✅ Found verified image: ${imageName} -> ${cacheEntry.url}`)
          return {
            url: cacheEntry.url,
            isPlaceholder: false,
            loadTime,
            cached: false,
          }
        }
      }
    }

    // If no image found and we haven't exceeded retry attempts
    if (retryCount < MAX_RETRY_ATTEMPTS) {
      console.log(`🔄 Retrying image retrieval for ${cacheKey} (attempt ${retryCount + 1})`)
      await new Promise((resolve) => setTimeout(resolve, 1000 * (retryCount + 1))) // Exponential backoff
      return getVerifiedCardImage(cardId, element, retryCount + 1)
    }

    // Generate optimized placeholder
    const placeholderUrl = generateOptimizedPlaceholder(cardId, element)
    loadingMetrics.failedLoads++

    console.warn(`⚠️ No verified image found for ${cacheKey}, using placeholder`)
    return {
      url: placeholderUrl,
      isPlaceholder: true,
      loadTime: Date.now() - startTime,
      cached: false,
      error: "Image not found in verified storage",
    }
  } catch (error) {
    loadingMetrics.failedLoads++
    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    console.error(`❌ Error retrieving image for ${cacheKey}:`, errorMessage)

    // Cache the error to avoid repeated failures
    verifiedImageCache[cacheKey] = {
      url: generateOptimizedPlaceholder(cardId, element),
      timestamp: Date.now(),
      loadTime: Date.now() - startTime,
      size: 0,
      format: "placeholder",
      verified: false,
      attempts: (verifiedImageCache[cacheKey]?.attempts || 0) + 1,
      lastError: errorMessage,
    }

    return {
      url: generateOptimizedPlaceholder(cardId, element),
      isPlaceholder: true,
      loadTime: Date.now() - startTime,
      cached: false,
      error: errorMessage,
    }
  }
}

/**
 * Refreshes the verified image cache with comprehensive validation
 */
async function refreshVerifiedImageCache(): Promise<void> {
  try {
    console.log("🔄 Refreshing verified image cache...")
    const startTime = Date.now()

    const verification = await verifyBlobStorageAndListImages()
    if (!verification.isValid) {
      throw new Error(`Blob storage verification failed: ${verification.error}`)
    }

    // Clear old cache
    verifiedImageCache = {}

    // Process images with validation
    const validationPromises = verification.images.map(async (blob) => {
      const filename = blob.pathname.split("/").pop()
      if (!filename) return

      try {
        // Validate image format and accessibility
        const validation = await validateImageFormat(blob.url)
        const isAccessible = await verifyImageAccessibility(blob.url)

        if (validation.isValid && isAccessible) {
          const entry: EnhancedImageCacheEntry = {
            url: blob.url,
            timestamp: Date.now(),
            loadTime: 0,
            size: blob.size || validation.size || 0,
            format: validation.format || "unknown",
            verified: true,
            attempts: 0,
          }

          verifiedImageCache[filename] = entry

          // Also cache without extension for easier lookup
          const nameWithoutExt = filename.replace(/\.[^/.]+$/, "")
          verifiedImageCache[nameWithoutExt] = entry
        } else {
          console.warn(`⚠️ Image validation failed for ${filename}:`, validation.error)
        }
      } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error)
      }
    })

    await Promise.allSettled(validationPromises)

    cacheTimestamp = Date.now()
    const loadTime = Date.now() - startTime
    const verifiedCount = Object.values(verifiedImageCache).filter((entry) => entry.verified).length

    console.log(`✅ Cache refreshed: ${verifiedCount} verified images in ${loadTime}ms`)
  } catch (error) {
    console.error("❌ Error refreshing verified image cache:", error)
  }
}

/**
 * Generates comprehensive image name patterns for better matching
 */
function generateComprehensiveImageNames(cardId: string, element: string): string[] {
  const names: string[] = []

  // Parse card ID
  const [number, suit] = cardId.split("-")
  const paddedNumber = number?.padStart(2, "0") || "00"
  const lowerSuit = suit?.toLowerCase() || ""
  const lowerElement = element.toLowerCase()

  // Comprehensive naming patterns based on common conventions
  const basePatterns = [
    `${paddedNumber}${lowerSuit}-${lowerElement}`,
    `${number}${lowerSuit}-${lowerElement}`,
    `${paddedNumber}-${lowerSuit}-${lowerElement}`,
    `${cardId.toLowerCase()}-${lowerElement}`,
    `${cardId}-${element}`,
    `${paddedNumber}_${lowerSuit}_${lowerElement}`,
    `card_${paddedNumber}_${lowerSuit}_${lowerElement}`,
    `${lowerSuit}${paddedNumber}${lowerElement}`,
    `${lowerSuit}_${paddedNumber}_${lowerElement}`,
    `${lowerSuit}-${paddedNumber}-${lowerElement}`,
    `${number}-${lowerSuit}-${lowerElement}`,
    `${paddedNumber}${lowerSuit}${lowerElement}`,
  ]

  // Add all combinations with supported extensions
  basePatterns.forEach((pattern) => {
    SUPPORTED_FORMATS.forEach((ext) => {
      names.push(`${pattern}.${ext}`)
    })
  })

  return names
}

/**
 * Generates optimized placeholder with better visual feedback
 */
function generateOptimizedPlaceholder(cardId: string, element: string): string {
  const query = encodeURIComponent(`${cardId} ${element} NUMO Oracle Card`)
  return `/placeholder.svg?height=420&width=270&query=${query}&text=${encodeURIComponent(cardId)}&bg=1a1a2e&color=16213e`
}

/**
 * Updates average load time metrics
 */
function updateAverageLoadTime(newLoadTime: number): void {
  const totalLoadTime = loadingMetrics.averageLoadTime * loadingMetrics.successfulLoads
  loadingMetrics.averageLoadTime = (totalLoadTime + newLoadTime) / (loadingMetrics.successfulLoads + 1)
}

/**
 * Preloads card images with enhanced verification and progress tracking
 */
export async function preloadVerifiedCardImages(
  cardIds: string[],
  elements: string[],
  onProgress?: (loaded: number, total: number, failed: number) => void,
): Promise<{
  loaded: number
  failed: number
  totalTime: number
  metrics: LoadingMetrics
}> {
  const startTime = Date.now()
  let loaded = 0
  let failed = 0
  const total = cardIds.length * elements.length

  console.log(`🚀 Starting preload of ${total} card images...`)

  try {
    // Ensure cache is fresh
    await refreshVerifiedImageCache()

    // Create batched loading promises
    const loadPromises = cardIds.flatMap((cardId) =>
      elements.map(async (element) => {
        try {
          const result = await getVerifiedCardImage(cardId, element)

          if (result.isPlaceholder) {
            failed++
          } else {
            loaded++

            // Preload the actual image for browser cache
            const img = new Image()
            img.crossOrigin = "anonymous"

            await new Promise<void>((resolve) => {
              const timeout = setTimeout(() => {
                console.warn(`⏰ Preload timeout for ${cardId}-${element}`)
                resolve()
              }, 5000)

              img.onload = () => {
                clearTimeout(timeout)
                resolve()
              }

              img.onerror = () => {
                clearTimeout(timeout)
                console.warn(`❌ Preload failed for ${cardId}-${element}`)
                resolve()
              }

              img.src = result.url
            })
          }

          onProgress?.(loaded, total, failed)
        } catch (error) {
          failed++
          console.error(`❌ Preload error for ${cardId}-${element}:`, error)
          onProgress?.(loaded, total, failed)
        }
      }),
    )

    // Process in batches to avoid overwhelming the network
    const batchSize = 6
    for (let i = 0; i < loadPromises.length; i += batchSize) {
      const batch = loadPromises.slice(i, i + batchSize)
      await Promise.allSettled(batch)
    }

    const totalTime = Date.now() - startTime
    console.log(`✅ Preload completed: ${loaded} loaded, ${failed} failed in ${totalTime}ms`)

    return { loaded, failed, totalTime, metrics: { ...loadingMetrics } }
  } catch (error) {
    console.error("❌ Error during preload:", error)
    return {
      loaded,
      failed: total - loaded,
      totalTime: Date.now() - startTime,
      metrics: { ...loadingMetrics },
    }
  }
}

/**
 * Gets comprehensive loading metrics and cache statistics
 */
export function getVerifiedImageMetrics(): {
  cache: {
    totalImages: number
    verifiedImages: number
    cacheAge: number
    totalSize: number
  }
  performance: LoadingMetrics
  errors: Array<{ key: string; error: string; attempts: number }>
} {
  const verifiedImages = Object.values(verifiedImageCache).filter((entry) => entry.verified)
  const totalSize = verifiedImages.reduce((sum, entry) => sum + entry.size, 0)
  const errors = Object.entries(verifiedImageCache)
    .filter(([, entry]) => entry.lastError)
    .map(([key, entry]) => ({
      key,
      error: entry.lastError!,
      attempts: entry.attempts,
    }))

  return {
    cache: {
      totalImages: Object.keys(verifiedImageCache).length,
      verifiedImages: verifiedImages.length,
      cacheAge: Date.now() - cacheTimestamp,
      totalSize,
    },
    performance: { ...loadingMetrics },
    errors,
  }
}

/**
 * Clears the verified image cache and resets metrics
 */
export function clearVerifiedImageCache(): void {
  verifiedImageCache = {}
  cacheTimestamp = 0
  loadingMetrics = {
    totalRequests: 0,
    successfulLoads: 0,
    failedLoads: 0,
    averageLoadTime: 0,
    cacheHits: 0,
    networkRequests: 0,
  }
  console.log("🧹 Verified image cache cleared")
}

/**
 * Tests the blob storage connection and image retrieval
 */
export async function testBlobStorageConnection(): Promise<{
  success: boolean
  details: {
    urlAccessible: boolean
    imagesFound: number
    sampleImageAccessible: boolean
    averageResponseTime: number
  }
  error?: string
}> {
  try {
    console.log("🧪 Testing blob storage connection...")

    const startTime = Date.now()
    const verification = await verifyBlobStorageAndListImages()

    if (!verification.isValid) {
      return {
        success: false,
        details: {
          urlAccessible: false,
          imagesFound: 0,
          sampleImageAccessible: false,
          averageResponseTime: 0,
        },
        error: verification.error,
      }
    }

    // Test sample image accessibility
    let sampleImageAccessible = false
    if (verification.images.length > 0) {
      sampleImageAccessible = await verifyImageAccessibility(verification.images[0].url)
    }

    const responseTime = Date.now() - startTime

    return {
      success: true,
      details: {
        urlAccessible: true,
        imagesFound: verification.images.length,
        sampleImageAccessible,
        averageResponseTime: responseTime,
      },
    }
  } catch (error) {
    return {
      success: false,
      details: {
        urlAccessible: false,
        imagesFound: 0,
        sampleImageAccessible: false,
        averageResponseTime: 0,
      },
      error: error instanceof Error ? error.message : "Connection test failed",
    }
  }
}
