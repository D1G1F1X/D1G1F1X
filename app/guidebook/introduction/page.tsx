import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Introduction",
  description: "Introduction to the NUMO Oracle system and what makes it unique",
}

export default function IntroductionPage() {
  return (
    <main className="container mx-auto px-4 py-12 font-body">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-heading">
          <span className="text-white">Introduction to the </span>
          <span className="text-purple-400">NUMO Oracle</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Discover the unique system that harmonizes ancient wisdom with modern insights
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook">Back to Guidebook</Link>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <Link href="/guidebook/philosophy">NUMO System Philosophy</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardContent className="p-8 prose prose-invert max-w-none">
          <p className="lead text-xl text-text-main">
            The NUMOracle Deck is not just another divination tool; it is a powerful system designed to harmonize
            ancient wisdom with modern insights, offering users a deeper understanding of themselves and the universe
            around them. Created by visionary mystic Raziel Ali, this deck weaves together the disciplines of
            numerology, astrology, and mystical traditions into a comprehensive tool for spiritual exploration and
            self-discovery.
          </p>

          <h2 className="font-heading text-text-heading mt-8 border-b-2 border-border-color pb-2 text-2xl">
            What Makes the NUMOracle Deck Unique?
          </h2>
          <ol className="list-decimal pl-6 text-text-main space-y-4">
            <li>
              <strong className="text-text-heading">Numerical Symmetry and Patterns:</strong> At the heart of the
              NUMOracle Deck lies the discovery of symmetrical numerical patterns on the number line. This discovery
              reveals the hidden relationships between numbers, energies, and cosmic forces. The number pairings
              demonstrate the universal principle of duality—how opposites like creation and destruction, expansion and
              contraction, attract and balance one another. This framework is inspired by ancient Indo-Arabic and
              Pythagorean philosophies, which viewed numbers not as mere quantities but as archetypal forces
              representing divine order.
            </li>
            <li>
              <strong className="text-text-heading">Astrological Integration:</strong> Each card is imbued with
              astrological energies, linking planetary archetypes to everyday life. Planets are not just celestial
              bodies but represent fundamental psychological functions: Saturn embodies structure and discipline; Venus
              governs love and harmony; Mars signifies action and desire; Pluto represents deep transformation.
              Understanding these archetypes gives each card a rich, multi-layered context for guidance.
            </li>
            <li>
              <strong className="text-text-heading">Elemental Influences:</strong> The deck draws heavily on the five
              classical elements—Earth, Air, Fire, Water, and Spirit (Aether). These are the fundamental building blocks
              of existence. Earth represents the material world and grounding; Air governs the intellect and
              communication; Fire is the force of passion and will; Water rules the emotional and intuitive realms; and
              Spirit is the unifying life force that connects all things.
            </li>
            <li>
              <strong className="text-text-heading">Divine Connection to Danu:</strong> The Goddess Danu, a central
              figure in both Celtic and Indonesian mythology, provides the spiritual foundation. This remarkable
              parallel across cultures points to a universal Mother Archetype. The Celtic Danu is the ancestral mother
              of the Tuatha Dé Danann, associated with the land, fertility, and wisdom. The Balinese Dewi Danu is the
              supreme Water Goddess of Lake Batur, providing life-giving irrigation and prosperity. Both are sources of
              life and abundance, and their presence in the deck symbolizes the nurturing, creative power of the divine
              feminine.
            </li>
            <li>
              <strong className="text-text-heading">Blending Modern and Ancient Practices:</strong> The NUMOracle Deck
              bridges ancient mystical traditions with modern psychological and spiritual insights. It makes the
              profound symbolism of numerology and astrology accessible and relevant to contemporary life, offering a
              tool for self-discovery suitable for both seasoned practitioners and those just beginning their spiritual
              journey.
            </li>
          </ol>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook">Back to Guidebook</Link>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <Link href="/guidebook/philosophy">NUMO System Philosophy</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </main>
  )
}
