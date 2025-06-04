// This file should be created and populated as described in Step 1.
// For brevity, I'm only showing the structure and a couple of examples.
// You would need to meticulously fill this out based on the provided documents.

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

export const numoNumberDefinitions: NumoNumberData[] = [
  {
    number: 0,
    title: "0 - The Infinite Potential",
    description:
      "Represents the void, the unmanifest, the source of all potential. Symbolizes the spiritual plane where all possibilities exist.",
    keywords: ["void", "potential", "infinity", "unmanifest", "spirit", "emptiness", "cycle"],
    numerologyMeaning:
      "0 is the number of infinite potential and the unmanifested, representing the beginning of the creative cycle. It is the ultimate symbol of the unknown, the void, and the space that holds all possibilities. 0 carries the energy of wholeness, divine consciousness, and oneness with the universe. It can amplify the power of any number it is paired with.",
    planetaryRulerName: "Pluto",
    planetaryRulerDescription:
      "Pluto, planet of deep transformation, regeneration, and rebirth, mirrors 0’s role in the cycle of existence, as everything comes from the void and eventually returns to it.",
    astrologicalSignName: "Scorpio",
    astrologicalSignDescription:
      "Scorpio reflects 0’s potential for profound change and rebirth, and the mysteries of life and death. It deals with the unseen and powerful forces of regeneration.",
    individualElementalPowerName: "Spirit", // From NUMO Guidebook Chapter 2.1.4
    individualElementalPowerDescription:
      "Spirit is the essence of life, the divine consciousness that flows through all things. As the element of Spirit, 0 symbolizes the unmanifest, the force that connects all living beings to the divine source of creation. It is the space where spiritual energy resides before action.",
    numoPairedWith: 1,
    numoPairName: "The Cauldron",
    numoPairVisualSymbolism:
      "0 is a circle, symbolizing infinity and potential. 1 is a straight vertical line, symbolizing the first step into existence. Their contrast represents the cosmic balance between potential and realization.", // From NUMO Guidebook Chapter 1.3
    numoPairElementalPower: "Fire", // From NUMO Guidebook Chapter 2.3.1
    numoPairGiftDescription:
      "The Cauldron (Fire Gift) symbolizes creation and inspiration. It represents the creative force, potential for new beginnings, and the spark of life that Danu offers.", // From NUMO Guidebook Chapter 7
    mysteryDocPairRole: "The Void",
    mysteryDocVisualSymbolism: "A circle of endless potential.", // From HiddenMysteries Doc Section 2
    mysteryDocMetaphysicalPrinciple:
      "Everything in the universe originates from the void (0) and returns to it. This pairing encapsulates the cycle of creation and dissolution.", // From HiddenMysteries Doc Section 2
    mysteryDocPairedWith: 1,
    mysteryDocPairDescription:
      "0 and 1 are metaphysical markers for the cosmic duality of existence and return. This concept resonates with 'tzimtzum.'", // From HiddenMysteries Doc Section 2
    shapeType: "sphere",
  },
  {
    number: 1,
    title: "1 - The First Manifestation",
    description:
      "Represents the first act of creation, individuality, leadership, and new beginnings. The singular force that drives manifestation.",
    keywords: ["creation", "manifestation", "individuality", "leadership", "action", "beginnings", "fire"],
    numerologyMeaning:
      "1 is the number of new beginnings, individuality, and creation. It symbolizes self-reliance, assertiveness, and the ability to take initiative. It is the origin of all other numbers, standing alone as the purest expression of action and will.",
    planetaryRulerName: "The Sun",
    planetaryRulerDescription:
      "The Sun represents vitality, self-expression, and personal power, aligning perfectly with 1's leadership and the power to create.",
    astrologicalSignName: "Leo",
    astrologicalSignDescription:
      "Leo embodies boldness, strength, and the desire to lead and express oneself fully, mirroring 1's energy.",
    individualElementalPowerName: "Fire", // From NUMO Guidebook Chapter 2.2.4
    individualElementalPowerDescription:
      "Fire represents the spark of creation, passion, and action. It transforms potential into reality. It is the primal energy that initiates creation.",
    numoPairedWith: 0,
    numoPairName: "The Cauldron",
    numoPairVisualSymbolism:
      "1’s linearity is the first movement in the empty void of 0, signifying the act of bringing form into being.", // From NUMO Guidebook Chapter 1.3
    numoPairElementalPower: "Fire", // From NUMO Guidebook Chapter 2.3.1
    numoPairGiftDescription:
      "The Cauldron (Fire Gift) symbolizes creation and inspiration. It represents the creative force, potential for new beginnings, and the spark of life.", // From NUMO Guidebook Chapter 7
    mysteryDocPairRole: "Creation",
    mysteryDocVisualSymbolism: "A vertical line symbolizing manifestation—the birth of something from nothing.", // From HiddenMysteries Doc Section 2
    mysteryDocMetaphysicalPrinciple: "The first act of creation. Part of the cycle of creation and dissolution.", // From HiddenMysteries Doc Section 2
    mysteryDocPairedWith: 0,
    mysteryDocPairDescription: "0 and 1 are metaphysical markers for the cosmic duality of existence and return.", // From HiddenMysteries Doc Section 2
    shapeType: "line",
  },
  // Add entries for 2 through 9, carefully extracting and synthesizing data from both documents.
  // Example for 3:
  {
    number: 3,
    title: "3 - Creativity and Expansion",
    description: "Symbolizes creativity, communication, growth, and joyful expression. The energy of expansion.",
    keywords: ["creativity", "expression", "growth", "communication", "joy", "expansion", "fire"],
    numerologyMeaning:
      "3 is the number of creativity, communication, and expression. It embodies artistic endeavors, social interaction, and joyful expansion. It encourages playfulness and the expansion of talents.",
    planetaryRulerName: "Jupiter",
    planetaryRulerDescription:
      "Jupiter, planet of expansion, abundance, and wisdom, aligns with 3's qualities of growth, generosity, and optimism.",
    astrologicalSignName: "Sagittarius",
    astrologicalSignDescription:
      "Sagittarius embodies the expansive and optimistic qualities of 3, constantly seeking new experiences and ideas.",
    individualElementalPowerName: "Fire", // From NUMO Guidebook Chapter 4.1.4
    individualElementalPowerDescription:
      "Fire fuels 3’s desire for expression and expansion, driving individuals to bring their ideas and talents into the world. It's dynamic and seeks new ways to express.",
    numoPairedWith: 8,
    numoPairName: "The Cord",
    numoPairVisualSymbolism:
      "3 resembles an 8 cut in half, formed by two open curves stacked together, suggesting expansion. 8 is a closed, symmetrical figure of infinity.", // From NUMO Guidebook Chapter 1.3
    numoPairElementalPower: "Fire", // From NUMO Guidebook Chapter 4.3.1
    numoPairGiftDescription:
      "The Cord (as the 3/8 pair with Fire element) symbolizes the eternal connection between creativity and infinity, time and destiny. It connects creative impulse to infinite life cycles.", // From NUMO Guidebook Chapter 4 & 7 (Note: Chapter 7 also mentions a "Cord of Spirit" as the 5th gift, distinct from this 3/8 Fire Cord)
    mysteryDocPairRole: "Cycles of Creation",
    mysteryDocVisualSymbolism:
      "Geometrically half of 8; its loops are fragments of 8's continuous loop, representing the finite within the infinite.", // From HiddenMysteries Doc Section 4
    mysteryDocMetaphysicalPrinciple:
      "All acts of creation (3) are part of an infinite cycle of existence (8). Finite experiences are intricately woven into the endless flow of the universe.", // From HiddenMysteries Doc Section 4
    mysteryDocPairedWith: 8,
    mysteryDocPairDescription:
      "3 and 8 highlight that finite experiences are intricately woven into the endless flow of the universe, mirroring the Ouroboros.", // From HiddenMysteries Doc Section 4
    shapeType: "halfEight",
  },
]
