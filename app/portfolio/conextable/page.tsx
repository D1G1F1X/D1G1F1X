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
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Conextable</h1>
              <p className="text-xl text-gray-300 mb-6">
                Interactive relational database and knowledge management system designed for organizing complex
                information architectures and building semantic connections.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30">
                  Database
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                  Knowledge Management
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                  Next.js
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                  Information Architecture
                </span>
              </div>
              <div className="flex gap-4">
                <a href="https://conextable.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                    Visit Live Site
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden border border-blue-500/30">
              <Image src="/images/projects/conextable.jpg" alt="Conextable" fill className="object-cover" />
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
                <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
                <div className="space-y-4 text-gray-100">
                  <p>
                    Conextable is an innovative relational database and knowledge management system that transforms how
                    complex information is organized and connected. Built with modern technologies, it enables users to
                    create sophisticated information architectures with intuitive semantic connections.
                  </p>
                  <p>
                    The platform excels at handling complex data relationships, allowing teams and individuals to map
                    connections between concepts, entities, and data points in ways that traditional databases cannot.
                    It bridges the gap between rigid database structures and flexible knowledge graphs.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Key Features */}
            <Card className="bg-slate-800/50 border-blue-500/30">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
                <ul className="space-y-3 text-gray-100">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1">•</span>
                    <span>Interactive relation mapping with real-time visualization of data connections</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1">•</span>
                    <span>Semantic tagging and context-aware search across your entire knowledge base</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1">•</span>
                    <span>Flexible schema definition allowing custom data types and relationships</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1">•</span>
                    <span>Collaborative features for team-based knowledge management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1">•</span>
                    <span>Export and integration capabilities with other tools and platforms</span>
                  </li>
                </ul>
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
                      <li>Interactive UI Components</li>
                      <li>Real-time Updates</li>
                      <li>Data Visualization</li>
                      <li>Responsive Design</li>
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
                    <p className="text-white font-semibold">conextable.vercel.app</p>
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
                    className="block w-full px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30 hover:bg-cyan-500/30 transition text-center text-sm"
                  >
                    View Live Demo
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
