import { DebugCardImagesPageClient } from "./DebugCardImagesPageClient"
import { getAllCards } from "@/lib/card-data-access"
import { listCardImages } from "@/lib/card-image-blob-handler"

export const metadata = {
  title: "Debug Card Images - Admin",
  description: "Debug and test card image loading and display.",
}

export default async function DebugCardImagesPage() {
  const allCards = await getAllCards()
  const allBlobImages = await listCardImages()

  return <DebugCardImagesPageClient initialCards={allCards} initialBlobImages={allBlobImages} />
}
