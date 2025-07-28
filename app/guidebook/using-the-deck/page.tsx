import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Sparkles, LayoutDashboard, Dice5 } from "lucide-react"

export default function UsingTheDeckPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-50">Using the NUMO Oracle Deck</h1>
        <Link href="/guidebook" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guidebook
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="bg-gray-900/80 text-gray-50 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Preparing for a Reading</CardTitle>
            <CardDescription className="text-gray-300">Setting the intention and space for clarity.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <Image
                src="/numerology-oracle-spread.png"
                alt="Oracle Card Spread"
                fill
                className="object-cover"
                priority
              />
            </div>
            <p className="text-lg leading-relaxed">
              Before drawing cards, it&apos;s important to create a sacred space and set a clear intention. This can be
              done through meditation, lighting candles, or simply taking a few deep breaths to center yourself.
            </p>
            <p className="text-lg leading-relaxed">
              Formulate your question clearly and concisely. The more specific your question, the more focused and
              relevant your reading will be. Remember, the NUMO Oracle provides guidance, not definitive answers,
              empowering you to make informed decisions.
            </p>
            <h3 className="mt-6 text-xl font-semibold">Tips for Preparation:</h3>
            <ul className="list-disc space-y-2 pl-6 text-lg text-gray-300">
              <li>Find a quiet space where you won&apos;t be disturbed.</li>
              <li>Clear your mind of distractions and focus on your intention.</li>
              <li>Shuffle the cards while concentrating on your question.</li>
              <li>Trust your intuition when drawing cards.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 text-gray-50 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Interpreting Your Cards</CardTitle>
            <CardDescription className="text-gray-300">
              Unlocking the multi-layered messages of the NUMO Oracle.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <Image
                src="/playing-cards-scattered.png"
                alt="Scattered Playing Cards"
                fill
                className="object-cover"
                priority
              />
            </div>
            <p className="text-lg leading-relaxed">
              Each NUMO Oracle card carries a rich tapestry of meaning, combining its number, suit, and elemental
              influence. To interpret your reading, consider:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-lg text-gray-300">
              <li>
                <strong>The Number:</strong> Its core numerological vibration and universal archetype.
              </li>
              <li>
                <strong>The Suit:</strong> The area of life or type of energy it represents (Cauldron for emotion, Sword
                for intellect, etc.).
              </li>
              <li>
                <strong>The Elements:</strong> The specific energetic flavor (Fire for action, Water for intuition,
                etc.).
              </li>
              <li>
                <strong>Card Position:</strong> If using a spread, how the card&apos;s position influences its meaning.
              </li>
              <li>
                <strong>Intuition:</strong> Your personal feelings and insights are paramount.
              </li>
            </ul>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Button asChild>
                <Link href="/tools/simple-card-reading">
                  <Sparkles className="mr-2 h-4 w-4" /> Get a Simple Reading
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/tools/card-simulator">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Try the Card Simulator
                </Link>
              </Button>
              <Button asChild variant="outline" className="sm:col-span-2 bg-transparent">
                <Link href="/tools/elemental-dice">
                  <Dice5 className="mr-2 h-4 w-4" /> Roll Elemental Dice
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
