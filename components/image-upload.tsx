"use client"

import type React from "react"
import type { ProcessedImage } from "@/lib/image-processor"

import { useState } from "react"
import { ResponsiveImage } from "@/components/responsive-image"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Upload, Loader2, X } from "lucide-react"

interface ImageUploadProps {
  onUpload: (images: Record<string, ProcessedImage>) => void
  defaultImage?: string
  folder?: string
  className?: string
  sizes?: string[]
  formats?: string[]
  preserveOriginal?: boolean
}

export function ImageUpload({
  onUpload,
  defaultImage,
  folder = "uploads",
  className = "",
  sizes = ["thumbnail", "small", "medium"],
  formats = ["webp"],
  preserveOriginal = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(defaultImage || null)
  const [images, setImages] = useState<Record<string, ProcessedImage> | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 10MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Create a temporary preview
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)

      // Upload and process the image
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", folder)
      formData.append("sizes", sizes.join(","))
      formData.append("formats", formats.join(","))
      formData.append("preserveOriginal", preserveOriginal.toString())

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json()

      // Store the processed images
      setImages(data.images)

      // Call the onUpload callback with the processed images
      onUpload(data.images)

      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded and optimized successfully",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
      // Clear preview on error
      setPreview(defaultImage || null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    setImages(null)
    onUpload({})
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {preview ? (
        <div className="relative w-full max-w-xs">
          <ResponsiveImage
            src={preview}
            alt="Preview"
            width={300}
            height={300}
            className="rounded-md object-cover w-full h-auto"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center w-full max-w-xs">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
        </div>
      )}

      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Button variant="outline" disabled={isUploading}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {preview ? "Replace image" : "Upload image"}
            </>
          )}
        </Button>
      </div>

      {images && Object.keys(images).length > 0 && (
        <div className="text-xs text-muted-foreground">{Object.keys(images).length} versions created</div>
      )}
    </div>
  )
}
