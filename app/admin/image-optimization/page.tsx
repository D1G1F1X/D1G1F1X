"use client"

import { Input } from "@/components/ui/input"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RefreshCw, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

export default function AdminImageOptimizationPage() {
  const [optimizationProgress, setOptimizationProgress] = useState(0)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationStatus, setOptimizationStatus] = useState<"idle" | "in-progress" | "completed" | "failed">("idle")
  const [optimizationMessage, setOptimizationMessage] = useState("")

  const handleOptimizeImages = async () => {
    setIsOptimizing(true)
    setOptimizationStatus("in-progress")
    setOptimizationProgress(0)
    setOptimizationMessage("Starting image optimization...")

    try {
      // Simulate optimization process
      for (let i = 0; i <= 100; i += 10) {
        setOptimizationProgress(i)
        setOptimizationMessage(`Optimizing... ${i}% complete`)
        await new Promise((resolve) => setTimeout(resolve, 200)) // Simulate work
      }

      setOptimizationStatus("completed")
      setOptimizationMessage("Image optimization completed successfully!")
    } catch (error) {
      console.error("Image optimization failed:", error)
      setOptimizationStatus("failed")
      setOptimizationMessage("Image optimization failed. Please check logs.")
    } finally {
      setIsOptimizing(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Image Optimization</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Optimize Card Images</CardTitle>
          <CardDescription>
            Compress and optimize card images for faster loading and better performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleOptimizeImages} disabled={isOptimizing}>
            {isOptimizing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Optimizing...
              </>
            ) : (
              "Run Image Optimization"
            )}
          </Button>

          {optimizationStatus !== "idle" && (
            <div className="mt-4">
              <Progress value={optimizationProgress} className="w-full" />
              <p className="mt-2 text-sm text-gray-400">{optimizationMessage}</p>
              {optimizationStatus === "completed" && (
                <div className="mt-2 flex items-center text-green-500">
                  <CheckCircle className="mr-2 h-5 w-5" /> Optimization successful!
                </div>
              )}
              {optimizationStatus === "failed" && (
                <div className="mt-2 flex items-center text-red-500">
                  <XCircle className="mr-2 h-5 w-5" /> Optimization failed.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Image Optimization Settings</CardTitle>
          <CardDescription>Configure global image optimization parameters.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Compression Quality</h3>
              <p className="text-sm text-gray-400">Adjust the quality of compressed images (0-100).</p>
              <Input type="number" defaultValue={80} min={0} max={100} className="mt-2 w-32" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Image Formats</h3>
              <p className="text-sm text-gray-400">Select preferred output formats (e.g., WebP, JPEG).</p>
              <div className="mt-2 flex gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" defaultChecked />
                  <span className="ml-2">WebP</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" defaultChecked />
                  <span className="ml-2">JPEG</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">PNG</span>
                </label>
              </div>
            </div>
            <Button>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
