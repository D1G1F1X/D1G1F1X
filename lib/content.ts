// Mock database for blog posts

// Add this at the very beginning after the interfaces
console.log("=== CONTENT.TS INITIALIZATION ===")
console.log("Module loading timestamp:", new Date().toISOString())

export const pythagoreanValues: { [key: string]: number } = {
  A: 1,
  J: 1,
  S: 1,
  B: 2,
  K: 2,
  T: 2,
  C: 3,
  L: 3,
  U: 3,
  D: 4,
  M: 4,
  V: 4,
  E: 5,
  N: 5,
  W: 5,
  F: 6,
  O: 6,
  X: 6,
  G: 7,
  P: 7,
  Y: 7,
  H: 8,
  Q: 8,
  Z: 8,
  I: 9,
  R: 9,
}

export const chaldeanValues: { [key: string]: number } = {
  A: 1,
  I: 1,
  J: 1,
  Q: 1,
  Y: 1,
  B: 2,
  K: 2,
  R: 2,
  C: 3,
  G: 3,
  L: 3,
  S: 3,
  D: 4,
  M: 4,
  T: 4,
  E: 5,
  H: 5,
  N: 5,
  X: 5,
  U: 6,
  V: 6,
  W: 6,
  O: 7,
  Z: 7,
  F: 8,
  P: 8,
}

export const compoundNumberMeaningsBriefChaldean: { [key: number]: string } = {
  10: "Wheel of Fortune - success after challenges.",
  11: "A Lion Muzzled / The Hidden Peril - hidden dangers, treachery.",
  19: "The Prince of Heaven - happiness, success, esteem.",
}

export const generalElementMeanings: { [key: string]: string } = {
  Fire: "Ignition, action, passion, creative force, transformation, inspiration, energy, courage.",
  Water: "Emotions, intuition, flow, healing, reflection, the subconscious, receptivity, creation's potential.",
  Air: "Intellect, communication, clarity, ideas, strategy, change, perspective, mental agility.",
  Earth: "Grounding, stability, material world, practicality, structure, security, manifestation, nurturing, patience.",
  Spirit: "Interconnectedness, higher purpose, continuity, divine connection, unseen forces, the essence of being.",
}

export const suitElementColors: { [key: string]: string } = {
  Fire: "hsl(15, 80%, 60%)",
  Water: "hsl(210, 70%, 65%)",
  Air: "hsl(60, 75%, 70%)",
  Earth: "hsl(120, 40%, 55%)",
  Spirit: "hsl(270, 60%, 70%)",
  Default: "hsl(0, 0%, 88%)",
}

export interface CardData {
  name: string
  keyMeaning: string
  suit: string
  dominantElement: string
  pairingRole?: string
}

export interface IndividualCardData {
  [key: string]: CardData
}

export const individualCardData: IndividualCardData = {
  "0": {
    name: "0 - The Source (Cauldron)",
    keyMeaning: "Potential, void, beginnings.",
    suit: "Cauldron",
    dominantElement: "Fire",
    pairingRole: "Initiator",
  },
  "1": {
    name: "1 - The Spark (Cauldron)",
    keyMeaning: "Manifestation, action, individuality.",
    suit: "Cauldron",
    dominantElement: "Fire",
    pairingRole: "Activator",
  },
  "2": {
    name: "2 - The Reflection (Sword)",
    keyMeaning: "Duality, partnership, choices.",
    suit: "Sword",
    dominantElement: "Water",
    pairingRole: "Mirror",
  },
  "3": {
    name: "3 - The Weaver (Cord)",
    keyMeaning: "Creativity, communication, growth.",
    suit: "Cord",
    dominantElement: "Spirit",
    pairingRole: "Connector",
  },
  "4": {
    name: "4 - The Foundation (Spear)",
    keyMeaning: "Stability, structure, order.",
    suit: "Spear",
    dominantElement: "Air",
    pairingRole: "Anchor",
  },
  "5": {
    name: "5 - The Catalyst (Sword)",
    keyMeaning: "Change, freedom, conflict.",
    suit: "Sword",
    dominantElement: "Water",
    pairingRole: "Transformer",
  },
  "6": {
    name: "6 - The Nurturer (Stone)",
    keyMeaning: "Harmony, responsibility, care.",
    suit: "Stone",
    dominantElement: "Earth",
    pairingRole: "Guardian",
  },
  "7": {
    name: "7 - The Seeker (Spear)",
    keyMeaning: "Introspection, wisdom, analysis.",
    suit: "Spear",
    dominantElement: "Air",
    pairingRole: "Sage",
  },
  "8": {
    name: "8 - The Alchemist (Cord)",
    keyMeaning: "Power, abundance, mastery.",
    suit: "Cord",
    dominantElement: "Spirit",
    pairingRole: "Empowerer",
  },
  "9": {
    name: "9 - The Sage (Stone)",
    keyMeaning: "Completion, humanitarianism, wisdom.",
    suit: "Stone",
    dominantElement: "Earth",
    pairingRole: "Culminator",
  },
}

export interface PairingData {
  name: string
  numbers: string
  tarotSuit: string
  visual: string
  metaphysical: string
  dominantElement: string
  energeticDetails: string
  coreTheme: string
}

export interface Pairings {
  [key: string]: PairingData
}

export const pairingsData: Pairings = {
  cauldron: {
    name: "The Cauldron",
    numbers: "0 & 1",
    tarotSuit: "Fire Suit - Cups/Hearts (NUMO: Fire)",
    visual: "Point and Circle, Alpha-Omega",
    metaphysical: "Potential to Manifestation",
    dominantElement: "Fire",
    energeticDetails: "The spark of creation, primal energy, new beginnings.",
    coreTheme: "Creation; The dance of potential and manifestation.",
  },
  sword: {
    name: "The Sword",
    numbers: "2 & 5",
    tarotSuit: "Water Suit - Swords/Spades (NUMO: Water)",
    visual: "Line and Pentagram, Duality and Change",
    metaphysical: "Reflection and Action",
    dominantElement: "Water",
    energeticDetails: "Decision, intellect, truth, challenge, dynamic movement.",
    coreTheme: "Discernment; The interplay of thought and transformative action.",
  },
  cord: {
    name: "The Cord",
    numbers: "3 & 8",
    tarotSuit: "Spirit Suit - Wheels/Knots (NUMO: Spirit)",
    visual: "Triangle and Octagon, Trinity and Infinity",
    metaphysical: "Connection and Empowerment",
    dominantElement: "Spirit",
    energeticDetails: "Communication, networking, karmic patterns, abundance.",
    coreTheme: "Interconnection; The flow of creative expression and universal law.",
  },
  spear: {
    name: "The Spear",
    numbers: "4 & 7",
    tarotSuit: "Air Suit - Wands/Clubs (NUMO: Air)",
    visual: "Square and Heptagon, Structure and Wisdom",
    metaphysical: "Foundation and Insight",
    dominantElement: "Air",
    energeticDetails: "Direction, focus, analytical thought, spiritual seeking.",
    coreTheme: "Guidance; The balance of earthly structure and inspired vision.",
  },
  stone: {
    name: "The Stone",
    numbers: "6 & 9",
    tarotSuit: "Earth Suit - Pentacles/Diamonds (NUMO: Earth)",
    visual: "Hexagon and Enneagon, Harmony and Completion",
    metaphysical: "Nurturing and Culmination",
    dominantElement: "Earth",
    energeticDetails: "Responsibility, community, material world, endings and beginnings.",
    coreTheme: "Fulfillment; The cycle of service, wisdom, and tangible results.",
  },
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
  featuredImage?: string
  categories?: string[]
  tags?: string[]
}

export interface Page {
  id: string
  title: string
  slug: string
  content: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
  featuredImage?: string
}

// Internal mutable arrays for mock data
const _posts: Post[] = [
  {
    id: "7",
    title: "Unlock Your Destiny: Introducing Our FREE Comprehensive Numerology Report!",
    slug: "free-comprehensive-numerology-report-launch",
    content: `# Unlock Your Destiny: Introducing Our FREE Comprehensive Numerology Report!

Have you ever felt a deep yearning to understand your true self, your life's purpose, and the unique path you're meant to walk? For centuries, numerology has offered profound insights into the intricate blueprint of our lives, hidden within our names and birth dates. Today, we're thrilled to announce a powerful new tool that puts this ancient wisdom directly into your hands – **absolutely FREE!**

Introducing the **NUMO Oracle Comprehensive Numerology Report** – your personalized guide to unlocking the secrets encoded in your numbers. This isn't just another basic calculator; it's an in-depth exploration designed to illuminate your journey, empower your decisions, and inspire profound self-discovery.

## What is Numerology, and Why Does It Matter?

Numerology is the ancient study of numbers and their mystical significance in our lives. It operates on the principle that everything in the universe, including you, vibrates with a specific numerical energy. By understanding these numbers – derived from your birth name and date – you can gain incredible clarity on:

*   Your inherent talents and strengths
*   Your deepest desires and motivations
*   The challenges you're meant to overcome
*   The opportunities that await you
*   Your ultimate life purpose

In a world filled with noise and uncertainty, your personal numerology acts as a compass, guiding you toward a life of greater alignment, fulfillment, and joy.

## Ready to Decode Your Destiny? Get Your FREE Report Now!

Embarking on your journey of self-discovery is simple:

1.  Visit our **[Free Numerology Report Page](/tools/numerology-calculator)**.
2.  Enter your full birth name (as it appears on your birth certificate) and your date of birth.
3.  Click "Generate Report" and watch as your personalized numerological blueprint unfolds before your eyes!

**[➡️ Click Here to Get Your FREE Comprehensive Numerology Report!](/tools/numerology-calculator)**

We can't wait for you to experience the transformative power of your numbers!`,
    excerpt:
      "Discover your life's blueprint with NUMO Oracle's new FREE Comprehensive Numerology Report! Uncover your core numbers, life cycles, future trends, and much more. Get your personalized insights today and take your journey further with the NUMO Oracle Card Deck.",
    author: "Raziel Ali",
    isPublished: true,
    createdAt: "2025-05-29T10:00:00Z",
    updatedAt: "2025-05-29T10:00:00Z",
    featuredImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lyYK074p3XFMQfTdokWUgiPBEo4pT1.png",
    categories: ["Numerology", "Free Tools", "Announcements"],
    tags: [
      "free numerology report",
      "comprehensive numerology",
      "life path number",
      "destiny number",
      "numerology calculator",
      "self-discovery",
      "NUMO Oracle launch",
      "new feature",
    ],
  },
  {
    id: "8",
    title: "Spiritual Significance of the Cauldron Symbol",
    slug: "spiritual-significance-cauldron-symbol",
    content: `# The Mystical Cauldron: A Symbol of Transformation and Abundance

The cauldron, an ancient vessel steeped in myth and magic, stands as one of the most potent symbols across various spiritual traditions. From the bubbling brews of Celtic goddesses to the alchemical experiments of medieval sages, the cauldron represents profound concepts of transformation, nourishment, and the very womb of creation.

## A Vessel of Ancient Power

Historically, the cauldron was a practical tool for cooking and brewing, essential for survival. This utilitarian function naturally evolved into symbolic significance. It became associated with:

*   **Nourishment and Abundance:** The cauldron provides sustenance, representing not just physical food but also spiritual and emotional nourishment.
*   **Transformation and Rebirth:** Like ingredients transformed by heat and blending, the cauldron symbolizes the alchemical process of change.
*   **The Divine Feminine and Creation:** The rounded, receptive shape of the cauldron often links it to the womb, the Great Mother, and the feminine principle of creation.

The cauldron reminds us that within our depths lies immense power for creation, healing, and transformation.`,
    excerpt:
      "Explore the deep spiritual meanings and symbolism associated with the cauldron in various mystical traditions, and its connection to the NUMO Oracle's Water element.",
    author: "NUMO Oracle Team",
    isPublished: true,
    createdAt: "2025-05-30T10:00:00Z",
    updatedAt: "2025-06-01T10:00:00Z",
    featuredImage: "/images/blog/cauldron-symbolism.png",
    categories: ["Symbolism", "Mysticism", "Oracle Wisdom", "Elemental Wisdom"],
    tags: ["cauldron", "spiritual symbolism", "transformation", "water element", "divine feminine", "NUMO Oracle"],
  },
  {
    id: "9",
    title: "Understanding the Five Elements in Numerology",
    slug: "understanding-five-elements-numerology",
    content: `# Harmony of Numbers and Nature: Understanding the Five Elements in Numerology

The NUMO Oracle system weaves together the ancient wisdom of numerology with the profound energies of the five sacred elements: Fire, Water, Air, Earth, and Spirit. This integration offers a richer, more holistic understanding of the forces shaping our lives and personalities.

## The Five Sacred Elements: Core Characteristics

Each element carries a unique vibrational signature and governs different aspects of existence:

*   **Fire:** Ignition, action, passion, creative force, transformation, inspiration, energy, courage.
*   **Water:** Emotions, intuition, flow, healing, reflection, the subconscious, receptivity, creation's potential.
*   **Air:** Intellect, communication, clarity, ideas, strategy, change, perspective, mental agility.
*   **Earth:** Grounding, stability, material world, practicality, structure, security, manifestation, nurturing, patience.
*   **Spirit:** Interconnectedness, higher purpose, continuity, divine connection, unseen forces, the essence of being.

By embracing the wisdom of the five elements within your numerological practice, you open yourself to a more nuanced and powerful path of self-discovery.`,
    excerpt:
      "An exploration of the five sacred elements (Fire, Water, Air, Earth, Spirit) and their profound interplay with numerological principles in the NUMO Oracle system.",
    author: "NUMO Oracle Team",
    isPublished: true,
    createdAt: "2025-05-30T11:00:00Z",
    updatedAt: "2025-06-01T10:05:00Z",
    featuredImage: "/images/blog/elements-numerology.png",
    categories: ["Numerology", "Elemental Wisdom", "Symbolism"],
    tags: [
      "five elements",
      "numerology",
      "elemental correspondences",
      "NUMO Oracle",
      "Fire",
      "Water",
      "Air",
      "Earth",
      "Spirit",
    ],
  },
  {
    id: "10",
    title: "Sacred Geometry and the NUMO Oracle Cards",
    slug: "sacred-geometry-numo-oracle-cards",
    content: `# Sacred Geometry and the NUMO Oracle: Unveiling the Universe's Blueprint

Sacred Geometry is the study of the geometric patterns and proportions that are fundamental to the creation and structure of the Universe. From the spiral of a galaxy to the delicate veins of a leaf, these patterns are believed to be the very blueprint of existence.

## What is Sacred Geometry?

At its core, Sacred Geometry explores the spiritual and metaphysical meanings embedded in geometric shapes, forms, and their relationships. Key shapes include the circle (wholeness, unity), the triangle (trinity, manifestation), the square (stability, material world), and complex forms like the Flower of Life.

## Numbers as the Foundation of Form

Numerology and Sacred Geometry are intrinsically linked. Every geometric shape can be described through numbers – the number of its sides, its angles, its proportions. Pythagoras famously stated, "All is number," exploring the mathematical relationships that govern harmony.

Sacred Geometry reminds us that the NUMO Oracle, like the universe itself, is built upon an elegant and intelligent design.`,
    excerpt:
      "Unveiling the intricate ways Sacred Geometry is woven into the NUMO Oracle cards, enhancing their divinatory power and symbolic depth through numbers and elemental forms.",
    author: "NUMO Oracle Team",
    isPublished: true,
    createdAt: "2025-05-30T12:00:00Z",
    updatedAt: "2025-06-01T10:10:00Z",
    featuredImage: "/images/blog/sacred-geometry.png",
    categories: ["Numerology", "Sacred Geometry", "Oracle Cards", "Symbolism"],
    tags: [
      "sacred geometry",
      "NUMO Oracle",
      "card symbolism",
      "divination",
      "geometric patterns",
      "numerology connection",
    ],
  },
  {
    id: "11",
    title: "Understanding Your Numerology Life Path Number",
    slug: "numerology-life-path-number",
    content: `# Your North Star: Understanding Your Numerology Life Path Number

In the intricate map of your personal numerology, the Life Path Number shines as your guiding North Star. Calculated from your date of birth, this single or double-digit number is arguably the most crucial element in your numerological chart.

## What is the Life Path Number?

Think of your Life Path Number as the main road you are destined to travel in this lifetime. It outlines the nature of your experiences and the lessons you are meant to learn. Understanding your Life Path can bring immense clarity, helping you make choices that align with your deepest self and potential.

## Brief Meanings of Life Path Numbers:

*   **Life Path 1:** The Leader/Innovator – Independent, pioneering, ambitious
*   **Life Path 2:** The Peacemaker/Diplomat – Cooperative, sensitive, intuitive
*   **Life Path 3:** The Communicator/Entertainer – Expressive, creative, social
*   **Life Path 4:** The Builder/Organizer – Practical, disciplined, reliable
*   **Life Path 5:** The Adventurer/Freedom Seeker – Versatile, curious, dynamic

Your Life Path Number is a lifelong companion. Embracing its lessons can lead to a more fulfilling, purposeful, and authentic life.`,
    excerpt:
      "A deep dive into calculating and understanding your Numerology Life Path Number, a key to unlocking your life's purpose, potential, and the lessons along your journey.",
    author: "NUMO Oracle Team",
    isPublished: true,
    createdAt: "2025-05-30T13:00:00Z",
    updatedAt: "2025-06-01T10:15:00Z",
    featuredImage: "/images/blog/life-path.png",
    categories: ["Numerology", "Life Path", "Self-Discovery"],
    tags: [
      "life path number",
      "numerology basics",
      "personal growth",
      "destiny",
      "calculate life path",
      "master numbers",
    ],
  },
  {
    id: "12",
    title: "Combining Tarot and Numerology for Deeper Insights",
    slug: "combining-tarot-numerology-deeper-insights",
    content: `# Synergy of Symbols: Combining Tarot and Numerology for Deeper Insights

Tarot and Numerology are two powerful divination systems that offer profound insights into our lives, personalities, and potential futures. While each system is complete on its own, their true magic often unfolds when they are used in conjunction.

## Understanding the Foundations

*   **Tarot:** A deck of 78 cards, rich in archetypal imagery, divided into Major Arcana and Minor Arcana.
*   **Numerology:** The study of the mystical significance of numbers derived from birth dates and names.

## Points of Connection and Synergy

The relationship between Tarot and Numerology is ancient and deep, particularly evident in the structure of the Tarot itself:

1.  **Major Arcana and Numbers:** Each of the 22 Major Arcana cards has a direct numerical correspondence.
2.  **Minor Arcana and Numbers:** The numbered cards carry the vibrational essence of their number.
3.  **Life Path and Tarot Archetypes:** A person's Life Path number can find strong resonance with Major Arcana cards.

By exploring the synergy between Tarot and Numerology, you can unlock a more profound and insightful divination practice.`,
    excerpt:
      "Explore how combining the symbolic wisdom of Tarot with the vibrational insights of Numerology can lead to richer, more nuanced, and deeply personalized divination readings.",
    author: "NUMO Oracle Team",
    isPublished: true,
    createdAt: "2025-06-01T11:00:00Z",
    updatedAt: "2025-06-01T11:00:00Z",
    featuredImage: "/images/blog/tarot-numerology.png",
    categories: ["Numerology", "Tarot", "Divination"],
    tags: [
      "tarot",
      "numerology",
      "combined readings",
      "deeper insights",
      "divination techniques",
      "major arcana",
      "minor arcana",
    ],
  },
  {
    id: "13",
    title: "The Mystical Power of the Sword: Symbolism and Significance",
    slug: "mystical-power-sword-symbolism-significance",
    content: `# The Mystical Power of the Sword: Symbolism and Significance

The sword, an iconic emblem throughout human history, transcends its role as a mere weapon to become a potent symbol of power, justice, and decisive action. Its gleaming blade represents clarity of thought, truth, and the unwavering resolve needed to uphold principles.

## Historical and Cultural Significance

Throughout countless cultures, the sword is intrinsically linked to leadership and sovereignty. Think of King Arthur's Excalibur, not just a weapon but a symbol of rightful rule and destiny, or the Japanese katana, embodying the samurai's spirit and discipline.

## Spiritual Symbolism

Beyond its societal roles, the sword delves into the personal realm of courage and honor. In spiritual traditions, this translates to 'spiritual warfare' – the internal battle against one's own flaws, doubts, or external negative influences.

The sword reminds us of the power of conviction and the sharp edge of responsibility.`,
    excerpt:
      "Explore the multifaceted symbolism of the sword, from its representation of power, justice, and protection to its connection with courage, honor, and spiritual warfare.",
    author: "NUMO Oracle Team",
    isPublished: true,
    createdAt: "2025-06-05T10:00:00Z",
    updatedAt: "2025-06-05T10:00:00Z",
    featuredImage: "/images/blog/generated/mystical-sword-symbolism.png",
    categories: ["Symbolism", "Mysticism", "Spiritual Tools"],
    tags: ["sword", "power", "justice", "courage", "honor", "spiritual warfare", "mythology"],
  },
  {
    id: "14",
    title: "The Sacred Cord: Unraveling the Symbolism of Connection and Unity",
    slug: "sacred-cord-symbolism-connection-unity",
    content: `# The Sacred Cord: Unraveling the Symbolism of Connection and Unity

The cord, in its elegant simplicity, is a universal symbol of connection, weaving through the spiritual and cultural fabric of humanity. It represents the invisible threads that bind us—to each other, to our ancestors, to nature, and to the divine.

## Sacred Rituals and Practices

In sacred rituals, the cord often plays a central role. Handfasting ceremonies use a cord to physically and symbolically unite two individuals. Prayer beads are essentially sacred cords punctuated by knots or beads, each marking a prayer or mantra.

## Cosmic Connections

The symbolism extends to grand cosmic concepts like fate and destiny. The Moirai of Greek mythology spun, measured, and cut the thread of life. The East Asian 'Red Thread of Fate' invisibly ties together those destined to meet.

The cord invites us to explore our connections and recognize the profound unity underlying all existence.`,
    excerpt:
      "Uncover the profound symbolism of the cord, representing connection, unity, and binding forces across spiritual practices. Explore its role in rituals, fate, and interconnectedness.",
    author: "NUMO Oracle Team",
    isPublished: true,
    createdAt: "2025-06-05T10:00:00Z",
    updatedAt: "2025-06-05T10:00:00Z",
    featuredImage: "/images/blog/generated/sacred-cord-connection-unity.png",
    categories: ["Symbolism", "Mysticism", "Spiritual Practices"],
    tags: ["cord", "connection", "unity", "fate", "destiny", "interconnectedness", "rituals"],
  },
  {
    id: "15",
    title: "The Spear: Symbol of Focus, Protection, and Divine Energy",
    slug: "spear-symbol-focus-protection-divine-energy",
    content: `# The Spear: Symbol of Focus, Protection, and Divine Energy

The spear, with its direct and piercing form, stands as a powerful emblem of focused intention, unwavering protection, and the channeling of potent, often divine, energy. Unlike the broad sweep of a sword, the spear signifies a singular, concentrated point of power.

## Mythological Significance

Throughout mythology and history, the spear is the chosen implement of formidable warriors and authoritative deities. Odin's Gungnir, which never missed its mark, or Athena's spear, representing strategic wisdom in conflict, highlight its association with skill, foresight, and righteous power.

## Spiritual Applications

In ritualistic contexts, the spear can serve as an axis mundi, a symbolic connection between earthly and celestial realms. The spear encourages a focused mind, cutting through distractions and illusions.

The spear reminds us that true strength lies in focused will and the courage to aim directly for what is right and true.`,
    excerpt:
      "Examine the spear's symbolism as an emblem of focus, protection, and divine energy. Investigate its association with warriors, deities, and the pursuit of higher consciousness.",
    author: "NUMO Oracle Team",
    isPublished: true,
    createdAt: "2025-06-05T10:00:00Z",
    updatedAt: "2025-06-05T10:00:00Z",
    featuredImage: "/images/blog/generated/spear-focus-protection-energy.png",
    categories: ["Symbolism", "Mysticism", "Spiritual Tools"],
    tags: ["spear", "focus", "protection", "divine energy", "strength", "courage", "warriors"],
  },
  {
    id: "16",
    title: "The Sacred Stone: Exploring the Symbolism of Stability, Grounding, and Timelessness",
    slug: "sacred-stone-symbolism-stability-grounding",
    content: `# The Sacred Stone: Exploring the Symbolism of Stability, Grounding, and Timelessness

The stone, in its silent, unyielding presence, is one of the most ancient and universal symbols of stability, grounding, and timelessness. From the smallest pebble to colossal mountains, stones embody the enduring strength and primordial wisdom of the Earth itself.

## Cultural and Spiritual Significance

Across diverse cultures, stones are revered for their inherent qualities. Their weight and solidity make them natural symbols of grounding, helping to anchor our energy and connect us firmly to the physical realm.

## Ancient Monuments and Memory

Ancient stone circles like Stonehenge, their exact purposes shrouded in mystery, speak to humanity's long-standing use of stone to mark significant sites and create enduring places of spiritual focus.

The simple act of choosing and keeping a stone can be a deeply personal practice, a reminder of resilience, patience, and the quiet, unshakeable strength that resides both in the Earth and within ourselves.`,
    excerpt:
      "Delve into the stone's symbolism, representing stability, grounding, and timelessness. Explore its connection to nature, history, meditation, and inner peace.",
    author: "NUMO Oracle Team",
    isPublished: true,
    createdAt: "2025-06-05T10:00:00Z",
    updatedAt: "2025-06-05T10:00:00Z",
    featuredImage: "/images/blog/generated/sacred-stone-stability-grounding.png",
    categories: ["Symbolism", "Mysticism", "Nature Spirituality"],
    tags: ["stone", "stability", "grounding", "timelessness", "earth", "nature", "healing"],
  },
  {
    id: "17",
    title: "Understanding Numerology Basics: The Ancient Science of Numbers",
    slug: "understanding-numerology-basics",
    content: `# Understanding Numerology: The Ancient Science of Numbers

Numerology is the study of numbers and their energetic influence on our lives. This ancient practice reveals how numerical patterns can illuminate our path, purpose, and potential.

## The Core Principle: Numbers as Vibrations

At its heart, numerology operates on the principle that numbers are more than just mathematical symbols; they are energetic vibrations, each carrying a unique meaning and influence.

## Key Numerological Concepts:

1.  **Life Path Number:** Your life's purpose and major lessons
2.  **Expression Number:** Your innate talents and potential
3.  **Soul Urge Number:** Your deepest desires and motivations
4.  **Personality Number:** How others perceive you
5.  **Master Numbers:** Special double-digit numbers with higher vibration

## The Benefits of Understanding Numerology

*   **Self-Awareness:** Gain deeper understanding of your strengths and weaknesses
*   **Life Purpose Clarity:** Discover your true calling
*   **Relationship Insights:** Understand dynamics with others
*   **Timing and Opportunities:** Identify favorable periods
*   **Personal Growth:** Navigate challenges with greater awareness

Numerology offers a profound lens through which to view your life, providing a roadmap for personal growth and spiritual evolution.`,
    excerpt:
      "Learn the basics of numerology, including core numbers like Life Path and Expression, how numbers are calculated, and the benefits of understanding your unique numerical blueprint.",
    author: "Raziel Ali",
    isPublished: true,
    createdAt: "2024-08-15T10:30:00Z",
    updatedAt: "2025-06-19T10:00:00Z",
    featuredImage: "/numerology-oracle-spread.png",
    categories: ["Numerology", "Ancient Wisdom", "Basics"],
    tags: [
      "numerology basics",
      "life path number",
      "expression number",
      "soul urge",
      "personality number",
      "master numbers",
      "self-discovery",
    ],
  },
  {
    id: "18",
    title: "The Sacred Geometry of Numerology: How Numbers Shape Your Blueprint",
    slug: "sacred-geometry-numerology-blueprint",
    content: `# The Sacred Geometry of Numerology: How Numbers Shape Your Blueprint

The universe speaks in patterns, and two of its most profound languages are numerology and sacred geometry. When combined, they offer a powerful lens through which to understand the cosmic blueprint of your existence.

## Numbers as the Foundation of Form

Every geometric shape can be reduced to numerical principles. A point is 1, a line is 2, a triangle is 3, a square is 4. This fundamental connection means that the numerical energies in your numerology chart are linked to the very forms that structure reality.

## Platonic Solids and Elemental Connections

Ancient philosophers associated specific geometric solids with the elements:
*   **Tetrahedron:** Fire – action, passion, transformation
*   **Cube:** Earth – stability, grounding, manifestation
*   **Octahedron:** Air – intellect, communication, clarity
*   **Icosahedron:** Water – emotions, intuition, flow
*   **Dodecahedron:** Spirit – universe, divine connection

## The Flower of Life and Universal Patterns

Sacred geometry reveals complex patterns like the Flower of Life, containing all the building blocks of the universe. Understanding your numerology within this framework helps you see yourself as part of a grand, divine design.

By recognizing the sacred geometry within your numerology, you gain a more profound appreciation for the intricate, beautiful, and divinely ordered blueprint of your life.`,
    excerpt:
      "Discover how the ancient science of numerology reveals the hidden geometric patterns that shape your destiny. Learn about Life Path Numbers, elemental associations, and the sacred geometry that connects numbers to your life purpose.",
    author: "Raziel Ali",
    isPublished: true,
    createdAt: "2024-09-20T14:30:00Z",
    updatedAt: "2025-06-19T10:00:00Z",
    featuredImage: "/images/blog/generated/sacred-geometry-destiny-blog.png",
    categories: ["Numerology", "Sacred Geometry", "Life Path"],
    tags: [
      "life path number",
      "sacred geometry",
      "destiny",
      "elemental numerology",
      "platonic solids",
      "flower of life",
    ],
  },
  {
    id: "19",
    title: "Astrological Houses and Numerology: The Cosmic Connection",
    slug: "astrological-houses-numerology-cosmic-connection",
    content: `# Astrological Houses and Numerology: The Cosmic Connection

Both astrology and numerology offer profound insights into our personalities, life paths, and destinies. When combined, they provide a richer, more comprehensive understanding of your unique cosmic blueprint.

## Understanding Astrological Houses

The birth chart is divided into twelve "houses," each representing a different area of life:
*   **House 1:** Identity, first impressions
*   **House 2:** Money, self-worth
*   **House 3:** Learning, communication
*   **House 4:** Home, family roots
*   **House 5:** Creativity, romance
*   **House 6:** Health, service
*   **House 7:** Partnerships
*   **House 8:** Transformation, shared resources
*   **House 9:** Higher learning, philosophy
*   **House 10:** Career, public image
*   **House 11:** Friendships, goals
*   **House 12:** Spirituality, subconscious

## Numerology's Influence on the Houses

Each house can be seen through a numerological lens, as numbers 1-9 resonate with specific themes that align with the houses.

## Integrating Insights for a Holistic Blueprint

By overlaying your numerology chart onto your astrological houses, you can gain a more nuanced understanding of your life's blueprint, revealing reinforcements, balance points, and hidden potentials.

This integrated approach allows for a richer, more personalized interpretation of your cosmic journey.`,
    excerpt:
      "Explore the profound connections between astrological houses and numerology to gain a deeper understanding of your life's cosmic blueprint, revealing how numbers influence different areas of your existence.",
    author: "Raziel Ali",
    isPublished: true,
    createdAt: "2024-10-05T09:00:00Z",
    updatedAt: "2025-06-19T10:00:00Z",
    featuredImage: "/images/blog/generated/astrology-numerology-blueprint-blog.png",
    categories: ["Numerology", "Astrology", "Cosmic Blueprint"],
    tags: [
      "astrology",
      "numerology",
      "life path",
      "cosmic connections",
      "holistic understanding",
      "astrological houses",
    ],
  },
  {
    id: "20",
    title: "The Power of Personal Year Cycles in Numerology",
    slug: "personal-year-cycles-numerology",
    content: `# The Power of Personal Year Cycles in Numerology: Navigating Your Annual Themes

In numerology, your Personal Year number is a powerful indicator of the overarching themes, opportunities, and challenges you will experience during a specific calendar year.

## What is a Personal Year?

The Personal Year cycle operates on a 9-year rhythm, mirroring the single-digit numbers 1 through 9. Each year brings a distinct energetic vibration that influences your experiences, decisions, and personal growth.

## Calculating Your Personal Year Number

1.  Add your birth month and birth day (reduce to single digit)
2.  Add the current calendar year (reduce to single digit)
3.  Sum the results and reduce to single digit (1-9)

## Meanings of Each Personal Year Cycle:

*   **1 Personal Year:** New beginnings, independence, planting seeds
*   **2 Personal Year:** Cooperation, relationships, patience
*   **3 Personal Year:** Creativity, expression, social activity
*   **4 Personal Year:** Hard work, foundation building
*   **5 Personal Year:** Change, freedom, adventure
*   **6 Personal Year:** Responsibility, home, nurturing
*   **7 Personal Year:** Introspection, spirituality, study
*   **8 Personal Year:** Power, abundance, achievement
*   **9 Personal Year:** Completion, release, humanitarianism

Understanding your Personal Year allows you to plan strategically, embrace challenges, and maximize opportunities in harmony with universal flow.`,
    excerpt:
      "Discover the significance of your Numerology Personal Year cycle, how to calculate it, and what each year's energy means for your growth, opportunities, and challenges.",
    author: "NUMO Oracle Team",
    isPublished: true,
    createdAt: "2025-06-20T09:00:00Z",
    updatedAt: "2025-06-20T09:00:00Z",
    featuredImage: "/images/blog/generated/numerology-personal-year-cycle.png",
    categories: ["Numerology", "Life Cycles", "Personal Growth"],
    tags: [
      "personal year",
      "numerology cycles",
      "future trends",
      "self-guidance",
      "annual themes",
      "numerology calculation",
    ],
  },
  {
    id: "21",
    title: "Decoding Master Numbers 11, 22, 33: Your Higher Purpose",
    slug: "decoding-master-numbers-higher-purpose",
    content: `# Decoding Master Numbers 11, 22, 33: Unlocking Your Higher Purpose

In numerology, certain double-digit numbers hold unique and powerful significance. These are the **Master Numbers: 11, 22, and 33**. They carry an intensified vibration with higher potential for both achievement and challenge.

## What Makes a Number a "Master Number"?

Unlike other multi-digit numbers that are reduced to a single digit, Master Numbers are typically not reduced in their initial calculation. They represent a higher octave of their root number, bringing:

*   **Increased Intuition and Sensitivity**
*   **Greater Potential for significant accomplishment**
*   **Intensified Challenges and life lessons**

## The Three Master Numbers:

### 1. Master Number 11: The Intuitive / Illuminator (Root 2)

*   **Vibration:** The most intuitive of all numbers, combining leadership with diplomacy
*   **Purpose:** Channels for higher inspiration, natural healers, psychics, artists, visionaries
*   **Challenges:** Nervous tension, anxiety, self-doubt, overwhelm from external energies

### 2. Master Number 22: The Master Builder (Root 4)

*   **Vibration:** The most powerful Master Number, combining intuition with practical manifestation
*   **Purpose:** Turn grand dreams into tangible reality on a global scale
*   **Challenges:** Immense pressure to perform, self-worth struggles, materialism

### 3. Master Number 33: The Master Teacher / Healer (Root 6)

*   **Vibration:** Embodies the highest form of unconditional love and compassion
*   **Purpose:** Serve humanity through selfless love, healing, and teaching
*   **Challenges:** Self-sacrifice, martyrdom, taking on too much responsibility

Having a Master Number in your chart is a call to a higher purpose, offering immense potential for spiritual growth and positive impact on the world.`,
    excerpt:
      "Explore the profound significance of Master Numbers 11, 22, and 33 in numerology. Learn how these powerful vibrations indicate a higher purpose, unique challenges, and immense potential for spiritual growth and impact.",
    author: "NUMO Oracle Team",
    isPublished: true,
    createdAt: "2025-06-20T10:00:00Z",
    updatedAt: "2025-06-20T10:00:00Z",
    featuredImage: "/images/blog/generated/numerology-master-numbers.png",
    categories: ["Numerology", "Master Numbers", "Spiritual Growth"],
    tags: [
      "master numbers",
      "numerology",
      "11",
      "22",
      "33",
      "higher purpose",
      "spiritual growth",
      "intuition",
      "manifestation",
      "unconditional love",
    ],
  },
]

// Add this at the end of the _posts array definition
console.log("=== POSTS ARRAY INITIALIZED ===")
console.log("Initial posts count:", _posts.length)
console.log("First post title:", _posts[0]?.title || "No posts")
console.log("================================")

// Internal mutable array for mock pages data
const _pages: Page[] = [
  {
    id: "1",
    title: "Welcome to NUMO Oracle",
    slug: "welcome",
    content: "# Welcome to NUMO Oracle\n\nThis is a sample welcome page.",
    isPublished: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Our Mission",
    slug: "our-mission",
    content: "# Our Mission\n\nWe aim to provide insightful numerology readings.",
    isPublished: true,
    createdAt: "2025-01-02T00:00:00Z",
    updatedAt: "2025-01-02T00:00:00Z",
  },
]

/**
 * Returns the raw, unfiltered array of posts.
 * This is primarily for internal use when mutation is needed.
 */
export function getRawPosts(): Post[] {
  return _posts
}

/**
 * Returns the raw, unfiltered array of pages.
 * This is primarily for internal use when mutation is needed.
 */
export function getRawPages(): Page[] {
  return _pages
}

/**
 * Return all posts.
 * @param options.includeUnpublished – when `true`, drafts are included.
 */
export function getAllPosts(options: { includeUnpublished?: boolean } = {}) {
  const { includeUnpublished = false } = options
  const result = includeUnpublished ? [..._posts] : _posts.filter((p) => p.isPublished)

  console.log("getAllPosts called:", {
    includeUnpublished,
    totalPosts: _posts.length,
    publishedPosts: _posts.filter((p) => p.isPublished).length,
    resultCount: result.length,
    firstResult: result[0]?.title || "No posts",
  })

  return result
}

/**
 * Alias helper so legacy imports (`getPosts`) keep working.
 * Returns the same result as `getAllPosts`, but can be awaited.
 */
export function getPosts(options: { includeUnpublished?: boolean } = {}) {
  return getAllPosts(options)
}

/**
 * Convenience helper for fetching a single post via its slug.
 * Returns `undefined` if no match is found.
 */
export function getPostBySlug(slug: string) {
  return _posts.find((p) => p.slug === slug)
}

/**
 * Convenience helper for fetching a single post via its ID.
 * Returns `undefined` if no match is found.
 */
export function getPost(id: string) {
  return _posts.find((p) => p.id === id)
}

/**
 * Adds a new post to the in-memory array.
 */
export function addPost(newPost: Post) {
  _posts.unshift(newPost)
}

/**
 * Updates an existing post in the in-memory array.
 * Returns `true` if successful, `false` otherwise.
 */
export function updatePost(updatedPost: Post) {
  const index = _posts.findIndex((p) => p.id === updatedPost.id)
  if (index !== -1) {
    _posts[index] = { ...updatedPost, updatedAt: new Date().toISOString() }
    return true
  }
  return false
}

/**
 * Deletes a post by its ID from the in-memory array.
 * Returns `true` if successful, `false` otherwise.
 */
export function deletePost(id: string) {
  const initialLength = _posts.length
  const index = _posts.findIndex((p) => p.id === id)
  if (index !== -1) {
    _posts.splice(index, 1)
  }
  return _posts.length < initialLength
}

/**
 * Return all pages.
 * @param options.includeUnpublished – when `true`, drafts are included.
 */
export function getPages(options: { includeUnpublished?: boolean } = {}) {
  const { includeUnpublished = false } = options
  return includeUnpublished ? [..._pages] : _pages.filter((p) => p.isPublished)
}

/**
 * Convenience helper for fetching a single page via its ID.
 * Returns `undefined` if no match is found.
 */
export function getPageById(id: string) {
  return _pages.find((p) => p.id === id)
}

/**
 * Updates an existing page.
 * Returns `true` if successful, `false` otherwise.
 */
export function updatePage(updatedPage: Page) {
  const index = _pages.findIndex((p) => p.id === updatedPage.id)
  if (index !== -1) {
    _pages[index] = { ...updatedPage, updatedAt: new Date().toISOString() }
    return true
  }
  return false
}

// Ensure posts array is properly exported and accessible
console.log("Content file loaded. Posts count:", _posts.length)

/**
 * getBlogPosts – maintained for backward-compatibility.
 * It's an alias for getAllPosts.
 */
export const getBlogPosts = getAllPosts
