"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LazyImage } from "@/components/lazy-image"

// Card data from the original cards page
const cardData = [
  {
    id: 1,
    name: "Rooted Wisdom",
    element: "Earth",
    image: "/cards/rooted-wisdom.png",
    description:
      "Represents stability, growth, and material abundance. This card calls you to ground yourself and connect with the physical world.",
    keywords: ["Stability", "Growth", "Abundance", "Grounding"],
  },
  {
    id: 2,
    name: "Water Wisdom",
    element: "Water",
    image: "/cards/water-wisdom.png",
    description:
      "Symbolizes emotions, intuition, and flow. This card invites you to dive deep into your feelings and trust your inner knowing.",
    keywords: ["Emotion", "Intuition", "Flow", "Healing"],
  },
  {
    id: 3,
    name: "Fiery Blade Oracle",
    element: "Fire",
    image: "/cards/fiery-blade-oracle.png",
    description:
      "Embodies passion, transformation, and action. This card encourages you to take inspired action and embrace change.",
    keywords: ["Passion", "Transformation", "Action", "Energy"],
  },
  {
    id: 4,
    name: "Spirit Stone Oracle",
    element: "Spirit",
    image: "/cards/spirit-stone-oracle.png",
    description:
      "Represents spiritual connection, higher wisdom, and divine guidance. This card calls you to listen to your higher self.",
    keywords: ["Spirituality", "Wisdom", "Guidance", "Connection"],
  },
  {
    id: 5,
    name: "Whispers of the Zephyr Spear",
    element: "Air",
    image: "/cards/Whispers-of-the-Zephyr-Spear.png",
    description:
      "Symbolizes intellect, communication, and clarity. This card invites you to clear your mind and express your truth.",
    keywords: ["Intellect", "Communication", "Clarity", "Freedom"],
  },
  {
    id: 6,
    name: "Fiery Brew",
    element: "Fire",
    image: "/cards/fiery-brew.png",
    description:
      "Represents creative passion, inspiration, and transformation. This card encourages you to embrace your creative fire.",
    keywords: ["Creativity", "Inspiration", "Transformation", "Passion"],
  },
  {
    id: 7,
    name: "Water Stone Oracle",
    element: "Water",
    image: "/cards/Water-Stone-Oracle.png",
    description:
      "Symbolizes emotional wisdom, intuitive knowledge, and healing. This card invites you to trust your emotional intelligence.",
    keywords: ["Emotional Wisdom", "Intuition", "Healing", "Flow"],
  },
  {
    id: 8,
    name: "Spirit Spear Oracle",
    element: "Spirit",
    image: "/cards/spirit-spear-oracle.png",
    description:
      "Represents spiritual direction, purpose, and divine intervention. This card calls you to align with your higher purpose.",
    keywords: ["Purpose", "Direction", "Divine Guidance", "Alignment"],
  },
  {
    id: 9,
    name: "Whispers of the Zephyr Blade",
    element: "Air",
    image: "/cards/Whispers-of-the-Zephyr-Blade.png",
    description:
      "Symbolizes mental clarity, decisive action, and truth. This card encourages you to cut through illusion with clear thinking.",
    keywords: ["Clarity", "Decision", "Truth", "Mental Acuity"],
  },
  {
    id: 10,
    name: "Earth Stone Oracle",
    element: "Earth",
    image: "/cards/earth-stone-oracle.png",
    description:
      "Represents grounding, stability, and material manifestation. This card invites you to connect with the physical realm.",
    keywords: ["Grounding", "Stability", "Manifestation", "Practicality"],
  },
  // Additional cards from the original page...
  {
    id: 11,
    name: "Spear of Fire IV",
    element: "Fire",
    image: "/cards/47spear-fire.jpg",
    description:
      "Represents passionate direction, creative focus, and energetic purpose. This card encourages you to direct your creative fire with purpose and intention.",
    keywords: ["Passion", "Direction", "Energy", "Purpose", "Transformation"],
  },
  {
    id: 12,
    name: "Sword of Water V",
    element: "Water",
    image: "/cards/52sword-water.jpg",
    description:
      "Symbolizes emotional clarity, intuitive truth, and feeling-based discernment. This card invites you to cut through emotional confusion with intuitive wisdom.",
    keywords: ["Emotional Clarity", "Intuition", "Discernment", "Truth", "Feeling"],
  },
  {
    id: 13,
    name: "Sword of Spirit V",
    element: "Spirit",
    image: "/cards/52sword-spirit.jpg",
    description:
      "Embodies spiritual clarity, divine truth, and transcendent insight. This card calls you to cut through illusion with divine wisdom and see the higher truth.",
    keywords: ["Spiritual Clarity", "Divine Truth", "Transcendence", "Insight", "Wisdom"],
  },
  {
    id: 14,
    name: "Spear of Earth IV",
    element: "Earth",
    image: "/cards/47spear-earth.jpg",
    description:
      "Represents material direction, practical focus, and grounded purpose. This card encourages you to direct your energy toward tangible goals with stability.",
    keywords: ["Grounding", "Direction", "Stability", "Purpose", "Manifestation"],
  },
  {
    id: 15,
    name: "Sword of Air V",
    element: "Air",
    image: "/cards/52sword-air.jpg",
    description:
      "Symbolizes mental clarity, intellectual truth, and clear communication. This card invites you to express your thoughts with precision and insight.",
    keywords: ["Clarity", "Intellect", "Communication", "Truth", "Thought"],
  },
  {
    id: 16,
    name: "Stone of Fire VI",
    element: "Fire",
    image: "/cards/69stone-fire.jpg",
    description:
      "Represents passionate foundation, creative stability, and transformative grounding. This card calls you to build a solid base for your creative and spiritual fire.",
    keywords: ["Passionate Foundation", "Creative Stability", "Transformative Grounding", "Structured Fire"],
  },
  {
    id: 17,
    name: "Stone of Water VI",
    element: "Water",
    image: "/cards/69stone-water.jpg",
    description:
      "Symbolizes emotional foundation, intuitive stability, and relational grounding. This card invites you to create solid containers for your emotions and intuition.",
    keywords: ["Emotional Foundation", "Intuitive Stability", "Relational Grounding", "Structured Water"],
  },
  {
    id: 18,
    name: "Spear of Spirit VII",
    element: "Spirit",
    image: "/cards/74spear-spirit.jpg",
    description:
      "Embodies spiritual seeking, divine quest, and soul exploration. This card encourages you to actively pursue higher wisdom and pierce the veil of ordinary reality.",
    keywords: ["Spiritual Seeking", "Divine Quest", "Soul Exploration", "Higher Wisdom"],
  },
  {
    id: 19,
    name: "Spear of Air VII",
    element: "Air",
    image: "/cards/74spear-air.jpg",
    description:
      "Represents intellectual seeking, communicative quest, and mental exploration. This card calls you to actively pursue knowledge and share your ideas with clarity.",
    keywords: ["Intellectual Seeking", "Communicative Quest", "Mental Exploration", "Knowledge Pursuit"],
  },
  {
    id: 20,
    name: "Stone of Earth VI",
    element: "Earth",
    image: "/cards/69stone-earth.jpg",
    description:
      "Symbolizes material foundation, physical stability, and practical grounding. This card invites you to build solid structures for abundance and tangible creations.",
    keywords: ["Material Foundation", "Physical Stability", "Practical Grounding", "Resource Management"],
  },
  {
    id: 21,
    name: "Stone of Spirit IX",
    element: "Spirit",
    image: "/cards/96stone-spirit.jpg",
    description:
      "Symbolizes spiritual completion, divine wholeness, and transcendent foundation. This card represents the culmination of spiritual growth and a solid connection with higher consciousness.",
    keywords: [
      "Spiritual Completion",
      "Divine Wholeness",
      "Transcendent Foundation",
      "Higher Consciousness",
      "Spiritual Mastery",
    ],
  },
  {
    id: 22,
    name: "Cord of Fire VIII",
    element: "Fire",
    image: "/cards/83cord-fire.jpg",
    description:
      "Represents passionate connection, creative binding, and transformative union. This card reveals the powerful links between different aspects of your fiery nature.",
    keywords: ["Connection", "Binding", "Union", "Tethering", "Link"],
  },
  {
    id: 23,
    name: "Cord of Earth VIII",
    element: "Earth",
    image: "/cards/83cord-earth.jpg",
    description:
      "Symbolizes material connection, practical binding, and grounded union. This card reveals the strong ties that provide stability and support for your material endeavors.",
    keywords: ["Connection", "Binding", "Union", "Stability", "Resources"],
  },
  {
    id: 24,
    name: "Cord of Spirit VIII",
    element: "Spirit",
    image: "/cards/83cord-spirit.jpg",
    description:
      "Embodies divine connection, spiritual binding, and transcendent union. This card reveals profound links to higher consciousness and spiritual realms.",
    keywords: ["Divine Connection", "Spiritual Binding", "Transcendent Union", "Soul Tethering"],
  },
  {
    id: 25,
    name: "Cord of Water VIII",
    element: "Water",
    image: "/cards/83cord-water.jpg",
    description:
      "Represents emotional connection, intuitive binding, and relational union. This card reveals deep emotional ties and intuitive links with others.",
    keywords: ["Emotional Connection", "Intuitive Binding", "Relational Union", "Empathic Link"],
  },
]

// Find the entry for "Cord of Air XXXVIII" and ensure its image path is correct
const cardEntry = cardData.find((card) => card.name === "Cord of Air XXXVIII" || card.id === "38cord-air")
if (cardEntry) {
  cardEntry.image = "/cards/83cord-air.jpg"
}

// Client-side card component to handle events
const CardImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="relative w-full h-64 mb-4 rounded-md overflow-hidden">
      <LazyImage
        src={src || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(alt)}`}
        alt={alt}
        fill
        className="object-cover"
        loadingStrategy="progressive"
        rootMargin="200px"
      />
    </div>
  )
}

export default function CardCatalog() {
  const elementTypes = ["All", "Earth", "Water", "Fire", "Air", "Spirit"]
  const [searchTerm, setSearchTerm] = useState("")

  // Filter cards based on search term and selected element
  const filterCards = (cards: typeof cardData, element: string) => {
    return cards.filter((card) => {
      const matchesElement = element === "All" || card.element === element
      const matchesSearch =
        searchTerm === "" ||
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase()))

      return matchesElement && matchesSearch
    })
  }

  return (
    <div>
      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search cards by name, description, or keywords..."
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="All" className="w-full mb-8">
        <div className="flex justify-center mb-8">
          <TabsList className="bg-gray-800">
            {elementTypes.map((element) => (
              <TabsTrigger
                key={element}
                value={element}
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                {element}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {elementTypes.map((element) => (
          <TabsContent key={element} value={element} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterCards(cardData, element).map((card) => (
                <Card
                  key={card.id}
                  className="bg-gray-800 border-gray-700 overflow-hidden hover:border-purple-500 transition-all"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-purple-400">{card.name}</CardTitle>
                    <CardDescription className="text-gray-400">Element: {card.element}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <CardImage src={card.image} alt={card.name} />
                    <p className="text-gray-300">{card.description}</p>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2 pt-0">
                    {card.keywords.map((keyword, idx) => (
                      <span key={idx} className="bg-gray-700 text-purple-300 px-2 py-1 rounded-full text-xs">
                        {keyword}
                      </span>
                    ))}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-white">Ready to experience the wisdom of the cards?</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link
              href="#five-card-spread"
              onClick={() => document.querySelector('[data-value="five-card-spread"]')?.click()}
            >
              Try a Reading
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-900/20">
            <Link href="/buy">Get Your Deck</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
