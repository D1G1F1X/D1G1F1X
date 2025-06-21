import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "NUMO ORACLE | The NUMO System Philosophy",
  description: "The philosophical underpinnings of the NUMO Oracle system, including number pairings and Danu's gifts.",
}

export default function PhilosophyPage() {
  return (
    <main className="container mx-auto px-4 py-12 font-body">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-heading">
          <span className="text-white">The NUMO System </span>
          <span className="text-purple-400">Philosophy</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Explore the foundational concepts and unique pairings that define the NUMO Oracle.
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook/introduction">Introduction</Link>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <Link href="/guidebook/card-meanings">The Cards & Their Meanings</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardContent className="p-8 prose prose-invert max-w-none">
          <p className="lead text-xl text-text-main">
            The NUMO system introduces a revolutionary understanding of numerology by pairing numbers based on their
            visual, energetic, and symbolic properties. This system emphasizes how numbers are not isolated entities but
            interrelated forces that create balance and transformation.
          </p>

          <h2 className="font-heading text-text-heading mt-8 border-b-2 border-border-color pb-2 text-2xl">
            Visual Symbolism of the Number Pairings
          </h2>
          <ul className="list-disc pl-6 text-text-main space-y-4">
            <li>
              <strong className="text-text-heading">0 and 1 – The Cauldron:</strong> The primordial polarity of Being
              and Non-Being. The <strong className="text-text-heading">0</strong> is the cosmic egg of infinite
              potential; the <strong className="text-text-heading">1</strong> is the divine spark that begins creation.
            </li>
            <li>
              <strong className="text-text-heading">2 and 5 – The Sword:</strong> The relationship between stasis and
              dynamics. The number <strong className="text-text-heading">2</strong> symbolizes reflective harmony; the
              number <strong className="text-text-heading">5</strong> represents the dynamic change necessary for
              growth.
            </li>
            <li>
              <strong className="text-text-heading">3 and 8 – The Cord:</strong> The interplay between finite creation
              and infinite cycles. The number <strong className="text-text-heading">3</strong> is the spark of creative
              expression; the number <strong className="text-text-heading">8</strong> (the lemniscate) is the symbol of
              eternity and karma.
            </li>
            <li>
              <strong className="text-text-heading">4 and 7 – The Spear:</strong> The tension between material structure
              and spiritual seeking. The number <strong className="text-text-heading">4</strong> is earthly stability;
              the number <strong className="text-text-heading">7</strong> represents introspection and reaching for
              higher wisdom.
            </li>
            <li>
              <strong className="text-text-heading">6 and 9 – The Stone:</strong> The cycle of service and release. The
              number <strong className="text-text-heading">6</strong> represents nurturing care; the number
              <strong className="text-text-heading">9</strong> symbolizes completion and humanitarian wisdom.
            </li>
          </ul>

          <h2 className="font-heading text-text-heading mt-8 border-b-2 border-border-color pb-2 text-2xl">
            The Five Gifts of Danu: The Thematic Suits
          </h2>
          <p className="text-text-main">
            The Goddess Danu provides the spiritual and mythological backbone for the five suits of the deck. Each suit
            is one of her sacred gifts, representing an essential aspect of life.
          </p>
          <ul className="list-disc pl-6 text-text-main space-y-4">
            <li>
              <strong className="text-text-heading">The Cauldron (Fire):</strong> Symbolizing creation and inspiration,
              this is the gift of new beginnings.
            </li>
            <li>
              <strong className="text-text-heading">The Sword (Water):</strong> Representing clarity that arises from
              emotional depth, this is the gift of intuitive decision-making.
            </li>
            <li>
              <strong className="text-text-heading">The Spear (Air):</strong> Representing ambition and strategy, this
              is the gift of purposeful action guided by intellect.
            </li>
            <li>
              <strong className="text-text-heading">The Stone (Earth):</strong> Symbolizing stability and fulfillment,
              this is the gift of grounding and abundance.
            </li>
            <li>
              <strong className="text-text-heading">The Cord (Spirit):</strong> Representing connection and destiny,
              this is the gift of understanding the threads of fate that connect all things.
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook/introduction">Introduction</Link>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <Link href="/guidebook/card-meanings">The Cards & Their Meanings</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </main>
  )
}
