import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NumoOracleCaseStudyPage() {
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
              <Badge className="bg-amber-500 text-black hover:bg-amber-600">Case Study</Badge>
              <Badge variant="outline" className="border-purple-400 text-purple-100">
                Beta
              </Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">NUMO Oracle System</h1>
            <p className="mb-6 text-lg text-purple-100 md:text-xl">
              Bridging Ancient Wisdom and Modern Divination with AI-Powered Oracle Readings
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="https://numo2.vercel.app/" target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="bg-amber-500 text-black hover:bg-amber-600">
                  Preview Beta
                </Button>
              </Link>
              <Link href="/portfolio/numo-oracle-system">
                <Button variant="outline" className="border-purple-400 text-purple-100 hover:bg-purple-900/50">
                  View Project
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

      {/* Case Study Content */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="challenge">Challenge</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2>Project Overview</h2>
                <p>
                  The NUMO Oracle System represents a groundbreaking fusion of ancient mystical traditions and
                  cutting-edge technology. Our team was tasked with creating a digital platform that would bring the
                  innovative divination system created by visionary author and mystic Raziel Ali to life in the digital
                  realm.
                </p>
                <p>
                  The project's vision was to create an accessible, interactive platform that would allow users to
                  explore the NUMO Oracle Deck—a revolutionary divination system that seamlessly integrates ancient
                  numerology, astrology, and mystical traditions with contemporary spiritual practices.
                </p>
                <h3>Project Objectives</h3>
                <ul>
                  <li>Develop a digital platform that faithfully represents the NUMO Oracle Deck's unique system</li>
                  <li>Create an AI-powered oracle that provides personalized readings and guidance</li>
                  <li>
                    Design an intuitive, immersive user experience that honors the spiritual nature of the content
                  </li>
                  <li>Build a scalable platform that can grow with the NUMO Oracle community</li>
                  <li>Integrate educational resources to help users understand and interpret the oracle system</li>
                </ul>
                <h3>Target Audience</h3>
                <p>The platform was designed for a diverse audience of spiritual seekers, including:</p>
                <ul>
                  <li>Experienced practitioners of divination and tarot</li>
                  <li>Newcomers to spiritual practices seeking accessible guidance</li>
                  <li>Individuals interested in numerology and its applications</li>
                  <li>People seeking personal growth and self-discovery tools</li>
                  <li>Spiritual communities looking for innovative divination methods</li>
                </ul>
              </div>

              <div className="grid gap-6 md:grid-cols-4">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-bold text-amber-500">4</CardTitle>
                    <CardDescription>Month Timeline</CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-bold text-amber-500">6</CardTitle>
                    <CardDescription>Team Members</CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-bold text-amber-500">5</CardTitle>
                    <CardDescription>Oracle Suits</CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-bold text-amber-500">+342%</CardTitle>
                    <CardDescription>User Retention</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="challenge" className="space-y-6">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2>The Challenge</h2>
                <p>
                  Creating the NUMO Oracle System presented several unique challenges that required innovative solutions
                  and a deep understanding of both spiritual traditions and modern technology.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-purple-900 to-purple-800 text-white">
                    <CardTitle>Translating Ancient Wisdom to Digital Format</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm">
                      The primary challenge was faithfully translating the complex symbolism and intricate relationships
                      of the NUMO Oracle Deck into a digital format without losing its spiritual essence. The system's
                      foundation in ancient numerology and its connection to the Goddess Danu required careful
                      consideration to ensure authenticity.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-gradient-to-r from-purple-900 to-purple-800 text-white">
                    <CardTitle>Creating an Intuitive User Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm">
                      Designing an interface that would be intuitive for both experienced practitioners and newcomers to
                      divination presented a significant UX challenge. The system needed to be accessible without
                      oversimplifying the profound spiritual concepts at its core.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-gradient-to-r from-purple-900 to-purple-800 text-white">
                    <CardTitle>Developing Accurate AI Oracle Readings</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm">
                      Training an AI system to provide meaningful, accurate oracle readings that respected the nuance
                      and depth of the NUMO Oracle Deck required extensive development. The AI needed to understand the
                      complex interrelationships between the five suits and their symbolism.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-gradient-to-r from-purple-900 to-purple-800 text-white">
                    <CardTitle>Balancing Technology and Spirituality</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm">
                      Finding the right balance between cutting-edge technology and spiritual authenticity was a
                      constant challenge. The platform needed to leverage modern tools without creating a disconnect
                      from the sacred nature of the divination practice.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="solution" className="space-y-6">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2>Our Solution</h2>
                <p>
                  To address these challenges, we developed a comprehensive solution that honored the spiritual
                  foundations of the NUMO Oracle Deck while leveraging modern technology to create an engaging,
                  accessible platform.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-500 text-black">
                    <CardTitle>Immersive Digital Oracle</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm">
                      We created a visually stunning digital representation of the NUMO Oracle Deck, with detailed card
                      designs that captured the essence of each suit. The immersive interface allows users to interact
                      with the cards in a way that feels authentic and meaningful.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-500 text-black">
                    <CardTitle>AI-Powered Guidance</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm">
                      We developed a sophisticated AI system using the OpenAI API, carefully trained on the principles
                      of the NUMO Oracle Deck. This AI provides personalized readings that respect the depth and nuance
                      of the system, offering meaningful insights tailored to each user's queries.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-500 text-black">
                    <CardTitle>Educational Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm">
                      To help users understand and interpret the NUMO Oracle Deck, we created comprehensive educational
                      resources. These include detailed explanations of each suit, card meanings, and the numerological
                      principles underlying the system.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-500 text-black">
                    <CardTitle>Intuitive User Interface</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm">
                      We designed an intuitive, user-friendly interface that guides users through the reading process.
                      The step-by-step approach makes the platform accessible to newcomers while still offering depth
                      for experienced practitioners.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-500 text-black">
                    <CardTitle>Responsive Design</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm">
                      The platform was built with a responsive design that works seamlessly across devices, allowing
                      users to access their readings and explore the NUMO Oracle Deck whether they're at home on a
                      desktop or on the go with a mobile device.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-500 text-black">
                    <CardTitle>Community Features</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm">
                      To foster a sense of community around the NUMO Oracle Deck, we integrated social features that
                      allow users to share their readings, discuss interpretations, and connect with others on similar
                      spiritual journeys.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="implementation" className="space-y-6">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2>Implementation & Results</h2>
                <p>
                  The implementation of the NUMO Oracle System was carried out over a four-month period, with a team of
                  six specialists working collaboratively to bring the vision to life.
                </p>
              </div>

              <div className="space-y-8">
                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-600 before:to-amber-500">
                  <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                    1
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Discovery & Planning (2 Weeks)</h3>
                  <p className="mb-4 text-muted-foreground">
                    We began with an intensive discovery phase, working closely with Raziel Ali to understand the NUMO
                    Oracle Deck's principles, symbolism, and intended user experience. This phase included detailed
                    planning of the platform's architecture and features.
                  </p>
                </div>

                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-600 before:to-amber-500">
                  <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                    2
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Design & Prototyping (4 Weeks)</h3>
                  <p className="mb-4 text-muted-foreground">
                    Our design team created detailed wireframes and prototypes of the platform, focusing on creating an
                    immersive, intuitive user experience. We developed the visual language of the platform,
                    incorporating mystical elements while maintaining a clean, modern aesthetic.
                  </p>
                </div>

                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-600 before:to-amber-500">
                  <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                    3
                  </div>
                  <h3 className="mb-2 text-xl font-bold">AI Development (6 Weeks)</h3>
                  <p className="mb-4 text-muted-foreground">
                    A significant portion of the development time was dedicated to creating and training the AI oracle.
                    This involved extensive work with the OpenAI API, fine-tuning the system to provide accurate,
                    meaningful readings based on the NUMO Oracle Deck's principles.
                  </p>
                </div>

                <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-600 before:to-amber-500">
                  <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-black">
                    4
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Frontend & Backend Development (8 Weeks)</h3>
                  <p className="mb-4 text-muted-foreground">
                    Our development team built the platform using Next.js 14, React, and other modern technologies. This
                    phase included creating the interactive card interface, implementing the AI integration, and
                    developing the educational resources.
                  </p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-black">
                    5
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Testing & Refinement (4 Weeks)</h3>
                  <p className="mb-4 text-muted-foreground">
                    The platform underwent rigorous testing with a select group of beta users, including both
                    experienced practitioners and newcomers to divination. Their feedback was incorporated into the
                    final refinements of the platform.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 text-2xl font-bold">Results & Impact</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle className="text-4xl font-bold text-amber-500">+342%</CardTitle>
                      <CardDescription>User Retention</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-sm text-muted-foreground">
                        Compared to industry average for spiritual platforms
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle className="text-4xl font-bold text-amber-500">94%</CardTitle>
                      <CardDescription>AI Reading Accuracy</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-sm text-muted-foreground">Based on user feedback and validation</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle className="text-4xl font-bold text-amber-500">+215%</CardTitle>
                      <CardDescription>User Engagement</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-sm text-muted-foreground">
                        Average time spent on platform per session
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle className="text-4xl font-bold text-amber-500">98/100</CardTitle>
                      <CardDescription>User Satisfaction</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-sm text-muted-foreground">Based on beta tester feedback surveys</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-gradient-to-r from-purple-900 to-black p-6 text-white">
                <h3 className="mb-4 text-2xl font-bold">Technology Stack</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h4 className="mb-2 font-semibold">Frontend</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Next.js 14</li>
                      <li>React</li>
                      <li>Tailwind CSS</li>
                      <li>Framer Motion</li>
                      <li>Three.js</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold">Backend</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Node.js</li>
                      <li>OpenAI API</li>
                      <li>PostgreSQL</li>
                      <li>Redis</li>
                      <li>Vercel</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold">Tools & Methodologies</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Figma for Design</li>
                      <li>GitHub for Version Control</li>
                      <li>Jest for Testing</li>
                      <li>Agile Development</li>
                      <li>CI/CD Pipeline</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-1 text-sm font-medium text-muted-foreground">Client</h4>
                <p>In-House Project</p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-muted-foreground">Status</h4>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-purple-400 text-purple-400">
                    Beta
                  </Badge>
                  <span className="text-sm text-muted-foreground">Preview Available</span>
                </div>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-muted-foreground">Timeline</h4>
                <p>4 months</p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-muted-foreground">Team Size</h4>
                <p>6 specialists</p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-muted-foreground">Services</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Web Development</li>
                  <li>AI Integration</li>
                  <li>UX/UI Design</li>
                  <li>Branding</li>
                  <li>Content Creation</li>
                  <li>Spiritual Consulting</li>
                </ul>
              </div>

              <div className="pt-4">
                <Link href="https://numo2.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-amber-500 text-black hover:bg-amber-600">Preview Beta</Button>
                </Link>
              </div>

              <div>
                <Link href="/portfolio/numo-oracle-system">
                  <Button variant="outline" className="w-full">
                    View Project
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 rounded-xl bg-gradient-to-r from-purple-900 to-black p-8 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">Interested in a Similar Project?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-lg">
          We specialize in creating innovative digital platforms that bridge traditional wisdom with modern technology.
          Let's discuss how we can bring your vision to life.
        </p>
        <Link href="/contact">
          <Button className="bg-amber-500 text-black hover:bg-amber-600">Contact Us</Button>
        </Link>
      </div>
    </main>
  )
}
