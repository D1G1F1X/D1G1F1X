import { type NextRequest, NextResponse } from "next/server"
import { list } from "@vercel/blob"
import { generateCardImagePath, generateCardImagePathVariants } from "@/lib/card-image-blob-handler"

// Define the correct public Vercel Blob URL directly here
const PUBLIC_BLOB_BASE_URL = "https://0clhhm0umusm8qjw.public.blob.vercel-storage.com"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cardId = searchParams.get("cardId")
    const element = searchParams.get("element") || "spirit"

    if (!cardId) {
      return NextResponse.json({ success: false, message: "Card ID is required" }, { status: 400 })
    }

    // Generate primary path using zero-padded format for local fallback
    const primaryImagePath = generateCardImagePath(cardId, element)

    // Generate all possible filename variants for blob search
    const imagePathVariants = generateCardImagePathVariants(cardId, element)

    try {
      // List all blobs in the cards directory
      const { blobs } = await list({
        prefix: "cards/", // List blobs within the 'cards/' directory
        limit: 1000, // Adjust limit as needed for your number of images
      })

      let matchingBlob = null

      // Iterate through variants to find a matching blob
      for (const variant of imagePathVariants) {
        matchingBlob = blobs.find((blob) => {
          if (!blob.pathname) return false
          // Compare the extracted filename from blob.pathname with the variant
          const filename = blob.pathname.split("/").pop() || ""
          return filename.toLowerCase() === variant.toLowerCase() // Case-insensitive comparison
        })

        if (matchingBlob) {
          console.log(`✅ Found card image: ${variant} -> ${matchingBlob.url}`)
          break // Found a match, stop searching
        }
      }

      if (matchingBlob) {
        const filename = matchingBlob.pathname.split("/").pop() // Extract filename from pathname
        const publicImageUrl = `${PUBLIC_BLOB_BASE_URL}/cards/${filename}` // Construct public URL
        return NextResponse.json({
          success: true,
          imageUrl: publicImageUrl, // Use the constructed public URL
          filename: filename,
          format: "blob",
          cardId,
          element,
        })
      }

      // If no matching blob found, return local path with primary format as fallback
      const localImageUrl = `/cards/${primaryImagePath}`

      return NextResponse.json({
        success: true,
        imageUrl: localImageUrl,
        filename: primaryImagePath,
        format: "local",
        cardId,
        element,
        message: "No matching blob found, using local fallback with standardized naming",
      })
    } catch (blobError) {
      console.warn("Error accessing blob storage:", blobError)

      // Fallback to local path if blob storage access fails
      const localImageUrl = `/cards/${primaryImagePath}`

      return NextResponse.json({
        success: true,
        imageUrl: localImageUrl,
        filename: primaryImagePath,
        format: "local-fallback",
        cardId,
        element,
        message: "Blob storage unavailable, using local fallback",
      })
    }
  } catch (error) {
    console.error("Error in card-images API (GET):", error)

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// POST endpoint to validate multiple card images
export async function POST(request: NextRequest) {
  try {
    const { cards } = await request.json()

    if (!Array.isArray(cards)) {
      return NextResponse.json({ success: false, message: "Cards array is required" }, { status: 400 })
    }

    const results = await Promise.allSettled(
      cards.map(async ({ cardId, element = "spirit" }) => {
        const primaryPath = generateCardImagePath(cardId, element) // For local fallback
        const variants = generateCardImagePathVariants(cardId, element) // For blob search

        try {
          const { blobs } = await list({
            prefix: "cards/",
            limit: 1000,
          })

          let found = false
          let foundPath = ""

          for (const variant of variants) {
            const matchingBlob = blobs.find((blob) => {
              if (!blob.pathname) return false
              const filename = blob.pathname.split("/").pop() || ""
              return filename.toLowerCase() === variant.toLowerCase() // Case-insensitive comparison
            })

            if (matchingBlob) {
              found = true
              const filename = matchingBlob.pathname.split("/").pop()
              foundPath = `${PUBLIC_BLOB_BASE_URL}/cards/${filename}` // Construct public URL
              break
            }
          }

          return {
            cardId,
            element,
            found,
            path: found ? foundPath : `/cards/${primaryPath}`,
            format: found ? "blob" : "local",
            primaryPath,
          }
        } catch (error) {
          return {
            cardId,
            element,
            found: false,
            path: `/cards/${primaryPath}`,
            format: "local-fallback",
            primaryPath,
            error: error instanceof Error ? error.message : "Unknown error",
          }
        }
      }),
    )

    const validationResults = results
      .filter((result): result is PromiseFulfilledResult<any> => result.status === "fulfilled")
      .map((result) => result.value)

    return NextResponse.json({
      success: true,
      results: validationResults,
      total: validationResults.length,
      found: validationResults.filter((r) => r.found).length,
      missing: validationResults.filter((r) => !r.found).length,
    })
  } catch (error) {
    console.error("Error in card-images validation (POST):", error)

    return NextResponse.json(
      {
        success: false,
        message: "Validation failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
