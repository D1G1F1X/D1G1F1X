'use client'

import { useState, useMemo } from 'react'
import { Info } from 'lucide-react'
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
      { code: 'E3', name: 'Enterprise partnership', cost: 'Custom' },
    ],
  },
}

export default function SupportPackagesCards() {
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

  return (
    <section className="py-20 px-6 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Support Packages & Services
          </h2>
          <p className="text-lg text-gray-300">
            Build a support package tailored to your needs, from learning to enterprise transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pricing Calculator */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Build Your Support Package</h3>
              <p className="text-gray-300 text-sm mb-6">Select the capabilities that match your needs:</p>
            </div>

            {Object.entries(CATEGORIES).map(([key, category]) => (
              <div key={key}>
                <div className="mb-3">
                  <h4 className="font-bold text-white">{category.name}</h4>
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
              <h4 className="font-bold text-white mb-4">Your Selection</h4>

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
              <h4 className="font-bold text-white mb-4">Your Context (Optional)</h4>
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
    </section>
  )
}
