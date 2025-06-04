"use client"

/**
 * Performance Monitoring Utility
 *
 * This utility provides functions for monitoring and optimizing
 * application performance.
 */

import React from "react"

/**
 * Measures the execution time of a function
 * @param fn Function to measure
 * @param label Label for the measurement
 */
export function measureExecutionTime<T extends (...args: any[]) => any>(
  fn: T,
  label = "Function execution time",
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    const start = performance.now()
    const result = fn(...args)
    const end = performance.now()

    console.log(`${label}: ${end - start}ms`)

    return result
  }
}

/**
 * Creates a performance mark and measure
 * @param name Name of the mark/measure
 */
export function createPerformanceMark(name: string): () => void {
  const markName = `${name}_start`
  performance.mark(markName)

  return () => {
    const endMarkName = `${name}_end`
    performance.mark(endMarkName)
    performance.measure(name, markName, endMarkName)

    const measures = performance.getEntriesByName(name, "measure")
    if (measures.length > 0) {
      console.log(`${name}: ${measures[0].duration.toFixed(2)}ms`)
    }

    // Clean up
    performance.clearMarks(markName)
    performance.clearMarks(endMarkName)
    performance.clearMeasures(name)
  }
}

/**
 * Monitors component render time
 * @param componentName Name of the component
 */
export function useRenderMonitor(componentName: string): void {
  const renderCount = React.useRef(0)

  if (process.env.NODE_ENV !== "development") return

  React.useEffect(() => {
    renderCount.current += 1
    console.log(`${componentName} rendered (${renderCount.current})`)

    const end = createPerformanceMark(`${componentName}_render`)

    return () => {
      end()
    }
  })
}

/**
 * Monitors API request performance
 * @param url URL of the request
 * @param options Fetch options
 */
export async function monitoredFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const start = performance.now()

  try {
    const response = await fetch(url, options)
    const data = await response.json()

    const end = performance.now()
    console.log(`Fetch to ${url}: ${end - start}ms`)

    return data as T
  } catch (error) {
    const end = performance.now()
    console.error(`Fetch to ${url} failed after ${end - start}ms:`, error)
    throw error
  }
}

/**
 * Monitors memory usage
 */
export function monitorMemoryUsage(): void {
  if (process.env.NODE_ENV !== "development") return

  if ("memory" in performance) {
    // @ts-ignore - TypeScript doesn't know about the memory property
    const memory = performance.memory
    console.log("Memory usage:", {
      totalJSHeapSize: `${(memory.totalJSHeapSize / (1024 * 1024)).toFixed(2)} MB`,
      usedJSHeapSize: `${(memory.usedJSHeapSize / (1024 * 1024)).toFixed(2)} MB`,
      jsHeapSizeLimit: `${(memory.jsHeapSizeLimit / (1024 * 1024)).toFixed(2)} MB`,
    })
  }
}

/**
 * Creates a performance observer for long tasks
 */
export function observeLongTasks(): () => void {
  if (process.env.NODE_ENV !== "development") return () => {}
  if (typeof PerformanceObserver === "undefined") return () => {}

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.warn(`Long task detected: ${entry.duration}ms`, entry)
    }
  })

  observer.observe({ entryTypes: ["longtask"] })

  return () => observer.disconnect()
}

/**
 * Monitors React component updates
 * @param componentName Name of the component
 * @param props Component props
 */
export function useUpdateMonitor(componentName: string, props: Record<string, any>): void {
  const prevProps = React.useRef<Record<string, any>>({})

  if (process.env.NODE_ENV !== "development") return

  React.useEffect(() => {
    const changedProps: Record<string, { old: any; new: any }> = {}

    Object.entries(props).forEach(([key, value]) => {
      if (prevProps.current[key] !== value) {
        changedProps[key] = {
          old: prevProps.current[key],
          new: value,
        }
      }
    })

    if (Object.keys(changedProps).length > 0) {
      console.log(`${componentName} updated due to changes in:`, changedProps)
    }

    prevProps.current = { ...props }
  })
}
