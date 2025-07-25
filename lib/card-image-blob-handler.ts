import { del, list, put } from "@vercel/blob"
import { customAlphabet } from "nanoid"
import { environmentManager } from "@/lib/config/environment" // [^vercel_knowledge_base] // Changed import name
import type { OracleCard } from "@/types/cards" // Import OracleCard type

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7) // 7-character random string

export interface CardImageMetadata {
  id: string
  filename: string
  pathname: string
  url: string
  contentType: string
  uploadedAt: Date
  size: number
  cardId?: string // Optional: Link to a specific card ID
  cardName?: string // Optional: Link to a specific card name
}

export interface CardImage {
  url: string
  pathname: string
  filename: string
}

export async function uploadCardImage(file: File, cardId?: string, cardName?: string): Promise<CardImageMetadata> {
  const filename = `${cardId || nanoid()}-${file.name}`
  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: false, // We're adding our own suffix/prefix
    contentType: file.type,
    // You can add more metadata here if needed
    // metadata: { cardId: cardId, cardName: cardName },
  })

  return {
    id: blob.url.split("/").pop()?.split("-")[0] || nanoid(), // Extract our custom ID or generate new
    filename: blob.pathname,
    pathname: blob.pathname,
    url: blob.url,
    contentType: blob.contentType,
    uploadedAt: new Date(blob.uploadedAt),
    size: blob.size,
    cardId: cardId,
    cardName: cardName,
  }
}

export async function deleteCardImage(url: string): Promise<void> {
  await del(url)
}

// Alias for deleteCardImage
export const deleteCardBlob = deleteCardImage

export async function listCardImages(): Promise<CardImage[]> {
  try {
    // Ensure BLOB_READ_WRITE_TOKEN is available on the server
    if (!environmentManager.BLOB_READ_WRITE_TOKEN) { // Changed access
      console.error("BLOB_READ_WRITE_TOKEN is not configured. Cannot list blob images.")
      return []
    }

    const { blobs } = await list({
      token: environmentManager.BLOB_READ_WRITE_TOKEN, // Using the server-side token [^vercel_knowledge_base] // Changed access
      prefix: "cards/", // Assuming card images are stored under a 'cards/' prefix
    })

    return blobs.map((blob) => ({
      url: blob.url,
      pathname: blob.pathname,
      filename: blob.pathname.split("/").pop() || "", // Extract filename from pathname
    }))
  } catch (error) {
    console.error("Failed to list card images from Vercel Blob:", error)
    // Handle specific Blob errors if needed, e.g., BlobAccessError
    return []
  }
}

export async function getCardImageUrl(cardId: string): Promise<string> {
  // Placeholder for actual blob storage URL retrieval
  return `/public/cards/${cardId}.jpg` // Example path
}

/**
 * Generates the primary standardized image path for a card.
 * Format: {number_padded}-{suit_lowercase}-{element_lowercase}.jpg
 * Example: 01-cauldron-spirit.jpg
 */
export function generateCardImagePath(cardId: string, element: string): string {
  const [number, suit] = cardId.split("-")
  const paddedNumber = number.padStart(2, "0")
  const lowerSuit = suit?.toLowerCase() || ""
  const lowerElement = element.toLowerCase()
  return `${paddedNumber}-${lowerSuit}-${lowerElement}.jpg`
}

/**
 * Generates a list of possible image filenames for a given card,
 * including new standardized formats and legacy formats for robust lookup.
 */
export function generateCardImagePathVariants(cardId: string, element: string): string[] {
  const [number, suit] = cardId.split("-")
  const paddedNumber = number.padStart(2, "0")
  const lowerSuit = suit?.toLowerCase() || ""
  const lowerElement = element.toLowerCase()

  const variants = [
    // New Standardized Format (zero-padded number, hyphenated suit-element)
    `${paddedNumber}-${lowerSuit}-${lowerElement}.jpg`,
    `${paddedNumber}-${lowerSuit}-${lowerElement}.jpeg`, // Also check .jpeg

    // Legacy Format (non-zero-padded number, hyphenated suit-element)
    `${number}-${lowerSuit}-${lowerElement}.jpg`,
    `${number}-${lowerSuit}-${lowerElement}.jpeg`,

    // Alternative: Zero-padded number, no hyphen between number and suit
    `${paddedNumber}${lowerSuit}-${lowerElement}.jpg`,
    `${paddedNumber}${lowerSuit}-${lowerElement}.jpeg`,

    // Alternative: Original cardId format (e.g., 1-Cauldron)
    `${cardId.toLowerCase()}.jpg`,
    `${cardId.toLowerCase()}.jpeg`,
  ]

  // Filter out duplicates and empty strings
  return Array.from(new Set(variants)).filter(Boolean)
}

// Placeholder for verifyCardImage
export async function verifyCardImage(cardId: string): Promise<boolean> {
  console.log(`Verifying image for card: ${cardId}`)
  // In a real scenario, this would check if the image exists in blob storage
  // For now, simulate success
  return true
}

// Placeholder for getAllCards (if expected from this module)
export async function getAllCards(): Promise<OracleCard[]> {
  console.log("Fetching all cards from blob handler (placeholder)")
  // This would typically fetch card data from a database or JSON, not just blob images.
  // For now, return a mock or empty array.
  return []
}

// Placeholder for testCardImage
export async function testCardImage(cardId: string): Promise<{ exists: boolean; url: string }> {
  console.log(`Testing image for card: ${cardId}`)
  // Simulate image existence
  const exists = Math.random() > 0.2 // 80% chance of existing
  const url = exists ? `/public/cards/${cardId}.jpg` : "/placeholder.svg"
  return { exists, url }
}

// Placeholder for validateCardImages
export async function validateCardImages(): Promise<{ valid: boolean; missing: string[] }> {
  console.log("Validating all card images (placeholder)")
  // Simulate validation results
  return { valid: true, missing: [] }
}
