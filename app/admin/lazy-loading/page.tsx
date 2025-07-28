"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { LazyImage } from "@/components/lazy-image"

export default function AdminLazyLoadingPage() {
  const [imageUrl, setImageUrl] = useState("/placeholder.svg?height=400&width=600")
  const [imageAlt, setImageAlt] = useState("Example Image")

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
  }

  const handleImageAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageAlt(e.target.value)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Lazy Loading Test</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Lazy Load Image Demo</CardTitle>
          <CardDescription>
            Enter an image URL to test lazy loading behavior. Scroll down to see the image load.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={handleImageUrlChange}
                placeholder="e.g., /path/to/your/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="imageAlt">Image Alt Text</Label>
              <Input
                id="imageAlt"
                value={imageAlt}
                onChange={handleImageAltChange}
                placeholder="e.g., A beautiful landscape"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="h-[800px] bg-gray-800 flex items-center justify-center text-gray-400 text-xl rounded-lg mb-8">
        Scroll down to see the lazy-loaded image
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lazy Loaded Image</CardTitle>
          <CardDescription>This image will only load when it enters the viewport.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[400px] bg-gray-700 flex items-center justify-center rounded-lg overflow-hidden">
            <LazyImage src={imageUrl} alt={imageAlt} width={600} height={400} />
          </div>
        </CardContent>
      </Card>

      <div className="h-[400px] bg-gray-800 flex items-center justify-center text-gray-400 text-xl rounded-lg mt-8">
        End of scroll area
      </div>
    </div>
  )
}
