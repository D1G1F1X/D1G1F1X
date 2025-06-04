"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function NUMOracleGuide() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="suits">Sacred Suits</TabsTrigger>
          <TabsTrigger value="elements">Elements</TabsTrigger>
          <TabsTrigger value="spreads">Spreads</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Introduction to the NUMOracle System</CardTitle>
              <CardDescription>A divination system rooted in sacred wisdom and numerology</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The <strong>NUMOracle Deck</strong> is a divination system deeply rooted in the
                <strong> sacred wisdom of the Goddess Danu</strong>, the power of <strong>numerology</strong>, and the{" "}
                <strong>elemental forces</strong> that shape our reality. Each card is more than a symbol—it is a
                gateway to understanding the unseen forces that influence our paths.
              </p>

              <p>
                This system serves as a <strong>comprehensive reference</strong> for interpreting the NUMOracle cards,
                offering detailed insights into their meanings, symbolism, and the elemental influences that shape their
                energy. Each card is structured around
                <strong> five sacred suits</strong>, reflecting the divine gifts of Danu and their connection to{" "}
                <strong>numerical duality</strong>.
              </p>

              <div className="mt-6 bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                <h3 className="text-lg font-semibold mb-2">Understanding Card Components</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Symbolism Breakdown</span> – A deep dive into the numerical,
                    elemental, and mythological significance of each card.
                  </li>
                  <li>
                    <span className="font-medium">Key Meanings</span> – The core themes and lessons the card represents
                    in a reading.
                  </li>
                  <li>
                    <span className="font-medium">Orientation Meaning</span> – Whether upright or reversed, each card's
                    orientation influences its interpretation.
                  </li>
                  <li>
                    <span className="font-medium">Elemental Influences</span> – Each card has an elemental influence,
                    indicated by color: red for fire, white for spirit, yellow for air, green for earth, and blue for
                    water.
                  </li>
                  <li>
                    <span className="font-medium">Sacred Geometry</span> – The geometric patterns that connect each card
                    to universal cosmic laws and patterns.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>The Five Sacred Suits</CardTitle>
              <CardDescription>Divine gifts bestowed by the Goddess Danu</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="cauldron">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <span className="text-red-400 mr-2">🔥</span>
                      <span>The Cauldron of the Dagda (0 and 1)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      The realm of <strong>manifestation and transformation</strong>, representing
                      <strong> raw potential and the birth of form</strong>.
                    </p>
                    <p className="mb-2">
                      <strong>Base Element:</strong> Fire
                    </p>
                    <p>
                      The Cauldron represents the cosmic womb from which all possibilities emerge. As the first suit of
                      the NUMOracle, it governs the initial spark of creation and the process of bringing formless
                      potential into tangible reality.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sword">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <span className="text-blue-400 mr-2">⚔️</span>
                      <span>The Sword of Nuada (2 and 5)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      The power of <strong>clarity, truth, and decisive action</strong>, teaching the balance between
                      <strong> duality and change</strong>.
                    </p>
                    <p className="mb-2">
                      <strong>Base Element:</strong> Water
                    </p>
                    <p>
                      The Sword cuts through illusion to reveal truth and clarity. This suit governs decisions, mental
                      processes, and the power of discernment, teaching us about the necessity of clear thinking and
                      decisive action.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cord">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <span className="text-purple-400 mr-2">🧵</span>
                      <span>The Cord of Fate (3 and 8)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      The force of <strong>connection, destiny, and karmic interweaving</strong>, highlighting how our
                      actions shape the material and spiritual world.
                    </p>
                    <p className="mb-2">
                      <strong>Base Element:</strong> Spirit
                    </p>
                    <p>
                      The Cord binds energies, people, and destinies together. This suit governs relationships,
                      commitments, and the interconnected web of life, teaching us about the power of connection.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="spear">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-2">🔱</span>
                      <span>The Spear of Lugh (4 and 7)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      The <strong>pillar of protection, wisdom, and stability</strong>, guiding seekers toward
                      <strong> strength and spiritual insight</strong>.
                    </p>
                    <p className="mb-2">
                      <strong>Base Element:</strong> Air
                    </p>
                    <p>
                      The Spear stands as a symbol of strength, direction, and focused energy. This suit governs
                      protection, strategic action, and the wisdom gained through experience.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="stone">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">🗿</span>
                      <span>The Stone of Dagda (6 and 9)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      The foundation of <strong>love, completion, and fulfillment</strong>, teaching responsibility,
                      service, and the finality of life cycles.
                    </p>
                    <p className="mb-2">
                      <strong>Base Element:</strong> Earth
                    </p>
                    <p>
                      The Stone represents endurance, stability, and the culmination of cycles. This suit governs
                      material security, long-term growth, and the fulfillment of purpose.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="elements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Elemental Influences</CardTitle>
              <CardDescription>The five elements that shape the energy of each card</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Earth (Green)</h3>
                  <p className="mb-2">
                    <strong>Qualities:</strong> Stability, grounding, material concerns, practicality
                  </p>
                  <p>
                    Earth energy encourages you to focus on tangible results, create solid foundations, and ensure your
                    ideas are rooted in reality and supported by practical action.
                  </p>
                </div>

                <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">Air (Yellow)</h3>
                  <p className="mb-2">
                    <strong>Qualities:</strong> Intellect, communication, clarity, ideas
                  </p>
                  <p>
                    Air energy brings clarity to thought processes and emphasizes the power of imagination and
                    intellect. It signals a time to focus on communication, planning, and refining ideas.
                  </p>
                </div>

                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Fire (Red)</h3>
                  <p className="mb-2">
                    <strong>Qualities:</strong> Passion, energy, transformation, creativity
                  </p>
                  <p>
                    Fire energy supercharges the creative process with dynamic energy. It signifies that transformation
                    is happening quickly, encouraging bold steps forward to channel passion into action.
                  </p>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Water (Blue)</h3>
                  <p className="mb-2">
                    <strong>Qualities:</strong> Emotions, intuition, flow, relationships
                  </p>
                  <p>
                    Water energy emphasizes emotional and intuitive aspects of creation. It brings attention to inner
                    feelings and suggests that emotional depth is needed to fuel the creative process.
                  </p>
                </div>

                <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg md:col-span-2">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Spirit (White)</h3>
                  <p className="mb-2">
                    <strong>Qualities:</strong> Higher purpose, spiritual insight, divine connection, transcendence
                  </p>
                  <p>
                    Spirit energy transcends the material and focuses on spiritual essence. It highlights that your
                    process is guided by something greater—a divine spark or higher calling that aligns with universal
                    consciousness.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spreads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>NUMOracle Card Spreads</CardTitle>
              <CardDescription>Sacred layouts for different types of questions and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="single">
                  <AccordionTrigger>Single Card Reading</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      The simplest spread, drawing a single card provides focused insight on a specific question or
                      energy.
                    </p>
                    <p className="mb-2">
                      <strong>Best for:</strong> Daily guidance, simple yes/no questions, or understanding the primary
                      energy influencing a situation.
                    </p>
                    <p>
                      When interpreting a single card, pay special attention to the elemental color and orientation, as
                      these provide additional layers of meaning to the card's basic interpretation.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="three">
                  <AccordionTrigger>Three Card Spread</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      This classic spread reveals insights about past, present, and future energies influencing your
                      situation.
                    </p>
                    <p className="mb-2">
                      <strong>Card Positions:</strong>
                    </p>
                    <ul className="list-disc pl-5 mb-2">
                      <li>
                        <strong>First Card:</strong> Past influences and foundations
                      </li>
                      <li>
                        <strong>Second Card:</strong> Present circumstances and challenges
                      </li>
                      <li>
                        <strong>Third Card:</strong> Potential future outcomes based on current energies
                      </li>
                    </ul>
                    <p>
                      Consider how these energies flow together and influence each other. Look for patterns in elements,
                      numbers, or suits that might provide additional insight into your situation.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="five">
                  <AccordionTrigger>Five Card Cross</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      This comprehensive spread examines multiple aspects of a situation, providing a holistic view of
                      the energies at play.
                    </p>
                    <p className="mb-2">
                      <strong>Card Positions:</strong>
                    </p>
                    <ul className="list-disc pl-5 mb-2">
                      <li>
                        <strong>Center Card:</strong> The core essence of your question or situation
                      </li>
                      <li>
                        <strong>Top Card:</strong> Mental influences and thoughts affecting the outcome
                      </li>
                      <li>
                        <strong>Right Card:</strong> Future energies and potential developments
                      </li>
                      <li>
                        <strong>Bottom Card:</strong> Foundation and material aspects to consider
                      </li>
                      <li>
                        <strong>Left Card:</strong> Past influences and emotional patterns
                      </li>
                    </ul>
                    <p>
                      This spread mirrors the five elements, with each position corresponding to a different elemental
                      energy. The center represents Spirit, top is Air, right is Fire, bottom is Earth, and left is
                      Water.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="goddess">
                  <AccordionTrigger>The Goddess Path Spread</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      This seven-card spread explores your spiritual journey and connection to the divine feminine
                      wisdom of Danu.
                    </p>
                    <p className="mb-2">
                      <strong>Card Positions:</strong>
                    </p>
                    <ul className="list-disc pl-5 mb-2">
                      <li>
                        <strong>The Seeker:</strong> Your current position on the path
                      </li>
                      <li>
                        <strong>The Gift:</strong> What Danu is offering you at this time
                      </li>
                      <li>
                        <strong>The Challenge:</strong> What must be overcome or integrated
                      </li>
                      <li>
                        <strong>The Guide:</strong> What wisdom or assistance is available to you
                      </li>
                      <li>
                        <strong>The Sacrifice:</strong> What must be released or surrendered
                      </li>
                      <li>
                        <strong>The Transformation:</strong> How you will be changed by this journey
                      </li>
                      <li>
                        <strong>The Integration:</strong> The ultimate lesson or blessing to be received
                      </li>
                    </ul>
                    <p>
                      This spread is particularly powerful for spiritual questions or during times of significant
                      transformation.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Practice with NUMOracle</CardTitle>
              <CardDescription>Incorporating the cards into your spiritual routine</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Morning Guidance Draw</h3>
                  <p className="mb-2">
                    Start each day by drawing a single card with the question: "What energy should I embody today?" or
                    "What wisdom does Danu offer me for this day?"
                  </p>
                  <p>
                    Spend a few moments reflecting on the card's meaning and how it might apply to your upcoming
                    activities. Throughout the day, return to this guidance when facing decisions or challenges.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Weekly Element Focus</h3>
                  <p className="mb-2">
                    At the beginning of each week, draw a card to determine which elemental energy to focus on
                    developing. Throughout the week, pay special attention to how this element appears in your life and
                    practice activities that strengthen your connection to it.
                  </p>
                  <ul className="list-disc pl-5">
                    <li>
                      <strong>For Earth:</strong> Gardening, walking in nature, organizing physical spaces
                    </li>
                    <li>
                      <strong>For Air:</strong> Journaling, engaging in stimulating conversations, learning new concepts
                    </li>
                    <li>
                      <strong>For Fire:</strong> Physical exercise, creative expression, taking initiative
                    </li>
                    <li>
                      <strong>For Water:</strong> Emotional reflection, intuitive practices, nurturing relationships
                    </li>
                    <li>
                      <strong>For Spirit:</strong> Meditation, prayer, ritual work, contemplating life purpose
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Sacred Pause Practice</h3>
                  <p className="mb-2">
                    When facing an important decision or challenging situation, create a sacred pause with the
                    NUMOracle:
                  </p>
                  <ol className="list-decimal pl-5">
                    <li>Take three deep breaths to center yourself</li>
                    <li>State your question or concern clearly</li>
                    <li>Draw three cards: Challenge, Wisdom, Action</li>
                    <li>Reflect on how these cards illuminate your situation</li>
                    <li>Before acting, take another deep breath to integrate the guidance</li>
                  </ol>
                  <p className="mt-2">
                    This practice helps interrupt reactive patterns and creates space for more conscious choices aligned
                    with deeper wisdom.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
