// Mock database for blog posts

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

const newBlogPostContent = `
# Unlock Your Destiny: Introducing Our FREE Comprehensive Numerology Report!

![Numerology Report Dashboard](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lyYK074p3XFMQfTdokWUgiPBEo4pT1.png "Overview of the Comprehensive Numerology Report")

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

## Dive Deep into Your Personal Blueprint: What Your FREE Report Reveals

Our Comprehensive Numerology Report is meticulously designed to provide you with a rich, multi-faceted understanding of your unique numerical profile. Forget superficial readings; prepare to go deep!

### 1. Your Core Numbers Unveiled: The Foundation of You

![Core Numerology Numbers - Soul Urge and Personality](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-R0V8kE1QObu4FpJ3d4O24ekU2degDy.png "Detailed view of Soul Urge and Personality Numbers")

At the heart of your report are your **Core Numbers**, each offering a distinct lens through which to view your life:

*   **Life Path Number:** Calculated from your birth date, this is arguably the most important number in your chart. It reveals your life's purpose, the major lessons you're here to learn, and the central theme of your journey. *Our report details your Life Path's key characteristics, elemental energy, and crucial life path advice.*
*   **Destiny (or Expression) Number:** Derived from the letters in your full birth name, your Destiny Number illuminates your innate talents, abilities, and the potential you're destined to achieve. *Discover your path to fulfillment and the career avenues where you might shine.*
*   **Soul Urge (or Heart's Desire) Number:** Calculated from the vowels in your name, this number whispers your deepest motivations, your inner cravings, and what truly brings you joy and satisfaction. *Understand what your soul truly yearns for.*
*   **Personality Number:** Derived from the consonants in your name, this number reflects how others perceive you – the outer mask you present to the world. *Gain insight into your social presentation and first impressions.*

### 2. The Symphony of Your Numbers: Core Numbers Relationship

![Core Numbers Relationship Diagram](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0WVxWZCvznNdKU66DQ2ar40biXlZXs.png "Visual representation of Core Numbers Relationship")

Your numbers don't exist in isolation; they interact, creating a unique energetic symphony. Our report includes a **Core Numbers Relationship** analysis, showing you how these fundamental aspects of your being work together, highlighting areas of harmony or potential tension that shape your experiences. *See a visual diagram of how your key numbers connect and influence each other.*

### 3. Navigate Your Life's Chapters: Life Cycles, Pinnacles & Challenges

![Life Cycles Timeline and Personal Year](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Pcxtcy3VfTKWOnNLh6AeFxjPit8jtk.png "Numerology Life Cycles Timeline and Personal Year details")

Life unfolds in cycles, each with its own distinct themes, opportunities, and lessons. Your report maps out:

*   **Life Cycles Timeline:** Understand the major phases of your life – from your formative years to your productive period and into maturity.
*   **Pinnacle Numbers:** These represent significant periods of opportunity and achievement, indicating lessons you're ready to master. *Our report details each of your four Pinnacles, their timing, and their meaning, complete with a progression chart.* (See image below)
*   **Challenge Numbers:** These highlight specific hurdles or lessons you'll encounter during different life phases. Understanding them empowers you to navigate these periods with greater awareness and transform obstacles into stepping stones for growth. *Explore your four Challenge Numbers and the wisdom they offer.*

![Pinnacle Numbers Progression Chart](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9pOspwp4qVlwKHhCsiusiwy8UDlsBp.png "Pinnacle Numbers with progression visualization")
![Challenge Numbers Details](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NPT9xu8XouBTkDfNWFmREgsOLlaG7F.png "Detailed breakdown of Challenge Numbers")

### 4. Unlock Deeper Wisdom: Karmic Lessons & Hidden Passions

![Karmic Lessons and Hidden Passion Number](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-r0ux9wuJwlC5piJ9OpIRBcbPtp86WM.png "Karmic Lessons and Hidden Passion Number section")

Delve into the more subtle, yet powerful, aspects of your numerological chart:

*   **Karmic Lessons:** Indicated by missing numbers in your name, these highlight skills or qualities you need to develop in this lifetime, often because they were overlooked in past experiences.
*   **Hidden Passion Number:** This reveals a natural talent or a strong underlying interest that can bring great satisfaction and drive your pursuits.

### 5. Glimpse Your Future Path: Personal Year & Future Trends

![Future Trends and 9-Year Cycle Forecast](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3yaA4ml1X46nijzp0ssDImHi2h0nd2.png "Numerology Future Trends and 9-Year Cycle Forecast")

Numerology isn't just about understanding your past and present; it also offers valuable insights into the energies influencing your future:

*   **Personal Year, Month, and Day:** Discover the specific energetic theme of your current year, month, and even day, allowing you to align your actions with the prevailing cosmic currents.
*   **9-Year Cycle Forecast:** See a projection of the themes for each year in your current 9-year cycle.
*   **Long-Term Forecasts:** Based on your complete profile, get key insights into potential relationship dynamics, career evolution, personal growth, and life purpose fulfillment.

## Why This FREE Report is a Game-Changer for You

In a world saturated with information, true wisdom is rare. Our FREE Comprehensive Numerology Report offers you:

*   **Unprecedented Self-Awareness:** Gain a deeper understanding of who you are, why you're here, and what makes you unique.
*   **Clarity and Direction:** Find guidance on your life path, career choices, and personal development.
*   **Empowerment:** Recognize your innate strengths and learn how to navigate your challenges with confidence.
*   **Personalized Insights:** This isn't a generic horoscope; it's a detailed analysis based *specifically* on your birth name and date.
*   **Incredible Value, Absolutely FREE:** We believe everyone deserves access to this transformative knowledge. That's why we're offering this in-depth report without any cost or obligation.

## Ready to Decode Your Destiny? Get Your FREE Report Now!

Embarking on your journey of self-discovery is simple:

1.  Visit our **[Free Numerology Report Page](/tools/numerology-calculator)**.
2.  Enter your full birth name (as it appears on your birth certificate) and your date of birth.
3.  Click "Generate Report" and watch as your personalized numerological blueprint unfolds before your eyes!

**[➡️ Click Here to Get Your FREE Comprehensive Numerology Report!](/tools/numerology-calculator)**

## Take Your Journey Deeper with the NUMO Oracle Card Deck

Your Comprehensive Numerology Report provides an incredible map of your life's terrain. But what if you had a compass to navigate its day-to-day twists and turns?

That's where the **NUMO Oracle Card Deck** comes in.

![NUMO Oracle Card Deck](/images/products/standard-deck.png "The NUMO Oracle Card Deck")

Our beautifully crafted NUMO Oracle cards are a unique fusion of numerological wisdom and elemental energies. Each of the 52 cards resonates with specific numbers and elements, offering intuitive guidance, clarity, and a deeper connection to the insights revealed in your numerology report.

**Why combine your Numerology Report with the NUMO Oracle Deck?**

*   **Amplify Your Insights:** Use the cards to explore the themes and energies highlighted in your report on a more intuitive, daily basis.
*   **Actionable Guidance:** While your report shows the 'what' and 'why', the cards can help with the 'how' and 'when'.
*   **Connect with Elemental Wisdom:** The deck integrates the five sacred elements (Fire, Water, Air, Earth, Spirit) with numerology, adding another layer of depth to your understanding.
*   **A Tangible Tool for Growth:** Hold the wisdom in your hands. The NUMO Oracle deck becomes a trusted companion on your spiritual journey.

The NUMO Oracle isn't just another set of oracle cards; it's a system designed to work synergistically with your personal numerology, creating a holistic approach to self-discovery and guidance.

**[➡️ Explore the NUMO Oracle Card Deck and Accessories Now!](/buy)**

## Your Journey to Self-Mastery Begins Today

The universe is constantly speaking to us through the language of numbers. By understanding your personal numerology, you gain access to a powerful tool for navigating life with greater purpose, clarity, and confidence.

Your FREE Comprehensive Numerology Report is the first step on this exciting path. Discover the hidden patterns, embrace your unique strengths, and unlock the incredible potential that lies within you.

Don't wait to uncover the wisdom that's rightfully yours.

**[🌟 Get Your FREE Numerology Report Now!](/tools/numerology-calculator)**

**[🔮 Discover the NUMO Oracle Card Deck!](/buy)**

We can't wait for you to experience the transformative power of your numbers!
`

// Changed 'let posts' to 'export let posts'
export const posts: Post[] = [
  {
    id: "7",
    title: "Unlock Your Destiny: Introducing Our FREE Comprehensive Numerology Report!",
    slug: "free-comprehensive-numerology-report-launch",
    content: newBlogPostContent,
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
    content: `
# The Mystical Cauldron: A Symbol of Transformation and Abundance

The cauldron, an ancient vessel steeped in myth and magic, stands as one of the most potent symbols across various spiritual traditions. From the bubbling brews of Celtic goddesses to the alchemical experiments of medieval sages, the cauldron represents profound concepts of transformation, nourishment, and the very womb of creation. In the NUMO Oracle system, the Cauldron suit (associated with the element of Water) taps into this deep wellspring of meaning, inviting us to explore our emotional depths and creative potential.

## A Vessel of Ancient Power

Historically, the cauldron was a practical tool for cooking and brewing, essential for survival. This utilitarian function naturally evolved into symbolic significance. It became associated with:

*   **Nourishment and Abundance:** The cauldron provides sustenance, representing not just physical food but also spiritual and emotional nourishment. It speaks to the universe's generosity and the promise of fulfillment.
*   **Transformation and Rebirth:** Like ingredients transformed by heat and blending, the cauldron symbolizes the alchemical process of change. It's a place where old forms die and new ones are born, representing cycles of death and rebirth, healing, and regeneration. Think of the mythical cauldrons that could restore life or grant wisdom. It suggests that true wisdom often brews in the depths of introspection and experience.
*   **The Divine Feminine and Creation:** The rounded, receptive shape of the cauldron often links it to the womb, the Great Mother, and the feminine principle of creation. It is the source from which life emerges, a container of potential and mystery.
*   **Wisdom and Inspiration:** Many legends tell of cauldrons that grant poetic inspiration (like the Cauldron of Awen in Welsh mythology) or divine knowledge. It suggests that true wisdom often brews in the depths of introspection and experience.
*   **Magic and Ritual:** In witchcraft and pagan traditions, the cauldron is a central ritual tool, used for scrying, brewing potions, burning incense, or holding offerings. It acts as a focal point for magical workings and a connection to the elemental forces.

## The Cauldron in NUMO Oracle: Embracing Water's Wisdom

In the NUMO Oracle, the Cauldron suit is aligned with the element of **Water**. This connection emphasizes themes of:

*   **Emotions and Intuition:** Water governs our feelings, subconscious, and intuitive insights. The Cauldron cards encourage us to dive into our emotional landscapes, to understand our deepest currents, and to trust our inner knowing.
*   **Flow and Adaptability:** Like water, the Cauldron teaches us to be adaptable, to flow with life's changes, and to find our way around obstacles.
*   **Healing and Cleansing:** Water has purifying properties. The Cauldron can represent emotional healing, cleansing past wounds, and finding emotional balance.
*   **Reflection and Dreams:** Still waters reflect the world above. The Cauldron invites introspection, self-reflection, and an exploration of the dream world and the subconscious mind.

The primary numbers associated with the Cauldron in some NUMO interpretations, such as 2 (Duality, Reflection) and its series (11, 20, 29, 38), further highlight its connection to relationships, choices, and the mirroring aspect of water. It asks us to look within and to understand how our inner world reflects our outer experiences.

## Working with Cauldron Energy

To connect with the symbolism of the cauldron in your own life:

*   **Journaling and Introspection:** Use quiet time to reflect on your emotions and intuitive nudges.
*   **Creative Expression:** Engage in activities that allow your creativity to flow, like painting, writing, or music.
*   **Rituals of Release:** Use water symbolically to cleanse and release old patterns or emotions.
*   **Nurturing Practices:** Focus on self-care and nurturing yourself and others, embodying the cauldron's nourishing aspect.

The cauldron reminds us that within our depths lies immense power for creation, healing, and transformation. By embracing its wisdom, we can navigate our lives with greater emotional intelligence and tap into the magic of our own creative potential.
`,
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
    content: `
# Harmony of Numbers and Nature: Understanding the Five Elements in Numerology

The NUMO Oracle system weaves together the ancient wisdom of numerology with the profound energies of the five sacred elements: Fire, Water, Air, Earth, and Spirit. This integration offers a richer, more holistic understanding of the forces shaping our lives and personalities. Understanding how these elements correspond to numerological principles can unlock deeper layers of insight in your readings and self-exploration.

## The Five Sacred Elements: Core Characteristics

Each element carries a unique vibrational signature and governs different aspects of existence:

*   **Fire:** As defined in NUMO's wisdom, Fire represents *Ignition, action, passion, creative force, transformation, inspiration, energy, courage.* It's the spark of life, the driving force, and the catalyst for change.
*   **Water:** This element embodies *Emotions, intuition, flow, healing, reflection, the subconscious, receptivity, creation's potential.* Water governs our inner world, our feelings, and our ability to connect on a deep, empathetic level.
*   **Air:** Air is the realm of *Intellect, communication, clarity, ideas, strategy, change, perspective, mental agility.* It represents thought, expression, and the transmission of knowledge.
*   **Earth:** Grounding us, Earth signifies *Stability, material world, practicality, structure, security, manifestation, nurturing, patience.* It connects us to the physical realm, our bodies, and the tangible aspects of life.
*   **Spirit (Aether):** The fifth element, Spirit, encompasses *Interconnectedness, higher purpose, continuity, divine connection, unseen forces, the essence of being.* It is the unifying force, the breath of life that animates all other elements and connects us to the divine.

## Elemental Correspondences in NUMO Oracle Numerology

In the NUMO Oracle system, these elements are intrinsically linked to specific card suits and, by extension, to numerical vibrations:

*   **Sword (Fire):** Associated with numbers like 1 (and its series 10, 19, 28, 37), the Sword embodies Fire's dynamic energy of action, courage, and transformation. These numbers often signify new beginnings, leadership, and the power to cut through illusion.
*   **Cauldron (Water):** Linked to numbers like 2 (and its series 11, 20, 29, 38), the Cauldron reflects Water's qualities of intuition, emotion, and relationship. These numbers often speak to partnership, duality, receptivity, and emotional depth.
*   **Cord (Air):** Connected to numbers like 3 (and its series 12, 21, 30, 39), the Cord channels Air's energy of communication, intellect, and connection. These numbers often highlight creativity, expression, social interaction, and networking.
*   **Stone (Earth):** Representing numbers like 4 (and its series 13, 22, 31, 40), the Stone grounds us in Earth's stability, practicality, and structure. These numbers often relate to foundations, hard work, security, and manifestation in the material world.
*   **Spear (Spirit):** Aligned with numbers like 5 (and its series 14, 23, 32, 41), the Spear directs Spirit's energy of protection, guidance, and higher purpose. These numbers often signify change, freedom, spiritual growth, and the pursuit of truth.

## The Importance of Elemental Balance

Understanding your personal numerology through an elemental lens can reveal areas of strength and potential imbalance. For instance, a chart dominated by Fire numbers might indicate a passionate and driven individual who may need to cultivate Water's reflective qualities. Conversely, someone with many Earth numbers might be practical and stable but could benefit from Air's intellectual curiosity or Fire's spontaneity.

The goal is not to favor one element over others but to achieve a harmonious balance, allowing each elemental energy to express itself constructively in your life. The NUMO Oracle cards can be a powerful tool for identifying which elemental energies are currently active or needed.

## Working with Elemental Numerology

*   **Identify Dominant Elements:** Analyze your core numerology numbers (Life Path, Destiny, etc.) to see which elements are most prominent.
*   **Seek Balance:** If an element is lacking or overactive, consciously engage in activities or meditations that cultivate the qualities of the balancing elements.
*   **Card Readings:** When using the NUMO Oracle deck, pay attention to the elemental suits that appear. They offer clues about the underlying energies at play.
*   **Observe Nature:** Spend time in nature connecting with each of the physical elements to deepen your understanding of their energies.

By embracing the wisdom of the five elements within your numerological practice, you open yourself to a more nuanced and powerful path of self-discovery and alignment with the natural rhythms of the universe.
`,
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
    content: `
# Sacred Geometry and the NUMO Oracle: Unveiling the Universe's Blueprint

Sacred Geometry is the study of the geometric patterns and proportions that are fundamental to the creation and structure of the Universe. From the spiral of a galaxy to the delicate veins of a leaf, these patterns are believed to be the very blueprint of existence, revealing the divine order and harmony inherent in all things. The NUMO Oracle system, with its deep roots in numerology, naturally intersects with the principles of Sacred Geometry, as numbers themselves are the foundation of geometric forms.

## What is Sacred Geometry?

At its core, Sacred Geometry explores the spiritual and metaphysical meanings embedded in geometric shapes, forms, and their relationships. It posits that:

*   **Patterns of Creation:** Specific geometric patterns are consistently found throughout nature, art, and architecture across cultures and time periods, suggesting a universal design language.
*   **Energetic Signatures:** Each shape is believed to carry a unique energetic vibration and consciousness.
*   **Connection to the Divine:** By contemplating and working with these forms, one can connect with the fundamental principles of creation and higher levels of awareness.

Key shapes in Sacred Geometry include the circle (wholeness, unity), the vesica piscis (creation, interconnectedness), the triangle (trinity, manifestation), the square (stability, material world), the pentagram (humanity, protection), the hexagon (harmony, balance), and complex forms like the Flower of Life, Seed of Life, and Metatron's Cube.

## Numbers as the Foundation of Form

Numerology and Sacred Geometry are intrinsically linked. Every geometric shape can be described and understood through numbers – the number of its sides, its angles, its proportions. Pythagoras, a key figure in numerology, famously stated, "All is number," and his school explored the mathematical relationships that govern musical harmony and planetary movements, often expressed through geometry.

In this light:
*   **1 (Unity):** Represented by the point, the source from which all else emerges.
*   **2 (Duality):** Represented by the line, connecting two points, symbolizing relationship and polarity.
*   **3 (Trinity/Creation):** Represented by the triangle, the first stable form, symbolizing manifestation and creative power.
*   **4 (Stability/Matter):** Represented by the square or tetrahedron, symbolizing order, foundation, and the material realm.
*   And so on, with each number unfolding into more complex geometric expressions.

## Sacred Geometry in the NUMO Oracle

While the NUMO Oracle cards may not explicitly feature complex geometric diagrams on every card, the principles of Sacred Geometry are woven into its fabric through its numerological and elemental framework:

*   **Numerical Symbolism:** Each card's number carries inherent geometric associations. For example, the foundational energy of a '4' card (like the Stone suit's 4) resonates with the stability of a square.
*   **Elemental Shapes:** The elements themselves can be associated with Platonic Solids (e.g., Tetrahedron for Fire, Cube for Earth, Octahedron for Air, Icosahedron for Water, Dodecahedron for Spirit/Aether), adding another layer of geometric symbolism to the suits.
*   **Pairings and Symmetry:** The NUMO system emphasizes numerical pairings (0&1, 2&5, 3&8, 4&7, 6&9). These pairings often create symmetrical or balanced relationships that are a hallmark of sacred geometric principles. For instance, the pairing of 0 (point/circle) and 1 (line/spark) in the Cauldron suit speaks to the fundamental geometric act of creation.
*   **Card Layouts:** Oracle card spreads themselves can form geometric patterns, with each position in the layout contributing to the overall energetic message, much like points in a geometric construction.

## Enhancing Readings with Sacred Geometric Awareness

Understanding basic Sacred Geometry can deepen your interpretation of NUMO Oracle readings:

*   **Visual Meditation:** Contemplate the number of a drawn card and visualize its corresponding geometric form. What feelings or insights does this evoke?
*   **Elemental Resonance:** Consider the Platonic solid associated with a card's dominant element. How does its structure inform the card's message?
*   **Interconnections:** Notice how numbers and shapes relate to each other in a spread. Are there patterns of stability (squares, fours), dynamism (triangles, threes), or wholeness (circles, completion numbers like nine)?

Sacred Geometry reminds us that the NUMO Oracle, like the universe itself, is built upon an elegant and intelligent design. By recognizing these underlying patterns, we can access a more profound understanding of the messages the cards convey, seeing them not just as individual symbols but as part of a harmonious, interconnected whole.
`,
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
    content: `
# Your North Star: Understanding Your Numerology Life Path Number

In the intricate map of your personal numerology, the Life Path Number shines as your guiding North Star. Calculated from your date of birth, this single or double-digit number is arguably the most crucial element in your numerological chart. It reveals the central theme of your life's journey, your inherent talents and tendencies, the opportunities and challenges you're likely to encounter, and ultimately, the overarching mission or purpose you are here to explore and fulfill.

## What is the Life Path Number?

Think of your Life Path Number as the main road you are destined to travel in this lifetime. It outlines the nature of your experiences and the lessons you are meant to learn. It doesn't dictate your every step, as free will always plays a part, but it highlights the landscape through which you'll move and the inherent skills you possess to navigate it. Understanding your Life Path can bring immense clarity, helping you make choices that align with your deepest self and potential.

## Calculating Your Life Path Number

The calculation is straightforward and involves reducing your birth month, day, and year to single digits (or Master Numbers) and then summing them up.

**Steps:**

1.  **Reduce the Month:**
*   If your birth month is a single digit (1-9), use that number.
*   If it's a double-digit month (October=10, November=11, December=12), reduce it to a single digit (10 -> 1+0=1; 11 stays 11; 12 -> 1+2=3). *Note: November (11) is a Master Number and is often kept as 11.*

2.  **Reduce the Day:**
*   Reduce your birth day to a single digit. For example, if born on the 23rd, 2+3=5. If born on the 11th or 22nd, these are Master Numbers and are kept as 11 or 22.

3.  **Reduce the Year:**
*   Add all the digits of your birth year together and reduce them to a single digit. For example, for 1975: 1+9+7+5 = 22. Then, 2+2 = 4. If the sum is 11 or 22 before the final single-digit reduction, note it as it might indicate Master Number influence.

4.  **Sum and Reduce the Totals:**
*   Add the reduced numbers for the month, day, and year.
*   Reduce this final sum to a single digit (1-9) **UNLESS** the sum is 11, 22, or 33. These are Master Numbers and are not reduced further.

**Example:** Birthday: November 26, 1975

*   **Month:** November = 11 (Master Number, keep as 11)
*   **Day:** 26 -> 2 + 6 = 8
*   **Year:** 1975 -> 1 + 9 + 7 + 5 = 22 (Master Number, keep as 22)
*   **Sum:** 11 (month) + 8 (day) + 22 (year) = 41
*   **Final Reduction:** 4 + 1 = 5
**Life Path Number = 5**

## Brief Meanings of Life Path Numbers:

*   **Life Path 1:** The Leader/Innovator – Independent, pioneering, ambitious, needs to learn self-reliance.
*   **Life Path 2:** The Peacemaker/Diplomat – Cooperative, sensitive, intuitive, needs to learn balance and harmony.
*   **Life Path 3:** The Communicator/Entertainer – Expressive, creative, social, needs to learn self-expression and joy.
*   **Life Path 4:** The Builder/Organizer – Practical, disciplined, reliable, needs to learn structure and perseverance.
*   **Life Path 5:** The Adventurer/Freedom Seeker – Versatile, curious, dynamic, needs to learn constructive use of freedom.
*   **Life Path 6:** The Nurturer/Visionary – Responsible, loving, community-oriented, needs to learn balance in service.
*   **Life Path 7:** The Seeker/Analyst – Introspective, wise, spiritual, needs to learn faith and openness.
*   **Life Path 8:** The Powerhouse/Executive – Authoritative, ambitious, business-minded, needs to learn material mastery and empowerment.
*   **Life Path 9:** The Humanitarian/Sage – Compassionate, idealistic, wise, needs to learn unconditional love and completion.

## Master Numbers: 11, 22, 33

If your Life Path Number is 11, 22, or 33, you have a Master Number. These carry a higher vibration and indicate greater potential for achievement and spiritual growth, but also come with increased challenges and responsibilities.
*   **Life Path 11 (2):** The Inspired Healer/Intuitive – Heightened intuition, idealism, illumination. (Operates as a 2 but with amplified spiritual potential).
*   **Life Path 22 (4):** The Master Builder – Ability to turn dreams into reality, powerful manifestation. (Operates as a 4 but with amplified practical and spiritual power).
*   **Life Path 33 (6):** The Master Teacher/Healer – Profound compassion, spiritual service, unconditional love. (Operates as a 6 but with amplified teaching and healing abilities). (Note: 33 is rarer and some numerologists only focus on 11 and 22).

## Your Life Path and the NUMO Oracle

Understanding your Life Path Number provides a foundational context for your NUMO Oracle readings. The cards you draw can offer specific guidance on how to navigate the themes, challenges, and opportunities inherent in your Life Path. For example, if you are a Life Path 5 (The Adventurer) and draw cards from the Stone suit (Earth, stability), it might suggest a need to ground your adventurous spirit or find security amidst change.

Your Life Path Number is a lifelong companion. Embracing its lessons and leveraging its strengths can lead to a more fulfilling, purposeful, and authentic life. Explore your Life Path further with the [NUMO Oracle Numerology Calculator](/tools/numerology-calculator) and see how it illuminates your unique journey.
`,
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
    content: `
# Synergy of Symbols: Combining Tarot and Numerology for Deeper Insights

Tarot and Numerology are two powerful divination systems that offer profound insights into our lives, personalities, and potential futures. While each system is complete on its own, their true magic often unfolds when they are used in conjunction. By weaving together the symbolic imagery of Tarot with the vibrational wisdom of Numerology, practitioners can unlock richer, more nuanced, and multi-layered interpretations.

## Understanding the Foundations

*   **Tarot:** A deck of 78 cards, rich in archetypal imagery, divided into Major Arcana (representing significant life lessons and spiritual themes) and Minor Arcana (depicting everyday situations and experiences, further divided into four suits: Wands, Cups, Swords, Pentacles). Tarot readings tap into intuition and symbolic interpretation to provide guidance and clarity.
*   **Numerology:** The study of the mystical significance of numbers. Core numbers derived from a person's birth date (like the Life Path number) and name (like the Destiny or Expression number) reveal inherent traits, life purpose, challenges, and talents. Each number from 1 to 9, along with Master Numbers (11, 22, 33), carries a specific energetic vibration.

## Points of Connection and Synergy

The relationship between Tarot and Numerology is ancient and deep, particularly evident in the structure of the Tarot itself:

1.  **Major Arcana and Numbers:** Each of the 22 Major Arcana cards (0 to 21) has a direct numerical correspondence. The Fool is 0, The Magician is 1, The High Priestess is 2, and so on. The number of a Major Arcana card is key to its core meaning and often aligns with numerological interpretations of that number. For example, The Emperor (Card 4) resonates with the numerological themes of structure, stability, and authority associated with the number 4.
2.  **Minor Arcana and Numbers:** The numbered cards in each Minor Arcana suit (Ace through 10) also carry the vibrational essence of their number, filtered through the lens of their elemental suit. An Ace (1) always signifies new beginnings, while a Ten (1+0=1) often indicates completion leading to a new start.
3.  **Court Cards:** While not directly numbered in the same way, Court Cards (Page, Knight, Queen, King) can be associated with numerological concepts related to stages of development or personality archetypes.
4.  **Life Path and Tarot Archetypes:** A person's Life Path number can often find a strong resonance with one or more Major Arcana cards. For instance, someone with a Life Path 1 (The Leader) might strongly identify with The Magician. Exploring these connections can provide deeper self-understanding.

## Techniques for Combining Tarot and Numerology

*   **Numerological Significance of Drawn Cards:** When a card is drawn in a Tarot reading, consider its number. How does the numerological meaning of that number enhance or clarify the card's traditional interpretation? For example, drawing the 5 of Pentacles (loss, hardship) can be deepened by understanding the numerological energy of 5 (change, instability, freedom). This might suggest that the hardship is leading to necessary change or a new form of freedom.
*   **Calculating the Quintessence Card:** In a Tarot spread, you can sum the numbers of all drawn cards (reducing Major Arcana above 9 to a single digit, or keeping them as is if the total doesn't exceed 21, depending on the method) to arrive at a "Quintessence" or "Overall Theme" card from the Major Arcana. This provides a numerological summary of the reading's core message.
*   **Personal Year and Tarot:** Determine your current Personal Year in numerology (Birth Month + Birth Day + Current Year, reduced to a single digit or Master Number). Find the Major Arcana card corresponding to this number. This card can represent the overarching theme or lesson for your current year, providing context for any Tarot readings done during that time.
*   **NUMO Oracle Integration:** The NUMO Oracle system inherently blends numerology with elemental card suits. This provides a direct bridge. For example, if your numerology chart shows a strong emphasis on the number 1 (Fire/Sword in NUMO), and you draw many Sword cards, this reinforces the theme of action and initiative. Conversely, if you draw Cauldron (Water/2) cards, it might indicate a need to balance your fiery nature with emotional reflection.

## Benefits of Integration

*   **Enhanced Depth:** Numerology adds a structural and vibrational layer to the intuitive and symbolic insights of Tarot.
*   **Increased Clarity:** Numerical associations can help pinpoint the core message of a card or spread, especially when interpretations seem ambiguous.
*   **Personalized Readings:** Connecting Tarot cards to an individual's personal numerology (Life Path, Destiny numbers) makes the reading more specific and relevant to their unique energetic blueprint.
*   **Holistic Understanding:** Combining these systems offers a more comprehensive view of a situation or personal journey, addressing both the archetypal patterns (Tarot) and the underlying energetic frequencies (Numerology).

By exploring the synergy between Tarot and Numerology, you can unlock a more profound and insightful divination practice. These two ancient arts speak a common language of symbols and vibrations, and listening to their combined wisdom can illuminate your path with extraordinary clarity.
`,
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
    content: `
# The Mystical Power of the Sword: Symbolism and Significance

The sword, an iconic emblem throughout human history, transcends its role as a mere weapon to become a potent symbol of power, justice, and decisive action. Its gleaming blade, often depicted cutting through darkness or illusion, represents clarity of thought, truth, and the unwavering resolve needed to uphold principles. In countless cultures, the sword is intrinsically linked to leadership and sovereignty; kings are coronated with swords, knights are dubbed with them, and legendary heroes wield them as extensions of their valor and divine mandate. Think of King Arthur's Excalibur, not just a weapon but a symbol of rightful rule and destiny, or the Japanese katana, embodying the samurai's spirit and discipline. This connection to authority also casts the sword as an instrument of justice, capable of both defending the innocent and punishing the wicked, demanding immense responsibility from its wielder.

Beyond its societal roles, the sword delves into the personal realm of courage and honor. To take up the sword is to accept a path of potential conflict, requiring bravery and a strong moral compass. In spiritual traditions, this translates to 'spiritual warfare' – the internal battle against one's own flaws, doubts, or external negative influences. The 'sword of spirit' mentioned in various texts is a metaphor for discernment, the ability to cut through mental clutter and perceive underlying truths. This makes the sword a tool for self-mastery, challenging individuals to hone their inner strength and integrity.

The historical and mythological tapestry is rich with swords of significance. From the flaming sword guarding Eden to the enchanted blades of epic heroes, these weapons often carry magical properties or divine blessings, signifying a connection to higher powers or fated events. In many traditions, the act of forging a sword is itself a sacred process, imbuing the metal with intention and elemental energies. This multifaceted symbolism—encompassing protection, sacrifice, the duality of creation and destruction, and the unwavering pursuit of truth—ensures the sword remains a compelling and enduring symbol in our collective consciousness, reminding us of the power of conviction and the sharp edge of responsibility.
  `,
    excerpt:
      "Explore the multifaceted symbolism of the sword, from its representation of power, justice, and protection to its connection with courage, honor, and spiritual warfare. Delve into its historical and cultural contexts.",
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
    content: `
# The Sacred Cord: Unraveling the Symbolism of Connection and Unity

The cord, in its elegant simplicity, is a universal symbol of connection, weaving through the spiritual and cultural fabric of humanity. It represents the invisible threads that bind us together, symbolizing unity, partnership, and the intricate web of relationships that shape our lives. The cord is often associated with the element of Air in many spiritual traditions, embodying the qualities of communication, intellect, and connection. In the NUMO Oracle system, the Cord suit is linked to the element of Air, further emphasizing its role in facilitating communication, networking, and mental agility.

## The Cord in NUMO Oracle: Embracing Air's Wisdom

In the NUMO Oracle, the Cord suit is aligned with the element of **Air**. This connection highlights themes of:

*   **Communication and Clarity:** Air governs our thoughts, ideas, and the exchange of information. The Cord cards encourage open dialogue, clear expression, and the sharing of knowledge.
*   **Intellect and Strategy:** Like the wind that carries seeds, the Cord teaches us to be strategic, to think critically, and to use our intellect to navigate challenges.
*   **Connection and Networking:** The cord symbolizes the threads that connect us to others, emphasizing the importance of social interaction, collaboration, and building meaningful relationships.
*   **Change and Adaptability:** Air is ever-changing, and the Cord reflects this adaptability, showing us how to flow with life's shifts and embrace new opportunities.

## Working with Cord Energy

To connect with the symbolism of the cord in your own life:

*   **Engage in Communication:** Practice active listening and clear expression to deepen your connections with others.
*   **Think Strategically:** Use your intellect to plan and execute your goals, navigating challenges with wisdom and foresight.
*   **Build Relationships:** Focus on nurturing your social connections, forming partnerships that support your growth and aspirations.
*   **Embrace Change:** Be open to new experiences and opportunities, adapting to life's changes with grace and resilience.

The cord reminds us that within the web of relationships, we find our greatest strength and potential for growth. By embracing its wisdom, we can navigate our lives with greater clarity, purpose, and connection to others.
`,
    excerpt:
      "Explore the deep spiritual meanings and symbolism associated with the cord in various mystical traditions, and its connection to the NUMO Oracle's Air element.",
    author: "NUMO Oracle Team",
    isPublished: true,
    createdAt: "2025-06-06T10:00:00Z",
    updatedAt: "2025-06-07T10:00:00Z",
    featuredImage: "/images/blog/generated/sacred-cord-symbolism.png",
    categories: ["Symbolism", "Mysticism", "Oracle Wisdom", "Elemental Wisdom"],
    tags: ["cord", "spiritual symbolism", "connection", "air element", "unity", "NUMO Oracle"],
  },
]

export const pages: Page[] = [
  {
    id: "1",
    title: "Home",
    slug: "home",
    content: "Welcome to the home page!",
    isPublished: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
]

/* ---------- Simple in-memory helpers – good enough for build-time ---------- */
export function getPages() {
  return pages
}

export function getPageById(id: string) {
  return pages.find((p) => p.id === id) ?? null
}

export function updatePage(id: string, data: Partial<Page>) {
  const page = getPageById(id)
  if (page) Object.assign(page, data, { updatedAt: new Date().toISOString() })
  return page
}

export function getPosts() {
  return posts.filter((p) => p.isPublished)
}

export function getAllPosts() {
  return posts
}

export function getPost(id: string) {
  return posts.find((p) => p.id === id) ?? null
}

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug) ?? null
}

export function updatePost(id: string, data: Partial<Post>) {
  const post = getPost(id)
  if (post) Object.assign(post, data, { updatedAt: new Date().toISOString() })
  return post
}

export function deletePost(id: string) {
  const idx = posts.findIndex((p) => p.id === id)
  if (idx !== -1) posts.splice(idx, 1)
}
