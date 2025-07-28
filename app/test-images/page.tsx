"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2, ImageIcon, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { verifyImageExistence } from "@/lib/image-utils"

export default function TestImagesPage() {
  const [imageUrl, setImageUrl] = useState("/public/numo-color-emblem.png")
  const [imageStatus, setImageStatus] = useState<"idle" | "loading" | "exists" | "not-found" | "error">("idle")
  const [imageError, setImageError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleVerifyImage = async () => {
    setImageStatus("loading")
    setImageError(null)
    try {
      const exists = await verifyImageExistence(imageUrl)
      setImageStatus(exists ? "exists" : "not-found")
      toast({
        title: "Image Verification",
        description: exists ? "Image found and accessible." : "Image not found or inaccessible.",
        variant: exists ? "default" : "destructive",
      })
    } catch (err: any) {
      setImageStatus("error")
      setImageError(err.message)
      toast({
        title: "Verification Error",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Image Test Utility</h1>
          <p className="text-muted-foreground">Test image loading and existence for any URL or local path.</p>
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Image URL Test</CardTitle>
          <CardDescription>Enter an image URL or local path to test its loading status.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL / Path</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/public/my-image.png or https://example.com/image.jpg"
            />
          </div>
          <Button onClick={handleVerifyImage} disabled={imageStatus === "loading"}>
            {imageStatus === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing...
              </>
            ) : (
              <>
                <ImageIcon className="mr-2 h-4 w-4" /> Test Image
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
          <CardDescription>Visual and status feedback for the tested image.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full h-64 border rounded-md overflow-hidden flex items-center justify-center bg-muted">
            {imageStatus === "loading" && <Loader2 className="h-12 w-12 animate-spin text-primary" />}
            {imageStatus === "exists" && (
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt="Tested Image"
                layout="fill"
                objectFit="contain"
                onError={() => setImageStatus("error")} // Fallback if Image component itself fails
              />
            )}
            {imageStatus === "not-found" && (
              <div className="text-center text-muted-foreground">
                <XCircle className="h-12 w-12 mx-auto mb-2 text-red-500" />
                <p>Image Not Found</p>
              </div>
            )}
            {imageStatus === "error" && (
              <div className="text-center text-muted-foreground">
                <XCircle className="h-12 w-12 mx-auto mb-2 text-red-500" />
                <p>Error Loading Image</p>
                {imageError && <p className="text-sm text-red-400">{imageError}</p>}
              </div>
            )}
            {imageStatus === "idle" && (
              <p className="text-muted-foreground">Enter an image URL and click "Test Image".</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <p className="font-medium">Status:</p>
            {imageStatus === "exists" && (
              <span className="flex items-center text-green-500">
                <CheckCircle className="h-4 w-4 mr-1" /> Exists
              </span>
            )}
            {imageStatus === "not-found" && (
              <span className="flex items-center text-red-500">
                <XCircle className="h-4 w-4 mr-1" /> Not Found
              </span>
            )}
            {imageStatus === "error" && (
              <span className="flex items-center text-red-500">
                <XCircle className="h-4 w-4 mr-1" /> Error
              </span>
            )}
            {imageStatus === "loading" && (
              <span className="flex items-center text-muted-foreground">
                <Loader2 className="h-4 w-4 mr-1 animate-spin" /> Loading...
              </span>
            )}
            {imageStatus === "idle" && <span className="text-muted-foreground">Idle</span>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
