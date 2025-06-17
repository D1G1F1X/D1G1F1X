import { NextResponse } from "next/server"
import { list } from "@vercel/blob"

/**
 * API route to validate that all cards have corresponding images
 */

// Master card data for validation
const REQUIRED_CARDS = [
  { id: "0-Cauldron", elements: ["Spirit", "Fire"] },
  { id: "1-Cauldron", elements: ["Fire"] },
  { id: "2-Sword", elements: ["Water"] },
  { id: "3-Cord", elements: ["Fire", "Spirit"] },
  { id: "4-Spear", elements: ["Earth", "Air"] },
  { id: "5-Sword", elements: ["Earth", "Water"] },
  { id: "6-Stone", elements: ["Earth"] },
  { id: "7-Spear", elements: ["Air"] },
  { id: "8-Cord", elements: ["Spirit"] },
  { id: "9-Stone", elements: ["Air", "Earth"] },
]

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "cards/" })

    // Create a map of available images
    const availableImages = new Set()
    blobs.forEach((blob) => {
      const filename = blob.pathname.split("/").pop()
      if (filename) {
        availableImages.add(filename.toLowerCase())
      }
    })

    // Check each required card
    const validationResults = []
    const missingImages = []

    for (const card of REQUIRED_CARDS) {
      const cardResult = {
        cardId: card.id,
        elements: card.elements,
        foundImages: [] as string[],
        missingImages: [] as string[],
      }

      for (const element of card.elements) {
        const possibleNames = generateCardImageNames(card.id, element)
        let found = false

        for (const imageName of possibleNames) {
          if (availableImages.has(imageName.toLowerCase())) {
            cardResult.foundImages.push(imageName)
            found = true
            break
          }
        }

        if (!found) {
          cardResult.missingImages.push(`${card.id}-${element}`)
          missingImages.push(`${card.id}-${element}`)
        }
      }

      validationResults.push(cardResult)
    }

    const totalRequired = REQUIRED_CARDS.reduce((sum, card) => sum + card.elements.length, 0)
    const totalFound = validationResults.reduce((sum, result) => sum + result.foundImages.length, 0)

    return NextResponse.json({
      success: true,
      summary: {
        totalRequired,
        totalFound,
        totalMissing: missingImages.length,
        completionPercentage: Math.round((totalFound / totalRequired) * 100),
      },
      validationResults,
      missingImages,
      availableImages: Array.from(availableImages),
      totalBlobImages: blobs.length,
    })
  } catch (error) {
    console.error("Error validating card images:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to validate card images",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

function generateCardImageNames(cardId: string, element: string): string[] {
  const names: string[] = []
  const [number, suit] = cardId.split("-")
  const paddedNumber = number.padStart(2, "0")
  const lowerSuit = suit?.toLowerCase() || ""
  const lowerElement = element.toLowerCase()

  names.push(
    `${paddedNumber}${lowerSuit}-${lowerElement}.jpg`,
    `${paddedNumber}${lowerSuit}-${lowerElement}.png`,
    `${number}${lowerSuit}-${lowerElement}.jpg`,
    `${number}${lowerSuit}-${lowerElement}.png`,
    `${paddedNumber}-${lowerSuit}-${lowerElement}.jpg`,
    `${paddedNumber}-${lowerSuit}-${lowerElement}.png`,
    `${cardId.toLowerCase()}-${lowerElement}.jpg`,
    `${cardId.toLowerCase()}-${lowerElement}.png`,
  )

  return names
}
