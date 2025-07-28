import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"
import { processAndUploadImage } from "@/lib/image-processor"

export async function POST(request: NextRequest) {
  try {
    // Check authentication for admin routes
    const isAdminRoute = request.headers.get("referer")?.includes("/admin")
    if (isAdminRoute) {
      await requireAuth()
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "uploads"
    const sizesParam = formData.get("sizes") as string
    const formatsParam = formData.get("formats") as string
    const preserveOriginal = formData.get("preserveOriginal") === "true"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Parse sizes and formats from form data
    const sizes = sizesParam ? sizesParam.split(",") : ["thumbnail", "small", "medium"]
    const formats = formatsParam ? formatsParam.split(",") : ["webp"]

    // Process and upload image
    const results = await processAndUploadImage(file, {
      filename: file.name,
      folder,
      sizes: sizes as any[],
      formats: formats as any[],
      preserveOriginal,
    })

    // Return the processed images
    return NextResponse.json({
      success: true,
      images: results,
      // For backward compatibility, return the medium size URL as the main URL
      url: results["medium-webp"]?.url || Object.values(results)[0]?.url,
    })
  } catch (error) {
    console.error("Error processing and uploading image:", error)
    return NextResponse.json({ error: "Failed to process and upload image" }, { status: 500 })
  }
}
