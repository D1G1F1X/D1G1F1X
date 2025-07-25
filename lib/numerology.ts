import { numoNumberDefinitions } from "@/data/numo-definitions"

/**
 * Calculates the Life Path number from a birth date.
 * @param birthDate The birth date as a Date object.
 * @returns The Life Path number.
 */
export function calculateLifePath(birthDate: Date): number {
  const year = birthDate.getFullYear()
  const month = birthDate.getMonth() + 1 // getMonth() is 0-indexed
  const day = birthDate.getDate()

  const reducedMonth = reduceToSingleDigit(month)
  const reducedDay = reduceToSingleDigit(day)
  const reducedYear = reduceToSingleDigit(year)

  return reduceToSingleDigit(reducedMonth + reducedDay + reducedYear)
}

/**
 * Calculates the Life Path number from a date of birth
 * @param dateString Date string in format YYYY-MM-DD
 * @returns Life path number (1-9)
 */
export function calculateLifePathNumber(dateString: string): number {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format")
    }

    const day = date.getDate()
    const month = date.getMonth() + 1 // JavaScript months are 0-indexed
    const year = date.getFullYear()

    // Calculate sum of all digits
    const daySum = sumDigits(day)
    const monthSum = sumDigits(month)
    const yearSum = sumDigits(year)

    // Sum the reduced numbers
    const totalSum = daySum + monthSum + yearSum

    // Reduce to a single digit (unless it's a master number)
    return reduceToSingleDigit(totalSum)
  } catch (error) {
    console.error("Error calculating life path number:", error)
    return 0
  }
}

/**
 * Calculates the Expression (Destiny) number from a full name.
 * @param fullName The full name.
 * @returns The Expression number.
 */
export function calculateExpression(fullName: string): number {
  return calculateDestinyNumber(fullName) // Same calculation method
}

/**
 * Calculates the destiny number from a name
 * @param name Full name
 * @returns Destiny number (1-9)
 */
export function calculateDestinyNumber(name: string): number {
  try {
    if (!name || name.trim() === "") {
      return 0
    }

    const normalizedName = name.toLowerCase().replace(/[^a-z]/g, "")
    let sum = 0

    for (let i = 0; i < normalizedName.length; i++) {
      sum += getLetterValue(normalizedName[i])
    }

    return reduceToSingleDigit(sum)
  } catch (error) {
    console.error("Error calculating destiny number:", error)
    return 0
  }
}

/**
 * Calculates the Soul Urge (Heart's Desire) number from the vowels in a name.
 * @param fullName The full name.
 * @returns The Soul Urge number.
 */
export function calculateSoulUrge(fullName: string): number {
  try {
    if (!fullName || fullName.trim() === "") {
      return 0
    }

    const normalizedName = fullName.toLowerCase()
    let sum = 0

    for (let i = 0; i < normalizedName.length; i++) {
      const char = normalizedName[i]
      if (/[aeiou]/.test(char)) {
        sum += getLetterValue(char)
      }
    }

    return reduceToSingleDigit(sum)
  } catch (error) {
    console.error("Error calculating soul urge number:", error)
    return 0
  }
}

/**
 * Calculates the Personality number from the consonants in a name.
 * @param fullName The full name.
 * @returns The Personality number.
 */
export function calculatePersonality(fullName: string): number {
  try {
    if (!fullName || fullName.trim() === "") {
      return 0
    }

    const normalizedName = fullName.toLowerCase()
    let sum = 0

    for (let i = 0; i < normalizedName.length; i++) {
      const char = normalizedName[i]
      if (!/[aeiou]/.test(char) && getLetterValue(char) !== 0) {
        sum += getLetterValue(char)
      }
    }

    return reduceToSingleDigit(sum)
  } catch (error) {
    console.error("Error calculating personality number:", error)
    return 0
  }
}

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
 * Gets the meaning of a compound number
 * @param number Compound number
 * @returns Description of the compound number's meaning
 */
export function getCompoundNumberMeaning(number: number): string {
  // This is a simplified version - in a real system, you'd have meanings for many compound numbers
  const meanings: Record<number, string> = {
    10: "Self-determination and independence.",
    11: "Spiritual insight and enlightenment.",
    12: "Sacrifice and understanding.",
    13: "Transformation and rebirth.",
    14: "Movement and change.",
    15: "Magic and mystery.",
    16: "Awakening and warning.",
    17: "Immortality and spiritual consciousness.",
    18: "Materialism and spiritual conflict.",
    19: "The Sun; success and happiness.",
    20: "Awakening and judgment.",
    21: "The Universe; success, fulfillment, and completion.",
    22: "Master builder, practical idealism, and large-scale undertakings.",
    23: "The Royal Star of the Lion; success through help from superiors.",
    24: "Success through assistance from others.",
    25: "Strength gained through experience.",
    26: "Warning of potential challenges.",
    27: "The Scepter; authority and command.",
    28: "Contradictions and potential loss.",
    29: "Difficulties that can lead to success.",
    30: "Thoughtful deduction and retrospection.",
    31: "The Recluse; introspection and solitude.",
    32: "Communication and versatility.",
    33: "Master teacher, altruism, and spiritual uplifting of humanity.",
    // Add more as needed
  }

  return meanings[number] || "This compound number represents a unique combination of energies."
}

/**
 * Calculates all core numerology numbers for a given birth date and full name.
 * @param birthDate The birth date as a Date object.
 * @param fullName The full birth name.
 * @returns An object containing life path, expression, soul urge, and personality numbers.
 */
export function getNumerologyReport(
  birthDate: Date,
  fullName: string,
): {
  lifePath: number
  expression: number
  soulUrge: number
  personality: number
} {
  const lifePath = calculateLifePath(birthDate)
  const expression = calculateExpression(fullName)
  const soulUrge = calculateSoulUrge(fullName)
  const personality = calculatePersonality(fullName)

  return { lifePath, expression, soulUrge, personality }
}

/**
 * Retrieves the descriptive value for a given symbol key.
 * This function uses the numoNumberDefinitions to provide detailed explanations.
 * @param symbolKey The key of the symbol (e.g., "Eye", "Dot", "Pluto", "Aries").
 * @returns The descriptive text for the symbol, or the original key if not found.
 */
export const getSymbolDescription = (symbolKey: string): string => {
  // Check single digit meanings
  if (numoNumberDefinitions.singleDigits[symbolKey]) {
    return `${symbolKey} - ${numoNumberDefinitions.singleDigits[symbolKey].title}: ${numoNumberDefinitions.singleDigits[symbolKey].description}`
  }

  // Check compound number meanings
  if (numoNumberDefinitions.compoundNumbers[symbolKey]) {
    return `${symbolKey} - ${numoNumberDefinitions.compoundNumbers[symbolKey].title}: ${numoNumberDefinitions.compoundNumbers[symbolKey].description}`
  }

  // Check if it's a known sacred geometry, planet, astrology, or orientation from card metadata
  // This part would ideally be driven by a more structured lookup for these specific types of symbols.
  // For now, we can hardcode some common ones or return the key itself.
  const cardMetadataMeanings: { [key: string]: string } = {
    Eye: "The Eye: Represents perception, insight, and spiritual vision. It sees beyond the obvious, revealing hidden truths and understanding.",
    Dot: "The Dot: The spark of origin—the first point from which all things emerge. It is the singularity, the concentrated seed of potential, the initial impulse of consciousness before expansion into dimension and form. A symbol of unity and wholeness.",
    Pluto:
      "Pluto: Deep, transformative forces working behind the scenes. Pluto governs the subconscious realms, instigating profound metamorphosis by unearthing hidden truths, dismantling old structures, and facilitating regeneration and rebirth from the ashes of what was.",
    Scorpio:
      "Scorpio: Reflects external themes of rebirth, secrecy, and shedding of old layers. Scorpio navigates the depths of existence, confronting power dynamics, intense emotions, and the mysteries of life and death, ultimately leading to profound healing and empowerment.",
    Fire: "Fire: The combustion of Spirit and Water—the ignition of creation and passion. Fire is the activating, dynamic principle that fuels transformation, provides courage, and illuminates the path, turning inspiration (Spirit) and emotional depth (Water) into tangible manifestation.",
    Hourglass:
      "Hourglass: Symbolizes the passage of time, the finite nature of cycles, and the urgency of the present moment. It represents the culmination of events and the inevitability of change.",
    "Finite Symbol":
      "Finite Symbol: The edge of infinity-what is bounded must resolve. This likely refers to a symbol representing a closed loop or a defined boundary (perhaps the infinity symbol itself, representing cycles), indicating that within any given framework, resolution or completion is sought.",
    Jupiter:
      "Jupiter: Inner expansion through boundaries and endings. Jupiter brings growth, optimism, and a search for meaning. Even as a cycle concludes, Jupiter's influence ensures that this ending paves the way for greater understanding and future opportunities.",
    Sagittarius:
      "Sagittarius: External truth-seeking mission concluding a cycle. Sagittarius is associated with exploration, higher learning, and a quest for truth. This indicates that a particular journey of discovery or understanding is reaching a point of culmination.",
    Spirit:
      "Spirit: Earth giving rise to release and ascension. Spirit here connects to the ethereal, the transcendent. As the earthly cycle (represented by the cord and its binding) completes, there's an opportunity for a release of energy or understanding to a higher level.",
    "Knot Before":
      "Knot Before: Suggests the binding is imminent—preparation for conclusion. A knot tied signifies commitment, a decision made, or a process being secured. 'Knot Before' implies the final actions leading up to this sealing.",
    "Infinity Symbol":
      "Infinity Symbol: Represents endlessness, eternity, and the cyclical nature of existence. It signifies boundless potential and the continuous flow of energy.",
    Saturn:
      "Saturn: Responsibility, karmic patterns, mastery through boundaries. Saturn governs discipline, structure, and the lessons learned through limitations. It emphasizes long-term goals and integrity.",
    Capricorn:
      "Capricorn: Structure, long-term goals, integrity. Capricorn is associated with ambition, discipline, and the pursuit of practical achievements. It embodies resilience and a strong sense of duty.",
    "Smooth Side":
      "Smooth Side: Indicates a state of flow, ease, and unhindered progress. It suggests that the current situation is unfolding smoothly, without significant obstacles or friction.",
    Pentagon:
      "Pentagon: A symbol of protection, balance, and the five elements (Earth, Air, Fire, Water, Spirit). It represents the human microcosm and the connection between the spiritual and material worlds.",
    Mars: "Mars: Assertion, willpower, protection. Mars governs drive, courage, and the initiation of action. It represents the force that pushes through obstacles and defends boundaries.",
    Aries:
      "Aries: Direct action, courage, and leadership in ending cycles. Aries initiates with boldness. In the context of 9, this energy is applied to courageously finalize a chapter, leading the way towards resolution and preparing for new ventures.",
    Earth:
      "Earth: Where Air unveils patterns and possibilities, Earth gives those patterns substance—turning vision into ritual, ideas into foundations, and fleeting clarity into enduring wisdom. Earth grounds the insights (Air) into tangible, lasting understanding and solidifies the completion.",
    Cooking:
      "Cooking: Indicates that the creation is in progress, not yet released. This highlights a phase of internal development, gestation, and careful preparation, where the transformative work is happening beneath the surface, shielded from external view until ready.",
    "Shaft First":
      "Shaft First: Represents directness, focus, and intentionality. It suggests a clear path forward, with energy and purpose directed towards a specific goal, emphasizing the initial thrust of an endeavor.",
    "Direction Arrows":
      "Direction Arrows: Symbolize guidance, movement, and the choices available on one's path. They indicate a need for clarity in direction or a journey towards a specific destination.",
    Uranus:
      "Uranus: Revolution, innovation, and personal awakening. Uranus governs sudden changes, breakthroughs, and the pursuit of freedom. It encourages breaking tradition and embracing individuality.",
    Aquarius:
      "Aquarius: Humanitarian focus, idealism, breaking tradition. Aquarius is associated with innovation, social justice, and a forward-thinking mindset. It embodies collective consciousness and progressive ideals.",
    Ladder:
      "Ladder: Represents ascent, progress, and connection between different levels of existence (e.g., earthly and spiritual). It symbolizes growth, reaching higher understanding, and overcoming challenges step by step.",
    Air: "Air: The element of intellect, communication, and thought. It represents clarity, objectivity, and the ability to perceive patterns and possibilities. Air is associated with mental processes and the realm of ideas.",
    "Knot Away":
      "Knot Away: Suggests the release or untying of a binding, indicating a conclusion or the loosening of a commitment. It implies moving away from a sealed agreement or the completion of a fated resolution.",
  }

  return cardMetadataMeanings[symbolKey] || symbolKey
}

/**
 * Gets the numerological value of a letter (A=1, B=2, etc.)
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
 * Gets the numerological value of a symbol
 * @param symbol Symbol name or identifier
 * @returns Numerical value
 */
export function getSymbolValue(symbol: string): number {
  if (!symbol) return 0
  switch (symbol.toLowerCase()) {
    case "pentagram":
    case "pentagon":
      return 5 // Often associated with the five elements or human form
    case "plus sign":
    case "delta":
    case "direction arrows":
      return 4 // Represents stability, foundation, four cardinal directions
    case "hourglass":
      return 8 // Represents cycles, time, often linked to infinity or balance
    case "finite symbol":
      return 9 // Represents completion, the end of a cycle
    case "eye":
      return 3 // Represents insight, vision, trinity
    default:
      return 0 // Default for unknown symbols
  }
}

/**
 * Sums all digits in a number
 * @param num Number to sum digits of
 * @returns Sum of all digits
 */
export function sumDigits(num: number): number {
  let sum = 0
  const numStr = num.toString()

  for (let i = 0; i < numStr.length; i++) {
    sum += Number.parseInt(numStr[i])
  }

  return sum
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
    num = sumDigits(num)
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
    6: "Harmony, responsibility, nurturing, and service.",
    7: "Analysis, wisdom, spirituality, and introspection.",
    8: "Ambition, authority, power, and material success.",
    9: "Compassion, humanitarianism, idealism, and completion.",
    11: "Intuition, inspiration, spiritual insight, and enlightenment.",
    22: "Master builder, practical idealism, and large-scale undertakings.",
    33: "Master teacher, altruism, and spiritual uplifting of humanity.",
  }

  return meanings[number] || "Unknown number meaning"
}

/**
 * Retrieves the meaning of a single digit number.
 */
export const getSingleDigitMeaning = (digit: number) => {
  return numoNumberDefinitions.singleDigits[String(digit)]
}

/**
 * Placeholder for compatibility calculation.
 * In a real application, this would involve more complex logic
 * based on numerology principles.
 */
export function calculateCompatibility(num1: number, num2: number): string {
  // Simple placeholder logic
  if (num1 === num2) {
    return "Highly compatible: strong resonance and understanding."
  } else if (Math.abs(num1 - num2) === 1) {
    return "Moderately compatible: good balance with some complementary differences."
  } else {
    return "Challenging but growth-oriented: opportunities for learning and expansion."
  }
}
