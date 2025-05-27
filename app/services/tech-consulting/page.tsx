import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Server, CheckCircle2, Cloud, Shield, Database, BarChart3 } from "lucide-react"

export default function TechConsultingPage() {
  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Tech Consulting"
        badgeVariant="secondary"
        title="Expert Technology Guidance"
        subtitle="Strategic technology consulting to help you navigate the complex digital landscape and make informed decisions"
      />

      {/* Glowing orbs for visual effect */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-16 relative z-10">
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Technology decisions have far-reaching implications for your business's efficiency, security, and
            competitive advantage. At Lumen Helix, we provide expert guidance and reliable infrastructure to support
            your digital initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-secondary-500/20 rounded-full mb-6 border border-secondary-500/30">
              <BarChart3 className="h-7 w-7 text-secondary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Technology Strategy & Roadmapping</h3>
            <p className="text-gray-300 mb-4">
              We help you develop comprehensive technology strategies that align with your business objectives. Our
              roadmapping process identifies key initiatives, technologies, and implementation timelines to guide your
              digital transformation.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Technology assessment and gap analysis</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Strategic technology planning</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Implementation roadmap development</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-secondary-500/20 rounded-full mb-6 border border-secondary-500/30">
              <Database className="h-7 w-7 text-secondary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Architecture & Infrastructure Design</h3>
            <p className="text-gray-300 mb-4">
              We design scalable, secure, and efficient technology architectures and infrastructure solutions. Our
              designs consider performance, reliability, security, and cost-effectiveness to create optimal technology
              foundations.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">System architecture design</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Infrastructure planning and optimization</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Scalability and performance engineering</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-secondary-500/20 rounded-full mb-6 border border-secondary-500/30">
              <Cloud className="h-7 w-7 text-secondary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Cloud Strategy & Migration</h3>
            <p className="text-gray-300 mb-4">
              We develop cloud strategies and execute migrations that enhance flexibility, scalability, and
              cost-efficiency. Our cloud services include platform selection, architecture design, migration planning,
              and implementation.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Cloud readiness assessment</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Migration strategy and planning</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Cloud architecture and implementation</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-secondary-500/20 rounded-full mb-6 border border-secondary-500/30">
              <Shield className="h-7 w-7 text-secondary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Security Assessment & Implementation</h3>
            <p className="text-gray-300 mb-4">
              We evaluate your security posture and implement comprehensive security solutions. Our security services
              address threat protection, compliance requirements, and risk management.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Security assessment and vulnerability testing</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Security architecture and controls implementation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Compliance and risk management</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300 md:col-span-2">
            <div className="w-14 h-14 flex items-center justify-center bg-secondary-500/20 rounded-full mb-6 border border-secondary-500/30">
              <Server className="h-7 w-7 text-secondary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Managed Hosting & Support</h3>
            <p className="text-gray-300 mb-4">
              We provide reliable, secure hosting solutions with proactive monitoring and support. Our hosting services
              ensure your applications and data are available, protected, and performing optimally.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Managed cloud hosting and infrastructure</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Proactive monitoring and maintenance</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">24/7 technical support and incident response</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-secondary-900/70 to-primary-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Case Study: Cloud Transformation</h2>
          <p className="text-gray-300 text-lg mb-6">
            For a mid-sized financial services firm, we designed and implemented a cloud migration strategy that reduced
            infrastructure costs by 42% and improved system reliability by 99.99%. The solution included a hybrid cloud
            architecture, automated deployment pipelines, and comprehensive security controls.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-secondary-400 mb-2">42%</h3>
              <p className="text-gray-300">Reduction in infrastructure costs</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-secondary-400 mb-2">99.99%</h3>
              <p className="text-gray-300">System reliability</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-secondary-400 mb-2">4 Months</h3>
              <p className="text-gray-300">Migration timeline</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to Optimize Your Technology Infrastructure?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how our Tech Consulting & Hosting services can help you build a scalable,
            secure, and efficient technology foundation for your business.
          </p>
          <Button asChild size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
