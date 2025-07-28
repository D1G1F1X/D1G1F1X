import { list } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Check if we have the required token
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        {
          error: "Blob storage token not configured",
          blobs: [],
          fallback: true,
        },
        { status: 200 }, // Return 200 so the client can handle fallback
      )
    }

    // List all blobs with the cards prefix
    const { blobs } = await list({
      prefix: "cards/",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    console.log(`📦 API: Found ${blobs.length} card images in blob storage`)

    // Transform blob data for client consumption
    const transformedBlobs = blobs.map((blob) => ({
      pathname: blob.pathname,
      filename: blob.pathname.split("/").pop() || "",
      url: blob.url,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    }))

    return NextResponse.json({
      success: true,
      blobs: transformedBlobs,
      total: blobs.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ API: Failed to list blob storage:", error)

    // Return error but with 200 status so client can handle fallback
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        blobs: [],
        fallback: true,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    )
  }
}

// Optional: Add a health check endpoint
export async function HEAD(request: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return new NextResponse(null, { status: 503 })
    }

    // Quick test to see if blob storage is accessible
    await list({
      prefix: "cards/",
      limit: 1,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    return new NextResponse(null, { status: 503 })
  }
}
