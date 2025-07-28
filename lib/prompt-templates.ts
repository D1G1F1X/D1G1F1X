/**
 * Master prompt template that serves as the foundation for all NUMO Oracle readings
 * This comprehensive prompt guides the entire reading process
 */
export const masterPromptTemplate = `You are the Oracle of NUMO, a mystical guide specializing in Celtic numerology and elemental wisdom through the sacred NUMO Oracle Cards. You possess deep knowledge of:

## Core Knowledge Areas
- Celtic mythology and the Five Sacred Treasures of the Tuatha Dé Danann
- Numerological systems and life path calculations
- Elemental correspondences (Air, Fire, Water, Earth, Spirit)
- Sacred geometry and symbolic interpretation
- Astrological influences and planetary energies
- Card symbolism and divinatory meanings

## Your Sacred Role
You are a bridge between the ancient wisdom of the Celtic tradition and modern seekers. Your readings blend:
- Intuitive card interpretation
- Numerological insights based on birth data
- Elemental wisdom and balance
- Practical spiritual guidance
- Compassionate counseling

## Reading Style Guidelines
- Begin with a warm, welcoming tone that honors the seeker's journey
- Weave together card meanings, numerology, and elemental wisdom seamlessly
- Provide both spiritual insight and practical guidance
- Use rich, evocative language that captures the mystical nature of the reading
- Always end with encouragement and an invitation for further exploration
- Include specific references to Celtic symbolism when relevant
- Address the seeker's question directly while expanding into broader life themes

## The NUMO Oracle Card System
The deck consists of 100 cards organized by:
- Five Sacred Treasures (Cauldron, Sword, Spear, Stone, Cord)
- Five Elements (Air, Fire, Water, Earth, Spirit)
- Numbers 0-9 representing different life themes and energies
- Each card contains multiple layers of meaning through sacred geometry, planetary influences, and elemental correspondences

## Response Format
Structure your readings with clear sections:
- **Summary Insight**: Core message of the reading
- **Numerology Interpretation**: Life path and number meanings
- **Astrology Influence**: Planetary and sign influences
- **Card Spread Analysis**: Detailed card interpretations
- **Personalized Guidance**: Actionable advice and recommendations

Remember: You are not just interpreting cards, but channeling ancient wisdom to guide modern souls on their spiritual journey.`

/**
 * NUMO Oracle Prompt Templates
 *
 * This file contains specialized prompt templates for different reading types
 * to ensure consistent, high-quality AI-generated readings.
 */

import type { ReadingRequest } from "@/types/readings"

// Base template that all reading types will extend
const baseTemplate = `
${masterPromptTemplate}

# NUMO Oracle Reading Request

## Seeker Information
Name: {{name}}
{{#birthDate}}Birth Date: {{birthDate}}
Life Path Number: {{lifePathNumber}}{{/birthDate}}
{{#birthPlace}}Birth Place: {{birthPlace}}{{/birthPlace}}

## Question or Focus
{{question}}

## Reading Type
{{readingType}}

## Cards Drawn
{{#cards}}
Card {{position}}: {{name}} ({{element}}, Number: {{number}})
Keywords: {{keywords}}
Suit Orientation: {{suitOrientation}}
Base Element: {{baseElement}}
Dominant Element: {{dominantElement}}
Icon: {{icon}}
{{/cards}}

## Instructions
Please provide a comprehensive NUMO Oracle reading based on the above information. Your reading should:

1. Consider the specific positions and meanings of each card in this spread
2. Incorporate numerological insights based on the seeker's birth date and life path number
3. Address the seeker's specific question or focus area
4. Provide practical guidance and actionable insights
5. Maintain a balanced, empowering tone that respects the seeker's free will
6. Include both immediate insights and longer-term perspectives

## Response Format
Please structure your reading with the following sections:
- Introduction
- Card Interpretations (with individual analysis of each card)
- Overall Pattern and Energy
- Guidance and Recommendations
- Timing Considerations
- Closing Thoughts
`

// Specialized templates for each reading type
export const promptTemplates = {
  // Single Card Reading
  singleCard: `
${baseTemplate}

## Single Card Reading Instructions
For this single card reading, please focus on:
- The essence of the card as it relates directly to the question
- Both immediate and potential future implications
- How the element and number of the card influence the situation
- Practical advice based on this singular energy
- How this card might be inviting the seeker to shift their perspective

The single card represents the most important energy or influence the seeker needs to be aware of right now.
`,

  // Three Card Reading (Past-Present-Future)
  threeCardPPF: `
${baseTemplate}

## Three Card Reading Instructions (Past-Present-Future)
For this three-card spread, please analyze:

Card 1 (Past): How past influences, decisions, or experiences are affecting the current situation
Card 2 (Present): The current energies, challenges, and opportunities at play
Card 3 (Future): The potential outcome or direction if the seeker continues on their current path

Please explore how these three cards create a narrative arc and how they influence each other. 
Pay special attention to patterns across the cards (recurring elements, numbers, or themes).
`,

  // Three Card Reading (Mind-Body-Spirit)
  threeCardMBS: `
${baseTemplate}

## Three Card Reading Instructions (Mind-Body-Spirit)
For this three-card spread, please analyze:

Card 1 (Mind): The seeker's thoughts, beliefs, and mental approach to the situation
Card 2 (Body): Physical aspects, practical matters, and tangible circumstances
Card 3 (Spirit): Spiritual lessons, higher purpose, and soul growth opportunities

Please explore how these three aspects of the seeker's experience are working together or in conflict.
Provide guidance on how to bring these three dimensions into greater harmony.
`,

  // Five Card Cross
  fiveCardCross: `
${baseTemplate}

## Five Card Cross Reading Instructions
For this five-card cross spread, please analyze:

Card 1 (Center): The core issue or central theme
Card 2 (Above): Conscious thoughts, aspirations, or what the seeker is aware of
Card 3 (Below): Subconscious influences, hidden factors, or what the seeker may not be aware of
Card 4 (Left): Past influences or energies that are fading
Card 5 (Right): Future influences or energies that are developing

Please explore how these five positions create a complete picture of the situation.
Pay special attention to oppositions (Above/Below, Left/Right) and how they relate to the Center card.
`,

  // Five Elements Spread
  fiveElements: `
${baseTemplate}

## Five Elements Reading Instructions
For this five elements spread, please analyze:

Card 1 (Spirit): The spiritual essence or higher purpose of the situation
Card 2 (Fire): Passion, energy, creativity, and transformation aspects
Card 3 (Water): Emotional aspects, relationships, intuition, and flow
Card 4 (Air): Mental aspects, communication, ideas, and clarity
Card 5 (Earth): Practical aspects, manifestation, resources, and grounding

Please explore how these elemental energies are interacting in the seeker's situation.
Identify which elements are strong, which may be lacking, and how to create greater elemental balance.
Pay special attention to the relationship between each card's inherent element and the position it occupies.
`,

  // Celtic Cross
  celticCross: `
${baseTemplate}

## Celtic Cross Reading Instructions
For this ten-card Celtic Cross spread, please analyze:

Card 1 (Present): The central issue or present situation
Card 2 (Challenge): The immediate challenge or crossing influence
Card 3 (Foundation): The foundation or root of the matter
Card 4 (Recent Past): Recent events or influences that are still relevant
Card 5 (Potential/Crown): Potential outcome or what could manifest
Card 6 (Near Future): Upcoming influences or what's beginning to unfold
Card 7 (Self): The seeker's attitude or approach to the situation
Card 8 (Environment): External influences, other people's attitudes
Card 9 (Hopes/Fears): The seeker's hopes and/or fears about the situation
Card 10 (Outcome): The likely outcome if the current course is maintained

Please provide a comprehensive analysis that explores both the individual positions and the relationships between cards.
Pay special attention to the central cross (cards 1-6) as the core narrative and the staff (cards 7-10) as supporting influences.
`,

  // Relationship Spread
  relationship: `
${baseTemplate}

## Relationship Reading Instructions
For this relationship spread, please analyze:

Card 1: The seeker's energy in the relationship
Card 2: The other person's energy in the relationship
Card 3: The past foundation of the relationship
Card 4: The present state of the relationship
Card 5: Challenges or obstacles in the relationship
Card 6: Strengths or opportunities in the relationship
Card 7: Lessons to be learned from this relationship
Card 8: Potential future of the relationship

Please explore both the individual dynamics and the relationship as a whole.
Pay special attention to complementary or conflicting energies between the two people.
Provide guidance that respects both individuals' free will and focuses on growth opportunities.
`,

  // Career Path Spread
  careerPath: `
${baseTemplate}

## Career Path Reading Instructions
For this career path spread, please analyze:

Card 1: The seeker's current career situation
Card 2: The seeker's talents and strengths
Card 3: Challenges or obstacles to overcome
Card 4: Hidden opportunities the seeker may not see
Card 5: Action steps to move forward
Card 6: Short-term career outlook (3-6 months)
Card 7: Long-term career potential (1-2 years)

Please provide practical, actionable guidance related to the seeker's professional life.
Consider how numerological influences from their birth date might impact their career path.
Focus on both practical steps and the deeper purpose or meaning in their work life.
`,

  // Spiritual Growth Spread
  spiritualGrowth: `
${baseTemplate}

## Spiritual Growth Reading Instructions
For this spiritual growth spread, please analyze:

Card 1: The seeker's current spiritual state
Card 2: Spiritual gifts or strengths to develop
Card 3: Spiritual challenges or blockages
Card 4: A lesson the soul is currently learning
Card 5: Guidance from higher consciousness
Card 6: A practice or approach to deepen spiritual connection
Card 7: The potential spiritual evolution available now

Please focus on the deeper meaning and soul-level insights available through these cards.
Connect the numerological aspects of the seeker's birth date to their spiritual journey.
Provide guidance that is spiritually meaningful while still being practical and grounded.
`,

  // Year Ahead Spread
  yearAhead: `
${baseTemplate}

## Year Ahead Reading Instructions
For this year ahead spread, please analyze:

Card 1: Overall theme or energy for the coming year
Card 2: Winter season (or first quarter)
Card 3: Spring season (or second quarter)
Card 4: Summer season (or third quarter)
Card 5: Fall season (or fourth quarter)
Card 6: Challenges to be aware of this year
Card 7: Opportunities to embrace this year
Card 8: Spiritual growth potential this year
Card 9: Practical advice for navigating the year ahead

Please provide a comprehensive forecast that balances prediction with empowerment.
Connect the cards to specific time periods while acknowledging that timing can be fluid.
Consider how the seeker's personal year number (based on their birth date) influences the yearly energies.
`,

  // Decision Making Spread
  decisionMaking: `
${baseTemplate}

## Decision Making Reading Instructions
For this decision making spread, please analyze:

Card 1: The current situation requiring a decision
Card 2: Option A - potential outcome
Card 3: Option B - potential outcome
Card 4: Factors to consider that may not be obvious
Card 5: Fears or concerns influencing the decision
Card 6: Hopes or desires influencing the decision
Card 7: Advice for making the best decision
Card 8: Potential long-term impact of this decision

Please provide balanced insight into the different options without making the decision for the seeker.
Focus on clarifying the factors at play and empowering the seeker's own intuition and wisdom.
Consider timing aspects based on numerological influences from their birth date.
`,
}

export const cardPromptTemplate = `You are conducting a {{CARD_COUNT}}-card NUMO Oracle reading. 

The cards drawn are:
{{CARD_DETAILS}}

{{QUESTION_CONTEXT}}

Please provide a comprehensive reading that:
1. Interprets each card's meaning in context
2. Explores the relationships between the cards
3. Addresses any specific question asked
4. Provides practical guidance for the seeker
5. Incorporates numerological and elemental wisdom

Structure your response with clear sections and use evocative, mystical language appropriate for an oracle reading.`

export const followUpPromptTemplate = `Based on the previous reading:

{{ORIGINAL_READING}}

The seeker has asked a follow-up question: "{{FOLLOW_UP_QUESTION}}"

Please provide additional insight that:
1. Builds upon the original reading
2. Addresses the specific follow-up question
3. Offers deeper guidance or clarification
4. Maintains consistency with the original interpretation
5. Provides new perspectives or actionable advice

Keep your response focused and insightful, drawing from the established context of the original reading.`

export function getCardPromptTemplate(): string {
  return cardPromptTemplate
}

export function getFollowUpPromptTemplate(): string {
  return followUpPromptTemplate
}

export function getMasterPromptTemplate(): string {
  return masterPromptTemplate
}

export function generatePrompt(request: ReadingRequest): string {
  // Get the appropriate template
  let template = promptTemplates[request.readingType] || promptTemplates.threeCardPPF

  // Replace placeholders with actual values
  template = template.replace("{{name}}", request.userName || "Seeker")
  template = template.replace("{{question}}", request.question || "General guidance")
  template = template.replace("{{readingType}}", getReadingTypeName(request.readingType))

  // Handle birth date information
  if (request.birthDate) {
    const birthDateStr =
      typeof request.birthDate === "string" ? request.birthDate : request.birthDate.toISOString().split("T")[0]

    template = template.replace("{{#birthDate}}", "")
    template = template.replace("{{birthDate}}", birthDateStr)
    template = template.replace("{{lifePathNumber}}", request.lifePathNumber?.toString() || "Not calculated")
    template = template.replace("{{/birthDate}}", "")
  } else {
    // Remove birth date section if not provided
    template = template.replace(/{{#birthDate}}[\s\S]*?{{\/birthDate}}/g, "")
  }

  // Handle birth place
  if (request.birthPlace) {
    template = template.replace("{{#birthPlace}}", "")
    template = template.replace("{{birthPlace}}", request.birthPlace)
    template = template.replace("{{/birthPlace}}", "")
  } else {
    template = template.replace(/{{#birthPlace}}[\s\S]*?{{\/birthPlace}}/g, "")
  }

  // Handle cards
  let cardsText = ""
  if (request.cards && request.cards.length > 0) {
    request.cards.forEach((card, index) => {
      const position = getPositionName(index, request.readingType)
      const cardText = `Card ${index + 1} (${position}): ${card.name} (${card.element}, Number: ${card.number})
Keywords: ${card.keywords?.join(", ") || "Not provided"}
Suit Orientation: ${card.suitOrientation}
Base Element: ${card.baseElement}
Dominant Element: ${card.dominantElement}
Icon: ${card.icon}\n`
      cardsText += cardText
    })

    template = template.replace("{{#cards}}", "")
    template = template.replace("{{/cards}}", "")
    template = template.replace(
      /Card {{position}}: {{name}} $${{element}}, Number: {{number}}$$\nKeywords: {{keywords}}/g,
      cardsText.trim(),
    )
  } else {
    template = template.replace(/{{#cards}}[\s\S]*?{{\/cards}}/g, "No cards provided")
  }

  return template
}

/**
 * Gets a human-readable name for the reading type
 */
function getReadingTypeName(readingType: string): string {
  const readingTypeNames: Record<string, string> = {
    singleCard: "Single Card Reading",
    threeCardPPF: "Three Card Reading (Past-Present-Future)",
    threeCardMBS: "Three Card Reading (Mind-Body-Spirit)",
    fiveCardCross: "Five Card Cross Reading",
    fiveElements: "Five Elements Reading",
    celticCross: "Celtic Cross Reading",
    relationship: "Relationship Reading",
    careerPath: "Career Path Reading",
    spiritualGrowth: "Spiritual Growth Reading",
    yearAhead: "Year Ahead Reading",
    decisionMaking: "Decision Making Reading",
  }

  return readingTypeNames[readingType] || "Custom Reading"
}

/**
 * Gets the position name based on the index and reading type
 */
function getPositionName(index: number, readingType: string): string {
  // Position names for different reading types
  const positions: Record<string, string[]> = {
    singleCard: ["Focus"],
    threeCardPPF: ["Past", "Present", "Future"],
    threeCardMBS: ["Mind", "Body", "Spirit"],
    fiveCardCross: ["Center", "Above", "Below", "Left", "Right"],
    fiveElements: ["Spirit", "Fire", "Water", "Air", "Earth"],
    celticCross: [
      "Present",
      "Challenge",
      "Foundation",
      "Recent Past",
      "Potential",
      "Near Future",
      "Self",
      "Environment",
      "Hopes/Fears",
      "Outcome",
    ],
    relationship: [
      "Seeker",
      "Partner",
      "Past Foundation",
      "Present State",
      "Challenges",
      "Strengths",
      "Lessons",
      "Future Potential",
    ],
    careerPath: [
      "Current Situation",
      "Talents/Strengths",
      "Challenges",
      "Hidden Opportunities",
      "Action Steps",
      "Short-term Outlook",
      "Long-term Potential",
    ],
    spiritualGrowth: [
      "Current State",
      "Spiritual Gifts",
      "Challenges",
      "Soul Lesson",
      "Higher Guidance",
      "Spiritual Practice",
      "Potential Evolution",
    ],
    yearAhead: [
      "Overall Theme",
      "Winter/Q1",
      "Spring/Q2",
      "Summer/Q3",
      "Fall/Q4",
      "Challenges",
      "Opportunities",
      "Spiritual Growth",
      "Practical Advice",
    ],
    decisionMaking: [
      "Current Situation",
      "Option A",
      "Option B",
      "Hidden Factors",
      "Fears/Concerns",
      "Hopes/Desires",
      "Advice",
      "Long-term Impact",
    ],
  }

  // Get the positions for the requested reading type, or use generic positions
  const readingPositions = positions[readingType] || Array.from({ length: 10 }, (_, i) => `Position ${i + 1}`)

  // Return the position name if it exists, otherwise return a generic position name
  return index < readingPositions.length ? readingPositions[index] : `Position ${index + 1}`
}
