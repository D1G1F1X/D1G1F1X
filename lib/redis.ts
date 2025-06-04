// Dummy redis export to prevent import errors
export const redis = null

// Helper function that always returns fallback
export async function safeRedisOperation<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  return fallback
}
