"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { BlobStorageStatus } from "@/components/blob-storage-status"

interface BlobDiagnosticResult {
  filename: string
  exists: boolean
  url?: string
  error?: string
}

export default function BlobDiagnosticsPage() {
  const [cardId, setCardId] = useState("01-Cauldron")
  const [element, setElement] = useState("fire")
  const [testResult, setTestResult] = useState<BlobDiagnosticResult | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleTestBlob = async () => {
    setLoading(true)
    setTestResult(null)
    try {
      const response = await fetch(`/api/blob/test-card?cardId=${cardId}&element=${element}`)
      const data: BlobDiagnosticResult = await response.json()
      setTestResult(data)
      if (data.exists) {
        toast({
          title: "Success",
          description: `Blob for ${data.filename} exists!`,
          variant: "default",
        })
      } else {
        toast({
          title: "Error",
          description: `Blob for ${data.filename} does not exist or an error occurred: ${data.error}`,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("Error testing blob:", error)
      setTestResult({
        filename: `${cardId}-${element}.jpg`,
        exists: false,
        error: error.message || "Network error",
      })
      toast({
        title: "Error",
        description: `Failed to test blob: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Blob Storage Diagnostics</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Test Single Card Blob</CardTitle>
            <CardDescription>Check if a specific card image exists in Vercel Blob Storage.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardId">Card ID (e.g., 01-Cauldron)</Label>
                <Input
                  id="cardId"
                  value={cardId}
                  onChange={(e) => setCardId(e.target.value)}
                  placeholder="e.g., 01-Cauldron"
                />
              </div>
              <div>
                <Label htmlFor="element">Element (e.g., fire)</Label>
                <Input
                  id="element"
                  value={element}
                  onChange={(e) => setElement(e.target.value)}
                  placeholder="e.g., fire"
                />
              </div>
              <Button onClick={handleTestBlob} disabled={loading}>
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Testing...
                  </>
                ) : (
                  "Test Blob"
                )}
              </Button>

              {testResult && (
                <Alert variant={testResult.exists ? "default" : "destructive"}>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>{testResult.exists ? "Success!" : "Failed!"}</AlertTitle>
                  <AlertDescription>
                    <p>
                      <strong>Filename:</strong> {testResult.filename}
                    </p>
                    <p>
                      <strong>Exists:</strong> {testResult.exists ? "Yes" : "No"}
                    </p>
                    {testResult.url && (
                      <p>
                        <strong>URL:</strong>{" "}
                        <a href={testResult.url} target="_blank" rel="noopener noreferrer" className="underline">
                          {testResult.url}
                        </a>
                      </p>
                    )}
                    {testResult.error && (
                      <p>
                        <strong>Error:</strong> {testResult.error}
                      </p>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overall Blob Storage Status</CardTitle>
            <CardDescription>Monitor the connection and status of your Vercel Blob Storage.</CardDescription>
          </CardHeader>
          <CardContent>
            <BlobStorageStatus />
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Blob Validation & Management Tools</CardTitle>
          <CardDescription>Links to other admin tools for blob storage.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Button onClick={() => (window.location.href = "/admin/blob-manager")}>
              <RefreshCw className="mr-2 h-4 w-4" /> Manage Blobs
            </Button>
            <Button onClick={() => (window.location.href = "/admin/verify-card-images")}>
              <CheckCircle className="mr-2 h-4 w-4" /> Verify All Card Images
            </Button>
            <Button onClick={() => (window.location.href = "/admin/image-optimization")}>
              <XCircle className="mr-2 h-4 w-4" /> Image Optimization
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
