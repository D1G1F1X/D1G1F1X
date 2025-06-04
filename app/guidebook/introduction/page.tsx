import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Introduction",
  description: "Introduction to the NUMO Oracle system and what makes it unique",
}

export default function IntroductionPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-white">Introduction to the </span>
          <span className="text-purple-400">NUMO Oracle</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Discover the unique system that harmonizes ancient wisdom with modern insights
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook">Back to Guidebook</Link>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Link href="/guidebook/number-pairings">Number Pairings</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardContent className="p-8">
          <div className="prose prose-invert max-w-none">
            <p className="lead text-xl">
              The NUMO Oracle Deck is not just another divination tool; it is a powerful system designed to harmonize
              ancient wisdom with modern insights, offering users a deeper understanding of themselves and the universe
              around them.
            </p>

            <p>
              Created by visionary mystic Raziel Ali, this deck weaves together the disciplines of numerology,
              astrology, and mystical traditions into a comprehensive tool for spiritual exploration and self-discovery.
            </p>

            <h2>What Makes the NUMO Oracle Deck Unique?</h2>

            <h3>1. Numerical Symmetry and Patterns</h3>
            <p>
              At the heart of the NUMO Oracle Deck lies the discovery of symmetrical numerical patterns on the number
              line. This discovery reveals the hidden relationships between numbers, energies, and cosmic forces,
              providing a structured framework for understanding life's dualistic nature.
            </p>
            <p>
              The number pairs (such as 0 and 1, 2 and 5, etc.) demonstrate how opposites attract and balance each
              other, reflecting the delicate dance between creation and destruction, expansion and contraction, light
              and shadow. This symmetry is based on an ancient Indo-Arabic system, integrated into modern spiritual
              practices through the deck.
            </p>

            <div className="flex justify-center my-8">
              <div className="relative h-64 w-full max-w-2xl">
                <Image src="/numerology-oracle-spread.png" alt="Numerical Symmetry" fill className="object-contain" />
              </div>
            </div>

            <h3>2. Astrological Integration</h3>
            <p>
              Each card in the deck is imbued with astrological energies, linking the influences of celestial bodies to
              everyday life. Planets such as Saturn, Venus, Mars, and Pluto are aligned with specific cards, offering
              guidance based on planetary movements and astrological archetypes. The deck also considers the influences
              of the Sun, Moon, and other celestial forces, giving each card a rich astrological context.
            </p>

            <h3>3. Elemental Influences</h3>
            <p>
              The NUMO Oracle Deck draws heavily on the five classical elements—Earth, Air, Fire, Water, and Spirit.
              Each element reflects a different aspect of life, from grounding and stability (Earth) to communication
              and intellect (Air) to passion and transformation (Fire). These elements are intertwined with the card's
              interpretations, creating a multidimensional understanding of each reading.
            </p>

            <h3>4. Divine Connection to Danu</h3>
            <p>
              The Goddess Danu, a central figure in both Celtic and Indonesian mythology, plays a significant role in
              the spiritual foundation of the NUMO Oracle Deck. Danu represents creation, life-giving forces, and cosmic
              order. Her presence in the deck symbolizes the connection between the ancient past and the present,
              between the seen and unseen worlds. Through Danu's energies, the deck becomes a conduit for both earthly
              and divine wisdom.
            </p>

            <h3>5. Blending Modern and Ancient Practices</h3>
            <p>
              The NUMO Oracle Deck bridges the gap between ancient numerology, astrology, and mysticism with modern
              spiritual practices. While it respects the traditional symbolism and teachings of these disciplines, it
              also incorporates contemporary insights, making it accessible for practitioners of all levels—whether
              you're a seasoned numerologist, astrologist, tarot reader or someone beginning their spiritual journey.
            </p>

            <h2>The Five Sacred Gifts of Danu</h2>
            <p>
              The NUMO system is shaped by the Goddess Danu through her five sacred gifts: the Cauldron, Sword, Spear,
              Stone, and Cord. These gifts represent essential aspects of life—creation, wisdom, strength, stability,
              and spiritual connection—and help us navigate the cycles of existence.
            </p>

            <ul>
              <li>
                <strong>The Cauldron (Fire):</strong> The Cauldron symbolizes creation and inspiration, aligned with the
                element of Fire. It represents the creative force, the potential for new beginnings, and the spark of
                life that Danu, as the mother goddess, offers.
              </li>
              <li>
                <strong>The Sword (Air):</strong> The Sword represents clarity, intellect, and decision-making, tied to
                the element of Air. The Sword represents clarity, intellect, and decision-making, tied to the element of
                Air. This gift reflects Danu's wisdom, helping us to see clearly and make choices that cut through
                confusion. The Sword is associated with numbers like 2 and 5, which are linked to balance and
                adaptability, ensuring that we remain aligned with our higher purpose.
              </li>
              <li>
                <strong>The Spear (Water):</strong> The Spear is a symbol of strength, emotional depth, and spiritual
                guidance, aligned with the element of Water. In Celtic mythology, Danu is closely associated with water,
                as seen in her connection to rivers, reflecting the flow of intuition and emotions. The Spear offers the
                ability to navigate emotional and spiritual challenges with resilience and insight.
              </li>
              <li>
                <strong>The Stone (Earth):</strong> The Stone symbolizes grounding, stability, and fulfillment,
                connected to the element of Earth. This gift reflects Danu's nurturing role as a goddess of fertility
                and abundance, providing the foundation for long-term growth and success.
              </li>
              <li>
                <strong>The Cord (Spirit):</strong> The Cord represents spiritual connection and continuity, symbolizing
                the element of Spirit. This final gift ties together all of Danu's other gifts, reminding us that we are
                always connected to the flow of life and the universe.
              </li>
            </ul>

            <h2>Embracing the NUMO Oracle Journey</h2>
            <p>
              As you begin your journey with the NUMO Oracle Deck, remember that it is more than just a divination
              tool—it is a gateway to deeper understanding, personal growth, and spiritual connection. By exploring the
              numerical patterns, astrological influences, and elemental energies within the deck, you can gain insights
              into your life's path, challenges, and opportunities.
            </p>
            <p>
              Whether you are seeking guidance on relationships, career, spiritual growth, or personal development, the
              NUMO Oracle Deck offers a comprehensive framework for understanding the forces at play in your life and
              how to navigate them with wisdom and clarity.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook">Back to Guidebook</Link>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Link href="/guidebook/number-pairings">Number Pairings</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </main>
  )
}
