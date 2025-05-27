import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ClipboardCheck, CheckCircle2, Workflow, GitMerge, BarChart3, LineChart } from "lucide-react"

export default function ProjectManagementPage() {
  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Project Management"
        badgeVariant="accent"
        title="Efficient Project Delivery"
        subtitle="Streamlined project management methodologies to ensure on-time, on-budget delivery of your initiatives"
      />

      {/* Glowing orbs for visual effect */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-16 relative z-10">
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            In today's fast-paced digital environment, effective project management is the difference between success
            and stagnation. At Lumen Helix, we combine proven methodologies with adaptive approaches to deliver complex
            initiatives with precision and agility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-accent-500/20 rounded-full mb-6 border border-accent-500/30">
              <ClipboardCheck className="h-7 w-7 text-accent-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Strategic Project Planning</h3>
            <p className="text-gray-300 mb-4">
              We develop comprehensive project plans that align with your business objectives and account for potential
              risks and dependencies. Our planning process establishes clear goals, timelines, and success metrics to
              guide project execution.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Business alignment and goal setting</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Risk assessment and mitigation planning</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Resource allocation and timeline development</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-accent-500/20 rounded-full mb-6 border border-accent-500/30">
              <Workflow className="h-7 w-7 text-accent-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Agile Implementation</h3>
            <p className="text-gray-300 mb-4">
              For digital initiatives that require flexibility and rapid iteration, we employ Agile methodologies that
              enable continuous delivery and adaptation. Our Agile approach emphasizes collaboration, transparency, and
              incremental value delivery.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Scrum and Kanban implementation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Sprint planning and backlog management</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Continuous integration and delivery</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-accent-500/20 rounded-full mb-6 border border-accent-500/30">
              <LineChart className="h-7 w-7 text-accent-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Waterfall Management</h3>
            <p className="text-gray-300 mb-4">
              When projects demand predictability and structured delivery, we utilize traditional Waterfall
              methodologies with defined phases and deliverables. Our Waterfall approach ensures thorough documentation,
              rigorous quality control, and clear milestone achievement.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Detailed requirements documentation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Phase-based delivery and milestone tracking</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Comprehensive testing and quality assurance</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-accent-500/20 rounded-full mb-6 border border-accent-500/30">
              <GitMerge className="h-7 w-7 text-accent-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Hybrid Approaches</h3>
            <p className="text-gray-300 mb-4">
              Many projects benefit from a combination of methodologies. We develop custom hybrid approaches that
              leverage the strengths of different frameworks to meet your specific project requirements and
              organizational culture.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Customized methodology development</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Adaptive planning and execution</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Balanced documentation and flexibility</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300 md:col-span-2">
            <div className="w-14 h-14 flex items-center justify-center bg-accent-500/20 rounded-full mb-6 border border-accent-500/30">
              <BarChart3 className="h-7 w-7 text-accent-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Program & Portfolio Management</h3>
            <p className="text-gray-300 mb-4">
              For organizations managing multiple related initiatives, we provide program and portfolio management
              services that ensure strategic alignment, resource optimization, and coordinated delivery across projects.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Multi-project coordination and dependency management</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Resource optimization across initiatives</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Strategic alignment and portfolio prioritization</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-accent-900/70 to-primary-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Case Study: Enterprise Digital Transformation</h2>
          <p className="text-gray-300 text-lg mb-6">
            For a multinational corporation, we managed a complex digital transformation program involving 12
            interdependent projects across 5 business units. Using our hybrid project management approach, we delivered
            the program 3 months ahead of schedule and 15% under budget, resulting in $4.2M in annual operational
            savings.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-accent-400 mb-2">3 Months</h3>
              <p className="text-gray-300">Ahead of schedule</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-accent-400 mb-2">15%</h3>
              <p className="text-gray-300">Under budget</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-accent-400 mb-2">$4.2M</h3>
              <p className="text-gray-300">Annual operational savings</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to Elevate Your Project Delivery?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how our Project Management services can help you deliver complex initiatives
            with precision and agility.
          </p>
          <Button asChild size="lg" className="bg-accent-500 hover:bg-accent-600 text-white">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
