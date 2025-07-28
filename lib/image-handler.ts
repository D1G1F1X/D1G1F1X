/**
 * Utility functions for handling images consistently across the application
 */

/**
 * Normalizes an image path to ensure it starts with a slash
 * and handles external URLs correctly
 */
export function normalizeImagePath(src: string): string {
  if (!src) return "/placeholder.svg"

  // If it's an external URL or data URL, return as is
  if (src.startsWith("http") || src.startsWith("data:") || src.includes("blob") || src.includes("vercel-storage")) {
    return src
  }

  // Handle relative paths and ensure they start with a slash
  if (src.startsWith("./")) {
    src = src.substring(2)
  }

  // Ensure internal paths start with a slash
  const normalizedPath = src.startsWith("/") ? src : `/${src}`

  // In production, ensure we're using the correct base path
  if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
    // For production deployment, ensure proper path resolution
    return normalizedPath
  }

  return normalizedPath
}

/**
 * Generates a placeholder image URL with the specified dimensions and query
 */
export function getPlaceholderImage(width = 300, height = 300, query = "placeholder"): string {
  return `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(query)}`
}

/**
 * Checks if an image exists at the specified path
 * (Client-side only)
 */
export async function checkImageExists(src: string): Promise<boolean> {
  if (typeof window === "undefined") return true

  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = "anonymous" // Add CORS support
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = normalizeImagePath(src)

    // Add timeout to prevent hanging
    setTimeout(() => resolve(false), 5000)
  })
}

/**
 * Gets the appropriate fallback image based on the image type
 */
export function getFallbackImage(type: "card" | "profile" | "product" | "blog" | "general" = "general"): string {
  switch (type) {
    case "card":
      return "/back.jpg"
    case "profile":
      return "/user-profile-illustration.png"
    case "product":
      return "/placeholder.svg?height=300&width=300"
    case "blog":
      return "/placeholder.svg?height=400&width=600"
    default:
      return "/placeholder.svg?height=300&width=300"
  }
}

/**
 * Enhanced image component props for better error handling
 */
export interface EnhancedImageProps {
  src: string
  alt: string
  fallback?: string
  onError?: () => void
  className?: string
  width?: number
  height?: number
}

/**
 * Preload critical images for better performance
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = normalizeImagePath(src)
  })
}
