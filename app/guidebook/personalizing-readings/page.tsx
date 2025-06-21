import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { LifePathCalculator } from "@/components/life-path-calculator"
import { DestinyNumberCalculator } from "@/components/destiny-number-calculator"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Personalizing Readings with Numerology",
  description: "Learn how to integrate personal numerology data into your NUMO Oracle readings for deeper insights.",
}

export default function PersonalizingReadingsPage() {
  return (
    <main className="container mx-auto px-4 py-12 font-body">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-heading">
          <span className="text-white">Personalizing Readings with </span>
          <span className="text-purple-400">Numerology</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Unlock a powerful layer of personalization by integrating your core numerology numbers.
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook/elemental-layers">Interpreting Elemental Layers</Link>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <Link href="/guidebook/advanced-techniques">Advanced Reading Techniques</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardContent className="p-8 prose prose-invert max-w-none">
          <p className="lead text-xl text-text-main">
            Beyond the universal meanings of the cards, the NUMOracle system is designed to resonate deeply with the
            querent's personal energetic blueprint. By calculating and understanding a few key numbers from their life,
            you can unlock a powerful layer of personalization in every reading.
          </p>

          <h2 className="font-heading text-text-heading mt-8 border-b-2 border-border-color pb-2 text-2xl">
            Calculating Your Core Numbers
          </h2>
          <p className="text-text-main">
            Two of the most important numbers are the Life Path Number (from your birth date) and the Destiny Number
            (from your birth name).
          </p>

          <div className="my-8 space-y-8">
            <LifePathCalculator />
            <DestinyNumberCalculator />
          </div>

          <h2 className="font-heading text-text-heading mt-8 border-b-2 border-border-color pb-2 text-2xl">
            How to Integrate Personal Numbers in a Reading
          </h2>
          <p className="text-text-main">
            Knowing a querent's core numbers transforms a reading from a general forecast to a personal dialogue. It
            reveals two key dynamics: <strong className="text-text-heading">Resonance</strong> and{" "}
            <strong className="text-text-heading">Tension</strong>.
          </p>

          <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">
            Resonance: When the Cards Align with Your Path
          </h5>
          <p className="text-text-main">
            When a querent draws a card whose number matches their Life Path or Destiny Number, the message is
            amplified. It signifies that the card's theme is a central, powerful force in their life at that moment,
            directly related to their core purpose.
          </p>
          <blockquote className="border-l-4 border-accent-gold pl-5 my-4 italic text-text-main">
            <strong className="text-text-heading">Example of Resonance:</strong> Alex, with a Life Path 9, draws the{" "}
            <strong className="text-text-heading">9 Stone (Witness and Completion)</strong>. This is a powerful
            confirmation. The reading isn't just about general completion; it's about a completion that is fundamental
            to Alex's soul journey of humanitarianism, wisdom, and letting go. The message is: "Pay close attention.
            This event is a core part of who you are and what you came here to learn."
          </blockquote>

          <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">
            Tension: When the Cards Challenge Your Path
          </h5>
          <p className="text-text-main">
            When a querent draws a card whose number represents a conflicting energy to their core numbers, it
            highlights a key area of challenge, growth, and learning. It shows where the universe is pushing them
            outside their comfort zone to create greater balance.
          </p>
          <blockquote className="border-l-4 border-accent-gold pl-5 my-4 italic text-text-main">
            <strong className="text-text-heading">Example of Tension:</strong> Our same Alex with a Life Path 9
            (completion, wisdom) draws the <strong className="text-text-heading">1 Cauldron (Manifestation)</strong>.
            The 1's energy of new beginnings, ego, and individuality is in direct tension with the 9's energy of endings
            and collective service. The reading becomes about a specific challenge: "How can you start something new (1)
            while honoring the wisdom of what you need to complete (9)? You are being asked to balance individual
            ambition with your higher purpose of service."
          </blockquote>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook/elemental-layers">Interpreting Elemental Layers</Link>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <Link href="/guidebook/advanced-techniques">Advanced Reading Techniques</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </main>
  )
}
