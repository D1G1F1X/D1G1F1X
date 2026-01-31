'use client'

import { useState, useMemo } from 'react'
import { Check, AlertCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
    ],
  },
}

export default function SalesFunnelSection() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    role: '',
    stage: '',
  })

  const toggleItem = (code: string) => {
    const newSelected = new Set(selected)
    if (newSelected.has(code)) {
      newSelected.delete(code)
    } else {
      newSelected.add(code)
    }
    setSelected(newSelected)
  }

  const totals = useMemo(() => {
    const categoryTotals: Record<string, number> = {}
    let grandTotal = 0

    Object.entries(CATEGORIES).forEach(([catKey, category]) => {
      let catTotal = 0
      category.items.forEach(item => {
        if (selected.has(item.code) && !item.requiresConsult) {
          catTotal += item.cost
        }
      })
      categoryTotals[catKey] = catTotal
      grandTotal += catTotal
    })

    return { categoryTotals, grandTotal }
  }, [selected])

  const expectationSummary = () => {
    const hasA = Object.keys(CATEGORIES.A.items).some(i => selected.has(CATEGORIES.A.items[Object.keys(CATEGORIES.A.items).indexOf(i)].code))
    const hasB = Object.keys(CATEGORIES.B.items).some(i => selected.has(CATEGORIES.B.items[Object.keys(CATEGORIES.B.items).indexOf(i)].code))
    const hasC = Object.keys(CATEGORIES.C.items).some(i => selected.has(CATEGORIES.C.items[Object.keys(CATEGORIES.C.items).indexOf(i)].code))
    const hasD = Object.keys(CATEGORIES.D.items).some(i => selected.has(CATEGORIES.D.items[Object.keys(CATEGORIES.D.items).indexOf(i)].code))

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
    <section className="py-24 bg-gray-800 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500 rounded-full filter blur-[120px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-[120px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-4 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-4 py-1 rounded-full text-sm font-semibold">
            Shape Your Support
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Clarity in Complexity
          </h2>
          <p className="text-xl text-gray-300 mb-4 leading-relaxed">
            At Lumen Helix, we architect solutions that scale with you. Configure the support capabilities you need—pricing updates automatically.
          </p>
          <p className="text-sm text-gray-400 italic">This calculator shows estimated cost only — final confirmation happens before work begins.</p>
        </div>

        {/* Three-Stage Funnel Visual */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">Aware</div>
              <p className="text-gray-300 text-sm">Learn & Explore (Categories A-B)</p>
            </div>
            <div className="bg-gradient-to-br from-teal-900/40 to-teal-800/20 border border-teal-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-teal-400 mb-2">Consider</div>
              <p className="text-gray-300 text-sm">Active Support & Services (Category C)</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 border border-cyan-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">Convert</div>
              <p className="text-gray-300 text-sm">Enterprise & Custom (Category D-E)</p>
            </div>
          </div>
        </div>

        {/* Client Info Section */}
        <div className="max-w-5xl mx-auto mb-12 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
          <h3 className="text-xl font-bold text-white mb-6">About Your Organization</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Organization Name"
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              value={clientInfo.name}
              onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              value={clientInfo.email}
              onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
            />
            <select
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              value={clientInfo.role}
              onChange={(e) => setClientInfo({ ...clientInfo, role: e.target.value })}
            >
              <option value="">Select Your Role</option>
              <option value="founder">Founder / CEO</option>
              <option value="technical">Technical Lead</option>
              <option value="business">Business Manager</option>
              <option value="other">Other</option>
            </select>
            <select
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              value={clientInfo.stage}
              onChange={(e) => setClientInfo({ ...clientInfo, stage: e.target.value })}
            >
              <option value="">System Stage</option>
              <option value="learning">Learning</option>
              <option value="building">Building</option>
              <option value="operating">Operating</option>
              <option value="scaling">Scaling</option>
            </select>
          </div>
        </div>

        {/* Calculator Categories */}
        <div className="max-w-5xl mx-auto space-y-8 mb-12">
          {Object.entries(CATEGORIES).map(([catKey, category]) => (
            <div key={catKey} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{catKey}. {category.name}</h3>
                <p className="text-gray-400">{category.description}</p>
                {category.disclaimer && (
                  <div className="mt-3 flex gap-2 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-200">{category.disclaimer}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {category.items.map(item => (
                  <label key={item.code} className="flex items-center gap-4 p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors border border-gray-700 hover:border-teal-500/50">
                    {item.requiresConsult ? (
                      <div className="w-5 h-5 rounded border border-gray-500 flex items-center justify-center text-gray-500 text-xs flex-shrink-0">
                        ✓
                      </div>
                    ) : (
                      <input
                        type="checkbox"
                        checked={selected.has(item.code)}
                        onChange={() => toggleItem(item.code)}
                        className="w-5 h-5 rounded border-gray-600 bg-gray-700 cursor-pointer accent-teal-500 flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-white font-semibold">{item.code}: {item.name}</p>
                      {item.requiresConsult && <p className="text-gray-500 text-sm mt-1">Requires consultation. Not purchasable via calculator.</p>}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-teal-400 font-bold">${item.cost.toLocaleString()}</p>
                      <p className="text-gray-500 text-xs">/month</p>
                    </div>
                  </label>
                ))}
              </div>

              {catKey !== 'E' && (
                <div className="mt-4 text-right">
                  <p className="text-gray-400 text-sm">
                    {catKey} Subtotal: <span className="text-teal-400 font-bold">${totals.categoryTotals[catKey]?.toLocaleString() || '0'}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Expectation Summary */}
          <div className="md:col-span-2 bg-gradient-to-br from-teal-900/30 to-cyan-900/30 border border-teal-500/30 rounded-lg p-8">
            <h3 className="text-xl font-bold text-white mb-4 flex gap-2 items-center">
              <Info className="w-5 h-5 text-teal-400" />
              What You're Getting
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">{expectationSummary()}</p>
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-gray-400 text-sm font-semibold mb-3">Important Disclaimer:</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-teal-400">•</span>
                  <span>This calculator provides an estimate, not a contract</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-400">•</span>
                  <span>Work outside selected capabilities is quoted separately</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-400">•</span>
                  <span>No work begins without written approval</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Total & CTA */}
          <div className="bg-gradient-to-br from-teal-600/20 to-cyan-600/20 border border-teal-500/50 rounded-lg p-8 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-2">Estimated Monthly Total</p>
              <p className="text-5xl font-bold text-teal-400 mb-8">${totals.grandTotal.toLocaleString()}</p>
              <p className="text-gray-400 text-xs mb-6">
                Based on selected capabilities. Final pricing confirmed before engagement.
              </p>
            </div>
            <Button
              asChild
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-all"
            >
              <Link href="/diagnostic">Start Your Diagnostic</Link>
            </Button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-5xl mx-auto mt-12 text-center">
          <p className="text-gray-400 mb-4">Not sure which capabilities you need?</p>
          <Button
            variant="outline"
            asChild
            className="border-gray-600 text-gray-300 hover:text-white hover:border-teal-500 bg-transparent"
          >
            <Link href="/diagnostic">Get a Free System Diagnostic</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
