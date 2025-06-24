import { type ElementalCard, getAllElementalCards, getElementalCard } from "./card-data"
import { type QuerentData, ElementalPatternAnalyzer } from "./pattern-analyzer"
import { ElementalReadingGenerator, type ElementalReading } from "./reading-generator"
import {
  calculateLifePath,
  calculateExpressionNumber,
  calculateSoulUrgeNumber,
  calculatePersonalityNumber,
} from "@/lib/numerology"

export interface ReadingRequest {
  querentInfo: {
    fullName: string
    birthDate: Date
    birthTime?: string
    birthPlace?: string
    question: string
  }
  cardSelection?: {
    method: "random" | "guided" | "specific"
    numberOfCards: number
    specificCardIds?: string[]
  }
  readingOptions?: {
    includeReversals: boolean
    focusArea?: "general" | "love" | "career" | "spiritual" | "health"
    detailLevel: "basic" | "comprehensive" | "master"
  }
}

export interface ReadingResponse {
  success: boolean
  reading?: ElementalReading
  error?: string
  warnings?: string[]
}

export class ElementalOracleSystem {
  private allCards: ElementalCard[]

  constructor() {
    this.allCards = getAllElementalCards()
  }

  public async generateReading(request: ReadingRequest): Promise<ReadingResponse> {
    try {
      // Validate request
      const validation = this.validateRequest(request)
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.error,
          warnings: validation.warnings,
        }
      }

      // Prepare querent data
      const querentData = await this.prepareQuerentData(request.querentInfo)

      // Select cards
      const selectedCards = this.selectCards(
        request.cardSelection || {
          method: "random",
          numberOfCards: 3,
        },
      )

      // Generate reading
      const generator = new ElementalReadingGenerator(selectedCards, querentData)
      const reading = generator.generateReading()

      return {
        success: true,
        reading,
        warnings: validation.warnings,
      }
    } catch (error) {
      return {
        success: false,
        error: `Failed to generate reading: ${error instanceof Error ? error.message : "Unknown error"}`,
      }
    }
  }

  public async analyzeCardCombination(cardIds: string[]): Promise<{
    cards: ElementalCard[]
    quickAnalysis: string
    patterns: any
  }> {
    const cards = cardIds.map((id) => getElementalCard(id)).filter(Boolean) as ElementalCard[]

    if (cards.length === 0) {
      throw new Error("No valid cards found for analysis")
    }

    // Create minimal querent data for pattern analysis
    const mockQuerent: QuerentData = {
      fullName: "Analysis",
      birthDate: new Date(),
      question: "Card combination analysis",
      lifePathNumber: 1,
      expressionNumber: 1,
      soulUrgeNumber: 1,
      personalityNumber: 1,
      sunSign: "Aries",
    }

    const analyzer = new ElementalPatternAnalyzer(cards, mockQuerent)
    const patterns = analyzer.analyzePatterns()

    const quickAnalysis = this.generateQuickAnalysis(cards, patterns)

    return {
      cards,
      quickAnalysis,
      patterns,
    }
  }

  public getCardDatabase(): ElementalCard[] {
    return this.allCards
  }

  public searchCards(criteria: {
    element?: string
    suit?: string
    numberRange?: [number, number]
    keywords?: string[]
  }): ElementalCard[] {
    return this.allCards.filter((card) => {
      if (criteria.element && card.element !== criteria.element) return false
      if (criteria.suit && card.suit !== criteria.suit) return false

      if (criteria.numberRange) {
        const [min, max] = criteria.numberRange
        const cardNumbers = [card.firstEndNumber, card.secondEndNumber]
        if (!cardNumbers.some((num) => num >= min && num <= max)) return false
      }

      if (criteria.keywords) {
        const cardKeywords = card.keywords.map((k) => k.toLowerCase())
        if (
          !criteria.keywords.some((keyword) =>
            cardKeywords.some((cardKeyword) => cardKeyword.includes(keyword.toLowerCase())),
          )
        )
          return false
      }

      return true
    })
  }

  private validateRequest(request: ReadingRequest): {
    isValid: boolean
    error?: string
    warnings?: string[]
  } {
    const warnings: string[] = []

    // Validate querent info
    if (!request.querentInfo.fullName.trim()) {
      return { isValid: false, error: "Full name is required" }
    }

    if (!request.querentInfo.birthDate) {
      return { isValid: false, error: "Birth date is required" }
    }

    if (!request.querentInfo.question.trim()) {
      return { isValid: false, error: "Question is required" }
    }

    // Validate birth date
    const birthDate = new Date(request.querentInfo.birthDate)
    const now = new Date()
    const age = now.getFullYear() - birthDate.getFullYear()

    if (age < 0 || age > 150) {
      return { isValid: false, error: "Invalid birth date" }
    }

    if (age < 18) {
      warnings.push("Reading is for entertainment purposes only for minors")
    }

    // Validate card selection
    const cardSelection = request.cardSelection
    if (cardSelection) {
      if (cardSelection.numberOfCards < 1 || cardSelection.numberOfCards > 10) {
        return { isValid: false, error: "Number of cards must be between 1 and 10" }
      }

      if (cardSelection.method === "specific" && !cardSelection.specificCardIds) {
        return { isValid: false, error: "Specific card IDs required for specific selection method" }
      }

      if (cardSelection.specificCardIds) {
        const invalidIds = cardSelection.specificCardIds.filter((id) => !getElementalCard(id))
        if (invalidIds.length > 0) {
          return { isValid: false, error: `Invalid card IDs: ${invalidIds.join(", ")}` }
        }
      }
    }

    return { isValid: true, warnings: warnings.length > 0 ? warnings : undefined }
  }

  private async prepareQuerentData(info: ReadingRequest["querentInfo"]): Promise<QuerentData> {
    const birthDate = new Date(info.birthDate)

    return {
      fullName: info.fullName,
      birthDate,
      birthTime: info.birthTime,
      birthPlace: info.birthPlace,
      question: info.question,
      lifePathNumber: calculateLifePath(birthDate),
      expressionNumber: calculateExpressionNumber(info.fullName),
      soulUrgeNumber: calculateSoulUrgeNumber(info.fullName),
      personalityNumber: calculatePersonalityNumber(info.fullName),
      sunSign: this.calculateSunSign(birthDate),
      // moonSign and risingSign would require birth time and location
    }
  }

  private selectCards(selection: NonNullable<ReadingRequest["cardSelection"]>): ElementalCard[] {
    switch (selection.method) {
      case "specific":
        return selection.specificCardIds!.map((id) => getElementalCard(id)).filter(Boolean) as ElementalCard[]

      case "guided":
        // Implement guided selection based on querent data
        return this.guidedCardSelection(selection.numberOfCards)

      case "random":
      default:
        return this.randomCardSelection(selection.numberOfCards)
    }
  }

  private randomCardSelection(numberOfCards: number): ElementalCard[] {
    const shuffled = [...this.allCards].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, numberOfCards)
  }

  private guidedCardSelection(numberOfCards: number): ElementalCard[] {
    // Implement intelligent card selection based on elemental balance
    const elementalGroups = {
      fire: this.allCards.filter((c) => c.element === "fire"),
      water: this.allCards.filter((c) => c.element === "water"),
      air: this.allCards.filter((c) => c.element === "air"),
      earth: this.allCards.filter((c) => c.element === "earth"),
      spirit: this.allCards.filter((c) => c.element === "spirit"),
    }

    const selectedCards: ElementalCard[] = []
    const elements = Object.keys(elementalGroups)

    // Ensure elemental diversity
    for (let i = 0; i < numberOfCards; i++) {
      const elementIndex = i % elements.length
      const element = elements[elementIndex]
      const group = elementalGroups[element as keyof typeof elementalGroups]

      if (group.length > 0) {
        const randomCard = group[Math.floor(Math.random() * group.length)]
        selectedCards.push(randomCard)

        // Remove selected card to avoid duplicates
        const cardIndex = group.indexOf(randomCard)
        group.splice(cardIndex, 1)
      }
    }

    return selectedCards
  }

  private calculateSunSign(birthDate: Date): string {
    const month = birthDate.getMonth() + 1
    const day = birthDate.getDate()

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries"
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus"
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini"
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer"
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo"
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo"
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra"
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio"
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius"
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn"
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius"
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces"

    return "Unknown"
  }

  private generateQuickAnalysis(cards: ElementalCard[], patterns: any): string {
    const dominantElement = patterns.elementalPatterns.dominantElements[0]
    const cardCount = cards.length
    const averageNumber = Math.round(patterns.numericalPatterns.averageValue)

    let analysis = `This ${cardCount}-card combination reveals a ${dominantElement}-dominant energy pattern. `

    if (patterns.numericalPatterns.masterNumbers.length > 0) {
      analysis += `The presence of Master Numbers (${patterns.numericalPatterns.masterNumbers.join(", ")}) indicates heightened spiritual significance. `
    }

    analysis += `The average numerical vibration of ${averageNumber} suggests themes of ${this.getNumericalTheme(averageNumber)}. `

    if (patterns.elementalPatterns.elementalHarmonies.length > 0) {
      analysis += `Elemental harmonies create supportive energy flows. `
    }

    if (patterns.elementalPatterns.elementalConflicts.length > 0) {
      analysis += `Some elemental tensions require conscious balancing. `
    }

    return analysis
  }

  private getNumericalTheme(number: number): string {
    const themes = {
      1: "new beginnings and leadership",
      2: "cooperation and balance",
      3: "creative expression",
      4: "stability and foundation",
      5: "change and freedom",
      6: "nurturing and responsibility",
      7: "spiritual seeking",
      8: "material mastery",
      9: "completion and wisdom",
    }

    return themes[number as keyof typeof themes] || "personal transformation"
  }
}
