/**
 * Calculates the life path number based on a birth date
 * @param birthDate The birth date
 * @returns The life path number (1-9, 11, 22, or 33)
 */
export function calculateLifePath(birthDate: Date): number {
  const dateString = birthDate.toISOString().split("T")[0] // YYYY-MM-DD
  const [year, month, day] = dateString.split("-").map(Number)

  // Calculate sum of all digits
  const yearSum = reduceToSingleDigit(year)
  const monthSum = reduceToSingleDigit(month)
  const daySum = reduceToSingleDigit(day)

  // Sum the reduced numbers
  let lifePathNumber = yearSum + monthSum + daySum

  // Reduce to a single digit, but preserve master numbers
  while (lifePathNumber > 9 && lifePathNumber !== 11 && lifePathNumber !== 22 && lifePathNumber !== 33) {
    lifePathNumber = reduceToSingleDigit(lifePathNumber)
  }

  return lifePathNumber
}

/**
 * Calculates the destiny number based on a full name
 * @param fullName The full name of the person
 * @returns The destiny number (1-9, 11, 22, or 33)
 */
export function calculateDestinyNumber(fullName: string): number {
  const nameSum = fullName
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .reduce((sum, letter) => sum + letterToNumber(letter), 0)

  return reduceToSingleDigit(nameSum)
}

/**
 * Alias for calculateDestinyNumber - calculates the expression number based on a full name
 * @param fullName The full name of the person
 * @returns The expression number (1-9, 11, 22, or 33)
 */
export function calculateExpression(fullName: string): number {
  return calculateDestinyNumber(fullName)
}

/**
 * Calculates the soul urge number based on the vowels in a name
 * @param fullName The full name of the person
 * @returns The soul urge number (1-9, 11, 22, or 33)
 */
export function calculateSoulUrgeNumber(fullName: string): number {
  const vowels = "aeiou"
  const vowelSum = fullName
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .reduce((sum, letter) => {
      if (vowels.includes(letter)) {
        return sum + letterToNumber(letter)
      }
      return sum
    }, 0)

  return reduceToSingleDigit(vowelSum)
}

/**
 * Alias for calculateSoulUrgeNumber - calculates the soul urge number based on the vowels in a name
 * @param fullName The full name of the person
 * @returns The soul urge number (1-9, 11, 22, or 33)
 */
export function calculateSoulUrge(fullName: string): number {
  return calculateSoulUrgeNumber(fullName)
}

/**
 * Calculates the personality number based on the consonants in a name
 * @param fullName The full name of the person
 * @returns The personality number (1-9, 11, 22, or 33)
 */
export function calculatePersonalityNumber(fullName: string): number {
  const vowels = "aeiou"
  const consonantSum = fullName
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .reduce((sum, letter) => {
      if (!vowels.includes(letter)) {
        return sum + letterToNumber(letter)
      }
      return sum
    }, 0)

  return reduceToSingleDigit(consonantSum)
}

/**
 * Alias for calculatePersonalityNumber - calculates the personality number based on the consonants in a name
 * @param fullName The full name of the person
 * @returns The personality number (1-9, 11, 22, or 33)
 */
export function calculatePersonality(fullName: string): number {
  return calculatePersonalityNumber(fullName)
}

/**
 * Calculates the compatibility between two numerology profiles
 * @param profile1 The first person's numerology profile
 * @param profile2 The second person's numerology profile
 * @returns A compatibility score from 1-9
 */
export function calculateCompatibility(profile1: any, profile2: any): number {
  // Calculate compatibility based on various numerology numbers
  const lifePathCompatibility = Math.min(9, Math.abs(9 - Math.abs(profile1.lifePathNumber - profile2.lifePathNumber)))
  const destinyCompatibility = Math.min(9, Math.abs(9 - Math.abs(profile1.destinyNumber - profile2.destinyNumber)))
  const personalityCompatibility = Math.min(
    9,
    Math.abs(9 - Math.abs(profile1.personalityNumber - profile2.personalityNumber)),
  )
  const soulCompatibility = Math.min(9, Math.abs(9 - Math.abs(profile1.soulUrgeNumber - profile2.soulUrgeNumber)))

  // Calculate overall compatibility score (average of individual scores)
  const overallScore = Math.round(
    (lifePathCompatibility + destinyCompatibility + personalityCompatibility + soulCompatibility) / 4,
  )

  return overallScore
}

/**
 * Converts a letter to its numerological value
 * @param letter The letter to convert
 * @returns The numerological value of the letter
 */
function letterToNumber(letter: string): number {
  const letterMap: { [key: string]: number } = {
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
  return letterMap[letter] || 0
}

/**
 * Reduces a number to a single digit by adding its digits together
 * @param num The number to reduce
 * @returns The reduced number (1-9)
 */
function reduceToSingleDigit(num: number): number {
  if (num === 11 || num === 22 || num === 33) return num
  if (num < 10) return num
  return reduceToSingleDigit(
    num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Number.parseInt(digit), 0),
  )
}

/**
 * Alias for calculateDestinyNumber - calculates the expression number based on a full name
 * @param fullName The full name of the person
 * @returns The expression number (1-9, 11, 22, or 33)
 */
export function calculateExpressionNumber(fullName: string): number {
  return calculateDestinyNumber(fullName)
}
