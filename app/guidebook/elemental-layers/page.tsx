import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Interpreting Elemental Layers",
  description: "Understand how the three elemental layers (Base, Synergistic, Drawn) interact in NUMO Oracle readings.",
}

export default function ElementalLayersPage() {
  return (
    <main className="container mx-auto px-4 py-12 font-body">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-heading">
          <span className="text-white">Interpreting </span>
          <span className="text-purple-400">Elemental Layers</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Learn how the three elemental layers interact to provide nuanced readings.
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <Link href="/guidebook/card-meanings">The Cards & Their Meanings</Link>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <Link href="/guidebook/personalizing-readings">Personalizing Readings</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardContent className="p-8 prose prose-invert max-w-none">
          <p className="lead text-xl text-text-main">
            One of the most advanced features of the NUMOracle Deck is its use of multiple elemental layers.
            Understanding how these layers interact provides a profoundly nuanced reading. Each card has three potential
            elemental influences: the inherent <strong className="text-text-heading">Base Element</strong>, the
            supportive <strong className="text-text-heading">Synergistic Element</strong>, and the variable{" "}
            <strong className="text-text-heading">Drawn Element (or Elemental Accent)</strong>, which is indicated by
            the color of the central icon on the card you draw.
          </p>

          <h2 className="font-heading text-text-heading mt-8 border-b-2 border-border-color pb-2 text-2xl">
            The Three Elemental Layers Defined
          </h2>
          <ol className="list-decimal pl-6 text-text-main space-y-4">
            <li>
              <strong className="text-text-heading">The Base Element:</strong> This is the card's fundamental,
              unchanging nature. It defines the core domain of the card's energy. Think of it as the "subject" of the
              sentence—<strong className="text-text-heading">what</strong> the card is fundamentally about. For example,
              the Base Element of the 2 Sword is <strong className="text-text-heading">Water</strong>, meaning the card
              is always, at its core, about emotional balance, intuition, and reflection.
            </li>
            <li>
              <strong className="text-text-heading">The Synergistic Element:</strong> This is a secondary inherent
              element that supports, enhances, or modifies the Base Element. It adds a specific flavor or depth to the
              card's core theme, acting like an "adjective." For the 2 Sword, the Synergistic Element is also{" "}
              <strong className="text-text-heading">Water</strong>, powerfully deepening its focus on emotional
              intelligence and intuitive depth.
            </li>
            <li>
              <strong className="text-text-heading">The Drawn Element (Elemental Accent):</strong> This is the most
              dynamic layer. Indicated by the color of the central icon, this element represents the{" "}
              <em className="text-accent-gold">situational lens</em> through which the card's core message is being
              experienced. It answers the question of "how" or "where" the core theme is manifesting. It modifies the
              reading without changing the card's fundamental nature.
            </li>
          </ol>

          <h2 className="font-heading text-text-heading mt-8 border-b-2 border-border-color pb-2 text-2xl">
            How to Synthesize the Elements: A Step-by-Step Guide
          </h2>
          <p className="text-text-main">To create a layered interpretation, follow these steps:</p>
          <ol className="list-decimal pl-6 text-text-main space-y-4">
            <li>
              <strong className="text-text-heading">Identify the Core Theme (Base + Synergistic Elements):</strong>{" "}
              First, establish the card's foundational meaning. What is its unchangeable subject?
            </li>
            <li>
              <strong className="text-text-heading">Identify the Situational Flavor (Drawn Element):</strong> Look at
              the color of the icon. What element does it represent? This tells you how the core theme is currently
              manifesting.
            </li>
            <li>
              <strong className="text-text-heading">Synthesize the Meaning:</strong> Combine the core theme with the
              situational flavor. Ask: "How is the Drawn Element influencing the Base and Synergistic Elements right
              now?"
            </li>
          </ol>

          <h2 className="font-heading text-text-heading mt-8 border-b-2 border-border-color pb-2 text-2xl">
            Examples in Practice
          </h2>

          <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">
            Example 1: 2 Sword (Water Base) with an Air (Yellow) Accent
          </h5>
          <ul className="list-disc pl-6 text-text-main space-y-2">
            <li>
              <strong className="text-text-heading">Core Theme (Water):</strong> The fundamental issue is one of deep
              emotional balance, reflection, and intuition. You are facing a choice that requires emotional
              intelligence.
            </li>
            <li>
              <strong className="text-text-heading">Situational Flavor (Air):</strong> The current energy influencing
              this situation is Air—intellect, communication, analysis, and rational thought.
            </li>
            <li>
              <strong className="text-text-heading">Synthesized Interpretation:</strong>
              <blockquote className="border-l-4 border-accent-gold pl-5 my-4 italic text-text-main">
                You are facing a deeply emotional decision (Water), but you are trying to approach it with your mind
                (Air). There is a conflict between what you feel and what you think. The guidance of this card, with
                this specific elemental accent, is to use the clarity of Air not to overrule your feelings, but to{" "}
                <em className="text-accent-gold">understand</em> and articulate them, aligning thought with intuition.
              </blockquote>
            </li>
          </ul>

          <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">
            Example 2: 1 Cauldron (Fire Base) with a Water (Blue) Accent
          </h5>
          <ul className="list-disc pl-6 text-text-main space-y-2">
            <li>
              <strong className="text-text-heading">Core Theme (Fire):</strong> The fundamental subject is
              manifestation, action, personal power, and creative expression. The querent feels a drive to act and
              create something new.
            </li>
            <li>
              <strong className="text-text-heading">Situational Flavor (Water):</strong> The current energy is
              Water—emotions, intuition, and flow.
            </li>
            <li>
              <strong className="text-text-heading">Synthesized Interpretation:</strong>
              <blockquote className="border-l-4 border-accent-gold pl-5 my-4 italic text-text-main">
                Your drive to manifest (Fire) is currently being filtered through your emotions (Water). Your passion
                might feel dampened by uncertainty, or your actions may need to be guided by your intuition rather than
                pure willpower. This isn't a halt, but a call to ensure your creative actions are emotionally authentic.
                Are you pouring your heart into this, or are your emotions making you hesitant to act?
              </blockquote>
            </li>
          </ul>

          <h5 className="font-heading text-xl mt-6 mb-2 text-text-main font-semibold">
            Example 3: 6 Stone (Earth Base) with an Air (Yellow) Accent
          </h5>
          <ul className="list-disc pl-6 text-text-main space-y-2">
            <li>
              <strong className="text-text-heading">Core Theme (Earth):</strong> The fundamental issue is about material
              stability, grounding, daily rituals, and physical well-being. The focus is on the tangible foundations of
              life.
            </li>
            <li>
              <strong className="text-text-heading">Situational Flavor (Air):</strong> The current energy is
              Air—intellect, planning, communication, and new ideas.
            </li>
            <li>
              <strong className="text-text-heading">Synthesized Interpretation:</strong>
              <blockquote className="border-l-4 border-accent-gold pl-5 my-4 italic text-text-main">
                Your focus is on practical stability (Earth), but the situation is being influenced by new ideas or
                communication (Air). This could mean it's time to create a budget (Air + Earth), discuss household
                responsibilities (Air + Earth), or think strategically about your health routines. It advises using your
                intellect to organize and improve your material foundations.
              </blockquote>
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
          <Link href="/guidebook/card-meanings">The Cards & Their Meanings</Link>
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gray-700 text-text-main border-border-color hover:bg-gray-600 hover:text-white"
        >
          <Link href="/guidebook/personalizing-readings">Personalizing Readings</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </main>
  )
}
