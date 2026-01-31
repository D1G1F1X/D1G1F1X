'use client'

import { useState, useMemo } from 'react'
import { Check, AlertCircle, Info, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/card'

const CATEGORIES = {
  A: {
    name: 'Knowledge & Learning',
    description: 'Low-cost, scalable, self-directed',
    items: [
      { code: 'A1', name: 'Architecture notes & patterns', cost: 15 },
      { code: 'A2', name: 'Monthly group learning sessions', cost: 20 },
      { code: 'A3', name: 'Community access (peer discussion)', cost: 15 },
    ],
  },
  B: {
    name: 'Guided Support',
    description: 'Judgment without doing the work',
    disclaimer: 'This section provides guidance, not hands-on work.',
    items: [
      { code: 'B1', name: 'Group Q&A / office hours', cost: 30 },
      { code: 'B2', name: 'Async guidance (no guarantees)', cost: 40 },
      { code: 'B3', name: 'Generic architecture reviews', cost: 50 },
    ],
  },
  C: {
    name: 'Active System Support',
    description: 'This is where service support begins',
    items: [
      { code: 'C1', name: 'Automated AI tech support', cost: 75 },
      { code: 'C2', name: 'Limited human escalation', cost: 150 },
      { code: 'C3', name: 'Minor workflow tweaks', cost: 200 },
    ],
  },
  D: {
    name: 'System Evolution Capacity',
    description: 'Ongoing build & refactor capacity',
    items: [
      { code: 'D1', name: 'ECU-1 (minor changes)', cost: 500 },
      { code: 'D2', name: 'ECU-2 (new workflows)', cost: 1000 },
      { code: 'D3', name: 'ECU-3+ (complex refactors)', cost: 2000 },
    ],
  },
  E: {
    name: 'Cognitive Escalation',
    description: 'Strategic system transformation',
    items: [
      { code: 'E1', name: 'Cognitive readiness assessment', cost: 2500, requiresConsult: true },
      { code: 'E2', name: 'Partner-led cognitive refactorer', cost: 50000, requiresConsult: true },
      { code: 'E3', name: 'Enterprise partnership', cost: 'Custom' },
    ],
  },
}

const DIAGNOSTIC_PROBLEMS = [
  'We have AI tools… but nothing got easier.',
  'Automation exists, but it doesn\'t connect end-to-end.',
  'The team still decides manually—AI just adds steps.',
  'We keep trying new tools instead of fixing the system.',
]

const DIAGNOSTIC_BENEFITS = [
  { title: 'Pinpoint the Bottleneck', description: 'We identify exactly where your workflow breaks.' },
  { title: 'Explain Root Cause', description: 'Understand why the issue exists, not just that it does.' },
  { title: 'Priority Fix Map', description: 'Clear roadmap for resolution with effort estimates.' },
  { title: 'No Long-Term Lock-In', description: 'Results are yours; you own all recommendations.' },
]

const DIAGNOSTIC_FAQ = [
  {
    q: 'What if we\'re not ready to implement changes?',
    a: 'That\'s fine. The diagnostic stands alone. You get a clear roadmap to reference later.',
  },
  {
    q: 'Can we run this async?',
    a: 'Yes—all sessions can happen async-first with optional real-time clarifications.',
  },
  {
    q: 'What if we\'re happy with the status quo?',
    a: 'We still recommend periodic diagnostics to spot emerging inefficiencies before they compound.',
  },
  {
    q: 'How long does the diagnostic take?',
    a: 'Intake: 30 min. Analysis: 1-2 weeks. Presentation: 1-2 hours (async or live).',
  },
]

export default function SalesFunnelSection() {
  const [activeTab, setActiveTab] = useState('packages')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientRole, setClientRole] = useState('')
  const [clientStage, setClientStage] = useState('')

  const monthly = useMemo(() => {
    return selectedItems.reduce((sum, code) => {
      for (const category of Object.values(CATEGORIES)) {
        const item = category.items.find(i => i.code === code)
        if (item && typeof item.cost === 'number') {
          return sum + item.cost
        }
      }
      return sum
    }, 0)
  }, [selectedItems])

  const toggleItem = (code: string) => {
    setSelectedItems(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    )
  }

  const expectationSummary = () => {
    const hasA = selectedItems.some(code => CATEGORIES.A.items.some(item => item.code === code))
    const hasB = selectedItems.some(code => CATEGORIES.B.items.some(item => item.code === code))
    const hasC = selectedItems.some(code => CATEGORIES.C.items.some(item => item.code === code))
    const hasD = selectedItems.some(code => CATEGORIES.D.items.some(item => item.code === code))

    if (hasD) {
      return "This is an Enterprise-level engagement with reserved delivery capacity."
    }
    if (hasC) {
      return "This includes active system support with defined boundaries."
    }
    if (hasB) {
      return "You'll receive guidance and shared reviews, but no hands-on work."
    }
    if (hasA) {
      return "You've selected learning and community access. This is self-directed and does not include system support."
    }
    return "Select capabilities to see what's included."
  }

  return (
    <section className="py-24 px-6 bg-gray-900/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-teal-500/20 text-teal-300 border-teal-500/30">Clarity in Complexity</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            From Workflow Chaos to Intelligent Systems
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our diagnostic expertise or discover the right support package for your needs.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex flex-wrap gap-2 mb-8 bg-gray-800/50 p-1 rounded-lg w-fit mx-auto border border-gray-700">
            <button
              onClick={() => setActiveTab('diagnostic')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                activeTab === 'diagnostic'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              System Diagnostic
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                activeTab === 'packages'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Support Packages
            </button>
          </div>

          {/* Diagnostic Tab */}
          {activeTab === 'diagnostic' && (
            <div className="space-y-12">
              {/* Hero */}
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Make AI actually save time—by fixing the workflow, not stacking tools.
                </h3>
                <p className="text-xl text-gray-300 mb-8">
                  A fixed-scope diagnostic that pinpoints your bottleneck, explains the root cause, and delivers a priority fix map.
                </p>
              </div>

              {/* Problems */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">The Challenge You Face</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {DIAGNOSTIC_PROBLEMS.map((problem, idx) => (
                    <div key={idx} className="flex gap-4 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                          <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                        </div>
                      </div>
                      <p className="text-gray-200">{problem}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">What You'll Get</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {DIAGNOSTIC_BENEFITS.map((benefit, idx) => (
                    <div key={idx} className="p-6 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-lg border border-teal-500/30">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
                        <div>
                          <h5 className="font-bold text-white mb-2">{benefit.title}</h5>
                          <p className="text-gray-300 text-sm">{benefit.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">Common Questions</h4>
                <div className="space-y-3">
                  {DIAGNOSTIC_FAQ.map((faq, idx) => (
                    <details key={idx} className="group p-4 bg-gray-800/50 rounded-lg border border-gray-700 cursor-pointer hover:border-teal-500/50 transition-colors">
                      <summary className="flex items-center justify-between font-semibold text-white">
                        {faq.q}
                        <span className="transition group-open:rotate-180">▼</span>
                      </summary>
                      <p className="text-gray-300 mt-3 pt-3 border-t border-gray-700">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-teal-600/20 to-cyan-600/20 border border-teal-500/30 rounded-lg p-8 text-center">
                <h4 className="text-2xl font-bold text-white mb-4">Ready for Clarity?</h4>
                <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold">
                  <Link href="/diagnostic">Start System Diagnostic</Link>
                </Button>
              </div>
            </div>
          )}

          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pricing Calculator */}
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Build Your Support Package</h4>
                    <p className="text-gray-300 text-sm mb-6">Select the capabilities that match your needs:</p>
                  </div>

                  {Object.entries(CATEGORIES).map(([key, category]) => (
                    <div key={key}>
                      <div className="mb-3">
                        <h5 className="font-bold text-white">{category.name}</h5>
                        <p className="text-sm text-gray-400">{category.description}</p>
                        {category.disclaimer && (
                          <p className="text-xs text-yellow-300 mt-2 italic">{category.disclaimer}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        {category.items.map(item => (
                          <label
                            key={item.code}
                            className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-teal-500/50 cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(item.code)}
                              onChange={() => toggleItem(item.code)}
                              className="w-4 h-4 accent-teal-500"
                            />
                            <div className="flex-1">
                              <p className="text-white font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-gray-400">{item.code}</p>
                            </div>
                            <span className="text-teal-400 font-semibold whitespace-nowrap">
                              ${typeof item.cost === 'number' ? item.cost : item.cost}/mo
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="space-y-6">
                  <div className="sticky top-24 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-teal-500/30">
                    <h5 className="font-bold text-white mb-4">Your Selection</h5>

                    {selectedItems.length === 0 ? (
                      <p className="text-gray-400 text-sm mb-6">No items selected yet</p>
                    ) : (
                      <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                        {selectedItems.map(code => {
                          for (const category of Object.values(CATEGORIES)) {
                            const item = category.items.find(i => i.code === code)
                            if (item) {
                              return (
                                <div key={code} className="flex justify-between text-sm text-gray-300 pb-2 border-b border-gray-700">
                                  <span>{item.name}</span>
                                  <span>${typeof item.cost === 'number' ? item.cost : item.cost}</span>
                                </div>
                              )
                            }
                          }
                          return null
                        })}
                      </div>
                    )}

                    <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 mb-6">
                      <p className="text-xs text-gray-400 mb-2">Estimated Monthly</p>
                      <p className="text-3xl font-bold text-teal-400">
                        ${monthly === 0 ? '0' : monthly.toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-6">
                      <div className="flex gap-2">
                        <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-200">
                          Your selections set expectations. We deliver exactly what you've selected, or we adjust scope at no additional cost.
                        </p>
                      </div>
                    </div>

                    {selectedItems.length > 0 && (
                      <Button asChild size="lg" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold">
                        <a href="#contact-form">Get Started</a>
                      </Button>
                    )}
                  </div>

                  {/* Client Context Form */}
                  <div className="p-6 bg-gray-800/30 rounded-lg border border-gray-700">
                    <h5 className="font-bold text-white mb-4">Your Context (Optional)</h5>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Organization name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm placeholder-gray-500 focus:border-teal-500 outline-none"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm placeholder-gray-500 focus:border-teal-500 outline-none"
                      />
                      <select
                        value={clientRole}
                        onChange={(e) => setClientRole(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-teal-500 outline-none"
                      >
                        <option value="">Your role</option>
                        <option>CTO / Tech Lead</option>
                        <option>Product Manager</option>
                        <option>Operations</option>
                        <option>Executive</option>
                        <option>Other</option>
                      </select>
                      <select
                        value={clientStage}
                        onChange={(e) => setClientStage(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-teal-500 outline-none"
                      >
                        <option value="">System stage</option>
                        <option>Planning / Exploration</option>
                        <option>Early Implementation</option>
                        <option>Production</option>
                        <option>Scaling</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
