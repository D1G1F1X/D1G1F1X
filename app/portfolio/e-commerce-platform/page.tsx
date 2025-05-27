import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ImageWithFallback from "@/components/image-with-fallback"

export default function ProjectPage() {
  const project = {
    id: "e-commerce-platform",
    title: "E-Commerce Platform",
    description: "A scalable e-commerce platform with advanced product recommendation features.",
    image: "/images/projects/e-commerce-platform.png",
    category: "client",
    stage: "deployed",
    tags: ["E-Commerce", "Web Development", "AI"],
    client: "Boutique Retail Group",
    duration: "10 months",
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
              The E-Commerce Platform is a comprehensive online retail solution developed for Boutique Retail Group, a
              collective of specialty fashion and lifestyle brands. This platform was designed to unify their digital
              presence while maintaining each brand's unique identity, all while leveraging cutting-edge technology to
              deliver personalized shopping experiences that drive conversion and customer loyalty.
            </p>

            <p>
              This project showcases our expertise in e-commerce development, AI implementation, and scalable
              architecture, delivering a solution that has significantly enhanced the client's digital retail
              capabilities.
            </p>

            <h2>Key Features</h2>

            <h3>Multi-Brand Architecture</h3>
            <p>
              The platform supports multiple brands under a single infrastructure while maintaining distinct brand
              experiences:
            </p>
            <ul>
              <li>Unified backend with brand-specific storefronts</li>
              <li>Centralized inventory and order management</li>
              <li>Brand-specific design systems with shared components</li>
              <li>Cross-brand account management for customers</li>
            </ul>

            <h3>AI-Powered Personalization</h3>
            <p>One of the platform's standout features is its sophisticated recommendation engine:</p>
            <ul>
              <li>Machine learning algorithms for personalized product recommendations</li>
              <li>Visual similarity search for "shop the look" functionality</li>
              <li>Behavioral analysis for dynamic homepage personalization</li>
              <li>Cross-brand recommendation capabilities</li>
              <li>Contextual upsell and cross-sell suggestions</li>
            </ul>

            <h3>Advanced Shopping Experience</h3>
            <p>The platform offers a range of features designed to enhance the customer journey:</p>
            <ul>
              <li>Virtual try-on capabilities for select product categories</li>
              <li>AR-enabled product visualization</li>
              <li>Real-time inventory visibility</li>
              <li>Flexible fulfillment options (ship from store, curbside pickup, etc.)</li>
              <li>One-click checkout with multiple payment options</li>
            </ul>

            <h3>Omnichannel Integration</h3>
            <p>The platform seamlessly connects online and offline retail experiences:</p>
            <ul>
              <li>In-store inventory visibility</li>
              <li>Clienteling tools for store associates</li>
              <li>Unified loyalty program across channels</li>
              <li>Buy online, pick up in-store (BOPIS) functionality</li>
              <li>Integrated returns processing across channels</li>
            </ul>

            <h2>Technical Implementation</h2>
            <p>
              The E-Commerce Platform was built using modern technologies to ensure performance, scalability, and
              flexibility:
            </p>
            <ul>
              <li>Next.js frontend with server-side rendering for SEO optimization</li>
              <li>Headless commerce architecture with API-first approach</li>
              <li>GraphQL API layer for efficient data fetching</li>
              <li>Microservices backend for scalability and maintainability</li>
              <li>Elasticsearch for high-performance product search</li>
              <li>Redis for caching and session management</li>
              <li>TensorFlow for recommendation engine</li>
              <li>AWS infrastructure with auto-scaling capabilities</li>
              <li>CI/CD pipeline for continuous deployment</li>
            </ul>

            <h2>Results and Impact</h2>
            <p>
              Since its deployment, the E-Commerce Platform has delivered significant business value for Boutique Retail
              Group:
            </p>
            <ul>
              <li>42% increase in online revenue within the first six months</li>
              <li>28% improvement in conversion rate</li>
              <li>35% higher average order value with AI-powered recommendations</li>
              <li>65% increase in cross-brand shopping</li>
              <li>18% reduction in cart abandonment</li>
              <li>40% growth in mobile transactions</li>
              <li>Significant operational efficiencies through unified backend systems</li>
            </ul>
          </div>

          {/* Key technologies */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Next.js",
                "React",
                "GraphQL",
                "Node.js",
                "Elasticsearch",
                "Redis",
                "TensorFlow",
                "AWS",
                "Docker",
                "Kubernetes",
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
              {[
                "Homepage Personalization",
                "Product Detail Page",
                "Virtual Try-On Feature",
                "Mobile Shopping Experience",
              ].map((item, index) => (
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
                "The e-commerce platform developed by Lumen Helix has transformed our digital retail strategy. Not only
                has it unified our brands under a single, manageable system, but the AI-powered personalization has
                exceeded our expectations in driving sales and customer engagement. The platform's flexibility has
                allowed us to rapidly adapt to changing market conditions, and the seamless omnichannel integration has
                bridged the gap between our online and physical stores. This has been a game-changing investment for our
                business."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent-500/20 rounded-full flex items-center justify-center border border-accent-500/30 mr-4">
                  <span className="text-accent-400 font-bold">SL</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Sarah Lee</p>
                  <p className="text-gray-400">Digital Transformation Director, Boutique Retail Group</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="bg-gradient-to-r from-accent-900/70 to-primary-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Transform Your E-Commerce Experience?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover how our e-commerce expertise can help you create engaging, personalized shopping experiences that
              drive conversion and customer loyalty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent-500 hover:bg-accent-600 text-white">
                <Link href="/#contact">Request a Consultation</Link>
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
                    src="/images/projects/ai-content-generator.png"
                    fallbackSrc="/placeholder.svg?height=200&width=300&text=AI%20Content%20Generator"
                    alt="AI Content Generator"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    AI Content Generator
                  </h3>
                  <Link
                    href="/portfolio/ai-content-generator"
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
                    src="/images/projects/digital-marketing-campaign.png"
                    fallbackSrc="/placeholder.svg?height=200&width=300&text=Digital%20Marketing%20Campaign"
                    alt="Digital Marketing Campaign"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-secondary-400 transition-colors">
                    Digital Marketing Campaign
                  </h3>
                  <Link
                    href="/portfolio/digital-marketing-campaign"
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
                    src="/images/projects/virtual-event-platform.png"
                    fallbackSrc="/placeholder.svg?height=200&width=300&text=Virtual%20Event%20Platform"
                    alt="Virtual Event Platform"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                    Virtual Event Platform
                  </h3>
                  <Link
                    href="/portfolio/virtual-event-platform"
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
