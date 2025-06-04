"use client"

/**
 * State Optimizer Utility
 *
 * This utility provides functions for optimizing state management
 * through techniques like memoization and efficient updates.
 */

import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Custom hook for managing state with previous value tracking
 * @param initialValue Initial state value
 */
export function useStateWithPrevious<T>(initialValue: T): [T, T | undefined, (value: T) => void] {
  const [state, setState] = useState<T>(initialValue)
  const prevRef = useRef<T | undefined>(undefined)

  useEffect(() => {
    prevRef.current = state
  }, [state])

  return [state, prevRef.current, setState]
}

/**
 * Custom hook for managing state with history
 * @param initialValue Initial state value
 * @param capacity Maximum history capacity
 */
export function useStateWithHistory<T>(
  initialValue: T,
  capacity = 10,
): [
  T,
  (value: T) => void,
  {
    history: T[]
    pointer: number
    back: () => void
    forward: () => void
    go: (index: number) => void
    canBack: boolean
    canForward: boolean
  },
] {
  const [state, setState] = useState<T>(initialValue)
  const [history, setHistory] = useState<T[]>([initialValue])
  const [pointer, setPointer] = useState(0)

  const set = useCallback(
    (value: T) => {
      setState(value)

      const newHistory = history.slice(0, pointer + 1)
      newHistory.push(value)

      // Maintain capacity limit
      if (newHistory.length > capacity) {
        newHistory.shift()
      } else {
        setPointer(newHistory.length - 1)
      }

      setHistory(newHistory)
    },
    [capacity, history, pointer],
  )

  const back = useCallback(() => {
    if (pointer <= 0) return
    setPointer((p) => p - 1)
    setState(history[pointer - 1])
  }, [history, pointer])

  const forward = useCallback(() => {
    if (pointer >= history.length - 1) return
    setPointer((p) => p + 1)
    setState(history[pointer + 1])
  }, [history, pointer])

  const go = useCallback(
    (index: number) => {
      if (index < 0 || index >= history.length) return
      setPointer(index)
      setState(history[index])
    },
    [history],
  )

  return [
    state,
    set,
    {
      history,
      pointer,
      back,
      forward,
      go,
      canBack: pointer > 0,
      canForward: pointer < history.length - 1,
    },
  ]
}

/**
 * Custom hook for deep comparing dependencies
 * @param value The value to compare
 */
export function useDeepCompareMemoize<T>(value: T): T {
  const ref = useRef<T>(value)

  if (!deepEqual(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

/**
 * Deep equality comparison
 * @param a First value
 * @param b Second value
 */
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true

  if (a && b && typeof a === "object" && typeof b === "object") {
    if (a.constructor !== b.constructor) return false

    if (Array.isArray(a)) {
      if (a.length !== b.length) return false

      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i])) return false
      }

      return true
    }

    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false

      for (const [key, value] of a.entries()) {
        if (!b.has(key) || !deepEqual(value, b.get(key))) return false
      }

      return true
    }

    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false

      for (const item of a) {
        if (!b.has(item)) return false
      }

      return true
    }

    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime()
    }

    const keys = Object.keys(a)
    if (keys.length !== Object.keys(b).length) return false

    for (const key of keys) {
      if (!Object.prototype.hasOwnProperty.call(b, key) || !deepEqual(a[key], b[key])) return false
    }

    return true
  }

  return a !== a && b !== b // NaN check
}

/**
 * Custom hook for async state
 * @param initialValue Initial state value
 */
export function useAsyncState<T>(
  initialValue: T,
): [T, (value: T | ((prev: T) => Promise<T> | T)) => Promise<void>, boolean] {
  const [state, setState] = useState<T>(initialValue)
  const [loading, setLoading] = useState(false)

  const setAsyncState = async (value: T | ((prev: T) => Promise<T> | T)) => {
    setLoading(true)
    try {
      if (typeof value === "function") {
        const valueFunc = value as (prev: T) => Promise<T> | T
        const result = valueFunc(state)

        if (result instanceof Promise) {
          const asyncResult = await result
          setState(asyncResult)
        } else {
          setState(result)
        }
      } else {
        setState(value)
      }
    } finally {
      setLoading(false)
    }
  }

  return [state, setAsyncState, loading]
}

/**
 * Custom hook for optimized state updates
 * @param initialState Initial state
 */
export function useOptimizedState<T extends Record<string, any>>(initialState: T): [T, (updates: Partial<T>) => void] {
  const [state, setState] = useState<T>(initialState)

  const updateState = useCallback((updates: Partial<T>) => {
    setState((prevState) => {
      // Only update if there are actual changes
      const hasChanges = Object.entries(updates).some(([key, value]) => prevState[key] !== value)

      if (!hasChanges) return prevState

      return { ...prevState, ...updates }
    })
  }, [])

  return [state, updateState]
}
