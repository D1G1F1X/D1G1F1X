import type { OracleCard, Symbol } from "@/types/cards"

/**
 * Types for validation results
 */
export interface ValidationError {
  field: string
  message: string
  cardId?: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}

/**
 * Valid values for specific fields
 */
const VALID_ELEMENTS = ["Fire", "Water", "Air", "Earth", "Spirit"]
const VALID_SUITS = ["Cauldron", "Sword", "Cord", "Spear", "Stone"]

/**
 * Required fields for a card
 */
const REQUIRED_CARD_FIELDS: (keyof OracleCard)[] = [
  "id",
  "number",
  "suit",
  "fullTitle",
  "symbols",
  "symbolismBreakdown",
  "keyMeanings",
]

/**
 * Required fields for a symbol
 */
const REQUIRED_SYMBOL_FIELDS: (keyof Symbol)[] = ["key", "value"]

/**
 * Validates a single card
 */
export function validateCard(card: any): ValidationResult {
  const errors: ValidationError[] = []

  // Check if card is an object
  if (!card || typeof card !== "object") {
    return {
      valid: false,
      errors: [{ field: "card", message: "Card must be an object" }],
    }
  }

  // Check required fields
  for (const field of REQUIRED_CARD_FIELDS) {
    if (!(field in card)) {
      errors.push({
        field,
        message: `Missing required field: ${field}`,
        cardId: card.id || "unknown",
      })
    }
  }

  // Validate id format
  if (card.id && typeof card.id === "string") {
    if (!card.id.match(/^\d+-[A-Za-z]+$/)) {
      errors.push({
        field: "id",
        message: "Card ID should follow the format 'number-Suit'",
        cardId: card.id,
      })
    }
  }

  // Validate number
  if (card.number !== undefined) {
    if (isNaN(Number(card.number))) {
      errors.push({
        field: "number",
        message: "Card number must be a valid number",
        cardId: card.id || "unknown",
      })
    }
  }

  // Validate suit
  if (card.suit && !VALID_SUITS.includes(card.suit)) {
    errors.push({
      field: "suit",
      message: `Invalid suit: ${card.suit}. Must be one of: ${VALID_SUITS.join(", ")}`,
      cardId: card.id || "unknown",
    })
  }

  // Validate baseElement
  if (card.baseElement && !VALID_ELEMENTS.includes(card.baseElement)) {
    errors.push({
      field: "baseElement",
      message: `Invalid baseElement: ${card.baseElement}. Must be one of: ${VALID_ELEMENTS.join(", ")}`,
      cardId: card.id || "unknown",
    })
  }

  // Validate synergisticElement
  if (card.synergisticElement && !VALID_ELEMENTS.includes(card.synergisticElement)) {
    errors.push({
      field: "synergisticElement",
      message: `Invalid synergisticElement: ${card.synergisticElement}. Must be one of: ${VALID_ELEMENTS.join(", ")}`,
      cardId: card.id || "unknown",
    })
  }

  // Validate symbols array
  if (card.symbols && Array.isArray(card.symbols)) {
    card.symbols.forEach((symbol: any, index: number) => {
      if (!symbol || typeof symbol !== "object") {
        errors.push({
          field: `symbols[${index}]`,
          message: "Symbol must be an object",
          cardId: card.id || "unknown",
        })
        return
      }

      // Check required symbol fields
      for (const field of REQUIRED_SYMBOL_FIELDS) {
        if (!(field in symbol)) {
          errors.push({
            field: `symbols[${index}].${field}`,
            message: `Missing required symbol field: ${field}`,
            cardId: card.id || "unknown",
          })
        }
      }
    })
  }

  // Validate symbolismBreakdown array
  if (card.symbolismBreakdown && !Array.isArray(card.symbolismBreakdown)) {
    errors.push({
      field: "symbolismBreakdown",
      message: "symbolismBreakdown must be an array",
      cardId: card.id || "unknown",
    })
  }

  // Validate keyMeanings array
  if (card.keyMeanings && !Array.isArray(card.keyMeanings)) {
    errors.push({
      field: "keyMeanings",
      message: "keyMeanings must be an array",
      cardId: card.id || "unknown",
    })
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validates all cards in the deck
 */
export function validateCardDeck(cards: any[]): ValidationResult {
  if (!Array.isArray(cards)) {
    return {
      valid: false,
      errors: [{ field: "cards", message: "Cards data must be an array" }],
    }
  }

  const errors: ValidationError[] = []

  // Validate each card
  cards.forEach((card, index) => {
    const result = validateCard(card)
    if (!result.valid) {
      errors.push(
        ...result.errors.map((error) => ({
          ...error,
          field: `cards[${index}].${error.field}`,
        })),
      )
    }
  })

  // Check for duplicate IDs
  const ids = cards.map((card) => card.id)
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index)
  if (duplicateIds.length > 0) {
    errors.push({
      field: "cards",
      message: `Duplicate card IDs found: ${duplicateIds.join(", ")}`,
    })
  }

  // Check for duplicate numbers
  const numbers = cards.map((card) => card.number)
  const duplicateNumbers = numbers.filter((num, index) => numbers.indexOf(num) !== index)
  if (duplicateNumbers.length > 0) {
    errors.push({
      field: "cards",
      message: `Duplicate card numbers found: ${duplicateNumbers.join(", ")}`,
    })
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validates card data and returns a formatted report
 */
export function validateCardData(cards: any[]): string {
  const result = validateCardDeck(cards)

  if (result.valid) {
    return "✅ All cards are valid."
  }

  // Group errors by card ID for better readability
  const errorsByCard: Record<string, ValidationError[]> = {}

  result.errors.forEach((error) => {
    const cardId = error.cardId || "global"
    if (!errorsByCard[cardId]) {
      errorsByCard[cardId] = []
    }
    errorsByCard[cardId].push(error)
  })

  let report = "❌ Card validation failed:\n\n"

  Object.entries(errorsByCard).forEach(([cardId, errors]) => {
    report += `Card: ${cardId}\n`
    errors.forEach((error) => {
      report += `  - ${error.field}: ${error.message}\n`
    })
    report += "\n"
  })

  return report
}
