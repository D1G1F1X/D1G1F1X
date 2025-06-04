export type NumberData = {
  number: number
  title: string
  description: string
  numerologyMeaning: string
  planetaryRuler: {
    name: string
    description: string
  }
  astrologicalSign: {
    name: string
    description: string
  }
  elementalPower: {
    name: string
    description: string
    color: string
  }
  visualSymbolism: string
  pairedWith: number
  pairName: string
  pairDescription: string
  keywords: string[]
}

export const numberData: NumberData[] = [
  {
    number: 0,
    title: "Infinite Potential",
    description: "The void from which all creation emerges and to which all things return.",
    numerologyMeaning:
      "In numerology, 0 is the number of infinite potential and the unmanifested, representing the beginning of the creative cycle. It is the ultimate symbol of the unknown, the void, and the space that holds all possibilities.",
    planetaryRuler: {
      name: "Pluto",
      description:
        "Pluto represents the unseen forces that govern creation and destruction, much like 0, which embodies the invisible, infinite potential from which all things emerge.",
    },
    astrologicalSign: {
      name: "Scorpio",
      description:
        "Scorpio's energy reflects 0's potential for profound change and rebirth, as well as the mysteries of life and death.",
    },
    elementalPower: {
      name: "Spirit",
      description:
        "Spirit represents the essence of life, the divine consciousness that flows through all things. As the element of Spirit, 0 symbolizes the unmanifest, the force that connects all living beings to the divine source of creation.",
      color: "purple",
    },
    visualSymbolism:
      "A circle, symbolizing infinity, potential, and nothingness. It has no beginning or end, representing the cosmic void from which everything is created.",
    pairedWith: 1,
    pairName: "The Cauldron",
    pairDescription:
      "Together, 0 and 1 form the Cauldron, a powerful symbol of the dynamic process of creation, where infinite potential (0) transforms into manifestation (1).",
    keywords: ["Potential", "Void", "Infinity", "Wholeness", "Divine Source"],
  },
  {
    number: 1,
    title: "First Manifestation",
    description: "The first act of creation, the initial spark that brings things into form.",
    numerologyMeaning:
      "In numerology, 1 is the number of new beginnings, individuality, and creation. It symbolizes self-reliance, assertiveness, and the ability to take initiative.",
    planetaryRuler: {
      name: "The Sun",
      description:
        "The Sun represents vitality, self-expression, and personal power, aligning perfectly with the energy of 1, which is about leadership and the power to create.",
    },
    astrologicalSign: {
      name: "Leo",
      description:
        "Leo embodies the qualities of 1, such as boldness, strength, and the desire to lead and express oneself fully.",
    },
    elementalPower: {
      name: "Fire",
      description:
        "Fire is the force that transforms potential into reality, much like 1's energy, which ignites the creative process. Fire's energy is dynamic, assertive, and powerful.",
      color: "red",
    },
    visualSymbolism: "A straight vertical line, symbolizing the first step into existence, the beginning of creation.",
    pairedWith: 0,
    pairName: "The Cauldron",
    pairDescription:
      "Together, 0 and 1 form the Cauldron, a powerful symbol of the dynamic process of creation, where infinite potential (0) transforms into manifestation (1).",
    keywords: ["Creation", "Leadership", "Initiative", "Independence", "Action"],
  },
  {
    number: 2,
    title: "Balance and Duality",
    description: "The energy of balance, harmony, and partnership between opposing forces.",
    numerologyMeaning:
      "In numerology, 2 symbolizes cooperation, balance, diplomacy, and relationships. It is the number that seeks harmony between opposites, representing duality in life.",
    planetaryRuler: {
      name: "The Moon",
      description:
        "The Moon influences emotions, intuition, and cycles. It reflects the energy of 2 by representing the ebb and flow of life's emotional tides.",
    },
    astrologicalSign: {
      name: "Cancer",
      description:
        "Cancer's energy mirrors the qualities of 2, with its deep sensitivity and desire to protect and care for loved ones.",
    },
    elementalPower: {
      name: "Air",
      description:
        "Air symbolizes intellect, communication, and the flow of ideas. Air represents balance in the realm of thought and decision-making.",
      color: "lightblue",
    },
    visualSymbolism:
      "A curve that gracefully bends, representing balance, partnership, and duality. Its form is fluid, symbolizing stability and harmony between two forces.",
    pairedWith: 5,
    pairName: "The Sword",
    pairDescription:
      "Together, 2 and 5 form the Sword, symbolizing the balance between stability and transformation, duality and change.",
    keywords: ["Balance", "Partnership", "Harmony", "Diplomacy", "Duality"],
  },
  {
    number: 3,
    title: "Creativity and Expression",
    description: "The energy of creativity, self-expression, and joyful expansion.",
    numerologyMeaning:
      "In numerology, 3 is the number of creativity, communication, and expression. It embodies the energy of artistic endeavors, social interaction, and joyful expansion.",
    planetaryRuler: {
      name: "Jupiter",
      description: "Jupiter's energy aligns with the qualities of 3, symbolizing growth, generosity, and optimism.",
    },
    astrologicalSign: {
      name: "Sagittarius",
      description:
        "Sagittarius embodies the expansive and optimistic qualities of 3, constantly seeking new experiences and ideas to explore.",
    },
    elementalPower: {
      name: "Fire",
      description:
        "Fire's energy fuels 3's desire for expression and expansion, driving individuals to bring their ideas and talents into the world.",
      color: "orange",
    },
    visualSymbolism:
      "Formed by two open curves stacked together, symbolizing creativity, growth, and expression. Its open form suggests expansion and the outward flow of ideas and energy.",
    pairedWith: 8,
    pairName: "The Cord",
    pairDescription:
      "Together, 3 and 8 form the Cord, representing the connection between creativity and infinity, time and destiny.",
    keywords: ["Creativity", "Expression", "Joy", "Communication", "Growth"],
  },
  {
    number: 4,
    title: "Structure and Foundation",
    description: "The energy of stability, order, and building solid foundations.",
    numerologyMeaning:
      "In numerology, 4 symbolizes discipline, structure, and reliability. It is the number associated with hard work, practicality, and the ability to build strong foundations for future success.",
    planetaryRuler: {
      name: "Uranus",
      description:
        "Uranus helps 4 bring innovation and forward-thinking ideas into the frameworks it builds, ensuring that the structures created are adaptable and suited for future growth.",
    },
    astrologicalSign: {
      name: "Aquarius",
      description:
        "Aquarius embodies the qualities of 4, particularly its disciplined approach to creating systems that benefit society as a whole.",
    },
    elementalPower: {
      name: "Earth",
      description:
        "Earth's energy provides the foundation for 4's work, helping to create strong, lasting structures. Earth is the element of practicality and physical manifestation.",
      color: "green",
    },
    visualSymbolism:
      "Composed of straight lines and right angles, reflecting stability, order, and structure. Its square-like shape symbolizes a solid foundation.",
    pairedWith: 7,
    pairName: "The Spear",
    pairDescription:
      "Together, 4 and 7 form the Spear, symbolizing the balance between material stability and spiritual ascension.",
    keywords: ["Structure", "Foundation", "Stability", "Order", "Practicality"],
  },
  {
    number: 5,
    title: "Freedom and Change",
    description: "The energy of movement, change, and freedom from limitations.",
    numerologyMeaning:
      "In numerology, 5 symbolizes freedom, versatility, curiosity, and change. It is the number of adventure and exploration, constantly seeking new horizons and opportunities for growth.",
    planetaryRuler: {
      name: "Mercury",
      description:
        "Mercury's energy aligns with 5's dynamic nature, symbolizing the ability to move freely between different realms, ideas, and experiences.",
    },
    astrologicalSign: {
      name: "Gemini",
      description:
        "Gemini's energy mirrors the versatility of 5, constantly seeking new experiences and engaging in the world with a curious, restless spirit.",
    },
    elementalPower: {
      name: "Fire",
      description:
        "Fire represents action, change, and the desire to break free from limitations, much like the energy of 5. Fire's power fuels 5's adventurous spirit.",
      color: "red",
    },
    visualSymbolism:
      "A reflection of 2 flipped along the x-axis. Its upper curve mirrors 2's, while the lower part straightens into a line, symbolizing freedom, movement, and change.",
    pairedWith: 2,
    pairName: "The Sword",
    pairDescription:
      "Together, 2 and 5 form the Sword, symbolizing the balance between stability and transformation, duality and change.",
    keywords: ["Freedom", "Change", "Adventure", "Versatility", "Movement"],
  },
  {
    number: 6,
    title: "Nurturing and Responsibility",
    description: "The energy of care, love, and responsibility toward others.",
    numerologyMeaning:
      "In numerology, 6 represents responsibility, nurturing, family, and harmony. It is the number of the caretaker, emphasizing love, compassion, and the desire to create stable, supportive environments.",
    planetaryRuler: {
      name: "Venus",
      description:
        "Venus's energy aligns perfectly with the nurturing and harmonious qualities of 6, representing affection, relationships, and the desire to create a peaceful and loving environment.",
    },
    astrologicalSign: {
      name: "Taurus",
      description:
        "Taurus is focused on comfort, security, and providing for loved ones, much like 6's energy, which seeks to create a supportive and protective environment.",
    },
    elementalPower: {
      name: "Earth",
      description:
        "Earth's energy provides the foundation for 6's role as a caretaker, offering a solid base upon which growth and security can flourish.",
      color: "green",
    },
    visualSymbolism:
      "Forms a nurturing, protective spiral, symbolizing care, responsibility, and the act of providing for growth. Its open form suggests a cradle, offering support and nurturing energy.",
    pairedWith: 9,
    pairName: "The Stone",
    pairDescription:
      "Together, 6 and 9 form the Stone, symbolizing the natural cycle of nurturing, growth, and fulfillment.",
    keywords: ["Nurturing", "Responsibility", "Harmony", "Family", "Service"],
  },
  {
    number: 7,
    title: "Spiritual Insight and Growth",
    description: "The energy of seeking truth, inner growth, and exploring the mysteries of the universe.",
    numerologyMeaning:
      "In numerology, 7 symbolizes wisdom, spirituality, and introspection. It is the number of the seeker, always looking for deeper truths and understanding.",
    planetaryRuler: {
      name: "Neptune",
      description:
        "Neptune's energy aligns with the qualities of 7, emphasizing the need for introspection, meditation, and spiritual growth.",
    },
    astrologicalSign: {
      name: "Pisces",
      description:
        "Pisces embodies the qualities of 7, with its deep connection to the unseen and its intuitive understanding of the world.",
    },
    elementalPower: {
      name: "Water",
      description:
        "Water's energy helps 7 connect with the spiritual realm, guiding it to explore the deeper, more mystical aspects of existence.",
      color: "blue",
    },
    visualSymbolism:
      "Has a sharp diagonal line that points upward, symbolizing spiritual insight, exploration, and the pursuit of higher knowledge. 7's form mirrors the upward thrust of a spear.",
    pairedWith: 4,
    pairName: "The Spear",
    pairDescription:
      "Together, 4 and 7 form the Spear, symbolizing the balance between material stability and spiritual ascension.",
    keywords: ["Spirituality", "Wisdom", "Introspection", "Analysis", "Mystery"],
  },
  {
    number: 8,
    title: "Power and Infinity",
    description: "The energy of power, balance, and the infinite cycle of life.",
    numerologyMeaning:
      "In numerology, 8 symbolizes power, authority, balance, and infinite cycles. It is often associated with success, leadership, and the ability to manifest wealth and abundance.",
    planetaryRuler: {
      name: "Saturn",
      description:
        "Saturn's energy aligns with the qualities of 8, symbolizing the importance of hard work, persistence, and maintaining balance.",
    },
    astrologicalSign: {
      name: "Capricorn",
      description:
        "Capricorn embodies the qualities of 8, emphasizing the importance of hard work, perseverance, and the mastery of one's environment.",
    },
    elementalPower: {
      name: "Earth",
      description:
        "Earth's energy grounds 8's power, giving it the foundation to manifest success and achieve long-term goals.",
      color: "green",
    },
    visualSymbolism:
      "A closed, symmetrical figure, representing infinity, balance, and the eternal cycle. Where 3 is open and expansive, 8 is complete and continuous, symbolizing the infinite flow of energy that never ends.",
    pairedWith: 3,
    pairName: "The Cord",
    pairDescription:
      "Together, 3 and 8 form the Cord, representing the connection between creativity and infinity, time and destiny.",
    keywords: ["Power", "Infinity", "Balance", "Success", "Mastery"],
  },
  {
    number: 9,
    title: "Fulfillment and Completion",
    description: "The energy of fulfillment, wisdom, and the completion of cycles.",
    numerologyMeaning:
      "In numerology, 9 symbolizes completion, humanitarianism, wisdom, and transformation. It is the number of fulfillment and the end of a journey, representing the attainment of goals and the wisdom gained along the way.",
    planetaryRuler: {
      name: "Mars",
      description:
        "Mars's energy aligns with 9's drive toward completion and fulfillment, pushing it to achieve goals and bring cycles to a successful close.",
    },
    astrologicalSign: {
      name: "Aries",
      description:
        "Aries embodies the qualities of 9, representing the courage and drive to pursue goals to completion.",
    },
    elementalPower: {
      name: "Fire",
      description:
        "Fire's energy fuels 9's drive toward fulfillment, providing the passion and strength needed to finish cycles and bring about renewal.",
      color: "red",
    },
    visualSymbolism:
      "Mirrors 6 but curves upward, representing completion, fulfillment, and the culmination of a journey. 9's upward spiral symbolizes the completion of what was nurtured in 6.",
    pairedWith: 6,
    pairName: "The Stone",
    pairDescription:
      "Together, 6 and 9 form the Stone, symbolizing the natural cycle of nurturing, growth, and fulfillment.",
    keywords: ["Completion", "Fulfillment", "Wisdom", "Transformation", "Humanitarianism"],
  },
]

// Export the number meanings in the format expected by the application
export const numberMeanings = numberData.reduce(
  (acc, data) => {
    acc[data.number] = {
      title: data.title,
      description: data.description,
      meaning: data.numerologyMeaning,
      keywords: data.keywords,
    }
    return acc
  },
  {} as Record<number, { title: string; description: string; meaning: string; keywords: string[] }>,
)
