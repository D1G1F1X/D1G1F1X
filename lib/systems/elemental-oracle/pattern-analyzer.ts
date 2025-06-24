import type { ElementalCard } from "./card-data"

export interface PatternAnalysis {
  numericalPatterns: {
    sequences: number[][]
    repeatingNumbers: number[]
    masterNumbers: number[]
    reductionPatterns: { original: number; reduced: number }[]
    numericalSum: number
    averageValue: number
  }
  elementalPatterns: {
    dominantElements: string[]
    elementalBalance: Record<string, number>
    missingElements: string[]
    elementalConflicts: string[]
    elementalHarmonies: string[]
  }
  suitPatterns: {
    suitDistribution: Record<string, number>
    dominantSuits: string[]
    suitProgression: string[]
    crossSuitConnections: string[]
  }
  geometricPatterns: {
    geometryTypes: string[]
    geometricProgression: string[]
    sacredGeometrySignificance: string[]
  }
  astrologicalPatterns: {
    planetaryInfluences: Record<string, number>
    signDistribution: Record<string, number>
    astrologicalElements: Record<string, number>
    planetaryAspects: string[]
  }
  synchronicities: {
    cardNumberSynchronicities: string[]
    birthdateSynchronicities: string[]
    nameNumerologySynchronicities: string[]
    timingSynchronicities: string[]
  }
  overallSignificance: string
}

export interface QuerentData {
  fullName: string
  birthDate: Date
  birthTime?: string
  birthPlace?: string
  question: string
  lifePathNumber: number
  expressionNumber: number
  soulUrgeNumber: number
  personalityNumber: number
  sunSign: string
  moonSign?: string
  risingSign?: string
}

export class ElementalPatternAnalyzer {
  private cards: ElementalCard[]
  private querent: QuerentData

  constructor(cards: ElementalCard[], querent: QuerentData) {
    this.cards = cards
    this.querent = querent
  }

  public analyzePatterns(): PatternAnalysis {
    return {
      numericalPatterns: this.analyzeNumericalPatterns(),
      elementalPatterns: this.analyzeElementalPatterns(),
      suitPatterns: this.analyzeSuitPatterns(),
      geometricPatterns: this.analyzeGeometricPatterns(),
      astrologicalPatterns: this.analyzeAstrologicalPatterns(),
      synchronicities: this.analyzeSynchronicities(),
      overallSignificance: this.determineOverallSignificance(),
    }
  }

  private analyzeNumericalPatterns() {
    const allNumbers = this.cards.flatMap((card) => [card.firstEndNumber, card.secondEndNumber])
    const sequences = this.findSequences(allNumbers)
    const repeatingNumbers = this.findRepeatingNumbers(allNumbers)
    const masterNumbers = allNumbers.filter((num) => [11, 22, 33, 44].includes(num))
    const reductionPatterns = allNumbers.map((num) => ({
      original: num,
      reduced: this.reduceNumber(num),
    }))

    return {
      sequences,
      repeatingNumbers,
      masterNumbers,
      reductionPatterns,
      numericalSum: allNumbers.reduce((sum, num) => sum + num, 0),
      averageValue: allNumbers.reduce((sum, num) => sum + num, 0) / allNumbers.length,
    }
  }

  private analyzeElementalPatterns() {
    const elementCounts = { fire: 0, water: 0, air: 0, earth: 0, spirit: 0 }

    this.cards.forEach((card) => {
      Object.entries(card.elementalAssociations).forEach(([element, strength]) => {
        elementCounts[element as keyof typeof elementCounts] += strength
      })
    })

    const sortedElements = Object.entries(elementCounts).sort(([, a], [, b]) => b - a)

    const dominantElements = sortedElements
      .filter(([, count]) => count >= Math.max(...Object.values(elementCounts)) * 0.8)
      .map(([element]) => element)

    const missingElements = sortedElements.filter(([, count]) => count === 0).map(([element]) => element)

    return {
      dominantElements,
      elementalBalance: elementCounts,
      missingElements,
      elementalConflicts: this.findElementalConflicts(elementCounts),
      elementalHarmonies: this.findElementalHarmonies(elementCounts),
    }
  }

  private analyzeSuitPatterns() {
    const suitCounts: Record<string, number> = {}
    const suitProgression: string[] = []

    this.cards.forEach((card) => {
      suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1
      suitProgression.push(card.suit)
    })

    const dominantSuits = Object.entries(suitCounts)
      .filter(([, count]) => count >= 2)
      .map(([suit]) => suit)

    return {
      suitDistribution: suitCounts,
      dominantSuits,
      suitProgression,
      crossSuitConnections: this.findCrossSuitConnections(),
    }
  }

  private analyzeGeometricPatterns() {
    const geometryTypes = [...new Set(this.cards.map((card) => card.sacredGeometry))]
    const geometricProgression = this.cards.map((card) => card.sacredGeometry)

    return {
      geometryTypes,
      geometricProgression,
      sacredGeometrySignificance: this.interpretSacredGeometry(geometryTypes),
    }
  }

  private analyzeAstrologicalPatterns() {
    const planetaryInfluences: Record<string, number> = {}
    const signDistribution: Record<string, number> = {}
    const astrologicalElements: Record<string, number> = { fire: 0, earth: 0, air: 0, water: 0 }

    this.cards.forEach((card) => {
      planetaryInfluences[card.planetaryInfluence] = (planetaryInfluences[card.planetaryInfluence] || 0) + 1
      signDistribution[card.astrologicalSign] = (signDistribution[card.astrologicalSign] || 0) + 1

      // Map astrological signs to elements
      const signElement = this.getAstrologicalElement(card.astrologicalSign)
      if (signElement) {
        astrologicalElements[signElement]++
      }
    })

    return {
      planetaryInfluences,
      signDistribution,
      astrologicalElements,
      planetaryAspects: this.analyzePlanetaryAspects(),
    }
  }

  private analyzeSynchronicities() {
    const cardNumbers = this.cards.flatMap((card) => [card.firstEndNumber, card.secondEndNumber])

    return {
      cardNumberSynchronicities: this.findCardNumberSynchronicities(cardNumbers),
      birthdateSynchronicities: this.findBirthdateSynchronicities(cardNumbers),
      nameNumerologySynchronicities: this.findNameNumerologySynchronicities(cardNumbers),
      timingSynchronicities: this.findTimingSynchronicities(),
    }
  }

  private determineOverallSignificance(): string {
    const patterns = this.analyzePatterns()
    const significanceFactors: string[] = []

    // Check for master numbers
    if (patterns.numericalPatterns.masterNumbers.length > 0) {
      significanceFactors.push("Master number presence indicates heightened spiritual significance")
    }

    // Check for elemental dominance
    if (patterns.elementalPatterns.dominantElements.length === 1) {
      significanceFactors.push(`Strong ${patterns.elementalPatterns.dominantElements[0]} energy dominates this reading`)
    }

    // Check for synchronicities
    if (patterns.synchronicities.birthdateSynchronicities.length > 0) {
      significanceFactors.push("Significant synchronicities with birth data detected")
    }

    return significanceFactors.join(". ") || "This reading shows balanced energies with subtle but meaningful patterns."
  }

  // Helper methods
  private findSequences(numbers: number[]): number[][] {
    const sequences: number[][] = []
    const sorted = [...numbers].sort((a, b) => a - b)

    let currentSequence: number[] = [sorted[0]]

    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] === sorted[i - 1] + 1) {
        currentSequence.push(sorted[i])
      } else {
        if (currentSequence.length >= 3) {
          sequences.push([...currentSequence])
        }
        currentSequence = [sorted[i]]
      }
    }

    if (currentSequence.length >= 3) {
      sequences.push(currentSequence)
    }

    return sequences
  }

  private findRepeatingNumbers(numbers: number[]): number[] {
    const counts: Record<number, number> = {}
    numbers.forEach((num) => {
      counts[num] = (counts[num] || 0) + 1
    })

    return Object.entries(counts)
      .filter(([, count]) => count >= 2)
      .map(([num]) => Number.parseInt(num))
  }

  private reduceNumber(num: number): number {
    if ([11, 22, 33, 44].includes(num)) return num

    while (num > 9) {
      num = num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + Number.parseInt(digit), 0)
    }

    return num
  }

  private findElementalConflicts(elementCounts: Record<string, number>): string[] {
    const conflicts: string[] = []

    // Fire vs Water
    if (elementCounts.fire > 0 && elementCounts.water > 0) {
      conflicts.push("Fire-Water tension requires balance between passion and emotion")
    }

    // Air vs Earth
    if (elementCounts.air > 0 && elementCounts.earth > 0) {
      conflicts.push("Air-Earth dynamic balances ideas with practical implementation")
    }

    return conflicts
  }

  private findElementalHarmonies(elementCounts: Record<string, number>): string[] {
    const harmonies: string[] = []

    // Fire + Air
    if (elementCounts.fire > 0 && elementCounts.air > 0) {
      harmonies.push("Fire-Air harmony enhances creative communication and inspired action")
    }

    // Water + Earth
    if (elementCounts.water > 0 && elementCounts.earth > 0) {
      harmonies.push("Water-Earth harmony supports emotional grounding and practical nurturing")
    }

    // Spirit with any element
    if (elementCounts.spirit > 0) {
      harmonies.push("Spirit energy elevates and unifies all other elemental influences")
    }

    return harmonies
  }

  private findCrossSuitConnections(): string[] {
    const connections: string[] = []
    const suits = [...new Set(this.cards.map((card) => card.suit))]

    if (suits.length > 1) {
      connections.push(`Multi-suit reading connects ${suits.join(", ")} energies`)
    }

    return connections
  }

  private interpretSacredGeometry(geometryTypes: string[]): string[] {
    const interpretations: string[] = []

    geometryTypes.forEach((geometry) => {
      switch (geometry) {
        case "Triangle":
          interpretations.push("Triangle represents divine trinity and creative manifestation")
          break
        case "Circle":
          interpretations.push("Circle symbolizes unity, wholeness, and infinite potential")
          break
        case "Square":
          interpretations.push("Square indicates stability, foundation, and material manifestation")
          break
        case "Pentagram":
          interpretations.push("Pentagram represents human consciousness and elemental mastery")
          break
        case "Hexagon":
          interpretations.push("Hexagon symbolizes harmony, balance, and natural perfection")
          break
        case "Spiral":
          interpretations.push("Spiral indicates growth, evolution, and cosmic consciousness")
          break
        case "Merkaba":
          interpretations.push("Merkaba represents spiritual ascension and dimensional travel")
          break
        case "Flower of Life":
          interpretations.push("Flower of Life symbolizes creation patterns and universal connection")
          break
      }
    })

    return interpretations
  }

  private getAstrologicalElement(sign: string): string | null {
    const fireSign = ["Aries", "Leo", "Sagittarius"]
    const earthSigns = ["Taurus", "Virgo", "Capricorn"]
    const airSigns = ["Gemini", "Libra", "Aquarius"]
    const waterSigns = ["Cancer", "Scorpio", "Pisces"]

    if (fireSign.includes(sign)) return "fire"
    if (earthSigns.includes(sign)) return "earth"
    if (airSigns.includes(sign)) return "air"
    if (waterSigns.includes(sign)) return "water"

    return null
  }

  private analyzePlanetaryAspects(): string[] {
    const planets = this.cards.map((card) => card.planetaryInfluence)
    const aspects: string[] = []

    // Check for planetary combinations
    if (planets.includes("Sun") && planets.includes("Moon")) {
      aspects.push("Sun-Moon aspect indicates balance between conscious and unconscious forces")
    }

    if (planets.includes("Venus") && planets.includes("Mars")) {
      aspects.push("Venus-Mars aspect suggests harmony between love and action energies")
    }

    return aspects
  }

  private findCardNumberSynchronicities(cardNumbers: number[]): string[] {
    const synchronicities: string[] = []

    // Check if any card numbers match querent's life path
    if (cardNumbers.includes(this.querent.lifePathNumber)) {
      synchronicities.push(`Life Path Number ${this.querent.lifePathNumber} appears in the cards`)
    }

    // Check for expression number matches
    if (cardNumbers.includes(this.querent.expressionNumber)) {
      synchronicities.push(`Expression Number ${this.querent.expressionNumber} appears in the cards`)
    }

    return synchronicities
  }

  private findBirthdateSynchronicities(cardNumbers: number[]): string[] {
    const synchronicities: string[] = []
    const birthDay = this.querent.birthDate.getDate()
    const birthMonth = this.querent.birthDate.getMonth() + 1
    const birthYear = this.querent.birthDate.getFullYear()

    if (cardNumbers.includes(birthDay)) {
      synchronicities.push(`Birth day ${birthDay} appears in the cards`)
    }

    if (cardNumbers.includes(birthMonth)) {
      synchronicities.push(`Birth month ${birthMonth} appears in the cards`)
    }

    // Check for birth year digits
    const yearDigits = birthYear
      .toString()
      .split("")
      .map((d) => Number.parseInt(d))
    yearDigits.forEach((digit) => {
      if (cardNumbers.includes(digit)) {
        synchronicities.push(`Birth year digit ${digit} appears in the cards`)
      }
    })

    return synchronicities
  }

  private findNameNumerologySynchronicities(cardNumbers: number[]): string[] {
    const synchronicities: string[] = []

    if (cardNumbers.includes(this.querent.soulUrgeNumber)) {
      synchronicities.push(`Soul Urge Number ${this.querent.soulUrgeNumber} appears in the cards`)
    }

    if (cardNumbers.includes(this.querent.personalityNumber)) {
      synchronicities.push(`Personality Number ${this.querent.personalityNumber} appears in the cards`)
    }

    return synchronicities
  }

  private findTimingSynchronicities(): string[] {
    const synchronicities: string[] = []
    const now = new Date()
    const currentDay = now.getDate()
    const currentMonth = now.getMonth() + 1

    const cardNumbers = this.cards.flatMap((card) => [card.firstEndNumber, card.secondEndNumber])

    if (cardNumbers.includes(currentDay)) {
      synchronicities.push(`Today's date ${currentDay} appears in the cards`)
    }

    if (cardNumbers.includes(currentMonth)) {
      synchronicities.push(`Current month ${currentMonth} appears in the cards`)
    }

    return synchronicities
  }
}
