import Link from "next/link"
import { ArrowLeft, Palette, CheckCircle2, Lightbulb, Layers, Target, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function LogoDesignPage() {
  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 via-primary-500/10 to-secondary-500/20"></div>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#gridGradient)" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container px-4 mx-auto py-12 relative z-10">
        {/* Back button */}
        <Link
          href="/services/graphic-design"
          className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Graphic Design Services
        </Link>

        {/* Page header */}
        <div className="max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent-500/20 text-accent-300 border-accent-500/30 px-4 py-1 text-sm">
            Graphic Design
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Logo Design Services</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            We create distinctive, memorable logos that capture your brand's essence and resonate with your audience.
            Our logo design process combines strategic thinking with creative execution to deliver visual identities
            that stand the test of time.
          </p>
        </div>

        {/* Logo design process */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Logo Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 flex items-center justify-center bg-accent-500/20 rounded-full mb-6 border border-accent-500/30 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="h-7 w-7 text-accent-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Discovery</h3>
              <p className="text-gray-300">
                We begin by understanding your brand values, target audience, industry context, and design preferences.
                This research phase informs our creative direction and ensures your logo aligns with your business
                objectives.
              </p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 flex items-center justify-center bg-accent-500/20 rounded-full mb-6 border border-accent-500/30 group-hover:scale-110 transition-transform duration-300">
                <Palette className="h-7 w-7 text-accent-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Concept Development</h3>
              <p className="text-gray-300">
                Our designers create multiple concept directions, exploring different visual approaches to represent
                your brand. Each concept is thoughtfully crafted to communicate your brand's unique personality and
                value proposition.
              </p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 flex items-center justify-center bg-accent-500/20 rounded-full mb-6 border border-accent-500/30 group-hover:scale-110 transition-transform duration-300">
                <Layers className="h-7 w-7 text-accent-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Refinement</h3>
              <p className="text-gray-300">
                Based on your feedback, we refine the selected concept, perfecting every detail from typography to color
                palette. This iterative process ensures the final logo meets your expectations and design standards.
              </p>
            </div>
          </div>
        </div>

        {/* Featured logo case study */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Logo Design</h2>
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <Badge className="mb-4 bg-primary-500/20 text-primary-300 border-primary-500/30 px-4 py-1 text-sm">
                  Case Study
                </Badge>
                <h3 className="text-2xl font-bold text-white mb-4">The Hodge Documentary Logo</h3>
                <p className="text-gray-300 mb-4">
                  For The Hodge Documentary, we created a distinctive logo that captures the essence of the film's focus
                  on Cleveland's artistic community and social change. The hand-drawn, sketch-style design with a
                  vibrant red heart symbolizes the passion and human connection at the core of the project.
                </p>
                <h4 className="text-lg font-semibold text-white mb-2">Client Objectives:</h4>
                <ul className="space-y-2 text-gray-300 mb-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                    <span>Create a distinctive visual identity that stands out in the documentary film space</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                    <span>Reflect the documentary's artistic themes and urban storytelling approach</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                    <span>Develop a logo that works across digital and print applications</span>
                  </li>
                </ul>
                <h4 className="text-lg font-semibold text-white mb-2">Design Impact:</h4>
                <p className="text-gray-300">
                  The logo has become a recognizable symbol for the documentary, effectively communicating its message
                  across all platforms and helping to build audience recognition and engagement. Its distinctive style
                  has contributed to the film's marketing success and brand identity.
                </p>
                <div className="mt-6">
                  <Button asChild className="bg-accent-600 hover:bg-accent-700">
                    <Link href="/portfolio/hodge-documentary-website">View Full Case Study</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300 max-w-md">
                  <img
                    src="/images/logos/hodge-documentary-logo.png"
                    alt="The Hodge Documentary Logo"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo design benefits */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Invest in Professional Logo Design</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-accent-500/20 rounded-full border border-accent-500/30 mt-1">
                  <Target className="h-6 w-6 text-accent-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Brand Recognition</h3>
                  <p className="text-gray-300">
                    A well-designed logo increases brand recognition and helps your business stand out in a crowded
                    marketplace. It creates a visual shorthand for your brand that customers can instantly identify.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-accent-500/20 rounded-full border border-accent-500/30 mt-1">
                  <Users className="h-6 w-6 text-accent-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Customer Trust</h3>
                  <p className="text-gray-300">
                    Professional logos build credibility and trust with your audience. They signal that your business is
                    established, reliable, and committed to quality in all aspects of your operations.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300 md:col-span-2">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-accent-500/20 rounded-full border border-accent-500/30 mt-1">
                  <Layers className="h-6 w-6 text-accent-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Versatile Application</h3>
                  <p className="text-gray-300">
                    Our logos are designed to work seamlessly across all applications—from your website and social media
                    to business cards, signage, and promotional materials. We provide comprehensive file formats and
                    usage guidelines to ensure consistent implementation across all touchpoints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Create Your Brand's Visual Identity?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how our logo design services can help establish a memorable and effective visual
            identity for your brand.
          </p>
          <Button asChild size="lg" className="bg-accent-600 hover:bg-accent-700 text-white">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
