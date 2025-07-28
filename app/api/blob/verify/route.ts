import { NextResponse } from "next/server"
import {
  testBlobStorageConnection,
  verifyBlobStorageAndListImages,
  getVerifiedImageMetrics,
  getVerifiedCardImage,
} from "@/lib/verified-blob-handler"
import { head } from "@vercel/blob"

/**
 * API route for blob storage verification and diagnostics
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action") || "test"

    switch (action) {
      case "test":
        const testResult = await testBlobStorageConnection()
        return NextResponse.json({
          success: testResult.success,
          connectionTest: testResult,
          timestamp: new Date().toISOString(),
        })

      case "verify":
        const verification = await verifyBlobStorageAndListImages()
        return NextResponse.json({
          success: verification.isValid,
          verification,
          timestamp: new Date().toISOString(),
        })

      case "metrics":
        const metrics = getVerifiedImageMetrics()
        return NextResponse.json({
          success: true,
          metrics,
          timestamp: new Date().toISOString(),
        })

      case "health":
        // Comprehensive health check
        const [connectionTest, storageVerification] = await Promise.all([
          testBlobStorageConnection(),
          verifyBlobStorageAndListImages(),
        ])

        const healthMetrics = getVerifiedImageMetrics()

        return NextResponse.json({
          success: connectionTest.success && storageVerification.isValid,
          health: {
            connection: connectionTest,
            storage: storageVerification,
            metrics: healthMetrics,
            status: connectionTest.success && storageVerification.isValid ? "healthy" : "degraded",
          },
          timestamp: new Date().toISOString(),
        })

      case "vercel-connectivity":
        // Attempt to access a known blob or just list to check connectivity
        // For a simple connectivity check, we can try to list a small number of blobs
        // or check for a specific, known test blob.
        // For now, let's just try to list to see if the service is reachable.
        const { blobs } = await head("test-connection.txt") // Assuming you have a small test file
        // If head returns a blob, it means connection is successful.
        if (blobs) {
          return NextResponse.json({ success: true, message: "Vercel Blob Storage is accessible." })
        } else {
          return NextResponse.json(
            { success: false, message: "Vercel Blob Storage is not accessible or test file not found." },
            { status: 500 },
          )
        }

      default:
        return NextResponse.json({ success: false, error: "Invalid action parameter" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error in blob verification API:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Verification failed",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, cardId, element } = body

    if (action === "verify-card") {
      if (!cardId || !element) {
        return NextResponse.json({ success: false, error: "Missing cardId or element" }, { status: 400 })
      }

      const result = await getVerifiedCardImage(cardId, element)

      return NextResponse.json({
        success: true,
        cardVerification: {
          cardId,
          element,
          url: result.url,
          isPlaceholder: result.isPlaceholder,
          loadTime: result.loadTime,
          cached: result.cached,
          error: result.error,
        },
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Error in blob verification POST:", error)
    return NextResponse.json(
      {
        success: false,
        error: "POST verification failed",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
