import { ArrowLeft, ExternalLink, Globe, Calculator, Code, Zap } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import PageHero from "@/components/page-hero"

export default function KraftwerkNumerologyProjectPage() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Client Project"
        badgeVariant="accent"
        title="Kraftwerk Numerology Platform"
        subtitle="A comprehensive numerology platform with advanced calculation tools and mystical insights"
      />

      <div className="container px-4 mx-auto py-12 relative z-10">
        <div className="mb-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 mb-8">
              <img
                src="/images/projects/kraftwerk-numerology.jpg"
                alt="Kraftwerk Numerology Platform"
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Project Overview</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Kraftwerk Numerology represents the pinnacle of digital numerological analysis, combining ancient wisdom
                with cutting-edge computational power. This comprehensive platform provides users with deep insights
                into their numerical patterns, life paths, and spiritual connections through advanced calculation
                algorithms.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The platform features a sophisticated loading system that processes complex numerological calculations
                in real-time, delivering personalized reports and insights that help users understand their cosmic
                connections and life purpose through the power of numbers.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Built with performance optimization in mind, the platform handles intensive calculations while
                maintaining a smooth user experience through progressive loading and intelligent caching systems.
              </p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calculator className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Advanced Calculations</h3>
                    <p className="text-gray-300 text-sm">
                      Complex numerological algorithms for precise life path and destiny number analysis.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Real-time Processing</h3>
                    <p className="text-gray-300 text-sm">
                      Instant calculation results with progressive loading for complex analyses.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">SaaS Architecture</h3>
                    <p className="text-gray-300 text-sm">
                      Scalable cloud-based platform with user accounts and subscription management.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Analytics Dashboard</h3>
                    <p className="text-gray-300 text-sm">
                      Comprehensive reporting and trend analysis for numerological patterns.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Technical Implementation</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                The platform utilizes advanced mathematical libraries and custom algorithms to perform complex
                numerological calculations with high precision. The progressive loading system ensures optimal user
                experience even during intensive computational processes.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Built with scalability in mind, the platform can handle thousands of concurrent calculations while
                maintaining sub-second response times through intelligent load balancing and distributed computing
                architecture.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 text-sm">Category</span>
                  <p className="text-white">Client Project</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Status</span>
                  <Badge className="bg-accent-500 text-white">Deployed</Badge>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Timeline</span>
                  <p className="text-white">8 months</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Technologies</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      React
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      Node.js
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      MongoDB
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      AWS
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  Web Development
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  Numerology
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  SaaS
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  Analytics
                </Badge>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Live Project</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Explore the power of advanced numerological calculations and insights.
              </p>
              <Button asChild className="w-full bg-primary-500 hover:bg-primary-600">
                <Link href="https://kraftwerked.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Kraftwerk
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
