/**
 * API Optimizer Utility
 *
 * This utility provides functions for optimizing API requests through
 * techniques like request batching, caching, and debouncing.
 */

import { getCachedReading } from "./services/cache-service"

/**
 * Debounces a function call
 * @param func The function to debounce
 * @param wait Wait time in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>): void => {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttles a function call
 * @param func The function to throttle
 * @param limit Limit time in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>): void => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Batches multiple API requests into a single request
 * @param requests Array of request functions
 * @param batchEndpoint Endpoint for batched requests
 */
export async function batchRequests<T>(requests: (() => Promise<T>)[], batchEndpoint: string): Promise<T[]> {
  // If only one request, execute it directly
  if (requests.length === 1) {
    return [await requests[0]()]
  }

  // Otherwise batch the requests
  const response = await fetch(batchEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ requests: requests.map((r) => r.toString()) }),
  })

  if (!response.ok) {
    throw new Error(`Batch request failed: ${response.status}`)
  }

  return await response.json()
}

/**
 * Checks if a cached version of the data exists before making an API request
 * @param cacheKey Key for the cached data
 * @param fetchData Function to fetch the data if not cached
 */
export async function cachedRequest<T>(cacheKey: string, fetchData: () => Promise<T>): Promise<T> {
  try {
    // Try to get cached data
    const cachedData = await getCachedReading(cacheKey)

    if (cachedData) {
      return cachedData as T
    }

    // If not cached, fetch the data
    const data = await fetchData()

    // Cache the data for future use (handled by the fetchData function)
    return data
  } catch (error) {
    console.error("Error in cachedRequest:", error)
    // If cache fails, fall back to direct fetch
    return fetchData()
  }
}

/**
 * Creates a memoized version of a function that caches its results
 * @param func The function to memoize
 */
export function memoize<T extends (...args: any[]) => any>(func: T): T {
  const cache = new Map<string, ReturnType<T>>()

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>
    }

    const result = func(...args)
    cache.set(key, result)
    return result
  }) as T
}

interface RetryOptions {
  maxRetries?: number
  initialDelay?: number // in ms
  factor?: number
  onRetry?: (attempt: number, error: Error) => void
}

/**
 * Retries a failed API request with exponential backoff
 * @param fetchFunc The fetch function to retry
 * @param maxRetries Maximum number of retries
 * @param baseDelay Base delay in milliseconds
 */
export async function retryWithBackoff<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T> {
  const { maxRetries = 3, initialDelay = 100, factor = 2, onRetry } = options || {}
  let attempt = 0
  let delay = initialDelay

  while (attempt < maxRetries) {
    try {
      return await fn()
    } catch (error: any) {
      attempt++
      if (attempt >= maxRetries) {
        throw new Error(`Request failed after ${maxRetries} retries: ${error.message || error}`)
      }

      onRetry?.(attempt, error)
      console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms. Error: ${error.message || error}`)
      await new Promise((resolve) => setTimeout(resolve, delay))
      delay *= factor
    }
  }
  // This line should theoretically not be reached due to the throw inside the loop
  throw new Error("Unexpected error: retryWithBackoff loop exited without success or throwing.")
}
