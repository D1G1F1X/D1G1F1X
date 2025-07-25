import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Image from "next/image"

export const metadata = {
  title: "Introduction to Numo Oracle",
  description: "Learn about the Numo Oracle system and its unique approach to numerology and divination.",
}

export default function IntroductionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome to the Numo Oracle</CardTitle>
          <CardDescription>
            Discover a new way to explore numerology and gain insights into your life's path.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">What is the Numo Oracle?</h2>
            <p>
              The Numo Oracle is a unique system that blends the ancient wisdom of numerology with the intuitive art of
              oracle cards. It provides a powerful tool for self-discovery, guidance, and understanding the patterns
              that shape your life.
            </p>
            <Image
              src="/images/numerology-oracle-spread.png"
              alt="Numo Oracle Spread"
              width={700}
              height={400}
              className="rounded-md"
            />
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Key Components</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Numerology:</strong> The foundation of the system, using numbers to reveal hidden meanings and
                influences.
              </li>
              <li>
                <strong>Oracle Cards:</strong> Beautifully designed cards that represent different aspects of life and
                provide intuitive guidance.
              </li>
              <li>
                <strong>Elements:</strong> The four classical elements (Fire, Water, Earth, Air) add another layer of
                interpretation.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">How to Use the Numo Oracle</h2>
            <p>
              Using the Numo Oracle is simple and intuitive. Start by formulating a question or intention, then select a
              card or combination of cards. Use the guidebook to interpret the meanings and apply them to your
              situation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Benefits of the Numo Oracle</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Gain deeper self-awareness</li>
              <li>Receive guidance and clarity</li>
              <li>Understand life patterns and cycles</li>
              <li>Make informed decisions</li>
              <li>Connect with your intuition</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
