import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Image from "next/image"

export const metadata = {
  title: "Cauldron Guidebook",
  description: "Explore the symbolism and meanings of the Cauldron in the Numo Oracle system.",
}

export default function CauldronGuidebookPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">The Cauldron: A Guide to Symbolism</CardTitle>
          <CardDescription>
            Uncover the mystical meanings behind the Cauldron and its role in the Numo Oracle.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">What is the Cauldron?</h2>
            <p>
              The Cauldron is one of the core symbols in the Numo Oracle, representing transformation, potential, and
              the source of all things. It embodies the power to create, destroy, and regenerate.
            </p>
            <Image
              src="/images/blog/cauldron-symbolism.png"
              alt="Cauldron Symbolism"
              width={700}
              height={400}
              className="rounded-md"
            />
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Key Concepts</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Transformation:</strong> The Cauldron signifies the ability to change and evolve, turning raw
                ingredients into something new.
              </li>
              <li>
                <strong>Potential:</strong> It represents untapped possibilities and the promise of what can be created.
              </li>
              <li>
                <strong>Nurturing:</strong> The Cauldron is a vessel that nurtures growth and development.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Interpreting the Cauldron in Readings</h2>
            <p>
              When the Cauldron appears in a reading, consider what transformations are taking place in your life. Are
              you harnessing your potential? What new creations are on the horizon?
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">The Cauldron and the Elements</h2>
            <p>The Cauldron interacts with the other elements to provide deeper insights. For example:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Cauldron and Fire:</strong> Passion, energy, and the spark of creation.
              </li>
              <li>
                <strong>Cauldron and Water:</strong> Emotions, intuition, and the flow of change.
              </li>
              <li>
                <strong>Cauldron and Earth:</strong> Grounding, stability, and the manifestation of ideas.
              </li>
              <li>
                <strong>Cauldron and Air:</strong> Intellect, communication, and the sharing of knowledge.
              </li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
