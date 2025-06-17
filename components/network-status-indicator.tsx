"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, AlertTriangle } from "lucide-react"

interface NetworkStatusProps {
  onStatusChange?: (status: "online" | "offline" | "slow") => void
}

export function NetworkStatusIndicator({ onStatusChange }: NetworkStatusProps) {
  const [networkStatus, setNetworkStatus] = useState<"online" | "offline" | "slow">("online")
  const [connectionSpeed, setConnectionSpeed] = useState<number | null>(null)

  useEffect(() => {
    const checkNetworkStatus = async () => {
      try {
        const startTime = Date.now()

        // Test connection with a small image from the blob storage
        const response = await fetch("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cards/", {
          method: "HEAD",
          cache: "no-cache",
        })

        const endTime = Date.now()
        const responseTime = endTime - startTime
        setConnectionSpeed(responseTime)

        if (response.ok) {
          if (responseTime > 3000) {
            setNetworkStatus("slow")
          } else {
            setNetworkStatus("online")
          }
        } else {
          setNetworkStatus("offline")
        }
      } catch (error) {
        setNetworkStatus("offline")
        setConnectionSpeed(null)
      }
    }

    // Initial check
    checkNetworkStatus()

    // Check every 30 seconds
    const interval = setInterval(checkNetworkStatus, 30000)

    // Listen for online/offline events
    const handleOnline = () => checkNetworkStatus()
    const handleOffline = () => setNetworkStatus("offline")

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      clearInterval(interval)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  useEffect(() => {
    onStatusChange?.(networkStatus)
  }, [networkStatus, onStatusChange])

  const getStatusColor = () => {
    switch (networkStatus) {
      case "online":
        return "bg-green-600"
      case "slow":
        return "bg-yellow-600"
      case "offline":
        return "bg-red-600"
    }
  }

  const getStatusIcon = () => {
    switch (networkStatus) {
      case "online":
        return <Wifi className="h-3 w-3" />
      case "slow":
        return <AlertTriangle className="h-3 w-3" />
      case "offline":
        return <WifiOff className="h-3 w-3" />
    }
  }

  const getStatusText = () => {
    switch (networkStatus) {
      case "online":
        return `Connected${connectionSpeed ? ` (${connectionSpeed}ms)` : ""}`
      case "slow":
        return `Slow Connection${connectionSpeed ? ` (${connectionSpeed}ms)` : ""}`
      case "offline":
        return "Offline"
    }
  }

  return (
    <Badge variant="outline" className={`text-xs ${getStatusColor()} text-white border-0`}>
      {getStatusIcon()}
      <span className="ml-1">{getStatusText()}</span>
    </Badge>
  )
}
