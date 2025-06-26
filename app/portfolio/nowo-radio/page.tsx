import { ArrowLeft, ExternalLink, Users, Radio, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ImageWithFallback from "@/components/image-with-fallback"

export default function NowoRadioPage() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,107,107,0.1),transparent_50%)]" />

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
              <Badge className="bg-accent-500 text-white">Deployed</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">NOWO Radio Platform</h1>
            <p className="text-xl text-gray-300 mb-8">
              A retro-futuristic radio station website featuring cyberpunk aesthetics and interactive broadcasting
              elements. Combines newschool vibes with oldschool rhythms in a digital frontier experience.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Radio", "Cyberpunk Design", "Interactive Media", "Broadcasting"].map((tag) => (
                <Badge key={tag} variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-4">
              <Button asChild className="bg-primary-500 hover:bg-primary-600">
                <Link href="https://noworadio.vercel.app" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Live Site
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-xl shadow-2xl border border-gray-700/50">
              <ImageWithFallback
                src="/images/projects/nowo-radio.jpg"
                alt="NOWO Radio Platform"
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
              <Radio className="h-6 w-6 text-primary-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Broadcasting Platform</h3>
            </div>
            <p className="text-gray-300">
              Interactive radio platform with live streaming capabilities, artist interviews, and exclusive content
              delivery.
            </p>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
            <div className="flex items-center mb-4">
              <Zap className="h-6 w-6 text-secondary-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Cyberpunk Aesthetic</h3>
            </div>
            <p className="text-gray-300">
              Retro-futuristic design with neon accents, terminal-style interfaces, and immersive digital frontier
              experience.
            </p>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-accent-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Community Features</h3>
            </div>
            <p className="text-gray-300">
              Guestbook, announcements, and interactive elements that connect listeners with the NOWO Radio community.
            </p>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Technical Implementation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-primary-400 mb-4">Frontend Technologies</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Next.js for server-side rendering and performance</li>
                <li>• Custom CSS for cyberpunk visual effects</li>
                <li>• Responsive design for all devices</li>
                <li>• Interactive navigation and user experience</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-400 mb-4">Design Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Retro terminal-style typography</li>
                <li>• Neon color scheme with cyan and magenta accents</li>
                <li>• Animated borders and visual effects</li>
                <li>• Dark theme optimized for extended viewing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Project Highlights */}
        <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-6">Project Highlights</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-1">Immersive Brand Experience</h4>
                <p className="text-gray-300">
                  Created a unique digital identity that perfectly captures the "NEWSCHOOL OLDSCHOOL WORLD ORDER"
                  concept through visual design and user interaction.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-secondary-400 mt-2 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-1">Multi-Section Navigation</h4>
                <p className="text-gray-300">
                  Comprehensive site structure including About, Events, Talent, Announcements, Gear, Gallery, Guestbook,
                  and Contact/Booking sections.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-accent-400 mt-2 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-1">Performance Optimized</h4>
                <p className="text-gray-300">
                  Built with modern web technologies ensuring fast loading times and smooth user experience across all
                  devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
