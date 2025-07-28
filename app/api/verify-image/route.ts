import { type NextRequest, NextResponse } from "next/server"
import { normalizeImagePath } from "@/lib/image-utils"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const imagePath = searchParams.get("path")

  if (!imagePath) {
    return NextResponse.json({ error: "Image path is required" }, { status: 400 })
  }

  const normalizedPath = normalizeImagePath(imagePath)

  try {
    // For local development, we can check if the file exists in the public directory
    if (process.env.NODE_ENV === "development") {
      // In development, we can only verify images that are in the public directory
      // We'll assume the image exists and let the client handle the actual verification
      return NextResponse.json({ exists: true, path: normalizedPath })
    }

    // For production, we can make a HEAD request to check if the image exists
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ""
    const fullUrl = normalizedPath.startsWith("http") ? normalizedPath : `${baseUrl}${normalizedPath}`

    const response = await fetch(fullUrl, { method: "HEAD" })

    return NextResponse.json({
      exists: response.ok,
      path: normalizedPath,
      status: response.status,
    })
  } catch (error) {
    console.error("Error verifying image:", error)
    return NextResponse.json({ error: "Failed to verify image", details: error }, { status: 500 })
  }
}
