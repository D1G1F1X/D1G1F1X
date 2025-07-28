import { type NextRequest, NextResponse } from "next/server"
import { list } from "@vercel/blob"

export async function GET(request: NextRequest) {
  try {
    // Check if we have the blob token
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is not configured. Cannot list blob storage.")
      return NextResponse.json(
        {
          success: false,
          error: "Blob storage token not configured. Please set BLOB_READ_WRITE_TOKEN environment variable.",
          fallback: true,
          blobs: [],
        },
        { status: 500 },
      )
    }

    console.log("Attempting to list blobs with prefix 'cards/'...")
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      limit: 1000, // Get up to 1000 files
      prefix: "cards/", // Focus on card images
    })

    console.log(`Raw blobs found by list() with prefix 'cards/': ${blobs.length} items.`)
    // console.log("Raw blobs:", JSON.stringify(blobs, null, 2)); // Uncomment for detailed raw blob debugging

    // Filter for image files only. The 'prefix' already handles the 'cards/' directory.
    const cardBlobs = blobs
      .filter((blob) => {
        const isImage = /\.(jpg|jpeg|png|webp)$/i.test(blob.pathname)
        return isImage
      })
      .map((blob) => ({
        filename: blob.pathname.split("/").pop() || "",
        pathname: blob.pathname,
        url: blob.url,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
        downloadUrl: blob.downloadUrl,
      }))

    console.log(`📦 Found ${cardBlobs.length} card images after filtering for image types.`)

    return NextResponse.json({
      success: true,
      blobs: cardBlobs,
      total: cardBlobs.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Blob comprehensive listing failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        fallback: true,
        blobs: [],
      },
      { status: 500 },
    )
  }
}
