import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "@/components/image-with-fallback"

export default function ProjectPage() {
  const project = {
    id: "ai-content-generator",
    title: "AI Content Generator",
    description: "An advanced tool that generates high-quality content for various marketing channels.",
    image: "/images/projects/ai-content-generator.png",
    category: "in-house",
    stage: "deployed",
    tags: ["AI", "Content Marketing", "SaaS"],
    client: "Internal Product",
    duration: "12 months",
    year: "2023-2024",
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
      <div className="absolute top-40 left-20 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
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
            <Badge className="bg-primary-600 text-white">
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
              The AI Content Generator is a sophisticated platform that leverages advanced language models to create
              high-quality, contextually relevant content for various marketing channels. Developed as an in-house
              product by Lumen Helix Solutions, this tool addresses the growing demand for efficient content creation
              while maintaining brand voice and quality standards.
            </p>

            <p>
              This system represents our expertise in AI implementation and content strategy, combining natural language
              processing with marketing best practices to deliver a powerful solution for modern content needs.
            </p>

            <h2>Key Features</h2>

            <h3>Multi-Channel Content Generation</h3>
            <p>
              The AI Content Generator creates tailored content for various platforms and formats, enabling marketing
              teams to:
            </p>
            <ul>
              <li>Generate blog posts with SEO optimization built-in</li>
              <li>Create social media content tailored to specific platforms (Twitter, LinkedIn, Instagram, etc.)</li>
              <li>Develop email marketing campaigns with customizable templates</li>
              <li>Produce product descriptions that highlight key features and benefits</li>
            </ul>

            <h3>Brand Voice Customization</h3>
            <p>
              One of the most powerful aspects of our AI Content Generator is its ability to learn and adapt to specific
              brand voices:
            </p>
            <ul>
              <li>Brand voice analysis and replication through machine learning</li>
              <li>Customizable tone settings (professional, casual, technical, etc.)</li>
              <li>Industry-specific terminology and compliance checks</li>
              <li>Style guide integration to ensure brand consistency</li>
            </ul>

            <h3>Collaborative Workflow Integration</h3>
            <p>
              The platform is designed to enhance human creativity, not replace it, with features that support
              collaborative content development:
            </p>
            <ul>
              <li>Content briefs and outlines generation to jumpstart the creative process</li>
              <li>Revision and editing suggestions based on best practices</li>
              <li>Version control and approval workflows</li>
              <li>Integration with popular CMS platforms and marketing tools</li>
            </ul>

            <h3>Analytics and Optimization</h3>
            <p>The AI Content Generator includes powerful analytics to continuously improve content performance:</p>
            <ul>
              <li>Content performance tracking across channels</li>
              <li>A/B testing capabilities for headlines and content variations</li>
              <li>Audience engagement analysis</li>
              <li>SEO impact measurement and optimization recommendations</li>
            </ul>

            <h2>Technical Implementation</h2>
            <p>
              The AI Content Generator was built using cutting-edge technologies to ensure scalability, accuracy, and
              user-friendliness:
            </p>
            <ul>
              <li>Fine-tuned large language models (LLMs) for specialized content generation</li>
              <li>React-based frontend with an intuitive user interface</li>
              <li>Node.js backend with efficient API handling</li>
              <li>MongoDB for flexible content storage and retrieval</li>
              <li>Redis for caching and performance optimization</li>
              <li>Docker and Kubernetes for scalable deployment</li>
              <li>Enterprise-grade security with role-based access control</li>
            </ul>

            <h2>Results and Impact</h2>
            <p>Since its deployment, the AI Content Generator has delivered significant benefits to organizations:</p>
            <ul>
              <li>70% reduction in content creation time</li>
              <li>45% increase in content output volume</li>
              <li>32% improvement in engagement metrics across generated content</li>
              <li>25% cost reduction in content production</li>
              <li>Consistent brand voice across all marketing channels</li>
            </ul>
          </div>

          {/* Key technologies */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "Node.js",
                "MongoDB",
                "Redis",
                "Docker",
                "Kubernetes",
                "GPT-4",
                "TensorFlow",
                "AWS",
                "Next.js",
              ].map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-gray-300 border-gray-700 bg-gray-800/50 hover:border-primary-500/30 transition-colors px-3 py-1"
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
              {["Dashboard Interface", "Content Generation Flow", "Analytics Dashboard", "Template Library"].map(
                (item, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 group"
                  >
                    <ImageWithFallback
                      src={`/placeholder_image.png?height=300&width=500&text=${encodeURIComponent(item)}`}
                      fallbackSrc={`/placeholder.svg?height=300&width=500&text=${encodeURIComponent(item)}`}
                      alt={item}
                      className="w-full h-auto"
                    />
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Client Testimonials</h2>
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
              <p className="text-gray-300 italic mb-4">
                "The AI Content Generator has revolutionized our content marketing strategy. We're now able to produce
                three times the content with half the resources, while maintaining our brand voice and quality
                standards. The platform's ability to learn from feedback and continuously improve has been particularly
                impressive."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center border border-primary-500/30 mr-4">
                  <span className="text-primary-400 font-bold">MS</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Michael Smith</p>
                  <p className="text-gray-400">Marketing Director, Global E-commerce Brand</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="bg-gradient-to-r from-primary-900/70 to-secondary-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Interested in AI Content Generation?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover how our AI Content Generator can transform your content marketing strategy and boost your
              productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
                <Link href="/#contact">Request a Demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                <Link href="/services/ai-strategy-fusion">Learn About Our AI Services</Link>
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
                    src="/images/projects/prompt-engineering-toolkit.png"
                    fallbackSrc="/placeholder.svg?height=200&width=300&text=Prompt%20Engineering%20Toolkit"
                    alt="Prompt Engineering Toolkit"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    Prompt Engineering Toolkit
                  </h3>
                  <Link
                    href="/portfolio/prompt-engineering-toolkit"
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
                    src="/images/projects/ai-research-platform.png"
                    fallbackSrc="/placeholder.svg?height=200&width=300&text=AI%20Research%20Platform"
                    alt="AI Research Platform"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                    AI Research Platform
                  </h3>
                  <Link
                    href="/portfolio/ai-research-platform"
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
