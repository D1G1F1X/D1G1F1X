"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface YouTubeVideoProps {
  videoId: string
  title: string
  className?: string
}

export function YouTubeVideo({ videoId, title, className = "" }: YouTubeVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  if (!isLoaded) {
    return (
      <div className={`relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden ${className}`}>
        <img
          src={thumbnailUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to default thumbnail if maxres doesn't exist
            e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Button
            onClick={() => setIsLoaded(true)}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4"
          >
            <Play className="h-8 w-8 ml-1" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white font-semibold">{title}</h3>
        </div>
      </div>
    )
  }

  return (
    <div className={`aspect-video ${className}`}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg"
      />
    </div>
  )
}

export default YouTubeVideo
