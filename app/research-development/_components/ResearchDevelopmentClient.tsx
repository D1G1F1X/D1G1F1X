"use client"

import { LicensingPopup } from "./LicensingPopup"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Cpu,
  Brain,
  Code2,
  Layers,
  Network,
  Zap,
  FlaskConical,
  FileText,
  GitBranch,
  ArrowRight,
  Sparkles,
  Binary,
  Atom,
  Mail,
} from "lucide-react"

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

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/50">
              <BookOpen className="w-5 h-5 mr-2" />
              View Publications
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-400/50 hover:bg-primary-950/30 bg-transparent"
            >
              <GitBranch className="w-5 h-5 mr-2" />
              Open Source Projects
            </Button>
          </div>
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
                  an 8-state dihedral ring. The Cauldron demonstrates complete algebraic-phenomenological duality with
                  connections to E8 lattice structures.
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
                <Link href="/portfolio/numoracle-oracle-cards">
                  <Button variant="link" className="p-0 h-auto text-primary-400 hover:text-primary-300">
                    View Project <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
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
                <Button variant="link" className="p-0 h-auto text-primary-400 hover:text-primary-300">
                  Read Paper <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary-400/50 hover:bg-primary-950/30 bg-transparent"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read Full Paper
                    </Button>
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-400/50 hover:bg-purple-950/30 bg-transparent"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read Full Paper
                    </Button>
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-accent/50 hover:bg-gray-800/50 bg-transparent"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read Documentation
                    </Button>
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
                        RUBIC: Reversible Unified Boundary-Integrated Core Architecture
                      </h3>
                      <Badge variant="outline" className="text-xs whitespace-nowrap border-green-400/50 text-green-300">
                        Sep 2024
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Advanced Computing Architectures Lab</p>
                    <p className="text-gray-300 mb-4">
                      Introduces RUBIC architecture principles for thermodynamically efficient computing through
                      reversible operations, boundary integration, and minimal-history state management. Demonstrates
                      practical implementation patterns and energy efficiency gains.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs bg-green-950/50 text-green-300">
                        Architecture
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-green-950/50 text-green-300">
                        Energy Efficiency
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-green-950/50 text-green-300">
                        Reversibility
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-400/50 hover:bg-green-950/30 bg-transparent"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read Specification
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Framework Overview */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Unified Framework</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              How Cauldron, CORE, and RUBIC interconnect to form a complete computational paradigm
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-900/80 backdrop-blur-sm border border-primary-500/30">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary-500/20">
                Overview
              </TabsTrigger>
              <TabsTrigger value="cauldron" className="data-[state=active]:bg-purple-500/20">
                Cauldron
              </TabsTrigger>
              <TabsTrigger value="core" className="data-[state=active]:bg-primary-500/20">
                CORE/NUMO
              </TabsTrigger>
              <TabsTrigger value="rubic" className="data-[state=active]:bg-accent/20">
                RUBIC
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card className="bg-gray-900/80 backdrop-blur-sm border-primary-500/30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">The Complete Ecosystem</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Our research framework integrates three fundamental components: the <strong>Cauldron</strong>{" "}
                    provides the theoretical quantum foundation with D8 × Z2 symmetry, <strong>CORE/NUMO</strong>{" "}
                    implements constraint-based processing and observable field dynamics, and <strong>RUBIC</strong>{" "}
                    ensures all operations remain reversible and thermodynamically efficient.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                      <Layers className="w-8 h-8 text-purple-400 mb-2" />
                      <h4 className="text-lg font-semibold text-white mb-2">Cauldron</h4>
                      <p className="text-sm text-gray-300">Quantum substrate with exact algebraic structure</p>
                    </div>
                    <div className="p-4 bg-primary-500/10 rounded-lg border border-primary-500/30">
                      <Network className="w-8 h-8 text-primary-400 mb-2" />
                      <h4 className="text-lg font-semibold text-white mb-2">CORE/NUMO</h4>
                      <p className="text-sm text-gray-300">Constraint processing and field observations</p>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
                      <Cpu className="w-8 h-8 text-accent mb-2" />
                      <h4 className="text-lg font-semibold text-white mb-2">RUBIC</h4>
                      <p className="text-sm text-gray-300">Reversible architecture implementation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cauldron" className="mt-6">
              <Card className="bg-gray-900/80 backdrop-blur-sm border-purple-500/30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">The Cauldron: Quantum Foundation</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    The Cauldron represents a 10-state quantum system with perfect D8 × Z2 symmetry, providing the
                    theoretical foundation for all our computational work. It decomposes into a 2-state qubit (light vs.
                    shadow) and an 8-state dihedral ring (the octagonal delta-pair structure).
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Key Properties</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start">
                          <Binary className="w-5 h-5 mr-2 mt-0.5 text-purple-400 flex-shrink-0" />
                          <span>
                            <strong>Exact solvability:</strong> Complete analytical solutions for all state transitions
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Binary className="w-5 h-5 mr-2 mt-0.5 text-purple-400 flex-shrink-0" />
                          <span>
                            <strong>Dual-aspect monism:</strong> Perfect correspondence between algebraic and
                            phenomenological descriptions
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Binary className="w-5 h-5 mr-2 mt-0.5 text-purple-400 flex-shrink-0" />
                          <span>
                            <strong>Octagonal symmetry:</strong> D8 dihedral group with 8 rotations and 8 reflections
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="core" className="mt-6">
              <Card className="bg-gray-900/80 backdrop-blur-sm border-primary-500/30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">CORE/NUMO: Constraint Processing</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    CORE (Constraint-Oriented Reality Engine) and NUMO (Numerological Observable Field) provide the
                    middle layer that translates quantum substrate into observable, meaningful patterns through
                    constraint satisfaction and field dynamics.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Core Functions</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start">
                          <Sparkles className="w-5 h-5 mr-2 mt-0.5 text-primary-400 flex-shrink-0" />
                          <span>
                            <strong>Constraint satisfaction:</strong> Resolves competing requirements into coherent
                            states
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Sparkles className="w-5 h-5 mr-2 mt-0.5 text-primary-400 flex-shrink-0" />
                          <span>
                            <strong>Field observation:</strong> Extracts meaningful patterns from quantum substrate
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Sparkles className="w-5 h-5 mr-2 mt-0.5 text-primary-400 flex-shrink-0" />
                          <span>
                            <strong>Numerological encoding:</strong> Maps abstract states to symbolic representations
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rubic" className="mt-6">
              <Card className="bg-gray-900/80 backdrop-blur-sm border-accent/30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">RUBIC: Reversible Architecture</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    RUBIC (Reversible Unified Boundary-Integrated Core) ensures all computational operations remain
                    time-reversible, minimizing entropy generation and enabling perfect state recovery for debugging,
                    time-travel, and energy efficiency.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Architecture Principles</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start">
                          <Zap className="w-5 h-5 mr-2 mt-0.5 text-accent flex-shrink-0" />
                          <span>
                            <strong>Invertible operations:</strong> Every computational step has an exact inverse
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Zap className="w-5 h-5 mr-2 mt-0.5 text-accent flex-shrink-0" />
                          <span>
                            <strong>Boundary integration:</strong> No rigid interfaces, seamless component interaction
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Zap className="w-5 h-5 mr-2 mt-0.5 text-accent flex-shrink-0" />
                          <span>
                            <strong>Minimal history:</strong> Efficient state checkpointing for rollback capability
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-primary-500/20 to-purple-500/20 backdrop-blur-sm border-primary-500/50">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Collaborate with Our Research Team</h2>
              <p className="text-xl text-gray-300 mb-8">
                Interested in our work? We welcome collaborations, partnerships, and research inquiries.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/50"
                  onClick={() => (window.location.href = "/contact")}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Research Team
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-400/50 hover:bg-primary-950/30 bg-transparent"
                  asChild
                >
                  <Link href="/portfolio">
                    <Code2 className="w-5 h-5 mr-2" />
                    View All Projects
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
