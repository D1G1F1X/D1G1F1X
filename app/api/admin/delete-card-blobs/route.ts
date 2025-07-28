import { NextResponse } from "next/server"
import { del } from "@vercel/blob"
import { getAllCards } from "@/lib/card-data-access" // Assuming this function exists
import type { CardElement } from "@/types/cards"

export async function POST(request: Request) {
  // In a real application, you would add authentication/authorization here
  // const user = await isAuthenticated(request);
  // if (!user || !user.isAdmin) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const allCards = getAllCards()
    const elements: CardElement[] = ["Air", "Earth", "Fire", "Spirit", "Water"]
    const blobPathsToDelete: string[] = []

    allCards.forEach((card) => {
      elements.forEach((element) => {
        const number = card.number.padStart(2, "0")
        const suit = card.suit.toLowerCase()
        const elementName = element.toLowerCase()
        const filename = `${number}${suit}-${elementName}.jpg`
        // Assuming blob URLs are structured like: https://<YOUR_BLOB_STORE_ID>.public.blob.vercel-storage.com/<filename>
        // Or if you're using the Vercel Blob SDK, you just need the pathname.
        // For `del` function, it expects the full URL or the pathname.
        // Let's assume the filenames are directly the pathnames in the blob store.
        blobPathsToDelete.push(filename)
      })
    })

    console.log(`Attempting to delete ${blobPathsToDelete.length} blobs...`)

    // Delete blobs in batches if there are many
    const batchSize = 100
    for (let i = 0; i < blobPathsToDelete.length; i += batchSize) {
      const batch = blobPathsToDelete.slice(i, i + batchSize)
      await Promise.all(
        batch.map(async (pathname) => {
          try {
            // The `del` function from `@vercel/blob` expects the URL or pathname.
            // If your `card-image-paths.json` stores full URLs, pass the URL.
            // If it stores just pathnames, pass the pathname.
            // For this example, assuming `pathname` is what `del` expects.
            await del(pathname)
            console.log(`Deleted blob: ${pathname}`)
          } catch (error) {
            console.warn(`Failed to delete blob ${pathname}:`, error)
            // Continue even if one deletion fails
          }
        }),
      )
    }

    return NextResponse.json({ success: true, message: "All card images deletion process initiated." })
  } catch (error) {
    console.error("Error deleting all card blobs:", error)
    return NextResponse.json({ success: false, error: "Failed to delete all card images." }, { status: 500 })
  }
}
