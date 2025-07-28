import { NextResponse } from "next/server"
import { list, del } from "@vercel/blob"

/**
 * API route to delete all card images from Vercel Blob Storage.
 * This route should be protected in a production environment.
 */
export async function DELETE() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ success: false, error: "Blob storage token not configured." }, { status: 500 })
  }

  let deletedCount = 0
  const errors: string[] = []

  try {
    // List all blobs under the 'cards/' prefix
    const { blobs } = await list({
      prefix: "cards/",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    console.log(`Initiating deletion of ${blobs.length} card images from Vercel Blob Storage...`)

    // Delete each blob
    for (const blob of blobs) {
      try {
        await del(blob.url, { token: process.env.BLOB_READ_WRITE_TOKEN })
        deletedCount++
        console.log(`Successfully deleted: ${blob.pathname}`)
      } catch (deleteError) {
        const errorMessage = `Failed to delete ${blob.pathname}: ${deleteError instanceof Error ? deleteError.message : String(deleteError)}`
        console.error(errorMessage)
        errors.push(errorMessage)
      }
    }

    console.log(`Deletion process complete. Deleted ${deletedCount} files.`)

    return NextResponse.json({
      success: true,
      deletedCount,
      errors,
      message: `Successfully initiated deletion of ${deletedCount} card images from Vercel Blob Storage.`,
    })
  } catch (listError) {
    const errorMessage = `Failed to list blobs for deletion: ${listError instanceof Error ? listError.message : String(listError)}`
    console.error(errorMessage)
    return NextResponse.json({ success: false, error: errorMessage, deletedCount, errors }, { status: 500 })
  }
}
