"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sparkles, BookOpen, Lightbulb, Users, Gem } from "lucide-react"
import Link from "next/link"
import ConstellationBackground from "@/components/constellation-background"

export function AboutPageContent() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 opacity-30">
        <ConstellationBackground />
      </div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">About NUMO Oracle</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unveiling ancient wisdom for modern guidance.
          </p>
        </div>

        <div className="space-y-16">
          {/* Introduction Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary-foreground">
                Our Vision: Bridging Ancient Wisdom and Modern Life
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                NUMO Oracle was born from a deep reverence for ancient numerology and Celtic symbolism, reimagined for
                the digital age. Our mission is to provide accessible, insightful, and personalized guidance that
                empowers individuals to navigate life's complexities with clarity and purpose. We believe that the
                universe communicates through patterns, and by understanding these patterns, we can unlock our true
                potential.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We combine traditional numerological calculations with rich, archetypal imagery inspired by Celtic lore,
                all interpreted through advanced AI to offer unique, actionable insights.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/about/ancient-wisdom.png"
                alt="Ancient Wisdom"
                width={400}
                height={400}
                className="rounded-full object-cover shadow-lg"
              />
            </div>
          </section>

          <Separator className="my-16" />

          {/* The Five Sacred Treasures Section */}
          <section className="text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-8 flex items-center justify-center gap-2">
              <Gem className="h-8 w-8 text-purple-500" /> The Five Sacred Treasures
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
              Our oracle deck is built upon the foundation of five powerful archetypal tools, each representing a core
              aspect of existence and guidance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-4">
                <CardHeader>
                  <CardTitle className="text-xl text-primary-foreground">The Cauldron</CardTitle>
                  <CardDescription className="text-muted-foreground">Creation & Transformation</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/cauldron-of-dagda.png"
                    alt="The Cauldron"
                    width={150}
                    height={150}
                    className="mx-auto mb-4"
                  />
                  <p className="text-sm text-muted-foreground">
                    Represents the womb of creation, spiritual nourishment, and the alchemical process of turning
                    potential into reality.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardHeader>
                  <CardTitle className="text-xl text-primary-foreground">The Sword</CardTitle>
                  <CardDescription className="text-muted-foreground">Truth & Intellect</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image src="/sword-of-nuada.png" alt="The Sword" width={150} height={150} className="mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Symbolizes clarity, discernment, justice, and the power of the mind to cut through illusion.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardHeader>
                  <CardTitle className="text-xl text-primary-foreground">The Spear</CardTitle>
                  <CardDescription className="text-muted-foreground">Willpower & Direction</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image src="/spear-of-lugh.png" alt="The Spear" width={150} height={150} className="mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Embodies drive, purpose, protection, and the focused energy needed to achieve goals.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardHeader>
                  <CardTitle className="text-xl text-primary-foreground">The Stone</CardTitle>
                  <CardDescription className="text-muted-foreground">Foundation & Stability</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/stone-of-destiny.png"
                    alt="The Stone"
                    width={150}
                    height={150}
                    className="mx-auto mb-4"
                  />
                  <p className="text-sm text-muted-foreground">
                    Represents grounding, wisdom, endurance, and the solid base upon which life is built.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardHeader>
                  <CardTitle className="text-xl text-primary-foreground">The Cord</CardTitle>
                  <CardDescription className="text-muted-foreground">Connection & Destiny</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image src="/cord-of-fate.png" alt="The Cord" width={150} height={150} className="mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Symbolizes interconnectedness, relationships, karmic ties, and the threads of fate that weave our
                    lives.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-16" />

          {/* Our Philosophy Section */}
          <section className="text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-8 flex items-center justify-center gap-2">
              <Lightbulb className="h-8 w-8 text-yellow-500" /> Our Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-4">
                <CardHeader>
                  <CardTitle className="text-xl text-primary-foreground">Empowerment Through Insight</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We believe that true divination empowers you to make informed choices, not to predict a fixed
                    future. Our readings offer perspectives and guidance, enabling you to shape your own destiny.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardHeader>
                  <CardTitle className="text-xl text-primary-foreground">Accessibility & Modernity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    By blending ancient systems with modern technology, we make profound spiritual tools accessible to
                    everyone, anywhere, at any time.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardHeader>
                  <CardTitle className="text-xl text-primary-foreground">Ethical AI</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our AI is trained on extensive spiritual texts and numerological principles, ensuring
                    interpretations are respectful, insightful, and aligned with the highest good.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardHeader>
                  <CardTitle className="text-xl text-primary-foreground">Community & Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We foster a community where individuals can share their journeys, learn from each other, and grow
                    spiritually in a supportive environment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-16" />

          {/* Meet the Team / Our Story Section (Placeholder) */}
          <section className="text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-8 flex items-center justify-center gap-2">
              <Users className="h-8 w-8 text-blue-500" /> Our Story
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
              NUMO Oracle was founded by a collective of numerologists, spiritual guides, and technologists passionate
              about bringing ancient wisdom into the modern era. Our journey began with a shared vision: to create a
              tool that not only provides answers but also inspires self-reflection and personal transformation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <Image
                  src="/images/testimonials/user-avatar-1.png"
                  alt="Team Member 1"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto object-cover"
                />
                <h3 className="text-xl font-semibold text-primary-foreground">Jane Doe</h3>
                <p className="text-muted-foreground">Lead Numerologist & Visionary</p>
              </div>
              <div className="space-y-4">
                <Image
                  src="/images/testimonials/user-avatar-2.png"
                  alt="Team Member 2"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto object-cover"
                />
                <h3 className="text-xl font-semibold text-primary-foreground">John Smith</h3>
                <p className="text-muted-foreground">AI Architect & Developer</p>
              </div>
              <div className="space-y-4">
                <Image
                  src="/images/testimonials/user-avatar-3.png"
                  alt="Team Member 3"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto object-cover"
                />
                <h3 className="text-xl font-semibold text-primary-foreground">Sarah Lee</h3>
                <p className="text-muted-foreground">Celtic Lore Specialist</p>
              </div>
            </div>
          </section>

          <Separator className="my-16" />

          {/* FAQ Section (Optional, can link to /faq) */}
          <section className="text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-8 flex items-center justify-center gap-2">
              <BookOpen className="h-8 w-8 text-green-500" /> Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              <AccordionItem value="faq-1">
                <AccordionTrigger className="text-lg">What is Numerology?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Numerology is the study of the mystical relationship between numbers and events. It's an ancient
                  divinatory art that reveals insights into personality, life path, and future possibilities based on
                  numerical vibrations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger className="text-lg">How does the AI work?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our AI is trained on a vast dataset of numerological principles, Celtic mythology, and oracle card
                  interpretations. It synthesizes this knowledge to provide personalized and context-aware readings
                  based on your questions and drawn cards.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger className="text-lg">Is this for entertainment purposes only?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  While the NUMO Oracle can be used for entertainment, its primary purpose is to serve as a tool for
                  self-reflection, personal growth, and spiritual guidance. The insights provided are meant to empower
                  you, not to replace professional advice.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button asChild variant="outline" className="mt-8 bg-transparent">
              <Link href="/faq">View All FAQs</Link>
            </Button>
          </section>

          <Separator className="my-16" />

          {/* Call to Action */}
          <section className="text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6 flex items-center justify-center gap-2">
              <Sparkles className="h-8 w-8 text-purple-500" /> Begin Your Journey with NUMO Oracle
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to unlock your inner wisdom and navigate your path with clarity?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/tools/card-simulator">Start a Free Reading</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/buy">Explore Our Products</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
