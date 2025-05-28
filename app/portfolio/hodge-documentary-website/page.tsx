import Link from "next/link"
import { ArrowLeft, ExternalLink, Play, Users, Award, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ImageWithFallback from "@/components/image-with-fallback"

export default function HodgeDocumentaryWebsitePage() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/10 to-accent-500/20"></div>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="techGridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <pattern id="techGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#techGridGradient)" strokeWidth="1" opacity="0.5" />
            <circle cx="0" cy="0" r="1" fill="#3B82F6" opacity="0.8" />
            <circle cx="60" cy="60" r="1" fill="#8B5CF6" opacity="0.8" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#techGrid)" />
        </svg>
      </div>

      <div className="container px-4 mx-auto py-8 relative z-10">
        {/* Back button */}
        <Link
          href="/portfolio"
          className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Link>

        {/* Project header */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 mb-6">
            <Badge className="bg-accent-600 text-white">Client Project</Badge>
            <Badge className="bg-accent-500 text-white">Deployed</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">The Hodge Documentary Website</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            A compelling documentary film website showcasing Cleveland artists and their impact on social change through
            artistic platforms, featuring video integration and immersive storytelling.
          </p>
        </div>

        {/* Project image */}
        <div className="mb-12">
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="/images/projects/hodge-documentary.png"
              alt="The Hodge Documentary Website"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
          </div>
        </div>

        {/* Project details grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
              <p className="text-gray-300 mb-6">
                The Hodge Documentary website serves as a powerful digital platform for a documentary film that tells
                the story of Cleveland artists stimulating change through their artistic platforms. The site exposes
                injustices and uncovers stories of gentrification, systemic racism, and institutional borders
                segregating Cleveland.
              </p>
              <p className="text-gray-300 mb-6">
                Our team developed a visually striking website that captures the essence of the documentary while
                providing an engaging user experience. The site features integrated video content, compelling
                storytelling, and a design that reflects the artistic and social impact themes of the documentary.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-primary-600 hover:bg-primary-700">
                  <Link href="https://www.hodgedoc.com/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Live Site
                  </Link>
                </Button>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Play className="h-6 w-6 text-primary-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Video Integration</h3>
                    <p className="text-gray-300 text-sm">
                      Seamless YouTube video integration for documentary trailers and promotional content.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-secondary-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Artist Showcase</h3>
                    <p className="text-gray-300 text-sm">
                      Dedicated sections highlighting Cleveland artists and their contributions to social change.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="h-6 w-6 text-accent-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Impact Stories</h3>
                    <p className="text-gray-300 text-sm">
                      Compelling narratives about gentrification, systemic racism, and community segregation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="h-6 w-6 text-primary-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Responsive Design</h3>
                    <p className="text-gray-300 text-sm">
                      Fully responsive design ensuring optimal viewing across all devices and screen sizes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">Technical Implementation</h2>
              <p className="text-gray-300 mb-4">
                The website was built with a focus on performance, accessibility, and user engagement. Key technical
                aspects include:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Modern responsive web design with mobile-first approach</li>
                <li>Optimized video embedding and streaming capabilities</li>
                <li>SEO optimization for documentary film promotion</li>
                <li>Fast loading times and smooth user interactions</li>
                <li>Cross-browser compatibility and accessibility standards</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Client:</span>
                  <p className="text-white">The Hodge Documentary</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Industry:</span>
                  <p className="text-white">Film & Documentary</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Project Type:</span>
                  <p className="text-white">Website Development</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Status:</span>
                  <p className="text-white">Live & Deployed</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {["HTML5", "CSS3", "JavaScript", "Responsive Design", "Video Integration", "SEO Optimization"].map(
                  (tech) => (
                    <Badge key={tech} variant="outline" className="text-gray-300 border-gray-600">
                      {tech}
                    </Badge>
                  ),
                )}
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Project Impact</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-400">100%</div>
                  <div className="text-sm text-gray-400">Mobile Responsive</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-400">Social</div>
                  <div className="text-sm text-gray-400">Impact Focus</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-400">Live</div>
                  <div className="text-sm text-gray-400">Production Site</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-primary-600/20 to-secondary-600/20 p-8 rounded-lg border border-primary-500/30 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Create Your Digital Presence?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Let us help you build a compelling website that tells your story and engages your audience effectively.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700">
              <Link href="/contact">Start Your Project</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Link href="/portfolio">View More Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
