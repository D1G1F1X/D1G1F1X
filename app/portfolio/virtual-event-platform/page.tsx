import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "@/components/image-with-fallback"

export default function ProjectPage() {
  const project = {
    id: "virtual-event-platform",
    title: "Virtual Event Platform",
    description: "A comprehensive platform for hosting engaging virtual events and conferences.",
    image: "/images/projects/virtual-event-platform.png",
    category: "client",
    stage: "deployed",
    tags: ["Web Development", "Real-time", "Events"],
    client: "Global Events Association",
    duration: "9 months",
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
      <div className="absolute top-40 left-20 w-96 h-96 bg-accent-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

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
              The Virtual Event Platform is a comprehensive solution designed to transform traditional in-person
              conferences and events into engaging digital experiences. Developed for the Global Events Association,
              this platform addresses the challenges of hosting large-scale virtual gatherings while maintaining the
              networking, learning, and interactive elements that make physical events valuable.
            </p>

            <p>
              This system represents our expertise in real-time web applications, user experience design, and scalable
              architecture, delivering a solution that has redefined how organizations approach virtual events.
            </p>

            <h2>Key Features</h2>

            <h3>Immersive Virtual Venues</h3>
            <p>
              The platform offers customizable virtual environments that mimic physical event spaces, providing
              attendees with:
            </p>
            <ul>
              <li>3D navigable conference halls with customizable branding</li>
              <li>Multiple concurrent session rooms with capacity management</li>
              <li>Exhibition halls with interactive vendor booths</li>
              <li>Networking lounges with spatial audio for natural conversations</li>
            </ul>

            <h3>Interactive Session Management</h3>
            <p>Beyond simple video streaming, the platform enables truly interactive presentations and workshops:</p>
            <ul>
              <li>Multi-presenter capabilities with seamless handoffs</li>
              <li>Live polling, Q&A, and audience feedback tools</li>
              <li>Breakout room functionality for small group discussions</li>
              <li>Session recordings with smart indexing for on-demand access</li>
            </ul>

            <h3>Networking and Engagement Tools</h3>
            <p>
              The platform recreates the valuable networking aspects of physical events through innovative digital
              solutions:
            </p>
            <ul>
              <li>AI-powered attendee matching based on interests and goals</li>
              <li>Virtual business card exchange with CRM integration</li>
              <li>Scheduled and spontaneous 1:1 video meetings</li>
              <li>Interactive social events and gamification elements</li>
            </ul>

            <h3>Comprehensive Analytics</h3>
            <p>The platform provides detailed insights that surpass what's possible at physical events:</p>
            <ul>
              <li>Attendee engagement metrics across all platform areas</li>
              <li>Session popularity and attention analytics</li>
              <li>Exhibitor booth traffic and interaction data</li>
              <li>Post-event ROI analysis and reporting</li>
            </ul>

            <h2>Technical Implementation</h2>
            <p>
              The Virtual Event Platform was built using cutting-edge technologies to ensure reliability, scalability,
              and an engaging user experience:
            </p>
            <ul>
              <li>WebRTC for low-latency video and audio communication</li>
              <li>React and Three.js for immersive 3D environments</li>
              <li>Node.js and Socket.io for real-time interactions</li>
              <li>PostgreSQL and Redis for data management and caching</li>
              <li>AWS infrastructure with auto-scaling for handling thousands of concurrent users</li>
              <li>WebGL for hardware-accelerated graphics rendering</li>
              <li>Progressive Web App (PWA) architecture for cross-device compatibility</li>
            </ul>

            <h2>Results and Impact</h2>
            <p>
              The Virtual Event Platform has transformed how the Global Events Association and its members approach
              digital gatherings:
            </p>
            <ul>
              <li>Successfully hosted events with up to 25,000 concurrent attendees</li>
              <li>85% of attendees rated the experience as "excellent" or "very good"</li>
              <li>40% increase in international participation compared to physical events</li>
              <li>60% reduction in overall event costs while maintaining revenue</li>
              <li>30% higher engagement metrics compared to other virtual event solutions</li>
            </ul>
          </div>

          {/* Key technologies */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "Three.js",
                "WebRTC",
                "Node.js",
                "Socket.io",
                "PostgreSQL",
                "Redis",
                "AWS",
                "WebGL",
                "Docker",
              ].map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-gray-300 border-gray-700 bg-gray-800/50 hover:border-accent-500/30 transition-colors px-3 py-1"
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
              {["Main Lobby", "Session Room", "Networking Lounge", "Exhibition Hall"].map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300 group"
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
                "The Virtual Event Platform developed by Lumen Helix has completely transformed how we approach our
                annual conference series. Not only were we able to maintain our event schedule during global
                disruptions, but we've actually expanded our reach and engagement beyond what was possible with physical
                events alone. The platform's immersive environments and networking capabilities received overwhelmingly
                positive feedback from both attendees and sponsors."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent-500/20 rounded-full flex items-center justify-center border border-accent-500/30 mr-4">
                  <span className="text-accent-400 font-bold">JR</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Jennifer Rodriguez</p>
                  <p className="text-gray-400">Events Director, Global Events Association</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="bg-gradient-to-r from-accent-900/70 to-secondary-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Need a Virtual Event Solution?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover how our Virtual Event Platform can transform your conferences, trade shows, and corporate events
              into engaging digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent-500 hover:bg-accent-600 text-white">
                <Link href="/#contact">Request a Demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                <Link href="/services/web-development">Learn About Our Web Development Services</Link>
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
                    src="/images/projects/e-commerce-platform.png"
                    fallbackSrc="/placeholder.svg?height=200&width=300&text=E-Commerce%20Platform"
                    alt="E-Commerce Platform"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    E-Commerce Platform
                  </h3>
                  <Link
                    href="/portfolio/e-commerce-platform"
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
                    src="/images/projects/data-visualization-dashboard.png"
                    fallbackSrc="/placeholder.svg?height=200&width=300&text=Data%20Visualization%20Dashboard"
                    alt="Data Visualization Dashboard"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-secondary-400 transition-colors">
                    Data Visualization Dashboard
                  </h3>
                  <Link
                    href="/portfolio/data-visualization-dashboard"
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
                    src="/images/projects/digital-marketing-campaign.png"
                    fallbackSrc="/placeholder.svg?height=200&width=300&text=Digital%20Marketing%20Campaign"
                    alt="Digital Marketing Campaign"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                    Digital Marketing Campaign
                  </h3>
                  <Link
                    href="/portfolio/digital-marketing-campaign"
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
