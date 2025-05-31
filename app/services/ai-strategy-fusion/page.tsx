import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BrainCircuit, CheckCircle2, BarChart3, Network, Shield, RefreshCw } from "lucide-react"

export default function AIStrategyPage() {
  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="AI Strategy & Fusion"
        badgeVariant="primary"
        title="Harness the Power of Artificial Intelligence"
        subtitle="Strategic AI integration and implementation to transform your business operations and customer experiences"
      />

      {/* Glowing orbs for visual effect */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-16 relative z-10">
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Artificial Intelligence isn't just a technology—it's a fundamental shift in how businesses operate, compete,
            and deliver value. At Lumen Helix, we help you navigate this shift with strategic AI implementation that
            drives tangible business outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-primary-500/20 rounded-full mb-6 border border-primary-500/30">
              <BrainCircuit className="h-7 w-7 text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Strategic AI Assessment</h3>
            <p className="text-gray-300 mb-4">
              We evaluate your business processes, data infrastructure, and competitive landscape to identify
              high-impact AI opportunities. Our assessment provides a clear roadmap for AI implementation, prioritizing
              initiatives based on business value and feasibility.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Process analysis and optimization opportunities</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Data readiness evaluation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Competitive landscape analysis</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-primary-500/20 rounded-full mb-6 border border-primary-500/30">
              <Network className="h-7 w-7 text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Custom AI Solution Development</h3>
            <p className="text-gray-300 mb-4">
              Our team develops tailored AI solutions that address your specific business challenges. From predictive
              analytics and natural language processing to computer vision and recommendation systems, we leverage
              cutting-edge AI technologies to create solutions that deliver measurable results.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Predictive analytics and forecasting</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Natural language processing applications</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Computer vision and image recognition</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-primary-500/20 rounded-full mb-6 border border-primary-500/30">
              <BarChart3 className="h-7 w-7 text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">AI Integration & Implementation</h3>
            <p className="text-gray-300 mb-4">
              We seamlessly integrate AI solutions into your existing systems and workflows, ensuring minimal disruption
              and maximum adoption. Our implementation approach includes comprehensive testing, training, and change
              management to ensure successful deployment.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">System integration and API development</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">User training and adoption programs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Change management and process optimization</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-primary-500/20 rounded-full mb-6 border border-primary-500/30">
              <Shield className="h-7 w-7 text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">AI Ethics & Governance</h3>
            <p className="text-gray-300 mb-4">
              We help you establish ethical guidelines and governance frameworks for your AI initiatives, ensuring
              responsible and transparent use of AI technologies. Our approach addresses bias mitigation, privacy
              protection, and regulatory compliance.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Ethical AI framework development</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Bias detection and mitigation strategies</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Regulatory compliance and risk management</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 md:col-span-2">
            <div className="w-14 h-14 flex items-center justify-center bg-primary-500/20 rounded-full mb-6 border border-primary-500/30">
              <RefreshCw className="h-7 w-7 text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Continuous Optimization</h3>
            <p className="text-gray-300 mb-4">
              AI solutions are not static—they require ongoing monitoring, evaluation, and refinement. We provide
              continuous optimization services to ensure your AI investments deliver sustained value and adapt to
              changing business needs.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Performance monitoring and analytics</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Model retraining and enhancement</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Continuous improvement recommendations</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to Harness the Power of AI?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how our AI Strategy & Fusion services can transform your business operations and
            customer experiences.
          </p>
          <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
