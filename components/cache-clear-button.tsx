"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Trash2 } from "lucide-react"

export function CacheClearButton() {
  const [isClearing, setIsClearing] = useState(false)

  const clearAllCaches = async () => {
    setIsClearing(true)

    try {
      // Clear browser caches
      if ("caches" in window) {
        const cacheNames = await caches.keys()
        await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)))
        console.log("Service Worker caches cleared")
      }

      // Clear localStorage
      localStorage.clear()
      console.log("localStorage cleared")

      // Clear sessionStorage
      sessionStorage.clear()
      console.log("sessionStorage cleared")

      // Force reload with cache bypass
      window.location.reload()
    } catch (error) {
      console.error("Error clearing caches:", error)
      // Fallback: just reload the page
      window.location.reload()
    } finally {
      setIsClearing(false)
    }
  }

  return (
    <Button onClick={clearAllCaches} disabled={isClearing} variant="outline" size="sm" className="gap-2">
      {isClearing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      {isClearing ? "Clearing..." : "Clear Cache"}
    </Button>
  )
}
