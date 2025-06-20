"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Sparkles, Moon, Sun, HelpCircle, BookOpen, Users, Video } from "lucide-react" // Added BookOpen, Users, Video
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ShootingStar from "./shooting-star"
import YouTubeVideo from "@/components/youtube-video" // Import YouTubeVideo component

export default function AboutPageContent() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white space-y-24 pb-20">
      {isMounted && <ShootingStar />}

      {/* Origin Story */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 z-10"></div>
            <Image
              src="/images/about/ancient-wisdom.png"
              alt="Ancient symbols and numerology charts"
              fill
              className="object-cover z-0"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Image
                src="/numerology-diagram.png"
                alt="Numerology Diagram with Circles and Numbers"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center mb-6">
              <Sparkles className="h-6 w-6 text-purple-400 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Our Origin</h2>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-200">
              A Vision Born from Sacred Discovery
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The NUMO Oracle system was envisioned by Raziel Ali of{" "}
              <a
                href="https://www.kraftwerked.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:underline"
              >
                Kraftwerk Numerology
              </a>
              , who unearthed symmetrical number patterns within the Indo-Arabic numeral system and recognized their
              profound connection to mythic goddess traditions and elemental wisdom. This revelation became the
              cornerstone of the NUMO Oracle.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Through dedicated research and spiritual practice, these patterns emerged as a bridge between ancient
              wisdom and modern understanding—a system honoring both numerological precision and intuitive divination.
            </p>
          </div>
        </div>
      </section>

      {/* Core Philosophy */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-purple-900/30 to-black/80 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Moon className="h-6 w-6 text-purple-400 mr-3" />
              <Sun className="h-6 w-6 text-amber-400 ml-3" /> {/* Corrected icon */}
              <h2 className="text-3xl md:text-4xl font-bold text-white">Our Philosophy</h2>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-200">Dualism: The Dance of Opposites</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-0 shadow-xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <Moon className="h-12 w-12 text-purple-300" />
                </div>
                <h4 className="text-xl font-semibold text-center mb-4 text-purple-100">Shadow & Intuition</h4>
                <p className="text-gray-300 text-center">
                  Embracing the shadow, honoring intuitive wisdom from darkness and mystery.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-900/40 to-yellow-700/40 border-0 shadow-xl overflow-hidden">
              {" "}
              {/* Corrected gradient */}
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <Sun className="h-12 w-12 text-amber-300" />
                </div>
                <h4 className="text-xl font-semibold text-center mb-4 text-amber-100">Light & Logic</h4>
                <p className="text-gray-300 text-center">
                  Honoring clarity, illumination, and logical patterns that bring order.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 text-center max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed">
              NUMO doesn't seek to resolve this polarity but to honor it. Wisdom arises from embracing both light and
              shadow, mind and heart, fate and will. This dance of opposites fuels our spiritual journey.
            </p>
          </div>
        </div>
      </section>

      {/* The Oracle Structure & Goddess Danu */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">The NUMO System</h2>
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-200">
            Structure, Elements, and Divine Feminine
          </h3>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            The NUMO Oracle is built upon five sacred suits (The Five Treasures of Danu), five elemental energies, and
            the guiding wisdom of the Goddess Danu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h4 className="text-xl font-semibold mb-4 text-purple-200">The Five Sacred Treasures & Suits</h4>
            <p className="text-gray-300 mb-6">
              Each suit corresponds to one of the Five Sacred Treasures of the Tuatha Dé Danann, ancient Celtic deities.
              These treasures represent fundamental aspects of existence:
            </p>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li>
                <strong>Cauldron (0/1):</strong> Emotional alchemy, potential, transformation.
              </li>
              <li>
                <strong>Sword (2/5):</strong> Clarity, truth, decisive action, intellect.
              </li>
              <li>
                <strong>Cord (3/8):</strong> Destiny, connection, cycles, communication.
              </li>
              <li>
                <strong>Spear (4/7):</strong> Ambition, protection, strategy, focus.
              </li>
              <li>
                <strong>Stone (6/9):</strong> Grounding, material balance, stability, service.
              </li>
            </ul>
            <h4 className="text-xl font-semibold mb-4 text-purple-200">Elemental Wisdom</h4>
            <p className="text-gray-300">
              Each card is also imbued with one of five elemental energies—Fire, Water, Air, Earth, and Spirit—adding
              layers of meaning to your readings.
            </p>
          </div>
          <div className="relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden">
            <Image
              src="/images/about/five-treasures.png"
              alt="Symbolic representation of the Five Sacred Treasures"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden">
            <Image
              src="/images/about/goddess-danu.png"
              alt="Artistic representation of Goddess Danu"
              fill
              className="object-cover"
            />
            <Image
              src="/images/about/goddess-danu-art.png"
              alt="Artistic representation of Goddess Danu"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 text-purple-200">The Wisdom of Goddess Danu</h4>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The NUMO Oracle draws profound inspiration from Goddess Danu, the Celtic mother goddess. Her nurturing
              energy and divine wisdom flow through the deck, offering guidance, healing, and connection to your higher
              self.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Danu's presence reminds us of our interconnectedness within the cosmic tapestry, woven by numerology and
              divine insight.
            </p>
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Video className="h-6 w-6 text-purple-400 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Learn More Visually</h2>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Watch these videos from our{" "}
            <a
              href="https://www.youtube.com/@numoracle1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:underline"
            >
              YouTube channel
            </a>{" "}
            to explore the NUMO Oracle system and the symbolism of number pairing.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-purple-500/20">
            <YouTubeVideo
              videoId="ljJ18kG7zqg"
              title="NUMO Pair Numerology Pattern - NEW Discovery!"
              className="w-full h-full"
            />
          </div>
          <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-purple-500/20">
            <YouTubeVideo
              videoId="3uPooopg98g"
              title="The Profound Symbolism of Number Pairing in the NUMO divination system"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-6 w-6 text-purple-400 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Answers to common questions about the NUMO Oracle Card Deck.
          </p>
        </div>
        <div className="max-w-3xl mx-auto bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-gray-700">
              <AccordionTrigger className="text-white hover:text-purple-300">
                What is the NUMO Oracle Card Deck?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                <p>
                  The NUMO Oracle Card Deck is a unique divination system by{" "}
                  <a
                    href="https://www.kraftwerked.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline"
                  >
                    Kraftwerk Numerology
                  </a>{" "}
                  that integrates ancient numerology, mythic symbolism (including the Five Sacred Treasures of Danu),
                  and elemental wisdom. It's designed for deep insight and spiritual guidance.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-gray-700">
              <AccordionTrigger className="text-white hover:text-purple-300">What are the five suits?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                <p>
                  The five suits are Cauldron (0/1), Sword (2/5), Cord (3/8), Spear (4/7), and Stone (6/9), each linked
                  to a Sacred Treasure of Danu and specific numerological pairings and elemental energies.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-gray-700">
              <AccordionTrigger className="text-white hover:text-purple-300">
                Do I need prior numerology knowledge?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                <p>
                  No, the deck is accessible to beginners, with a comprehensive guidebook. Our website also offers
                  resources like the{" "}
                  <Link href="/tools/numerology-calculator" className="text-purple-400 hover:underline">
                    Numerology Calculator
                  </Link>{" "}
                  and{" "}
                  <Link href="/tools/card-simulator" className="text-purple-400 hover:underline">
                    Card Simulator
                  </Link>
                  .
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-gray-700">
              <AccordionTrigger className="text-white hover:text-purple-300">
                How do elements relate to cards?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                <p>
                  Each card is associated with Fire, Water, Air, Earth, or Spirit, adding depth. Fire: passion,
                  transformation. Water: emotions, intuition. Air: intellect, communication. Earth: stability,
                  abundance. Spirit: divine connection, integration.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-gray-700">
              <AccordionTrigger className="text-white hover:text-purple-300">Where can I learn more?</AccordionTrigger>
              <AccordionContent className="text-gray-300">
                <p>
                  Explore our{" "}
                  <Link href="/faq" className="text-purple-400 hover:underline">
                    full FAQ
                  </Link>
                  ,{" "}
                  <Link href="/library" className="text-purple-400 hover:underline">
                    Library
                  </Link>
                  ,{" "}
                  <Link href="/tools/card-simulator" className="text-purple-400 hover:underline">
                    Card Simulator
                  </Link>
                  , purchase the{" "}
                  <Link href="/buy" className="text-purple-400 hover:underline">
                    Guidebook
                  </Link>
                  , or join our community (link to be added).
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-6 text-center">
            <Link href="/faq">
              <Button className="bg-purple-600 hover:bg-purple-700">
                View All FAQs <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Learn & Practice */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-indigo-900/30 to-black/80 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-purple-400 mr-3" />
                <h2 className="text-3xl md:text-4xl font-bold text-white">Learn & Practice</h2>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-200">
                Train with the NUMO Oracle Assistant
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Our AI-powered online oracle is free and interactive, designed to help you learn the NUMO system.
                Practice readings, explore card meanings, and deepen your understanding.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                The assistant guides interpretations, pattern recognition, and supports intuitive development.
              </p>
              <Link href="/tools/card-simulator">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                  Try the Oracle Assistant
                </Button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/tools/card-simulator.png"
                alt="NUMO Oracle Assistant Interface"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-black/70 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
                  <p className="text-purple-300 text-sm mb-2">NUMO Assistant</p>
                  <p className="text-white text-sm">
                    The Cauldron of Water suggests emotional depth... Consider what feelings you might be avoiding...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Invitation */}
      <section className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <Users className="h-6 w-6 text-purple-400 mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">You Are the Oracle</h2>
        </div>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-12">
          Join our community of seekers. The NUMO Oracle is an invitation to cosmic reflection and spiritual growth.
          Begin your journey today.
        </p>
        <div className="relative h-[300px] rounded-2xl overflow-hidden mb-12">
          <Image
            src="/images/hero/oracle-cards-spread.png"
            alt="NUMO Oracle cards spread out for a reading"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/numo-oracle-artistic-vision.png"
              alt="Artistic representation of the NUMO Oracle, symbolizing guidance and future insight with ethereal light and futuristic interfaces"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/tools/card-simulator">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8"
            >
              Try a Free Reading
            </Button>
          </Link>
          <Link href="/buy">
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-300 hover:bg-purple-900/30 px-8"
            >
              Get Your Deck
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
