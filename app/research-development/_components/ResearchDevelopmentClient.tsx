"use client"

import { LicensingPopup } from "./LicensingPopup"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Brain, Layers, Zap, FlaskConical, FileText, ArrowRight, Sparkles, Binary, Atom } from "lucide-react"

export default function ResearchDevelopmentClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
      <LicensingPopup />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        {/* Particle grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184/0.05)_1px,transparent_0)] bg-[size:40px_40px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <FlaskConical className="w-6 h-6 text-primary-400" />
            <Badge variant="outline" className="text-sm border-primary-400/50 text-primary-300 bg-primary-950/30">
              Research & Development Division
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Pioneering the Future
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-accent bg-clip-text text-transparent">
              of Computation
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8 leading-relaxed">
            At Lumen Helix Solutions, our R&D division explores the frontiers of quantum-inspired computing, reversible
            architectures, and advanced AI systems. We bridge theoretical mathematics with practical implementation.
          </p>

          <div className="flex flex-wrap gap-4"></div>
        </div>
      </section>

      {/* Core Research Areas with Generated Images */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Core Research Areas</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our interdisciplinary approach combines pure mathematics, quantum theory, and practical software
              engineering to solve tomorrow's computational challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Quaternionic Computing */}
            <Card className="bg-gray-900/80 backdrop-blur-sm border-primary-500/30 hover:border-primary-500 transition-all group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/abstract-quaternion-mathematics-visualization-with.jpg"
                  alt="Quaternionic Computing Visualization"
                  width={800}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
              <CardHeader>
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Atom className="w-6 h-6 text-primary-400" />
                </div>
                <CardTitle className="text-2xl text-white">Quaternionic Computing</CardTitle>
                <CardDescription className="text-gray-300">
                  Advanced algebraic structures for computation
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Exploring quaternionic algebras as a unifying framework for NUMO Field, Cauldron, and RUBIC systems.
                  Our research demonstrates how quaternions provide associative, numerically stable representations for
                  discrete symmetries and reversible operations.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-primary-400 flex-shrink-0" />
                    <span>D8 × Z2 symmetry representation using unit quaternions</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-primary-400 flex-shrink-0" />
                    <span>Norm-preserving transformations for reversible computing</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-primary-400 flex-shrink-0" />
                    <span>OS-level optimization via symmetry-aware scheduling</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* RUBIC */}
            <Card className="bg-gray-900/80 backdrop-blur-sm border-accent/30 hover:border-accent transition-all group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/reversible-computing-circuit-diagram-with-bidirect.jpg"
                  alt="RUBIC Reversible Computing"
                  width={800}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-2xl text-white">Reversible Computing (RUBIC)</CardTitle>
                <CardDescription className="text-gray-300">
                  Thermodynamically efficient computational architectures
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  The Reversible Unified Boundary-Integrated Core (RUBIC) system implements time-reversible computation
                  where every operation is invertible, minimizing energy dissipation and enabling perfect state
                  recovery.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Zap className="w-4 h-4 mr-2 mt-0.5 text-accent flex-shrink-0" />
                    <span>Reversible Processing Units (RPUs) with invertible logic gates</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-4 h-4 mr-2 mt-0.5 text-accent flex-shrink-0" />
                    <span>Boundary-integrated architecture eliminating rigid interfaces</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-4 h-4 mr-2 mt-0.5 text-accent flex-shrink-0" />
                    <span>Minimal-history state registry for efficient rollback</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Cauldron */}
            <Card className="bg-gray-900/80 backdrop-blur-sm border-purple-500/30 hover:border-purple-500 transition-all group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/quantum-state-visualization-with-10-interconnected.jpg"
                  alt="The Cauldron System"
                  width={800}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-2xl text-white">The Cauldron System</CardTitle>
                <CardDescription className="text-gray-300">
                  10-state quantum universe with exact dual-aspect monism
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  A minimal exactly-solvable quantum system with D8 × Z2 symmetry, decomposing into a 2-state qubit and
                  an 8-state dihedral ring. The Cauldron demonstrates complete algebraic structure with D8 × Z2
                  symmetry, Clifford algebra Cl(0,8) embedding, and connections to SO(8) triality and E8 root lattice.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Binary className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" />
                    <span>Four canonical delta-pairs with octagonal reflection symmetry</span>
                  </li>
                  <li className="flex items-start">
                    <Binary className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" />
                    <span>SO(8) triality and minimal nontrivial spinor representation</span>
                  </li>
                  <li className="flex items-start">
                    <Binary className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" />
                    <span>Five-suit symbolic system mapping to elemental oppositions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* AI Research */}
            <Card className="bg-gray-900/80 backdrop-blur-sm border-green-500/30 hover:border-green-500 transition-all group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/artificial-intelligence-neural-network-with-glowin.jpg"
                  alt="AI Research"
                  width={800}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle className="text-2xl text-white">Artificial Intelligence Research</CardTitle>
                <CardDescription className="text-gray-300">Next-generation AI systems and applications</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="mb-4">
                  Developing advanced AI systems that integrate with our computational frameworks, from large language
                  model applications to quantum-inspired neural architectures and symbolic AI reasoning systems.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                    <span>LLM-powered analysis and content generation systems</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                    <span>Symbolic reasoning integrated with neural networks</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                    <span>AI-assisted software development and optimization tools</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Active Research Projects</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From theoretical foundations to production-ready implementations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900/80 backdrop-blur-sm border-green-500/30 hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/20">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                <CardTitle className="text-xl text-white">NUMO Oracle Platform</CardTitle>
                <CardDescription className="text-gray-300">Commercial quantum divination system</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-200">
                <p className="text-sm mb-4">
                  Production implementation of NUMO Field mathematics in an interactive oracle card platform, deployed
                  at numoracle.com with over 1,000 active users.
                </p>
                <Link href="/portfolio/numoracle-oracle-cards"></Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-blue-500/30 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-blue-500/20 text-blue-400 border-blue-500/30">Research</Badge>
                <CardTitle className="text-xl text-white">Quaternionic OS Layer</CardTitle>
                <CardDescription className="text-gray-300">Linux kernel optimization via Q-layer</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-200">
                <p className="text-sm mb-4">
                  eBPF-based instrumentation suite implementing symmetry-aware scheduling and memory management using
                  quaternionic state encodings for Red Hat ecosystem.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-purple-500/30 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-purple-500/20 text-purple-400 border-purple-500/30">Beta</Badge>
                <CardTitle className="text-xl text-white">M.E.L.T. Platform</CardTitle>
                <CardDescription className="text-gray-300">
                  Threat monitoring with reversible architecture
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-200">
                <p className="text-sm mb-4">
                  Real-time enforcement alert system built on RUBIC principles with fully reversible state tracking and
                  boundary-integrated data flow.
                </p>
                <Link href="/portfolio/melt">
                  <Button variant="link" className="p-0 h-auto text-primary-400 hover:text-primary-300">
                    View Project <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Research Publications */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Research Publications</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Peer-reviewed papers and technical documentation</p>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-900/80 backdrop-blur-sm border-blue-500/30 hover:border-blue-500 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Observer-Relative Causality and Coupled-Cone Distinguishers in Elementary Cellular Automata
                      </h3>
                      <Badge variant="outline" className="text-xs whitespace-nowrap border-blue-400/50 text-blue-300">
                        Jan 2026
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Christopher Gordon Phillips, Lumen Helix Solutions</p>
                    <p className="text-gray-100 mb-4">
                      Introduces the Cone-Nonlocality Test (CNLT), an observer-relative causal invariant that classifies
                      discrete dynamical systems by their bounded causal cone structure. Demonstrates that coupled-cone
                      observers reveal nonlocal correlations in Rule 30 that single observers cannot detect,
                      establishing an observer hierarchy that separates reversible, linear, and chaotic dynamics through
                      DFA minimization.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs bg-blue-950/50 text-blue-300">
                        Cellular Automata
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-blue-950/50 text-blue-300">
                        Observer Theory
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-blue-950/50 text-blue-300">
                        Causal Cones
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-blue-950/50 text-blue-300">
                        Computational Complexity
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-cyan-500/30 hover:border-cyan-500 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Exact Dyadic Noncommutative Lift of Collatz-Like Dynamics with Bijective Branch-Bit Extension
                      </h3>
                      <Badge variant="outline" className="text-xs whitespace-nowrap border-cyan-400/50 text-cyan-300">
                        Jan 2026
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Christopher Gordon Phillips, Lumen Helix Solutions</p>
                    <p className="text-gray-100 mb-4">
                      Formalizes an exact arithmetic dynamical system on dyadic Gaussian rationals that lifts
                      parity-controlled Collatz-like evolution into noncommutative complex affine maps. Demonstrates
                      non-injectivity of the base map and constructs a minimal bijective extension via a single branch
                      bit, providing exact reproducible computation with certified bounds and a central conjecture on
                      real-axis non-return dynamics.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs bg-cyan-950/50 text-cyan-300">
                        Dynamical Systems
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-cyan-950/50 text-cyan-300">
                        Number Theory
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-cyan-950/50 text-cyan-300">
                        Reversibility
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-cyan-950/50 text-cyan-300">
                        Exact Arithmetic
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-indigo-500/30 hover:border-indigo-500 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Quaternionic Unification Across Cauldron, CORE/NUMO, and RUBIC Systems
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs whitespace-nowrap border-indigo-400/50 text-indigo-300"
                      >
                        Dec 2025
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      Christopher Gordon Phillips (Raziel Ali) and Astra, Lumen Helix Solutions
                    </p>
                    <p className="text-gray-100 mb-4">
                      Proposes quaternionic algebra as a practical middle layer unifying the Cauldron's D8 × Z2 quantum
                      symmetry, CORE/NUMO's canonical delta-pair reflections, and RUBIC's reversible boundary-integrated
                      architecture. Outlines OS-level implementation targeting Red Hat ecosystem via eBPF and kernel
                      modules for symmetry-aware scheduling and performance optimization.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs bg-indigo-950/50 text-indigo-300">
                        Quaternions
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-indigo-950/50 text-indigo-300">
                        Symmetry
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-indigo-950/50 text-indigo-300">
                        OS Architecture
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-indigo-950/50 text-indigo-300">
                        Reversible Computing
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-primary-500/30 hover:border-primary-500 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Quaternionic Unification Across the Cauldron, CORE/NUMO, and RUBIC Systems
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs whitespace-nowrap border-primary-400/50 text-primary-300"
                      >
                        Dec 2024
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      Christopher Gordon Phillips (Raziel Ali) and Astra (AI collaborator)
                    </p>
                    <p className="text-gray-300 mb-4">
                      Proposes a quaternionic middle layer unifying three components of the NUMO Field ecosystem,
                      demonstrating how quaternions provide practical associative algebra for delta-pair reflections,
                      ring rotations, and reversible update rules. Includes OS-level implementation path for Red Hat
                      ecosystem.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs bg-primary-950/50 text-primary-300">
                        Quaternions
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-primary-950/50 text-primary-300">
                        Reversible Computing
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-primary-950/50 text-primary-300">
                        D8 Symmetry
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-primary-950/50 text-primary-300">
                        OS Optimization
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-purple-500/30 hover:border-purple-500 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        The Cauldron: A Minimal Exactly-Solvable 10-State Quantum Universe with D8 × Z2 Symmetry
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs whitespace-nowrap border-purple-400/50 text-purple-300"
                      >
                        Nov 2024
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Lumen Helix Solutions Research Division</p>
                    <p className="text-gray-300 mb-4">
                      Presents the Cauldron model as the cleanest known finite-dimensional example of exact dual-aspect
                      monism. Demonstrates complete algebraic structure with D8 × Z2 symmetry, Clifford algebra Cl(0,8)
                      embedding, and connections to SO(8) triality and E8 root lattice.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs bg-purple-950/50 text-purple-300">
                        Quantum Systems
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-purple-950/50 text-purple-300">
                        Dihedral Symmetry
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-purple-950/50 text-purple-300">
                        Clifford Algebras
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-purple-950/50 text-purple-300">
                        E8 Lattice
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-accent/30 hover:border-accent transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Glossary and Analysis of NUMO Field, Cauldron, and RUBIC Frameworks
                      </h3>
                      <Badge variant="outline" className="text-xs whitespace-nowrap border-accent/50 text-accent">
                        Oct 2024
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Lumen Helix Solutions Research Team</p>
                    <p className="text-gray-300 mb-4">
                      Comprehensive glossary defining technical terms, symbolic representations, and mathematical
                      structures across the NUMO Field ecosystem. Includes detailed explanations of delta-pairs,
                      octagonal symmetry, and reversible computation principles.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                        Documentation
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                        Technical Reference
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                        Framework Analysis
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-green-500/30 hover:border-green-500 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Glossary and Analysis of NUMO Field, Cauldron, and RUBIC Frameworks
                      </h3>
                      <Badge variant="outline" className="text-xs whitespace-nowrap border-green-400/50 text-green-300">
                        Oct 2024
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Lumen Helix Solutions Research Team</p>
                    <p className="text-gray-300 mb-4">
                      Comprehensive glossary defining technical terms, symbolic representations, and mathematical
                      structures across the NUMO Field ecosystem. Includes detailed explanations of delta-pairs,
                      octagonal symmetry, and reversible computation principles.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                        Documentation
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                        Technical Reference
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                        Framework Analysis
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
