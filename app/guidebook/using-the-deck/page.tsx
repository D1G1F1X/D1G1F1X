import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Image from "next/image"

export const metadata = {
  title: "Using the Numo Oracle Deck",
  description: "Learn how to effectively use the Numo Oracle deck for readings and divination.",
}

export default function UsingTheDeckPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">How to Use the Numo Oracle Deck</CardTitle>
          <CardDescription>A step-by-step guide to performing readings with the Numo Oracle deck.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Preparing for a Reading</h2>
            <p>
              Before you begin, find a quiet and comfortable space where you can focus without distractions. Take a few
              deep breaths to center yourself and clear your mind.
            </p>
            <Image
              src="/images/oracle-cards-spread.png"
              alt="Oracle Cards Spread"
              width={700}
              height={400}
              className="rounded-md"
            />
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Formulating Your Question</h2>
            <p>
              The key to a good reading is a clear and specific question. Avoid yes/no questions and instead focus on
              open-ended inquiries that invite insight and guidance.
            </p>
            <p>Examples:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>What can I do to improve my current relationship?</li>
              <li>What is the best path for my career at this time?</li>
              <li>What lessons can I learn from this challenging situation?</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Selecting Your Cards</h2>
            <p>There are several ways to select cards from the Numo Oracle deck:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Single Card Draw:</strong> Shuffle the deck and draw one card for a quick and focused answer.
              </li>
              <li>
                <strong>Three-Card Spread:</strong> Draw three cards to represent the past, present, and future of your
                situation.
              </li>
              <li>
                <strong>Custom Spread:</strong> Create your own spread based on your specific question or intention.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Interpreting the Cards</h2>
            <p>
              Use the guidebook to understand the meanings of each card you select. Pay attention to the card's number,
              suit, element, and imagery. Consider how the cards relate to each other and to your question.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Reflecting on the Reading</h2>
            <p>
              After the reading, take some time to reflect on the insights you have gained. How do the cards resonate
              with your current situation? What actions can you take based on the guidance you have received?
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
