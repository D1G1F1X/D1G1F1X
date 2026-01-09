import { ArrowLeft, ExternalLink, Palette, Brush, Camera, Layout } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import PageHero from "@/components/page-hero"

export default function LolitaWilsonPortfolioProjectPage() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Client Project"
        badgeVariant="secondary"
        title="Lolita Wilson Creative Portfolio"
        subtitle="A sophisticated portfolio website for a creative professional showcasing artistic works and projects"
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
                src="/images/projects/lolita-wilson-portfolio.jpg"
                alt="Lolita Wilson Creative Portfolio"
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Project Overview</h2>
              <p className="text-gray-100 mb-6 leading-relaxed">
                The Lolita Wilson Creative Portfolio represents a sophisticated digital showcase designed to highlight
                the artistic vision and creative works of a talented professional. This project focuses on creating an
                elegant, minimalist platform that allows the artwork to take center stage while providing an intuitive
                user experience.
              </p>
              <p className="text-gray-100 mb-6 leading-relaxed">
                Currently in development, this portfolio website will feature a carefully curated collection of creative
                works, including digital art, photography, design projects, and multimedia presentations. The platform
                is being built with a focus on visual storytelling and artistic presentation.
              </p>
              <p className="text-gray-100 leading-relaxed">
                The design philosophy emphasizes clean lines, thoughtful typography, and strategic use of white space to
                create a gallery-like experience that honors the artistic content while maintaining professional
                presentation standards.
              </p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Planned Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Palette className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Art Gallery</h3>
                    <p className="text-gray-100 text-sm">
                      Curated showcase of artistic works with high-resolution image support.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Camera className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Photography Section</h3>
                    <p className="text-gray-100 text-sm">
                      Dedicated space for photographic works with lightbox viewing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brush className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Creative Process</h3>
                    <p className="text-gray-100 text-sm">
                      Behind-the-scenes content showing artistic development and techniques.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Layout className="w-4 h-4 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Responsive Design</h3>
                    <p className="text-gray-100 text-sm">
                      Optimized viewing experience across all devices and screen sizes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Development Status</h2>
              <p className="text-gray-100 mb-4 leading-relaxed">
                The portfolio is currently in active development, with the core architecture and design system being
                established. The project focuses on creating a platform that truly represents the artist's vision while
                providing visitors with an engaging and memorable experience.
              </p>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
                <h4 className="text-white font-semibold mb-2">Current Progress:</h4>
                <ul className="text-gray-100 text-sm space-y-1">
                  <li>• Design system and visual identity established</li>
                  <li>• Core navigation and layout structure implemented</li>
                  <li>• Image optimization and gallery systems in development</li>
                  <li>• Content management system integration planned</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Technical Approach</h2>
              <p className="text-gray-100 mb-4 leading-relaxed">
                The portfolio is being built with modern web technologies that prioritize performance, accessibility,
                and visual quality. Special attention is being given to image optimization and loading strategies to
                ensure fast load times without compromising visual fidelity.
              </p>
              <p className="text-gray-100 leading-relaxed">
                The platform will feature progressive image loading, smooth animations, and intuitive navigation that
                enhances rather than distracts from the artistic content being showcased.
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
                  <Badge className="bg-primary-500 text-white">Building</Badge>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Timeline</span>
                  <p className="text-white">3 months (estimated)</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Technologies</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      Next.js
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      React
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      Tailwind
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-700">
                      Framer Motion
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  Portfolio
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  Creative
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  Web Development
                </Badge>
                <Badge variant="outline" className="text-gray-300 border-gray-700">
                  Art
                </Badge>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Coming Soon</h3>
              <p className="text-gray-100 mb-4 text-sm">
                This creative portfolio is currently under development and will be available soon.
              </p>
              <Button asChild className="w-full bg-gray-600 hover:bg-gray-700" disabled>
                <span>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Portfolio Coming Soon
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
