"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sparkles, BookOpen, Star, Flame, Droplets, Wind, Mountain, Info } from "lucide-react"

export function ReadingGuide() {
  const [activeStep, setActiveStep] = useState(1)

  const nextStep = () => {
    if (activeStep < 7) {
      setActiveStep(activeStep + 1)
    }
  }

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-black text-white p-6 rounded-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          <span className="text-purple-500">NUMO</span> ORACLE Reading Guide
        </h2>
        <p className="text-gray-300">
          Follow this comprehensive guide to perform insightful and meaningful readings with the NUMO Oracle cards.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">
            Step {activeStep}: {getStepTitle(activeStep)}
          </h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevStep}
              disabled={activeStep === 1}
              className="border-purple-500 text-purple-300"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextStep}
              disabled={activeStep === 7}
              className="border-purple-500 text-purple-300"
            >
              Next
            </Button>
          </div>
        </div>

        <div className="w-full bg-gray-800 h-2 rounded-full mb-6">
          <div
            className="bg-gradient-to-r from-purple-600 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(activeStep / 7) * 100}%` }}
          ></div>
        </div>

        <Card className="bg-gray-900/50 border-purple-500/30">
          <CardContent className="p-6">
            {activeStep === 1 && <SettingTheStage />}
            {activeStep === 2 && <PersonalizedNumerology />}
            {activeStep === 3 && <CardDrawingAndSpread />}
            {activeStep === 4 && <DeepDiveInterpretation />}
            {activeStep === 5 && <IntegratingAstrologyAndElements />}
            {activeStep === 6 && <SummarizingAndFollowUp />}
            {activeStep === 7 && <OngoingEngagement />}
          </CardContent>
        </Card>
      </div>

      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
        <h3 className="flex items-center text-lg font-medium mb-2">
          <Info className="mr-2 h-5 w-5 text-purple-400" />
          Reading Tips
        </h3>
        <ul className="space-y-2 text-gray-300">
          <li>Create a quiet, sacred space free from distractions before beginning your reading.</li>
          <li>Center yourself with a few deep breaths to clear your mind and connect with your intuition.</li>
          <li>
            Remember that the cards are tools for insight and guidance, not absolute predictions of unchangeable
            outcomes.
          </li>
          <li>
            Trust your intuition when interpreting the cards—your personal insights are just as valuable as traditional
            meanings.
          </li>
          <li>
            Consider journaling about your readings to track patterns and insights that emerge over multiple sessions.
          </li>
        </ul>
      </div>
    </div>
  )
}

function getStepTitle(step: number): string {
  switch (step) {
    case 1:
      return "Setting the Stage"
    case 2:
      return "Personalized Numerology"
    case 3:
      return "Card Drawing & Spread Selection"
    case 4:
      return "Deep Dive Interpretation"
    case 5:
      return "Integrating Astrology & Elements"
    case 6:
      return "Summarizing & Follow-Up"
    case 7:
      return "Ongoing Engagement"
    default:
      return ""
  }
}

function SettingTheStage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-purple-900/30 p-3 rounded-full">
          <Sparkles className="h-6 w-6 text-purple-400" />
        </div>
        <div>
          <h4 className="text-lg font-medium text-purple-300 mb-2">Setting the Stage</h4>
          <p className="text-gray-300 mb-4">
            Begin your reading by creating a connection with the querent and gathering essential information to
            personalize their experience.
          </p>
        </div>
      </div>

      <div className="space-y-4 pl-14">
        <div>
          <h5 className="font-medium text-purple-200 mb-1">Personal Connection</h5>
          <p className="text-gray-300">
            Begin by asking for the querent's name, birthdate, and the specific question they seek guidance on. This
            creates a personal connection and focuses the reading on their unique needs.
          </p>
          <div className="bg-gray-800/50 p-3 rounded-md mt-2 text-gray-300 italic">
            "Before we begin, may I know your name and birthdate? Also, what specific question or area of your life
            would you like guidance on today?"
          </div>
        </div>

        <div>
          <h5 className="font-medium text-purple-200 mb-1">Receive Key Data</h5>
          <p className="text-gray-300">
            The life path and destiny numbers will be automatically provided by the page code. Use these numbers to
            tailor the reading to the querent's specific numerological profile.
          </p>
          <div className="bg-gray-800/50 p-3 rounded-md mt-2 text-gray-300 italic">
            "Based on your birthdate and name, your Life Path Number is [X] and your Destiny Number is [Y]. These
            numbers will help us understand the energies that shape your journey."
          </div>
        </div>

        <div>
          <h5 className="font-medium text-purple-200 mb-1">Choose Your Path</h5>
          <p className="text-gray-300">Offer three distinct reading styles for the querent to choose from:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="bg-gray-800/50 p-3 rounded-md">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-purple-400" />
                <span className="font-medium text-purple-200">Numerology Insight</span>
              </div>
              <p className="text-sm text-gray-300">
                Focus on the implications of the provided life path and destiny numbers.
              </p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-md">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-blue-400" />
                <span className="font-medium text-blue-200">Astrological Influence</span>
              </div>
              <p className="text-sm text-gray-300">Explore how celestial energies shape your journey.</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-md">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="h-4 w-4 text-red-400" />
                <span className="font-medium text-red-200">Mystical Elemental Journey</span>
              </div>
              <p className="text-sm text-gray-300">Delve into the elemental forces at play in your life.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PersonalizedNumerology() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-purple-900/30 p-3 rounded-full">
          <Star className="h-6 w-6 text-purple-400" />
        </div>
        <div>
          <h4 className="text-lg font-medium text-purple-300 mb-2">Personalized Numerology</h4>
          <p className="text-gray-300 mb-4">
            Use the querent's numerological profile to provide personalized insights into their character, strengths,
            and challenges.
          </p>
        </div>
      </div>

      <div className="space-y-4 pl-14">
        <div>
          <h5 className="font-medium text-purple-200 mb-1">Interpret Life Path & Destiny Numbers</h5>
          <p className="text-gray-300">
            Use the provided life path and destiny numbers to give insights into the querent's character, strengths,
            challenges, and how these influence their current situation.
          </p>

          <Accordion type="single" collapsible className="mt-2">
            <AccordionItem value="life-path">
              <AccordionTrigger className="text-purple-200">Life Path Number Interpretations</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-gray-300">
                  <p>
                    <span className="font-medium text-purple-200">Life Path 1:</span> The Pioneer - Independent,
                    ambitious, and innovative. Currently focused on establishing independence and leadership.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Life Path 2:</span> The Mediator - Diplomatic,
                    cooperative, and intuitive. Currently navigating relationships and seeking harmony.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Life Path 3:</span> The Creator - Expressive,
                    optimistic, and creative. Currently exploring self-expression and communication.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Life Path 4:</span> The Builder - Practical,
                    disciplined, and reliable. Currently establishing foundations and structure.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Life Path 5:</span> The Freedom Seeker - Adaptable,
                    versatile, and progressive. Currently experiencing change and seeking freedom.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Life Path 6:</span> The Nurturer - Responsible,
                    compassionate, and harmonious. Currently focused on service and care for others.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Life Path 7:</span> The Seeker - Analytical,
                    introspective, and spiritual. Currently on a journey of inner wisdom and understanding.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Life Path 8:</span> The Achiever - Ambitious,
                    authoritative, and abundant. Currently focused on material success and power.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Life Path 9:</span> The Humanitarian - Compassionate,
                    idealistic, and global. Currently working toward completion and universal love.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="destiny">
              <AccordionTrigger className="text-purple-200">Destiny Number Interpretations</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-gray-300">
                  <p>
                    <span className="font-medium text-purple-200">Destiny 1:</span> Called to lead, innovate, and forge
                    new paths. Your purpose involves independence and pioneering spirit.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Destiny 2:</span> Called to mediate, cooperate, and
                    bring harmony. Your purpose involves diplomacy and intuitive understanding.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Destiny 3:</span> Called to create, express, and
                    inspire. Your purpose involves communication and bringing joy to others.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Destiny 4:</span> Called to build, organize, and
                    establish. Your purpose involves creating solid foundations and practical solutions.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Destiny 5:</span> Called to explore, adapt, and
                    transform. Your purpose involves embracing change and promoting freedom.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Destiny 6:</span> Called to nurture, heal, and
                    harmonize. Your purpose involves responsibility and service to others.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Destiny 7:</span> Called to analyze, understand, and
                    enlighten. Your purpose involves spiritual wisdom and deep knowledge.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Destiny 8:</span> Called to achieve, empower, and
                    manifest. Your purpose involves material mastery and executive ability.
                  </p>
                  <p>
                    <span className="font-medium text-purple-200">Destiny 9:</span> Called to serve, inspire, and
                    complete. Your purpose involves humanitarian work and universal compassion.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <h5 className="font-medium text-purple-200 mb-1">Engage</h5>
          <p className="text-gray-300">
            Ask how these numbers resonate with the querent. Encourage reflection and offer to explore specific aspects
            further if desired.
          </p>
          <div className="bg-gray-800/50 p-3 rounded-md mt-2 text-gray-300 italic">
            "How do these descriptions of your Life Path and Destiny Numbers resonate with you? Is there a particular
            aspect of either number that you'd like to explore further in our reading today?"
          </div>
        </div>
      </div>
    </div>
  )
}

function CardDrawingAndSpread() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-purple-900/30 p-3 rounded-full">
          <BookOpen className="h-6 w-6 text-purple-400" />
        </div>
        <div>
          <h4 className="text-lg font-medium text-purple-300 mb-2">Card Drawing & Spread Selection</h4>
          <p className="text-gray-300 mb-4">
            Guide the querent through selecting a spread and drawing cards that align with their focus and question.
          </p>
        </div>
      </div>

      <div className="space-y-4 pl-14">
        <div>
          <h5 className="font-medium text-purple-200 mb-1">Interactive Card Draw</h5>
          <p className="text-gray-300">Let the querent choose a spread that aligns with their focus:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="bg-gray-800/50 p-3 rounded-md">
              <h6 className="font-medium text-purple-200 mb-1">Past-Present-Future</h6>
              <p className="text-sm text-gray-300">
                A three-card spread that reveals insights about your past influences, current situation, and potential
                future outcomes.
              </p>
              <div className="flex justify-center gap-2 mt-3">
                <div className="w-8 h-12 bg-purple-900/30 rounded"></div>
                <div className="w-8 h-12 bg-purple-900/30 rounded"></div>
                <div className="w-8 h-12 bg-purple-900/30 rounded"></div>
              </div>
            </div>

            <div className="bg-gray-800/50 p-3 rounded-md">
              <h6 className="font-medium text-purple-200 mb-1">Challenges & Opportunities</h6>
              <p className="text-sm text-gray-300">
                A four-card spread that helps you navigate obstacles and uncover potentials in your current situation.
              </p>
              <div className="flex justify-center gap-2 mt-3">
                <div className="w-8 h-12 bg-purple-900/30 rounded"></div>
                <div className="w-8 h-12 bg-purple-900/30 rounded"></div>
                <div className="w-8 h-12 bg-purple-900/30 rounded"></div>
                <div className="w-8 h-12 bg-purple-900/30 rounded"></div>
              </div>
            </div>

            <div className="bg-gray-800/50 p-3 rounded-md">
              <h6 className="font-medium text-purple-200 mb-1">Mind-Body-Spirit</h6>
              <p className="text-sm text-gray-300">
                A three-card spread that provides a holistic overview of your mental, physical, and spiritual state.
              </p>
              <div className="flex justify-center mt-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-12 bg-purple-900/30 rounded mb-2"></div>
                  <div className="flex gap-2">
                    <div className="w-8 h-12 bg-purple-900/30 rounded"></div>
                    <div className="w-8 h-12 bg-purple-900/30 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h5 className="font-medium text-purple-200 mb-1">User Choice</h5>
          <p className="text-gray-300">
            Allow the querent to either "shuffle and draw" or let the system select cards, making the process
            interactive.
          </p>
          <div className="bg-gray-800/50 p-3 rounded-md mt-2 text-gray-300 italic">
            "Would you prefer to shuffle and draw the cards yourself, or would you like me to select them for you? Both
            approaches can provide meaningful insights, so choose whichever feels most comfortable to you."
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
            <Sparkles className="mr-2 h-4 w-4" />
            Draw Your Cards
          </Button>
        </div>
      </div>
    </div>
  )
}

function DeepDiveInterpretation() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-purple-900/30 p-3 rounded-full">
          <Sparkles className="h-6 w-6 text-purple-400" />
        </div>
        <div>
          <h4 className="text-lg font-medium text-purple-300 mb-2">Deep Dive Interpretation</h4>
          <p className="text-gray-300 mb-4">
            Provide detailed interpretations of each card drawn, connecting their meanings to the querent's question and
            numerological profile.
          </p>
        </div>
      </div>

      <div className="space-y-4 pl-14">
        <div>
          <h5 className="font-medium text-purple-200 mb-1">Detailed Card Reading</h5>
          <p className="text-gray-300">For each card, provide an insightful interpretation that covers:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-gray-800/50 p-3 rounded-md">
              <h6 className="font-medium text-purple-200 mb-1">Numerical Symbolism</h6>
              <p className="text-sm text-gray-300">
                Explain what the card's number represents both visually and spiritually. Connect this to the querent's
                Life Path or Destiny Number when relevant.
              </p>
              <div className="bg-gray-700/50 p-2 rounded-md mt-2 text-gray-300 text-xs italic">
                "This card bears the number 7, which resonates with spiritual seeking and inner wisdom. As it aligns
                with your Life Path Number, it suggests that your current situation is deeply connected to your soul's
                journey."
              </div>
            </div>

            <div className="bg-gray-800/50 p-3 rounded-md">
              <h6 className="font-medium text-purple-200 mb-1">Suit Meaning</h6>
              <p className="text-sm text-gray-300">
                Describe how the suit's energy (Cauldron, Sword, Spear, Stone, or Cord) influences the reading and
                relates to the querent's question.
              </p>
              <div className="bg-gray-700/50 p-2 rounded-md mt-2 text-gray-300 text-xs italic">
                "As a Sword card, this represents clarity, truth, and mental processes. In relation to your question
                about career decisions, this suggests you need to cut through confusion with clear thinking."
              </div>
            </div>

            <div className="bg-gray-800/50 p-3 rounded-md">
              <h6 className="font-medium text-purple-200 mb-1">Elemental & Planetary Associations</h6>
              <p className="text-sm text-gray-300">
                Connect the card's elemental (Earth, Water, Fire, Air, Spirit) and planetary associations to the
                querent's situation or question.
              </p>
              <div className="bg-gray-700/50 p-2 rounded-md mt-2 text-gray-300 text-xs italic">
                "This Water element card speaks to your emotional life and intuitive wisdom. It suggests that trusting
                your feelings will guide you through this transition period."
              </div>
            </div>

            <div className="bg-gray-800/50 p-3 rounded-md">
              <h6 className="font-medium text-purple-200 mb-1">Position Context</h6>
              <p className="text-sm text-gray-300">
                Interpret the card in the context of its position in the spread (Past, Present, Future, Challenge,
                Opportunity, etc.).
              </p>
              <div className="bg-gray-700/50 p-2 rounded-md mt-2 text-gray-300 text-xs italic">
                "In the Challenge position, this card reveals what's currently blocking your progress—a need to release
                old patterns of thinking that no longer serve you."
              </div>
            </div>
          </div>
        </div>

        <div>
          <h5 className="font-medium text-purple-200 mb-1">Interactive Reflection</h5>
          <p className="text-gray-300">
            After each card, prompt the querent with questions to encourage deeper engagement and reflection.
          </p>
          <div className="bg-gray-800/50 p-3 rounded-md mt-2 text-gray-300 italic">
            "How does this card's message align with what you're experiencing in your life right now? Does this
            interpretation resonate with you, or is there an aspect of it that feels particularly significant?"
          </div>
        </div>
      </div>
    </div>
  )
}

function IntegratingAstrologyAndElements() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-purple-900/30 p-3 rounded-full">
          <Star className="h-6 w-6 text-purple-400" />
        </div>
        <div>
          <h4 className="text-lg font-medium text-purple-300 mb-2">Integrating Astrology & Elements</h4>
          <p className="text-gray-300 mb-4">
            Connect the card meanings to astrological influences and elemental energies for a more comprehensive
            reading.
          </p>
        </div>
      </div>

      <div className="space-y-4 pl-14">
        <div>
          <h5 className="font-medium text-purple-200 mb-1">Astrological & Elemental Insights</h5>
          <p className="text-gray-300">
            If the querent chose an Astrological or Elemental reading path, tie the card meanings back to their
            astrological chart or elemental balances.
          </p>

          <Tabs defaultValue="astrology" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="astrology">Astrological Connections</TabsTrigger>
              <TabsTrigger value="elements">Elemental Balances</TabsTrigger>
            </TabsList>
            <TabsContent value="astrology" className="p-4 bg-gray-800/50 rounded-md mt-2">
              <div className="space-y-3">
                <p className="text-gray-300">
                  Connect the cards drawn to relevant astrological houses, planets, or zodiac signs that may be
                  influencing the querent's situation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gray-700/50 p-2 rounded-md">
                    <h6 className="font-medium text-purple-200 text-sm mb-1">Planetary Influences</h6>
                    <p className="text-xs text-gray-300">
                      "The Sword of Air card connects to Mercury's influence in your chart, highlighting communication
                      and intellectual clarity as key themes in your current situation."
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-2 rounded-md">
                    <h6 className="font-medium text-purple-200 text-sm mb-1">Zodiac Connections</h6>
                    <p className="text-xs text-gray-300">
                      "With this Fire element card appearing in your reading, the Leo energy in your chart is being
                      activated, calling you to express your authentic self with confidence."
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="elements" className="p-4 bg-gray-800/50 rounded-md mt-2">
              <div className="space-y-3">
                <p className="text-gray-300">
                  Analyze the elemental balance in the cards drawn to identify which energies are dominant or lacking in
                  the querent's life.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-700/50 p-2 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <Flame className="h-4 w-4 text-red-400" />
                      <h6 className="font-medium text-red-200 text-sm">Fire Element</h6>
                    </div>
                    <p className="text-xs text-gray-300">
                      Passion, creativity, transformation, and spiritual awakening
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-2 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="h-4 w-4 text-blue-400" />
                      <h6 className="font-medium text-blue-200 text-sm">Water Element</h6>
                    </div>
                    <p className="text-xs text-gray-300">Emotions, intuition, relationships, and healing</p>
                  </div>
                  <div className="bg-gray-700/50 p-2 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <Wind className="h-4 w-4 text-yellow-400" />
                      <h6 className="font-medium text-yellow-200 text-sm">Air Element</h6>
                    </div>
                    <p className="text-xs text-gray-300">Intellect, communication, ideas, and social connections</p>
                  </div>
                  <div className="bg-gray-700/50 p-2 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <Mountain className="h-4 w-4 text-green-400" />
                      <h6 className="font-medium text-green-200 text-sm">Earth Element</h6>
                    </div>
                    <p className="text-xs text-gray-300">Stability, abundance, practicality, and physical well-being</p>
                  </div>
                  <div className="bg-gray-700/50 p-2 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      <h6 className="font-medium text-purple-200 text-sm">Spirit Element</h6>
                    </div>
                    <p className="text-xs text-gray-300">
                      Divine connection, higher consciousness, and integration of all elements
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h5 className="font-medium text-purple-200 mb-1">Practical Application</h5>
          <p className="text-gray-300">
            Suggest actions or rituals based on the astrological or elemental insights from the reading.
          </p>
          <div className="bg-gray-800/50 p-3 rounded-md mt-2 text-gray-300 italic">
            "Based on the strong Water element in your reading, I recommend creating a small water ritual: place a bowl
            of water on your altar or desk, add a few drops of lavender oil, and spend a few minutes each morning
            connecting with your emotions and intuition before starting your day."
          </div>
        </div>
      </div>
    </div>
  )
}

function SummarizingAndFollowUp() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-purple-900/30 p-3 rounded-full">
          <BookOpen className="h-6 w-6 text-purple-400" />
        </div>
        <div>
          <h4 className="text-lg font-medium text-purple-300 mb-2">Summarizing & Follow-Up</h4>
          <p className="text-gray-300 mb-4">
            Conclude the reading by synthesizing insights and encouraging continued exploration.
          </p>
        </div>
      </div>

      <div className="space-y-4 pl-14">
        <div>
          <h5 className="font-medium text-purple-200 mb-1">Synthesis of Insights</h5>
          <p className="text-gray-300">
            Conclude with a summary that connects the dots between the cards drawn, their numerological significance,
            and the querent's initial question.
          </p>
          <div className="bg-gray-800/50 p-3 rounded-md mt-2 text-gray-300 italic">
            "Looking at your reading as a whole, we can see a journey from the past challenges represented by the Sword
            of Earth, through your current transition shown in the Cauldron of Water, toward the potential future
            indicated by the Spear of Fire. Your Life Path Number 7 is strongly reflected in the spiritual seeking
            energy of these cards, suggesting that this period of questioning is aligned with your soul's purpose. In
            relation to your question about career direction, the cards indicate that following your intuition (Water)
            while taking practical steps (Earth) will lead to a passionate new beginning (Fire)."
          </div>
        </div>

        <div>
          <h5 className="font-medium text-purple-200 mb-1">Encourage Continued Exploration</h5>
          <p className="text-gray-300">
            Ask if they have follow-up questions or would like further guidance. Offer to save the reading
          </p>
          <div className="bg-gray-800/50 p-3 rounded-md mt-2 text-gray-300 italic">
            "Do you have any questions about the reading or aspects you'd like to explore further? I can save this
            reading for you to revisit later, which can be valuable as you move through this transition period. Many
            people find that the cards' messages reveal deeper layers of meaning over time."
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <Button variant="outline" className="border-purple-500 text-purple-300">
            Save Reading
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
            Ask Follow-Up Question
          </Button>
        </div>
      </div>
    </div>
  )
}

function OngoingEngagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-purple-900/30 p-3 rounded-full">
          <Sparkles className="h-6 w-6 text-purple-400" />
        </div>
        <div>
          <h4 className="text-lg font-medium text-purple-300 mb-2">Ongoing Engagement</h4>
          <p className="text-gray-300 mb-4">
            Encourage the querent to continue exploring the NUMO Oracle and deepen their understanding of its wisdom.
          </p>
        </div>
      </div>

      <div className="space-y-4 pl-14">
        <div>
          <h5 className="font-medium text-purple-200 mb-1">Regular Reflection</h5>
          <p className="text-gray-300">
            Suggest that the querent revisit their readings periodically to uncover new layers of meaning and track
            their personal growth.
          </p>
          <div className="bg-gray-800/50 p-3 rounded-md mt-2 text-gray-300 italic">
            "I encourage you to revisit this reading in a few weeks or months. You may find that the cards' messages
            resonate differently as you move through your journey and gain new perspectives."
          </div>
        </div>

        <div>
          <h5 className="font-medium text-purple-200 mb-1">Further Exploration</h5>
          <p className="text-gray-300">
            Offer resources for continued learning, such as books, workshops, or online communities dedicated to
            numerology, astrology, and the NUMO Oracle.
          </p>
          <div className="bg-gray-800/50 p-3 rounded-md mt-2 text-gray-300 italic">
            "If you're interested in deepening your understanding of numerology, astrology, or the NUMO Oracle, I can
            provide you with a list of recommended books, workshops, and online communities where you can connect with
            other enthusiasts and continue your learning journey."
          </div>
        </div>

        <div>
          <h5 className="font-medium text-purple-200 mb-1">Community</h5>
          <p className="text-gray-300">
            Encourage the querent to join the NUMO community to share readings and learn from others.
          </p>
          <div className="bg-gray-800/50 p-3 rounded-md mt-2 text-gray-300 italic">
            "Join our NUMO community to share your readings, learn from others, and deepen your connection with the
            Oracle."
          </div>
        </div>
      </div>
    </div>
  )
}
