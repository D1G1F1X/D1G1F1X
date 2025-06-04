"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { checkImageExists } from "@/lib/image-utils"

interface ImageStatus {
  path: string
  exists: boolean
  checked: boolean
}

export default function ImageDebug() {
  const [imageStatuses, setImageStatuses] = useState<ImageStatus[]>([])
  const [isChecking, setIsChecking] = useState(false)

  const criticalImages = [
    "/back.jpg",
    "/cards/01cauldron-fire.jpg",
    "/cards/01cauldron-water.jpg",
    "/cards/01cauldron-air.jpg",
    "/cards/01cauldron-earth.jpg",
    "/cards/01cauldron-spirit.jpg",
    "/cards/10cauldron-fire.jpg",
    "/cards/10cauldron-water.jpg",
    "/cards/10cauldron-air.jpg",
    "/cards/10cauldron-earth.jpg",
    "/cards/10cauldron-spirit.jpg",
  ]

  useEffect(() => {
    setImageStatuses(
      criticalImages.map((path) => ({
        path,
        exists: false,
        checked: false,
      })),
    )
  }, [])

  const checkImages = async () => {
    setIsChecking(true)

    const newStatuses = [...imageStatuses]

    for (let i = 0; i < newStatuses.length; i++) {
      const status = newStatuses[i]
      status.exists = await checkImageExists(status.path)
      status.checked = true
      setImageStatuses([...newStatuses])

      // Small delay to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    setIsChecking(false)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Image Debug Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button onClick={checkImages} disabled={isChecking} className="bg-purple-600 hover:bg-purple-700">
            {isChecking ? "Checking..." : "Check Critical Images"}
          </Button>
        </div>

        <div className="space-y-2">
          {imageStatuses.map((status, index) => (
            <div
              key={index}
              className={`p-2 rounded flex justify-between items-center ${
                !status.checked ? "bg-gray-800" : status.exists ? "bg-green-900/30" : "bg-red-900/30"
              }`}
            >
              <span className="font-mono text-sm">{status.path}</span>
              <span>{!status.checked ? "Not checked" : status.exists ? "✅ Found" : "❌ Not found"}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
