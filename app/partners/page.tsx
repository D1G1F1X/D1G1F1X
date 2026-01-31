'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function PartnersPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">Partner Network</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Bring deals. Earn immediate kickback. Optionally earn recurring management income.
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Two ways to partner: as an originator, or as an Integrated Account Manager (IAM). Performance-based, independent arrangement.
            </p>
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
              <a href="#application">Apply to Partner Network</a>
            </Button>
          </div>
        </section>

        {/* Partner Roles */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">How It Works</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Originator */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Originator</h3>
                <p className="text-gray-300 mb-6">Discovery + intro. You bring opportunities; we handle the delivery.</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Identify opportunities in your network</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Make the introduction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Earn kickback on deal close</span>
                  </li>
                </ul>
              </div>

              {/* IAM */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Integrated Account Manager (IAM)</h3>
                <p className="text-gray-300 mb-6">Relationship continuity + coordination. You own the ongoing relationship.</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Maintain client relationships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Coordinate project logistics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Earn ongoing management fees</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Compensation */}
        <section className="py-20 px-6 bg-gray-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Compensation Bands</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Origination */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Origination Kickback</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                    <p className="font-semibold text-white mb-1">10% — Small deal</p>
                    <p className="text-gray-400 text-sm">Projects under $10K</p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                    <p className="font-semibold text-white mb-1">15% — Mid-market</p>
                    <p className="text-gray-400 text-sm">Projects $10K–$50K</p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                    <p className="font-semibold text-white mb-1">20% — Enterprise</p>
                    <p className="text-gray-400 text-sm">Projects over $50K</p>
                  </div>
                </div>
              </div>

              {/* IAM */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">IAM Monthly Fee</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                    <p className="font-semibold text-white mb-1">5% — Coordination only</p>
                    <p className="text-gray-400 text-sm">Passive engagement</p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                    <p className="font-semibold text-white mb-1">10% — Active management</p>
                    <p className="text-gray-400 text-sm">Regular client touchpoints</p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                    <p className="font-semibold text-white mb-1">15% — Full relationship owner</p>
                    <p className="text-gray-400 text-sm">You drive upsell & retention</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hard Boundaries */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-r from-red-900/20 to-pink-900/20 border-red-500/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-4">IAM Non-Negotiable Boundaries</h3>
              <p className="text-gray-300 mb-6">
                To maintain quality and protect client outcomes, integrated account managers <span className="font-semibold">do NOT</span>:
              </p>
              <ul className="space-y-3">
                {[
                  'Deliver technical work or implementation',
                  'Promise scope or make pricing commitments',
                  'Negotiate terms outside agreed framework',
                  'Represent themselves as Lumen Helix employees',
                  'Commit to deliverables without backoffice approval',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-red-400 flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <span className="text-red-400 font-bold text-xs">✕</span>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 bg-gray-900/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Partner FAQs</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: 'How are payouts tracked?',
                  a: 'All partner payouts are logged in a partner portal. You can see attribution, deal details, and payout schedules in real-time. Everything is auditable and transparent.',
                },
                {
                  q: 'Is this employment?',
                  a: 'No. This is an independent, performance-based arrangement. You maintain your own business relationships and are responsible for your own taxes and compliance.',
                },
                {
                  q: 'Can I be both an Originator and IAM?',
                  a: 'Yes. You can originate deals for other teams and manage accounts where you\'re the right fit. We just need clarity on which hat you\'re wearing on each engagement.',
                },
                {
                  q: 'What if a deal falls through?',
                  a: 'Originator fees are paid when the project closes. If a prospect doesn\'t convert, there\'s no kickback. This keeps everyone aligned on quality.',
                },
                {
                  q: 'How often are IAM fees paid?',
                  a: 'Monthly, on the 15th of the following month. Payments go to the bank account you provide. Minimum payout threshold is $50.',
                },
              ].map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="bg-gray-800/50 border border-gray-700 px-6 rounded-lg">
                  <AccordionTrigger className="text-white hover:text-purple-300">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-300">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Application Form */}
        <section id="application" className="py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Apply to Partner Network</h2>

            <Card className="bg-gray-800/50 border-gray-700 p-8">
              {!formSubmitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setFormSubmitted(true)
                    setTimeout(() => setFormSubmitted(false), 3000)
                  }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Network Type</label>
                    <select
                      required
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                    >
                      <option value="">Select a network type...</option>
                      <option>Consulting / Advisory</option>
                      <option>Technology / SaaS</option>
                      <option>Agency / Services</option>
                      <option>Enterprise / Corporate</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Industries You Serve</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none"
                      placeholder="e.g., Fintech, Healthcare, SaaS..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Typical Deal Size</label>
                    <select className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-purple-400 focus:outline-none">
                      <option>Under $10K</option>
                      <option>$10K–$50K</option>
                      <option>$50K–$100K</option>
                      <option>$100K+</option>
                    </select>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-white mb-4">Interest</p>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="interest" value="originator" defaultChecked className="w-4 h-4" />
                        <span className="text-gray-300 text-sm">Originator only (bring deals)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="interest" value="iam" className="w-4 h-4" />
                        <span className="text-gray-300 text-sm">IAM only (manage accounts)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="interest" value="both" className="w-4 h-4" />
                        <span className="text-gray-300 text-sm">Both (case-by-case)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Tell us about your network and approach</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none resize-none"
                      placeholder="What opportunities or clients are you targeting?"
                    ></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                    Submit Application
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Application Received</h3>
                  <p className="text-gray-300">We'll review your application and reach out within 2 business days.</p>
                </div>
              )}
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}
