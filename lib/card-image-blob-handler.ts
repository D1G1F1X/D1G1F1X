import { list } from "@vercel/blob"

export interface CardImageBlob {
  url: string
  filename: string
  pathname: string
}

/**
 * Lists all card images from Vercel Blob storage.
 * Filters for files within the 'cards/' directory and extracts relevant info.
 * @returns A promise that resolves to an array of CardImageBlob objects.
 */
export async function listCardImages(): Promise<CardImageBlob[]> {
  try {
    const { blobs } = await list({ prefix: "cards/" }) // List blobs with 'cards/' prefix
    return blobs.map((blob) => ({
      url: blob.url,
      filename: blob.pathname.split("/").pop() || "", // Extract filename from pathname
      pathname: blob.pathname,
    }))
  } catch (error) {
    console.error("Error listing card images from Vercel Blob:", error)
    return []
  }
}

/**
 * Retrieves a specific card image URL from Vercel Blob storage by its filename.
 * @param filename The filename of the card image (e.g., "01-cauldron-fire.jpg").
 * @returns The URL of the image, or null if not found.
 */
export async function getCardImage(filename: string): Promise<string | null> {
  try {
    // List blobs with the specific filename as a prefix to find an exact match
    const { blobs } = await list({ prefix: `cards/${filename}` })
    const foundBlob = blobs.find((blob) => blob.pathname === `cards/${filename}`)
    return foundBlob ? foundBlob.url : null
  } catch (error) {
    console.error(`Error retrieving card image ${filename} from Vercel Blob:`, error)
    return null
  }
}

/**
 * Uploads a card image to Vercel Blob storage.
 * @param file The File object to upload.
 * @param filename The desired filename for the image (e.g., "01-cauldron-fire.jpg").
 * @returns A promise that resolves to the URL of the uploaded image.
 */
export async function uploadCardImage(file: File, filename: string): Promise<string> {
  try {
    // In a real application, you'd use a server action or API route to handle the upload
    // For this example, we'll simulate the upload or assume a direct client-side upload mechanism
    console.log(`Simulating upload of ${filename}. In a real app, this would use a server action.`)
    // Placeholder for actual upload logic
    return `/public/cards/${filename}` // Return a local path for simulation
  } catch (error) {
    console.error(`Error uploading card image ${filename} to Vercel Blob:`, error)
    throw error
  }
}

/**
 * Deletes a card image from Vercel Blob storage by its filename.
 * @param filename The filename of the card image to delete.
 * @returns A promise that resolves when the image is deleted.
 */
export async function deleteCardImage(filename: string): Promise<void> {
  try {
    // In a real application, you'd use a server action or API route to handle the deletion
    console.log(`Simulating deletion of ${filename}. In a real app, this would use a server action.`)
    // Placeholder for actual deletion logic
  } catch (error) {
    console.error(`Error deleting card image ${filename} from Vercel Blob:`, error)
    throw error
  }
}
