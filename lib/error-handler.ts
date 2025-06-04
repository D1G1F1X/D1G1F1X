"use client"

/**
 * Error Handling Utility
 *
 * This utility provides functions for optimizing error handling
 * and providing better error reporting.
 */

import { useEffect, useState } from "react"

/**
 * Custom hook for handling async errors
 * @param asyncFn Async function to execute
 * @param dependencies Dependencies array
 */
export function useAsyncError<T>(
  asyncFn: () => Promise<T>,
  dependencies: any[] = [],
): [T | null, Error | null, boolean, () => Promise<void>] {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const execute = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await asyncFn()
      setData(result)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setError(error)
      console.error("Async error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return [data, error, loading, execute]
}

/**
 * Wraps a function with error handling
 * @param fn Function to wrap
 * @param errorHandler Error handler function
 */
export function withErrorHandling<T extends (...args: any[]) => any>(
  fn: T,
  errorHandler: (error: Error, ...args: Parameters<T>) => ReturnType<T>,
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    try {
      return fn(...args)
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      console.error("Function error:", error)
      return errorHandler(error, ...args)
    }
  }
}

/**
 * Wraps an async function with error handling
 * @param fn Async function to wrap
 * @param errorHandler Error handler function
 */
export function withAsyncErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  errorHandler: (error: Error, ...args: Parameters<T>) => Promise<ReturnType<T>>,
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args)
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      console.error("Async function error:", error)
      return errorHandler(error, ...args)
    }
  }
}

/**
 * Creates a boundary for catching errors
 * @param fn Function to execute
 * @param fallback Fallback value if an error occurs
 */
export function tryCatch<T>(fn: () => T, fallback: T): T {
  try {
    return fn()
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    console.error("Try/catch error:", error)
    return fallback
  }
}

/**
 * Creates a boundary for catching async errors
 * @param fn Async function to execute
 * @param fallback Fallback value if an error occurs
 */
export async function tryAsync<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    console.error("Async try/catch error:", error)
    return fallback
  }
}

/**
 * Custom hook for handling form errors
 */
export function useFormErrors<T extends Record<string, any>>(): [
  Record<keyof T, string>,
  (field: keyof T, message: string) => void,
  () => void,
  boolean,
] {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const setError = (field: keyof T, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }))
  }

  const clearErrors = () => {
    setErrors({})
  }

  const hasErrors = Object.keys(errors).length > 0

  return [errors as Record<keyof T, string>, setError, clearErrors, hasErrors]
}

/**
 * Validates a form value
 * @param value Value to validate
 * @param validators Array of validator functions
 */
export function validateField<T>(value: T, validators: Array<(value: T) => string | null>): string | null {
  for (const validator of validators) {
    const error = validator(value)
    if (error) return error
  }

  return null
}

/**
 * Common validator functions
 */
export const validators = {
  required: (value: any) => {
    if (value === null || value === undefined || value === "") {
      return "This field is required"
    }
    return null
  },

  minLength: (min: number) => (value: string) => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters`
    }
    return null
  },

  maxLength: (max: number) => (value: string) => {
    if (value && value.length > max) {
      return `Must be no more than ${max} characters`
    }
    return null
  },

  email: (value: string) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return "Invalid email address"
    }
    return null
  },

  number: (value: any) => {
    if (value && isNaN(Number(value))) {
      return "Must be a number"
    }
    return null
  },

  min: (min: number) => (value: number) => {
    if (value !== null && value !== undefined && value < min) {
      return `Must be at least ${min}`
    }
    return null
  },

  max: (max: number) => (value: number) => {
    if (value !== null && value !== undefined && value > max) {
      return `Must be no more than ${max}`
    }
    return null
  },
}
