"use client"

import { useState, useEffect } from "react"

interface YouTubeVideoProps {
  videoId: string
  title: string
  className?: string
}

export default function YouTubeVideo({ videoId, title, className = "" }: YouTubeVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`w-full aspect-video rounded-lg overflow-hidden bg-gray-800 ${className}`}>
      {!isLoaded && !hasError && (
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <div className="animate-pulse text-white">Loading video...</div>
        </div>
      )}

      {hasError && (
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <div className="text-red-400 text-center p-4">
            <p>Unable to load video</p>
            <button
              onClick={() => {
                setHasError(false)
                setIsLoaded(false)
                setTimeout(() => setIsLoaded(true), 500)
              }}
              className="mt-2 px-4 py-2 bg-purple-600 rounded-md text-white hover:bg-purple-700"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <iframe
        className={`w-full aspect-video ${isLoaded ? "block" : "hidden"}`}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}
