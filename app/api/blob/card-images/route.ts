import { type NextRequest, NextResponse } from "next/server"
import { list } from "@vercel/blob"
import { generateCardImagePath, generateCardImagePathVariants } from "@/lib/card-image-blob-handler"

// Helper to extract base filename without extension
const getBaseFilename = (filename: string) => filename.replace(/\.(jpg|jpeg|png|webp)$/i, "")

export async function GET(request: NextRequest) {
  try {
    // Check for BLOB_READ_WRITE_TOKEN
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is not set. Cannot access Vercel Blob storage.")
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error: BLOB_READ_WRITE_TOKEN is missing.",
          error: "MISSING_BLOB_TOKEN",
        },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(request.url)
    const cardId = searchParams.get("cardId")
    const element = searchParams.get("element") || "spirit"

    if (!cardId) {
      return NextResponse.json({ success: false, message: "Card ID is required" }, { status: 400 })
    }

    const primaryFilename = generateCardImagePath(cardId, element)
    const filenameVariants = generateCardImagePathVariants(cardId, element)

    try {
      const { blobs } = await list({
        prefix: "cards/",
        limit: 1000,
      })

      let matchingBlob = null

      // Prioritize the primary filename first
      const primaryBaseName = getBaseFilename(primaryFilename)
      matchingBlob = blobs.find((blob) => {
        if (!blob.pathname) return false
        const blobFilename = blob.pathname.split("/").pop() || ""
        const blobBaseName = getBaseFilename(blobFilename)
        return blobBaseName.startsWith(primaryBaseName) && blobFilename.endsWith(primaryFilename.split(".").pop() || "")
      })

      // If primary not found, try other variants
      if (!matchingBlob) {
        for (const variantFilename of filenameVariants) {
          const variantBaseName = getBaseFilename(variantFilename)
          matchingBlob = blobs.find((blob) => {
            if (!blob.pathname) return false
            const blobFilename = blob.pathname.split("/").pop() || ""
            const blobBaseName = getBaseFilename(blobFilename)
            return (
              blobBaseName.startsWith(variantBaseName) && blobFilename.endsWith(variantFilename.split(".").pop() || "")
            )
          })
          if (matchingBlob) {
            console.log(`✅ Found card image via variant: ${variantFilename} -> ${matchingBlob.url}`)
            break
          }
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

      const localImageUrl = `/cards/${primaryFilename}`

      return NextResponse.json({
        success: true,
        imageUrl: localImageUrl,
        filename: primaryFilename,
        format: "local",
        cardId,
        element,
        message: "Using local fallback with standardized naming",
      })
    } catch (blobError) {
      console.warn("Error accessing blob storage in GET:", blobError)
      const localImageUrl = `/cards/${primaryFilename}`
      return NextResponse.json({
        success: true,
        imageUrl: localImageUrl,
        filename: primaryFilename,
        format: "local-fallback",
        cardId,
        element,
        message: "Blob storage unavailable, using local fallback",
        error: blobError instanceof Error ? blobError.message : "Unknown blob access error",
      })
    }
  } catch (error) {
    console.error("Unhandled error in GET /api/blob/card-images:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error: An unexpected error occurred.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check for BLOB_READ_WRITE_TOKEN
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is not set. Cannot access Vercel Blob storage for POST request.")
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error: BLOB_READ_WRITE_TOKEN is missing.",
          error: "MISSING_BLOB_TOKEN",
        },
        { status: 500 },
      )
    }

    const { cards } = await request.json()

    if (!Array.isArray(cards)) {
      return NextResponse.json({ success: false, message: "Cards array is required" }, { status: 400 })
    }

    const results = await Promise.allSettled(
      cards.map(async ({ cardId, element = "spirit" }) => {
        const primaryFilename = generateCardImagePath(cardId, element)
        const filenameVariants = generateCardImagePathVariants(cardId, element)

        try {
          const { blobs } = await list({
            prefix: "cards/",
            limit: 1000,
          })

          let found = false
          let foundPath = ""

          const primaryBaseName = getBaseFilename(primaryFilename)
          let matchingBlob = blobs.find((blob) => {
            if (!blob.pathname) return false
            const blobFilename = blob.pathname.split("/").pop() || ""
            const blobBaseName = getBaseFilename(blobFilename)
            return (
              blobBaseName.startsWith(primaryBaseName) && blobFilename.endsWith(primaryFilename.split(".").pop() || "")
            )
          })

          if (!matchingBlob) {
            for (const variantFilename of filenameVariants) {
              const variantBaseName = getBaseFilename(variantFilename)
              matchingBlob = blobs.find((blob) => {
                if (!blob.pathname) return false
                const blobFilename = blob.pathname.split("/").pop() || ""
                const blobBaseName = getBaseFilename(blobFilename)
                return (
                  blobBaseName.startsWith(variantBaseName) &&
                  blobFilename.endsWith(variantFilename.split(".").pop() || "")
                )
              })
              if (matchingBlob) {
                break
              }
            }
          }

          if (matchingBlob) {
            found = true
            foundPath = matchingBlob.url
          }

          return {
            cardId,
            element,
            found,
            path: found ? foundPath : `/cards/${primaryFilename}`,
            format: found ? "blob" : "local",
            primaryPath: primaryFilename,
          }
        } catch (error) {
          console.warn(`Error accessing blob storage for card ${cardId}-${element} in POST:`, error)
          return {
            cardId,
            element,
            found: false,
            path: `/cards/${primaryFilename}`,
            format: "local-fallback",
            primaryPath: primaryFilename,
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
    console.error("Unhandled error in POST /api/blob/card-images:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error: An unexpected error occurred during batch processing.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
