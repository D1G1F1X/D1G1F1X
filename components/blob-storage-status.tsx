"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Cloud, FolderOpen } from "lucide-react"

export function BlobStorageStatus() {
  const [status, setStatus] = useState<"checking" | "available" | "unavailable">("checking")

  useEffect(() => {
    checkBlobStorageStatus()
  }, [])

  const checkBlobStorageStatus = async () => {
    try {
      const response = await fetch("/api/blob/list-cards", {
        method: "HEAD",
      })

      if (response.ok) {
        setStatus("available")
      } else {
        setStatus("unavailable")
      }
    } catch (error) {
      setStatus("unavailable")
    }
  }

  if (status === "checking") {
    return (
      <Badge variant="outline" className="flex items-center">
        <Cloud className="h-3 w-3 mr-1 animate-pulse" />
        Checking...
      </Badge>
    )
  }

  if (status === "available") {
    return (
      <Badge variant="default" className="flex items-center bg-green-600">
        <Cloud className="h-3 w-3 mr-1" />
        Blob Storage
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className="flex items-center">
      <FolderOpen className="h-3 w-3 mr-1" />
      Local Images
    </Badge>
  )
}
