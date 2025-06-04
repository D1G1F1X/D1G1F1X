"use client"

import type React from "react"

/**
 * Render Optimizer Utility
 *
 * This utility provides functions for optimizing rendering
 * through techniques like virtualization and efficient updates.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

/**
 * Custom hook for detecting when an element is visible in the viewport
 * @param options IntersectionObserver options
 */
export function useInView(options: IntersectionObserverInit = {}): [React.RefObject<HTMLElement>, boolean] {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, options)

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return [ref, isInView]
}

/**
 * Custom hook for virtualizing a list of items
 * @param items Array of items
 * @param itemHeight Height of each item
 * @param visibleItems Number of items to render
 */
export function useVirtualList<T>(
  items: T[],
  itemHeight: number,
  visibleItems: number,
): [React.RefObject<HTMLDivElement>, T[], { startIndex: number; endIndex: number; totalHeight: number }] {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      setScrollTop(container.scrollTop)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const {
    startIndex,
    endIndex,
    visibleItems: visibleItemsSlice,
  } = useMemo(() => {
    const totalHeight = items.length * itemHeight
    const start = Math.floor(scrollTop / itemHeight)
    const bufferItems = Math.ceil(visibleItems / 2)
    const startWithBuffer = Math.max(0, start - bufferItems)
    const end = Math.min(items.length - 1, start + visibleItems + bufferItems)

    return {
      startIndex: startWithBuffer,
      endIndex: end,
      totalHeight,
      visibleItems: items.slice(startWithBuffer, end + 1),
    }
  }, [items, itemHeight, scrollTop, visibleItems])

  return [containerRef, visibleItemsSlice, { startIndex, endIndex, totalHeight: items.length * itemHeight }]
}

/**
 * Custom hook for efficiently rendering a large list
 * @param items Array of items
 * @param pageSize Number of items per page
 */
export function usePaginatedRendering<T>(items: T[], pageSize = 20): [T[], boolean, () => void] {
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const [hasMore, setHasMore] = useState(items.length > pageSize)

  const loadMore = useCallback(() => {
    const newCount = Math.min(visibleCount + pageSize, items.length)
    setVisibleCount(newCount)
    setHasMore(newCount < items.length)
  }, [items.length, pageSize, visibleCount])

  // Reset when items change
  useEffect(() => {
    setVisibleCount(pageSize)
    setHasMore(items.length > pageSize)
  }, [items, pageSize])

  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount)
  }, [items, visibleCount])

  return [visibleItems, hasMore, loadMore]
}

/**
 * Custom hook for efficiently rendering a grid
 * @param items Array of items
 * @param columns Number of columns
 * @param pageSize Number of items per page
 */
export function useGridRendering<T>(items: T[], columns = 3, pageSize = 30): [T[][], boolean, () => void] {
  const [visibleItems, hasMore, loadMore] = usePaginatedRendering(items, pageSize)

  const grid = useMemo(() => {
    const result: T[][] = []

    for (let i = 0; i < visibleItems.length; i += columns) {
      result.push(visibleItems.slice(i, i + columns))
    }

    return result
  }, [visibleItems, columns])

  return [grid, hasMore, loadMore]
}

/**
 * Custom hook for detecting when to load more items
 * @param loadMoreFn Function to call when more items should be loaded
 * @param options IntersectionObserver options
 */
export function useLoadMoreOnView(
  loadMoreFn: () => void,
  options: IntersectionObserverInit = {},
): React.RefObject<HTMLDivElement> {
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentRef = loadMoreRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreFn()
        }
      },
      { threshold: 0.1, ...options },
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [loadMoreFn, options])

  return loadMoreRef
}

/**
 * Custom hook for efficiently rendering a list with keyboard navigation
 * @param items Array of items
 * @param initialSelectedIndex Initial selected index
 */
export function useKeyboardNavigation<T>(
  items: T[],
  initialSelectedIndex = 0,
): [number, (index: number) => void, React.KeyboardEventHandler<HTMLElement>] {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex)

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
          break
        case "ArrowDown":
          event.preventDefault()
          setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev))
          break
        case "Home":
          event.preventDefault()
          setSelectedIndex(0)
          break
        case "End":
          event.preventDefault()
          setSelectedIndex(items.length - 1)
          break
      }
    },
    [items.length],
  )

  return [selectedIndex, setSelectedIndex, handleKeyDown]
}
