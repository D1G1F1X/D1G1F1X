// Cache service with Redis completely disabled - no Redis imports at all

const DEFAULT_TTL = 60 * 60 * 24 // 24 hours

export class CacheService {
  // Cache a reading - fallback to memory/localStorage only
  static async cacheReading(key: string, data: any, ttl: number = DEFAULT_TTL): Promise<void> {
    try {
      // Use localStorage as fallback
      if (typeof window !== "undefined") {
        const cacheData = {
          data,
          timestamp: Date.now(),
          ttl: ttl * 1000, // Convert to milliseconds
        }
        localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData))
      }
    } catch (error) {
      console.warn("Cache operation failed:", error)
    }
  }

  // Get a cached reading - fallback to localStorage only
  static async getCachedReading(key: string): Promise<any | null> {
    try {
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(`cache_${key}`)
        if (cached) {
          const cacheData = JSON.parse(cached)
          const now = Date.now()

          // Check if cache is still valid
          if (now - cacheData.timestamp < cacheData.ttl) {
            return cacheData.data
          } else {
            // Remove expired cache
            localStorage.removeItem(`cache_${key}`)
          }
        }
      }
      return null
    } catch (error) {
      console.warn("Cache retrieval failed:", error)
      return null
    }
  }

  // Increment view count - fallback to localStorage only
  static async incrementViewCount(type: string, id: string): Promise<number> {
    try {
      if (typeof window !== "undefined") {
        const key = `views_${type}_${id}`
        const current = localStorage.getItem(key)
        const newCount = current ? Number.parseInt(current) + 1 : 1
        localStorage.setItem(key, newCount.toString())
        return newCount
      }
      return 1
    } catch (error) {
      console.warn("View count increment failed:", error)
      return 1
    }
  }

  // Get view count - fallback to localStorage only
  static async getViewCount(type: string, id: string): Promise<number> {
    try {
      if (typeof window !== "undefined") {
        const key = `views_${type}_${id}`
        const count = localStorage.getItem(key)
        return count ? Number.parseInt(count) : 0
      }
      return 0
    } catch (error) {
      console.warn("View count retrieval failed:", error)
      return 0
    }
  }

  // Clear cache - fallback to localStorage only
  static async clearCache(pattern: string): Promise<void> {
    try {
      if (typeof window !== "undefined") {
        const keys = Object.keys(localStorage).filter((key) => key.includes(pattern))
        keys.forEach((key) => localStorage.removeItem(key))
      }
    } catch (error) {
      console.warn("Cache clearing failed:", error)
    }
  }
}

// Export the static methods directly for easier imports
export const { cacheReading, getCachedReading, incrementViewCount, getViewCount, clearCache } = CacheService

// Additional helper functions for general caching - localStorage only
export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(`cache_${key}`)
      return cached ? JSON.parse(cached) : null
    }
    return null
  } catch (error) {
    console.warn("Cache data retrieval failed:", error)
    return null
  }
}

export async function setCachedData<T>(key: string, data: T, ttl = 3600): Promise<void> {
  try {
    if (typeof window !== "undefined") {
      const cacheData = {
        data,
        timestamp: Date.now(),
        ttl: ttl * 1000,
      }
      localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData))
    }
  } catch (error) {
    console.warn("Cache data storage failed:", error)
  }
}
