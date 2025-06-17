import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic" // Added to force dynamic rendering

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cardId = searchParams.get("cardId") // e.g., "0-Cauldron", "10-Cauldron"
    const element = searchParams.get("element") // e.g., "Spirit", "Fire"

    if (!cardId || !element) {
      return NextResponse.json({ success: false, error: "Missing cardId or element parameter" }, { status: 400 })
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ success: false, error: "Blob storage not configured" }, { status: 503 })
    }

    try {
      const { list } = await import("@vercel/blob")

      const response = await list({
        prefix: "cards/", // List only blobs within the 'cards/' directory
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })

      if (!response || !response.blobs) {
        return NextResponse.json({ success: false, error: "Invalid blob storage response" }, { status: 500 })
      }

      // Parse cardId and element to generate expected filename components
      const [numberPart, suitPart] = cardId.split("-")
      const paddedNumber = String(numberPart).padStart(2, "0") // Ensure two digits (e.g., "0" -> "00")
      const lowerSuit = suitPart?.toLowerCase() || ""
      const lowerElement = element.toLowerCase()

      // Generate all plausible filename prefixes based on common naming conventions
      // This accounts for variations in how files might have been uploaded (with/without hyphen between number and suit)
      const possiblePrefixes = [
        `${paddedNumber}-${lowerSuit}-${lowerElement}`, // Primary: e.g., "00-cauldron-spirit"
        `${paddedNumber}${lowerSuit}-${lowerElement}`, // Alternative: e.g., "00cauldron-spirit"
      ]

      const validExtensions = [".jpg", ".jpeg", ".png", ".webp"] // Include common image types

      // Iterate through all blobs to find a match
      for (const blob of response.blobs) {
        const filename = blob.pathname.split("/").pop() // Get just the filename from the full path

        if (filename) {
          for (const prefix of possiblePrefixes) {
            // Check if the filename starts with the expected prefix
            // AND ends with a valid image extension (case-insensitive)
            // This allows for the unique hash that Vercel Blob appends in the middle of the filename
            if (filename.startsWith(prefix) && validExtensions.some((ext) => filename.toLowerCase().endsWith(ext))) {
              return NextResponse.json({
                success: true,
                imageUrl: blob.url, // Return the full blob URL
                filename: filename,
              })
            }
          }
        }
      }

      // If no matching image is found after checking all possibilities
      return NextResponse.json({ success: false, error: "Image not found in blob storage" }, { status: 404 })
    } catch (blobError) {
      console.error("Blob storage error:", blobError)
      return NextResponse.json({ success: false, error: "Blob storage access failed" }, { status: 500 })
    }
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
