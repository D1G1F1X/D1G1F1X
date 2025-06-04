/**
 * Utility functions for preloading and tracking image loading status
 */

// Keep track of which images have been preloaded
const preloadedImages = new Set<string>()

/**
 * Preloads an image by creating an Image object and setting its src
 * @param src The URL of the image to preload
 * @returns A promise that resolves when the image is loaded or rejects if there's an error
 */
export function preloadImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // If the image is already preloaded, resolve immediately
    if (preloadedImages.has(src)) {
      resolve(src)
      return
    }

    const img = new Image()

    img.onload = () => {
      preloadedImages.add(src)
      resolve(src)
    }

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`))
    }

    img.src = src
  })
}

/**
 * Preloads multiple images in parallel
 * @param srcs Array of image URLs to preload
 * @returns A promise that resolves with an array of successfully loaded image URLs
 */
export function preloadImages(srcs: string[]): Promise<string[]> {
  return new Promise((resolve) => {
    const loadedImages: string[] = []
    let pendingCount = srcs.length

    if (pendingCount === 0) {
      resolve([])
      return
    }

    srcs.forEach((src) => {
      // Skip already preloaded images
      if (preloadedImages.has(src)) {
        pendingCount--
        loadedImages.push(src)
        if (pendingCount === 0) {
          resolve(loadedImages)
        }
        return
      }

      preloadImage(src)
        .then(() => {
          loadedImages.push(src)
        })
        .catch(() => {
          // Image failed to load, don't add to loadedImages
        })
        .finally(() => {
          pendingCount--
          if (pendingCount === 0) {
            resolve(loadedImages)
          }
        })
    })
  })
}

/**
 * Checks if an image has been preloaded
 * @param src The URL of the image to check
 * @returns True if the image has been preloaded, false otherwise
 */
export function isImagePreloaded(src: string): boolean {
  return preloadedImages.has(src)
}

/**
 * Clears the preloaded images cache
 */
export function clearPreloadedImages(): void {
  preloadedImages.clear()
}

/**
 * Gets the count of preloaded images
 * @returns The number of preloaded images
 */
export function getPreloadedImagesCount(): number {
  return preloadedImages.size
}
