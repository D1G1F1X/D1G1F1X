import Link from "next/link"
import { ArrowLeft, ExternalLink, Code, Palette, Zap, Globe, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageHero from "@/components/page-hero"

export default function KraftwerkedProjectPage() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Client Project"
        badgeVariant="accent"
        title="Kraftwerked.com"
        subtitle="Numerology platform combining ancient wisdom with modern AI technology"
      />

      <div className="container px-4 mx-auto py-12 relative z-10">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-gray-700/50 mb-8">
              <div className="relative">
                <img
                  src="/images/projects/kraftwerked-website.png"
                  alt="Kraftwerked.com Preview"
                  className="w-full h-auto"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary-500 text-white">Deployed</Badge>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-gray-700/50 mb-8">
              <div className="relative">
                <img
                  src="/images/projects/kraftwerked-loading.png"
                  alt="Kraftwerked.com Loading Screen"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md p-6 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
              <p className="text-gray-300 mb-6">
                Kraftwerked.com is a sophisticated numerology platform that combines ancient wisdom with modern AI
                technology. The project features a mystical cosmic interface, interactive numerology tools, and
                personalized insights powered by advanced algorithms.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline" className="border-primary-500/50 text-primary-400">
                  Web Development
                </Badge>
                <Badge variant="outline" className="border-primary-500/50 text-primary-400">
                  UI/UX Design
                </Badge>
                <Badge variant="outline" className="border-primary-500/50 text-primary-400">
                  AI Integration
                </Badge>
                <Badge variant="outline" className="border-primary-500/50 text-primary-400">
                  Numerology
                </Badge>
                <Badge variant="outline" className="border-primary-500/50 text-primary-400">
                  Interactive Tools
                </Badge>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <Palette className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Cosmic interface with mystical numerology symbols</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>AI-powered numerology calculations and interpretations</span>
                  </li>
                  <li className="flex items-start">
                    <Globe className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Interactive tools for personal numerology exploration</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Personalized insights and life path guidance</span>
                  </li>
                  <li className="flex items-start">
                    <Code className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span>Advanced algorithms for accurate numerological analysis</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-center">
                <a
                  href="https://kraftwerked.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Button className="bg-accent-500 hover:bg-accent-600 text-white">
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400">CLIENT</h4>
                  <p className="text-white">Kraftwerked Numerology</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">CATEGORY</h4>
                  <p className="text-white">Client Project</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">STATUS</h4>
                  <p className="text-white">Deployed</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">SERVICES</h4>
                  <p className="text-white">Web Development, UI/UX Design, AI Integration</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">TECHNOLOGIES</h4>
                  <p className="text-white">React, Next.js, TailwindCSS, AI APIs</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Design Approach</h3>
              <p className="text-gray-300 mb-4">
                The design for Kraftwerked.com draws inspiration from cosmic imagery, sacred geometry, and ancient
                numerological symbols. The dark theme with glowing accents creates a mystical atmosphere that enhances
                the user's experience of exploring numerological insights.
              </p>
              <p className="text-gray-300">
                The interface balances esoteric elements with modern usability principles, making complex numerological
                concepts accessible to users of all experience levels. Interactive elements respond with subtle
                animations that reinforce the magical quality of the numerology experience.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md p-6 border border-gray-700/50 mb-12">
          <Tabs defaultValue="implementation">
            <TabsList className="bg-gray-900/50 border border-gray-700/50 mb-6">
              <TabsTrigger value="implementation">Technical Implementation</TabsTrigger>
              <TabsTrigger value="process">Design Process</TabsTrigger>
              <TabsTrigger value="challenges">Challenges & Solutions</TabsTrigger>
            </TabsList>
            <TabsContent value="implementation" className="text-gray-300 space-y-4">
              <p>
                Kraftwerked.com is built using Next.js and React, providing a fast, responsive user experience with
                server-side rendering capabilities. The site features:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Custom numerology calculation engine with advanced algorithms</li>
                <li>Integration with AI APIs for personalized interpretations</li>
                <li>Interactive SVG animations for cosmic interface elements</li>
                <li>Progressive Web App capabilities for offline access</li>
                <li>Responsive design optimized for all device sizes</li>
                <li>Dark mode with cosmic theme and glowing UI elements</li>
              </ul>
              <p>
                The application is deployed on Vercel for optimal performance and reliability, with continuous
                integration ensuring seamless updates as new features are developed.
              </p>
            </TabsContent>
            <TabsContent value="process" className="text-gray-300 space-y-4">
              <p>
                The design process for Kraftwerked.com began with extensive research into numerology principles,
                symbolism, and user expectations. Key steps included:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Research into ancient numerological systems and modern interpretations</li>
                <li>Mood boarding and visual exploration of cosmic and mystical themes</li>
                <li>Wireframing and prototyping of key user interfaces</li>
                <li>User flow mapping for intuitive numerological exploration</li>
                <li>Color palette selection emphasizing mystery and cosmic energy</li>
              </ul>
              <p>
                Multiple design iterations were created based on user testing and client feedback, resulting in a final
                design that perfectly balances mystical aesthetics with practical usability.
              </p>
            </TabsContent>
            <TabsContent value="challenges" className="text-gray-300 space-y-4">
              <p>
                During the development of Kraftwerked.com, several challenges were addressed with innovative solutions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Challenge:</strong> Creating accurate numerology algorithms
                  <br />
                  <strong>Solution:</strong> Collaboration with numerology experts to develop and validate calculation
                  methods
                </li>
                <li>
                  <strong>Challenge:</strong> Balancing mystical aesthetics with usability
                  <br />
                  <strong>Solution:</strong> Iterative design process with user testing to ensure intuitive navigation
                </li>
                <li>
                  <strong>Challenge:</strong> Generating personalized interpretations at scale
                  <br />
                  <strong>Solution:</strong> Implementation of AI APIs with custom prompts tailored to numerological
                  contexts
                </li>
              </ul>
              <p>
                These solutions not only addressed immediate challenges but also created a scalable foundation for
                future feature additions and content expansion.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Interested in a similar project?</h2>
          <Link href="/contact">
            <Button className="bg-primary-500 hover:bg-primary-600 text-white">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
