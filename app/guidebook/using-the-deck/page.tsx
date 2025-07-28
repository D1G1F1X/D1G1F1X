import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen, Lightbulb, Sparkles } from "lucide-react"
import Link from "next/link"

export default function UsingTheDeckGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-foreground mb-4">Using the NUMO Oracle Deck</h1>
        <p className="text-lg text-muted-foreground">A step-by-step guide to conducting insightful readings.</p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6">
            <Image
              src="/numerology-oracle-spread.png"
              alt="Oracle Card Spread"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="text-muted-foreground leading-relaxed">
            The NUMO Oracle is designed to be intuitive, yet powerful. This guide will walk you through the process of
            preparing for a reading, choosing a spread, interpreting your cards, and integrating the insights into your
            life. Whether you're a seasoned diviner or new to oracle cards, these steps will help you unlock the deck's
            full potential.
          </p>
        </CardContent>
      </Card>

      <Separator className="my-12" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-primary-foreground mb-6 flex items-center gap-2">
          <BookOpen className="h-7 w-7" /> Steps for a Reading
        </h2>
        <ol className="space-y-6 list-decimal list-inside text-muted-foreground text-lg">
          <li>
            <strong>Set Your Intention:</strong> Before you begin, find a quiet space. Take a few deep breaths and focus
            on the question or area of your life you seek guidance on. Formulate a clear, open-ended question.
          </li>
          <li>
            <strong>Shuffle & Draw:</strong> Mentally hold your question as you shuffle the digital deck. When you feel
            ready, select the number of cards for your chosen spread.
          </li>
          <li>
            <strong>Choose Your Spread:</strong>
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                <strong>Single Card:</strong> For a quick insight or daily guidance.
              </li>
              <li>
                <strong>Three Cards:</strong> Often used for Past-Present-Future, Situation-Action-Outcome, or
                Mind-Body-Spirit.
              </li>
              <li>
                <strong>Five Elements:</strong> A deeper dive into the elemental influences on your situation.
              </li>
            </ul>
          </li>
          <li>
            <strong>Receive Your Reading:</strong> The AI will interpret the cards drawn in relation to your question
            and chosen spread, providing a comprehensive reading.
          </li>
          <li>
            <strong>Reflect & Integrate:</strong> Read the interpretation carefully. How does it resonate with your
            situation? What actions can you take based on the guidance? Journaling your insights can be very helpful.
          </li>
        </ol>
      </section>

      <Separator className="my-12" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-primary-foreground mb-6 flex items-center gap-2">
          <Lightbulb className="h-7 w-7" /> Tips for Deeper Readings
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">Personalize Your Experience</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Consider entering your name and birth details in the simulator. This allows the AI to integrate
              numerological insights, adding another layer of personalization to your reading.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg">Explore Card Meanings</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              After your reading, use the "Card Directory" to explore the individual meanings of the cards you drew.
              This can deepen your understanding beyond the AI's interpretation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg">Journal Your Readings</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Keeping a record of your readings, questions, and insights can help you track your spiritual growth and
              identify recurring themes or patterns over time.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg">Trust Your Intuition</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              While the AI provides comprehensive interpretations, your intuition is your most powerful guide. Allow the
              reading to spark your own inner wisdom and trust what resonates most deeply with you.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Separator className="my-12" />

      <section className="text-center">
        <h2 className="text-3xl font-bold text-primary-foreground mb-6 flex items-center justify-center gap-2">
          <Sparkles className="h-7 w-7" /> Ready to Begin?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">Start your journey of self-discovery with the NUMO Oracle.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/tools/card-simulator">Draw Your First Cards</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/guidebook/cauldron">Explore the Cauldron Suit</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/tools/numerology-calculator">Numerology Calculator</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
