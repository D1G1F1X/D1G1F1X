// Card data structure based on NUMO Guidebook 5.6 with updated terminology
export interface CardEnd {
  number: number
  meaning: string
  keywords: string[]
  sacredGeometry: string
  planet: string
  astrologicalSign: string
  elementalAffinity: string
  numerologicalSignificance: string
  suitOrientation?: string
  baseElement?: string
  dominantElement?: string
  icon?: string
}

export interface OracleCard {
  id: string
  name: string
  element: string
  type: string
  firstEnd: CardEnd
  secondEnd: CardEnd
  firstEndImage: string
  secondEndImage: string
}

// Updated card data from NUMO Guidebook with new terminology
export const cardData: OracleCard[] = [
  // Cauldron Series
  {
    id: "cauldron-creation-0",
    name: "The Cauldron of Creation",
    element: "Air",
    type: "Cauldron",
    firstEnd: {
      number: 0,
      meaning:
        "Creation in Progress, Alchemy and Transformation, Infinite Potential Turning into Reality, Deep Change and Rebirth",
      keywords: ["creation", "potential", "transformation", "alchemy", "void"],
      sacredGeometry: "The dot on the 0 Cauldron card symbolizes the point of origin",
      planet: "Pluto (P)",
      astrologicalSign: "Scorpio (♏)",
      elementalAffinity: "Connected to all elements with Air as the base element and Fire as the dominant element.",
      numerologicalSignificance:
        "The number zero represents the void, the unmanifested potential, and the cosmic womb from which all creation emerges.",
      suitOrientation: "Cooking",
      baseElement: "Air",
      dominantElement: "Fire",
      icon: "The pentagram at the center of the cauldron represents the balance and interplay of the five classical elements",
    },
    secondEnd: {
      number: 1,
      meaning: "Manifestation in Progress, Individual Power and Leadership, Self-Expression and Creativity",
      keywords: ["manifestation", "leadership", "individuality", "action", "expression"],
      sacredGeometry: "Plus Sign (+) represents the addition of forces",
      planet: "Sun (☉)",
      astrologicalSign: "Leo (♌)",
      elementalAffinity: "Connected to all elements with Fire as both the base and dominant element.",
      numerologicalSignificance: "The number one symbolizes individuality, action, and leadership.",
      suitOrientation: "Pouring",
      baseElement: "Fire",
      dominantElement: "Fire",
      icon: "The pentagram ensures that all elements are harmonized in the process",
    },
    firstEndImage: "/cards/01cauldron-air.jpg", // This would need to be updated to the correct image
    secondEndImage: "/cards/10cauldron-fire.jpg", // This would need to be updated to the correct image
  },

  // Sword Series
  {
    id: "sword-grace-2",
    name: "The Sword of Grace and Balance",
    element: "Water",
    type: "Sword",
    firstEnd: {
      number: 2,
      meaning:
        "Graceful Decision-Making, Navigating Change, Finding Balance in Duality, Mental Clarity and Communication",
      keywords: ["grace", "balance", "duality", "harmony", "decision"],
      sacredGeometry: "Triangle and Delta (Δ)",
      planet: "",
      astrologicalSign: "",
      elementalAffinity: "Connected to all elements with Water as both the base and dominant element.",
      numerologicalSignificance: "The number two represents duality, balance, and harmony.",
      suitOrientation: "Tip",
      baseElement: "Water",
      dominantElement: "Water",
      icon: "Vesica Piscis (Interlocking Circles)",
    },
    secondEnd: {
      number: 5,
      meaning:
        "Bold, Decisive Action, Navigating Conflict and Power Struggles, Change Through Force, Balancing Duality, Emotional Depth and Security, Cosmic Balance",
      keywords: ["power", "conflict", "decisiveness", "force", "change"],
      sacredGeometry: "Triangle and Delta (Δ)",
      planet: "Cancer (♋)",
      astrologicalSign: "Gemini (♊)",
      elementalAffinity: "Connected to all elements with Fire as the base element and Water as the dominant element.",
      numerologicalSignificance: "The number five represents change, conflict, and freedom.",
      suitOrientation: "Edge",
      baseElement: "Fire",
      dominantElement: "Water",
      icon: "Five-Fold Circle (Flower of Life)",
    },
    firstEndImage: "/cards/25sword-water.jpg", // This would need to be updated to the correct image
    secondEndImage: "/cards/52sword-fire.jpg", // This would need to be updated to the correct image
  },

  // Cord Series
  {
    id: "cord-connection-3",
    name: "The Cord of Connection",
    element: "Earth",
    type: "Cord",
    firstEnd: {
      number: 3,
      meaning:
        "Creative Collaboration, Harmony in Relationships, Building Strong Connections, Expressive Communication",
      keywords: ["connection", "creativity", "collaboration", "communication", "harmony"],
      sacredGeometry: "",
      planet: "Venus (♀)",
      astrologicalSign: "Taurus (♉)",
      elementalAffinity: "Connected to all elements with Earth as the base element and Spirit as the dominant element.",
      numerologicalSignificance: "The number three is associated with creativity, communication, and collaboration.",
      suitOrientation: "Before You",
      baseElement: "Earth",
      dominantElement: "Spirit",
      icon: "The Knot and Hourglass",
    },
    secondEnd: {
      number: 8,
      meaning:
        "Mastery Over Relationships, Power and Influence, Transformation in Relationships, Emotional Depth and Honesty",
      keywords: ["mastery", "power", "influence", "transformation", "depth"],
      sacredGeometry: "",
      planet: "Saturn (♄)",
      astrologicalSign: "Capricorn (♑)",
      elementalAffinity: "Connected to all elements with Spirit as both the base and dominant element.",
      numerologicalSignificance:
        "The number eight is a symbol of power, mastery, and authority, especially in the realm of balance between the material and spiritual.",
      suitOrientation: "Away",
      baseElement: "Spirit",
      dominantElement: "Spirit",
      icon: "The Knot (Away orientation)",
    },
    firstEndImage: "/cards/38cord-earth.jpg", // This would need to be updated to the correct image
    secondEndImage: "/cards/83cord-spirit.jpg", // This would need to be updated to the correct image
  },

  // Spear Series
  {
    id: "spear-stability-4",
    name: "The Spear of Stability and Precision",
    element: "Earth",
    type: "Spear",
    firstEnd: {
      number: 4,
      meaning: "Strength Through Stability, Strategic Advancement, Precision and Focus, Balanced Ascent",
      keywords: ["stability", "precision", "focus", "structure", "discipline"],
      sacredGeometry: "",
      planet: "Mars (♂)",
      astrologicalSign: "Aries (♈)",
      elementalAffinity: "Connected to all elements with Earth as the base element and Air as the dominant element.",
      numerologicalSignificance: "The number four represents structure, foundation, and discipline.",
      suitOrientation: "The shaft",
      baseElement: "Earth",
      dominantElement: "Air",
      icon: "Crossed Spears and Arrow Icon",
    },
    secondEnd: {
      number: 7,
      meaning: "Strength Through Endurance, Mastery of Defense, Wisdom in Challenges, Holding Power",
      keywords: ["resilience", "mastery", "endurance", "wisdom", "defense"],
      sacredGeometry: "",
      planet: "Saturn (♄)",
      astrologicalSign: "Leo (♌)",
      elementalAffinity: "Connected to all elements with Air as both the base and dominant element.",
      numerologicalSignificance: "The number seven symbolizes introspection, resilience, and mastery.",
      suitOrientation: "Point",
      baseElement: "Air",
      dominantElement: "Air",
      icon: "Crossed Spears (point orientation)",
    },
    firstEndImage: "/cards/47spear-earth.jpg", // This would need to be updated to the correct image
    secondEndImage: "/cards/74spear-air.jpg", // This would need to be updated to the correct image
  },

  // Stone Series
  {
    id: "stone-growth-6",
    name: "The Stone of Growth and Stability",
    element: "Earth",
    type: "Stone",
    firstEnd: {
      number: 6,
      meaning: "Stable Growth, Effortless Security, Prosperity and Nurturing, Graceful Responsibility",
      keywords: ["growth", "stability", "nurturing", "balance", "responsibility"],
      sacredGeometry: "",
      planet: "Venus (♀)",
      astrologicalSign: "Taurus (♉)",
      elementalAffinity: "Connected to all elements with Earth as both the base element and dominant element.",
      numerologicalSignificance: "The number six symbolizes balance, responsibility, and nurtured expansion.",
      suitOrientation: "Smooth",
      baseElement: "Earth",
      dominantElement: "Earth",
      icon: "Diamond with Pentagon",
    },
    secondEnd: {
      number: 9,
      meaning: "Service and Duty, Observance and Structure, Completion Through Responsibility, Endurance in Service",
      keywords: ["service", "duty", "completion", "wisdom", "discipline"],
      sacredGeometry: "",
      planet: "Mars (♂)",
      astrologicalSign: "Virgo (♍)",
      elementalAffinity: "Connected to all elements with Air as the base element and Earth as the dominant element.",
      numerologicalSignificance:
        "The number nine symbolizes completion, wisdom, and the culmination of experience through service.",
      suitOrientation: "Rough",
      baseElement: "Air",
      dominantElement: "Earth",
      icon: "Pentagon",
    },
    firstEndImage: "/cards/69stone-earth.jpg", // This would need to be updated to the correct image
    secondEndImage: "/cards/96stone-air.jpg", // This would need to be updated to the correct image
  },
  {
    id: "cauldron-earth-1",
    name: "Cauldron of Earth",
    element: "Earth",
    type: "Cauldron",
    firstEnd: {
      number: 1,
      meaning:
        "New beginnings in material matters, foundation building, and stability. This card signals the start of a new phase in your physical world, whether related to finances, career, health, or home. It's a time to plant seeds and establish solid foundations.",
      keywords: ["beginnings", "foundation", "material", "stability", "growth"],
      sacredGeometry: "Point/Dot - The origin of all forms",
      planet: "Saturn",
      astrologicalSign: "Capricorn",
      elementalAffinity:
        "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It grounds spiritual energy into physical form.",
      numerologicalSignificance:
        "As a number 1 card, it embodies new beginnings, independence, and the initial spark of creation in the material realm.",
    },
    secondEnd: {
      number: 10,
      meaning:
        "Material fulfillment, physical completion, and tangible achievement. This card indicates a cycle of material growth has reached its culmination, bringing a sense of abundance, security, and the manifestation of long-term goals.",
      keywords: ["fulfillment", "abundance", "completion", "manifestation", "achievement"],
      sacredGeometry: "Decad - The return to unity after experiencing the cycle of numbers",
      planet: "Mercury",
      astrologicalSign: "Virgo",
      elementalAffinity:
        "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the culmination of efforts in the physical world.",
      numerologicalSignificance:
        "As a number 10 card, it embodies completion, fulfillment, and the culmination of a cycle, reducing to 1 (1+0=1) which suggests a new cycle of material creation is about to begin.",
    },
    firstEndImage: "/cards/01cauldron-earth.jpg",
    secondEndImage: "/cards/10cauldron-earth.jpg",
  },
  {
    id: "cauldron-fire-1",
    name: "Cauldron of Fire",
    element: "Fire",
    type: "Cauldron",
    firstEnd: {
      number: 1,
      meaning:
        "The spark of passion, creative inspiration, and transformative energy. This card signals the beginning of a creative project, a new passion, or a spiritual awakening. It's a time to embrace your enthusiasm and allow your inner fire to guide you.",
      keywords: ["passion", "creativity", "inspiration", "transformation", "energy"],
      sacredGeometry: "Point/Dot - The origin of all forms",
      planet: "Sun",
      astrologicalSign: "Aries",
      elementalAffinity:
        "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the catalyzing energy that initiates change.",
      numerologicalSignificance:
        "As a number 1 card, it embodies new beginnings, independence, and the initial spark of creation in the realm of passion and transformation.",
    },
    secondEnd: {
      number: 10,
      meaning:
        "Creative fulfillment, passionate completion, and transformative achievement. This card indicates a cycle of creative or spiritual growth has reached its culmination, bringing a sense of accomplishment and the transformation of energy into its highest form.",
      keywords: ["fulfillment", "passion", "completion", "transformation", "achievement"],
      sacredGeometry: "Decad - The return to unity after experiencing the cycle of numbers",
      planet: "Mercury",
      astrologicalSign: "Virgo",
      elementalAffinity:
        "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the purifying flame that has completed its work.",
      numerologicalSignificance:
        "As a number 10 card, it embodies completion, fulfillment, and the culmination of a cycle, reducing to 1 (1+0=1) which suggests a new creative or transformative cycle is about to begin.",
    },
    firstEndImage: "/cards/01cauldron-fire.jpg",
    secondEndImage: "/cards/10cauldron-fire.jpg",
  },
  {
    id: "cauldron-water-1",
    name: "Cauldron of Water",
    element: "Water",
    type: "Cauldron",
    firstEnd: {
      number: 1,
      meaning:
        "New emotional beginnings, intuitive awakening, and the start of relationships. This card signals the beginning of an emotional journey, a new relationship, or the first stirrings of intuitive awareness. It's a time to open your heart and trust your feelings.",
      keywords: ["emotions", "intuition", "relationships", "feelings", "flow"],
      sacredGeometry: "Point/Dot - The origin of all forms",
      planet: "Moon",
      astrologicalSign: "Cancer",
      elementalAffinity:
        "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the first ripples of feeling that expand outward.",
      numerologicalSignificance:
        "As a number 1 card, it embodies new beginnings, independence, and the initial spark of creation in the realm of emotions and intuition.",
    },
    secondEnd: {
      number: 10,
      meaning:
        "Emotional fulfillment, deep intuitive wisdom, and emotional completion. This card indicates a cycle of emotional growth has reached its culmination, bringing a sense of wholeness and deep satisfaction in relationships or spiritual connection.",
      keywords: ["fulfillment", "intuition", "completion", "emotional wisdom", "flow"],
      sacredGeometry: "Decad - The return to unity after experiencing the cycle of numbers",
      planet: "Neptune",
      astrologicalSign: "Pisces",
      elementalAffinity:
        "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the flowing nature of feelings and psychic awareness.",
      numerologicalSignificance:
        "As a number 10 card, it embodies completion, fulfillment, and the culmination of a cycle, reducing to 1 (1+0=1) which suggests a new emotional cycle is about to begin.",
    },
    firstEndImage: "/cards/01cauldron-water.jpg",
    secondEndImage: "/cards/10cauldron-water.jpg",
  },
  {
    id: "cauldron-air-1",
    name: "Cauldron of Air",
    element: "Air",
    type: "Cauldron",
    firstEnd: {
      number: 1,
      meaning:
        "New ideas, mental clarity, and the beginning of communication. This card signals the start of intellectual pursuits, learning opportunities, or important conversations. It's a time to embrace new concepts and express your thoughts.",
      keywords: ["ideas", "clarity", "communication", "intellect", "learning"],
      sacredGeometry: "Point/Dot - The origin of all forms",
      planet: "Mercury",
      astrologicalSign: "Gemini",
      elementalAffinity:
        "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the breath of inspiration that brings new thoughts.",
      numerologicalSignificance:
        "As a number 1 card, it embodies new beginnings, independence, and the initial spark of creation in the realm of thought and communication.",
    },
    secondEnd: {
      number: 10,
      meaning:
        "Mental fulfillment, intellectual completion, and communicative achievement. This card indicates a cycle of mental growth has reached its culmination, bringing clarity of thought, successful communication, and the mastery of ideas.",
      keywords: ["fulfillment", "clarity", "completion", "communication", "understanding"],
      sacredGeometry: "Decad - The return to unity after experiencing the cycle of numbers",
      planet: "Uranus",
      astrologicalSign: "Aquarius",
      elementalAffinity:
        "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the culmination of mental processes and exchanges.",
      numerologicalSignificance:
        "As a number 10 card, it embodies completion, fulfillment, and the culmination of a cycle, reducing to 1 (1+0=1) which suggests a new cycle of mental creation is about to begin.",
    },
    firstEndImage: "/cards/01cauldron-air.jpg",
    secondEndImage: "/cards/10cauldron-air.jpg",
  },
  {
    id: "cauldron-spirit-1",
    name: "Cauldron of Spirit",
    element: "Spirit",
    type: "Cauldron",
    firstEnd: {
      number: 1,
      meaning:
        "Spiritual awakening, soul purpose, and divine connection. This card signals the beginning of a spiritual journey, a new understanding of your purpose, or the first connection with higher guidance. It's a time to embrace your spiritual nature.",
      keywords: ["awakening", "purpose", "connection", "divinity", "essence"],
      sacredGeometry: "Point/Dot - The origin of all forms",
      planet: "Jupiter",
      astrologicalSign: "Sagittarius",
      elementalAffinity:
        "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the first awareness of your eternal nature.",
      numerologicalSignificance:
        "As a number 1 card, it embodies new beginnings, independence, and the initial spark of creation in the realm of spiritual connection and purpose.",
    },
    secondEnd: {
      number: 10,
      meaning:
        "Spiritual fulfillment, divine completion, and soul achievement. This card indicates a cycle of spiritual growth has reached its culmination, bringing a profound connection with your higher self, a sense of divine purpose, and the integration of spiritual wisdom.",
      keywords: ["fulfillment", "divinity", "completion", "integration", "wholeness"],
      sacredGeometry: "Decad - The return to unity after experiencing the cycle of numbers",
      planet: "Pluto",
      astrologicalSign: "Scorpio",
      elementalAffinity:
        "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the culmination of spiritual awakening.",
      numerologicalSignificance:
        "As a number 10 card, it embodies completion, fulfillment, and the culmination of a cycle, reducing to 1 (1+0=1) which suggests a new cycle of spiritual growth is about to begin.",
    },
    firstEndImage: "/cards/01cauldron-spirit.jpg",
    secondEndImage: "/cards/10cauldron-spirit.jpg",
  },

  // Sword Series
  {
    id: "sword-earth-25",
    name: "Sword of Earth",
    element: "Earth",
    type: "Sword",
    firstEnd: {
      number: 25,
      meaning:
        "Practical truth, material clarity, and grounded decisions. This card indicates a time when your practical wisdom allows you to cut through confusion with stability and make decisions that establish or protect your material foundation.",
      keywords: ["practicality", "clarity", "decision", "stability", "truth"],
      sacredGeometry: "Pentagram - The five-pointed star representing harmony and balance",
      planet: "Saturn",
      astrologicalSign: "Capricorn",
      elementalAffinity:
        "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding force that brings clarity to material concerns.",
      numerologicalSignificance:
        "As a number 25 card (reducing to 7: 2+5=7), it embodies analysis, wisdom, and the quest for deeper truth through practical investigation.",
    },
    secondEnd: {
      number: 52,
      meaning:
        "Practical truth, material clarity, and grounded decisions. This card indicates a time when your practical wisdom allows you to cut through confusion with stability and make decisions that establish or protect your material foundation.",
      keywords: ["practicality", "clarity", "decision", "stability", "truth"],
      sacredGeometry: "Vesica Piscis - The intersection of two circles, representing the union of opposites",
      planet: "Venus",
      astrologicalSign: "Taurus",
      elementalAffinity:
        "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding force that brings clarity to material concerns.",
      numerologicalSignificance:
        "As a number 52 card (reducing to 7: 5+2=7), it embodies spiritual insight, analysis, and the quest for deeper truth through practical investigation.",
    },
    firstEndImage: "/cards/25sword-earth.jpg",
    secondEndImage: "/cards/52sword-earth.jpg",
  },
  {
    id: "sword-fire-25",
    name: "Sword of Fire",
    element: "Fire",
    type: "Sword",
    firstEnd: {
      number: 25,
      meaning:
        "Passionate truth, creative clarity, and transformative decisions. This card indicates a time when your passion and clarity align, allowing you to cut through confusion with the fire of inspiration and make decisions that transform your path.",
      keywords: ["passion", "clarity", "transformation", "decision", "action"],
      sacredGeometry: "Pentagram - The five-pointed star representing harmony and balance",
      planet: "Mars",
      astrologicalSign: "Aries",
      elementalAffinity:
        "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the purifying flame that brings clarity through transformation.",
      numerologicalSignificance:
        "As a number 25 card (reducing to 7: 2+5=7), it embodies analysis, wisdom, and the quest for deeper truth through passionate exploration.",
    },
    secondEnd: {
      number: 52,
      meaning:
        "Passionate truth, creative clarity, and transformative decisions. This card indicates a time when your passion and clarity align, allowing you to cut through confusion with the fire of inspiration and make decisions that transform your path.",
      keywords: ["passion", "clarity", "transformation", "decision", "action"],
      sacredGeometry: "Vesica Piscis - The intersection of two circles, representing the union of opposites",
      planet: "Sun",
      astrologicalSign: "Leo",
      elementalAffinity:
        "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the purifying and energizing nature of flame.",
      numerologicalSignificance:
        "As a number 52 card (reducing to 7: 5+2=7), it embodies spiritual insight, analysis, and the quest for deeper truth through passionate exploration.",
    },
    firstEndImage: "/cards/25sword-fire.jpg",
    secondEndImage: "/cards/52sword-fire.jpg",
  },
  {
    id: "sword-water-25",
    name: "Sword of Water",
    element: "Water",
    type: "Sword",
    firstEnd: {
      number: 25,
      meaning:
        "Emotional truth, intuitive clarity, and heart-centered decisions. This card indicates a time when your emotional wisdom and intuition allow you to cut through confusion with compassion and make decisions that honor your feelings and relationships.",
      keywords: ["emotion", "clarity", "intuition", "decision", "compassion"],
      sacredGeometry: "Pentagram - The five-pointed star representing harmony and balance",
      planet: "Moon",
      astrologicalSign: "Cancer",
      elementalAffinity:
        "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the flowing insight that brings clarity to emotional matters.",
      numerologicalSignificance:
        "As a number 25 card (reducing to 7: 2+5=7), it embodies analysis, wisdom, and the quest for deeper truth through emotional and intuitive understanding.",
    },
    secondEnd: {
      number: 52,
      meaning:
        "Emotional truth, intuitive clarity, and heart-centered decisions. This card indicates a time when your emotional wisdom and intuition allow you to cut through confusion with compassion and make decisions that honor your feelings and relationships.",
      keywords: ["emotion", "clarity", "intuition", "decision", "compassion"],
      sacredGeometry: "Vesica Piscis - The intersection of two circles, representing the union of opposites",
      planet: "Neptune",
      astrologicalSign: "Pisces",
      elementalAffinity:
        "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the flowing insight that brings clarity to emotional matters.",
      numerologicalSignificance:
        "As a number 52 card (reducing to 7: 5+2=7), it embodies spiritual insight, analysis, and the quest for deeper truth through emotional and intuitive understanding.",
    },
    firstEndImage: "/cards/25sword-water.jpg",
    secondEndImage: "/cards/52sword-water.jpg",
  },
  {
    id: "sword-air-25",
    name: "Sword of Air",
    element: "Air",
    type: "Sword",
    firstEnd: {
      number: 25,
      meaning:
        "Mental truth, intellectual clarity, and logical decisions. This card indicates a time when your mental acuity is at its peak, allowing you to cut through confusion with sharp intellect and make decisions based on clear thinking and communication.",
      keywords: ["intellect", "clarity", "communication", "decision", "logic"],
      sacredGeometry: "Pentagram - The five-pointed star representing harmony and balance",
      planet: "Mercury",
      astrologicalSign: "Gemini",
      elementalAffinity:
        "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the sharp edge of thought that brings clarity through analysis.",
      numerologicalSignificance:
        "As a number 25 card (reducing to 7: 2+5=7), it embodies analysis, wisdom, and the quest for deeper truth through intellectual investigation.",
    },
    secondEnd: {
      number: 52,
      meaning:
        "Mental truth, intellectual clarity, and logical decisions. This card indicates a time when your mental acuity is at its peak, allowing you to cut through confusion with sharp intellect and make decisions based on clear thinking and communication.",
      keywords: ["intellect", "clarity", "communication", "decision", "logic"],
      sacredGeometry: "Vesica Piscis - The intersection of two circles, representing the union of opposites",
      planet: "Uranus",
      astrologicalSign: "Aquarius",
      elementalAffinity:
        "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the sharp edge of thought that brings clarity through analysis.",
      numerologicalSignificance:
        "As a number 52 card (reducing to 7: 5+2=7), it embodies spiritual insight, analysis, and the quest for deeper truth through intellectual investigation.",
    },
    firstEndImage: "/cards/25sword-air.jpg",
    secondEndImage: "/cards/52sword-air.jpg",
  },
  {
    id: "sword-spirit-25",
    name: "Sword of Spirit",
    element: "Spirit",
    type: "Sword",
    firstEnd: {
      number: 25,
      meaning:
        "Divine truth, spiritual clarity, and soul-aligned decisions. This card indicates a time when your connection to higher wisdom allows you to cut through illusion with spiritual insight and make decisions that align with your soul's purpose.",
      keywords: ["divinity", "clarity", "purpose", "decision", "alignment"],
      sacredGeometry: "Pentagram - The five-pointed star representing harmony and balance",
      planet: "Jupiter",
      astrologicalSign: "Sagittarius",
      elementalAffinity:
        "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the transcendent insight that brings clarity to spiritual matters.",
      numerologicalSignificance:
        "As a number 25 card (reducing to 7: 2+5=7), it embodies analysis, wisdom, and the quest for deeper truth through spiritual discernment.",
    },
    secondEnd: {
      number: 52,
      meaning:
        "Divine truth, spiritual clarity, and soul-aligned decisions. This card indicates a time when your connection to higher wisdom allows you to cut through illusion with spiritual insight and make decisions that align with your soul's purpose.",
      keywords: ["divinity", "clarity", "purpose", "decision", "alignment"],
      sacredGeometry: "Vesica Piscis - The intersection of two circles, representing the union of opposites",
      planet: "Pluto",
      astrologicalSign: "Scorpio",
      elementalAffinity:
        "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the transcendent insight that brings clarity to spiritual matters.",
      numerologicalSignificance:
        "As a number 52 card (reducing to 7: 5+2=7), it embodies spiritual insight, analysis, and the quest for deeper truth through spiritual discernment.",
    },
    firstEndImage: "/cards/25sword-spirit.jpg",
    secondEndImage: "/cards/52sword-spirit.jpg",
  },

  // Spear Series
  {
    id: "spear-earth-47",
    name: "Spear of Earth",
    element: "Earth",
    type: "Spear",
    firstEnd: {
      number: 47,
      meaning:
        "Material focus, practical direction, and physical goals. This card indicates the ability to direct your physical energy with precision, focus on tangible objectives, and pursue material goals with determination and groundedness.",
      keywords: ["focus", "practicality", "direction", "goals", "manifestation"],
      sacredGeometry: "Cube - The solid foundation of material existence",
      planet: "Saturn",
      astrologicalSign: "Capricorn",
      elementalAffinity:
        "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding force that brings focus to material concerns.",
      numerologicalSignificance:
        "As a number 47 card (reducing to 11, then to 2: 4+7=11, 1+1=2), it embodies duality, partnership, and the balance between material focus and spiritual purpose.",
    },
    secondEnd: {
      number: 74,
      meaning:
        "Material focus, practical direction, and physical goals. This card indicates the ability to direct your physical energy with precision, focus on tangible objectives, and pursue material goals with determination and groundedness.",
      keywords: ["focus", "practicality", "direction", "goals", "manifestation"],
      sacredGeometry: "Octahedron - The balance of above and below",
      planet: "Venus",
      astrologicalSign: "Taurus",
      elementalAffinity:
        "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding force that brings focus to material concerns.",
      numerologicalSignificance:
        "As a number 74 card (reducing to 11, then to 2: 7+4=11, 1+1=2), it embodies duality, partnership, and the balance between material focus and spiritual purpose.",
    },
    firstEndImage: "/cards/47spear-earth.jpg",
    secondEndImage: "/cards/74spear-earth.jpg",
  },
  {
    id: "spear-fire-47",
    name: "Spear of Fire",
    element: "Fire",
    type: "Spear",
    firstEnd: {
      number: 47,
      meaning:
        "Passionate focus, creative direction, and transformative goals. This card indicates the ability to direct your creative energy with precision, focus on inspirational objectives, and pursue transformative goals with determination and enthusiasm.",
      keywords: ["focus", "passion", "direction", "creativity", "transformation"],
      sacredGeometry: "Tetrahedron - The simplest regular solid, representing fire",
      planet: "Mars",
      astrologicalSign: "Aries",
      elementalAffinity:
        "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the catalyzing force that brings focus to creative endeavors.",
      numerologicalSignificance:
        "As a number 47 card (reducing to 11, then to 2: 4+7=11, 1+1=2), it embodies duality, partnership, and the balance between creative focus and practical application.",
    },
    secondEnd: {
      number: 74,
      meaning:
        "Passionate focus, creative direction, and transformative goals. This card indicates the ability to direct your creative energy with precision, focus on inspirational objectives, and pursue transformative goals with determination and enthusiasm.",
      keywords: ["focus", "passion", "direction", "creativity", "transformation"],
      sacredGeometry: "Star Tetrahedron - The interlocking of two tetrahedrons, representing balanced fire energy",
      planet: "Sun",
      astrologicalSign: "Leo",
      elementalAffinity:
        "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the catalyzing force that brings focus to creative endeavors.",
      numerologicalSignificance:
        "As a number 74 card (reducing to 11, then to 2: 7+4=11, 1+1=2), it embodies duality, partnership, and the balance between creative focus and practical application.",
    },
    firstEndImage: "/cards/47spear-fire.jpg",
    secondEndImage: "/cards/74spear-fire.jpg",
  },
  {
    id: "spear-water-47",
    name: "Spear of Water",
    element: "Water",
    type: "Spear",
    firstEnd: {
      number: 47,
      meaning:
        "Emotional focus, intuitive direction, and relational goals. This card indicates the ability to direct your emotional energy with precision, focus on intuitive objectives, and pursue relationship goals with determination and sensitivity.",
      keywords: ["focus", "emotion", "direction", "intuition", "relationships"],
      sacredGeometry: "Icosahedron - The twenty-faced solid associated with water",
      planet: "Moon",
      astrologicalSign: "Cancer",
      elementalAffinity:
        "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the flowing force that brings focus to emotional matters.",
      numerologicalSignificance:
        "As a number 47 card (reducing to 11, then to 2: 4+7=11, 1+1=2), it embodies duality, partnership, and the balance between emotional focus and rational understanding.",
    },
    secondEnd: {
      number: 74,
      meaning:
        "Emotional focus, intuitive direction, and relational goals. This card indicates the ability to direct your emotional energy with precision, focus on intuitive objectives, and pursue relationship goals with determination and sensitivity.",
      keywords: ["focus", "emotion", "direction", "intuition", "relationships"],
      sacredGeometry: "Spiral - The inward journey to the center of being",
      planet: "Neptune",
      astrologicalSign: "Pisces",
      elementalAffinity:
        "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the flowing force that brings focus to emotional matters.",
      numerologicalSignificance:
        "As a number 74 card (reducing to 11, then to 2: 7+4=11, 1+1=2), it embodies duality, partnership, and the balance between emotional focus and rational understanding.",
    },
    firstEndImage: "/cards/47spear-water.jpg",
    secondEndImage: "/cards/74spear-water.jpg",
  },
  {
    id: "spear-air-47",
    name: "Spear of Air",
    element: "Air",
    type: "Spear",
    firstEnd: {
      number: 47,
      meaning:
        "Mental focus, directed communication, and intellectual goals. This card indicates the ability to direct your mental energy with precision, focus on communicative objectives, and pursue intellectual goals with determination and clarity.",
      keywords: ["focus", "intellect", "direction", "communication", "clarity"],
      sacredGeometry: "Octahedron - The eight-faced solid associated with air",
      planet: "Mercury",
      astrologicalSign: "Gemini",
      elementalAffinity:
        "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the swift and penetrating nature of thought that brings focus to mental pursuits.",
      numerologicalSignificance:
        "As a number 47 card (reducing to 11, then to 2: 4+7=11, 1+1=2), it embodies duality, partnership, and the balance between intellectual focus and emotional understanding.",
    },
    secondEnd: {
      number: 74,
      meaning:
        "Mental focus, directed communication, and intellectual goals. This card indicates the ability to direct your mental energy with precision, focus on communicative objectives, and pursue intellectual goals with determination and clarity.",
      keywords: ["focus", "intellect", "direction", "communication", "clarity"],
      sacredGeometry: "Double Spiral - The balance of inward and outward movement",
      planet: "Uranus",
      astrologicalSign: "Aquarius",
      elementalAffinity:
        "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the swift and penetrating nature of thought that brings focus to mental pursuits.",
      numerologicalSignificance:
        "As a number 74 card (reducing to 11, then to 2: 7+4=11, 1+1=2), it embodies duality, partnership, and the balance between intellectual focus and emotional understanding.",
    },
    firstEndImage: "/cards/47spear-air.jpg",
    secondEndImage: "/cards/74spear-air.jpg",
  },
  {
    id: "spear-spirit-47",
    name: "Spear of Spirit",
    element: "Spirit",
    type: "Spear",
    firstEnd: {
      number: 47,
      meaning:
        "Spiritual focus, divine direction, and soul-aligned goals. This card indicates the ability to direct your spiritual energy with precision, focus on divine objectives, and pursue soul-aligned goals with determination and higher awareness.",
      keywords: ["focus", "spirit", "direction", "divinity", "purpose"],
      sacredGeometry: "Merkaba - The vehicle of light for ascension",
      planet: "Jupiter",
      astrologicalSign: "Sagittarius",
      elementalAffinity:
        "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the transcendent force that brings focus to spiritual matters.",
      numerologicalSignificance:
        "As a number 47 card (reducing to 11, then to 2: 4+7=11, 1+1=2), it embodies duality, partnership, and the balance between spiritual focus and material manifestation.",
    },
    secondEnd: {
      number: 74,
      meaning:
        "Spiritual focus, divine direction, and soul-aligned goals. This card indicates the ability to direct your spiritual energy with precision, focus on divine objectives, and pursue soul-aligned goals with determination and higher awareness.",
      keywords: ["focus", "spirit", "direction", "divinity", "purpose"],
      sacredGeometry: "Dodecahedron - The cosmic container of all possibilities",
      planet: "Pluto",
      astrologicalSign: "Scorpio",
      elementalAffinity:
        "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the transcendent force that brings focus to spiritual matters.",
      numerologicalSignificance:
        "As a number 74 card (reducing to 11, then to 2: 7+4=11, 1+1=2), it embodies duality, partnership, and the balance between spiritual focus and material manifestation.",
    },
    firstEndImage: "/cards/47spear-spirit.jpg",
    secondEndImage: "/cards/74spear-spirit.jpg",
  },

  // Stone Series
  {
    id: "stone-earth-69",
    name: "Stone of Earth",
    element: "Earth",
    type: "Stone",
    firstEnd: {
      number: 69,
      meaning:
        "Material foundation, physical stability, and grounded presence. This card indicates a strong connection to the physical world, providing a solid foundation for material growth and tangible achievements.",
      keywords: ["foundation", "stability", "grounding", "material", "presence"],
      sacredGeometry: "Cube - The solid foundation of material existence",
      planet: "Saturn",
      astrologicalSign: "Capricorn",
      elementalAffinity:
        "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding force that anchors spiritual energy in physical form.",
      numerologicalSignificance:
        "As a number 69 card (reducing to 15, then to 6: 6+9=15, 1+5=6), it embodies harmony, responsibility, and nurturing of material resources and physical well-being.",
    },
    secondEnd: {
      number: 96,
      meaning:
        "Material foundation, physical stability, and grounded presence. This card indicates a strong connection to the physical world, providing a solid foundation for material growth and tangible achievements.",
      keywords: ["foundation", "stability", "grounding", "material", "presence"],
      sacredGeometry: "Hexahedron - The six-faced cube representing earth",
      planet: "Venus",
      astrologicalSign: "Taurus",
      elementalAffinity:
        "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding force that anchors spiritual energy in physical form.",
      numerologicalSignificance:
        "As a number 96 card (reducing to 15, then to 6: 9+6=15, 1+5=6), it embodies harmony, responsibility, and nurturing of material resources and physical well-being.",
    },
    firstEndImage: "/cards/69stone-earth.jpg",
    secondEndImage: "/cards/96stone-earth.jpg",
  },
  {
    id: "stone-fire-69",
    name: "Stone of Fire",
    element: "Fire",
    type: "Stone",
    firstEnd: {
      number: 69,
      meaning:
        "Passionate foundation, creative stability, and transformative presence. This card indicates a strong connection to your creative and spiritual fire, providing a solid foundation for inspiration and transformation.",
      keywords: ["foundation", "passion", "creativity", "transformation", "presence"],
      sacredGeometry: "Tetrahedron - The simplest regular solid, representing fire",
      planet: "Mars",
      astrologicalSign: "Aries",
      elementalAffinity:
        "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the stabilizing force within the dynamic energy of fire.",
      numerologicalSignificance:
        "As a number 69 card (reducing to 15, then to 6: 6+9=15, 1+5=6), it embodies harmony, responsibility, and nurturing of creative gifts and transformative processes.",
    },
    secondEnd: {
      number: 96,
      meaning:
        "Passionate foundation, creative stability, and transformative presence. This card indicates a strong connection to your creative and spiritual fire, providing a solid foundation for inspiration and transformation.",
      keywords: ["foundation", "passion", "creativity", "transformation", "presence"],
      sacredGeometry: "Star Tetrahedron - The interlocking of two tetrahedrons, representing balanced fire energy",
      planet: "Sun",
      astrologicalSign: "Leo",
      elementalAffinity:
        "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the stabilizing force within the dynamic energy of fire.",
      numerologicalSignificance:
        "As a number 96 card (reducing to 15, then to 6: 9+6=15, 1+5=6), it embodies harmony, responsibility, and nurturing of creative gifts and transformative processes.",
    },
    firstEndImage: "/cards/69stone-fire.jpg",
    secondEndImage: "/cards/96stone-fire.jpg",
  },
  {
    id: "stone-water-69",
    name: "Stone of Water",
    element: "Water",
    type: "Stone",
    firstEnd: {
      number: 69,
      meaning:
        "Emotional foundation, intuitive stability, and flowing presence. This card indicates a strong connection to your emotional wisdom and intuition, providing a solid foundation for relationships and psychic awareness.",
      keywords: ["foundation", "emotion", "intuition", "relationships", "flow"],
      sacredGeometry: "Icosahedron - The twenty-faced solid associated with water",
      planet: "Moon",
      astrologicalSign: "Cancer",
      elementalAffinity:
        "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the anchoring force within the flowing energy of water.",
      numerologicalSignificance:
        "As a number 69 card (reducing to 15, then to 6: 6+9=15, 1+5=6), it embodies harmony, responsibility, and nurturing of emotional connections and intuitive gifts.",
    },
    secondEnd: {
      number: 96,
      meaning:
        "Emotional foundation, intuitive stability, and flowing presence. This card indicates a strong connection to your emotional wisdom and intuition, providing a solid foundation for relationships and psychic awareness.",
      keywords: ["foundation", "emotion", "intuition", "relationships", "flow"],
      sacredGeometry: "Spiral - The inward journey to the center of being",
      planet: "Neptune",
      astrologicalSign: "Pisces",
      elementalAffinity:
        "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the anchoring force within the flowing energy of water.",
      numerologicalSignificance:
        "As a number 96 card (reducing to 15, then to 6: 9+6=15, 1+5=6), it embodies harmony, responsibility, and nurturing of emotional connections and intuitive gifts.",
    },
    firstEndImage: "/cards/69stone-water.jpg",
    secondEndImage: "/cards/96stone-water.jpg",
  },
  {
    id: "stone-air-69",
    name: "Stone of Air",
    element: "Air",
    type: "Stone",
    firstEnd: {
      number: 69,
      meaning:
        "Mental foundation, intellectual stability, and communicative presence. This card indicates a strong connection to your mental wisdom and communicative abilities, providing a solid foundation for learning and sharing knowledge.",
      keywords: ["foundation", "intellect", "communication", "ideas", "clarity"],
      sacredGeometry: "Octahedron - The eight-faced solid associated with air",
      planet: "Mercury",
      astrologicalSign: "Gemini",
      elementalAffinity:
        "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the anchoring force within the swift energy of air.",
      numerologicalSignificance:
        "As a number 69 card (reducing to 15, then to 6: 6+9=15, 1+5=6), it embodies harmony, responsibility, and nurturing of intellectual gifts and communicative abilities.",
    },
    secondEnd: {
      number: 96,
      meaning:
        "Mental foundation, intellectual stability, and communicative presence. This card indicates a strong connection to your mental wisdom and communicative abilities, providing a solid foundation for learning and sharing knowledge.",
      keywords: ["foundation", "intellect", "communication", "ideas", "clarity"],
      sacredGeometry: "Double Spiral - The balance of inward and outward movement",
      planet: "Uranus",
      astrologicalSign: "Aquarius",
      elementalAffinity:
        "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the anchoring force within the swift energy of air.",
      numerologicalSignificance:
        "As a number 96 card (reducing to 15, then to 6: 9+6=15, 1+5=6), it embodies harmony, responsibility, and nurturing of intellectual gifts and communicative abilities.",
    },
    firstEndImage: "/cards/69stone-air.jpg",
    secondEndImage: "/cards/96stone-air.jpg",
  },
  {
    id: "stone-spirit-69",
    name: "Stone of Spirit",
    element: "Spirit",
    type: "Stone",
    firstEnd: {
      number: 69,
      meaning:
        "Spiritual foundation, divine stability, and soul presence. This card indicates a strong connection to your higher self and spiritual purpose, providing a solid foundation for your spiritual journey and growth.",
      keywords: ["foundation", "spirit", "divinity", "purpose", "presence"],
      sacredGeometry: "Merkaba - The vehicle of light for ascension",
      planet: "Jupiter",
      astrologicalSign: "Sagittarius",
      elementalAffinity:
        "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the anchoring force within the transcendent energy of spirit.",
      numerologicalSignificance:
        "As a number 69 card (reducing to 15, then to 6: 6+9=15, 1+5=6), it embodies harmony, responsibility, and nurturing of spiritual connections and divine purpose.",
    },
    secondEnd: {
      number: 96,
      meaning:
        "Spiritual foundation, divine stability, and soul presence. This card indicates a strong connection to your higher self and spiritual purpose, providing a solid foundation for your spiritual journey and growth.",
      keywords: ["foundation", "spirit", "stability", "presence", "connection"],
      sacredGeometry: "Dodecahedron - The cosmic container of all possibilities",
      planet: "Pluto",
      astrologicalSign: "Scorpio",
      elementalAffinity:
        "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the quintessence that transcends and unifies.",
      numerologicalSignificance:
        "As a number 96 card (reducing to 15, then to 6: 9+6=15, 1+5=6), it embodies harmony, responsibility, and nurturing of spiritual connections and community.",
    },
    firstEndImage: "/cards/69stone-spirit.jpg",
    secondEndImage: "/cards/96stone-spirit.jpg",
  },

  // Cord Series
  {
    id: "cord-earth-38",
    name: "Cord of Earth",
    element: "Earth",
    type: "Cord",
    firstEnd: {
      number: 38,
      meaning:
        "Material connection, physical bonds, and tangible relationships. This card indicates important connections in the material world, whether to people, places, or possessions, that provide grounding and stability in your life.",
      keywords: ["connection", "material", "bonds", "stability", "attachment"],
      sacredGeometry: "Cube - The solid foundation of material existence",
      planet: "Saturn",
      astrologicalSign: "Capricorn",
      elementalAffinity:
        "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding connections that anchor us in physical reality.",
      numerologicalSignificance:
        "As a number 38 card (reducing to 11, then to 2: 3+8=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the material realm.",
    },
    secondEnd: {
      number: 83,
      meaning:
        "Material connection, physical bonds, and tangible relationships. This card indicates important connections in the material world, whether to people, places, or possessions, that provide grounding and stability in your life.",
      keywords: ["connection", "material", "bonds", "stability", "attachment"],
      sacredGeometry: "Hexahedron - The six-faced cube representing earth",
      planet: "Venus",
      astrologicalSign: "Taurus",
      elementalAffinity:
        "Connected to the Earth element, this card resonates with stability, abundance, and practical matters. It represents the grounding connections that anchor us in physical reality.",
      numerologicalSignificance:
        "As a number 83 card (reducing to 11, then to 2: 8+3=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the material realm.",
    },
    firstEndImage: "/cards/38cord-earth.jpg",
    secondEndImage: "/cards/83cord-earth.jpg",
  },
  {
    id: "cord-fire-38",
    name: "Cord of Fire",
    element: "Fire",
    type: "Cord",
    firstEnd: {
      number: 38,
      meaning:
        "Passionate connection, creative bonds, and transformative relationships. This card indicates important connections fueled by shared passion, creativity, or spiritual growth, that inspire and transform you.",
      keywords: ["connection", "passion", "creativity", "transformation", "inspiration"],
      sacredGeometry: "Tetrahedron - The simplest regular solid, representing fire",
      planet: "Mars",
      astrologicalSign: "Aries",
      elementalAffinity:
        "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the inspiring connections that fuel our growth and transformation.",
      numerologicalSignificance:
        "As a number 38 card (reducing to 11, then to 2: 3+8=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of passion and creativity.",
    },
    secondEnd: {
      number: 83,
      meaning:
        "Passionate connection, creative bonds, and transformative relationships. This card indicates important connections fueled by shared passion, creativity, or spiritual growth, that inspire and transform you.",
      keywords: ["connection", "passion", "creativity", "transformation", "inspiration"],
      sacredGeometry: "Star Tetrahedron - The interlocking of two tetrahedrons, representing balanced fire energy",
      planet: "Sun",
      astrologicalSign: "Leo",
      elementalAffinity:
        "Connected to the Fire element, this card resonates with passion, creativity, transformation, and spiritual awakening. It represents the inspiring connections that fuel our growth and transformation.",
      numerologicalSignificance:
        "As a number 83 card (reducing to 11, then to 2: 8+3=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of passion and creativity.",
    },
    firstEndImage: "/cards/38cord-fire.jpg",
    secondEndImage: "/cards/83cord-fire.jpg",
  },
  {
    id: "cord-water-38",
    name: "Cord of Water",
    element: "Water",
    type: "Cord",
    firstEnd: {
      number: 38,
      meaning:
        "Emotional connection, intuitive bonds, and flowing relationships. This card indicates important connections based on emotional resonance, intuitive understanding, or psychic links, that nurture and support your emotional well-being.",
      keywords: ["connection", "emotion", "intuition", "flow", "nurturing"],
      sacredGeometry: "Icosahedron - The twenty-faced solid associated with water",
      planet: "Moon",
      astrologicalSign: "Cancer",
      elementalAffinity:
        "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the nurturing connections that support our emotional well-being.",
      numerologicalSignificance:
        "As a number 38 card (reducing to 11, then to 2: 3+8=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of emotions and intuition.",
    },
    secondEnd: {
      number: 83,
      meaning:
        "Emotional connection, intuitive bonds, and flowing relationships. This card indicates important connections based on emotional resonance, intuitive understanding, or psychic links, that nurture and support your emotional well-being.",
      keywords: ["connection", "emotion", "intuition", "flow", "nurturing"],
      sacredGeometry: "Spiral - The inward journey to the center of being",
      planet: "Neptune",
      astrologicalSign: "Pisces",
      elementalAffinity:
        "Connected to the Water element, this card resonates with emotions, intuition, relationships, and the subconscious mind. It represents the nurturing connections that support our emotional well-being.",
      numerologicalSignificance:
        "As a number 83 card (reducing to 11, then to 2: 8+3=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of emotions and intuition.",
    },
    firstEndImage: "/cards/38cord-water.jpg",
    secondEndImage: "/cards/83cord-water.jpg",
  },
  {
    id: "cord-air-38",
    name: "Cord of Air",
    element: "Air",
    type: "Cord",
    firstEnd: {
      number: 38,
      meaning:
        "Mental connection, communicative bonds, and intellectual relationships. This card indicates important connections based on shared ideas, communication, or learning, that stimulate and expand your mind.",
      keywords: ["connection", "intellect", "communication", "ideas", "learning"],
      sacredGeometry: "Octahedron - The eight-faced solid associated with air",
      planet: "Mercury",
      astrologicalSign: "Gemini",
      elementalAffinity:
        "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the stimulating connections that expand our understanding and perspective.",
      numerologicalSignificance:
        "As a number 38 card (reducing to 11, then to 2: 3+8=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of thought and communication.",
    },
    secondEnd: {
      number: 83,
      meaning:
        "Mental connection, communicative bonds, and intellectual relationships. This card indicates important connections based on shared ideas, communication, or learning, that stimulate and expand your mind.",
      keywords: ["connection", "intellect", "communication", "ideas", "learning"],
      sacredGeometry: "Double Spiral - The balance of inward and outward movement",
      planet: "Uranus",
      astrologicalSign: "Aquarius",
      elementalAffinity:
        "Connected to the Air element, this card resonates with intellect, communication, ideas, and mental clarity. It represents the stimulating connections that expand our understanding and perspective.",
      numerologicalSignificance:
        "As a number 83 card (reducing to 11, then to 2: 8+3=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of thought and communication.",
    },
    firstEndImage: "/cards/38cord-air.jpg",
    secondEndImage: "/cards/83cord-air.jpg",
  },
  {
    id: "cord-spirit-38",
    name: "Cord of Spirit",
    element: "Spirit",
    type: "Cord",
    firstEnd: {
      number: 38,
      meaning:
        "Spiritual connection, divine bonds, and soul relationships. This card indicates important connections based on shared spiritual paths, soul recognition, or divine purpose, that elevate and align you with your highest self.",
      keywords: ["connection", "spirit", "divinity", "soul", "purpose"],
      sacredGeometry: "Merkaba - The vehicle of light for ascension",
      planet: "Jupiter",
      astrologicalSign: "Sagittarius",
      elementalAffinity:
        "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the transcendent connections that unite us beyond the physical realm.",
      numerologicalSignificance:
        "As a number 38 card (reducing to 11, then to 2: 3+8=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of spirit and divine purpose.",
    },
    secondEnd: {
      number: 83,
      meaning:
        "Spiritual connection, divine bonds, and soul relationships. This card indicates important connections based on shared spiritual paths, soul recognition, or divine purpose, that elevate and align you with your highest self.",
      keywords: ["connection", "spirit", "divinity", "soul", "purpose"],
      sacredGeometry: "Dodecahedron - The cosmic container of all possibilities",
      planet: "Pluto",
      astrologicalSign: "Scorpio",
      elementalAffinity:
        "Connected to the Spirit element, this card resonates with divine connection, higher consciousness, and the integration of all elements. It represents the transcendent connections that unite us beyond the physical realm.",
      numerologicalSignificance:
        "As a number 83 card (reducing to 11, then to 2: 8+3=11, 1+1=2), it embodies duality, partnership, and the balance between independence and connection in the realm of spirit and divine purpose.",
    },
    firstEndImage: "/cards/38cord-spirit.jpg",
    secondEndImage: "/cards/83cord-spirit.jpg",
  },
]
