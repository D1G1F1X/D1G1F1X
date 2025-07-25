import { numoNumberDefinitions } from "@/data/numo-definitions"
import type { CompoundNumberMeaning, SingleDigitMeaning } from "@/types/numerology" // Assuming you have these types

/**
 * Calculates the Life Path number from a birth date.
 * @param birthDate The birth date as a Date object.
 * @returns The Life Path number.
 */
export function calculateLifePath(birthDate: Date): number {
  const year = birthDate.getFullYear()
  const month = birthDate.getMonth() + 1
  const day = birthDate.getDate()

  const reduce = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + Number.parseInt(digit, 10), 0)
    }
    return num
  }

  const reducedMonth = reduce(month)
  const reducedDay = reduce(day)
  const reducedYear = reduce(year)

  const lifePath = reducedMonth + reducedDay + reducedYear
  return reduce(lifePath)
}

/**
 * Calculates the Expression (Destiny) number from a full name.
 * @param fullName The full name.
 * @returns The Expression number.
 */
export function calculateExpression(fullName: string): number {
  return calculateExpressionNumber(fullName) // Same calculation method
}

/**
 * Calculates the destiny number from a name
 * @param name Full name
 * @returns Destiny number (1-9)
 */
export function calculateDestinyNumber(name: string): number {
  return calculateExpressionNumber(name) // Same calculation method
}

// Export aliases for compatibility
export const calculateExpressionNumber = calculateExpression
export const calculateDestinyNumberFromName = calculateDestinyNumber

/**
 * Calculates the Soul Urge (Heart's Desire) number from the vowels in a name.
 * @param fullName The full name.
 * @returns The Soul Urge number.
 */
export function calculateSoulUrge(fullName: string): number {
  return calculateSoulUrgeNumber(fullName) // Same calculation method
}

/**
 * Calculates the soul urge number from a name
 * @param name Full name
 * @returns Soul urge number (1-9)
 */
export function calculateSoulUrgeNumber(fullName: string): number {
  const vowelValues: { [key: string]: number } = {
    A: 1,
    E: 5,
    I: 9,
    O: 6,
    U: 3,
  }

  const reduce = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + Number.parseInt(digit, 10), 0)
    }
    return num
  }

  let total = 0
  for (const char of fullName.toUpperCase()) {
    if (vowelValues[char]) {
      total += vowelValues[char]
    }
  }
  return reduce(total)
}

/**
 * Calculates the Personality number from the consonants in a name.
 * @param fullName The full name.
 * @returns The Personality number.
 */
export function calculatePersonality(fullName: string): number {
  return calculatePersonalityNumber(fullName) // Same calculation method
}

/**
 * Calculates the personality number from a name
 * @param name Full name
 * @returns Personality number (1-9)
 */
export function calculatePersonalityNumber(fullName: string): number {
  const consonantValues: { [key: string]: number } = {
    B: 2,
    C: 3,
    D: 4,
    F: 6,
    G: 7,
    H: 8,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    P: 7,
    Q: 8,
    R: 9,
    S: 1,
    T: 2,
    V: 4,
    W: 5,
    X: 6,
    Y: 7, // Y can be a vowel or consonant, here treated as consonant for personality
    Z: 8,
  }

  const reduce = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + Number.parseInt(digit, 10), 0)
    }
    return num
  }

  let total = 0
  for (const char of fullName.toUpperCase()) {
    if (consonantValues[char]) {
      total += consonantValues[char]
    }
  }
  return reduce(total)
}

// Export alias for compatibility
export const calculatePersonalityNumberFromName = calculatePersonalityNumber

/**
 * Calculates the Maturity number from the Life Path and Expression numbers.
 * @param lifePath The Life Path number.
 * @param expression The Expression number.
 * @returns The Maturity number.
 */
export function calculateMaturityNumber(lifePath: number, expression: number): number {
  return reduceToSingleDigit(lifePath + expression)
}

/**
 * Calculates the Challenge numbers from birth date.
 * @param birthDate The birth date as a Date object.
 * @returns An array of Challenge numbers.
 */
export function calculateChallengeNumbers(birthDate: Date): number[] {
  const month = birthDate.getMonth() + 1
  const day = birthDate.getDate()
  const year = birthDate.getFullYear()

  const reducedMonth = reduceToSingleDigit(month)
  const reducedDay = reduceToSingleDigit(day)
  const reducedYear = reduceToSingleDigit(year)

  const challenge1 = Math.abs(reducedMonth - reducedDay)
  const challenge2 = Math.abs(reducedDay - reducedYear)
  const challenge3 = reduceToSingleDigit(Math.abs(challenge1 - challenge2))
  const challenge4 = Math.abs(reducedMonth - reducedYear)

  return [challenge1, challenge2, challenge3, challenge4]
}

/**
 * Calculates the Pinnacle numbers from birth date.
 * @param birthDate The birth date as a Date object.
 * @returns An array of Pinnacle numbers.
 */
export function calculatePinnacleNumbers(birthDate: Date): number[] {
  const month = birthDate.getMonth() + 1
  const day = birthDate.getDate()
  const year = birthDate.getFullYear()

  const reducedMonth = reduceToSingleDigit(month)
  const reducedDay = reduceToSingleDigit(day)
  const reducedYear = reduceToSingleDigit(year)

  const pinnacle1 = reduceToSingleDigit(reducedMonth + reducedDay)
  const pinnacle2 = reduceToSingleDigit(reducedDay + reducedYear)
  const pinnacle3 = reduceToSingleDigit(pinnacle1 + pinnacle2)
  const pinnacle4 = reduceToSingleDigit(reducedMonth + reducedYear)

  return [pinnacle1, pinnacle2, pinnacle3, pinnacle4]
}

/**
 * Calculates the birth day number (day of birth)
 * @param dateString Date string in format YYYY-MM-DD
 * @returns Birth day number (1-31)
 */
export function calculateBirthDayNumber(dateString: string): number {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format")
    }

    return date.getDate()
  } catch (error) {
    console.error("Error calculating birth day number:", error)
    return 0
  }
}

/**
 * Calculates the compound number from a name
 * @param name Full name
 * @returns Compound number (sum before reduction)
 */
export function calculateCompoundNumber(name: string): number {
  try {
    if (!name || name.trim() === "") {
      return 0
    }

    const normalizedName = name.toLowerCase().replace(/[^a-z]/g, "")
    let sum = 0

    for (let i = 0; i < normalizedName.length; i++) {
      sum += getLetterValue(normalizedName[i])
    }

    return sum
  } catch (error) {
    console.error("Error calculating compound number:", error)
    return 0
  }
}

/**
 * Retrieves the descriptive value for a given symbol key.
 * This function uses the numoNumberDefinitions to provide detailed explanations.
 * @param symbolKey The key of the symbol (e.g., "Eye", "Dot", "Pluto", "Aries").
 * @returns The descriptive text for the symbol, or the original key if not found.
 */
export function getSymbolDescription(symbolKey: string): string {
  // Find the card that contains this symbol key in its symbolism breakdown
  const foundCard = numoNumberDefinitions.find((card) => card.symbolismBreakdown.some((s) => s.includes(symbolKey)))

  if (foundCard) {
    // Extract the relevant part of the symbolism breakdown
    const relevantBreakdown = foundCard.symbolismBreakdown.find((s) => s.includes(symbolKey))
    if (relevantBreakdown) {
      // Attempt to parse out just the description part after the key
      const parts = relevantBreakdown.split(" – ")
      if (parts.length > 1) {
        return parts.slice(1).join(" – ").trim()
      }
    }
  }

  // Fallback to the original key if no specific description is found
  return symbolKey
}

/**
 * Retrieves the numerological value of a letter (A=1, B=2, etc.)
 * @param letter Single letter
 * @returns Numerical value
 */
export function getLetterValue(letter: string): number {
  const letterValues: Record<string, number> = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 1,
    k: 2,
    l: 3,
    m: 4,
    n: 5,
    o: 6,
    p: 7,
    q: 8,
    r: 9,
    s: 1,
    t: 2,
    u: 3,
    v: 4,
    w: 5,
    x: 6,
    y: 7,
    z: 8,
  }

  return letterValues[letter.toLowerCase()] || 0
}

/**
 * Reduces a number to a single digit (1-9)
 * @param num Number to reduce
 * @returns Single digit (1-9)
 */
export function reduceToSingleDigit(num: number): number {
  // Master numbers are not reduced [^3]
  if (num === 11 || num === 22 || num === 33) {
    return num
  }

  while (num > 9) {
    num = num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Number.parseInt(digit, 10), 0)
  }

  return num
}

/**
 * Retrieves the meaning of a numerology number
 * @param number Numerology number (1-9, 11, 22, 33)
 * @returns Description of the number's meaning
 */
export function getNumberMeaning(number: number): string {
  const meanings: Record<number, string> = {
    1: "Leadership, independence, originality, and self-confidence.",
    2: "Cooperation, diplomacy, patience, and sensitivity.",
    3: "Self-expression, creativity, joy, and social interaction.",
    4: "Stability, practicality, organization, and hard work.",
    5: "Freedom, change, adventure, and versatility.",
    6: "Harmony, responsibility, nurturing, and service to others.",
    7: "Analysis, wisdom, spirituality, and introspection.",
    8: "Ambition, authority, power, and material success.",
    9: "Compassion, humanitarianism, idealism, and completion.",
    11: "Intuition, inspiration, spiritual insight, and enlightenment.",
    22: "Master builder, practical idealism, and large-scale undertakings.",
    33: "Master teacher, altruism, and spiritual uplifting of humanity.",
  }

  return meanings[number] || "Unknown number meaning"
}

// Numerology report generation
export interface NumerologyReportInterface {
  lifePath: { number: number; meaning: string }
  destiny: { number: number; meaning: string }
  soulUrge: { number: number; meaning: string }
  personality: { number: number; meaning: string }
  // Add more numerology aspects as needed
}

export function getNumerologyReport(birthDate: Date, fullName: string): NumerologyReportInterface {
  const lifePathNumber = calculateLifePath(birthDate)
  const expressionNumber = calculateExpressionNumber(fullName)
  const soulUrgeNumber = calculateSoulUrgeNumber(fullName)
  const personalityNumber = calculatePersonalityNumber(fullName)

  return {
    lifePath: {
      number: lifePathNumber,
      meaning: getLifePathMeaning(lifePathNumber),
    },
    destiny: {
      number: expressionNumber, // Expression number is often referred to as Destiny number
      meaning: getExpressionMeaning(expressionNumber),
    },
    soulUrge: {
      number: soulUrgeNumber,
      meaning: getSoulUrgeMeaning(soulUrgeNumber),
    },
    personality: {
      number: personalityNumber,
      meaning: getPersonalityMeaning(personalityNumber),
    },
  }
}

// Meanings for numerology numbers (simplified for example)
function getLifePathMeaning(num: number): string {
  switch (num) {
    case 1:
      return "The Leader: Independence, innovation, and pioneering spirit."
    case 2:
      return "The Peacemaker: Cooperation, diplomacy, and sensitivity."
    case 3:
      return "The Communicator: Creativity, self-expression, and joy."
    case 4:
      return "The Builder: Stability, hard work, and practical foundation."
    case 5:
      return "The Free Spirit: Change, adventure, and adaptability."
    case 6:
      return "The Nurturer: Responsibility, harmony, and service to others."
    case 7:
      return "The Seeker: Spirituality, analysis, and inner wisdom."
    case 8:
      return "The Powerhouse: Abundance, authority, and material success."
    case 9:
      return "The Humanitarian: Compassion, universal love, and completion."
    case 11:
      return "The Master Intuitive: Spiritual insight, inspiration, and illumination."
    case 22:
      return "The Master Builder: Practical mastery, large-scale creation, and service to humanity."
    case 33:
      return "The Master Healer: Selfless service and spiritual teaching."
    default:
      return "A path of unique personal growth."
  }
}

function getExpressionMeaning(num: number): string {
  switch (num) {
    case 1:
      return "Expresses leadership and originality."
    case 2:
      return "Expresses cooperation and diplomacy."
    case 3:
      return "Expresses creativity and communication."
    case 4:
      return "Expresses practicality and order."
    case 5:
      return "Expresses freedom and versatility."
    case 6:
      return "Expresses responsibility and harmony."
    case 7:
      return "Expresses analytical and spiritual depth."
    case 8:
      return "Expresses power and material achievement."
    case 9:
      return "Expresses compassion and universal understanding."
    case 11:
      return "Expresses intuitive insights and inspiration."
    case 22:
      return "Expresses mastery in practical endeavors."
    case 33:
      return "Expresses selfless service and spiritual guidance."
    default:
      return "Expresses unique talents and abilities."
  }
}

function getSoulUrgeMeaning(num: number): string {
  switch (num) {
    case 1:
      return "Desires independence and to be a pioneer."
    case 2:
      return "Desires harmony and partnership."
    case 3:
      return "Desires creative expression and joy."
    case 4:
      return "Desires stability and security."
    case 5:
      return "Desires freedom and adventure."
    case 6:
      return "Desires to nurture and serve others."
    case 7:
      return "Desires spiritual understanding and truth."
    case 8:
      return "Desires power, control, and material success."
    case 9:
      return "Desires to serve humanity and achieve completion."
    case 11:
      return "Desires spiritual awakening and inspiration."
    case 22:
      return "Desires to build something significant for the world."
    case 33:
      return "Desires to be a master healer and teacher."
    default:
      return "Desires personal fulfillment."
  }
}

function getPersonalityMeaning(num: number): string {
  switch (num) {
    case 1:
      return "Appears independent and confident."
    case 2:
      return "Appears gentle and cooperative."
    case 3:
      return "Appears charming and expressive."
    case 4:
      return "Appears reliable and disciplined."
    case 5:
      return "Appears adventurous and adaptable."
    case 6:
      return "Appears responsible and caring."
    case 7:
      return "Appears mysterious and intellectual."
    case 8:
      return "Appears powerful and authoritative."
    case 9:
      return "Appears compassionate and wise."
    case 11:
      return "Appears intuitive and inspiring."
    case 22:
      return "Appears capable and influential."
    case 33:
      return "Appears selfless and charismatic."
    default:
      return "Appears unique and multifaceted."
  }
}

/**
 * Retrieves the meaning for a single-digit numerology number.
 * @param number The single-digit number (1-9, or master numbers 11, 22, 33).
 * @returns The meaning object for the number, or undefined if not found.
 */
export function getSingleDigitMeaning(number: number): SingleDigitMeaning | undefined {
  return numoNumberDefinitions.find((def) => def.number === number.toString() && !def.compoundMeaning) as
    | SingleDigitMeaning
    | undefined
}

/**
 * Retrieves the meaning for a compound numerology number.
 * @param number The compound number.
 * @returns The meaning object for the compound number, or undefined if not found.
 */
export function getCompoundNumberMeaning(number: number): CompoundNumberMeaning | undefined {
  return numoNumberDefinitions.find((def) => def.number === number.toString() && def.compoundMeaning) as
    | CompoundNumberMeaning
    | undefined
}
