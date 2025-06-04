import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, Calculator, Sparkles, HelpCircle, Info } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "FAQ - NUMO Oracle Card Deck",
  description: "Frequently asked questions about the NUMO Oracle Card Deck, numerology, and card readings",
}

export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center items-center mb-2">
          <span className="text-sm text-gray-400">by</span>
          <span className="ml-1 text-sm font-semibold tracking-wider text-white">KRAFTWERK NUMEROLOGY</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-white">Frequently Asked Questions</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Find answers to common questions about the NUMO Oracle Card Deck, numerology, and how to get the most from
          your readings.
        </p>
      </div>

      <div className="relative mb-8">
        <div className="flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search the FAQ..."
            className="pl-10 bg-gray-900/50 border-gray-700 w-full max-w-xl mx-auto"
          />
          <Button className="ml-2 bg-purple-600 hover:bg-purple-700">Search</Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full mb-12">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="general" className="data-[state=active]:bg-purple-600">
            <Info className="mr-2 h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger value="numerology" className="data-[state=active]:bg-purple-600">
            <Calculator className="mr-2 h-4 w-4" /> Numerology
          </TabsTrigger>
          <TabsTrigger value="cards" className="data-[state=active]:bg-purple-600">
            <BookOpen className="mr-2 h-4 w-4" /> Cards & Meanings
          </TabsTrigger>
          <TabsTrigger value="readings" className="data-[state=active]:bg-purple-600">
            <Sparkles className="mr-2 h-4 w-4" /> Readings
          </TabsTrigger>
          <TabsTrigger value="troubleshooting" className="data-[state=active]:bg-purple-600">
            <HelpCircle className="mr-2 h-4 w-4" /> Troubleshooting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-0">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-400">General Questions</CardTitle>
              <CardDescription>Basic information about the NUMO Oracle Card Deck</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    What is the NUMO Oracle Card Deck?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      The NUMO Oracle Card Deck is a unique divination system that integrates ancient numerology,
                      astrology, and mystical traditions with contemporary spiritual practices. Created by Kraftwerk
                      Numerology, this deck weaves together numerical symmetry, elemental influences, and astrological
                      correspondences to provide deep insights and guidance.
                    </p>
                    <p className="mt-2">
                      What makes the NUMO Oracle unique is its foundation in the discovery of symmetrical numerical
                      patterns on the number line, revealing hidden relationships between numbers, energies, and cosmic
                      forces. This provides a structured framework for understanding life's dualistic nature.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    Who created the NUMO Oracle Card Deck?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      The NUMO Oracle Card Deck was created by Raziel Ali, a mystic, author, and spiritual teacher
                      dedicated to bridging ancient wisdom with modern spiritual practice. Drawing from extensive
                      studies in numerology, astrology, and esoteric traditions, Raziel crafted the NUMO Oracle Deck to
                      empower individuals on their paths to self-discovery and enlightenment.
                    </p>
                    <p className="mt-2">
                      The deck is published by Kraftwerk Numerology, which focuses on making ancient numerological
                      wisdom accessible to contemporary spiritual seekers.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    What's the difference between the NUMO Oracle and traditional tarot?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      While both the NUMO Oracle and traditional tarot are divination tools, they differ in several key
                      ways:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        <strong>Structure:</strong> Traditional tarot has 78 cards divided into Major and Minor Arcana.
                        The NUMO Oracle is structured around five suits based on the sacred treasures of the Goddess
                        Danu, with each suit corresponding to a number pairing.
                      </li>
                      <li>
                        <strong>Numerological Foundation:</strong> The NUMO Oracle is deeply rooted in numerology and
                        the discovery of symmetrical number patterns, which is not a primary focus in traditional tarot.
                      </li>
                      <li>
                        <strong>Elemental System:</strong> While tarot incorporates the four classical elements, the
                        NUMO Oracle works with five elements: Earth, Air, Fire, Water, and Spirit.
                      </li>
                      <li>
                        <strong>Cultural Roots:</strong> Tarot has European origins, while the NUMO Oracle draws from
                        Celtic mythology and the Indo-Eastern numerical system, creating a unique cross-cultural
                        foundation.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    Do I need prior knowledge of numerology to use the NUMO Oracle?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      No, you don't need prior knowledge of numerology to begin using the NUMO Oracle Card Deck. The
                      deck is designed to be accessible to beginners while offering depth for experienced practitioners.
                      The guidebook that accompanies the deck provides comprehensive explanations of the numerological
                      concepts, card meanings, and suggested spreads.
                    </p>
                    <p className="mt-2">
                      As you work with the deck, you'll naturally deepen your understanding of numerology and its
                      applications. Our website also offers free resources, including a{" "}
                      <Link href="/tools/numerology-calculator" className="text-purple-400 hover:underline">
                        Numerology Calculator
                      </Link>{" "}
                      and{" "}
                      <Link href="/tools/card-simulator" className="text-purple-400 hover:underline">
                        Card Simulator
                      </Link>{" "}
                      to help you learn.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    Where can I purchase the NUMO Oracle Card Deck?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      The NUMO Oracle Card Deck is available for purchase through our{" "}
                      <Link href="/buy" className="text-purple-400 hover:underline">
                        official website
                      </Link>
                      . We offer worldwide shipping and several package options, including digital guidebooks and
                      physical decks.
                    </p>
                    <p className="mt-2">
                      The deck is also available through select metaphysical shops and online retailers. For wholesale
                      inquiries or to become a distributor, please contact us directly at{" "}
                      <span className="text-purple-400">numooracle@gmail.com</span>.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="numerology" className="mt-0">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-400">Numerology Questions</CardTitle>
              <CardDescription>Understanding the numerological system behind the NUMO Oracle</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    What are the number pairings in the NUMO system?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      The NUMO system is based on five key number pairings that form the foundation of the deck. These
                      pairings were discovered through the observation of symmetrical patterns in the number line:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        <strong>0 and 1 – The Cauldron:</strong> Representing the dynamic between infinite potential (0)
                        and manifestation (1)
                      </li>
                      <li>
                        <strong>2 and 5 – The Sword:</strong> Symbolizing balance (2) and freedom/change (5)
                      </li>
                      <li>
                        <strong>3 and 8 – The Cord:</strong> Connecting creativity (3) with infinity and power (8)
                      </li>
                      <li>
                        <strong>4 and 7 – The Spear:</strong> Bridging stability (4) with spiritual insight (7)
                      </li>
                      <li>
                        <strong>6 and 9 – The Stone:</strong> Linking nurturing (6) with completion and fulfillment (9)
                      </li>
                    </ul>
                    <p className="mt-2">
                      Each pairing represents complementary energies that work together to create balance and harmony in
                      different aspects of life.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    How do I calculate my Life Path Number?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      Your Life Path Number is one of the most important numbers in numerology. To calculate it, add all
                      the digits in your birth date and reduce to a single digit (except for Master Numbers 11, 22, and
                      33).
                    </p>
                    <p className="mt-2">
                      <strong>Example:</strong> For someone born on June 15, 1987:
                    </p>
                    <ol className="list-decimal pl-6 mt-1 space-y-1">
                      <li>Month: June = 6</li>
                      <li>Day: 15 = 1 + 5 = 6</li>
                      <li>Year: 1987 = 1 + 9 + 8 + 7 = 25 = 2 + 5 = 7</li>
                      <li>Life Path Number: 6 + 6 + 7 = 19 = 1 + 9 = 10 = 1 + 0 = 1</li>
                    </ol>
                    <p className="mt-2">
                      This person's Life Path Number is 1, indicating a path of leadership, independence, and
                      innovation.
                    </p>
                    <p className="mt-2">
                      You can use our{" "}
                      <Link href="/tools/numerology-calculator" className="text-purple-400 hover:underline">
                        Numerology Calculator
                      </Link>{" "}
                      to quickly determine your Life Path Number and other important numerological values.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    What is the significance of Master Numbers?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      Master Numbers (11, 22, and 33) are considered highly spiritual numbers with enhanced power and
                      potential. In the NUMO system, these numbers are not reduced to a single digit because they carry
                      special significance:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        <strong>Master Number 11:</strong> The Intuitive. Represents spiritual insight, intuition, and
                        enlightenment. It combines the qualities of two 1s—independence and leadership—but on a higher
                        spiritual plane.
                      </li>
                      <li>
                        <strong>Master Number 22:</strong> The Master Builder. Represents the ability to turn dreams
                        into reality on a large scale. It combines the practical aspects of 4 (2+2=4) with the visionary
                        qualities of 22.
                      </li>
                      <li>
                        <strong>Master Number 33:</strong> The Master Teacher. Represents compassion, healing, and
                        spiritual guidance for others. It combines the nurturing aspects of 6 (3+3=6) with the spiritual
                        wisdom of 33.
                      </li>
                    </ul>
                    <p className="mt-2">
                      If you have a Master Number in your numerological profile, it indicates a higher spiritual purpose
                      and potential, though it may also bring greater challenges to fulfill that potential.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    How does numerology connect to the elements in the NUMO Oracle?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      In the NUMO Oracle system, each number and number pairing is associated with specific elemental
                      energies, creating a rich tapestry of correspondences:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        <strong>Earth Element:</strong> Associated with numbers 4 and 9, representing stability,
                        abundance, and material manifestation.
                      </li>
                      <li>
                        <strong>Air Element:</strong> Associated with numbers 2 and 7, representing intellect,
                        communication, and spiritual understanding.
                      </li>
                      <li>
                        <strong>Fire Element:</strong> Associated with numbers 1 and 5, representing action, passion,
                        transformation, and will.
                      </li>
                      <li>
                        <strong>Water Element:</strong> Associated with numbers 3 and 6, representing emotions,
                        intuition, creativity, and nurturing.
                      </li>
                      <li>
                        <strong>Spirit Element:</strong> Associated with numbers 0 and 8, representing infinite
                        potential, cosmic consciousness, and the integration of all elements.
                      </li>
                    </ul>
                    <p className="mt-2">
                      When reading with the NUMO Oracle, the elemental associations provide additional layers of meaning
                      and insight into how the energies are manifesting in your life.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    What is a Destiny Number and how is it calculated?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      Your Destiny Number (also called Expression Number) reveals your natural talents, abilities, and
                      the goals you're meant to achieve in this lifetime. It is calculated using the letters in your
                      full birth name.
                    </p>
                    <p className="mt-2">Each letter is assigned a number according to the Pythagorean system:</p>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div>1 = A, J, S</div>
                      <div>2 = B, K, T</div>
                      <div>3 = C, L, U</div>
                      <div>4 = D, M, V</div>
                      <div>5 = E, N, W</div>
                      <div>6 = F, O, X</div>
                      <div>7 = G, P, Y</div>
                      <div>8 = H, Q, Z</div>
                      <div>9 = I, R</div>
                    </div>
                    <p className="mt-2">
                      <strong>Example:</strong> For the name "John Smith":
                    </p>
                    <p>
                      J(1) + O(6) + H(8) + N(5) = 20 = 2 + 0 = 2
                      <br />
                      S(1) + M(4) + I(9) + T(2) + H(8) = 24 = 2 + 4 = 6
                      <br />
                      Destiny Number: 2 + 6 = 8
                    </p>
                    <p className="mt-2">
                      A Destiny Number 8 indicates a path focused on achievement, authority, and material success.
                    </p>
                    <p className="mt-2">
                      Use our{" "}
                      <Link href="/tools/numerology-calculator" className="text-purple-400 hover:underline">
                        Numerology Calculator
                      </Link>{" "}
                      to easily determine your Destiny Number.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="mt-0">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-400">Cards & Meanings</CardTitle>
              <CardDescription>Understanding the cards and their interpretations</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    What are the five suits in the NUMO Oracle Deck?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      The NUMO Oracle Deck features five suits, each corresponding to one of the sacred treasures of the
                      Goddess Danu and a number pairing:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>
                        <strong>Cauldron (0/1):</strong> Representing creation, nurturing, emotional depth, and
                        intuitive insight. The Cauldron symbolizes the wellspring of life and the profound depths of
                        human emotion. It corresponds to the traditional Cups/Hearts suit.
                      </li>
                      <li>
                        <strong>Sword (2/5):</strong> Representing intellect, truth, decision-making, and overcoming
                        challenges. The Sword embodies clarity of thought and the courage to face obstacles. It
                        corresponds to the traditional Swords/Spades suit.
                      </li>
                      <li>
                        <strong>Cord (3/8):</strong> Representing destiny, interconnectedness, cycles, and the weaving
                        of life's tapestry. The Cord reflects the bonds that connect all beings and events across time
                        and space. It is unique to the NUMO system, similar to Wheels/Knots.
                      </li>
                      <li>
                        <strong>Spear (4/7):</strong> Representing action, ambition, protection, and intelligent
                        planning. The Spear signifies purposeful movement and strategic pursuit of goals. It corresponds
                        to the traditional Wands/Clubs suit.
                      </li>
                      <li>
                        <strong>Stone (6/9):</strong> Representing material abundance, focus, stability, service, and
                        grounding. The Stone represents the physical realm and the rewards of diligent effort. It
                        corresponds to the traditional Pentacles/Diamonds suit.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    How do the elements relate to the cards?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      Each card in the NUMO Oracle Deck is associated with one of the five elements, adding depth to its
                      interpretation:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>
                        <strong>Fire Cards:</strong> Represent passion, energy, transformation, and spiritual awakening.
                        Fire cards often indicate action, creativity, and the driving force behind change.
                      </li>
                      <li>
                        <strong>Water Cards:</strong> Represent emotions, intuition, relationships, and healing. Water
                        cards often indicate feelings, connections with others, and the subconscious mind.
                      </li>
                      <li>
                        <strong>Air Cards:</strong> Represent intellect, communication, ideas, and social connections.
                        Air cards often indicate mental processes, learning, and the exchange of information.
                      </li>
                      <li>
                        <strong>Earth Cards:</strong> Represent stability, abundance, practicality, and physical
                        well-being. Earth cards often indicate material concerns, health, and tangible results.
                      </li>
                      <li>
                        <strong>Spirit Cards:</strong> Represent divine connection, higher consciousness, and
                        integration of all elements. Spirit cards often indicate spiritual growth, enlightenment, and
                        transcendence.
                      </li>
                    </ul>
                    <p className="mt-2">
                      When multiple cards of the same element appear in a reading, it suggests that this elemental
                      energy is particularly significant in the situation. Conversely, if an element is missing, it
                      might indicate an area that needs attention or development.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    What do reversed cards mean in the NUMO Oracle?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      In the NUMO Oracle system, reversed cards (cards that appear upside down) offer additional nuance
                      to a reading. They generally represent one of the following:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        <strong>Blocked or Internalized Energy:</strong> The energy of the card is present but may be
                        suppressed, internalized, or not expressing itself fully.
                      </li>
                      <li>
                        <strong>Opposite or Complementary Energy:</strong> The energy may be manifesting in an opposite
                        or unexpected way, often revealing the shadow aspect of the card's meaning.
                      </li>
                      <li>
                        <strong>Delay or Challenge:</strong> The qualities represented by the card may be delayed or
                        facing obstacles that need to be overcome.
                      </li>
                      <li>
                        <strong>Invitation for Deeper Reflection:</strong> A reversed card often invites you to look
                        more deeply at the situation and consider alternative perspectives.
                      </li>
                    </ul>
                    <p className="mt-2">
                      It's important to note that reversed cards are not necessarily negative—they simply offer a
                      different dimension of the card's energy and meaning. Some readers choose not to use reversals,
                      focusing instead on the upright meanings and the context of surrounding cards.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    How do I interpret card combinations?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      Interpreting card combinations in the NUMO Oracle involves understanding how the energies of
                      different cards interact and influence each other. Here are some approaches to reading card
                      combinations:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>
                        <strong>Narrative Approach:</strong> Create a story that flows from one card to the next,
                        considering how they build upon each other to tell a cohesive narrative.
                      </li>
                      <li>
                        <strong>Elemental Interactions:</strong> Look at the elements represented in the cards. Do they
                        complement each other (like Water nurturing Earth) or create tension (like Water extinguishing
                        Fire)?
                      </li>
                      <li>
                        <strong>Numerical Patterns:</strong> Pay attention to the numbers on the cards. Do they form a
                        sequence, repeat, or create a pattern that adds meaning to the reading?
                      </li>
                      <li>
                        <strong>Suit Relationships:</strong> Consider how the different suits interact. For example, a
                        Sword (intellect) next to a Cauldron (emotion) might suggest a need to balance logical thinking
                        with emotional awareness.
                      </li>
                    </ul>
                    <p className="mt-2">
                      <strong>Example:</strong> If you draw the Cauldron of Water (emotional intuition) followed by the
                      Sword of Air (clear thinking), this combination might suggest that your intuitive insights need to
                      be processed through logical analysis before taking action.
                    </p>
                    <p className="mt-2">
                      Remember that context matters—the same card combination might have different meanings depending on
                      the question asked and the position in the spread.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    Where can I find detailed meanings for each card?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      You can find detailed meanings for each card in the NUMO Oracle Deck through several resources:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>
                        <strong>Official Guidebook:</strong> The comprehensive guidebook that accompanies the physical
                        deck contains detailed interpretations for each card, including upright and reversed meanings,
                        elemental associations, and numerological significance.
                      </li>
                      <li>
                        <strong>Card Directory Tool:</strong> Our website features a{" "}
                        <Link href="/tools/card-directory" className="text-purple-400 hover:underline">
                          Card Directory
                        </Link>{" "}
                        where you can browse all cards and access their meanings, symbolism, and correspondences.
                      </li>
                      <li>
                        <strong>Card Simulator:</strong> The{" "}
                        <Link href="/tools/card-simulator" className="text-purple-400 hover:underline">
                          Card Simulator
                        </Link>{" "}
                        tool allows you to draw cards and receive interpretations in real-time, helping you learn the
                        meanings through practice.
                      </li>
                      <li>
                        <strong>Library Resources:</strong> Our{" "}
                        <Link href="/library" className="text-purple-400 hover:underline">
                          Library
                        </Link>{" "}
                        contains articles and guides that explore the deeper meanings and applications of specific cards
                        and combinations.
                      </li>
                    </ul>
                    <p className="mt-2">
                      Remember that while these resources provide standard interpretations, your personal intuition and
                      connection with the cards will ultimately guide your readings. The more you work with the deck,
                      the more nuanced your understanding of each card will become.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="readings" className="mt-0">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-400">Readings</CardTitle>
              <CardDescription>Guidance on performing and interpreting readings</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    How should I prepare for a reading?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      Preparing for a NUMO Oracle reading involves creating the right physical and mental space for
                      intuitive insights to flow:
                    </p>
                    <ol className="list-decimal pl-6 mt-2 space-y-2">
                      <li>
                        <strong>Create a Sacred Space:</strong> Find a quiet, comfortable area where you won't be
                        disturbed. You might want to clear the energy of the space by burning sage, palo santo, or
                        incense.
                      </li>
                      <li>
                        <strong>Center Yourself:</strong> Take a few deep breaths to ground your energy and clear your
                        mind. Some readers like to meditate briefly before a reading to enhance their intuitive
                        connection.
                      </li>
                      <li>
                        <strong>Formulate Clear Questions:</strong> Be specific about what you want to know. Open-ended
                        questions like "What do I need to know about my career right now?" often yield more insightful
                        answers than yes/no questions.
                      </li>
                      <li>
                        <strong>Connect with Your Deck:</strong> Hold your cards for a moment, shuffle them mindfully,
                        and set your intention for the reading. Some readers like to "clear" their deck between readings
                        by knocking on it or fanning the cards out and reassembling them.
                      </li>
                      <li>
                        <strong>Choose a Spread:</strong> Select a card layout appropriate for your question. Simple
                        spreads like a three-card Past-Present-Future are good for beginners, while more complex spreads
                        can provide deeper insights for specific situations.
                      </li>
                    </ol>
                    <p className="mt-2">
                      Remember that your state of mind affects the reading. Approach with openness, curiosity, and a
                      willingness to receive guidance, even if it's not what you expected to hear.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    What are some recommended spreads for beginners?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      If you're new to the NUMO Oracle, these simple yet effective spreads are perfect for beginners:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-3">
                      <li>
                        <strong>Single Card Draw:</strong> The simplest spread—draw one card for daily guidance or to
                        answer a specific question. This helps you learn individual card meanings without the complexity
                        of card interactions.
                      </li>
                      <li>
                        <strong>Past-Present-Future:</strong> A three-card spread where each position represents:
                        <ol className="list-decimal pl-6 mt-1">
                          <li>Card 1: Past influences affecting the situation</li>
                          <li>Card 2: Present circumstances and energies</li>
                          <li>Card 3: Potential future outcome or direction</li>
                        </ol>
                      </li>
                      <li>
                        <strong>Situation-Challenge-Advice:</strong> Another three-card spread with these positions:
                        <ol className="list-decimal pl-6 mt-1">
                          <li>Card 1: The current situation or question</li>
                          <li>Card 2: The challenge or obstacle to overcome</li>
                          <li>Card 3: Advice or action to take</li>
                        </ol>
                      </li>
                      <li>
                        <strong>Mind-Body-Spirit:</strong> A three-card spread focusing on holistic well-being:
                        <ol className="list-decimal pl-6 mt-1">
                          <li>Card 1: Mental state and thought patterns</li>
                          <li>Card 2: Physical well-being and material concerns</li>
                          <li>Card 3: Spiritual growth and higher purpose</li>
                        </ol>
                      </li>
                      <li>
                        <strong>Elemental Cross:</strong> A five-card spread representing the five elements:
                        <ol className="list-decimal pl-6 mt-1">
                          <li>Center: Spirit - The core essence of the situation</li>
                          <li>Top: Air - Thoughts and communication</li>
                          <li>Right: Fire - Energy and action</li>
                          <li>Bottom: Earth - Practical matters and stability</li>
                          <li>Left: Water - Emotions and relationships</li>
                        </ol>
                      </li>
                    </ul>
                    <p className="mt-2">
                      Start with these simple spreads and gradually move to more complex layouts as your confidence and
                      familiarity with the cards grow. You can practice these spreads using our{" "}
                      <Link href="/tools/card-simulator" className="text-purple-400 hover:underline">
                        Card Simulator
                      </Link>{" "}
                      tool.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    How often should I do readings?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      The frequency of readings depends on your personal needs and relationship with the cards. Here are
                      some guidelines:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>
                        <strong>Daily Draws:</strong> Many practitioners pull a single card each morning for guidance or
                        a focus for the day. This practice helps you learn the cards and develop your intuition through
                        regular engagement.
                      </li>
                      <li>
                        <strong>Weekly Readings:</strong> A more comprehensive reading once a week can provide insights
                        for the days ahead and help you track patterns and progress over time.
                      </li>
                      <li>
                        <strong>Monthly Readings:</strong> Larger spreads done at the new or full moon can offer broader
                        perspective and guidance for the coming month.
                      </li>
                      <li>
                        <strong>Situational Readings:</strong> Readings done when facing specific decisions, challenges,
                        or transitions can provide targeted guidance when you need it most.
                      </li>
                    </ul>
                    <p className="mt-2">
                      <strong>Important considerations:</strong>
                    </p>
                    <ul className="list-disc pl-6 mt-1 space-y-1">
                      <li>
                        Avoid repeatedly asking the same question if you don't like the answer. This can create
                        confusion and diminish the value of the guidance.
                      </li>
                      <li>
                        Give yourself time to reflect on and integrate the insights from one reading before doing
                        another.
                      </li>
                      <li>
                        Trust your intuition about when a reading is needed—sometimes you'll feel drawn to the cards,
                        and other times you'll feel it's better to wait.
                      </li>
                      <li>
                        If you find yourself becoming anxious or overly dependent on readings, it may be helpful to step
                        back and establish clearer boundaries with your practice.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    How can I enhance my intuition when reading cards?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      Developing your intuition is key to giving meaningful and accurate readings with the NUMO Oracle.
                      Here are practices to strengthen your intuitive abilities:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>
                        <strong>Regular Meditation:</strong> Even 5-10 minutes daily can help quiet the analytical mind
                        and create space for intuitive insights to emerge. Focus on your breath or use guided
                        meditations specifically designed to enhance intuition.
                      </li>
                      <li>
                        <strong>Card Contemplation:</strong> Spend time with individual cards outside of readings. Study
                        the imagery, colors, and symbols, noting your immediate impressions and feelings. This builds a
                        personal connection with each card.
                      </li>
                      <li>
                        <strong>Journaling:</strong> Keep a reading journal to record your interpretations and the
                        actual outcomes. Over time, you'll notice patterns and refine your intuitive understanding of
                        the cards.
                      </li>
                      <li>
                        <strong>Trust First Impressions:</strong> The first thought or feeling that comes when you see a
                        card is often your intuition speaking. Practice honoring these initial impressions before
                        consulting guidebooks.
                      </li>
                      <li>
                        <strong>Use All Your Senses:</strong> When reading, notice not just visual impressions but also
                        any physical sensations, sounds, tastes, or smells that arise. Intuition can speak through all
                        sensory channels.
                      </li>
                      <li>
                        <strong>Create Sacred Space:</strong> Establish rituals around your readings, such as lighting a
                        candle, using a special cloth, or saying an invocation. These practices signal to your
                        subconscious that it's time to access intuitive wisdom.
                      </li>
                      <li>
                        <strong>Practice Regularly:</strong> Like any skill, intuition strengthens with consistent
                        practice. Set aside dedicated time for readings, even if just for yourself.
                      </li>
                    </ul>
                    <p className="mt-2">
                      Remember that developing intuition is a journey, not a destination. Be patient with yourself and
                      celebrate small moments of intuitive clarity as they occur.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    How do I interpret challenging or seemingly negative cards?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      Challenging cards in the NUMO Oracle aren't necessarily negative—they often represent important
                      growth opportunities or necessary awareness. Here's how to approach them constructively:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>
                        <strong>Look for the Lesson:</strong> Every challenging card contains wisdom and an invitation
                        for growth. Ask yourself, "What is this card trying to teach me?" rather than "Why is this
                        happening to me?"
                      </li>
                      <li>
                        <strong>Consider Context:</strong> A challenging card's meaning is significantly influenced by
                        surrounding cards and its position in the spread. A difficult card in a "challenge" position is
                        offering information about obstacles, while the same card in an "outcome" position might suggest
                        preparing for upcoming difficulties.
                      </li>
                      <li>
                        <strong>Find the Balance:</strong> In the NUMO system, every energy has a complementary aspect.
                        If a card seems overwhelmingly negative, look for how its energy might be out of balance and
                        what would restore equilibrium.
                      </li>
                      <li>
                        <strong>Reframe as Empowerment:</strong> Challenging cards often reveal where you have the power
                        to make changes. For example, a card indicating conflict might be showing you where you need to
                        set boundaries or speak your truth.
                      </li>
                      <li>
                        <strong>Look for Timing Elements:</strong> Some challenging situations are temporary. Consider
                        whether the card is indicating a passing phase rather than a permanent condition.
                      </li>
                      <li>
                        <strong>Seek the Higher Perspective:</strong> In the NUMO Oracle, every card connects to
                        spiritual principles. Ask how this challenge serves your higher growth or aligns with your
                        soul's journey.
                      </li>
                    </ul>
                    <p className="mt-2">
                      Remember that the cards reflect energies and potentials, not fixed fates. Even the most
                      challenging card offers guidance on how to navigate difficulties with wisdom and grace.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="troubleshooting" className="mt-0">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-400">Troubleshooting</CardTitle>
              <CardDescription>Solutions for common issues and questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    What if I don't understand a card or reading?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      It's completely normal to feel confused or uncertain about a card or reading sometimes. Here are
                      steps to take when this happens:
                    </p>
                    <ol className="list-decimal pl-6 mt-2 space-y-2">
                      <li>
                        <strong>Take a Step Back:</strong> Sometimes stepping away from a reading and returning to it
                        later with fresh eyes can bring new clarity. Take a photo of the spread before putting the cards
                        away so you can revisit it exactly as it was.
                      </li>
                      <li>
                        <strong>Consult Additional Resources:</strong> Check the guidebook, our{" "}
                        <Link href="/tools/card-directory" className="text-purple-400 hover:underline">
                          Card Directory
                        </Link>
                        , or other reference materials for alternative interpretations or insights you might have
                        missed.
                      </li>
                      <li>
                        <strong>Draw Clarification Cards:</strong> If a specific card is confusing, you can draw an
                        additional card specifically asking for clarification about its meaning in this context.
                      </li>
                      <li>
                        <strong>Journal About It:</strong> Sometimes writing about your confusion can help unlock
                        insights. Describe the card, your reaction to it, and any associations or feelings it evokes,
                        even if they seem unrelated.
                      </li>
                      <li>
                        <strong>Consider the Question:</strong> Sometimes confusion arises because the question wasn't
                        clear or the spread wasn't appropriate for what you really want to know. Consider reformulating
                        your question and trying a different spread.
                      </li>
                      <li>
                        <strong>Seek Community Input:</strong> Share your reading (or parts of it) with trusted friends
                        or online communities focused on oracle cards. Fresh perspectives can offer valuable insights.
                      </li>
                      <li>
                        <strong>Trust the Process:</strong> Sometimes the meaning of a reading becomes clear only after
                        time has passed and events have unfolded. Make notes and revisit the reading later—you might be
                        surprised by how much more sense it makes.
                      </li>
                    </ol>
                    <p className="mt-2">
                      Remember that developing your relationship with the cards is a journey. Moments of confusion are
                      often opportunities for deeper learning and growth in your practice.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    How do I cleanse and care for my NUMO Oracle Deck?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      Proper care of your NUMO Oracle Deck helps maintain its energy and physical condition. Here are
                      recommended practices:
                    </p>
                    <h4 className="font-medium text-purple-300 mt-3 mb-1">Energetic Cleansing</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Moonlight Bath:</strong> Place your deck on a windowsill or outdoors (weather
                        permitting) during a full moon to cleanse and recharge its energy.
                      </li>
                      <li>
                        <strong>Smoke Cleansing:</strong> Pass your deck through the smoke of sacred herbs like sage,
                        palo santo, or sweetgrass to clear any stagnant energies.
                      </li>
                      <li>
                        <strong>Crystal Cleansing:</strong> Store your deck with a clear quartz crystal, which helps
                        purify and amplify energy. Selenite is also excellent for clearing and charging.
                      </li>
                      <li>
                        <strong>Sound Cleansing:</strong> Use a singing bowl, bell, or tuning fork near your cards to
                        clear their energy through sound vibrations.
                      </li>
                      <li>
                        <strong>Knocking:</strong> A simple method—knock on the deck three times to disperse any
                        lingering energies from previous readings.
                      </li>
                    </ul>

                    <h4 className="font-medium text-purple-300 mt-3 mb-1">Physical Care</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Storage:</strong> Keep your deck in its original box or a dedicated cloth, bag, or
                        wooden box to protect it from dust and damage.
                      </li>
                      <li>
                        <strong>Handling:</strong> Wash your hands before using your cards to keep them clean. Handle
                        them with care to prevent bending or creasing.
                      </li>
                      <li>
                        <strong>Environment:</strong> Store your deck away from direct sunlight, extreme temperatures,
                        and moisture, which can damage the cards over time.
                      </li>
                      <li>
                        <strong>Shuffling:</strong> If you're concerned about wear, consider gentler shuffling methods
                        like the overhand shuffle rather than riffle shuffling.
                      </li>
                    </ul>

                    <h4 className="font-medium text-purple-300 mt-3 mb-1">Routine Maintenance</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Regular Cleansing:</strong> Cleanse your deck after readings involving heavy emotions,
                        when others have handled your cards, or if the readings seem unclear or "off."
                      </li>
                      <li>
                        <strong>Recharging:</strong> Periodically reconnect with your deck by looking through all the
                        cards mindfully, reaffirming your connection with each one.
                      </li>
                      <li>
                        <strong>Intention Setting:</strong> Before using your deck after cleansing, hold it in your
                        hands and set an intention for how you wish to work with it.
                      </li>
                    </ul>
                    <p className="mt-2">
                      Remember that your relationship with your deck is personal. Trust your intuition about when and
                      how to cleanse and care for your cards in a way that feels right to you.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    What if my readings don't seem accurate?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      If your readings don't seem accurate or resonant, consider these potential factors and solutions:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>
                        <strong>Emotional Interference:</strong> Strong emotions about the outcome can cloud your
                        interpretation. Try to approach readings with emotional neutrality and openness.
                        <p className="text-sm mt-1">
                          <em>Solution:</em> Take a few deep breaths before reading, or postpone the reading until you
                          feel more centered.
                        </p>
                      </li>
                      <li>
                        <strong>Unclear Questions:</strong> Vague or poorly formulated questions often yield confusing
                        answers.
                        <p className="text-sm mt-1">
                          <em>Solution:</em> Refine your question to be specific, clear, and focused on what you truly
                          want to know.
                        </p>
                      </li>
                      <li>
                        <strong>Misaligned Spread:</strong> The spread you've chosen might not be appropriate for your
                        question.
                        <p className="text-sm mt-1">
                          <em>Solution:</em> Select a spread specifically designed for your type of inquiry (e.g., a
                          relationship spread for relationship questions).
                        </p>
                      </li>
                      <li>
                        <strong>Timing Issues:</strong> Sometimes readings reflect potential energies that haven't yet
                        manifested.
                        <p className="text-sm mt-1">
                          <em>Solution:</em> Make notes of your readings and revisit them later—you might find they were
                          more accurate than initially thought.
                        </p>
                      </li>
                      <li>
                        <strong>Literal vs. Symbolic Interpretation:</strong> Oracle cards often speak in symbols and
                        metaphors rather than literal predictions.
                        <p className="text-sm mt-1">
                          <em>Solution:</em> Look for the symbolic meaning behind the cards rather than expecting exact
                          literal matches to situations.
                        </p>
                      </li>
                      <li>
                        <strong>Energy Clearing Needed:</strong> Your deck might need cleansing if it's been heavily
                        used or handled by others.
                        <p className="text-sm mt-1">
                          <em>Solution:</em> Cleanse your deck using one of the methods mentioned in the deck care
                          section.
                        </p>
                      </li>
                      <li>
                        <strong>Developing Relationship:</strong> Your connection with a new deck deepens over time.
                        <p className="text-sm mt-1">
                          <em>Solution:</em> Spend time with your deck outside of readings—study the imagery, meditate
                          with cards, and journal about them to strengthen your bond.
                        </p>
                      </li>
                    </ul>
                    <p className="mt-2">
                      Remember that divination is both an art and a skill that develops with practice. Even experienced
                      readers have sessions that feel off or unclear. Be patient with yourself and the process.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    Should I let others handle my cards?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      Whether to allow others to handle your NUMO Oracle Deck is a personal decision that depends on
                      your relationship with your cards and your beliefs about energy. Here are perspectives to
                      consider:
                    </p>
                    <h4 className="font-medium text-purple-300 mt-3 mb-1">Reasons Some Practitioners Limit Handling</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Energy Sensitivity:</strong> Cards can absorb energies from those who handle them. If
                        you're sensitive to energies, you might prefer to be the only one touching your deck.
                      </li>
                      <li>
                        <strong>Personal Connection:</strong> Many readers develop a deep personal bond with their deck
                        and feel that allowing others to handle it might interfere with this connection.
                      </li>
                      <li>
                        <strong>Physical Care:</strong> More handling means more wear and tear on the cards, potentially
                        shortening their lifespan.
                      </li>
                    </ul>

                    <h4 className="font-medium text-purple-300 mt-3 mb-1">Reasons Some Practitioners Allow Handling</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Personal Connection to Readings:</strong> Having the querent shuffle and handle the
                        cards can create a stronger energetic connection between them and the reading.
                      </li>
                      <li>
                        <strong>Demystifying Oracle Work:</strong> Allowing others to interact with the cards can help
                        make divination more accessible and less intimidating.
                      </li>
                      <li>
                        <strong>Trust in Cleansing:</strong> Some readers believe that proper cleansing techniques can
                        effectively reset the deck's energy after others have handled it.
                      </li>
                    </ul>

                    <h4 className="font-medium text-purple-300 mt-3 mb-1">Balanced Approaches</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Designated Reading Deck:</strong> Some practitioners have a separate deck specifically
                        for reading for others, keeping their primary deck for personal use only.
                      </li>
                      <li>
                        <strong>Selective Permission:</strong> You might allow certain people to handle your cards based
                        on your relationship with them or their energy, while limiting others.
                      </li>
                      <li>
                        <strong>Guided Handling:</strong> Allow querents to shuffle or cut the deck while you maintain
                        some contact with the cards, creating a shared energy field.
                      </li>
                      <li>
                        <strong>Thorough Cleansing:</strong> If you do allow others to handle your cards, perform a
                        thorough cleansing afterward to reset the energy.
                      </li>
                    </ul>
                    <p className="mt-2">
                      Ultimately, trust your intuition about what feels right for your practice. There's no single
                      correct approach—what matters is that you feel comfortable and confident with your decision.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-purple-300">
                    How do I contact support for additional help?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      If you need additional support with your NUMO Oracle Deck or have questions not answered in this
                      FAQ, we're here to help. Here are the ways to reach us:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>
                        <strong>Email Support:</strong> <span className="text-purple-400">numooracle@gmail.com</span>
                        <p className="text-sm mt-1">
                          Our support team typically responds within 24-48 hours. Please include detailed information
                          about your question or issue to help us assist you more effectively.
                        </p>
                      </li>
                      <li>
                        <strong>Social Media:</strong> <span className="text-purple-400">Facebook.com/numocards</span>
                        <p className="text-sm mt-1">
                          You can send us a direct message on our Facebook page. We also regularly post tips, insights,
                          and announcements that might address common questions.
                        </p>
                      </li>
                      <li>
                        <strong>Community Forum:</strong>{" "}
                        <Link href="/community" className="text-purple-400 hover:underline">
                          NUMO Oracle Community
                        </Link>
                        <p className="text-sm mt-1">
                          Our community forum is a great place to connect with other NUMO Oracle users, share
                          experiences, and get advice from both beginners and experienced practitioners.
                        </p>
                      </li>
                      <li>
                        <strong>Feedback Form:</strong>{" "}
                        <Link href="/contact" className="text-purple-400 hover:underline">
                          Contact Us
                        </Link>
                        <p className="text-sm mt-1">
                          Use our feedback form to submit suggestions, report issues with the website or tools, or
                          provide general feedback about your experience with the NUMO Oracle.
                        </p>
                      </li>
                    </ul>
                    <p className="mt-2">
                      We value your input and are committed to providing the best possible experience with the NUMO
                      Oracle Card Deck. Your questions and feedback help us improve our resources and support for the
                      entire community.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-purple-400">Popular Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-purple-400" />
              <div>
                <Link href="/guidebook" className="text-white hover:text-purple-300 font-medium">
                  NUMO Oracle Guidebook
                </Link>
                <p className="text-sm text-gray-400">Comprehensive guide to the NUMO Oracle system</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calculator className="h-5 w-5 text-purple-400" />
              <div>
                <Link href="/tools/numerology-calculator" className="text-white hover:text-purple-300 font-medium">
                  Numerology Calculator
                </Link>
                <p className="text-sm text-gray-400">Calculate your Life Path and Destiny Numbers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <div>
                <Link href="/tools/card-simulator" className="text-white hover:text-purple-300 font-medium">
                  Card Simulator
                </Link>
                <p className="text-sm text-gray-400">Practice readings with our interactive tool</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-purple-400">Community Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-purple-400" />
              <div>
                <Link href="/community" className="text-white hover:text-purple-300 font-medium">
                  NUMO Oracle Community
                </Link>
                <p className="text-sm text-gray-400">Connect with other practitioners and share experiences</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-purple-400" />
              <div>
                <Link href="/blog" className="text-white hover:text-purple-300 font-medium">
                  NUMO Oracle Blog
                </Link>
                <p className="text-sm text-gray-400">Articles and insights about numerology and oracle readings</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-purple-400" />
              <div>
                <Link href="/library" className="text-white hover:text-purple-300 font-medium">
                  Resource Library
                </Link>
                <p className="text-sm text-gray-400">Access our collection of guides and publications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-purple-400">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Can't find the answer you're looking for? We're here to help with any questions about the NUMO Oracle Card
              Deck.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-purple-400">Email:</span>
                <span className="text-gray-300">numooracle@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400">Facebook:</span>
                <span className="text-gray-300">facebook.com/numocards</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400">Website:</span>
                <span className="text-gray-300">numoracle.com</span>
              </div>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-2">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-sm text-gray-500 mt-12">
        <p>The NUMO Oracle Card Deck is a product of Kraftwerk Numerology © 2023. All rights reserved.</p>
        <p className="mt-1">numoracle.com</p>
      </div>
    </main>
  )
}
