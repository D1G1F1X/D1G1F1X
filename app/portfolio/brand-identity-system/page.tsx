import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "@/components/image-with-fallback"

export default function ProjectPage() {
  const project = {
    id: "brand-identity-system",
    title: "Brand Identity System",
    description: "A complete brand identity system for a tech startup in the healthcare space.",
    image: "/images/projects/brand-identity-system.png",
    category: "client",
    stage: "deployed",
    tags: ["Graphic Design", "Branding", "Healthcare"],
    client: "MediTech Innovations",
    duration: "4 months",
    year: "2023",
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 relative overflow-hidden">
      {/* Digital circuit pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="projectGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <pattern id="project-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M25,0 L25,100 M0,25 L100,25 M75,0 L75,100 M0,75 L100,75"
              stroke="url(#projectGradient)"
              strokeWidth="0.5"
              fill="none"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#project-pattern)" />
        </svg>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-12 relative z-10">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-secondary-400 font-medium mb-8 hover:text-secondary-300 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to portfolio
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="bg-accent-600 text-white">
              {project.category === "in-house" ? "In-House" : "Client"}
            </Badge>
            <Badge className="bg-accent-500 text-white">
              {project.stage.charAt(0).toUpperCase() + project.stage.slice(1)}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{project.title}</h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">{project.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/80 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">Client</h3>
              <p className="text-gray-300">{project.client}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">Duration</h3>
              <p className="text-gray-300">{project.duration}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">Year</h3>
              <p className="text-gray-300">{project.year}</p>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative rounded-xl overflow-hidden mb-16 border border-gray-700/50 shadow-xl">
            <ImageWithFallback
              src={project.image || "/placeholder.svg"}
              fallbackSrc={`/placeholder.svg?height=500&width=1000&text=${encodeURIComponent(project.title)}`}
              alt={project.title}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30"></div>
          </div>

          {/* Project details */}
          <div className="prose prose-lg max-w-none prose-invert mb-16">
            <h2>Project Overview</h2>
            <p>
              The Brand Identity System for MediTech Innovations represents a comprehensive visual and messaging
              framework designed to position this healthcare technology startup for success in a competitive market.
              This project encompassed the full spectrum of brand identity elements, from logo design and visual
              language to voice guidelines and application templates.
            </p>

            <p>
              Our challenge was to create a brand that communicated technical innovation and medical expertise while
              remaining approachable and trustworthy—essential qualities for a company developing patient-facing
              healthcare technology.
            </p>

            <h2>Key Components</h2>

            <h3>Brand Strategy & Positioning</h3>
            <p>
              Before designing any visual elements, we conducted extensive research and strategy work to establish a
              solid foundation:
            </p>
            <ul>
              <li>Competitive analysis of the healthcare technology landscape</li>
              <li>Stakeholder interviews with founders, investors, and potential users</li>
              <li>Brand positioning workshop to define core values and differentiators</li>
              <li>Development of brand personality, voice, and messaging architecture</li>
            </ul>

            <h3>Visual Identity System</h3>
            <p>
              The visual identity was crafted to balance innovation with accessibility, using elements that convey both
              technological advancement and human-centered care:
            </p>
            <ul>
              <li>
                Primary logo featuring a distinctive symbol that combines a medical cross with a digital circuit motif
              </li>
              <li>Secondary and responsive logo variations for different applications and size requirements</li>
              <li>
                Custom color palette balancing clinical blues with warm accent colors to convey both professionalism and
                approachability
              </li>
              <li>
                Typography system pairing a geometric sans-serif for headlines with a highly readable serif for body
                text
              </li>
              <li>Custom iconography set for consistent visual communication across platforms</li>
            </ul>

            <h3>Brand Guidelines</h3>
            <p>
              To ensure consistent application of the brand across all touchpoints, we developed comprehensive
              guidelines:
            </p>
            <ul>
              <li>Detailed usage specifications for all visual elements</li>
              <li>Voice and tone guidelines with writing examples for different contexts</li>
              <li>Photography style guide emphasizing authentic human moments in healthcare settings</li>
              <li>Data visualization standards for presenting complex medical information</li>
              <li>Accessibility considerations to ensure inclusive brand experiences</li>
            </ul>

            <h3>Application Suite</h3>
            <p>
              We created a suite of branded templates and applications to help MediTech Innovations launch with a
              cohesive presence:
            </p>
            <ul>
              <li>Stationery system including business cards, letterhead, and envelopes</li>
              <li>Digital templates for presentations, email signatures, and social media</li>
              <li>Product interface design guidelines to ensure brand consistency in their applications</li>
              <li>Environmental design concepts for office space and trade show presence</li>
              <li>Marketing collateral templates for various customer journeys</li>
            </ul>

            <h2>Design Process</h2>
            <p>Our approach to creating this brand identity system followed a collaborative, iterative process:</p>
            <ol>
              <li>
                <strong>Discovery:</strong> Immersive research into the healthcare technology sector, the client's
                vision, and end-user needs
              </li>
              <li>
                <strong>Strategy:</strong> Development of brand positioning, personality, and messaging framework
              </li>
              <li>
                <strong>Concept Development:</strong> Creation of multiple creative directions based on strategic
                foundations
              </li>
              <li>
                <strong>Refinement:</strong> Iterative design process with client feedback and user testing
              </li>
              <li>
                <strong>System Building:</strong> Expansion of the chosen direction into a comprehensive identity system
              </li>
              <li>
                <strong>Documentation:</strong> Creation of detailed brand guidelines and asset library
              </li>
              <li>
                <strong>Implementation:</strong> Development of templates and training for the client team
              </li>
            </ol>

            <h2>Results and Impact</h2>
            <p>The brand identity system has delivered significant value for MediTech Innovations:</p>
            <ul>
              <li>Successfully secured Series A funding with investors citing brand clarity as a factor</li>
              <li>95% positive feedback from user testing on brand perception</li>
              <li>Increased media coverage with consistent visual representation across channels</li>
              <li>Streamlined marketing production with templated design system</li>
              <li>Cohesive product experience from marketing to application interfaces</li>
            </ul>
          </div>

          {/* Key technologies and tools */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Design Tools & Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Adobe Creative Suite",
                "Figma",
                "Sketch",
                "InVision",
                "Typography.io",
                "Brandpad",
                "Principle",
                "Miro",
                "Pantone",
                "Frontify",
              ].map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-gray-300 border-gray-700 bg-gray-800/50 hover:border-secondary-500/30 transition-colors px-3 py-1"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Project gallery */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["Logo Design", "Color System", "Typography", "Brand Applications"].map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300 group"
                >
                  <ImageWithFallback
                    src={`/placeholder_image.png?height=300&width=500&text=${encodeURIComponent(item)}`}
                    fallbackSrc={`/placeholder.svg?height=300&width=500&text=${encodeURIComponent(item)}`}
                    alt={item}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Client Testimonials</h2>
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
              <p className="text-gray-300 italic mb-4">
                "Working with Lumen Helix on our brand identity was transformative for MediTech Innovations. They took
                the time to truly understand our vision, our technology, and our market. The resulting brand system
                perfectly captures our dual focus on cutting-edge technology and compassionate healthcare. The
                comprehensive guidelines and templates have made it easy for our team to maintain brand consistency as
                we grow, and we've received countless compliments on our professional appearance from investors,
                partners, and customers."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary-500/20 rounded-full flex items-center justify-center border border-secondary-500/30 mr-4">
                  <span className="text-secondary-400 font-bold">DK</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Dr. Katherine Chen</p>
                  <p className="text-gray-400">CEO & Co-founder, MediTech Innovations</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="bg-gradient-to-r from-secondary-900/70 to-primary-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Need a Brand Identity System?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover how our branding expertise can help establish a distinctive and cohesive identity for your
              organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white">
                <Link href="/#contact">Request a Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                <Link href="/services/graphic-design">Learn About Our Graphic Design Services</Link>
              </Button>
            </div>
          </div>

          {/* Related projects */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 group">
                <div className="h-48 bg-gray-900/80 relative">
                  <ImageWithFallback
                    src="/images/projects/digital-marketing-campaign.png"
                    fallbackSrc="/placeholder.svg?height=200&width=300&text=Digital%20Marketing%20Campaign"
                    alt="Digital Marketing Campaign"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    Digital Marketing Campaign
                  </h3>
                  <Link
                    href="/portfolio/digital-marketing-campaign"
                    className="inline-flex items-center text-primary-400 font-medium group-hover:text-primary-300 transition-colors"
                  >
                    View project
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Link>
                </div>
              </div>

              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300 group">
                <div className="h-48 bg-gray-900/80 relative">
                  <ImageWithFallback
                    src="/images/projects/healthcare-app.png"
                    fallbackSrc="/placeholder.svg?height=200&width=300&text=Healthcare%20Mobile%20App"
                    alt="Healthcare Mobile App"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-secondary-400 transition-colors">
                    Healthcare Mobile App
                  </h3>
                  <Link
                    href="/portfolio/healthcare-app"
                    className="inline-flex items-center text-secondary-400 font-medium group-hover:text-secondary-300 transition-colors"
                  >
                    View project
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Link>
                </div>
              </div>

              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300 group">
                <div className="h-48 bg-gray-900/80 relative">
                  <ImageWithFallback
                    src="/images/projects/e-commerce-platform.png"
                    fallbackSrc="/placeholder.svg?height=200&width=300&text=E-Commerce%20Platform"
                    alt="E-Commerce Platform"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                    E-Commerce Platform
                  </h3>
                  <Link
                    href="/portfolio/e-commerce-platform"
                    className="inline-flex items-center text-accent-400 font-medium group-hover:text-accent-300 transition-colors"
                  >
                    View project
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
