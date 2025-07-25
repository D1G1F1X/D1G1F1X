import { ImageDiagnosticsClientPage } from "./image-diagnostics-page-client"
import { getAllCards } from "@/lib/card-data-access"
import { listCardImages } from "@/lib/card-image-blob-handler"

export const metadata = {
  title: "Image Diagnostics - Admin",
  description: "Diagnose and manage card images and their references.",
}

export default async function ImageDiagnosticsPage() {
  const allCards = await getAllCards()
  const allBlobImages = await listCardImages()

  return <ImageDiagnosticsClientPage initialCards={allCards} initialBlobImages={allBlobImages} />
}
