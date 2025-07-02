import { ArrowLeft, ExternalLink, Heart, Sparkles, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ImageWithFallback from "@/components/image-with-fallback"

export default function OyahLovePage() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.1),transparent_50%)]" />

      <div className="container px-4 mx-auto py-12 relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/portfolio">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* Project Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-accent-600 text-white">Client Project</Badge>
              <Badge className="bg-primary-500 text-white">Building</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Oyah Love Spiritual Platform</h1>
            <p className="text-xl text-gray-300 mb-8">
              A mystical wellness and spiritual transformation platform featuring beautiful imagery and empowering
              content. Designed to help users embrace change and discover their inner strength through curated
              experiences.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Spiritual Wellness", "E-commerce", "Blog Platform", "Transformation"].map((tag) => (
                <Badge key={tag} variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-4">
              <Button asChild className="bg-primary-500 hover:bg-primary-600">
                <Link href="https://oyah.vercel.app" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Build Progress
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-xl shadow-2xl border border-gray-700/50">
              <ImageWithFallback
                src="/images/projects/oyah-love.jpg"
                alt="Oyah Love Spiritual Platform"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-purple-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Spiritual Wellness</h3>
            </div>
            <p className="text-gray-300">
              A platform dedicated to spiritual growth and personal transformation, helping users embrace change and
              find inner strength.
            </p>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
            <div className="flex items-center mb-4">
              <Sparkles className="h-6 w-6 text-yellow-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Mystical Design</h3>
            </div>
            <p className="text-gray-300">
              Beautiful, ethereal design featuring powerful imagery, lightning effects, and a transformative visual
              experience.
            </p>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
            <div className="flex items-center mb-4">
              <ShoppingBag className="h-6 w-6 text-accent-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">E-commerce Integration</h3>
            </div>
            <p className="text-gray-300">
              Full e-commerce functionality with curated collections, blog content, and seamless shopping experience.
            </p>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Technical Implementation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Frontend Technologies</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Next.js for optimal performance and SEO</li>
                <li>• Responsive design with mobile-first approach</li>
                <li>• Custom animations and visual effects</li>
                <li>• Optimized image loading and performance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Platform Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Multi-section navigation (Home, About, Blog, Shop)</li>
                <li>• Integrated blog platform for content</li>
                <li>• E-commerce shop functionality</li>
                <li>• Contact and customer support system</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Project Highlights */}
        <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-6">Project Highlights</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-1">Empowering Brand Message</h4>
                <p className="text-gray-300">
                  "Embrace the Winds of Change, Find Your Inner Storm" - a powerful message of transformation and
                  personal growth woven throughout the entire user experience.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-1">Stunning Visual Identity</h4>
                <p className="text-gray-300">
                  Features beautiful, culturally-rich imagery with butterfly symbolism representing transformation,
                  complemented by lightning effects and mystical elements.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-accent-400 mt-2 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-1">Comprehensive Platform</h4>
                <p className="text-gray-300">
                  Full-featured platform combining spiritual content, e-commerce capabilities, blog functionality, and
                  community engagement tools in one cohesive experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
