"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, CheckCircle, XCircle, RefreshCw } from "lucide-react"

interface EmailHealthStatus {
  status: "healthy" | "unhealthy" | "unknown"
  service: string
  timestamp: string
  error?: string
}

export function EmailServiceMonitor() {
  const [healthStatus, setHealthStatus] = useState<EmailHealthStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const checkEmailHealth = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/email/health")
      const data = await response.json()

      if (response.ok && data.success) {
        setHealthStatus({
          status: "healthy",
          service: data.data.service,
          timestamp: data.data.timestamp,
        })
      } else {
        setHealthStatus({
          status: "unhealthy",
          service: "Brevo Email Service",
          timestamp: new Date().toISOString(),
          error: data.error || "Service check failed",
        })
      }
    } catch (error) {
      setHealthStatus({
        status: "unhealthy",
        service: "Brevo Email Service",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
      setLastChecked(new Date())
    }
  }

  useEffect(() => {
    checkEmailHealth()

    // Auto-refresh every 5 minutes
    const interval = setInterval(checkEmailHealth, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="w-5 h-5 animate-spin" />
    if (healthStatus?.status === "healthy") return <CheckCircle className="w-5 h-5 text-green-500" />
    if (healthStatus?.status === "unhealthy") return <XCircle className="w-5 h-5 text-red-500" />
    return <Mail className="w-5 h-5 text-gray-500" />
  }

  const getStatusBadge = () => {
    if (isLoading) return <Badge variant="secondary">Checking...</Badge>
    if (healthStatus?.status === "healthy")
      return (
        <Badge variant="default" className="bg-green-500">
          Healthy
        </Badge>
      )
    if (healthStatus?.status === "unhealthy") return <Badge variant="destructive">Unhealthy</Badge>
    return <Badge variant="secondary">Unknown</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <CardTitle>Email Service Status</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
        <CardDescription>Monitor the health and status of the Brevo email service</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {healthStatus?.error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{healthStatus.error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Service:</span>
            <p className="text-muted-foreground">{healthStatus?.service || "Unknown"}</p>
          </div>
          <div>
            <span className="font-medium">Last Checked:</span>
            <p className="text-muted-foreground">{lastChecked ? lastChecked.toLocaleString() : "Never"}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" size="sm" onClick={checkEmailHealth} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh Status
          </Button>

          <div className="text-xs text-muted-foreground">Auto-refreshes every 5 minutes</div>
        </div>
      </CardContent>
    </Card>
  )
}
