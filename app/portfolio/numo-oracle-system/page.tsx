import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ExternalLink } from "lucide-react"
import PageHero from "@/components/page-hero"
import { CallToAction } from "@/components/call-to-action"
import SocialShareButtons from "@/components/social-share-buttons" // Import the new component
import { projects } from "@/lib/projects"
import { notFound } from "next/navigation"

export default function NumoOracleSystemPage({ params }: { params: { id: string } }) {
  // Note: The original component didn't use params.id, so I'm assuming a static project for this example.
  // You'll need to fetch the project dynamically based on params.id for a real scenario.
  const project = projects.find((p) => p.id === "numo-oracle-system")

  if (!project) {
    // If you were fetching dynamically:
    // const project = projects.find(p => p.id === params.id);
    // if (!project) {
    //   notFound();
    // }
    notFound() // For this static example, if 'numo-oracle-system' isn't found
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/portfolio/${project.id}`
  const shareTags = project.tags?.map((tag) => tag.replace(/\s+/g, ""))

  return (
    <div className="bg-gray-900 text-white">
      <PageHero
        title={project.title}
        subtitle={`A deep dive into the ${project.title} project.`}
        // breadcrumbs={[{ label: "Portfolio", href: "/portfolio" }, { label: project.title }]}
        // Removed breadcrumbs as it's not defined in PageHero props
        // You might need to adjust PageHero or pass breadcrumbs differently
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>

          <article className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-lg overflow-hidden border border-gray-700/50">
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={project.image || "/placeholder.svg?height=600&width=1200&text=Project+Image"}
                alt={project.title}
                fill
                objectFit="cover"
                className="opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h1>
                <p className="text-lg text-primary-300">
                  {project.category === "in-house" ? "In-House Project" : "Client Project"}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between mb-6">
                <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300 border-gray-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {/* Add SocialShareButtons here */}
                <SocialShareButtons
                  url={shareUrl}
                  title={project.title}
                  imageUrl={project.image ? `${process.env.NEXT_PUBLIC_BASE_URL}${project.image}` : undefined}
                  tags={shareTags}
                />
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">{project.description}</p>

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
                          The NUMO Oracle System is a revolutionary divination platform that seamlessly integrates
                          ancient numerology, astrology, and mystical traditions with contemporary spiritual practices.
                          Created by visionary author and mystic Raziel Ali, this system offers a transformative tool
                          for those seeking deeper insights, spiritual growth, and a profound connection to the
                          universe's hidden truths.
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                          The inception of the NUMO Oracle System stems from a remarkable discovery of number pairs and
                          their symmetrical pattern in the number line, revealing intricate connections between
                          numerical sequences and cosmic energies. These patterns, presumed to have been meticulously
                          embedded into the design of our numbers by ancient Indo-Eastern scribes, illustrate the
                          profound relationships between numbers and the revered Goddess Danu.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="features" className="space-y-6">
                      <div className="prose prose-lg max-w-none dark:prose-invert bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Features</h2>
                        <p className="text-gray-800 dark:text-gray-200">
                          The NUMO Oracle System comprises five suits, each corresponding to traditional tarot and card
                          game suits enriched with unique interpretations and symbolism.
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
                              The Cauldron represents the wellspring of life and the profound depths of human emotion.
                              It signifies the power of transformation and the alchemical process of turning experiences
                              into wisdom.
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
                              The Sword embodies clarity of thought and the courage to face and surmount obstacles. As
                              an offensive weapon, it cuts through illusion and confusion, encouraging decisive action
                              and the assertion of truth.
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
                              The Cord reflects the intricate bonds that connect all beings and events across time and
                              space. It speaks to the cyclical creative nature of existence and the threads of karma and
                              fate that intertwine to shape our journeys.
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
                              The Spear signifies purposeful movement and strategic pursuit of goals. Unlike the Sword,
                              the Spear is a defensive weapon, embodying protection, stability, and the hands-on resolve
                              to defend one's path and aspirations.
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
                              The Stone represents the physical realm and the rewards of diligent effort and observance.
                              It encourages a harmonious balance between spiritual pursuits and earthly
                              responsibilities, emphasizing vision, generosity and stewardship.
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
                              The AI-driven oracle not only teaches and trains users on how to read and interpret the
                              deck but also provides personalized, in-depth demo readings of the cards, offering
                              step-by-step guidance and insights tailored to each user's unique queries.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="technology" className="space-y-6">
                      <div className="prose prose-lg max-w-none dark:prose-invert bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Technology Stack</h2>
                        <p className="text-gray-800 dark:text-gray-200">
                          The NUMO Oracle System leverages cutting-edge technologies to create a seamless, intuitive,
                          and immersive spiritual experience.
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
                            <CardDescription className="text-gray-700 dark:text-gray-300">
                              AI Reading Accuracy
                            </CardDescription>
                          </CardHeader>
                        </Card>

                        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                          <CardHeader className="text-center bg-white dark:bg-gray-900">
                            <CardTitle className="text-4xl font-bold text-amber-500">+342%</CardTitle>
                            <CardDescription className="text-gray-700 dark:text-gray-300">
                              User Retention
                            </CardDescription>
                          </CardHeader>
                        </Card>

                        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                          <CardHeader className="text-center bg-white dark:bg-gray-900">
                            <CardTitle className="text-4xl font-bold text-amber-500">+215%</CardTitle>
                            <CardDescription className="text-gray-700 dark:text-gray-300">
                              User Engagement
                            </CardDescription>
                          </CardHeader>
                        </Card>

                        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                          <CardHeader className="text-center bg-white dark:bg-gray-900">
                            <CardTitle className="text-4xl font-bold text-amber-500">98/100</CardTitle>
                            <CardDescription className="text-gray-700 dark:text-gray-300">
                              Lighthouse Score
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="process" className="space-y-6">
                      <div className="prose prose-lg max-w-none dark:prose-invert bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Development Process</h2>
                        <p className="text-gray-800 dark:text-gray-200">
                          The NUMO Oracle System was developed through a collaborative process that combined spiritual
                          expertise with technical innovation.
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
                            Extensive research into ancient numerology, astrology, and mystical traditions to develop
                            the foundational concept of the NUMO Oracle System.
                          </p>
                        </div>

                        <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-600 before:to-amber-500">
                          <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                            2
                          </div>
                          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Oracle Deck Design</h3>
                          <p className="mb-4 text-gray-700 dark:text-gray-300">
                            Creation of the five suits and their corresponding symbolism, drawing from traditional tarot
                            and card game suits while adding unique interpretations.
                          </p>
                        </div>

                        <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-600 before:to-amber-500">
                          <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                            3
                          </div>
                          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">AI Integration</h3>
                          <p className="mb-4 text-gray-700 dark:text-gray-300">
                            Development of the AI-driven oracle using the OpenAI API, training it to provide
                            personalized readings and educational guidance.
                          </p>
                        </div>

                        <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-600 before:to-amber-500">
                          <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
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
                          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                            Beta Testing & Refinement
                          </h3>
                          <p className="mb-4 text-gray-700 dark:text-gray-300">
                            Ongoing beta testing with a community of spiritual practitioners to gather feedback and
                            refine the platform for optimal user experience.
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
                        <p className="text-gray-900 dark:text-white">{project.category}</p>
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

                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-xl font-semibold text-primary-400 mb-3">Project Goals</h3>
                          <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Develop a predictive analytics model.</li>
                            <li>Integrate real-time data streams.</li>
                            <li>Provide actionable insights via a dashboard.</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-primary-400 mb-3">Key Outcomes</h3>
                          <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Improved forecast accuracy by 25%.</li>
                            <li>Reduced operational decision time by 40%.</li>
                            <li>Enhanced user engagement with data.</li>
                          </ul>
                        </div>
                      </div>

                      {project.demoUrl && (
                        <div className="mt-10 text-center">
                          <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
                            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              View Live Demo <ExternalLink size={18} className="ml-2" />
                            </Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <CallToAction
        title="Inspired by this project?"
        description="Let's discuss how LumenHelix Solutions can bring your innovative ideas to life."
        primaryButtonText="Start a Conversation"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore More Services"
        secondaryButtonHref="/services"
      />
    </div>
  )
}
