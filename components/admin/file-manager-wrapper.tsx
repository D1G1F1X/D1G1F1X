"use client"

import { EnhancedFileManager } from "./enhanced-file-manager"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function FileManagerWrapper() {
  const searchParams = useSearchParams()
  const [isClient, setIsClient] = useState(false)

  // This ensures we only use searchParams after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Get parameters from URL
  const path = searchParams.get("path") || "/"
  const category = searchParams.get("category") || "all"

  return <EnhancedFileManager initialPath={path} initialCategory={category} />
}
