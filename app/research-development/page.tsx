import Link from "next/link"
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
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Research & Development | Lumen Helix Solutions",
  description:
    "Pioneering advanced computing architectures, quaternionic systems, and AI research. Explore our work in NUMO Field, Cauldron quantum systems, RUBIC reversible computing, and cutting-edge AI applications.",
}

export default function ResearchDevelopmentPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-background to-accent/5 -z-10" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-6">
            <FlaskConical className="w-6 h-6 text-primary-500" />
            <Badge variant="outline" className="text-sm border-primary-500/50">
              Research & Development Division
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Pioneering the Future
            <br />
            <span className="text-gradient bg-gradient-to-r from-primary-400 via-accent to-primary-600 bg-clip-text text-transparent">
              of Computation
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8 leading-relaxed">
            At Lumen Helix Solutions, our R&D division explores the frontiers of quantum-inspired computing, reversible
            architectures, and advanced AI systems. We bridge theoretical mathematics with practical implementation.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
              <BookOpen className="w-5 h-5 mr-2" />
              View Publications
            </Button>
            <Button size="lg" variant="outline">
              <GitBranch className="w-5 h-5 mr-2" />
              Open Source Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Core Research Areas */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Core Research Areas</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our interdisciplinary approach combines pure mathematics, quantum theory, and practical software
              engineering to solve tomorrow's computational challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-primary-500/20 hover:border-primary-500/50 transition-all">
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

            <Card className="bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/50 transition-all">
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

            <Card className="bg-card/50 backdrop-blur-sm border-primary-500/20 hover:border-primary-500/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-primary-400" />
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
                    <Binary className="w-4 h-4 mr-2 mt-0.5 text-primary-400 flex-shrink-0" />
                    <span>Four canonical delta-pairs with octagonal reflection symmetry</span>
                  </li>
                  <li className="flex items-start">
                    <Binary className="w-4 h-4 mr-2 mt-0.5 text-primary-400 flex-shrink-0" />
                    <span>SO(8) triality and minimal nontrivial spinor representation</span>
                  </li>
                  <li className="flex items-start">
                    <Binary className="w-4 h-4 mr-2 mt-0.5 text-primary-400 flex-shrink-0" />
                    <span>Five-suit symbolic system mapping to elemental oppositions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/50 transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-accent" />
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
                    <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-accent flex-shrink-0" />
                    <span>LLM-powered analysis and content generation systems</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-accent flex-shrink-0" />
                    <span>Symbolic reasoning integrated with neural networks</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="w-4 h-4 mr-2 mt-0.5 text-accent flex-shrink-0" />
                    <span>AI-assisted software development and optimization tools</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-500/5 to-accent/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Active Research Projects</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From theoretical foundations to production-ready implementations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
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

            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
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

            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
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
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Research Publications</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Peer-reviewed papers and technical documentation</p>
          </div>

          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary-500/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        Quaternionic Unification Across the Cauldron, CORE/NUMO, and RUBIC Systems
                      </h3>
                      <Badge variant="outline" className="text-xs whitespace-nowrap">
                        Dec 2025
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
                      <Badge variant="secondary" className="text-xs">
                        Quaternions
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Reversible Computing
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        D8 Symmetry
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        OS Optimization
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read Full Paper
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary-500/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        The Cauldron: A Minimal Exactly-Solvable 10-State Quantum Universe with D8 × Z2 Symmetry
                      </h3>
                      <Badge variant="outline" className="text-xs whitespace-nowrap">
                        Nov 2025
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Lumen Helix Solutions Research Division</p>
                    <p className="text-gray-300 mb-4">
                      Presents the Cauldron model as the cleanest known finite-dimensional example of exact dual-aspect
                      monism. Demonstrates complete algebraic structure with D8 × Z2 symmetry, Clifford algebra Cl(0,8)
                      embedding, and connections to SO(8) triality and E8 root lattice.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">
                        Quantum Systems
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Dihedral Symmetry
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Clifford Algebras
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        E8 Lattice
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read Full Paper
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary-500/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        Fixing the Canonical Ordering of the Delta-Pairs in NUMO Field Systems
                      </h3>
                      <Badge variant="outline" className="text-xs whitespace-nowrap">
                        2025
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Lumen Helix Solutions Research Division</p>
                    <p className="text-gray-300 mb-4">
                      Defines canonical ordering for delta-pair reflection axes using the quadratic moment functional.
                      Establishes deterministic labeling that removes arbitrary choices while preserving the underlying
                      D8 octagonal symmetry.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">
                        Group Theory
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Canonical Forms
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Symmetry Breaking
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read Full Paper
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary-500/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        RUBIC: Reversible Unified Boundary-Integrated Core System Architecture
                      </h3>
                      <Badge variant="outline" className="text-xs whitespace-nowrap">
                        Nov 2025
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">Lumen Helix Solutions Research Division</p>
                    <p className="text-gray-300 mb-4">
                      Introduces RUBIC architecture where every operation is time-reversible and system boundaries are
                      active integrated elements. Presents Reversible Processing Units (RPUs), Boundary Managers,
                      push-pull data flow paradigm, and applications to thermodynamically efficient computing.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">
                        Reversible Computing
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Architecture
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Energy Efficiency
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Information Theory
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read Full Paper
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Framework Overview */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-500/5 to-accent/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Framework Integration</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              How our research frameworks interconnect to form a unified computational paradigm
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary-500/20">
                Overview
              </TabsTrigger>
              <TabsTrigger value="numo" className="data-[state=active]:bg-primary-500/20">
                NUMO Field
              </TabsTrigger>
              <TabsTrigger value="cauldron" className="data-[state=active]:bg-primary-500/20">
                Cauldron
              </TabsTrigger>
              <TabsTrigger value="rubic" className="data-[state=active]:bg-primary-500/20">
                RUBIC
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Unified Computational Paradigm</CardTitle>
                  <CardDescription className="text-gray-300">
                    Three frameworks working in harmony to create reversible, symmetric, quantum-inspired computing
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-200 space-y-4">
                  <p>
                    Our research demonstrates that the NUMO Field, Cauldron, and RUBIC systems form a coherent
                    computational paradigm united by fundamental principles of symmetry, reversibility, and duality:
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 my-6">
                    <div className="p-4 bg-primary-500/10 rounded-lg border border-primary-500/20">
                      <h4 className="font-semibold text-white mb-2 flex items-center">
                        <Network className="w-5 h-5 mr-2 text-primary-400" />
                        NUMO Field
                      </h4>
                      <p className="text-sm text-gray-300">
                        Discrete backbone with delta-pairs and D8 symmetry providing canonical state labeling
                      </p>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <h4 className="font-semibold text-white mb-2 flex items-center">
                        <Layers className="w-5 h-5 mr-2 text-accent" />
                        Cauldron
                      </h4>
                      <p className="text-sm text-gray-300">
                        10-state quantum system realizing exact dual-aspect monism with SO(8) triality
                      </p>
                    </div>
                    <div className="p-4 bg-primary-500/10 rounded-lg border border-primary-500/20">
                      <h4 className="font-semibold text-white mb-2 flex items-center">
                        <Cpu className="w-5 h-5 mr-2 text-primary-400" />
                        RUBIC
                      </h4>
                      <p className="text-sm text-gray-300">
                        Reversible computing architecture with boundary integration and time-invertible operations
                      </p>
                    </div>
                  </div>

                  <p>
                    The quaternionic unification layer bridges all three, providing associative algebra for rotations,
                    reflections, and norm-preserving transformations that can be implemented efficiently in modern
                    operating systems.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="numo" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">NUMO Field Framework</CardTitle>
                  <CardDescription className="text-gray-300">
                    Mathematical foundation with D8 octagonal symmetry
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-200 space-y-4">
                  <p>
                    The NUMO Field establishes a discrete ring of states (2 through 9) with embedded symmetry operations
                    forming the dihedral group D8. This provides the geometric and algebraic backbone for both symbolic
                    and computational applications.
                  </p>

                  <h4 className="font-semibold text-white mt-6 mb-3">Key Components:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Loop Operator (L):</span>
                        <span className="text-gray-300">
                          {" "}
                          The 8-cycle generates rotations around the octagonal ring, defining a canonical orientation
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Delta-Pairs:</span>
                        <span className="text-gray-300">
                          {" "}
                          Four antipodal pairs corresponding to reflection axes through the octagon center
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Quadratic Moment:</span>
                        <span className="text-gray-300">
                          {" "}
                          Function provides canonical ordering of delta-pairs without external reference
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Applications:</span>
                        <span className="text-gray-300">
                          {" "}
                          Numerological systems, oracle platforms, symbolic computation, state machine design
                        </span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cauldron" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">The Cauldron Quantum System</CardTitle>
                  <CardDescription className="text-gray-300">
                    Minimal exactly-solvable 10-state universe with dual-aspect monism
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-200 space-y-4">
                  <p>
                    The Cauldron is a 10-dimensional Hilbert space that decomposes into a 2-state qubit combined with an
                    8-state ring, carrying full D8 × Z2 symmetry. It represents the cleanest known finite example where
                    algebraic and phenomenological descriptions are in exact one-to-one correspondence.
                  </p>

                  <h4 className="font-semibold text-white mt-6 mb-3">Mathematical Structure:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Symmetry Group:</span>
                        <span className="text-gray-300">
                          {" "}
                          D8 × Z2 with 8 rotations, 8 reflections on the ring, and a qubit flip operation
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Clifford Algebra:</span>
                        <span className="text-gray-300">
                          {" "}
                          Delta-pair operators generate part of Cl(0,8), connecting to spinor representations and SO(8)
                          triality
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-white">E8 Connection:</span>
                        <span className="text-gray-300">
                          {" "}
                          The 10D space lies one projection away from the 240-root lattice of the exceptional E8 Lie
                          group
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Symbolic Mapping:</span>
                        <span className="text-gray-300">
                          {" "}
                          Five-suit system maps to elemental oppositions with exact algebraic correspondence
                        </span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rubic" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">RUBIC Architecture</CardTitle>
                  <CardDescription className="text-gray-300">
                    Reversible Unified Boundary-Integrated Core computing system
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-200 space-y-4">
                  <p>
                    RUBIC realizes reversible computing at the architectural level, treating every operation as
                    invertible and every system boundary as an active component. This enables thermodynamically
                    efficient computation with perfect state recovery.
                  </p>

                  <h4 className="font-semibold text-white mt-6 mb-3">Core Components:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Reversible Processing Units (RPUs):</span>
                        <span className="text-gray-300">
                          {" "}
                          Execute computations using reversible gates that preserve all input information through
                          ancillary bits or invertible algorithms
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Boundary Manager:</span>
                        <span className="text-gray-300">
                          {" "}
                          Makes inter-module interfaces reversible by logging every crossing with full context for exact
                          rollback
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Memory & State Registry:</span>
                        <span className="text-gray-300">
                          {" "}
                          Records minimal differential state using checkpoint stacks for efficient reversibility
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Push-Pull Data Flow:</span>
                        <span className="text-gray-300">
                          {" "}
                          Forward operations push data and log hooks; reverse operations pull states back in opposite
                          order
                        </span>
                      </div>
                    </li>
                  </ul>

                  <h4 className="font-semibold text-white mt-6 mb-3">Benefits:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-primary-500/5 rounded border border-primary-500/20">
                      <p className="text-sm">
                        <span className="font-semibold text-white">Energy Efficiency:</span> Minimizes heat generation
                        through reversible operations
                      </p>
                    </div>
                    <div className="p-3 bg-primary-500/5 rounded border border-primary-500/20">
                      <p className="text-sm">
                        <span className="font-semibold text-white">Perfect Rollback:</span> Any computation can be
                        exactly undone to previous states
                      </p>
                    </div>
                    <div className="p-3 bg-primary-500/5 rounded border border-primary-500/20">
                      <p className="text-sm">
                        <span className="font-semibold text-white">Unified Design:</span> Hardware, firmware, and
                        software layers work as integrated whole
                      </p>
                    </div>
                    <div className="p-3 bg-primary-500/5 rounded border border-primary-500/20">
                      <p className="text-sm">
                        <span className="font-semibold text-white">Audit Trail:</span> Complete provenance tracking for
                        all operations and state changes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Software Development Excellence */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Software Development Research</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advancing the practice of software engineering through research-driven innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <Code2 className="w-10 h-10 text-primary-400 mb-3" />
                <CardTitle className="text-lg text-white">Type Systems & Safety</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="text-sm">
                  Exploring advanced type systems, dependent types, and formal verification methods to eliminate entire
                  classes of bugs at compile time.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <Network className="w-10 h-10 text-accent mb-3" />
                <CardTitle className="text-lg text-white">Distributed Systems</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="text-sm">
                  Researching consensus algorithms, eventual consistency models, and fault-tolerant architectures for
                  large-scale distributed applications.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <Zap className="w-10 h-10 text-primary-400 mb-3" />
                <CardTitle className="text-lg text-white">Performance Optimization</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="text-sm">
                  Developing compiler optimizations, runtime improvements, and algorithmic enhancements that push the
                  boundaries of computational efficiency.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <GitBranch className="w-10 h-10 text-accent mb-3" />
                <CardTitle className="text-lg text-white">Version Control & CI/CD</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="text-sm">
                  Innovating in continuous integration, deployment pipelines, and version control strategies that enable
                  rapid, reliable software delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <Brain className="w-10 h-10 text-primary-400 mb-3" />
                <CardTitle className="text-lg text-white">AI-Assisted Development</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="text-sm">
                  Building tools that leverage large language models and machine learning to assist developers with code
                  generation, refactoring, and debugging.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <Layers className="w-10 h-10 text-accent mb-3" />
                <CardTitle className="text-lg text-white">Architecture Patterns</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p className="text-sm">
                  Researching and documenting software architecture patterns that balance maintainability, scalability,
                  and development velocity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-500/10 to-accent/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Join Our Research Journey</h2>
          <p className="text-xl text-gray-300 mb-8">
            We're always looking for collaborators, researchers, and forward-thinking organizations interested in
            pushing the boundaries of computation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
              <Mail className="w-5 h-5 mr-2" />
              Collaborate With Us
            </Button>
            <Button size="lg" variant="outline">
              <BookOpen className="w-5 h-5 mr-2" />
              Access Research Portal
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
