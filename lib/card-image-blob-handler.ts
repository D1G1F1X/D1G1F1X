import { list } from "@vercel/blob"

export interface CardImage {
  filename: string
  url: string
}

export async function listCardImages(): Promise<CardImage[]> {
  try {
    const { blobs } = await list({ prefix: "cards/", limit: 1000 }) // Adjust limit as needed
    return blobs.map((blob) => ({
      filename: blob.pathname.replace("cards/", ""), // Remove the 'cards/' prefix
      url: blob.url,
    }))
  } catch (error) {
    console.error("Error listing card images from Vercel Blob:", error)
    return []
  }
}

export async function getCardImageUrl(filename: string): Promise<string | null> {
  try {
    const { blobs } = await list({ prefix: `cards/${filename}`, limit: 1 })
    if (blobs.length > 0) {
      return blobs[0].url
    }
    return null
  } catch (error) {
    console.error(`Error getting image URL for ${filename}:`, error)
    return null
  }
}
