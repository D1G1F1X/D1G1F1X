import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NumoOracleSystemPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative mb-12 overflow-hidden rounded-xl bg-gradient-to-br from-purple-900 via-black to-purple-900 p-8 text-white md:p-12">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/projects/numo-oracle-system.png"
            alt="NUMO Oracle System Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge className="bg-amber-500 text-black hover:bg-amber-600">In-House Project</Badge>
              <Badge variant="outline" className="border-purple-400 text-purple-100">
                Beta
              </Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">NUMO Oracle System</h1>
            <p className="mb-6 text-lg text-purple-100 md:text-xl">
              An innovative divination platform integrating ancient numerology with modern AI technology, featuring a
              digital oracle deck, interactive readings, and spiritual guidance tools.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="https://numo2.vercel.app/" target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="bg-amber-500 text-black hover:bg-amber-600">
                  Preview Beta
                </Button>
              </Link>
              <Link href="/case-studies/numo-oracle">
                <Button variant="outline" className="border-purple-400 text-purple-100 hover:bg-purple-900/50">
                  View Case Study
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-amber-500 md:h-80 md:w-80">
              <Image
                src="/images/projects/numo-oracle-system.png"
                alt="NUMO Oracle System"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="prose prose-lg max-w-none dark:prose-invert bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Overview</h2>
                <p className="text-gray-800 dark:text-gray-200">
                  The NUMO Oracle System is a revolutionary divination platform that seamlessly integrates ancient
                  numerology, astrology, and mystical traditions with contemporary spiritual practices. Created by
                  visionary author and mystic Raziel Ali, this system offers a transformative tool for those seeking
                  deeper insights, spiritual growth, and a profound connection to the universe's hidden truths.
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  The inception of the NUMO Oracle System stems from a remarkable discovery of number pairs and their
                  symmetrical pattern in the number line, revealing intricate connections between numerical sequences
                  and cosmic energies. These patterns, presumed to have been meticulously embedded into the design of
                  our numbers by ancient Indo-Eastern scribes, illustrate the profound relationships between numbers and
                  the revered Goddess Danu.
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6">Project Goals</h3>
                <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
                  <li>Create an accessible digital platform for spiritual exploration and divination</li>
                  <li>Integrate ancient wisdom with modern AI technology</li>
                  <li>Develop an intuitive interface for oracle card readings</li>
                  <li>Build a community around the NUMO Oracle System</li>
                  <li>Provide educational resources about numerology and divination</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <div className="prose prose-lg max-w-none dark:prose-invert bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Features</h2>
                <p className="text-gray-800 dark:text-gray-200">
                  The NUMO Oracle System comprises five suits, each corresponding to traditional tarot and card game
                  suits enriched with unique interpretations and symbolism.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-900 to-purple-800 text-white">
                    <CardTitle>Cauldron (Cups/Hearts)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 bg-white dark:bg-gray-900">
                    <p className="mb-2 font-semibold text-gray-900 dark:text-white">Symbolism:</p>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      Creation, nurturing, emotional depth, and intuitive insight.
                    </p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      The Cauldron represents the wellspring of life and the profound depths of human emotion. It
                      signifies the power of transformation and the alchemical process of turning experiences into
                      wisdom.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-900 to-purple-800 text-white">
                    <CardTitle>Sword (Swords/Spades)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 bg-white dark:bg-gray-900">
                    <p className="mb-2 font-semibold text-gray-900 dark:text-white">Symbolism:</p>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      Intellect, truth, decision-making, and overcoming challenges.
                    </p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      The Sword embodies clarity of thought and the courage to face and surmount obstacles. As an
                      offensive weapon, it cuts through illusion and confusion, encouraging decisive action and the
                      assertion of truth.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-900 to-purple-800 text-white">
                    <CardTitle>Cord (Wheels/Knots)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 bg-white dark:bg-gray-900">
                    <p className="mb-2 font-semibold text-gray-900 dark:text-white">Symbolism:</p>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      Destiny, creation, interconnectedness, cycles, time and the weaving of life's tapestry.
                    </p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      The Cord reflects the intricate bonds that connect all beings and events across time and space. It
                      speaks to the cyclical creative nature of existence and the threads of karma and fate that
                      intertwine to shape our journeys.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-900 to-purple-800 text-white">
                    <CardTitle>Spear (Wands/Clubs)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 bg-white dark:bg-gray-900">
                    <p className="mb-2 font-semibold text-gray-900 dark:text-white">Symbolism:</p>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      Action, ambition, protection, and intelligent planning.
                    </p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      The Spear signifies purposeful movement and strategic pursuit of goals. Unlike the Sword, the
                      Spear is a defensive weapon, embodying protection, stability, and the hands-on resolve to defend
                      one's path and aspirations.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-900 to-purple-800 text-white">
                    <CardTitle>Stone (Pentacles/Diamonds)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 bg-white dark:bg-gray-900">
                    <p className="mb-2 font-semibold text-gray-900 dark:text-white">Symbolism:</p>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      Material abundance, focus, stability, service, and grounding.
                    </p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      The Stone represents the physical realm and the rewards of diligent effort and observance. It
                      encourages a harmonious balance between spiritual pursuits and earthly responsibilities,
                      emphasizing vision, generosity and stewardship.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-500 text-black">
                    <CardTitle>AI-Driven Oracle</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 bg-white dark:bg-gray-900">
                    <p className="mb-2 font-semibold text-gray-900 dark:text-white">Functionality:</p>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      Interactive guidance, personalized readings, and educational resources.
                    </p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      The AI-driven oracle not only teaches and trains users on how to read and interpret the deck but
                      also provides personalized, in-depth demo readings of the cards, offering step-by-step guidance
                      and insights tailored to each user's unique queries.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="technology" className="space-y-6">
              <div className="prose prose-lg max-w-none dark:prose-invert bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Technology Stack</h2>
                <p className="text-gray-800 dark:text-gray-200">
                  The NUMO Oracle System leverages cutting-edge technologies to create a seamless, intuitive, and
                  immersive spiritual experience.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white">Frontend</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white dark:bg-gray-900">
                    <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-gray-200">
                      <li>Next.js 14 for server-side rendering and optimal performance</li>
                      <li>React for interactive UI components</li>
                      <li>Tailwind CSS for responsive design</li>
                      <li>Framer Motion for fluid animations</li>
                      <li>Three.js for immersive 3D card visualizations</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white">Backend</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white dark:bg-gray-900">
                    <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-gray-200">
                      <li>Node.js for server-side logic</li>
                      <li>OpenAI API for AI-powered oracle readings</li>
                      <li>PostgreSQL for user data and reading history</li>
                      <li>Redis for caching and performance optimization</li>
                      <li>Vercel for deployment and hosting</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-4">
                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="text-center bg-white dark:bg-gray-900">
                    <CardTitle className="text-4xl font-bold text-amber-500">94%</CardTitle>
                    <CardDescription className="text-gray-700 dark:text-gray-300">AI Reading Accuracy</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="text-center bg-white dark:bg-gray-900">
                    <CardTitle className="text-4xl font-bold text-amber-500">+342%</CardTitle>
                    <CardDescription className="text-gray-700 dark:text-gray-300">User Retention</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="text-center bg-white dark:bg-gray-900">
                    <CardTitle className="text-4xl font-bold text-amber-500">+215%</CardTitle>
                    <CardDescription className="text-gray-700 dark:text-gray-300">User Engagement</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardHeader className="text-center bg-white dark:bg-gray-900">
                    <CardTitle className="text-4xl font-bold text-amber-500">98/100</CardTitle>
                    <CardDescription className="text-gray-700 dark:text-gray-300">Lighthouse Score</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="process" className="space-y-6">
              <div className="prose prose-lg max-w-none dark:prose-invert bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Development Process</h2>
                <p className="text-gray-800 dark:text-gray-200">
                  The NUMO Oracle System was developed through a collaborative process that combined spiritual expertise
                  with technical innovation.
                </p>
              </div>

              <div className="space-y-8 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-600 before:to-amber-500">
                  <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                    1
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Research & Concept Development
                  </h3>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Extensive research into ancient numerology, astrology, and mystical traditions to develop the
                    foundational concept of the NUMO Oracle System.
                  </p>
                </div>

                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-600 before:to-amber-500">
                  <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                    2
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Oracle Deck Design</h3>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Creation of the five suits and their corresponding symbolism, drawing from traditional tarot and
                    card game suits while adding unique interpretations.
                  </p>
                </div>

                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-600 before:to-amber-500">
                  <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                    3
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">AI Integration</h3>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Development of the AI-driven oracle using the OpenAI API, training it to provide personalized
                    readings and educational guidance.
                  </p>
                </div>

                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-600 before:to-amber-500">
                  <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-black">
                    4
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Platform Development</h3>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Building the digital platform with Next.js, React, and other modern technologies to create a
                    seamless, intuitive user experience.
                  </p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-black">
                    5
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Beta Testing & Refinement</h3>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Ongoing beta testing with a community of spiritual practitioners to gather feedback and refine the
                    platform for optimal user experience.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-gray-900 dark:text-white">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-white dark:bg-gray-900">
              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Category</h4>
                <p className="text-gray-900 dark:text-white">In-House Project</p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Status</h4>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-purple-400 text-purple-600 dark:text-purple-400">
                    Beta
                  </Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Preview Available</span>
                </div>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Timeline</h4>
                <p className="text-gray-900 dark:text-white">4 months</p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Services</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-900 dark:text-white">
                  <li>Web Development</li>
                  <li>AI Integration</li>
                  <li>UX/UI Design</li>
                  <li>Branding</li>
                  <li>Content Creation</li>
                  <li>Spiritual Consulting</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">Technologies</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-900 dark:text-white">
                  <li>Next.js 14</li>
                  <li>React</li>
                  <li>OpenAI API</li>
                  <li>PostgreSQL</li>
                  <li>Three.js</li>
                </ul>
              </div>

              <div className="pt-4">
                <Link href="https://numo2.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-amber-500 text-black hover:bg-amber-600">Preview Beta</Button>
                </Link>
              </div>

              <div>
                <Link href="/case-studies/numo-oracle">
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  >
                    View Case Study
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
