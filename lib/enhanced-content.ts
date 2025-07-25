import type { Post } from "@/lib/content"

// Define a generic content item type for pages and posts
export interface ContentItem {
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
  type: "post" | "page" // Added type to distinguish
  published?: boolean // For pages, often just a boolean
  lastModified?: string // For pages, to track updates
}

// Mock data for pages (similar structure to posts for reusability)
const mockPages: ContentItem[] = [
  {
    id: "about",
    title: "About Us",
    slug: "about",
    content: "This is the content for the about page.",
    excerpt: "Learn more about our mission and values.",
    author: "Admin",
    isPublished: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    type: "page",
    published: true,
    lastModified: "2024-01-01T00:00:00Z",
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    slug: "privacy-policy",
    content: "This is our privacy policy content.",
    excerpt: "Understand how we handle your data.",
    author: "Admin",
    isPublished: true,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
    type: "page",
    published: true,
    lastModified: "2024-01-05T00:00:00Z",
  },
  {
    id: "terms-of-service",
    title: "Terms of Service",
    slug: "terms-of-service",
    content: "These are our terms of service.",
    excerpt: "Read our terms and conditions.",
    author: "Admin",
    isPublished: true,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
    type: "page",
    published: true,
    lastModified: "2024-01-10T00:00:00Z",
  },
]

// Enhanced blog posts with SEO optimization (from previous context)
export const enhancedBlogPosts: Post[] = [
  // Existing posts from the original system
  {
    id: "7",
    title: "Unlock Your Destiny: Introducing Our FREE Comprehensive Numerology Report!",
    slug: "free-comprehensive-numerology-report-launch",
    content: `# Unlock Your Destiny: Introducing Our FREE Comprehensive Numerology Report!

Have you ever felt a deep yearning to understand your true self, your life's purpose, and the unique path you're meant to walk? For centuries, numerology has offered profound insights into the intricate blueprint of our lives, hidden within our names and birth dates. Today, we're thrilled to announce a powerful new tool that puts this ancient wisdom directly into your hands – **absolutely FREE!**

Introducing the **NUMO Oracle Comprehensive Numerology Report** – your personalized guide to unlocking the secrets encoded in your numbers. This isn't just another basic calculator; it's an in-depth exploration designed to illuminate your journey, empower your decisions, and inspire profound self-discovery.

## What is Numerology, and Why Does It Matter?

Numerology is the ancient study of numbers and their mystical significance in our lives. It operates on the principle that everything in the universe, including you, vibrates with a specific numerical energy. By understanding these numbers – derived from your birth name and date – you can gain incredible clarity on:

- Your inherent talents and strengths
- Your deepest desires and motivations
- The challenges you're meant to overcome
- The opportunities that await you
- Your ultimate life purpose

## Your FREE Report Reveals

Our Comprehensive Numerology Report provides you with a rich, multi-faceted understanding of your unique numerical profile:

### Core Numbers Unveiled
- **Life Path Number:** Your life's purpose and central theme
- **Destiny Number:** Your innate talents and potential
- **Soul Urge Number:** Your deepest motivations and desires
- **Personality Number:** How others perceive you

### Life Cycles and Timing
- **Life Cycles Timeline:** Major phases of your life journey
- **Pinnacle Numbers:** Periods of opportunity and achievement
- **Challenge Numbers:** Lessons and growth opportunities
- **Personal Year Forecast:** Current energetic themes

### Hidden Wisdom
- **Karmic Lessons:** Skills to develop in this lifetime
- **Hidden Passion Number:** Natural talents and interests

Ready to decode your destiny? Get your FREE report now at [/tools/numerology-calculator](/tools/numerology-calculator)!`,
    excerpt: "Discover your life's blueprint with NUMO Oracle's FREE Comprehensive Numerology Report. Uncover your core numbers, life cycles, and hidden wisdom to unlock your true potential.",
    author: "NUMO Oracle Team",
    isPublished: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z",
    featuredImage: "/images/blog/numerology-report-feature.png",
    categories: ["Numerology", "Free Tools", "Self-Discovery"],
    tags: ["numerology report", "life path", "destiny number", "free tools", "self-discovery"],
  },

  // The Five Gifts of Danu - SEO Optimized Posts
  {
    id: "danu-cauldron",
    title: "The Cauldron of Danu: Sacred Vessel of Transformation and Abundance",
    slug: "cauldron-of-danu-sacred-vessel-transformation",
    content: `# The Cauldron of Danu: Sacred Vessel of Transformation and Abundance

In the rich tapestry of Celtic mythology, few symbols hold as much power and mystique as the Cauldron of Danu, one of the five sacred treasures gifted by the goddess Danu to her people. This mystical vessel represents far more than a simple cooking pot – it embodies the very essence of transformation, nourishment, and the infinite abundance of the divine feminine.

## The Mythological Origins of Danu's Cauldron

Danu, the primordial mother goddess of the Tuatha Dé Danann, bestowed upon her children five sacred gifts to aid them in their earthly journey. The Cauldron, associated with the element of Water in the NUMO Oracle system, serves as a vessel of endless provision and spiritual transformation.

Ancient Celtic texts describe the Cauldron as having the power to:
- Provide inexhaustible nourishment to the worthy
- Restore life to fallen warriors
- Grant wisdom and inspiration to poets and seers
- Transform base materials into precious substances

## Symbolism and Spiritual Significance

### The Womb of Creation
The Cauldron's rounded, receptive form naturally connects it to the cosmic womb – the space where all creation begins. In spiritual practice, it represents:

- **Receptivity**: The ability to receive divine inspiration and guidance
- **Gestation**: The patient nurturing of ideas and dreams into reality
- **Birth**: The manifestation of potential into physical form

### Elemental Water Associations
In the NUMO Oracle system, the Cauldron aligns with the Water element, bringing forth qualities of:

- **Emotional depth and intuition**
- **Healing and purification**
- **Flow and adaptability**
- **Reflection and inner wisdom**

## Working with Cauldron Energy in Modern Practice

### Meditation and Visualization
Envision yourself before Danu's sacred Cauldron. What do you need to be nourished? What aspects of your life require transformation? Allow the Cauldron's energy to fill you with healing waters.

### Ritual Applications
- **New Moon ceremonies**: Use cauldron imagery for setting intentions
- **Healing work**: Visualize the Cauldron's waters washing away illness
- **Abundance rituals**: Call upon the Cauldron's endless provision

### Daily Integration
- Practice gratitude for the nourishment in your life
- Embrace your receptive, intuitive nature
- Allow yourself to be a vessel for others' healing

## The Cauldron in NUMO Oracle Readings

When Cauldron cards appear in your NUMO Oracle readings, they often indicate:
- A time for emotional healing and renewal
- The need to trust your intuitive wisdom
- Opportunities for spiritual nourishment and growth
- The importance of being receptive to divine guidance

## Connecting with Danu's Gift Today

The Cauldron of Danu reminds us that we all possess the capacity for transformation and abundance. By honoring this sacred vessel within ourselves, we open to the endless flow of divine provision and the power to transform our lives from within.

Whether you're seeking healing, inspiration, or simply a deeper connection to the sacred feminine, the Cauldron of Danu offers its timeless wisdom to all who approach with reverence and an open heart.`,
    excerpt: "Explore the mystical Cauldron of Danu, one of five sacred Celtic treasures. Discover its symbolism, spiritual significance, and how to work with its transformative energy in modern practice.",
    author: "Celtic Wisdom Keeper",
    isPublished: true,
    createdAt: "2025-01-10T09:00:00Z",
    updatedAt: "2025-01-10T09:00:00Z",
    featuredImage: "/images/blog/cauldron-danu-sacred-vessel.png",
    categories: ["Celtic Mythology", "Sacred Symbols", "Spiritual Practice"],
    tags: ["Danu", "cauldron", "Celtic mythology", "sacred treasures", "transformation", "water element"],
  },

  {
    id: "danu-\
