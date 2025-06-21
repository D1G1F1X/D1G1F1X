import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Advanced Reading Techniques",
  description:
    "Explore advanced techniques for interpreting patterns, thematic readings, and compound numbers in NUMO Oracle.",
}

export default function AdvancedTechniquesPage() {
  return (
    <main className="container mx-auto px-4 py-12 font-body">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-heading">
          <span className="text-white">Advanced Reading </span>
          <span className="text-purple-400">Techniques</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Beyond layering personal numbers and elements, advanced readings involve recognizing patterns across multiple
          cards and using specialized spreads.
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook/personalizing-readings">Personalizing Readings</Link>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <Link href="/guidebook/compound-numbers">Interpreting Compound Numbers</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardContent className="p-8 prose prose-invert max-w-none">
          <h2 className="font-heading text-text-heading mt-8 border-b-2 border-border-color pb-2 text-2xl">
            Interpreting Patterns
          </h2>
          <p className="text-text-main">
            Patterns reveal repeating themes and deeper lessons. Repeating numbers (e.g., multiple 5s) indicate a major
            period of change. Repeating elements (e.g., several Fire cards) suggest a time of intense action and
            ambition. Notice clashes as well: multiple Fire and Water cards together can indicate a deep internal
            conflict between passion and emotion.
          </p>

          <h2 className="font-heading text-text-heading mt-8 border-b-2 border-border-color pb-2 text-2xl">
            Thematic Readings
          </h2>
          <p className="text-text-main">
            Focus on overarching life themes by adapting card interpretations. In a love reading, Cauldron cards carry
            more weight. In a career reading, Spear and Stone suits are more significant. Always ask how the card's
            energy applies specifically to the context of the question.
          </p>

          <h2 className="font-heading text-text-heading mt-8 border-b-2 border-border-color pb-2 text-2xl">
            Incorporating Compound Numbers
          </h2>
          <p className="text-text-main">
            One of the most powerful advanced techniques is to look at the Compound Number a querent's name or birth
            date creates before it is reduced. This number reveals a hidden karmic lesson or life path influence, as
            detailed in the next chapter.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook/personalizing-readings">Personalizing Readings</Link>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <Link href="/guidebook/compound-numbers">Interpreting Compound Numbers</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </main>
  )
}
