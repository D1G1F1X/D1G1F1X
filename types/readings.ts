import type { CardProps } from "./cards"

export interface ReadingRequest {
  cards: CardProps[]
  userName?: string
  birthDate?: Date | string
  birthPlace?: string
  lifePathNumber?: number
  question?: string
  readingType: string
  additionalContext?: string
}

export interface ReadingResponse {
  reading: string
  error?: string
}

export interface ReadingPosition {
  name: string
  description: string
}

export interface ReadingType {
  id: string
  name: string
  description: string
  positions: ReadingPosition[]
  cardCount: number
}

export interface ReadingData {
  id: string
  cards: string[]
  timestamp: string
  content: string
  question?: string
}

export interface SavedReading extends ReadingData {
  userId?: string
  title?: string
  notes?: string
}

export const readingTypes: ReadingType[] = [
  {
    id: "singleCard",
    name: "Single Card",
    description: "A simple draw for daily guidance or a specific question.",
    positions: [
      {
        name: "Focus",
        description: "The energy or wisdom offered for your consideration",
      },
    ],
    cardCount: 1,
  },
  {
    id: "threeCardPPF",
    name: "Past-Present-Future",
    description: "Reveals past influences, present situation, and future potential.",
    positions: [
      {
        name: "Past",
        description: "Influences from the past affecting your current situation",
      },
      {
        name: "Present",
        description: "Current energies and immediate concerns",
      },
      {
        name: "Future",
        description: "Potential outcomes and developing energies",
      },
    ],
    cardCount: 3,
  },
  {
    id: "threeCardMBS",
    name: "Mind-Body-Spirit",
    description: "Reveals the mental, physical, and spiritual aspects of your situation.",
    positions: [
      {
        name: "Mind",
        description: "Thoughts, beliefs, and mental approach to the situation",
      },
      {
        name: "Body",
        description: "Physical aspects, practical matters, and tangible circumstances",
      },
      {
        name: "Spirit",
        description: "Spiritual lessons, higher purpose, and soul growth opportunities",
      },
    ],
    cardCount: 3,
  },
  {
    id: "fiveCardCross",
    name: "Five Card Cross",
    description: "Provides a comprehensive view of your situation from multiple perspectives.",
    positions: [
      {
        name: "Center",
        description: "The core issue or central theme",
      },
      {
        name: "Above",
        description: "Conscious thoughts, aspirations, or what you are aware of",
      },
      {
        name: "Below",
        description: "Subconscious influences, hidden factors, or what you may not be aware of",
      },
      {
        name: "Left",
        description: "Past influences or energies that are fading",
      },
      {
        name: "Right",
        description: "Future influences or energies that are developing",
      },
    ],
    cardCount: 5,
  },
  {
    id: "fiveElements",
    name: "Five Elements",
    description: "Reveals how the five elements influence your situation.",
    positions: [
      {
        name: "Spirit",
        description: "The spiritual essence or higher purpose of the situation",
      },
      {
        name: "Fire",
        description: "Passion, energy, creativity, and transformation aspects",
      },
      {
        name: "Water",
        description: "Emotional aspects, relationships, intuition, and flow",
      },
      {
        name: "Air",
        description: "Mental aspects, communication, ideas, and clarity",
      },
      {
        name: "Earth",
        description: "Practical aspects, manifestation, resources, and grounding",
      },
    ],
    cardCount: 5,
  },
  {
    id: "celticCross",
    name: "Celtic Cross",
    description: "A comprehensive spread that examines multiple aspects of your question.",
    positions: [
      {
        name: "Present",
        description: "The central issue or present situation",
      },
      {
        name: "Challenge",
        description: "The immediate challenge or crossing influence",
      },
      {
        name: "Foundation",
        description: "The foundation or root of the matter",
      },
      {
        name: "Recent Past",
        description: "Recent events or influences that are still relevant",
      },
      {
        name: "Potential",
        description: "Potential outcome or what could manifest",
      },
      {
        name: "Near Future",
        description: "Upcoming influences or what's beginning to unfold",
      },
      {
        name: "Self",
        description: "Your attitude or approach to the situation",
      },
      {
        name: "Environment",
        description: "External influences, other people's attitudes",
      },
      {
        name: "Hopes/Fears",
        description: "Your hopes and/or fears about the situation",
      },
      {
        name: "Outcome",
        description: "The likely outcome if the current course is maintained",
      },
    ],
    cardCount: 10,
  },
  {
    id: "relationship",
    name: "Relationship Reading",
    description: "Explores the dynamics and potential of a relationship.",
    positions: [
      {
        name: "Seeker",
        description: "Your energy in the relationship",
      },
      {
        name: "Partner",
        description: "The other person's energy in the relationship",
      },
      {
        name: "Past Foundation",
        description: "The past foundation of the relationship",
      },
      {
        name: "Present State",
        description: "The present state of the relationship",
      },
      {
        name: "Challenges",
        description: "Challenges or obstacles in the relationship",
      },
      {
        name: "Strengths",
        description: "Strengths or opportunities in the relationship",
      },
      {
        name: "Lessons",
        description: "Lessons to be learned from this relationship",
      },
      {
        name: "Future Potential",
        description: "Potential future of the relationship",
      },
    ],
    cardCount: 8,
  },
  {
    id: "careerPath",
    name: "Career Path",
    description: "Guidance for your professional life and career decisions.",
    positions: [
      {
        name: "Current Situation",
        description: "Your current career situation",
      },
      {
        name: "Talents/Strengths",
        description: "Your talents and strengths",
      },
      {
        name: "Challenges",
        description: "Challenges or obstacles to overcome",
      },
      {
        name: "Hidden Opportunities",
        description: "Hidden opportunities you may not see",
      },
      {
        name: "Action Steps",
        description: "Action steps to move forward",
      },
      {
        name: "Short-term Outlook",
        description: "Short-term career outlook (3-6 months)",
      },
      {
        name: "Long-term Potential",
        description: "Long-term career potential (1-2 years)",
      },
    ],
    cardCount: 7,
  },
  {
    id: "yearAhead",
    name: "Year Ahead",
    description: "A forecast for the coming year, divided by seasons or quarters.",
    positions: [
      {
        name: "Overall Theme",
        description: "Overall theme or energy for the coming year",
      },
      {
        name: "Winter/Q1",
        description: "Winter season (or first quarter)",
      },
      {
        name: "Spring/Q2",
        description: "Spring season (or second quarter)",
      },
      {
        name: "Summer/Q3",
        description: "Summer season (or third quarter)",
      },
      {
        name: "Fall/Q4",
        description: "Fall season (or fourth quarter)",
      },
      {
        name: "Challenges",
        description: "Challenges to be aware of this year",
      },
      {
        name: "Opportunities",
        description: "Opportunities to embrace this year",
      },
      {
        name: "Spiritual Growth",
        description: "Spiritual growth potential this year",
      },
      {
        name: "Practical Advice",
        description: "Practical advice for navigating the year ahead",
      },
    ],
    cardCount: 9,
  },
  {
    id: "decisionMaking",
    name: "Decision Making",
    description: "Helps clarify options and factors in an important decision.",
    positions: [
      {
        name: "Current Situation",
        description: "The current situation requiring a decision",
      },
      {
        name: "Option A",
        description: "Option A - potential outcome",
      },
      {
        name: "Option B",
        description: "Option B - potential outcome",
      },
      {
        name: "Hidden Factors",
        description: "Factors to consider that may not be obvious",
      },
      {
        name: "Fears/Concerns",
        description: "Fears or concerns influencing the decision",
      },
      {
        name: "Hopes/Desires",
        description: "Hopes or desires influencing the decision",
      },
      {
        name: "Advice",
        description: "Advice for making the best decision",
      },
      {
        name: "Long-term Impact",
        description: "Potential long-term impact of this decision",
      },
    ],
    cardCount: 8,
  },
]

export interface ElementalPower {
  name: string
  description: string
}

export interface PlanetaryRuler {
  name: string
  description: string
}

export interface AstrologicalSign {
  name: string
  description: string
}

export interface NumberData {
  number: number
  title: string
  description: string
  keywords: string[]
  numerologyMeaning: string
  elementalPower: ElementalPower
  planetaryRuler: PlanetaryRuler
  astrologicalSign: AstrologicalSign
  visualSymbolism: string
  pairedWith: number
  pairName: string
  pairDescription: string
}

// Add this interface if it's not already present or defined elsewhere
export interface NumoNumberData {
  number: number
  title: string
  description: string
  keywords: string[]
  numerologyMeaning: string
  planetaryRulerName: string
  planetaryRulerDescription: string
  astrologicalSignName: string
  astrologicalSignDescription: string
  individualElementalPowerName: string
  individualElementalPowerDescription: string
  numoPairedWith: number
  numoPairName: string
  numoPairVisualSymbolism: string
  numoPairElementalPower: string
  numoPairGiftDescription: string
  mysteryDocPairRole?: string
  mysteryDocVisualSymbolism?: string
  mysteryDocMetaphysicalPrinciple?: string
  mysteryDocPairedWith?: number
  mysteryDocPairDescription?: string
  shapeType:
    | "sphere"
    | "line"
    | "mirroredCurve"
    | "halfEight"
    | "cube"
    | "dodecahedron"
    | "octahedron"
    | "torusKnotComplex"
    | "torusKnotSimple"
    | "spiralIn"
    | "spiralOut"
}
