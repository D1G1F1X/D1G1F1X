import Link from "next/link"
import { ArrowRight, ExternalLink, Calendar, Users, Code, Layers, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageHero from "@/components/page-hero"

export default function KraftwerkedWebsitePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <PageHero
        title="Kraftwerked.com"
        subtitle="A comprehensive digital platform featuring custom branding, interactive web applications, and integrated services for numerology insights and analysis."
        image="/images/projects/kraftwerked-website.png"
        gradient="from-purple-900/80 via-black/50 to-black/80"
        height="md:h-[50vh]"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="tech">Technology</TabsTrigger>
                <TabsTrigger value="process">Process</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="prose prose-lg prose-invert max-w-none">
                  <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
                  <p>
                    Kraftwerked.com represents our most comprehensive in-house project, showcasing the full spectrum of
                    our capabilities across web development, design, and digital strategy. This platform serves as both
                    a functional product and a demonstration of our integrated service approach.
                  </p>
                  <p>
                    The platform features a suite of interactive web applications centered around numerology insights
                    and analysis, wrapped in a sleek, modern interface with custom branding and responsive design. The
                    project employed all of our services, from initial concept and branding to full-stack development
                    and deployment.
                  </p>

                  <h3 className="text-2xl font-bold text-white mt-8 mb-4">Project Goals</h3>
                  <ul className="space-y-2">
                    <li>Create a comprehensive digital platform with multiple integrated web applications</li>
                    <li>Develop a distinctive brand identity that conveys both modernity and mysticism</li>
                    <li>Build a scalable architecture that supports future expansion</li>
                    <li>Optimize for performance across all devices and connection speeds</li>
                    <li>Implement robust security measures for user data protection</li>
                    <li>Showcase our full-service capabilities in a single cohesive project</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-8">
                <div className="prose prose-lg prose-invert max-w-none">
                  <h2 className="text-3xl font-bold text-white mb-6">Key Features</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <Layers className="h-10 w-10 text-purple-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Suite of Web Applications</h3>
                        <p className="text-gray-300">
                          Multiple interactive tools for numerology analysis, including personality profiles,
                          compatibility tests, and forecast calculators.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <Code className="h-10 w-10 text-purple-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Advanced Algorithms</h3>
                        <p className="text-gray-300">
                          Proprietary calculation systems that process complex numerological formulas with high accuracy
                          and performance.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <Users className="h-10 w-10 text-purple-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">User Accounts & Profiles</h3>
                        <p className="text-gray-300">
                          Secure authentication system with personalized dashboards, saved results, and preference
                          settings.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <Zap className="h-10 w-10 text-purple-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Optimized Performance</h3>
                        <p className="text-gray-300">
                          Lightning-fast load times with advanced caching strategies and optimized assets for minimal
                          bandwidth usage.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="text-2xl font-bold text-white mt-10 mb-4">Design Elements</h3>
                  <p>
                    The platform features a distinctive dark-themed interface with cosmic-inspired elements, creating an
                    immersive experience that aligns with the mystical nature of numerology. Custom animations and
                    transitions enhance the user journey, while the responsive design ensures a seamless experience
                    across all devices.
                  </p>

                  <div className="mt-8 p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
                    <h4 className="text-xl font-bold text-white mb-4">Brand Identity</h4>
                    <p className="mb-4">
                      The Kraftwerk Numerology brand identity combines geometric precision with cosmic elements,
                      featuring:
                    </p>
                    <ul>
                      <li>Custom logotype with distinctive angular letterforms</li>
                      <li>Cosmic-inspired color palette with purples, deep blues, and accents of bright energy</li>
                      <li>Sacred geometry patterns integrated throughout the interface</li>
                      <li>Custom iconography system for numerological concepts</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tech" className="space-y-6">
                <div className="prose prose-lg prose-invert max-w-none">
                  <h2 className="text-3xl font-bold text-white mb-6">Technology Stack</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Frontend</h3>
                      <ul className="space-y-2">
                        <li>
                          <span className="font-semibold text-purple-400">Framework:</span> Next.js 14
                        </li>
                        <li>
                          <span className="font-semibold text-purple-400">Language:</span> TypeScript
                        </li>
                        <li>
                          <span className="font-semibold text-purple-400">Styling:</span> Tailwind CSS with custom
                          animations
                        </li>
                        <li>
                          <span className="font-semibold text-purple-400">State Management:</span> React Context API &
                          Zustand
                        </li>
                        <li>
                          <span className="font-semibold text-purple-400">Data Fetching:</span> React Query with SWR
                        </li>
                        <li>
                          <span className="font-semibold text-purple-400">Animations:</span> Framer Motion
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Backend</h3>
                      <ul className="space-y-2">
                        <li>
                          <span className="font-semibold text-purple-400">API:</span> Next.js API Routes & tRPC
                        </li>
                        <li>
                          <span className="font-semibold text-purple-400">Database:</span> PostgreSQL with Prisma ORM
                        </li>
                        <li>
                          <span className="font-semibold text-purple-400">Authentication:</span> NextAuth.js with JWT
                        </li>
                        <li>
                          <span className="font-semibold text-purple-400">Caching:</span> Redis for performance
                          optimization
                        </li>
                        <li>
                          <span className="font-semibold text-purple-400">Serverless Functions:</span> Vercel Edge
                          Functions
                        </li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mt-10 mb-4">Infrastructure & DevOps</h3>
                  <ul className="space-y-2">
                    <li>
                      <span className="font-semibold text-purple-400">Hosting:</span> Vercel for frontend, AWS for
                      specialized services
                    </li>
                    <li>
                      <span className="font-semibold text-purple-400">CI/CD:</span> GitHub Actions with automated
                      testing
                    </li>
                    <li>
                      <span className="font-semibold text-purple-400">Monitoring:</span> Datadog for performance and
                      error tracking
                    </li>
                    <li>
                      <span className="font-semibold text-purple-400">Security:</span> OWASP compliance, regular
                      penetration testing
                    </li>
                    <li>
                      <span className="font-semibold text-purple-400">CDN:</span> Cloudflare for global content delivery
                    </li>
                  </ul>

                  <div className="mt-10 p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
                    <h4 className="text-xl font-bold text-white mb-4">Performance Metrics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">98/100</div>
                        <div className="text-sm text-gray-400 mt-1">Lighthouse Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">&lt;1.2s</div>
                        <div className="text-sm text-gray-400 mt-1">Load Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">99.9%</div>
                        <div className="text-sm text-gray-400 mt-1">Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">A+</div>
                        <div className="text-sm text-gray-400 mt-1">Security Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="process" className="space-y-6">
                <div className="prose prose-lg prose-invert max-w-none">
                  <h2 className="text-3xl font-bold text-white mb-6">Development Process</h2>

                  <p>
                    The Kraftwerked.com project followed our comprehensive development methodology, integrating all of
                    our service areas into a cohesive process. The project spanned 5 months from concept to launch, with
                    ongoing optimization and feature expansion.
                  </p>

                  <div className="relative mt-10 pl-8 border-l-2 border-purple-500/50 space-y-10">
                    <div className="relative">
                      <div className="absolute -left-[41px] w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Discovery & Strategy</h3>
                      <p className="text-gray-300">
                        Comprehensive research into numerology platforms, target audience analysis, and competitive
                        landscape. Development of project scope, objectives, and success metrics.
                      </p>
                      <div className="text-sm text-gray-400 mt-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" /> 3 weeks
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[41px] w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Brand Development</h3>
                      <p className="text-gray-300">
                        Creation of brand identity, including logo design, color palette, typography system, and visual
                        language. Development of brand guidelines and asset library.
                      </p>
                      <div className="text-sm text-gray-400 mt-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" /> 4 weeks
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[41px] w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">UX/UI Design</h3>
                      <p className="text-gray-300">
                        User flow mapping, wireframing, and interactive prototyping. Development of comprehensive UI
                        component system and responsive layouts.
                      </p>
                      <div className="text-sm text-gray-400 mt-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" /> 5 weeks
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[41px] w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Architecture & Planning</h3>
                      <p className="text-gray-300">
                        Technical architecture design, database schema development, and API planning. Selection of
                        technology stack and infrastructure setup.
                      </p>
                      <div className="text-sm text-gray-400 mt-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" /> 3 weeks
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[41px] w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-xs font-bold">5</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Development</h3>
                      <p className="text-gray-300">
                        Frontend and backend development with regular sprint reviews and iterative improvements.
                        Implementation of core features and integration of services.
                      </p>
                      <div className="text-sm text-gray-400 mt-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" /> 8 weeks
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[41px] w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-xs font-bold">6</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Testing & Optimization</h3>
                      <p className="text-gray-300">
                        Comprehensive testing across devices and browsers, performance optimization, security auditing,
                        and accessibility compliance.
                      </p>
                      <div className="text-sm text-gray-400 mt-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" /> 3 weeks
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[41px] w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-xs font-bold">7</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Launch & Deployment</h3>
                      <p className="text-gray-300">
                        Staged deployment with monitoring and final adjustments. Implementation of analytics and
                        tracking systems.
                      </p>
                      <div className="text-sm text-gray-400 mt-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" /> 2 weeks
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden aspect-video">
                  <img
                    src="/images/projects/kraftwerked-website.png"
                    alt="Kraftwerked.com homepage"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden aspect-video">
                  <img
                    src="/images/projects/kraftwerked-loading.png"
                    alt="Kraftwerked.com loading screen"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/case-studies/kraftwerked"
                className="inline-flex items-center text-purple-400 font-semibold hover:text-purple-300 transition-colors"
              >
                View detailed case study
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">Project Details</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Category</h4>
                  <p className="text-white">In-House Project</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400">Status</h4>
                  <Badge className="bg-accent-500 text-white mt-1">Deployed</Badge>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400">Timeline</h4>
                  <p className="text-white">5 months</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400">Services</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
                      Web Development
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
                      Logo Design
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
                      Web Applications
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
                      Branding
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
                      Full-Stack
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400">Technologies</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
                      Next.js
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
                      TypeScript
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
                      PostgreSQL
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
                      Tailwind CSS
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
                      Vercel
                    </Badge>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href="https://www.kraftwerked.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
                  >
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-transparent border border-purple-600 hover:bg-purple-600/10 text-purple-400 font-medium rounded-md transition-colors"
                  >
                    Discuss a Similar Project
                  </Link>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800">
                <h4 className="text-sm font-medium text-gray-400 mb-4">Key Metrics</h4>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">User Engagement</span>
                    <span className="text-green-400 font-medium">+287%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Load Time</span>
                    <span className="text-green-400 font-medium">&lt;1.2s</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Conversion Rate</span>
                    <span className="text-green-400 font-medium">+156%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Uptime</span>
                    <span className="text-green-400 font-medium">99.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
