import { ArrowLeft, ExternalLink, Globe, Palette, Code, Zap } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import PageHero from "@/components/page-hero"

export default function NumOracleProjectPage() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Client Project"
        badgeVariant="accent"
        title="NUMO Oracle Card Platform"
        subtitle="A mystical numerology platform featuring oracle card readings and ancient wisdom tools"
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
                src="/images/projects/numoracle-oracle-cards.jpg"
                alt="NUMO Oracle Card Platform"
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Project Overview</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The NUMO Oracle Card Platform represents a unique fusion of ancient numerological wisdom and modern web
                technology. This mystical platform provides users with personalized oracle card readings, numerology
                calculations, and spiritual guidance tools through an intuitive and visually stunning interface.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Built with a focus on user experience and spiritual authenticity, the platform features custom-designed
                oracle cards, interactive reading sessions, and comprehensive numerology tools that help users discover
                insights about their life path, relationships, and spiritual journey.
              </p>
              <p className="text-gray-300 leading-relaxed">
                The dark, mystical design aesthetic creates an immersive atmosphere that enhances the spiritual
                experience while maintaining modern usability standards and responsive design principles.
              </p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Palette className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Custom Oracle Cards</h3>
                    <p className="text-gray-300 text-sm">
                      Beautifully designed oracle cards with mystical symbols and numerological significance.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Interactive Readings</h3>
                    <p className="text-gray-300 text-sm">
                      Dynamic card selection and reading experiences with personalized interpretations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Numerology Tools</h3>
                    <p className="text-gray-300 text-sm">
                      Comprehensive calculation tools for life path numbers, compatibility, and more.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Responsive Design</h3>
                    <p className="text-gray-300 text-sm">
                      Optimized for all devices with smooth animations and intuitive navigation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Technical Implementation</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                The platform was built using modern web technologies with a focus on performance and user experience.
                The mystical design elements were carefully crafted to create an authentic spiritual atmosphere while
                maintaining accessibility and usability standards.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Special attention was given to the card animation systems, random selection algorithms, and the
                integration of numerological calculation engines to provide accurate and meaningful readings for users.
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
                  <p className="text-white">6 months</p>
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
                      CSS3
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      JavaScript
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
                  Oracle Tools
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  UI/UX
                </Badge>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Live Project</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Experience the mystical world of numerology and oracle card readings.
              </p>
              <Button asChild className="w-full bg-primary-500 hover:bg-primary-600">
                <Link href="https://numoracle.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit NUMO Oracle
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
