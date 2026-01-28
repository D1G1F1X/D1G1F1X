import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LineChart, CheckCircle2, FileText, Search, Mail, BarChart3 } from "lucide-react"

export default function MarketingStrategyPage() {
  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Marketing Strategy"
        badgeVariant="primary"
        title="Data-Driven Marketing Solutions"
        subtitle="Strategic marketing approaches that leverage analytics and insights to maximize your ROI"
      />

      {/* Glowing orbs for visual effect */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-16 relative z-10">
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Effective marketing in the digital age requires more than creativity—it demands data-driven strategies that
            connect with your audience and deliver measurable results. At Lumen Helix, we develop comprehensive
            marketing approaches that drive growth and engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-primary-500/20 rounded-full mb-6 border border-primary-500/30">
              <LineChart className="h-7 w-7 text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Marketing Assessment & Planning</h3>
            <p className="text-gray-300 mb-4">
              We evaluate your current marketing efforts, competitive landscape, and audience insights to develop
              strategic marketing plans. Our planning process establishes clear objectives, tactics, and performance
              metrics.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Marketing audit and competitive analysis</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Audience segmentation and targeting</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Strategic marketing planning and roadmapping</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-primary-500/20 rounded-full mb-6 border border-primary-500/30">
              <BarChart3 className="h-7 w-7 text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Digital Marketing Campaigns</h3>
            <p className="text-gray-300 mb-4">
              We design and execute integrated digital marketing campaigns across multiple channels, including search,
              social, email, and content. Our campaigns are optimized for engagement, conversion, and ROI.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Multi-channel campaign strategy and execution</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Creative development and messaging</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Campaign performance tracking and optimization</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-primary-500/20 rounded-full mb-6 border border-primary-500/30">
              <FileText className="h-7 w-7 text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Content Strategy & Development</h3>
            <p className="text-gray-300 mb-4">
              We create content strategies that position your brand as a thought leader and drive audience engagement.
              Our content development services include blog posts, whitepapers, case studies, videos, and interactive
              content.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Content strategy and editorial planning</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Content creation and production</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Content distribution and promotion</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-primary-500/20 rounded-full mb-6 border border-primary-500/30">
              <Search className="h-7 w-7 text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">SEO & SEM Optimization</h3>
            <p className="text-gray-300 mb-4">
              We improve your digital visibility through comprehensive search engine optimization and strategic search
              marketing. Our approach combines technical SEO, content optimization, and targeted advertising.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Technical SEO and site optimization</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Keyword research and content optimization</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Paid search campaign management</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 md:col-span-2">
            <div className="w-14 h-14 flex items-center justify-center bg-primary-500/20 rounded-full mb-6 border border-primary-500/30">
              <Mail className="h-7 w-7 text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Analytics & Performance Optimization</h3>
            <p className="text-gray-300 mb-4">
              We implement robust analytics frameworks and continuously optimize your marketing performance. Our
              data-driven approach ensures your marketing investments deliver maximum impact.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Analytics implementation and dashboard development</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Performance analysis and insights generation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Continuous optimization and A/B testing</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-900/70 to-secondary-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Case Study: B2B Lead Generation Transformation</h2>
          <p className="text-gray-300 text-lg mb-6">
            For a SaaS provider, we developed a comprehensive digital marketing strategy that increased qualified leads
            by 125% and reduced cost per acquisition by 35%. The approach integrated content marketing, targeted
            advertising, and marketing automation to create a seamless lead generation engine.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-primary-400 mb-2">125%</h3>
              <p className="text-gray-300">Increase in qualified leads</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-primary-400 mb-2">35%</h3>
              <p className="text-gray-300">Reduction in cost per acquisition</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-primary-400 mb-2">3 Months</h3>
              <p className="text-gray-300">Time to positive ROI</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to Transform Your Marketing Results?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how our Marketing Strategy services can help you connect with your audience and
            drive measurable business growth.
          </p>
          <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
