import { type NextRequest, NextResponse } from "next/server"
import { list } from "@vercel/blob"
import { generateCardImagePath, generateCardImagePathVariants } from "@/lib/card-image-blob-handler"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cardId = searchParams.get("cardId")
    const element = searchParams.get("element") || "spirit"

    if (!cardId) {
      return NextResponse.json({ success: false, message: "Card ID is required" }, { status: 400 })
    }

    // Generate primary path using zero-padded format
    const primaryImagePath = generateCardImagePath(cardId, element)

    // Generate all possible variants for fallback
    const imagePathVariants = generateCardImagePathVariants(cardId, element)

    try {
      // List all blobs in the cards directory
      const { blobs } = await list({
        prefix: "cards/",
        limit: 1000,
      })

      // Try to find the image using variants (prioritizing the new format)
      let matchingBlob = null

      for (const variant of imagePathVariants) {
        matchingBlob = blobs.find((blob) => {
          if (!blob.pathname) return false
          const filename = blob.pathname.split("/").pop() || ""
          return filename === variant || blob.pathname.endsWith(variant)
        })

        if (matchingBlob) {
          console.log(`✅ Found card image: ${variant} -> ${matchingBlob.url}`)
          break
        }
      }

      if (matchingBlob) {
        return NextResponse.json({
          success: true,
          imageUrl: matchingBlob.url,
          filename: matchingBlob.pathname.split("/").pop(),
          format: "blob",
          cardId,
          element,
        })
      }

      // If not found in blob storage, return local path with primary format
      const localImageUrl = `/cards/${primaryImagePath}`

      return NextResponse.json({
        success: true,
        imageUrl: localImageUrl,
        filename: primaryImagePath,
        format: "local",
        cardId,
        element,
        message: "Using local fallback with standardized naming",
      })
    } catch (blobError) {
      console.warn("Error accessing blob storage:", blobError)

      // Fallback to local path
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
    console.error("Error in card-images API:", error)

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
        const primaryPath = generateCardImagePath(cardId, element)
        const variants = generateCardImagePathVariants(cardId, element)

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
              return filename === variant
            })

            if (matchingBlob) {
              found = true
              foundPath = matchingBlob.url
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
    console.error("Error in card-images validation:", error)

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
