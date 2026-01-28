import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Palette, CheckCircle2, Layout, FileImage, Play, BarChart3 } from "lucide-react"

export default function GraphicDesignPage() {
  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Graphic Design"
        badgeVariant="accent"
        title="Visually Stunning Design Solutions"
        subtitle="Creative and impactful visual communication that elevates your brand and engages your audience"
      />

      {/* Glowing orbs for visual effect */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-16 relative z-10">
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            In a visually-driven digital landscape, exceptional design is not a luxury—it's a necessity. At Lumen Helix,
            we create compelling visual experiences that communicate your brand's essence, engage your audience, and
            drive business results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-accent-500/20 rounded-full mb-6 border border-accent-500/30">
              <Palette className="h-7 w-7 text-accent-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Brand Identity Development</h3>
            <p className="text-gray-300 mb-4">
              We create comprehensive brand identities that capture your organization's values, personality, and vision.
              Our brand development process includes logo design, color palette selection, typography, and visual
              language definition.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Logo design and brand mark creation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Color palette and typography selection</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Brand guidelines and asset development</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-accent-500/20 rounded-full mb-6 border border-accent-500/30">
              <Layout className="h-7 w-7 text-accent-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">User Interface (UI) Design</h3>
            <p className="text-gray-300 mb-4">
              We design intuitive, engaging user interfaces for web applications, mobile apps, and digital products. Our
              UI design approach emphasizes usability, accessibility, and visual appeal to create exceptional user
              experiences.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Wireframing and prototyping</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Visual design and UI component creation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Responsive and adaptive design</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-accent-500/20 rounded-full mb-6 border border-accent-500/30">
              <FileImage className="h-7 w-7 text-accent-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Marketing Collateral</h3>
            <p className="text-gray-300 mb-4">
              We develop cohesive visual assets for your marketing campaigns, including social media graphics, email
              templates, digital ads, and presentation materials. Our marketing designs are optimized for engagement and
              conversion.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Social media graphics and templates</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Email marketing templates</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Digital advertising assets</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-accent-500/20 rounded-full mb-6 border border-accent-500/30">
              <BarChart3 className="h-7 w-7 text-accent-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Information Design</h3>
            <p className="text-gray-300 mb-4">
              We transform complex information into clear, compelling visual communications. From infographics and data
              visualizations to process diagrams and instructional materials, we make information accessible and
              engaging.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Infographics and data visualization</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Process diagrams and flowcharts</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Instructional design and visual guides</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300 md:col-span-2">
            <div className="w-14 h-14 flex items-center justify-center bg-accent-500/20 rounded-full mb-6 border border-accent-500/30">
              <Play className="h-7 w-7 text-accent-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Motion Graphics & Animation</h3>
            <p className="text-gray-300 mb-4">
              We create dynamic visual content that captures attention and communicates complex ideas. Our motion
              graphics and animations enhance your digital presence and improve information retention.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Explainer videos and animated tutorials</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">UI animations and micro-interactions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-accent-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Social media animations and video content</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-accent-900/70 to-primary-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Case Study: Healthcare Brand Transformation</h2>
          <p className="text-gray-300 text-lg mb-6">
            For a healthcare technology startup, we developed a comprehensive brand identity and visual system that
            positioned them as a modern, trustworthy innovator. The new brand increased investor interest by 65% and
            improved user engagement metrics by 48% across digital platforms.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-accent-400 mb-2">65%</h3>
              <p className="text-gray-300">Increase in investor interest</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-accent-400 mb-2">48%</h3>
              <p className="text-gray-300">Improvement in user engagement</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-accent-400 mb-2">6 Weeks</h3>
              <p className="text-gray-300">Implementation timeline</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to Elevate Your Visual Identity?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how our Graphic Design services can help you create compelling visual
            experiences that communicate your brand's essence and engage your audience.
          </p>
          <Button asChild size="lg" className="bg-accent-500 hover:bg-accent-600 text-white">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
