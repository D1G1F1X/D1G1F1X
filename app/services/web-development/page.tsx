import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Code, CheckCircle2, Smartphone, ShoppingCart, Zap, Database } from "lucide-react"

export default function WebDevelopmentPage() {
  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Web Development"
        badgeVariant="secondary"
        title="Cutting-Edge Web Solutions"
        subtitle="Custom web applications and platforms built with the latest technologies to meet your business needs"
      />

      {/* Glowing orbs for visual effect */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-16 relative z-10">
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Your digital presence is often the first—and most important—touchpoint with your customers. At Lumen Helix,
            we create exceptional web experiences that engage users, drive conversions, and scale with your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-secondary-500/20 rounded-full mb-6 border border-secondary-500/30">
              <Database className="h-7 w-7 text-secondary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Strategic Web Consulting</h3>
            <p className="text-gray-300 mb-4">
              We help you define your web strategy, identifying the right platforms, technologies, and approaches to
              achieve your business objectives. Our consulting services include technical assessments, platform
              selection, and roadmap development.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Technical architecture assessment</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Platform and technology selection</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Digital roadmap development</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-secondary-500/20 rounded-full mb-6 border border-secondary-500/30">
              <Code className="h-7 w-7 text-secondary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Custom Web Applications</h3>
            <p className="text-gray-300 mb-4">
              We design and develop bespoke web applications that address your unique business challenges. From customer
              portals and e-commerce platforms to internal tools and dashboards, we build scalable, secure, and
              user-friendly applications.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Customer portals and self-service platforms</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Internal tools and business applications</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Data visualization and reporting dashboards</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-secondary-500/20 rounded-full mb-6 border border-secondary-500/30">
              <Smartphone className="h-7 w-7 text-secondary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Progressive Web Apps (PWAs)</h3>
            <p className="text-gray-300 mb-4">
              We create Progressive Web Apps that combine the best of web and mobile applications, delivering fast,
              engaging experiences that work offline and can be installed on users' devices.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Offline functionality and caching</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Push notifications and device integration</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Cross-platform compatibility</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300">
            <div className="w-14 h-14 flex items-center justify-center bg-secondary-500/20 rounded-full mb-6 border border-secondary-500/30">
              <ShoppingCart className="h-7 w-7 text-secondary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">E-Commerce Solutions</h3>
            <p className="text-gray-300 mb-4">
              We build comprehensive e-commerce platforms that drive sales and enhance customer experience. Our
              solutions include product management, payment processing, inventory integration, and analytics.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Custom shopping experiences</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Payment gateway integration</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Inventory and order management</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300 md:col-span-2">
            <div className="w-14 h-14 flex items-center justify-center bg-secondary-500/20 rounded-full mb-6 border border-secondary-500/30">
              <Zap className="h-7 w-7 text-secondary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Web Performance Optimization</h3>
            <p className="text-gray-300 mb-4">
              We optimize your web properties for speed, responsiveness, and search engine visibility. Our performance
              optimization services ensure your web applications deliver exceptional user experiences across all devices
              and connection speeds.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Page speed optimization and Core Web Vitals improvement</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Responsive design and mobile optimization</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" />
                <span className="text-gray-300">SEO and accessibility enhancements</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-secondary-900/70 to-primary-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Case Study: B2B Portal Transformation</h2>
          <p className="text-gray-300 text-lg mb-6">
            For a leading industrial supplier, we developed a custom B2B portal that streamlined ordering, inventory
            management, and customer service. The solution increased online orders by 78%, reduced call center volume by
            35 and customer service. The solution increased online orders by 78%, reduced call center volume by 35%, and
            improved customer satisfaction scores by 42%.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-secondary-400 mb-2">78%</h3>
              <p className="text-gray-300">Increase in online orders</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-secondary-400 mb-2">35%</h3>
              <p className="text-gray-300">Reduction in call center volume</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-secondary-400 mb-2">42%</h3>
              <p className="text-gray-300">Improvement in customer satisfaction</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to Elevate Your Digital Presence?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how our Web Development services can help you create exceptional digital
            experiences that engage users and drive business growth.
          </p>
          <Button asChild size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
