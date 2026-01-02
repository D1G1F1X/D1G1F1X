"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Zap, Lightbulb, Shield, Users } from "lucide-react"

export default function OIQPortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-radial from-purple-600 via-transparent to-transparent opacity-30" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_25%,rgba(68,68,68,.2)_50%,transparent_50%,transparent_75%,rgba(68,68,68,.2)_75%,rgba(68,68,68,.2))] bg-[length:60px_60px] animate-pulse" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-full">
            <span className="text-purple-300 text-sm font-semibold">In-House Demo • Active Development</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">OIQ</h1>
          <h2 className="text-2xl md:text-3xl text-purple-300 mb-8 font-light">
            Rewriting the Corporation with a Moral Core
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            A conscious technology platform built for humanity. Combining quantum computing frameworks, ethical AI, and
            community coordination tools to reduce suffering and serve the common good.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="https://oiq.to"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Enter the Lab <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/oiq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/10 transition-all duration-300"
            >
              View on GitHub <Github className="w-4 h-4" />
            </a>
          </div>

          <div className="relative h-96 w-full rounded-xl overflow-hidden border border-purple-500/30 shadow-2xl">
            <Image
              src="/images/projects/oiq-platform.jpg"
              alt="OIQ Platform Dashboard"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Four Pillars Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-white mb-4 text-center">The C.O.R.E. Model</h3>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Four pillars of conscious technology at the foundation of every system we build
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Lightbulb,
                title: "Consciousness",
                description: "Awareness of self, other, and system. The observer effect in action.",
              },
              {
                icon: Shield,
                title: "Observation",
                description: "Data collection with ethical guardrails. Information that serves truth.",
              },
              {
                icon: Zap,
                title: "Resonance",
                description: "Alignment between intention and outcome. Harmony across all systems.",
              },
              {
                icon: Users,
                title: "Evolution",
                description: "Continuous improvement guided by wisdom, not just metrics.",
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-purple-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:border-purple-500/60 transition-all duration-300 group"
              >
                <pillar.icon className="w-12 h-12 text-purple-400 mb-4 group-hover:text-purple-300 transition-colors" />
                <h4 className="text-xl font-semibold text-white mb-3">{pillar.title}</h4>
                <p className="text-gray-400 text-sm">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Projects Section */}
      <section className="py-24 px-4 relative bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-white mb-4 text-center">Active Projects & Research</h3>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            A diverse ecosystem of quantum computing tools, humanitarian initiatives, and consciousness research
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quantum Toys",
                subtitle: "ProjectBreakingBad & Organism World Lab",
                description:
                  "Interactive Three.js demonstrations of quantum mechanics and evolutionary simulations with full auditability and session reports.",
                tags: ["Three.js", "SVG", "Physics", "Visualization"],
              },
              {
                title: "QORE Voice Engine",
                subtitle: "Speech-Driven Computation",
                description:
                  "Transform natural speech into structured computational output. Privacy-first processing that runs entirely in your browser.",
                tags: ["Web Audio", "NLP", "Local Processing", "D8 Framework"],
              },
              {
                title: "Blanket Ohio Project",
                subtitle: "Community Warmth Initiative",
                description:
                  "Coordinated donation and distribution network for winter survival items across Northeast Ohio area codes 330, 440, 216.",
                tags: ["Community", "Logistics", "Coordination", "Social Impact"],
              },
              {
                title: "NUMO Field Research",
                subtitle: "Quantum Consciousness Mathematics",
                description:
                  "10-dimensional mathematical framework bridging quantum mechanics and conscious experience through D8×Z2 symmetry.",
                tags: ["Mathematics", "Quantum", "Consciousness", "Research"],
              },
              {
                title: "Cauldron System",
                subtitle: "10-State Deterministic Kernel",
                description:
                  "Exactly-solvable quantum system using dihedral symmetry. Foundation for blockchain, BMS, and distributed systems.",
                tags: ["Quantum", "Architecture", "Systems", "Symmetry"],
              },
              {
                title: "RUBIC Framework",
                subtitle: "Reversible Computing Ethics",
                description:
                  "Every action can be undone; every decision traced. Reversibility as the foundation of ethical systems design.",
                tags: ["Ethics", "Reversibility", "Design", "Philosophy"],
              },
            ].map((project, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-cyan-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:border-cyan-500/60 transition-all duration-300 group"
              >
                <h4 className="text-xl font-semibold text-white mb-2">{project.title}</h4>
                <p className="text-purple-300 text-sm mb-3">{project.subtitle}</p>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tidx) => (
                    <span
                      key={tidx}
                      className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-white mb-16 text-center">Technology & Frameworks</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-semibold text-white mb-6">Core Infrastructure</h4>
              <ul className="space-y-3">
                {[
                  "D8 × Z2 Symmetry Architecture",
                  "Three.js & WebGL Visualization",
                  "Local Browser Processing",
                  "Web Audio API Integration",
                  "Deterministic State Management",
                  "Open-Source Aligned Stack",
                ].map((tech, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <span className="text-purple-400 font-bold mt-1">✓</span>
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-2xl font-semibold text-white mb-6">Design Philosophy</h4>
              <ul className="space-y-3">
                {[
                  "Consciousness-first design",
                  "Reversible by design",
                  "Privacy-preserving defaults",
                  "Deterministic (fully reproducible)",
                  "Measurement & observability",
                  "Accessibility & inclusivity",
                ].map((phil, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <span className="text-purple-400 font-bold mt-1">✓</span>
                    <span>{phil}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 relative bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-white mb-4 text-center">The Four Loop Colors</h3>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Every decision and system is guided by these principles—the four aspects of ethical technology
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                color: "from-green-600 to-green-500",
                label: "Compassion",
                accent: "text-green-400",
                description: "Technology that eases suffering and centers human dignity.",
              },
              {
                color: "from-blue-600 to-blue-500",
                label: "Wisdom",
                accent: "text-blue-400",
                description: "Systems built on deep understanding, not just data.",
              },
              {
                color: "from-yellow-600 to-yellow-500",
                label: "Innovation",
                accent: "text-yellow-400",
                description: "Pushing boundaries responsibly with solutions that serve.",
              },
              {
                color: "from-red-600 to-red-500",
                label: "Courage",
                accent: "text-red-400",
                description: "Standing firm on ethics, even when it's costly.",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-lg bg-gradient-to-br ${value.color} bg-opacity-10 border border-${value.label.toLowerCase()}-500/30 hover:border-${value.label.toLowerCase()}-500/60 transition-all duration-300`}
              >
                <div className={`text-3xl font-bold ${value.accent} mb-3`}>{value.label}</div>
                <p className="text-gray-300 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Explore?</h3>
          <p className="text-xl text-gray-300 mb-12">
            Join the movement to build conscious technology for humanity. Visit the lab, explore the research, or
            contribute on GitHub.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://oiq.to"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-semibold"
            >
              Visit OIQ.to <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/oiq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/10 transition-all duration-300 font-semibold"
            >
              GitHub Repository <Github className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-cyan-500/50 text-cyan-300 rounded-lg hover:bg-cyan-500/10 transition-all duration-300 font-semibold"
            >
              Contact Research Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
