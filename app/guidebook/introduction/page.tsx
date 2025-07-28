import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen, Lightbulb, Sparkles } from "lucide-react"
import Link from "next/link"

export default function IntroductionGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-foreground mb-4">Introduction to the NUMO Oracle</h1>
        <p className="text-lg text-muted-foreground">
          Unveiling the ancient wisdom of numbers, elements, and Celtic symbolism.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6">
            <Image src="/mystical-oracle-cards.png" alt="NUMO Oracle Cards" fill className="object-cover" priority />
          </div>
          <p className="text-muted-foreground leading-relaxed">
            The NUMO Oracle is a unique divination system that blends the ancient art of numerology with the profound
            symbolism of Celtic mythology and the five universal elements. Each card is a gateway to deeper
            self-understanding and offers guidance on your life's journey. It is designed to provide clear, actionable
            insights by harmonizing the logical precision of numbers with the intuitive wisdom of archetypal imagery.
          </p>
        </CardContent>
      </Card>

      <Separator className="my-12" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-primary-foreground mb-6 flex items-center gap-2">
          <BookOpen className="h-7 w-7" /> The Core Components
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Numerology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                At its heart, NUMO uses the vibrational energy of numbers (0-9) to reveal life paths, personality
                traits, and karmic lessons. Each number carries a unique energetic signature.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Celtic Symbolism</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Drawing from the rich tapestry of Celtic lore, the cards feature archetypal imagery, sacred geometry,
                and mythical figures that resonate with universal human experiences.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>The Five Elements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Fire, Water, Air, Earth, and Spirit are integrated into each card, providing a multi-layered
                understanding of energies at play and how they influence your situation.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>The Suits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The deck is divided into five suits: Cauldron (creation), Sword (intellect), Spear (willpower), Stone
                (foundation), and Cord (connection), each representing a different domain of life.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-primary-foreground mb-6 flex items-center gap-2">
          <Lightbulb className="h-7 w-7" /> How it Works
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">Drawing a Card</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              When you draw a card, its number, suit, and elemental associations combine to form a unique message. The
              AI-powered interpretation helps you understand these layers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg">Personalized Readings</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              By providing your name and birth details, the Oracle can integrate numerological insights into your
              reading, offering a truly personalized experience.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg">Beyond Prediction</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              The NUMO Oracle is not about predicting the future, but about empowering you with self-awareness and
              guidance to navigate your present and shape your future.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Separator className="my-12" />

      <section className="text-center">
        <h2 className="text-3xl font-bold text-primary-foreground mb-6 flex items-center justify-center gap-2">
          <Sparkles className="h-7 w-7" /> Begin Your Journey
        </h2>
        <p className="text-lg text-muted-foreground mb-8">Ready to unlock the secrets of the NUMO Oracle?</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/tools/card-simulator">Start a Reading</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/guidebook/using-the-deck">How to Use the Deck</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/tools/card-directory">Explore All Cards</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
