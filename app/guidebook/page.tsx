import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, ChevronRight, Download } from "lucide-react"
import { MembershipVerification } from "@/components/membership-verification"

export const metadata: Metadata = {
  title: "NUMO Oracle Guidebook | Complete Guide to the NUMO Oracle Card Deck",
  description:
    "Access the comprehensive guidebook for the NUMO Oracle Card Deck, including detailed card meanings, spreads, and numerological concepts.",
}

export default function GuidebookPage() {
  // Teaser content for non-members
  const guidebookTeaser = (
    <div className="space-y-4 font-body">
      <p className="text-gray-300">
        The NUMO Oracle Guidebook is your essential companion to understanding and working with the NUMO Oracle Card
        Deck. This comprehensive guide includes:
      </p>
      <ul className="list-disc pl-6 text-gray-300 space-y-2">
        <li>Detailed interpretations of all 25 cards in the deck</li>
        <li>Explanation of the five sacred suits and their elemental associations</li>
        <li>Introduction to the numerological system behind the NUMO Oracle</li>
        <li>Sample readings and spread layouts</li>
        <li>And much more...</li>
      </ul>
      <p className="text-gray-300 italic mt-4">
        Become a member to access the complete guidebook and unlock the full potential of your NUMO Oracle Deck.
      </p>
    </div>
  )

  return (
    <main className="container mx-auto px-4 py-12 font-body">
      <div className="text-center mb-12">
        <div className="flex justify-center items-center mb-2">
          <span className="text-sm text-gray-400">by</span>
          <span className="ml-1 text-sm font-semibold tracking-wider text-white">KRAFTWERK NUMEROLOGY</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 font-heading">
          <span className="text-white">NUMO Oracle </span>
          <span className="text-purple-400">Guidebook</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Your comprehensive guide to understanding and working with the NUMO Oracle Card Deck.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="relative h-[400px] md:h-full rounded-lg overflow-hidden">
            <Image src="/open-book-knowledge.png" alt="NUMO Oracle Guidebook" fill className="object-cover" />
          </div>
        </div>

        <div className="md:col-span-2">
          <MembershipVerification teaser={guidebookTeaser}>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-purple-400 font-heading">
                Welcome to the Complete NUMO Oracle Guidebook
              </h2>

              <p className="text-gray-300">
                This comprehensive guide will help you unlock the full potential of your NUMO Oracle Card Deck. Whether
                you're a beginner or an experienced practitioner, this guidebook provides the knowledge and insights you
                need to perform meaningful and accurate readings.
              </p>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4 font-heading">Table of Contents</h3>
                <ol className="space-y-3 list-decimal pl-6">
                  <li>
                    <Link
                      href="/guidebook/introduction"
                      className="text-purple-400 hover:text-purple-300 flex items-center"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Introduction to the NUMO Oracle
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guidebook/philosophy"
                      className="text-purple-400 hover:text-purple-300 flex items-center"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      The NUMO System Philosophy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guidebook/card-meanings"
                      className="text-purple-400 hover:text-purple-300 flex items-center"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      The Cards & Their Meanings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guidebook/elemental-layers"
                      className="text-purple-400 hover:text-purple-300 flex items-center"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Interpreting Elemental Layers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guidebook/personalizing-readings"
                      className="text-purple-400 hover:text-purple-300 flex items-center"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Personalizing Readings with Numerology
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guidebook/advanced-techniques"
                      className="text-purple-400 hover:text-purple-300 flex items-center"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Advanced Reading Techniques
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guidebook/compound-numbers"
                      className="text-purple-400 hover:text-purple-300 flex items-center"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Interpreting Compound Numbers
                    </Link>
                  </li>
                  <li>
                    <Link href="/guidebook/ethics" className="text-purple-400 hover:text-purple-300 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      The Ethical Responsibilities of a Reader
                    </Link>
                  </li>
                </ol>
              </div>

              <div className="flex justify-center mt-6">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <BookOpen className="mr-2 h-4 w-4" /> Begin Reading
                </Button>
              </div>
            </div>
          </MembershipVerification>
        </div>
      </div>

      <Tabs defaultValue="introduction" className="w-full mb-12">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="introduction" className="data-[state=active]:bg-purple-600 font-heading">
            Introduction
          </TabsTrigger>
          <TabsTrigger value="preview" className="data-[state=active]:bg-purple-600 font-heading">
            Chapter Preview
          </TabsTrigger>
          <TabsTrigger value="sample" className="data-[state=active]:bg-purple-600 font-heading">
            Sample Spreads
          </TabsTrigger>
          <TabsTrigger value="download" className="data-[state=active]:bg-purple-600 font-heading">
            Download Options
          </TabsTrigger>
        </TabsList>

        <TabsContent value="introduction" className="mt-0">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-400 font-heading">Introduction to the NUMO Oracle</CardTitle>
              <CardDescription className="text-text-main">A brief overview of the NUMO Oracle system</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none text-text-main">
              <p>
                Welcome to the world of the NUMO Oracle Card Deck, a unique divination system that bridges ancient
                numerological wisdom with contemporary spiritual practice. This guidebook serves as your companion on a
                journey of discovery, insight, and transformation.
              </p>

              <p>
                The NUMO Oracle was born from a profound discovery: the symmetrical patterns that exist within our
                number system. These patterns reveal the hidden relationships between numbers, connecting them in pairs
                that form the foundation of this oracle system.
              </p>

              <MembershipVerification>
                <p>
                  Unlike traditional tarot or oracle decks, the NUMO system is structured around five sacred suits, each
                  corresponding to one of the treasures of the Goddess Danu. Each suit represents a number pairing and
                  connects to specific aspects of human experience and consciousness.
                </p>

                <p>The five suits are:</p>

                <ul className="list-disc pl-6">
                  <li>
                    <strong className="text-text-heading">The Cauldron (0/1)</strong> - The vessel of creation and
                    intuition
                  </li>
                  <li>
                    <strong className="text-text-heading">The Sword (2/5)</strong> - The blade of clarity and decision
                  </li>
                  <li>
                    <strong className="text-text-heading">The Cord (3/8)</strong> - The thread of connection and destiny
                  </li>
                  <li>
                    <strong className="text-text-heading">The Spear (4/7)</strong> - The tool of action and protection
                  </li>
                  <li>
                    <strong className="text-text-heading">The Stone (6/9)</strong> - The foundation of stability and
                    abundance
                  </li>
                </ul>

                <p>
                  Each card in the deck combines one of these suits with one of the five elements (Earth, Air, Fire,
                  Water, Spirit), creating a rich tapestry of meanings and interpretations that can provide guidance for
                  any situation or question.
                </p>
              </MembershipVerification>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <MembershipVerification>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-400 font-heading">
                  Chapter Preview: The Cauldron Suit
                </CardTitle>
                <CardDescription className="text-text-main">
                  Excerpt from Chapter 3: The Five Sacred Suits
                </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none text-text-main">
                <h3 className="font-heading text-text-heading text-xl">The Cauldron (0/1): Vessel of Creation</h3>

                <p>
                  The Cauldron represents the dynamic between infinite potential (0) and manifestation (1). As the first
                  of the sacred suits, it embodies the primordial waters from which all creation emerges. The Cauldron
                  is associated with intuition, emotions, creativity, and the subconscious mind.
                </p>

                <h4 className="font-heading text-text-heading text-lg">Numerological Significance</h4>

                <p>
                  The pairing of 0 and 1 represents the most fundamental duality in existence: nothingness and
                  somethingness, potential and actualization. Zero is the void, the unmanifest, the cosmic womb
                  containing all possibilities. One is the first step into manifestation, the initial spark of creation,
                  the individual self emerging from the collective unconscious.
                </p>

                <h4 className="font-heading text-text-heading text-lg">Elemental Associations</h4>

                <p>
                  The Cauldron cards appear in all five elemental variations, each emphasizing different aspects of this
                  suit's energy:
                </p>

                <ul className="list-disc pl-6">
                  <li>
                    <strong className="text-text-heading">Cauldron of Earth:</strong> Manifesting physical abundance,
                    grounding intuition into practical action
                  </li>
                  <li>
                    <strong className="text-text-heading">Cauldron of Air:</strong> Intellectual creativity,
                    communicating intuitive insights
                  </li>
                  <li>
                    <strong className="text-text-heading">Cauldron of Fire:</strong> Passionate creation, transformative
                    emotional experiences
                  </li>
                  <li>
                    <strong className="text-text-heading">Cauldron of Water:</strong> Deep emotional wisdom, psychic
                    receptivity, healing
                  </li>
                  <li>
                    <strong className="text-text-heading">Cauldron of Spirit:</strong> Connection to divine inspiration,
                    spiritual rebirth
                  </li>
                </ul>

                <h4 className="font-heading text-text-heading text-lg">Reading with Cauldron Cards</h4>

                <p>When Cauldron cards appear in a reading, they often point to:</p>

                <ul className="list-disc pl-6">
                  <li>Areas where intuition should be trusted over logic</li>
                  <li>Creative opportunities or projects</li>
                  <li>Emotional situations requiring attention</li>
                  <li>The need to connect with your subconscious wisdom</li>
                  <li>Beginnings and new cycles of creation</li>
                </ul>

                <p>
                  Working with the Cauldron suit invites you to dive deep into your intuitive wisdom and emotional
                  intelligence. These cards remind us that creation begins in the unseen realms of imagination and
                  feeling before manifesting in the physical world.
                </p>
              </CardContent>
            </Card>
          </MembershipVerification>
        </TabsContent>

        <TabsContent value="sample" className="mt-0">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-400 font-heading">Sample Spreads</CardTitle>
              <CardDescription className="text-text-main">Preview of spreads included in the guidebook</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-300 mb-3 font-heading">
                    Three-Card Elemental Insight
                  </h3>
                  <p className="text-gray-300 mb-4">
                    A simple but powerful spread that reveals the elemental influences affecting your situation.
                  </p>
                  <div className="flex justify-center mb-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="w-16 h-24 bg-gray-600 rounded-md flex items-center justify-center border border-gray-500">
                        <span className="text-xs text-gray-300">Mind</span>
                      </div>
                      <div className="w-16 h-24 bg-gray-600 rounded-md flex items-center justify-center border border-gray-500">
                        <span className="text-xs text-gray-300">Heart</span>
                      </div>
                      <div className="w-16 h-24 bg-gray-600 rounded-md flex items-center justify-center border border-gray-500">
                        <span className="text-xs text-gray-300">Spirit</span>
                      </div>
                    </div>
                  </div>
                  <MembershipVerification>
                    <p className="text-gray-300 text-sm">
                      This spread reveals the elemental energies influencing your thoughts (Mind), emotions (Heart), and
                      spiritual path (Spirit). It provides a balanced view of how different aspects of your being are
                      currently aligned.
                    </p>
                  </MembershipVerification>
                </div>

                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-300 mb-3 font-heading">Sacred Treasures Spread</h3>
                  <p className="text-gray-300 mb-4">
                    A five-card spread based on the sacred treasures of the Goddess Danu.
                  </p>
                  <div className="flex justify-center mb-4">
                    <div className="relative h-40 w-40">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-14 h-20 bg-gray-600 rounded-md flex items-center justify-center border border-gray-500">
                        <span className="text-xs text-gray-300">Spirit</span>
                      </div>
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-14 h-20 bg-gray-600 rounded-md flex items-center justify-center border border-gray-500">
                        <span className="text-xs text-gray-300">Water</span>
                      </div>
                      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-14 h-20 bg-gray-600 rounded-md flex items-center justify-center border border-gray-500">
                        <span className="text-xs text-gray-300">Fire</span>
                      </div>
                      <div className="absolute bottom-0 left-1/4 w-14 h-20 bg-gray-600 rounded-md flex items-center justify-center border border-gray-500">
                        <span className="text-xs text-gray-300">Earth</span>
                      </div>
                      <div className="absolute bottom-0 right-1/4 w-14 h-20 bg-gray-600 rounded-md flex items-center justify-center border border-gray-500">
                        <span className="text-xs text-gray-300">Air</span>
                      </div>
                    </div>
                  </div>
                  <MembershipVerification>
                    <p className="text-gray-300 text-sm">
                      This powerful spread examines how the five elemental energies are currently manifesting in your
                      life. It reveals areas of strength and imbalance, helping you harmonize these forces for optimal
                      well-being and growth.
                    </p>
                  </MembershipVerification>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="download" className="mt-0">
          <MembershipVerification>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-400 font-heading">Download Options</CardTitle>
                <CardDescription className="text-text-main">
                  Available formats for the NUMO Oracle Guidebook
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gray-700/50 border-gray-600">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-heading">PDF Format</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-300">
                      High-quality PDF optimized for both screen reading and printing. Includes bookmarks and hyperlinks
                      for easy navigation.
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        <Download className="mr-2 h-4 w-4" /> Download PDF
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-gray-700/50 border-gray-600">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-heading">EPUB Format</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-300">
                      Optimized for e-readers and mobile devices. Reflowable text adapts to your screen size for
                      comfortable reading.
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        <Download className="mr-2 h-4 w-4" /> Download EPUB
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-gray-700/50 border-gray-600">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-heading">MOBI Format</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-300">
                      Compatible with Kindle devices and apps. Includes all images and formatting optimized for Kindle
                      readers.
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        <Download className="mr-2 h-4 w-4" /> Download MOBI
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </MembershipVerification>
        </TabsContent>
      </Tabs>

      <div className="text-center text-sm text-gray-500 mt-12">
        <p>The NUMO Oracle Guidebook is a product of Kraftwerk Numerology © 2023. All rights reserved.</p>
        <p className="mt-1">numoracle.com</p>
      </div>
    </main>
  )
}
