import type { NumoNumberData } from "@/types/readings"
import { masterCardData } from "@/data/master-card-data" // Assuming this is the correct import for your card data

/**
 * Calculates the Life Path Number from a given birth date.
 * The Life Path Number is calculated by summing the digits of the month, day, and year,
 * and then reducing the sum to a single digit or a master number (11, 22, 33).
 * @param birthDate The birth date as a Date object or string.
 * @returns The calculated Life Path Number.
 */
export function calculateLifePath(birthDate: Date | string): number {
  let date: Date
  if (typeof birthDate === "string") {
    date = new Date(birthDate)
  } else {
    date = birthDate
  }

  if (isNaN(date.getTime())) {
    throw new Error("Invalid birth date provided.")
  }

  const month = date.getMonth() + 1 // getMonth() is 0-indexed
  const day = date.getDate()
  const year = date.getFullYear()

  const sum = reduceNumber(month) + reduceNumber(day) + reduceNumber(year)

  // Check for master numbers before final reduction
  if (sum === 11 || sum === 22 || sum === 33) {
    return sum
  }

  return reduceNumber(sum)
}

/**
 * Reduces a number to a single digit or a master number (11, 22, 33).
 * @param num The number to reduce.
 * @returns The reduced number.
 */
function reduceNumber(num: number): number {
  let sum = num
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + Number.parseInt(digit, 10), 0)
  }
  return sum
}

/**
 * Retrieves the numerological meaning for a given number from the master card data.
 * This function assumes that `masterCardData` contains entries with a `number` field
 * and a `numerologyMeaning` field.
 * @param num The number (0-9, or master numbers 11, 22, 33) for which to get the meaning.
 * @returns The numerology meaning string, or a default message if not found.
 */
export function getNumerologyMeaning(num: number): string {
  // Find the card data that matches the number
  const card = masterCardData.find((card) => Number.parseInt(card.number, 10) === num)

  if (card && card.numerologyMeaning) {
    return card.numerologyMeaning
  }

  // Fallback for master numbers or if meaning is missing
  switch (num) {
    case 11:
      return "The Master Intuitive: Represents spiritual insight, intuition, and inspiration. A highly sensitive and intuitive number, often associated with profound spiritual understanding and the ability to inspire others."
    case 22:
      return "The Master Builder: Symbolizes practical mastery and the ability to turn grand dreams into reality. A powerful number for manifestation, often associated with large-scale projects and humanitarian efforts."
    case 33:
      return "The Master Healer/Teacher: Represents selfless service and spiritual teaching. The 'Christ Consciousness' number, associated with compassion, healing, and guiding humanity towards higher consciousness."
    default:
      return "This number carries a unique vibration that influences your path and experiences."
  }
}

/**
 * Retrieves comprehensive NUMO number data for a given number.
 * This function uses the `masterCardData` to find detailed information
 * about a specific number, including its title, description, elemental power,
 * planetary ruler, astrological sign, and paired number details.
 *
 * @param num The number (0-9) for which to retrieve data.
 * @returns A `NumoNumberData` object if found, otherwise `null`.
 */
export function getNumoNumberData(num: number): NumoNumberData | null {
  // Find the card data that matches the number
  const card = masterCardData.find((card) => Number.parseInt(card.number, 10) === num)

  if (!card) {
    return null
  }

  // Construct the NumoNumberData object from the found card data
  // Note: This mapping assumes a direct correspondence or a way to derive
  // these fields from your OracleCard structure. Adjust as necessary.
  return {
    number: Number.parseInt(card.number, 10),
    title: card.fullTitle,
    description: card.symbolismBreakdown.join(" "), // Concatenate symbolism breakdown for description
    keywords: card.keyMeanings,
    numerologyMeaning: card.numerologyMeaning || getNumerologyMeaning(Number.parseInt(card.number, 10)),
    planetaryRulerName: card.planetInternalInfluence,
    planetaryRulerDescription: card.planetInternalInfluence, // Assuming description is part of the name or needs to be derived
    astrologicalSignName: card.astrologyExternalDomain,
    astrologicalSignDescription: card.astrologyExternalDomain, // Assuming description is part of the name or needs to be derived
    individualElementalPowerName: card.baseElement,
    individualElementalPowerDescription: `The power of ${card.baseElement}.`, // Example description
    numoPairedWith: card.pairedWith ? Number.parseInt(card.pairedWith, 10) : 0, // Assuming pairedWith exists
    numoPairName: card.pairName || "N/A",
    numoPairVisualSymbolism: card.pairVisualSymbolism || "N/A",
    numoPairElementalPower: card.pairElementalPower || "N/A",
    numoPairGiftDescription: card.pairGiftDescription || "N/A",
    mysteryDocPairRole: card.mysteryDocPairRole || undefined,
    mysteryDocVisualSymbolism: card.mysteryDocVisualSymbolism || undefined,
    mysteryDocMetaphysicalPrinciple: card.mysteryDocMetaphysicalPrinciple || undefined,
    mysteryDocPairedWith: card.mysteryDocPairedWith || undefined,
    mysteryDocPairDescription: card.mysteryDocPairDescription || undefined,
    shapeType: card.shapeType || "sphere", // Default shapeType
  }
}
