import cardImagePathsManifest from "@/data/card-image-paths.json"

// Type assertion for the imported JSON
const imageManifest: Record<string, string> = cardImagePathsManifest

// DEBUG: Log if manifest is loaded and a sample key
// console.log("IMAGE MANIFEST LOADED (card-image-utils.ts):", Object.keys(imageManifest).length, "keys. Sample '01cauldron-air.jpg':", imageManifest["01cauldron-air.jpg"]);

export function createCardFallbackUrl(cardName = "Card"): string {
  return `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardName + " image")}`
}

export function getCardImagePath(cardId: string | null | undefined, cardName?: string): string {
  console.log(`DEBUG: getCardImagePath called with cardId: [${cardId}], cardName: [${cardName}]`)

  if (!cardId) {
    console.log("DEBUG: cardId is null/undefined, returning placeholder.")
    return createCardFallbackUrl(cardName || "Card")
  }

  const filename = `${cardId.toLowerCase().trim()}.jpg` // Added trim() for safety
  console.log(`DEBUG: Constructed filename for manifest lookup: [${filename}]`)

  const pathFromPublicDir = imageManifest[filename]
  console.log(`DEBUG: Path from manifest for [${filename}]: [${pathFromPublicDir}]`)

  if (pathFromPublicDir) {
    const resultPath = pathFromPublicDir.startsWith("public/")
      ? `/${pathFromPublicDir.substring("public/".length)}`
      : `/${pathFromPublicDir}` // Should not happen if JSON is correct
    console.log(`DEBUG: Returning image path: [${resultPath}]`)
    return resultPath
  } else {
    console.warn(
      `Image path not found for card ID "${cardId}" (filename: "${filename}") in manifest. Using placeholder.`,
    )
    const placeholderUrl = createCardFallbackUrl(cardName || cardId)
    console.log(`DEBUG: Returning placeholder URL: [${placeholderUrl}]`)
    return placeholderUrl
  }
}
