"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ConextablePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <div className="sticky top-0 z-40 border-b border-blue-500/20 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">ConnectABLE</h1>
              <p className="text-xl text-gray-100 mb-6">
                Connect. Share. Grow. Together. A supportive community platform designed for neurodivergent individuals
                to connect with others, exchange skills, collaborate on projects, and build meaningful relationships.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30">
                  Community
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                  Neurodivergent Support
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                  Skill-Sharing
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                  Collaboration
                </span>
              </div>
              <div className="flex gap-4">
                <a href="https://conextable.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                    Join the Community
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden border border-blue-500/30">
              <Image src="/images/projects/conextable.jpg" alt="ConnectABLE" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="bg-slate-800/50 border-blue-500/30">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">About ConnectABLE</h2>
                <div className="space-y-4 text-gray-100">
                  <p>
                    ConnectABLE is a revolutionary community platform built specifically for neurodivergent individuals.
                    It creates a safe, supportive space where users can connect with others who share similar interests,
                    exchange practical skills, collaborate on meaningful projects, and build lasting relationships.
                  </p>
                  <p>
                    The platform recognizes that neurodivergent individuals often have diverse learning styles and
                    communication needs. ConnectABLE is designed from the ground up to accommodate these differences,
                    making community engagement accessible, intuitive, and meaningful for everyone.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Core Features */}
            <Card className="bg-slate-800/50 border-blue-500/30">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Core Features</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-cyan-300 font-semibold mb-2">Connect</h3>
                    <p className="text-gray-100 text-sm">
                      Find and connect with others who share your interests or have complementary skills, building
                      genuine friendships and professional relationships.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-cyan-300 font-semibold mb-2">Skill Exchange</h3>
                    <p className="text-gray-100 text-sm">
                      Exchange skills and knowledge in a supportive environment designed for diverse learning styles.
                      Categories include Tech, Creative, Organizational, Social, and Domestic skills.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-cyan-300 font-semibold mb-2">Micro-Projects</h3>
                    <p className="text-gray-100 text-sm">
                      Join or start small collaborative projects that make a difference in your community while building
                      valuable connections and experience.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-cyan-300 font-semibold mb-2">Domestic Skills Trading</h3>
                    <p className="text-gray-100 text-sm">
                      Share practical household skills like meal prep, home organization, basic repairs, sustainable
                      cleaning, and plant care with other community members.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skill Categories */}
            <Card className="bg-slate-800/50 border-blue-500/30">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Featured Opportunities</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 p-4 rounded border border-cyan-500/20">
                    <p className="text-cyan-300 font-semibold text-sm mb-1">Web Development</p>
                    <p className="text-gray-100 text-xs">Learn HTML, CSS, JavaScript fundamentals</p>
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded border border-purple-500/20">
                    <p className="text-purple-300 font-semibold text-sm mb-1">Digital Art</p>
                    <p className="text-gray-100 text-xs">Master digital brushes and techniques</p>
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded border border-green-500/20">
                    <p className="text-green-300 font-semibold text-sm mb-1">Financial Planning</p>
                    <p className="text-gray-100 text-xs">Learn budgeting and saving strategies</p>
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded border border-blue-500/20">
                    <p className="text-blue-300 font-semibold text-sm mb-1">Communication</p>
                    <p className="text-gray-100 text-xs">Develop better communication skills</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technology Stack */}
            <Card className="bg-slate-800/50 border-blue-500/30">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Technology Stack</h2>
                <div className="grid grid-cols-2 gap-4 text-gray-100">
                  <div>
                    <h3 className="text-cyan-400 font-semibold mb-2">Frontend</h3>
                    <ul className="space-y-1 text-sm">
                      <li>Next.js 15</li>
                      <li>React 19</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-cyan-400 font-semibold mb-2">Features</h3>
                    <ul className="space-y-1 text-sm">
                      <li>Interactive UI</li>
                      <li>Real-time Updates</li>
                      <li>Accessible Design</li>
                      <li>Responsive</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-blue-500/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Project Details</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Status</p>
                    <p className="text-white font-semibold">In Development</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Category</p>
                    <p className="text-white font-semibold">In-house Project</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Launch Date</p>
                    <p className="text-white font-semibold">January 2025</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Domain</p>
                    <p className="text-cyan-300 font-semibold">conextable.vercel.app</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-blue-500/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <a
                    href="https://conextable.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30 hover:bg-cyan-500/30 transition text-center text-sm font-medium"
                  >
                    Visit Community
                  </a>
                  <a
                    href="https://conextable.vercel.app/demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30 hover:bg-blue-500/30 transition text-center text-sm font-medium"
                  >
                    Try Demo
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-green-500/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-3">Join the Movement</h3>
                <p className="text-gray-100 text-sm mb-4">
                  Be part of a supportive community designed specifically for neurodivergent individuals.
                </p>
                <a
                  href="https://conextable.vercel.app/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 bg-green-500/20 text-green-300 rounded border border-green-500/30 hover:bg-green-500/30 transition text-center text-sm font-medium"
                >
                  Get Started
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
