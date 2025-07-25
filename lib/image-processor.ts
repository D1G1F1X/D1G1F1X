import sharp from "sharp"
import { put } from "@vercel/blob"

export type ImageSize = "thumbnail" | "small" | "medium" | "large" | "original"

export interface ImageDimensions {
  width: number
  height?: number
}

export interface ProcessedImage {
  url: string
  pathname: string
  width: number
  height: number
  size: number
  format: string
}

interface ImageVerificationResponse {
  exists: boolean
  verified: boolean
  message: string
}

// Define standard image sizes
const IMAGE_SIZES: Record<Exclude<ImageSize, "original">, ImageDimensions> = {
  thumbnail: { width: 150 },
  small: { width: 300 },
  medium: { width: 600 },
  large: { width: 1200 },
}

// Define image formats and quality settings
const IMAGE_FORMATS = {
  webp: { quality: 80 },
  jpeg: { quality: 85 },
  avif: { quality: 80 },
}

/**
 * Process an image with Sharp and upload to Blob storage
 */
export async function processAndUploadImage(
  file: File | Buffer,
  options: {
    filename: string
    folder?: string
    sizes?: ImageSize[]
    formats?: Array<keyof typeof IMAGE_FORMATS>
    preserveOriginal?: boolean
  },
): Promise<Record<string, ProcessedImage>> {
  const { filename, folder = "uploads", sizes = ["medium"], formats = ["webp"], preserveOriginal = false } = options

  // Ensure folder path is formatted correctly
  const folderPath = folder ? (folder.endsWith("/") ? folder : `${folder}/`) : ""

  // Convert File to Buffer if needed
  let buffer: Buffer
  if (file instanceof File) {
    const arrayBuffer = await file.arrayBuffer()
    buffer = Buffer.from(arrayBuffer)
  } else {
    buffer = file
  }

  // Get image metadata
  const metadata = await sharp(buffer).metadata()
  const originalFormat = metadata.format || "jpeg"
  const originalWidth = metadata.width || 0
  const originalHeight = metadata.height || 0
  const aspectRatio = originalHeight / originalWidth

  // Initialize results object
  const results: Record<string, ProcessedImage> = {}

  // Process original image if requested
  if (preserveOriginal) {
    const originalPathname = `${folderPath}original/${filename}`
    const { url } = await put(originalPathname, buffer, { access: "public" })

    results.original = {
      url,
      pathname: originalPathname,
      width: originalWidth,
      height: originalHeight,
      size: buffer.length,
      format: originalFormat,
    }
  }

  // Process each size and format
  for (const size of sizes) {
    // Skip processing for "original" size
    if (size === "original") continue

    const dimensions = IMAGE_SIZES[size]
    const width = Math.min(dimensions.width, originalWidth)
    const height = dimensions.height || Math.round(width * aspectRatio)

    for (const format of formats) {
      const formatOptions = IMAGE_FORMATS[format]

      // Process image with Sharp
      const processedBuffer = await sharp(buffer)
        .resize(width, height, { fit: "inside", withoutEnlargement: true })
        .toFormat(format as keyof sharp.FormatEnum, formatOptions)
        .toBuffer()

      // Generate filename with size and format
      const nameWithoutExt = filename.split(".").slice(0, -1).join(".")
      const newFilename = `${nameWithoutExt}-${size}.${format}`
      const pathname = `${folderPath}${size}/${newFilename}`

      // Upload to Blob storage
      const { url } = await put(pathname, processedBuffer, { access: "public" })

      // Store result
      results[`${size}-${format}`] = {
        url,
        pathname,
        width,
        height,
        size: processedBuffer.length,
        format,
      }
    }
  }

  return results
}

/**
 * Generate responsive image URLs for different sizes
 */
export function getResponsiveImageUrl(
  baseUrl: string,
  sizes: ImageSize[] = ["thumbnail", "small", "medium", "large"],
): Record<ImageSize, string> {
  const result: Partial<Record<ImageSize, string>> = {}

  // Extract base path and format
  const urlParts = baseUrl.split("/")
  const filename = urlParts.pop() || ""
  const basePath = urlParts.join("/")

  // Extract name without size suffix and format
  const nameMatch = filename.match(/(.+?)(?:-(?:thumbnail|small|medium|large))?\.([a-zA-Z]+)$/)
  if (!nameMatch) {
    // If pattern doesn't match, return original for all sizes
    return sizes.reduce((acc, size) => ({ ...acc, [size]: baseUrl }), {}) as Record<ImageSize, string>
  }

  const [, name, format] = nameMatch

  // Generate URLs for each size
  for (const size of sizes) {
    if (size === "original") {
      result[size] = `${basePath}/original/${name}.${format}`
    } else {
      result[size] = `${basePath}/${size}/${name}-${size}.${format}`
    }
  }

  return result as Record<ImageSize, string>
}

/**
 * Verifies if an image exists at a given URL and optionally checks its integrity.
 * This is a placeholder function. In a real scenario, you might:
 * - Make a HEAD request to check for existence.
 * - Download a small portion to check content type or basic integrity.
 * - Use a dedicated image processing library (e.g., Sharp on a serverless function) for deeper validation.
 * @param imageUrl The URL of the image to verify.
 * @returns A promise that resolves to an ImageVerificationResponse.
 */
export async function verifyImage(imageUrl: string): Promise<ImageVerificationResponse> {
  try {
    const response = await fetch(imageUrl, { method: "HEAD" }) // Use HEAD to avoid downloading full image
    if (response.ok) {
      // Basic check: if it exists and is accessible
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.startsWith("image/")) {
        return { exists: true, verified: true, message: "Image exists and is a valid image type." }
      } else {
        return { exists: true, verified: false, message: "URL exists but is not an image." }
      }
    } else {
      return {
        exists: false,
        verified: false,
        message: `Image not found or inaccessible (Status: ${response.status}).`,
      }
    }
  } catch (error) {
    console.error(`Error during image verification for ${imageUrl}:`, error)
    return { exists: false, verified: false, message: `Network or server error: ${error.message}` }
  }
}
