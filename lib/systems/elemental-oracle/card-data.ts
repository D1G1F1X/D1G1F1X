export interface ElementalCard {
  id: string
  suit: string
  suitIndex: number // 1-5 within suit
  iconColor: string
  element: string
  firstEndNumber: number
  secondEndNumber: number
  elementalAssociations: {
    fire: number // 0-5 strength
    water: number
    air: number
    earth: number
    spirit: number
  }
  sacredGeometry: string
  planetaryInfluence: string
  astrologicalSign: string
  keywords: string[]
  meaning: string
  reversedMeaning: string
  numerologicalSignificance: string
}

export const elementalOracleCards: ElementalCard[] = [
  // Fire Suit (Red Icons)
  {
    id: "fire-1",
    suit: "Flame",
    suitIndex: 1,
    iconColor: "red",
    element: "fire",
    firstEndNumber: 1,
    secondEndNumber: 26,
    elementalAssociations: { fire: 5, water: 1, air: 3, earth: 2, spirit: 4 },
    sacredGeometry: "Triangle",
    planetaryInfluence: "Mars",
    astrologicalSign: "Aries",
    keywords: ["initiation", "passion", "energy", "creation", "spark"],
    meaning: "The spark of new beginnings ignites your path forward with passionate energy and creative force.",
    reversedMeaning: "Blocked energy, lack of motivation, or misdirected passion requiring realignment.",
    numerologicalSignificance:
      "1 represents new beginnings and leadership; 26 reduces to 8, indicating material mastery through spiritual fire.",
  },
  {
    id: "fire-2",
    suit: "Flame",
    suitIndex: 2,
    iconColor: "red",
    element: "fire",
    firstEndNumber: 2,
    secondEndNumber: 27,
    elementalAssociations: { fire: 4, water: 2, air: 3, earth: 2, spirit: 4 },
    sacredGeometry: "Vesica Piscis",
    planetaryInfluence: "Sun",
    astrologicalSign: "Leo",
    keywords: ["balance", "partnership", "creative collaboration", "harmony", "duality"],
    meaning: "Creative partnerships and balanced energy create powerful manifestation through cooperative fire.",
    reversedMeaning: "Imbalance in partnerships, creative conflicts, or need for better collaboration.",
    numerologicalSignificance:
      "2 represents partnership and balance; 27 reduces to 9, indicating completion through cooperative creation.",
  },
  {
    id: "fire-3",
    suit: "Flame",
    suitIndex: 3,
    iconColor: "red",
    element: "fire",
    firstEndNumber: 3,
    secondEndNumber: 28,
    elementalAssociations: { fire: 5, water: 1, air: 4, earth: 2, spirit: 3 },
    sacredGeometry: "Triangle within Circle",
    planetaryInfluence: "Jupiter",
    astrologicalSign: "Sagittarius",
    keywords: ["expansion", "growth", "expression", "creativity", "communication"],
    meaning: "Creative expression expands your influence and brings growth through passionate communication.",
    reversedMeaning: "Scattered energy, over-expansion, or need to focus creative efforts more precisely.",
    numerologicalSignificance:
      "3 represents creative expression; 28 reduces to 10/1, indicating completion leading to new creative cycles.",
  },
  {
    id: "fire-4",
    suit: "Flame",
    suitIndex: 4,
    iconColor: "red",
    element: "fire",
    firstEndNumber: 4,
    secondEndNumber: 29,
    elementalAssociations: { fire: 4, water: 2, air: 3, earth: 4, spirit: 2 },
    sacredGeometry: "Square",
    planetaryInfluence: "Saturn",
    astrologicalSign: "Capricorn",
    keywords: ["structure", "discipline", "foundation", "stability", "manifestation"],
    meaning: "Disciplined creative energy builds lasting foundations and manifests dreams into reality.",
    reversedMeaning: "Rigid thinking, creative blocks, or need to balance structure with spontaneity.",
    numerologicalSignificance:
      "4 represents stability and foundation; 29 reduces to 11, a master number of spiritual insight through material work.",
  },
  {
    id: "fire-5",
    suit: "Flame",
    suitIndex: 5,
    iconColor: "red",
    element: "fire",
    firstEndNumber: 5,
    secondEndNumber: 30,
    elementalAssociations: { fire: 5, water: 2, air: 5, earth: 1, spirit: 2 },
    sacredGeometry: "Pentagram",
    planetaryInfluence: "Mercury",
    astrologicalSign: "Gemini",
    keywords: ["change", "freedom", "adventure", "transformation", "liberation"],
    meaning: "Dynamic change and transformative freedom liberate your creative potential and spark new adventures.",
    reversedMeaning: "Restlessness, instability, or need to ground transformative energy more effectively.",
    numerologicalSignificance:
      "5 represents change and freedom; 30 reduces to 3, indicating creative expression through transformation.",
  },

  // Water Suit (Blue Icons)
  {
    id: "water-1",
    suit: "Flow",
    suitIndex: 1,
    iconColor: "blue",
    element: "water",
    firstEndNumber: 6,
    secondEndNumber: 31,
    elementalAssociations: { fire: 2, water: 5, air: 2, earth: 3, spirit: 4 },
    sacredGeometry: "Circle",
    planetaryInfluence: "Moon",
    astrologicalSign: "Cancer",
    keywords: ["intuition", "emotion", "flow", "receptivity", "nurturing"],
    meaning: "Deep intuitive wisdom flows through emotional understanding and nurturing receptivity.",
    reversedMeaning: "Emotional overwhelm, blocked intuition, or need for better emotional boundaries.",
    numerologicalSignificance:
      "6 represents nurturing and responsibility; 31 reduces to 4, indicating emotional stability through structure.",
  },
  {
    id: "water-2",
    suit: "Flow",
    suitIndex: 2,
    iconColor: "blue",
    element: "water",
    firstEndNumber: 7,
    secondEndNumber: 32,
    elementalAssociations: { fire: 2, water: 4, air: 3, earth: 3, spirit: 5 },
    sacredGeometry: "Spiral",
    planetaryInfluence: "Neptune",
    astrologicalSign: "Pisces",
    keywords: ["spirituality", "mysticism", "inner knowing", "reflection", "depth"],
    meaning: "Spiritual depths reveal mystical insights through contemplative inner knowing and reflection.",
    reversedMeaning: "Spiritual confusion, illusion, or need to ground mystical experiences in practical wisdom.",
    numerologicalSignificance:
      "7 represents spiritual seeking; 32 reduces to 5, indicating spiritual freedom through emotional transformation.",
  },
  {
    id: "water-3",
    suit: "Flow",
    suitIndex: 3,
    iconColor: "blue",
    element: "water",
    firstEndNumber: 8,
    secondEndNumber: 33,
    elementalAssociations: { fire: 3, water: 5, air: 2, earth: 4, spirit: 3 },
    sacredGeometry: "Infinity Symbol",
    planetaryInfluence: "Pluto",
    astrologicalSign: "Scorpio",
    keywords: ["power", "transformation", "regeneration", "intensity", "depth"],
    meaning: "Powerful emotional transformation regenerates your being through intense spiritual depth.",
    reversedMeaning: "Emotional manipulation, power struggles, or need to channel intensity more constructively.",
    numerologicalSignificance:
      "8 represents material mastery; 33 is a master number of compassionate service through emotional wisdom.",
  },
  {
    id: "water-4",
    suit: "Flow",
    suitIndex: 4,
    iconColor: "blue",
    element: "water",
    firstEndNumber: 9,
    secondEndNumber: 34,
    elementalAssociations: { fire: 2, water: 4, air: 3, earth: 4, spirit: 4 },
    sacredGeometry: "Enneagram",
    planetaryInfluence: "Venus",
    astrologicalSign: "Libra",
    keywords: ["completion", "wisdom", "compassion", "understanding", "harmony"],
    meaning: "Emotional wisdom reaches completion through compassionate understanding and harmonious relationships.",
    reversedMeaning: "Emotional immaturity, lack of compassion, or need to develop greater emotional intelligence.",
    numerologicalSignificance:
      "9 represents completion and wisdom; 34 reduces to 7, indicating spiritual completion through emotional mastery.",
  },
  {
    id: "water-5",
    suit: "Flow",
    suitIndex: 5,
    iconColor: "blue",
    element: "water",
    firstEndNumber: 10,
    secondEndNumber: 35,
    elementalAssociations: { fire: 1, water: 5, air: 2, earth: 2, spirit: 5 },
    sacredGeometry: "Decagon",
    planetaryInfluence: "Uranus",
    astrologicalSign: "Aquarius",
    keywords: ["renewal", "rebirth", "cleansing", "purification", "new cycle"],
    meaning: "Emotional renewal and spiritual rebirth cleanse the past and initiate a new cycle of growth.",
    reversedMeaning: "Resistance to change, emotional stagnation, or need to release outdated emotional patterns.",
    numerologicalSignificance:
      "10 represents completion and new beginnings; 35 reduces to 8, indicating material manifestation through emotional renewal.",
  },

  // Air Suit (Yellow Icons)
  {
    id: "air-1",
    suit: "Wind",
    suitIndex: 1,
    iconColor: "yellow",
    element: "air",
    firstEndNumber: 11,
    secondEndNumber: 36,
    elementalAssociations: { fire: 3, water: 2, air: 5, earth: 2, spirit: 3 },
    sacredGeometry: "Hexagon",
    planetaryInfluence: "Mercury",
    astrologicalSign: "Gemini",
    keywords: ["communication", "intellect", "clarity", "ideas", "connection"],
    meaning: "Clear communication and intellectual insight create powerful connections through inspired ideas.",
    reversedMeaning: "Miscommunication, mental confusion, or need for greater clarity in thought and expression.",
    numerologicalSignificance:
      "11 is a master number of spiritual insight; 36 reduces to 9, indicating completion through mental mastery.",
  },
  {
    id: "air-2",
    suit: "Wind",
    suitIndex: 2,
    iconColor: "yellow",
    element: "air",
    firstEndNumber: 12,
    secondEndNumber: 37,
    elementalAssociations: { fire: 4, water: 2, air: 4, earth: 3, spirit: 2 },
    sacredGeometry: "Dodecagon",
    planetaryInfluence: "Venus",
    astrologicalSign: "Libra",
    keywords: ["balance", "justice", "harmony", "decision", "equilibrium"],
    meaning: "Mental balance and fair judgment create harmony through wise decisions and thoughtful equilibrium.",
    reversedMeaning: "Indecision, mental imbalance, or need to develop better judgment and decision-making skills.",
    numerologicalSignificance:
      "12 reduces to 3, representing creative expression; 37 reduces to 10/1, indicating new beginnings through balanced thinking.",
  },
  {
    id: "air-3",
    suit: "Wind",
    suitIndex: 3,
    iconColor: "yellow",
    element: "air",
    firstEndNumber: 13,
    secondEndNumber: 38,
    elementalAssociations: { fire: 2, water: 3, air: 5, earth: 2, spirit: 3 },
    sacredGeometry: "Tridecagon",
    planetaryInfluence: "Uranus",
    astrologicalSign: "Aquarius",
    keywords: ["innovation", "breakthrough", "revolution", "genius", "originality"],
    meaning: "Innovative thinking and revolutionary ideas breakthrough limitations through original genius and vision.",
    reversedMeaning: "Mental rigidity, resistance to new ideas, or need to embrace more innovative thinking patterns.",
    numerologicalSignificance:
      "13 reduces to 4, representing foundation through transformation; 38 reduces to 11, master number of inspired innovation.",
  },
  {
    id: "air-4",
    suit: "Wind",
    suitIndex: 4,
    iconColor: "yellow",
    element: "air",
    firstEndNumber: 14,
    secondEndNumber: 39,
    elementalAssociations: { fire: 3, water: 3, air: 4, earth: 4, spirit: 1 },
    sacredGeometry: "Tetradecagon",
    planetaryInfluence: "Saturn",
    astrologicalSign: "Capricorn",
    keywords: ["structure", "organization", "planning", "methodology", "system"],
    meaning: "Structured thinking and organized planning create systematic approaches to achieving mental clarity.",
    reversedMeaning: "Mental chaos, poor planning, or need to develop better organizational and systematic thinking.",
    numerologicalSignificance:
      "14 reduces to 5, representing change through structure; 39 reduces to 12/3, indicating creative expression through organization.",
  },
  {
    id: "air-5",
    suit: "Wind",
    suitIndex: 5,
    iconColor: "yellow",
    element: "air",
    firstEndNumber: 15,
    secondEndNumber: 40,
    elementalAssociations: { fire: 5, water: 1, air: 5, earth: 1, spirit: 3 },
    sacredGeometry: "Pentadecagon",
    planetaryInfluence: "Mars",
    astrologicalSign: "Aries",
    keywords: ["action", "decisiveness", "leadership", "initiative", "courage"],
    meaning: "Decisive mental action and courageous leadership initiate powerful changes through clear thinking.",
    reversedMeaning: "Mental paralysis, lack of direction, or need to develop greater courage in thought and action.",
    numerologicalSignificance:
      "15 reduces to 6, representing responsibility through action; 40 reduces to 4, indicating stable foundation through decisive thinking.",
  },

  // Earth Suit (Green Icons)
  {
    id: "earth-1",
    suit: "Stone",
    suitIndex: 1,
    iconColor: "green",
    element: "earth",
    firstEndNumber: 16,
    secondEndNumber: 41,
    elementalAssociations: { fire: 2, water: 3, air: 2, earth: 5, spirit: 3 },
    sacredGeometry: "Cube",
    planetaryInfluence: "Venus",
    astrologicalSign: "Taurus",
    keywords: ["stability", "foundation", "security", "abundance", "growth"],
    meaning: "Solid foundations and material stability create security and abundance through steady growth.",
    reversedMeaning: "Instability, material insecurity, or need to build stronger foundations for growth.",
    numerologicalSignificance:
      "16 reduces to 7, representing spiritual foundation; 41 reduces to 5, indicating change through material stability.",
  },
  {
    id: "earth-2",
    suit: "Stone",
    suitIndex: 2,
    iconColor: "green",
    element: "earth",
    firstEndNumber: 17,
    secondEndNumber: 42,
    elementalAssociations: { fire: 3, water: 4, air: 2, earth: 4, spirit: 2 },
    sacredGeometry: "Octahedron",
    planetaryInfluence: "Mercury",
    astrologicalSign: "Virgo",
    keywords: ["service", "healing", "perfection", "analysis", "refinement"],
    meaning: "Dedicated service and healing work refine your abilities through analytical perfection and care.",
    reversedMeaning: "Perfectionism, over-analysis, or need to balance service with self-care.",
    numerologicalSignificance:
      "17 reduces to 8, representing material mastery through service; 42 reduces to 6, indicating nurturing responsibility.",
  },
  {
    id: "earth-3",
    suit: "Stone",
    suitIndex: 3,
    iconColor: "green",
    element: "earth",
    firstEndNumber: 18,
    secondEndNumber: 43,
    elementalAssociations: { fire: 2, water: 2, air: 3, earth: 5, spirit: 3 },
    sacredGeometry: "Dodecahedron",
    planetaryInfluence: "Saturn",
    astrologicalSign: "Capricorn",
    keywords: ["achievement", "mastery", "authority", "responsibility", "leadership"],
    meaning: "Material achievement and practical mastery establish authority through responsible leadership.",
    reversedMeaning: "Abuse of power, irresponsibility, or need to develop more ethical leadership approaches.",
    numerologicalSignificance:
      "18 reduces to 9, representing completion through achievement; 43 reduces to 7, indicating spiritual mastery through material work.",
  },
  {
    id: "earth-4",
    suit: "Stone",
    suitIndex: 4,
    iconColor: "green",
    element: "earth",
    firstEndNumber: 19,
    secondEndNumber: 44,
    elementalAssociations: { fire: 4, water: 2, air: 2, earth: 4, spirit: 3 },
    sacredGeometry: "Icosahedron",
    planetaryInfluence: "Sun",
    astrologicalSign: "Leo",
    keywords: ["success", "recognition", "accomplishment", "prosperity", "fulfillment"],
    meaning:
      "Material success and public recognition bring accomplishment and prosperity through personal fulfillment.",
    reversedMeaning: "Lack of recognition, material setbacks, or need to redefine success and fulfillment.",
    numerologicalSignificance:
      "19 reduces to 10/1, representing new beginnings through success; 44 is a master number of material mastery through spiritual service.",
  },
  {
    id: "earth-5",
    suit: "Stone",
    suitIndex: 5,
    iconColor: "green",
    element: "earth",
    firstEndNumber: 20,
    secondEndNumber: 45,
    elementalAssociations: { fire: 1, water: 4, air: 2, earth: 5, spirit: 3 },
    sacredGeometry: "Sphere",
    planetaryInfluence: "Jupiter",
    astrologicalSign: "Sagittarius",
    keywords: ["expansion", "wisdom", "teaching", "philosophy", "understanding"],
    meaning: "Material wisdom expands into teaching and philosophical understanding through practical experience.",
    reversedMeaning: "Dogmatism, narrow thinking, or need to expand perspective beyond material concerns.",
    numerologicalSignificance:
      "20 reduces to 2, representing cooperation and partnership; 45 reduces to 9, indicating completion through expanded wisdom.",
  },

  // Spirit Suit (White Icons)
  {
    id: "spirit-1",
    suit: "Light",
    suitIndex: 1,
    iconColor: "white",
    element: "spirit",
    firstEndNumber: 21,
    secondEndNumber: 46,
    elementalAssociations: { fire: 4, water: 4, air: 3, earth: 3, spirit: 5 },
    sacredGeometry: "Merkaba",
    planetaryInfluence: "Sun",
    astrologicalSign: "Leo",
    keywords: ["illumination", "awakening", "consciousness", "enlightenment", "unity"],
    meaning: "Spiritual illumination and consciousness awakening bring enlightenment through unified understanding.",
    reversedMeaning:
      "Spiritual confusion, lack of awareness, or need to develop greater consciousness and understanding.",
    numerologicalSignificance:
      "21 reduces to 3, representing creative spiritual expression; 46 reduces to 10/1, indicating new spiritual beginnings.",
  },
  {
    id: "spirit-2",
    suit: "Light",
    suitIndex: 2,
    iconColor: "white",
    element: "spirit",
    firstEndNumber: 22,
    secondEndNumber: 47,
    elementalAssociations: { fire: 3, water: 5, air: 4, earth: 2, spirit: 5 },
    sacredGeometry: "Flower of Life",
    planetaryInfluence: "Neptune",
    astrologicalSign: "Pisces",
    keywords: ["intuition", "psychic", "mystical", "transcendence", "connection"],
    meaning: "Mystical intuition and psychic connection transcend ordinary reality through spiritual understanding.",
    reversedMeaning:
      "Psychic confusion, spiritual delusion, or need to ground mystical experiences in practical wisdom.",
    numerologicalSignificance:
      "22 is a master number of spiritual mastery; 47 reduces to 11, master number of spiritual insight.",
  },
  {
    id: "spirit-3",
    suit: "Light",
    suitIndex: 3,
    iconColor: "white",
    element: "spirit",
    firstEndNumber: 23,
    secondEndNumber: 48,
    elementalAssociations: { fire: 5, water: 3, air: 4, earth: 2, spirit: 5 },
    sacredGeometry: "Sri Yantra",
    planetaryInfluence: "Pluto",
    astrologicalSign: "Scorpio",
    keywords: ["transformation", "rebirth", "regeneration", "phoenix", "renewal"],
    meaning:
      "Spiritual transformation and rebirth regenerate your being through phoenix-like renewal of consciousness.",
    reversedMeaning: "Resistance to transformation, spiritual stagnation, or fear of necessary spiritual changes.",
    numerologicalSignificance:
      "23 reduces to 5, representing spiritual freedom through transformation; 48 reduces to 12/3, creative spiritual expression.",
  },
  {
    id: "spirit-4",
    suit: "Light",
    suitIndex: 4,
    iconColor: "white",
    element: "spirit",
    firstEndNumber: 24,
    secondEndNumber: 49,
    elementalAssociations: { fire: 4, water: 4, air: 4, earth: 4, spirit: 5 },
    sacredGeometry: "Mandala",
    planetaryInfluence: "Jupiter",
    astrologicalSign: "Sagittarius",
    keywords: ["integration", "wholeness", "completion", "balance", "harmony"],
    meaning: "Spiritual integration and wholeness create perfect balance and harmony through complete understanding.",
    reversedMeaning:
      "Spiritual fragmentation, imbalance, or need to integrate different aspects of spiritual understanding.",
    numerologicalSignificance:
      "24 reduces to 6, representing spiritual responsibility and service; 49 reduces to 13/4, stable spiritual foundation.",
  },
  {
    id: "spirit-5",
    suit: "Light",
    suitIndex: 5,
    iconColor: "white",
    element: "spirit",
    firstEndNumber: 25,
    secondEndNumber: 50,
    elementalAssociations: { fire: 5, water: 5, air: 5, earth: 5, spirit: 5 },
    sacredGeometry: "Pentagram in Circle",
    planetaryInfluence: "Uranus",
    astrologicalSign: "Aquarius",
    keywords: ["mastery", "perfection", "completion", "ascension", "unity"],
    meaning:
      "Spiritual mastery and perfection achieve complete unity through ascended consciousness and understanding.",
    reversedMeaning: "Spiritual pride, incomplete mastery, or need for humility in spiritual development.",
    numerologicalSignificance:
      "25 reduces to 7, representing spiritual completion; 50 reduces to 5, indicating ultimate spiritual freedom.",
  },
]

export function getElementalCard(id: string): ElementalCard | undefined {
  return elementalOracleCards.find((card) => card.id === id)
}

export function getCardsBySuit(suit: string): ElementalCard[] {
  return elementalOracleCards.filter((card) => card.suit === suit)
}

export function getCardsByElement(element: string): ElementalCard[] {
  return elementalOracleCards.filter((card) => card.element === element)
}

export function getAllElementalCards(): ElementalCard[] {
  return elementalOracleCards
}
