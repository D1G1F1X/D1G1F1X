import { put, list, del } from "@vercel/blob"

/**
 * Uploads a file to Vercel Blob storage
 */
export async function uploadToBlob(file: File, folder = ""): Promise<{ url: string; pathname: string }> {
  try {
    // Ensure folder path is formatted correctly
    const folderPath = folder ? (folder.endsWith("/") ? folder : `${folder}/`) : ""

    // Create a pathname with the folder and filename
    const pathname = `${folderPath}${file.name}`

    // Upload to Blob
    const { url } = await put(pathname, file, {
      access: "public",
    })

    return { url, pathname }
  } catch (error) {
    console.error("Error uploading to Blob:", error)
    throw new Error("Failed to upload file to storage")
  }
}

/**
 * Lists files in Vercel Blob storage
 */
export async function listBlobFiles(prefix = ""): Promise<{ blobs: any[] }> {
  try {
    const { blobs } = await list({ prefix })
    return { blobs }
  } catch (error) {
    console.error("Error listing Blob files:", error)
    throw new Error("Failed to list files from storage")
  }
}

/**
 * Deletes a file from Vercel Blob storage
 */
export async function deleteFromBlob(url: string): Promise<void> {
  try {
    await del(url)
  } catch (error) {
    console.error("Error deleting from Blob:", error)
    throw new Error("Failed to delete file from storage")
  }
}
