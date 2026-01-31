'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export default function ResourcesPage() {
  const [email, setEmail] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)

  const resources = [
    {
      title: 'Shard Format + Templates',
      description: 'Canonical template set for structuring automation workflows',
      resources: ['PDF Template', 'Figma Blocks', 'Usage Guide'],
      icon: '📋',
      primary: true,
    },
    {
      title: 'Canonical Shard Set',
      description: 'Pre-built reusable components for common workflow patterns',
      resources: ['Component Library', 'Integration Examples', 'Checklists'],
      icon: '🔧',
    },
    {
      title: 'SSD Mini-Book',
      description: 'Concise guide to system design thinking for automation',
      resources: ['Mini-Book PDF', 'Workbook', 'References'],
      icon: '📚',
    },
    {
      title: 'Non-Technical Automation Walkthrough',
      description: 'Step-by-step guide for teams without technical backgrounds',
      resources: ['Video Series', 'Transcripts', 'Glossary'],
      icon: '🎓',
    },
    {
      title: 'Open-Source Examples (GitHub)',
      description: 'Real-world workflow examples you can fork and adapt',
      resources: ['GitHub Repo', 'Code Comments', 'Deployment Guide'],
      icon: '⚙️',
    },
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email) {
      setFormSubmitted(true)
      setTimeout(() => {
        setFormSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Free Resources</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Free resources to reduce tool sprawl and make automation legible.
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Canonical templates, guides, and open-source examples. Educational and illustrative—no customization, support,
              or guarantees.
            </p>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource, idx) => (
                <Card
                  key={idx}
                  className={`bg-gray-800/50 border rounded-lg p-8 hover:border-cyan-500/50 transition-all ${
                    resource.primary ? 'md:col-span-2 lg:col-span-1 border-cyan-500/30 bg-cyan-900/20' : 'border-gray-700'
                  }`}
                >
                  <div className="text-4xl mb-4">{resource.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
                  <p className="text-gray-400 text-sm mb-6">{resource.description}</p>
                  <div className="mb-6 space-y-2">
                    {resource.resources.map((item, i) => (
                      <div key={i} className="text-sm text-gray-300 flex items-center gap-2">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                        {item}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => document.getElementById('email-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-cyan-400 font-semibold text-sm hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Get it <ArrowRight className="w-4 h-4" />
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Email Capture Form */}
        <section id="email-form" className="py-20 px-6 bg-gray-900/50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Get the Resources</h2>
            <p className="text-gray-300 text-center mb-8">
              Enter your email to receive immediate access to all free resources.
            </p>

            <Card className="bg-gray-800/50 border-gray-700 p-8">
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-300 mb-4">Which resources interest you?</p>
                    <div className="space-y-3">
                      {['Shard Templates', 'Canonical Shard Set', 'SSD Mini-Book', 'Automation Walkthrough', 'GitHub Examples'].map(
                        (resource, idx) => (
                          <label key={idx} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 accent-cyan-500" defaultChecked={idx === 0} />
                            <span className="text-gray-300 text-sm">{resource}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-4 h-4 accent-cyan-500" />
                    <span className="text-sm text-gray-300">
                      Send me occasional updates about new resources and automation insights (you can unsubscribe anytime).
                    </span>
                  </label>

                  <Button type="submit" size="lg" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold">
                    Send me the resources
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Download className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Resources on the way!</h3>
                  <p className="text-gray-300 mb-8">Check your email in a moment. You'll have instant access to all selected resources.</p>
                  <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    <Link href="/diagnostic">Ready for personalized guidance? Start Diagnostic</Link>
                  </Button>
                </div>
              )}
            </Card>

            <div className="mt-8 p-6 bg-gray-800/30 border border-gray-700 rounded-lg">
              <p className="text-sm text-gray-400 text-center">
                <span className="font-semibold">Boundary statement:</span> Everything in the free tier is educational and
                illustrative. No customization, support, or guarantees at this level.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
