import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"

export default function IntroductionPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-50">Introduction to NUMO Oracle</h1>
        <Link href="/guidebook" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guidebook
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="bg-gray-900/80 text-gray-50 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">What is the NUMO Oracle?</CardTitle>
            <CardDescription className="text-gray-300">
              A unique blend of numerology and oracle card wisdom.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <Image
                src="/mystical-oracle-cards.png"
                alt="Mystical Oracle Cards"
                fill
                className="object-cover"
                priority
              />
            </div>
            <p className="text-lg leading-relaxed">
              The NUMO Oracle is a powerful divination system that combines the ancient wisdom of numerology with the
              intuitive guidance of oracle cards. Each card is a unique fusion of a numerical vibration, a symbolic
              suit, and an elemental influence, offering multi-layered insights into your life&apos;s journey.
            </p>
            <p className="text-lg leading-relaxed">
              It is designed to help you uncover hidden truths, understand energetic patterns, and navigate your path
              with clarity and purpose. Whether you are seeking answers, personal growth, or spiritual connection, the
              NUMO Oracle provides a profound tool for self-discovery.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 text-gray-50 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">How to Use This Guidebook</CardTitle>
            <CardDescription className="text-gray-300">
              Your companion for understanding the NUMO Oracle.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <Image src="/open-book-knowledge.png" alt="Open Book Knowledge" fill className="object-cover" priority />
            </div>
            <p className="text-lg leading-relaxed">
              This guidebook is your essential companion to the NUMO Oracle deck. It provides detailed explanations of
              each card&apos;s symbolism, numerological significance, elemental influences, and practical
              interpretations.
            </p>
            <p className="text-lg leading-relaxed">You can navigate through the sections to learn about:</p>
            <ul className="list-disc space-y-2 pl-6 text-lg text-gray-300">
              <li>The core principles of Numerology.</li>
              <li>The meaning of each of the five suits (Cauldron, Sword, Cord, Spear, Stone).</li>
              <li>The influence of the five elements (Spirit, Water, Earth, Air, Fire).</li>
              <li>How to perform readings and interpret card combinations.</li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/guidebook/using-the-deck">
                <BookOpen className="mr-2 h-4 w-4" /> Start Your Journey
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
