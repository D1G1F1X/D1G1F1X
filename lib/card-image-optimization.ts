/**
 * Card image optimization utilities
 */

interface ImageOptimizationOptions {
  width?: number
  height?: number
  quality?: number
  format?: "webp" | "jpeg" | "png"
}

/**
 * Generates optimized image URL with Next.js Image Optimization
 */
export function getOptimizedImageUrl(originalUrl: string, options: ImageOptimizationOptions = {}): string {
  const { width = 270, height = 420, quality = 85, format = "webp" } = options

  // If it's already a placeholder, return as-is
  if (originalUrl.includes("placeholder.svg")) {
    return originalUrl
  }

  // For blob URLs, we can add optimization parameters
  try {
    const url = new URL(originalUrl)

    // Add optimization parameters
    url.searchParams.set("w", width.toString())
    url.searchParams.set("h", height.toString())
    url.searchParams.set("q", quality.toString())
    url.searchParams.set("f", format)

    return url.toString()
  } catch (error) {
    // If URL parsing fails, return original
    return originalUrl
  }
}

export async function preloadCardImages(imageUrls: string[]): Promise<void> {
  const preloadPromises = imageUrls.map((url) => {
    return new Promise<void>((resolve) => {
      if (typeof window === "undefined" || typeof window.Image === "undefined") {
        console.warn("window.Image is not available, skipping image preload for:", url)
        resolve()
        return
      }

      const img = new window.Image()
      img.onload = () => resolve()
      img.onerror = () => resolve()
      img.src = getOptimizedImageUrl(url, { width: 270, height: 420 })
    })
  })

  await Promise.allSettled(preloadPromises)
}

/**
 * Generates responsive image srcSet for different screen sizes
 */
export function generateResponsiveSrcSet(originalUrl: string): string {
  if (originalUrl.includes("placeholder.svg")) {
    return originalUrl
  }

  const sizes = [
    { width: 135, height: 210, descriptor: "1x" },
    { width: 270, height: 420, descriptor: "2x" },
    { width: 405, height: 630, descriptor: "3x" },
  ]

  return sizes
    .map(({ width, height, descriptor }) => {
      const optimizedUrl = getOptimizedImageUrl(originalUrl, { width, height })
      return `${optimizedUrl} ${descriptor}`
    })
    .join(", ")
}

/**
 * Calculates image loading priority based on card position
 */
export function getImageLoadingPriority(index: number, totalCards: number): boolean {
  // Prioritize first 3 cards or if there are 5 or fewer cards total
  return index < 3 || totalCards <= 5
}

/**
 * Image lazy loading intersection observer
 */
export class CardImageLazyLoader {
  private observer: IntersectionObserver | null = null
  private loadedImages = new Set<string>()

  constructor() {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              const src = img.dataset.src

              if (src && !this.loadedImages.has(src)) {
                img.src = src
                img.classList.remove("lazy")
                this.loadedImages.add(src)
                this.observer?.unobserve(img)
              }
            }
          })
        },
        {
          rootMargin: "50px 0px",
          threshold: 0.1,
        },
      )
    }
  }

  observe(element: HTMLImageElement): void {
    if (this.observer) {
      this.observer.observe(element)
    }
  }

  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect()
      this.loadedImages.clear()
    }
  }
}
