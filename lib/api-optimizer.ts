// This file is intended for API optimization utilities.
// Currently, it's a placeholder.
// Future enhancements might include:
// - Caching strategies for API responses
// - Request batching or debouncing
// - Response compression utilities
// - API rate limiting helpers
// - Centralized error formatting for API responses

/**
 * A simple utility to format API success responses.
 * @param data The data to return.
 * @param message An optional success message.
 * @returns A standardized success response object.
 */
export function apiSuccess<T>(data: T, message = "Success") {
  return {
    success: true,
    message,
    data,
  }
}

/**
 * A simple utility to format API error responses.
 * @param message The error message.
 * @param status The HTTP status code.
 * @param details Optional additional error details.
 * @returns A standardized error response object.
 */
export function apiError(message = "An unknown error occurred", status = 500, details?: any) {
  return {
    success: false,
    message,
    status,
    details,
  }
}

// Example of a potential future utility:
/**
 * Wraps an API handler function with common error handling.
 * @param handler The async function to wrap.
 * @returns A new async function with error handling.
 */
export function withApiErrorHandler<T extends (...args: any[]) => Promise<any>>(handler: T) {
  return async (
    ...args: Parameters<T>
  ): Promise<ReturnType<T> | { success: false; message: string; status: number; details?: any }> => {
    try {
      return await handler(...args)
    } catch (error: any) {
      console.error("API Handler Error:", error)
      return apiError(error.message || "Internal Server Error", error.status || 500, error)
    }
  }
}
