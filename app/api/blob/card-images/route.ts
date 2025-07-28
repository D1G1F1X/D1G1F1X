import { NextResponse } from "next/server"
import { head, list } from "@vercel/blob"
import { generateCardImagePathVariants } from "@/lib/card-image-blob-handler"
import { retryWithBackoff } from "@/lib/api-optimizer" // Assuming this utility exists

export const runtime = "edge"

/**
 * GET handler to find the correct image URL for a given card ID and element.
 * It tries multiple filename variants and returns the URL of the first one found.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cardId = searchParams.get("cardId")
  const element = searchParams.get("element")

  if (!cardId || !element) {
    return NextResponse.json({ success: false, message: "Missing cardId or element" }, { status: 400 })
  }

  const possibleImagePaths = generateCardImagePathVariants(cardId, element)

  for (const path of possibleImagePaths) {
    const blobPath = `cards/${path}` // Prepend 'cards/' as per blob storage structure
    try {
      // Use retryWithBackoff for resilience
      const blob = await retryWithBackoff(() => head(blobPath), {
        maxRetries: 3,
        initialDelay: 500,
        factor: 2,
        onRetry: (attempt, error) => console.warn(`Retry ${attempt} for ${blobPath}: ${error.message}`),
      })

      if (blob) {
        return NextResponse.json({ success: true, imageUrl: blob.url })
      }
    } catch (error: any) {
      // Log the error but continue trying other paths
      console.error(`Error checking blob ${blobPath}: ${error.message}`)
    }
  }

  // If no image is found after trying all variants
  return NextResponse.json({ success: false, message: "Image not found for card" }, { status: 404 })
}

/**
 * POST handler to list all card images in the blob storage.
 * This is primarily for debugging or admin purposes.
 */
export async function POST(request: Request) {
  try {
    const { blobs } = await retryWithBackoff(() => list({ prefix: "cards/" }), {
      maxRetries: 3,
      initialDelay: 500,
      factor: 2,
      onRetry: (attempt, error) => console.warn(`Retry ${attempt} for blob list: ${error.message}`),
    })

    const cardImages = blobs.map((blob) => ({
      pathname: blob.pathname,
      url: blob.url,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    }))

    return NextResponse.json({ success: true, cardImages })
  } catch (error: any) {
    console.error("Error listing card images from blob storage:", error)
    return NextResponse.json(
      { success: false, message: "Failed to list card images", error: error.message },
      { status: 500 },
    )
  }
}
