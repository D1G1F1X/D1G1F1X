import { type NextRequest, NextResponse } from "next/server"
import { head } from "@vercel/blob"
import { generateCardImagePath, generateCardImagePathVariants } from "@/lib/card-image-blob-handler"

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
        // Use head to check if the blob exists without downloading it
        await head(blobPath)
        // If head succeeds, the blob exists, return its public URL
        const imageUrl = `${PUBLIC_BLOB_BASE_URL}/${blobPath}`
        return NextResponse.json({ success: true, imageUrl })
      } catch (error: any) {
        // If head fails, it means the blob doesn't exist at this path, try next variant
        if (error.message.includes("BlobNotFound")) {
          // console.log(`Blob not found for path: ${blobPath}, trying next variant.`)
          continue
        } else {
          // Other errors (e.g., network issues) should be logged
          console.error(`Error checking blob ${blobPath}:`, error)
          // Continue to next variant or rethrow if critical
          continue
        }
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
            // Use head to check if the blob exists without downloading it
            await head(blobPath)
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
            // If head fails, it means the blob doesn't exist at this path, try next variant
            if (error.message.includes("BlobNotFound")) {
              // console.log(`Blob not found for path: ${blobPath}, trying next variant.`)
              continue
            } else {
              // Other errors (e.g., network issues) should be logged
              console.error(`Error checking blob ${blobPath}:`, error)
              // Continue to next variant or rethrow if critical
              continue
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
