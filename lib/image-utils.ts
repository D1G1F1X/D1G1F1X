/**
 * Utility functions for handling images in the application
 */

/**
 * Validates and normalizes an image path to ensure it's correctly formatted
 * for the deployment environment
 */
export function normalizeImagePath(path: string): string {
  // Handle undefined or null paths
  if (!path) return "/placeholder.svg"

  // If it's already a full URL, return it as is
  if (path.startsWith("http") || path.startsWith("blob:") || path.startsWith("data:")) {
    return path
  }

  // Ensure path starts with a slash
  if (!path.startsWith("/")) {
    path = "/" + path
  }

  // Handle blob storage URLs
  if (path.includes("vercel-storage") || path.includes("blob.vercel")) {
    return path // Return as is if it's already a blob URL
  }

  // Handle placeholder SVGs
  if (path.includes("placeholder.svg")) {
    return path // Return placeholder as is
  }

  // Add public URL prefix if in browser and environment variable exists
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_APP_URL) {
    // Only add the base URL if the path doesn't already include it
    if (!path.includes(process.env.NEXT_PUBLIC_APP_URL)) {
      return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
    }
  }

  return path
}

/**
 * Creates a fallback image URL for when the primary image fails to load
 */
export function createFallbackImageUrl(element: string, type: string, number: string): string {
  // Create a descriptive placeholder
  return `/placeholder.svg?height=280&width=180&query=${type} of ${element} ${number}`
}

/**
 * Creates a descriptive placeholder image URL
 */
export function createDescriptivePlaceholder(description: string): string {
  const encodedDescription = encodeURIComponent(description)
  return `/placeholder.svg?height=420&width=270&query=${encodedDescription}`
}

/**
 * Preloads critical images to improve user experience
 */
export function preloadCriticalImages(): void {
  const criticalImages = [
    "/back.jpg",
    "/cards/01cauldron-fire.jpg",
    "/cards/01cauldron-water.jpg",
    "/cards/01cauldron-air.jpg",
    "/cards/01cauldron-earth.jpg",
    "/cards/01cauldron-spirit.jpg",
    "/numoracle-full-logo.png",
    "/numo-color-emblem.png",
    "/numo-logo-with-emblem.png",
  ]

  if (typeof window !== "undefined") {
    criticalImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }
}

/**
 * Checks if an image exists at the specified path
 */
export async function checkImageExists(path: string): Promise<boolean> {
  if (!path) return false

  try {
    const response = await fetch(path, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error(`Error checking if image exists at ${path}:`, error)
    return false
  }
}

/**
 * Gets the absolute URL for an image path
 */
export function getAbsoluteImageUrl(path: string): string {
  if (!path) return "/placeholder.svg"

  // If it's already an absolute URL, return it
  if (path.startsWith("http")) {
    return path
  }

  // If it's a blob URL, return it
  if (path.includes("vercel-storage") || path.includes("blob.vercel")) {
    return path
  }

  // Ensure path starts with a slash
  if (!path.startsWith("/")) {
    path = "/" + path
  }

  // Use the NEXT_PUBLIC_APP_URL environment variable if available
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ""
  return `${baseUrl}${path}`
}

/**
 * Gets the image format from a path
 */
export function getImageFormat(path: string): string {
  if (!path) return "unknown"

  const extension = path.split(".").pop()?.toLowerCase()

  if (!extension) return "unknown"

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "jpeg"
    case "png":
      return "png"
    case "gif":
      return "gif"
    case "webp":
      return "webp"
    case "svg":
      return "svg"
    default:
      return "unknown"
  }
}
