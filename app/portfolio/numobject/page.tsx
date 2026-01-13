import { ArrowLeft, ExternalLink, Globe, Palette, Code, Zap } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import PageHero from "@/components/page-hero"

export default function NumObjectProjectPage() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="In-House Project"
        badgeVariant="accent"
        title="NumObject"
        subtitle="Advanced numerology platform leveraging the NUMO Field framework for object-mapping and number correlation"
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
              <img src="/images/projects/numobject.png" alt="NumObject Platform" className="w-full h-96 object-cover" />
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Project Overview</h2>
              <p className="text-gray-100 mb-6 leading-relaxed">
                NumObject represents a breakthrough in numerological computing—an in-house deployed platform that
                harnesses the power of the NUMO Field, a discrete reversible dynamical system operating on ten states
                with toroidal topology. This sophisticated system enables unprecedented correlations between numbers and
                real-world phenomena.
              </p>
              <p className="text-gray-100 mb-6 leading-relaxed">
                Built on foundations of advanced numerological theory, object-mapping algorithms, and emergent cycle
                analysis, NumObject provides researchers, practitioners, and curious minds with an interactive
                environment to explore symbolic frameworks spanning quantum pedagogy to oracle systems.
              </p>
              <p className="text-gray-100 leading-relaxed">
                The platform combines theoretical depth with practical accessibility, featuring interactive 3D
                visualizations, community theory rooms, and tools for generating actionable personal insights through
                the lens of four-layer symbolic systems and reversible operators.
              </p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">NUMO Field Visualization</h3>
                    <p className="text-gray-100 text-sm">
                      Interactive 3D topological network showing ten-state toroidal dynamics with real-time state
                      transitions and emergent patterns.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Object-Mapping Engine</h3>
                    <p className="text-gray-100 text-sm">
                      Proprietary algorithms correlating numerical patterns with physical and conceptual objects across
                      four-layer symbolic frameworks.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Palette className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Community Theory Rooms</h3>
                    <p className="text-gray-100 text-sm">
                      Focused chat spaces for researchers and practitioners to collaborate on numerological
                      investigations and theoretical development.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Reversible Operators</h3>
                    <p className="text-gray-100 text-sm">
                      True inverse operations enabling exploration of emergent cycles and maintaining system coherence
                      across all transformations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Technical Architecture</h2>
              <p className="text-gray-100 mb-4 leading-relaxed">
                NumObject is engineered with a hybrid architecture combining deterministic kernel systems with boundary
                event tracking and reversibility discipline. The platform uses Next.js for the frontend, Three.js for
                toroidal visualization, and a custom VEIL (Virtual Environment Integration Layer) system for the
                interactive 3D engine.
              </p>
              <p className="text-gray-100 leading-relaxed">
                All randomness is seeded for reproducibility, enabling researchers to replay specific theory
                explorations. The system maintains continuous telemetry on operations-per-second, frame time, and error
                states—making the observer itself a first-class diagnostic tool in the product experience.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 text-sm">Category</span>
                  <p className="text-white">In-House Deployed</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Status</span>
                  <Badge className="bg-accent-500 text-white">Completed</Badge>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Timeline</span>
                  <p className="text-white">2024</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Technologies</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      Next.js
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      Three.js
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      React
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      TypeScript
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      WebGL
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  Numerology
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  Object Mapping
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  NUMO Field
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  3D Visualization
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  Research Tool
                </Badge>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Live Project</h3>
              <p className="text-gray-100 mb-4 text-sm">
                Explore the NUMO Field and discover correlations between numbers and real-world phenomena.
              </p>
              <Button asChild className="w-full bg-primary-500 hover:bg-primary-600">
                <Link href="https://numobject.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit NumObject
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
