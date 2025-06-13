import { getCardData } from "@/lib/card-data-access"

/**
 * Validates that all cards have correct single-digit numbers (0-9)
 * and identifies any cards with incorrect number values
 */
export function validateCardNumbers() {
  const cards = getCardData()
  const issues: string[] = []
  const validNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  cards.forEach((card) => {
    // Check if the card number is a valid single digit
    if (!validNumbers.includes(card.number)) {
      issues.push(`Card ${card.id} has invalid number: ${card.number} (should be 0-9)`)
    }

    // Check if the card ID matches the number
    const expectedNumber = card.id.split("-")[0]
    if (card.number !== expectedNumber) {
      issues.push(`Card ${card.id} number mismatch: ID suggests ${expectedNumber}, but number is ${card.number}`)
    }

    // Check if the symbols array has the correct number value
    const numberSymbol = card.symbols?.find((s) => s.key === "Number")
    if (numberSymbol && numberSymbol.value !== card.number) {
      issues.push(
        `Card ${card.id} symbols number mismatch: number field is ${card.number}, but symbols array has ${numberSymbol.value}`,
      )
    }
  })

  return {
    isValid: issues.length === 0,
    issues,
    totalCards: cards.length,
    validCards: cards.filter((card) => validNumbers.includes(card.number)).length,
  }
}

/**
 * Logs card number validation results to console
 */
export function logCardNumberValidation() {
  const validation = validateCardNumbers()

  console.log("=== Card Number Validation ===")
  console.log(`Total cards: ${validation.totalCards}`)
  console.log(`Valid cards: ${validation.validCards}`)
  console.log(`Issues found: ${validation.issues.length}`)

  if (validation.issues.length > 0) {
    console.log("\nIssues:")
    validation.issues.forEach((issue) => console.log(`- ${issue}`))
  } else {
    console.log("✅ All card numbers are valid!")
  }

  return validation
}

/**
 * Gets a summary of card numbers in the deck
 */
export function getCardNumberSummary() {
  const cards = getCardData()
  const numberCounts: Record<string, number> = {}

  cards.forEach((card) => {
    const num = card.number || "unknown"
    numberCounts[num] = (numberCounts[num] || 0) + 1
  })

  return {
    numberCounts,
    expectedNumbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    missingNumbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].filter((num) => !numberCounts[num]),
    duplicateNumbers: Object.entries(numberCounts).filter(([_, count]) => count > 1),
  }
}
