"use client"

import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Zap, Target, TrendingUp, Database, Microscope, CheckCircle2, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function QuantumOptimizedPage() {
  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Quantum Optimized Services"
        badgeVariant="accent"
        title="Next-Generation Optimization Through Quantum-Inspired Computing"
        subtitle="Solve complex problems 30x faster using QUBO formulation and quantum-inspired algorithms"
      />

      {/* Glowing orbs for visual effect */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-magenta-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-16 relative z-10">
        {/* Overview Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            The Future of Complex Optimization
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed text-center">
            Quantum-inspired computing represents a fundamental shift in how we approach optimization problems. By
            leveraging Quadratic Unconstrained Binary Optimization (QUBO) formulations and quantum-inspired algorithms,
            we deliver solutions that are faster, more efficient, and inherently more scalable than classical approaches.
          </p>

          <div className="bg-cyan-900/20 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/30 mb-12">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Why Quantum-Inspired Optimization?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Zap className="h-6 w-6 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">30x Performance Improvement</h4>
                  <p className="text-gray-300">
                    Quantum-inspired approaches achieve dramatically faster convergence on complex optimization problems
                    compared to classical solvers, reducing computational time from days to hours.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Target className="h-6 w-6 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Interpretable Solutions</h4>
                  <p className="text-gray-300">
                    Unlike black-box AI models, QUBO solutions produce human-readable profiles and decision rules that
                    stakeholders can understand, verify, and trust—critical for regulated industries.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <TrendingUp className="h-6 w-6 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Scalable Architecture</h4>
                  <p className="text-gray-300">
                    QUBO formulations scale elegantly, enabling optimization of problems with hundreds to thousands of
                    binary variables—solving challenges that classical methods struggle with.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Overview Image */}
        <div className="mb-20">
          <div className="rounded-xl overflow-hidden border border-cyan-500/30">
            <Image
              src="/images/services/quantum-optimization-overview.jpg"
              alt="Quantum Optimization Overview"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Service Offerings */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Quantum Optimization Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* QUBO Formulation Service */}
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300">
              <div className="w-14 h-14 flex items-center justify-center bg-cyan-500/20 rounded-full mb-6 border border-cyan-500/30">
                <Database className="h-7 w-7 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">QUBO Formulation & Design</h3>
              <p className="text-gray-300 mb-6">
                We transform your complex optimization problems into QUBO instances—a universal representation that can
                be solved by quantum, quantum-inspired, and classical solvers.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Problem-to-QUBO conversion and validation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Constraint embedding and penalty tuning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Scalability analysis and optimization</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/20 bg-transparent">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Clinical Feature Selection */}
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300">
              <div className="w-14 h-14 flex items-center justify-center bg-cyan-500/20 rounded-full mb-6 border border-cyan-500/30">
                <Microscope className="h-7 w-7 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Clinical & Healthcare Optimization</h3>
              <p className="text-gray-300 mb-6">
                Apply quantum-inspired optimization to biomarker selection, patient profiling, and precision medicine
                diagnostics with interpretable, clinically-validated results.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Biomarker profile extraction</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Feature discretization and binning strategies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Clinical validation and cross-validation</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/20 bg-transparent">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Solver Selection & Benchmarking */}
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300">
              <div className="w-14 h-14 flex items-center justify-center bg-cyan-500/20 rounded-full mb-6 border border-cyan-500/30">
                <TrendingUp className="h-7 w-7 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Solver Selection & Benchmarking</h3>
              <p className="text-gray-300 mb-6">
                We evaluate and benchmark multiple solving approaches—quantum hardware, quantum-inspired heuristics, and
                classical solvers—to recommend the optimal solution for your specific problem.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Classical solver comparison (Gurobi, CPLEX, etc.)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Quantum hardware provider evaluation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Performance benchmarking and cost analysis</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/20 bg-transparent">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Quantum Hardware Integration */}
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300">
              <div className="w-14 h-14 flex items-center justify-center bg-cyan-500/20 rounded-full mb-6 border border-cyan-500/30">
                <Zap className="h-7 w-7 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Quantum Hardware Integration</h3>
              <p className="text-gray-300 mb-6">
                For customers ready to leverage quantum computing, we provide end-to-end quantum hardware integration,
                including problem embedding, execution, and result post-processing.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">IBM, D-Wave, and other quantum platform integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Circuit compilation and error mitigation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Hybrid classical-quantum workflows</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/20 bg-transparent">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* QUBO Process Visualization */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">The QUBO Profile Extraction Process</h2>
          <div className="rounded-xl overflow-hidden border border-cyan-500/30 mb-12">
            <Image
              src="/images/services/qubo-profile-extraction-process.jpg"
              alt="QUBO Profile Extraction Process"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>
          <p className="text-gray-300 text-center mb-12 text-lg">
            Our proprietary QUBO Profile Extraction methodology transforms continuous clinical features into interpretable
            binary profiles that achieve 100% precision in identifying malignant phenotypes while preserving clinical
            explainability.
          </p>
        </div>

        {/* Case Study: QUBO Profile Extraction */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-gradient-to-r from-cyan-900/70 to-magenta-900/70 backdrop-blur-sm p-12 rounded-xl border border-cyan-500/30 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Case Study: QUBO-Based Breast Cancer Biomarker Profiling
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Using our quantum-inspired QUBO formulation, we analyzed the Breast Cancer Wisconsin diagnostic dataset
              (569 samples, 30 features) to extract clinically meaningful biomarker profiles. By discretizing the top-5
              ANOVA-selected features into entropy-guided bins and solving a 1,024-solution QUBO search space, we
              identified a 63-case malignant profile achieving perfect precision (1.0) with improved cross-validated
              recall (0.354) compared to traditional uniform binning approaches.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-4">Methodology Highlights</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">
                      <strong>Entropy-Guided Discretization:</strong> Feature-specific decision tree splits for optimal
                      bin alignment with class separability
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">
                      <strong>One-Hot Encoding:</strong> Constrained binary formulation ensuring exactly one bin selected
                      per feature
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">
                      <strong>Interaction Modeling:</strong> Cross-feature couplers (∆_ij) capturing coherent
                      conoccurrence patterns
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">
                      <strong>Clinical Validation:</strong> 5-fold cross-validation with external cohort benchmarking
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-4">Key Results</h3>
                <div className="space-y-4">
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-cyan-500/20">
                    <p className="text-cyan-300 font-semibold mb-1">Support (Coverage)</p>
                    <p className="text-3xl font-bold text-white">63 cases</p>
                    <p className="text-sm text-gray-400">72 cases with entropy binning vs. 21 with uniform</p>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-cyan-500/20">
                    <p className="text-cyan-300 font-semibold mb-1">Precision</p>
                    <p className="text-3xl font-bold text-white">100%</p>
                    <p className="text-sm text-gray-400">Zero false positives in malignant identification</p>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-cyan-500/20">
                    <p className="text-cyan-300 font-semibold mb-1">Cross-Validated Recall</p>
                    <p className="text-3xl font-bold text-white">0.354</p>
                    <p className="text-sm text-gray-400">3.3x improvement over uniform binning</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-300 italic">
              This interpretable rule-discovery approach bridges quantum optimization theory and clinical practice,
              enabling precision medicine applications where both accuracy and explainability are paramount.
            </p>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Quantum-Inspired vs. Classical Optimization</h2>
          <div className="rounded-xl overflow-hidden border border-cyan-500/30 mb-12">
            <Image
              src="/images/services/quantum-vs-classical-performance.jpg"
              alt="Quantum vs Classical Performance"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/30">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Speed & Efficiency</h3>
              <p className="text-gray-300">
                Quantum-inspired algorithms converge 30x faster on complex optimization landscapes, reducing
                computational overhead and energy costs.
              </p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/30">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Solution Quality</h3>
              <p className="text-gray-300">
                QUBO formulations produce global optima (or near-global solutions) with guaranteed properties, whereas
                classical heuristics often get stuck in local minima.
              </p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/30">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Scalability</h3>
              <p className="text-gray-300">
                QUBO can handle problems with hundreds to thousands of binary variables, scaling elegantly where
                classical approaches face combinatorial explosion.
              </p>
            </div>
          </div>
        </div>

        {/* Applications & Use Cases */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Industry Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/30">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Healthcare & Diagnostics</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Precision oncology biomarker profiling</li>
                <li>• Patient risk stratification and phenotyping</li>
                <li>• Drug discovery and molecular target optimization</li>
                <li>• Clinical trial patient selection</li>
              </ul>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/30">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Finance & Operations</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Portfolio optimization and risk management</li>
                <li>• Resource allocation and scheduling</li>
                <li>• Supply chain optimization</li>
                <li>• Credit risk and fraud detection feature selection</li>
              </ul>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/30">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Manufacturing & Logistics</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Production scheduling and capacity planning</li>
                <li>• Logistics network optimization</li>
                <li>• Quality control and defect detection</li>
                <li>• Equipment maintenance and predictive modeling</li>
              </ul>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/30">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Energy & Utilities</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Power grid optimization and load balancing</li>
                <li>• Smart meter data analysis</li>
                <li>• Renewable energy integration</li>
                <li>• Demand forecasting and capacity planning</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technological Advantages */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Technological Advantages</h2>
          <div className="bg-gradient-to-r from-cyan-900/50 to-magenta-900/50 backdrop-blur-sm p-12 rounded-xl border border-cyan-500/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-6">Mathematical Rigor</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">
                      Provably optimal or near-optimal solutions guaranteed by QUBO formulation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">
                      Constraint embedding ensures solution feasibility
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">
                      Energy landscape analysis provides convergence guarantees
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-magenta-400 mb-6">Practical Integration</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-magenta-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">
                      Seamlessly bridges classical and quantum computing platforms
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-magenta-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">
                      Compatible with existing enterprise infrastructure
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-magenta-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">
                      Future-proof investment for quantum-ready applications
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Unlock Quantum-Inspired Optimization?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Transform your complex optimization challenges into competitive advantages. Our quantum-inspired solutions
            deliver faster, more scalable, and more reliable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
              <Link href="/contact">Get Started Today</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/20 bg-transparent"
            >
              <Link href="/research-development">View Our Research</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
