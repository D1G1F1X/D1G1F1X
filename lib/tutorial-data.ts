export const tutorialData = [
  {
    slug: "introduction",
    title: "Introduction to Numoracle",
    content: `
      <p>Welcome to the Numoracle tutorial! This guide will help you understand the basics of numerology and how to use the Numoracle deck.</p>
      <p>Numerology is the study of the mystical relationship between numbers and coinciding events. It's an ancient practice that can offer insights into personality, life path, and future events.</p>
      <p>The Numoracle deck combines traditional numerology with intuitive card reading, providing a unique tool for self-discovery and guidance.</p>
    `,
    visualAids: [{ type: "image", src: "/numerology-diagram.png", alt: "Numerology Diagram" }],
    interactiveElement: null,
  },
  {
    slug: "the-five-elements",
    title: "The Five Elements",
    content: `
      <p>The Numoracle system is built around five core elements: Air, Earth, Fire, Water, and Spirit. Each element represents different aspects of life and energy.</p>
      <ul>
        <li><strong>Air:</strong> Intellect, communication, thoughts, freedom.</li>
        <li><strong>Earth:</strong> Stability, practicality, material world, grounding.</li>
        <li><strong>Fire:</strong> Passion, energy, transformation, action.</li>
        <li><strong>Water:</strong> Emotion, intuition, flow, healing.</li>
        <li><strong>Spirit:</strong> Connection, higher self, universal energy, transcendence.</li>
      </ul>
      <p>Understanding these elements is crucial for interpreting the cards and their influence on your readings.</p>
    `,
    visualAids: [{ type: "image", src: "/elemental-glyphs.png", alt: "Elemental Glyphs" }],
    interactiveElement: null,
  },
  {
    slug: "understanding-the-cards",
    title: "Understanding the Cards",
    content: `
      <p>The Numoracle deck consists of cards representing numbers and elements. Each card has a unique meaning derived from its number and elemental association.</p>
      <p>For example, a '1' card might represent new beginnings, while a '5' could signify change or adventure. When combined with an element, the meaning becomes more specific.</p>
      <p>We will explore the individual meanings of each number and element in detail in later sections.</p>
    `,
    visualAids: [{ type: "image", src: "/mystical-oracle-cards.png", alt: "Mystical Oracle Cards" }],
    interactiveElement: null,
  },
  {
    slug: "performing-a-reading",
    title: "Performing a Reading",
    content: `
      <p>To perform a reading, you typically draw a certain number of cards based on the spread you choose. Each position in the spread has a specific meaning.</p>
      <p>For a simple three-card spread, you might draw cards for Past, Present, and Future. Interpret the cards based on their individual meanings and how they interact with each other in the context of the spread.</p>
      <p>Practice is key to developing your intuition and understanding the nuances of each reading.</p>
    `,
    visualAids: [{ type: "image", src: "/numerology-oracle-spread.png", alt: "Numerology Oracle Spread" }],
    interactiveElement: {
      type: "card-dealer",
      component: "EnhancedCardDealer",
      props: { initialCards: 3 },
    },
  },
  {
    slug: "numerology-basics",
    title: "Numerology Basics",
    content: `
      <p>Dive deeper into the core principles of numerology. Learn how to calculate your Life Path Number, Destiny Number, and Soul Urge Number from your birth date and name.</p>
      <p>These core numbers provide profound insights into your personality, innate talents, and life's purpose.</p>
    `,
    visualAids: [{ type: "image", src: "/numerology-diagram-hero.png", alt: "Numerology Chart" }],
    interactiveElement: {
      type: "numerology-calculator",
      component: "NumerologyCalculator",
      props: {},
    },
  },
  {
    slug: "elemental-dice-readings",
    title: "Elemental Dice Readings",
    content: `
      <p>Explore an alternative method of divination using elemental dice. Roll the dice to gain quick insights into the elemental influences surrounding a situation or question.</p>
      <p>Each die corresponds to one of the five elements, and their combination can reveal a unique energetic blueprint.</p>
    `,
    visualAids: [{ type: "image", src: "/elemental-dice-oracle.png", alt: "Elemental Dice" }],
    interactiveElement: {
      type: "dice-roller",
      component: "ElementalDiceRoller",
      props: {},
    },
  },
  {
    slug: "journaling-and-reflection",
    title: "Journaling and Reflection",
    content: `
      <p>To maximize the benefits of your Numoracle readings, it's highly recommended to keep a journal. Document your readings, your initial interpretations, and how events unfold over time.</p>
      <p>Regular reflection helps you connect the dots, deepen your understanding of the cards and numbers, and track your personal growth journey.</p>
    `,
    visualAids: [{ type: "image", src: "/open-book-knowledge.png", alt: "Open Book" }],
    interactiveElement: null,
  },
  {
    slug: "advanced-spreads",
    title: "Advanced Spreads",
    content: `
      <p>Once you're comfortable with basic readings, you can explore more complex spreads for deeper insights into specific areas of your life, such as relationships, career, or spiritual growth.</p>
      <p>Examples include the Celtic Cross, Relationship Spread, or Year Ahead Spread. Each offers a unique perspective and requires careful interpretation of multiple card positions.</p>
    `,
    visualAids: [{ type: "image", src: "/oracle-card-grid.png", alt: "Card Grid" }],
    interactiveElement: null,
  },
  {
    slug: "quizzes-and-practice",
    title: "Quizzes and Practice",
    content: `
      <p>Test your knowledge and intuition with interactive quizzes. These exercises are designed to reinforce your understanding of card meanings, elemental associations, and numerological principles.</p>
      <p>Regular practice will help you become more confident and proficient in your Numoracle readings.</p>
    `,
    visualAids: [],
    interactiveElement: {
      type: "quiz",
      component: "TutorialQuiz",
      props: {
        quizData: [
          {
            question: "Which element represents intellect and communication?",
            options: ["Earth", "Fire", "Air", "Water"],
            answer: "Air",
          },
          {
            question: "What does the number 1 typically signify in numerology?",
            options: ["Change", "New Beginnings", "Harmony", "Completion"],
            answer: "New Beginnings",
          },
          {
            question: "Which of the following is NOT a core element in Numoracle?",
            options: ["Spirit", "Wood", "Fire", "Earth"],
            answer: "Wood",
          },
        ],
      },
    },
  },
]

export const tutorialNavigation = [
  {
    title: "GETTING STARTED",
    icon: "BookOpen",
    href: "#",
    subsections: [
      { title: "Introduction to Numoracle", icon: "Sparkles", href: "/tutorial/introduction", slug: "introduction" },
    ],
  },
  {
    title: "CORE CONCEPTS",
    icon: "Gem",
    href: "#",
    subsections: [
      { title: "The Five Elements", icon: "Sparkles", href: "/tutorial/the-five-elements", slug: "the-five-elements" },
      {
        title: "Understanding the Cards",
        icon: "Sparkles",
        href: "/tutorial/understanding-the-cards",
        slug: "understanding-the-cards",
      },
      { title: "Numerology Basics", icon: "Sparkles", href: "/tutorial/numerology-basics", slug: "numerology-basics" },
    ],
  },
  {
    title: "PRACTICE & APPLICATION",
    icon: "Rocket",
    href: "#",
    subsections: [
      {
        title: "Performing a Reading",
        icon: "Sparkles",
        href: "/tutorial/performing-a-reading",
        slug: "performing-a-reading",
      },
      {
        title: "Elemental Dice Readings",
        icon: "Sparkles",
        href: "/tutorial/elemental-dice-readings",
        slug: "elemental-dice-readings",
      },
      {
        title: "Journaling and Reflection",
        icon: "Sparkles",
        href: "/tutorial/journaling-and-reflection",
        slug: "journaling-and-reflection",
      },
      { title: "Advanced Spreads", icon: "Sparkles", href: "/tutorial/advanced-spreads", slug: "advanced-spreads" },
      {
        title: "Quizzes and Practice",
        icon: "Sparkles",
        href: "/tutorial/quizzes-and-practice",
        slug: "quizzes-and-practice",
      },
    ],
  },
]

// Helper function to convert array to object format for backward compatibility
export const tutorialContent = tutorialData.reduce(
  (acc, item) => {
    acc[item.slug] = item
    return acc
  },
  {} as Record<string, any>,
)
