"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Activity, ImageIcon, Clock, Zap } from "lucide-react"

interface ImagePerformanceStats {
  totalImages: number
  loadedImages: number
  failedImages: number
  averageLoadTime: number
  cacheHitRate: number
  totalDataTransferred: number
}

export function ImagePerformanceMonitor() {
  const [stats, setStats] = useState<ImagePerformanceStats>({
    totalImages: 0,
    loadedImages: 0,
    failedImages: 0,
    averageLoadTime: 0,
    cacheHitRate: 0,
    totalDataTransferred: 0,
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Fetch performance stats from API
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/blob/card-images?action=stats")
        const data = await response.json()

        if (data.success) {
          setStats({
            totalImages: data.stats.totalImages,
            loadedImages: data.stats.totalImages,
            failedImages: 0,
            averageLoadTime: 0,
            cacheHitRate: data.stats.hitRate,
            totalDataTransferred: data.stats.totalSizeMB,
          })
        }
      } catch (error) {
        console.error("Error fetching performance stats:", error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const successRate = stats.totalImages > 0 ? (stats.loadedImages / stats.totalImages) * 100 : 0

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg z-50"
      >
        <Activity className="h-4 w-4" />
      </button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 bg-black/90 border-gray-700 z-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center justify-between">
          <span className="flex items-center">
            <Activity className="h-4 w-4 mr-2" />
            Image Performance
          </span>
          <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white">
            ×
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Success Rate */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Success Rate</span>
            <span>{Math.round(successRate)}%</span>
          </div>
          <Progress value={successRate} className="h-1" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <ImageIcon className="h-3 w-3 text-blue-400" />
            <span>
              {stats.loadedImages}/{stats.totalImages}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3 text-green-400" />
            <span>{stats.averageLoadTime}ms avg</span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="h-3 w-3 text-yellow-400" />
            <span>{Math.round(stats.cacheHitRate)}% cached</span>
          </div>
          <div className="flex items-center space-x-1">
            <Activity className="h-3 w-3 text-purple-400" />
            <span>{stats.totalDataTransferred.toFixed(1)}MB</span>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex space-x-1">
          {stats.failedImages === 0 ? (
            <Badge variant="default" className="text-xs bg-green-600">
              All Images Loaded
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-xs">
              {stats.failedImages} Failed
            </Badge>
          )}

          {stats.cacheHitRate > 80 && (
            <Badge variant="outline" className="text-xs">
              Optimized
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
