import { NextResponse } from "next/server"
import { deleteBlob } from "@/lib/comprehensive-blob-manager"

export async function POST(request: Request) {
  try {
    const { urls } = await request.json()

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "No URLs provided for deletion" }, { status: 400 })
    }

    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          await deleteBlob(url)
          return { url, success: true }
        } catch (error) {
          console.error(`Failed to delete blob ${url}:`, error)
          return { url, success: false, error: (error as Error).message }
        }
      }),
    )

    const failedDeletions = results.filter((r) => !r.success)
    if (failedDeletions.length > 0) {
      return NextResponse.json(
        {
          message: "Some blobs failed to delete",
          failed: failedDeletions,
          successful: results.filter((r) => r.success),
        },
        { status: 207 }, // Multi-Status
      )
    }

    return NextResponse.json({ message: "All specified blobs deleted successfully" })
  } catch (error) {
    console.error("Error in delete-card-blobs API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
