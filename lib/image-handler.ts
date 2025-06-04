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

  // Ensure internal paths start with a slash
  return src.startsWith("/") ? src : `/${src}`
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
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = normalizeImagePath(src)
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
      return "/placeholder.svg?height=300&width=300&query=product image"
    case "blog":
      return "/placeholder.svg?height=400&width=600&query=blog post"
    default:
      return "/placeholder.svg"
  }
}
