'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import SupportPackagesCards from '@/components/support-packages-cards'

export default function DiagnosticPage() {
  const [scrolled, setScrolled] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Sticky CTA Bar */}
      {scrolled && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
            <p className="text-white font-semibold hidden sm:block">Ready to fix your workflow?</p>
            <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
              <a href="#intake-form">Start Diagnostic</a>
            </Button>
          </div>
        </div>
      )}

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-teal-500/20 text-teal-300 border-teal-500/30">Workflow Clarity</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Make AI actually save time—by fixing the workflow, not stacking tools.
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              A fixed-scope diagnostic that pinpoints your bottleneck, explains the root cause, and delivers a priority fix map.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold">
                <a href="#intake-form">Start Diagnostic</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <a href="#deliverables">See Deliverables</a>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 bg-teal-400 rounded-full"></span>
                Fixed scope
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 bg-teal-400 rounded-full"></span>
                Async-first
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 bg-teal-400 rounded-full"></span>
                Clarity guarantee
              </span>
            </div>
          </div>
        </section>

        {/* Problem Recognition Section */}
        <section className="py-16 px-6 bg-gray-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">The Challenge You Face</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                'We have AI tools… but nothing got easier.',
                'Automation exists, but it doesn\'t connect end-to-end.',
                'The team still decides manually—AI just adds steps.',
                'We keep trying new tools instead of fixing the system.',
              ].map((problem, idx) => (
                <div key={idx} className="flex gap-4 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    </div>
                  </div>
                  <p className="text-gray-300">{problem}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Offer Block */}
        <section id="deliverables" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">System Clarity Diagnostic</h2>
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* What You Get */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">What You Get</h3>
                <ul className="space-y-4">
                  {['Bottleneck map', 'Root cause diagnosis', 'Priority fix map', 'Next-step options (only if warranted)'].map(
                    (item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* What It's Not */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">What It's Not</h3>
                <ul className="space-y-4">
                  {['Not open-ended consulting', 'Not upsell bait', 'Not generic AI tips', 'Not a commitment'].map(
                    (item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex-shrink-0 mt-0.5"></div>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Scope Boundary */}
            <Card className="bg-gradient-to-r from-teal-900/20 to-cyan-900/20 border-teal-500/30 p-8 mb-12">
              <h4 className="text-teal-400 font-bold mb-4">Scope Boundary</h4>
              <div className="grid md:grid-cols-3 gap-6 text-gray-300">
                <div>
                  <p className="font-semibold text-white mb-2">One workflow</p>
                  <p className="text-sm">A single decision loop or process</p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">One primary goal</p>
                  <p className="text-sm">Clear success criteria</p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">One stack context</p>
                  <p className="text-sm">Your current tools & constraints</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6 bg-gray-900/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Intake', desc: '10–15 min questionnaire' },
                { step: '02', title: 'Async Review', desc: 'Deep analysis of your workflow' },
                { step: '03', title: 'Diagnostic', desc: 'Written report delivered' },
                { step: '04', title: 'Optional Call', desc: 'Only if clarification needed' },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                    <div className="text-4xl font-bold text-teal-400 mb-4">{item.step}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                  {idx < 3 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Trusted by Teams</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                { metric: '50+', label: 'Projects Delivered' },
                { metric: '98%', label: 'Client Satisfaction' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-5xl font-bold text-teal-400 mb-2">{stat.metric}</div>
                  <p className="text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Portfolio Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'Enterprise Workflow Clarity', outcome: 'Reduced manual review cycles by 60%' },
                { title: 'SaaS Integration Strategy', outcome: 'Cut tool switching time in half' },
              ].map((card, idx) => (
                <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 hover:border-teal-500/50 transition-colors">
                  <h4 className="text-lg font-bold text-white mb-4">{card.title}</h4>
                  <p className="text-gray-300">
                    <span className="text-teal-400 font-semibold">Outcome: </span>
                    {card.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Packages Cards */}
        <SupportPackagesCards />

        {/* FAQ */}
        <section className="py-20 px-6 bg-gray-900/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: 'Do I need a call?',
                  a: 'Not necessarily. Diagnostics are delivered in writing. We only schedule a call if your intake reveals questions that warrant real-time discussion.',
                },
                {
                  q: 'Is this consulting?',
                  a: 'No. This is a fixed-scope diagnostic. We identify the problem and map next steps, but we don\'t implement or provide ongoing strategy.',
                },
                {
                  q: 'What if you can\'t help?',
                  a: 'If we identify that your issue requires specialist services outside our scope, we\'ll be honest about it and point you in the right direction.',
                },
                {
                  q: 'Will you push a retainer?',
                  a: 'No. We deliver the diagnostic as promised. If you want follow-up work, you can decide that after you see the findings.',
                },
              ].map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="bg-gray-800/50 border border-gray-700 px-6 rounded-lg">
                  <AccordionTrigger className="text-white hover:text-teal-300">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-300">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Intake Form Section */}
        <section id="intake-form" className="py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Start Your Diagnostic</h2>
            <Card className="bg-gray-800/50 border-gray-700 p-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  alert('Form submitted! We will be in touch shortly.')
                }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Company</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Role</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none"
                      placeholder="Your role"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Primary Goal</label>
                  <select className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-teal-400 focus:outline-none">
                    <option value="">Select a goal...</option>
                    <option>Reduce manual work</option>
                    <option>Improve data flow</option>
                    <option>Cut tool costs</option>
                    <option>Speed up decision-making</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Current Tools</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none"
                    placeholder="e.g., Zapier, n8n, Make, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Biggest Friction Point</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none"
                    placeholder="What slows you down most?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Constraints</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none"
                    placeholder="Budget, timeline, compliance needs..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">What Have You Tried?</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none resize-none"
                    placeholder="Tell us what you've already attempted..."
                  ></textarea>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 accent-teal-500" />
                  <span className="text-sm text-gray-300">
                    If this reveals a deeper structural issue, I'm open to a short clarity call.
                  </span>
                </label>

                <Button type="submit" size="lg" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold">
                  Start Diagnostic
                </Button>
              </form>
            </Card>

            <div className="mt-8 p-6 bg-gray-800/30 border border-gray-700 rounded-lg">
              <p className="text-sm text-gray-400 text-center">
                <span className="font-semibold">Free tier note:</span> Free resources are educational only; no customization,
                support, or guarantees at that level.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
