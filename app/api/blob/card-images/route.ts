import { type NextRequest, NextResponse } from "next/server"
import { head } from "@vercel/blob"
import { generateCardImagePath, generateCardImagePathVariants } from "@/lib/card-image-blob-handler"
import { retryWithBackoff } from "@/lib/api-optimizer" // Import retryWithBackoff

// Define the correct public Vercel Blob URL directly here
const PUBLIC_BLOB_BASE_URL = "https://0clhhm0umusm8qjw.public.blob.vercel-storage.com"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const cardId = searchParams.get("cardId")
  const element = searchParams.get("element") || "spirit"

  if (!cardId) {
    return NextResponse.json({ success: false, message: "Card ID is required" }, { status: 400 })
  }

  try {
    const possibleFileNames = generateCardImagePathVariants(cardId, element)

    for (const fileName of possibleFileNames) {
      const blobPath = `cards/${fileName}`
      try {
        // Use retryWithBackoff for the head call
        await retryWithBackoff(async () => {
          await head(blobPath)
        })
        // If head succeeds, the blob exists, return its public URL
        const imageUrl = `${PUBLIC_BLOB_BASE_URL}/${blobPath}`
        return NextResponse.json({ success: true, imageUrl })
      } catch (error: any) {
        // Log the specific error message for better debugging
        console.warn(`Failed to check blob ${blobPath} after retries. Error: ${error.message || error}`)
        // If any error occurs after retries, treat this specific variant as not found
        // and continue to the next possible filename variant.
        // This prevents a 500 error for the entire API call if one variant fails persistently.
        continue
      }
    }

    // If no image is found after trying all variants
    return NextResponse.json({ success: false, message: "Card image not found for any variant" }, { status: 404 })
  } catch (error) {
    console.error("Error in GET /api/blob/card-images:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
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
        const possibleFileNames = generateCardImagePathVariants(cardId, element)

        for (const fileName of possibleFileNames) {
          const blobPath = `cards/${fileName}`
          try {
            // Use retryWithBackoff for the head call
            await retryWithBackoff(async () => {
              await head(blobPath)
            })
            // If head succeeds, the blob exists, return its public URL
            const imageUrl = `${PUBLIC_BLOB_BASE_URL}/${blobPath}`
            return {
              cardId,
              element,
              found: true,
              path: imageUrl,
              format: "blob",
            }
          } catch (error: any) {
            // Log the specific error message for better debugging
            console.warn(`Error checking blob ${blobPath} during POST validation: ${error.message}`)
            if (error.message.includes("BlobNotFound")) {
              // Continue to next variant if blob not found
              continue
            } else {
              // For other errors, return as not found for this specific card, but don't stop the whole batch
              return {
                cardId,
                element,
                found: false,
                path: `/cards/${generateCardImagePath(cardId, element)}`,
                format: "local-fallback",
                error: error instanceof Error ? error.message : "Unknown error during blob check",
              }
            }
          }
        }

        // If no image is found after trying all variants
        return {
          cardId,
          element,
          found: false,
          path: `/cards/${generateCardImagePath(cardId, element)}`,
          format: "local",
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
