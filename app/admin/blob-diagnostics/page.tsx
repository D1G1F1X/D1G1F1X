"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, CheckCircle, XCircle, AlertCircle, Database, Activity, HardDrive } from "lucide-react"

interface HealthStatus {
  connection: any
  storage: any
  metrics: any
  status: "healthy" | "degraded" | "error"
}

export default function BlobDiagnosticsPage() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [testResults, setTestResults] = useState<any[]>([])

  const runHealthCheck = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/blob/verify?action=health")
      const data = await response.json()

      if (data.success) {
        setHealthStatus(data.health)
        setLastUpdated(new Date())
      } else {
        console.error("Health check failed:", data.error)
      }
    } catch (error) {
      console.error("Error running health check:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const testSpecificCard = async (cardId: string, element: string) => {
    try {
      const response = await fetch(`/api/blob/test-card?cardId=${cardId}&element=${element}`)
      const data = await response.json()

      setTestResults((prev) => [data.test, ...prev.slice(0, 9)]) // Keep last 10 results
    } catch (error) {
      console.error("Error testing card:", error)
    }
  }

  useEffect(() => {
    runHealthCheck()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-400"
      case "degraded":
        return "text-yellow-400"
      case "error":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-yellow-400" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-400" />
      default:
        return <RefreshCw className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blob Storage Diagnostics</h1>
        <div className="flex items-center space-x-4">
          {lastUpdated && (
            <span className="text-sm text-gray-400">Last updated: {lastUpdated.toLocaleTimeString()}</span>
          )}
          <Button onClick={runHealthCheck} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overall Status */}
      {healthStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getStatusIcon(healthStatus.status)}
              <span>System Status</span>
              <Badge variant={healthStatus.status === "healthy" ? "default" : "destructive"}>
                {healthStatus.status.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {healthStatus.connection.details?.imagesFound || 0}
                </div>
                <div className="text-sm text-gray-400">Images Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{healthStatus.metrics.cache.verifiedImages}</div>
                <div className="text-sm text-gray-400">Verified Images</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {Math.round(healthStatus.connection.details?.averageResponseTime || 0)}ms
                </div>
                <div className="text-sm text-gray-400">Response Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Metrics */}
      {healthStatus && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Connection Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Connection Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>URL Accessible:</span>
                <Badge variant={healthStatus.connection.details?.urlAccessible ? "default" : "destructive"}>
                  {healthStatus.connection.details?.urlAccessible ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Sample Image Test:</span>
                <Badge variant={healthStatus.connection.details?.sampleImageAccessible ? "default" : "destructive"}>
                  {healthStatus.connection.details?.sampleImageAccessible ? "Pass" : "Fail"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Images Found:</span>
                <span>{healthStatus.connection.details?.imagesFound}</span>
              </div>
              <div className="flex justify-between">
                <span>Response Time:</span>
                <span>{healthStatus.connection.details?.averageResponseTime}ms</span>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Total Requests:</span>
                <span>{healthStatus.metrics.performance.totalRequests}</span>
              </div>
              <div className="flex justify-between">
                <span>Successful Loads:</span>
                <span className="text-green-400">{healthStatus.metrics.performance.successfulLoads}</span>
              </div>
              <div className="flex justify-between">
                <span>Failed Loads:</span>
                <span className="text-red-400">{healthStatus.metrics.performance.failedLoads}</span>
              </div>
              <div className="flex justify-between">
                <span>Cache Hits:</span>
                <span className="text-blue-400">{healthStatus.metrics.performance.cacheHits}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Load Time:</span>
                <span>{Math.round(healthStatus.metrics.performance.averageLoadTime)}ms</span>
              </div>
            </CardContent>
          </Card>

          {/* Cache Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HardDrive className="h-5 w-5 mr-2" />
                Cache Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Total Images:</span>
                <span>{healthStatus.metrics.cache.totalImages}</span>
              </div>
              <div className="flex justify-between">
                <span>Verified Images:</span>
                <span className="text-green-400">{healthStatus.metrics.cache.verifiedImages}</span>
              </div>
              <div className="flex justify-between">
                <span>Cache Size:</span>
                <span>{(healthStatus.metrics.cache.totalSize / 1024 / 1024).toFixed(2)}MB</span>
              </div>
              <div className="flex justify-between">
                <span>Cache Age:</span>
                <span>{Math.round(healthStatus.metrics.cache.cacheAge / 60000)}min</span>
              </div>
            </CardContent>
          </Card>

          {/* Error Summary */}
          {healthStatus.metrics.errors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
                  Recent Errors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {healthStatus.metrics.errors.slice(0, 5).map((error, index) => (
                    <Alert key={index} className="py-2">
                      <AlertDescription className="text-xs">
                        <div className="font-medium">{error.key}</div>
                        <div className="text-gray-400">{error.error}</div>
                        <div className="text-gray-500">Attempts: {error.attempts}</div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Quick Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Card Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {[
              { id: "0-Cauldron", element: "Spirit" },
              { id: "1-Cauldron", element: "Fire" },
              { id: "2-Sword", element: "Water" },
              { id: "3-Cord", element: "Fire" },
            ].map((test) => (
              <Button
                key={`${test.id}-${test.element}`}
                variant="outline"
                size="sm"
                onClick={() => testSpecificCard(test.id, test.element)}
                className="text-xs"
              >
                Test {test.id}-{test.element}
              </Button>
            ))}
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Recent Test Results:</h4>
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {testResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between text-xs bg-gray-800 p-2 rounded">
                    <span>
                      {result.cardId}-{result.element}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Badge variant={result.isPlaceholder ? "destructive" : "default"} className="text-xs">
                        {result.isPlaceholder ? "Placeholder" : "Found"}
                      </Badge>
                      <span className="text-gray-400">{result.loadTime}ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
