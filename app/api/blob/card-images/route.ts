import { list } from "@vercel/blob"
import { NextResponse } from "next/server"
import { generateCardImagePathVariants } from "@/lib/card-image-blob-handler" // Re-using client-side variant generator
import { getEnv } from "@/lib/env" // Assuming getEnv is available for server-side env access

const BLOB_STORAGE_URL = getEnv("BLOB_STORAGE_URL", "https://0clhhm0umusm8qjw.public.blob.vercel-storage.com")
const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const cardId = searchParams.get("cardId")
    const element = searchParams.get("element")

    if (!cardId || !element) {
      return NextResponse.json({ success: false, message: "Missing cardId or element parameter." }, { status: 400 })
    }

    if (!BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is not set. Cannot access Vercel Blob Storage.")
      return NextResponse.json(
        { success: false, message: "Server configuration error: Blob storage token missing." },
        { status: 500 },
      )
    }

    const variants = generateCardImagePathVariants(cardId, element)
    let foundBlobUrl: string | null = null

    for (const variant of variants) {
      const pathInBlob = `cards/${variant}`
      try {
        // List blobs with the specific path as prefix to find exact match
        const { blobs } = await list({
          prefix: pathInBlob,
          limit: 1, // We only need one match
          token: BLOB_READ_WRITE_TOKEN,
        })

        if (blobs.length > 0 && blobs[0].pathname === pathInBlob) {
          foundBlobUrl = blobs[0].url
          console.log(`✅ Found blob for ${cardId}-${element} at: ${foundBlobUrl}`)
          break // Found the image, no need to check other variants
        }
      } catch (listError) {
        console.warn(`Failed to list blob for variant ${pathInBlob}:`, listError)
        // Continue to next variant if listing fails for one
      }
    }

    if (foundBlobUrl) {
      return NextResponse.json({ success: true, imageUrl: foundBlobUrl })
    } else {
      console.warn(
        `Image not found in blob storage for cardId: ${cardId}, element: ${element}. Tried variants: ${variants.join(", ")}`,
      )
      return NextResponse.json(
        { success: false, message: "Image not found in blob storage for the given card and element." },
        { status: 404 },
      )
    }
  } catch (error: any) {
    console.error("Error in /api/blob/card-images route:", error)
    return NextResponse.json(
      { success: false, message: `Internal server error: ${error.message || "Unknown error"}` },
      { status: 500 },
    )
  }
}
