import type { ElementalCard } from "./card-data"
import type { PatternAnalysis, QuerentData } from "./pattern-analyzer"
import { ElementalPatternAnalyzer } from "./pattern-analyzer"

export interface ElementalReading {
  querent: QuerentData
  cards: ElementalCard[]
  patterns: PatternAnalysis
  interpretation: {
    summaryInsight: string
    numerologyInterpretation: string
    astrologyInfluence: string
    cardSpreadAnalysis: string
    elementalGuidance: string
    personalizedRecommendations: string[]
    timingConsiderations: string
    followUpQuestions: string[]
  }
  metadata: {
    readingDate: Date
    readingId: string
    confidenceLevel: number
    significanceRating: number
  }
}

export class ElementalReadingGenerator {
  private cards: ElementalCard[]
  private querent: QuerentData
  private analyzer: ElementalPatternAnalyzer

  constructor(cards: ElementalCard[], querent: QuerentData) {
    this.cards = cards
    this.querent = querent
    this.analyzer = new ElementalPatternAnalyzer(cards, querent)
  }

  public generateReading(): ElementalReading {
    const patterns = this.analyzer.analyzePatterns()

    return {
      querent: this.querent,
      cards: this.cards,
      patterns,
      interpretation: this.generateInterpretation(patterns),
      metadata: {
        readingDate: new Date(),
        readingId: this.generateReadingId(),
        confidenceLevel: this.calculateConfidenceLevel(patterns),
        significanceRating: this.calculateSignificanceRating(patterns),
      },
    }
  }

  private generateInterpretation(patterns: PatternAnalysis) {
    return {
      summaryInsight: this.generateSummaryInsight(patterns),
      numerologyInterpretation: this.generateNumerologyInterpretation(patterns),
      astrologyInfluence: this.generateAstrologyInfluence(patterns),
      cardSpreadAnalysis: this.generateCardSpreadAnalysis(patterns),
      elementalGuidance: this.generateElementalGuidance(patterns),
      personalizedRecommendations: this.generatePersonalizedRecommendations(patterns),
      timingConsiderations: this.generateTimingConsiderations(patterns),
      followUpQuestions: this.generateFollowUpQuestions(patterns),
    }
  }

  private generateSummaryInsight(patterns: PatternAnalysis): string {
    const dominantElement = patterns.elementalPatterns.dominantElements[0]
    const numericalTheme = this.getNumericalTheme(patterns.numericalPatterns)
    const overallEnergy = this.getOverallEnergy(patterns)

    return `Your reading reveals a powerful ${dominantElement} energy signature with ${numericalTheme} influences. ${overallEnergy} This combination suggests a time of ${this.getTimeQuality(patterns)} where your ${this.getPersonalStrength(patterns)} will be particularly important for navigating the path ahead.`
  }

  private generateNumerologyInterpretation(patterns: PatternAnalysis): string {
    let interpretation = `Your Life Path Number ${this.querent.lifePathNumber} resonates strongly with the numerical patterns in your cards. `

    if (patterns.numericalPatterns.masterNumbers.length > 0) {
      interpretation += `The presence of Master Numbers (${patterns.numericalPatterns.masterNumbers.join(", ")}) indicates heightened spiritual significance and potential for profound transformation. `
    }

    if (patterns.synchronicities.birthdateSynchronicities.length > 0) {
      interpretation += `Remarkable synchronicities appear with your birth data: ${patterns.synchronicities.birthdateSynchronicities.join(", ")}. `
    }

    const averageReduction = Math.round(patterns.numericalPatterns.averageValue)
    interpretation += `The average numerical vibration of ${averageReduction} suggests ${this.getNumericalMeaning(averageReduction)} as a central theme in your current journey.`

    return interpretation
  }

  private generateAstrologyInfluence(patterns: PatternAnalysis): string {
    let interpretation = `Your ${this.querent.sunSign} Sun sign harmonizes with the astrological influences present in your cards. `

    const dominantPlanets = Object.entries(patterns.astrologicalPatterns.planetaryInfluences)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([planet]) => planet)

    if (dominantPlanets.length > 0) {
      interpretation += `${dominantPlanets.join(" and ")} energies are particularly strong, suggesting ${this.getPlanetaryInfluence(dominantPlanets)}. `
    }

    if (patterns.astrologicalPatterns.planetaryAspects.length > 0) {
      interpretation += `${patterns.astrologicalPatterns.planetaryAspects.join(" ")} `
    }

    return interpretation
  }

  private generateCardSpreadAnalysis(patterns: PatternAnalysis): string {
    let analysis = "## Individual Card Analysis\n\n"

    this.cards.forEach((card, index) => {
      analysis += `**Card ${index + 1}: ${card.suit} ${card.suitIndex} (${card.element})**\n`
      analysis += `*Numbers: ${card.firstEndNumber} | ${card.secondEndNumber}*\n`
      analysis += `*Sacred Geometry: ${card.sacredGeometry}*\n`
      analysis += `*Planetary Influence: ${card.planetaryInfluence} in ${card.astrologicalSign}*\n\n`

      analysis += `${card.meaning}\n\n`

      analysis += `**Elemental Associations:** ${this.formatElementalAssociations(card.elementalAssociations)}\n`
      analysis += `**Keywords:** ${card.keywords.join(", ")}\n`
      analysis += `**Numerological Significance:** ${card.numerologicalSignificance}\n\n`

      analysis += "---\n\n"
    })

    analysis += "## Pattern Connections\n\n"

    if (patterns.suitPatterns.dominantSuits.length > 0) {
      analysis += `**Suit Emphasis:** The dominance of ${patterns.suitPatterns.dominantSuits.join(" and ")} suits indicates ${this.getSuitMeaning(patterns.suitPatterns.dominantSuits)}.\n\n`
    }

    if (patterns.elementalPatterns.elementalHarmonies.length > 0) {
      analysis += `**Elemental Harmonies:** ${patterns.elementalPatterns.elementalHarmonies.join(" ")}\n\n`
    }

    if (patterns.elementalPatterns.elementalConflicts.length > 0) {
      analysis += `**Elemental Tensions:** ${patterns.elementalPatterns.elementalConflicts.join(" ")}\n\n`
    }

    return analysis
  }

  private generateElementalGuidance(patterns: PatternAnalysis): string {
    const dominantElements = patterns.elementalPatterns.dominantElements
    const missingElements = patterns.elementalPatterns.missingElements

    let guidance = `Your reading is dominated by ${dominantElements.join(" and ")} energy, which suggests ${this.getElementalAdvice(dominantElements)}. `

    if (missingElements.length > 0) {
      guidance += `To achieve greater balance, consider consciously incorporating ${missingElements.join(" and ")} qualities into your approach: ${this.getMissingElementAdvice(missingElements)}. `
    }

    guidance += this.getElementalPractices(dominantElements)

    return guidance
  }

  private generatePersonalizedRecommendations(patterns: PatternAnalysis): string[] {
    const recommendations: string[] = []

    // Based on dominant elements
    const dominantElement = patterns.elementalPatterns.dominantElements[0]
    recommendations.push(this.getElementalRecommendation(dominantElement))

    // Based on numerological patterns
    if (patterns.numericalPatterns.masterNumbers.length > 0) {
      recommendations.push("Engage in spiritual practices that help you integrate and ground higher consciousness")
    }

    // Based on astrological patterns
    const dominantPlanet = Object.entries(patterns.astrologicalPatterns.planetaryInfluences).sort(
      ([, a], [, b]) => b - a,
    )[0]?.[0]

    if (dominantPlanet) {
      recommendations.push(this.getPlanetaryRecommendation(dominantPlanet))
    }

    // Based on synchronicities
    if (patterns.synchronicities.birthdateSynchronicities.length > 0) {
      recommendations.push("Pay special attention to recurring numbers and dates in your daily life")
    }

    // Based on geometric patterns
    if (patterns.geometricPatterns.geometryTypes.includes("Merkaba")) {
      recommendations.push("Practice meditation techniques that focus on light body activation and spiritual ascension")
    }

    return recommendations
  }

  private generateTimingConsiderations(patterns: PatternAnalysis): string {
    let timing = "Based on the numerical and astrological patterns in your reading, "

    const averageNumber = Math.round(patterns.numericalPatterns.averageValue)
    timing += `the energy cycle suggests ${this.getTimingFromNumber(averageNumber)}. `

    if (patterns.synchronicities.timingSynchronicities.length > 0) {
      timing += `Current timing synchronicities (${patterns.synchronicities.timingSynchronicities.join(", ")}) indicate this is a particularly significant moment for your question. `
    }

    const dominantPlanet = Object.entries(patterns.astrologicalPatterns.planetaryInfluences).sort(
      ([, a], [, b]) => b - a,
    )[0]?.[0]

    if (dominantPlanet) {
      timing += this.getPlanetaryTiming(dominantPlanet)
    }

    return timing
  }

  private generateFollowUpQuestions(patterns: PatternAnalysis): string[] {
    const questions: string[] = []

    // Based on dominant elements
    const dominantElement = patterns.elementalPatterns.dominantElements[0]
    questions.push(this.getElementalQuestion(dominantElement))

    // Based on missing elements
    if (patterns.elementalPatterns.missingElements.length > 0) {
      questions.push(
        `How can you better integrate ${patterns.elementalPatterns.missingElements[0]} energy into your current situation?`,
      )
    }

    // Based on synchronicities
    if (patterns.synchronicities.cardNumberSynchronicities.length > 0) {
      questions.push("What personal significance do the recurring numbers in your reading hold for you?")
    }

    // Based on suit patterns
    if (patterns.suitPatterns.dominantSuits.length === 1) {
      questions.push(
        `How does the ${patterns.suitPatterns.dominantSuits[0]} energy relate to your current life circumstances?`,
      )
    }

    return questions
  }

  // Helper methods for generating content
  private getNumericalTheme(numericalPatterns: any): string {
    if (numericalPatterns.masterNumbers.length > 0) return "master number"
    if (numericalPatterns.sequences.length > 0) return "sequential"
    if (numericalPatterns.repeatingNumbers.length > 0) return "repetitive"
    return "balanced numerical"
  }

  private getOverallEnergy(patterns: PatternAnalysis): string {
    const elementCount = Object.keys(patterns.elementalPatterns.elementalBalance).length
    if (elementCount === 1) return "This creates a focused, concentrated energy field."
    if (elementCount >= 4) return "This creates a complex, multi-dimensional energy matrix."
    return "This creates a dynamic interplay of complementary forces."
  }

  private getTimeQuality(patterns: PatternAnalysis): string {
    const dominantElement = patterns.elementalPatterns.dominantElements[0]
    switch (dominantElement) {
      case "fire":
        return "dynamic action and creative transformation"
      case "water":
        return "emotional depth and intuitive flow"
      case "air":
        return "mental clarity and communicative breakthrough"
      case "earth":
        return "practical manifestation and stable growth"
      case "spirit":
        return "spiritual awakening and consciousness expansion"
      default:
        return "balanced integration and harmonious development"
    }
  }

  private getPersonalStrength(patterns: PatternAnalysis): string {
    const lifePathMeaning = {
      1: "leadership and independence",
      2: "cooperation and sensitivity",
      3: "creativity and communication",
      4: "stability and practical wisdom",
      5: "adaptability and freedom",
      6: "nurturing and responsibility",
      7: "spiritual insight and analysis",
      8: "material mastery and power",
      9: "compassion and universal understanding",
    }

    return lifePathMeaning[this.querent.lifePathNumber as keyof typeof lifePathMeaning] || "unique personal gifts"
  }

  private getNumericalMeaning(number: number): string {
    const meanings = {
      1: "new beginnings and leadership",
      2: "cooperation and balance",
      3: "creative expression and communication",
      4: "stability and foundation building",
      5: "change and freedom",
      6: "nurturing and responsibility",
      7: "spiritual seeking and inner wisdom",
      8: "material mastery and achievement",
      9: "completion and universal service",
    }

    return meanings[number as keyof typeof meanings] || "personal transformation"
  }

  private getPlanetaryInfluence(planets: string[]): string {
    const influences: Record<string, string> = {
      Sun: "enhanced vitality, leadership, and self-expression",
      Moon: "heightened intuition, emotional awareness, and receptivity",
      Mercury: "improved communication, mental agility, and learning",
      Venus: "increased harmony, beauty, and relationship focus",
      Mars: "amplified energy, courage, and assertive action",
      Jupiter: "expanded wisdom, growth, and philosophical understanding",
      Saturn: "structured discipline, responsibility, and long-term planning",
      Uranus: "innovative breakthroughs, freedom, and revolutionary change",
      Neptune: "spiritual inspiration, intuition, and mystical connection",
      Pluto: "deep transformation, regeneration, and powerful change",
    }

    return planets.map((planet) => influences[planet] || "unique planetary influence").join(" combined with ")
  }

  private formatElementalAssociations(associations: Record<string, number>): string {
    return Object.entries(associations)
      .map(([element, strength]) => `${element}: ${strength}/5`)
      .join(", ")
  }

  private getSuitMeaning(suits: string[]): string {
    const meanings: Record<string, string> = {
      Flame: "passionate creativity and transformative action",
      Flow: "emotional depth and intuitive wisdom",
      Wind: "mental clarity and communicative power",
      Stone: "practical manifestation and stable foundation",
      Light: "spiritual illumination and consciousness expansion",
    }

    return suits.map((suit) => meanings[suit] || "unique energy").join(" and ")
  }

  private getElementalAdvice(elements: string[]): string {
    const advice: Record<string, string> = {
      fire: "focus on creative action, passionate pursuit of goals, and transformative initiatives",
      water: "trust your intuition, honor your emotions, and flow with natural rhythms",
      air: "prioritize clear communication, mental development, and intellectual pursuits",
      earth: "ground your energy in practical action, build stable foundations, and manifest tangibly",
      spirit: "connect with higher consciousness, integrate spiritual practices, and serve the greater good",
    }

    return elements.map((element) => advice[element] || "balanced development").join(" while also ")
  }

  private getMissingElementAdvice(elements: string[]): string {
    const advice: Record<string, string> = {
      fire: "add more passion, creativity, and dynamic action to your approach",
      water: "incorporate greater emotional awareness, intuition, and receptivity",
      air: "develop clearer communication, mental analysis, and intellectual understanding",
      earth: "ground your ideas in practical action and tangible manifestation",
      spirit: "connect with higher purpose, spiritual practices, and transcendent meaning",
    }

    return elements.map((element) => advice[element] || "balanced integration").join("; ")
  }

  private getElementalPractices(elements: string[]): string {
    const practices: Record<string, string> = {
      fire: "Consider practices like dynamic meditation, creative visualization, or energetic movement.",
      water: "Consider practices like emotional journaling, intuitive meditation, or water-based rituals.",
      air: "Consider practices like breathwork, intellectual study, or communication exercises.",
      earth: "Consider practices like grounding meditation, nature connection, or practical skill development.",
      spirit: "Consider practices like spiritual study, consciousness expansion, or service to others.",
    }

    return elements.map((element) => practices[element] || "balanced spiritual practices").join(" ")
  }

  private getElementalRecommendation(element: string): string {
    const recommendations: Record<string, string> = {
      fire: "Channel your creative fire into a specific project or goal that ignites your passion",
      water: "Create space for emotional processing and trust the wisdom of your intuitive insights",
      air: "Focus on clear communication and intellectual development to advance your objectives",
      earth: "Take practical, concrete steps toward manifesting your vision in the physical world",
      spirit: "Deepen your spiritual practice and align your actions with your highest values",
    }

    return recommendations[element] || "Maintain balance across all elemental aspects of your being"
  }

  private getPlanetaryRecommendation(planet: string): string {
    const recommendations: Record<string, string> = {
      Sun: "Step into leadership roles and express your authentic self with confidence",
      Moon: "Honor your emotional cycles and trust your intuitive guidance",
      Mercury: "Focus on learning, communication, and intellectual development",
      Venus: "Cultivate beauty, harmony, and meaningful relationships in your life",
      Mars: "Take decisive action and assert yourself courageously toward your goals",
      Jupiter: "Expand your horizons through education, travel, or philosophical exploration",
      Saturn: "Embrace discipline, structure, and long-term commitment to your objectives",
      Uranus: "Welcome innovative changes and express your unique individuality",
      Neptune: "Develop your spiritual and artistic sensibilities through creative practice",
      Pluto: "Embrace deep transformation and release what no longer serves your growth",
    }

    return recommendations[planet] || "Work with the unique planetary energies present in your reading"
  }

  private getTimingFromNumber(number: number): string {
    const timing: Record<number, string> = {
      1: "a time for new beginnings and initiating action",
      2: "a period requiring patience, cooperation, and careful consideration",
      3: "an optimal time for creative expression and communication",
      4: "a phase for building foundations and establishing stability",
      5: "a dynamic period of change, freedom, and new experiences",
      6: "a time for nurturing, responsibility, and harmonious relationships",
      7: "a contemplative period for inner development and spiritual growth",
      8: "a powerful time for achievement, material success, and recognition",
      9: "a completion phase requiring wisdom, compassion, and service to others",
    }

    return timing[number] || "a balanced period of integrated development"
  }

  private getPlanetaryTiming(planet: string): string {
    const timing: Record<string, string> = {
      Sun: "This is an excellent time for leadership initiatives and self-expression.",
      Moon: "Pay attention to emotional cycles and intuitive timing over the next lunar month.",
      Mercury: "Communication and learning opportunities will be particularly favorable in the coming weeks.",
      Venus: "Relationship and creative endeavors are especially favored during this period.",
      Mars: "Take action decisively, as your energy and courage are at their peak.",
      Jupiter: "This is an expansive time for growth, learning, and new opportunities.",
      Saturn: "Focus on long-term goals and disciplined effort for lasting results.",
      Uranus: "Expect unexpected opportunities and be ready to embrace innovative changes.",
      Neptune: "Trust your intuition and allow spiritual insights to guide your timing.",
      Pluto: "Deep transformation is occurring; allow natural cycles of death and rebirth.",
    }

    return timing[planet] || "Work with the natural rhythms indicated by your planetary influences."
  }

  private getElementalQuestion(element: string): string {
    const questions: Record<string, string> = {
      fire: "What creative project or passionate pursuit is calling for your immediate attention?",
      water: "What emotions or intuitive insights are you being asked to honor and integrate?",
      air: "What important conversation or communication needs to take place in your life?",
      earth: "What practical steps can you take to manifest your vision in the physical world?",
      spirit: "How can you better align your daily actions with your highest spiritual values?",
    }

    return questions[element] || "What aspect of your current situation requires the most attention and focus?"
  }

  private generateReadingId(): string {
    return `elemental-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private calculateConfidenceLevel(patterns: PatternAnalysis): number {
    let confidence = 0.5 // Base confidence

    // Increase confidence for strong patterns
    if (patterns.numericalPatterns.masterNumbers.length > 0) confidence += 0.2
    if (patterns.synchronicities.birthdateSynchronicities.length > 0) confidence += 0.15
    if (patterns.elementalPatterns.dominantElements.length === 1) confidence += 0.1
    if (patterns.numericalPatterns.sequences.length > 0) confidence += 0.1
    if (patterns.synchronicities.timingSynchronicities.length > 0) confidence += 0.05

    return Math.min(confidence, 1.0)
  }

  private calculateSignificanceRating(patterns: PatternAnalysis): number {
    let significance = 1 // Base significance

    // Increase significance for meaningful patterns
    if (patterns.numericalPatterns.masterNumbers.length > 0) significance += 2
    if (patterns.synchronicities.birthdateSynchronicities.length > 1) significance += 2
    if (patterns.synchronicities.nameNumerologySynchronicities.length > 0) significance += 1
    if (patterns.elementalPatterns.elementalHarmonies.length > 2) significance += 1
    if (patterns.astrologicalPatterns.planetaryAspects.length > 0) significance += 1

    return Math.min(significance, 5)
  }
}
