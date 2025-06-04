"use client"

import { useState } from "react"
import { ImageUpload } from "@/components/image-upload"
import { ResponsiveImage } from "@/components/responsive-image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ProcessedImage } from "@/lib/image-processor"

export default function ImageOptimizationPage() {
  const [images, setImages] = useState<Record<string, ProcessedImage>>({})

  const handleImageUpload = (processedImages: Record<string, ProcessedImage>) => {
    setImages(processedImages)
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Image Optimization Demo</h1>
        <p className="text-muted-foreground">Upload an image to see automatic optimization and resizing in action</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload an Image</CardTitle>
            <CardDescription>Images will be automatically optimized and resized to multiple dimensions</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload
              onUpload={handleImageUpload}
              folder="demo"
              sizes={["thumbnail", "small", "medium", "large"]}
              formats={["webp", "jpeg"]}
              preserveOriginal={true}
            />
          </CardContent>
        </Card>

        {Object.keys(images).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Optimization Results</CardTitle>
              <CardDescription>{Object.keys(images).length} versions created</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(images).map(([key, image]) => (
                      <div key={key} className="space-y-2">
                        <div className="aspect-square bg-muted rounded-md overflow-hidden">
                          <ResponsiveImage
                            src={image.url}
                            alt={key}
                            width={image.width}
                            height={image.height}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="text-xs text-center">
                          {key} ({image.width}x{image.height})
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="details">
                  <div className="space-y-4">
                    {Object.entries(images).map(([key, image]) => (
                      <div key={key} className="border rounded-md p-4">
                        <h3 className="font-medium mb-2">{key}</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <div className="text-muted-foreground">Format:</div>
                          <div>{image.format}</div>
                          <div className="text-muted-foreground">Dimensions:</div>
                          <div>
                            {image.width}x{image.height}
                          </div>
                          <div className="text-muted-foreground">Size:</div>
                          <div>{(image.size / 1024).toFixed(2)} KB</div>
                          <div className="text-muted-foreground">URL:</div>
                          <div className="truncate">
                            <a
                              href={image.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {image.url}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
