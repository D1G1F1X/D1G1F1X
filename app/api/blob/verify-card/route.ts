import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, filename } = await request.json()

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    // Test image accessibility
    const startTime = Date.now()

    try {
      const response = await fetch(imageUrl, {
        method: "HEAD",
        signal: AbortSignal.timeout(8000), // 8 second timeout
      })

      const loadTime = Date.now() - startTime
      const isAccessible = response.ok

      return NextResponse.json({
        success: true,
        filename: filename || "unknown",
        url: imageUrl,
        isAccessible,
        loadTime,
        status: response.status,
        contentType: response.headers.get("content-type"),
        contentLength: response.headers.get("content-length"),
        timestamp: new Date().toISOString(),
      })
    } catch (fetchError) {
      const loadTime = Date.now() - startTime

      return NextResponse.json({
        success: false,
        filename: filename || "unknown",
        url: imageUrl,
        isAccessible: false,
        loadTime,
        error: fetchError instanceof Error ? fetchError.message : "Fetch failed",
        timestamp: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("❌ API: Failed to verify card image:", error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
