import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="About Us"
        title="Our Story & Mission"
        subtitle="A collaborative team pioneering digital transformation through innovation, research, and strategic partnerships"
      />

      {/* Glowing orbs for visual effect */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Our Story - Collaborative Approach */}
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Who We Are</h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              We are Lumen Helix Solutions—a team of visionaries, strategists, and technical specialists united by a common purpose: 
              to illuminate the path to digital excellence. Our collective brings together decades of experience spanning enterprise 
              technology consulting, quantum-inspired computing research, AI system architecture, and scalable business operations.
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Founded on the principle that true innovation emerges from collaboration, we combine complementary expertise to deliver 
              comprehensive digital transformation solutions. Our leadership team merges deep technical knowledge with strategic business 
              acumen, ensuring every solution we create drives measurable value while pushing the boundaries of what's possible.
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              From the AI revolution to quantum-inspired diagnostics, we've positioned ourselves at the forefront of technological 
              advancement. But we never lose sight of the fundamental truth: technology serves people and organizations. That's why we 
              approach every engagement as a partnership, investing in understanding your unique challenges and crafting solutions that 
              align with your vision.
            </p>
          </div>

          {/* Our Mission - Collective Purpose */}
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed italic">
              We illuminate the path to digital excellence by fusing decades of strategic insight with cutting-edge AI innovation, 
              reversible computing architectures, and quantum-inspired systems. We empower organizations to not just adapt to 
              technological change, but to lead it with mathematical precision, sustainable practices, and measurable impact.
            </p>
          </div>

          {/* Our Vision */}
          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              We envision a future where advanced computing serves humanity with sustainability, precision, and accessibility at its core. 
              Through our research into reversible architectures, quantum-inspired systems, and ethical AI, we're building the foundation 
              for a new generation of technology that preserves information, minimizes waste, and creates lasting value.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our work bridges theoretical research and practical implementation, ensuring breakthrough discoveries translate into real-world 
              solutions that transform industries and improve lives.
            </p>
          </div>

          {/* Leadership Team Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 text-center">Our Leadership Team</h2>
            <p className="text-gray-300 text-lg text-center mb-12">
              Meet the visionary leaders driving our mission forward with decades of combined expertise in technology, 
              business strategy, and innovation.
            </p>

            {/* Christopher G. Phillips - CEO and CTO */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-secondary-500/30 rounded-xl overflow-hidden mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="md:col-span-1 relative h-80 md:h-full">
                  <Image
                    src="/images/team/chris-phillips-cio-navy.jpg"
                    alt="Christopher G. Phillips - CEO and CTO"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:col-span-2 p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <h3 className="text-3xl font-bold text-white mb-2">Christopher G. Phillips</h3>
                    <p className="text-secondary-400 text-xl font-semibold mb-4">Founder, CEO and CTO</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge className="bg-secondary-900/80 text-secondary-200">Strategic Leadership</Badge>
                      <Badge className="bg-indigo-900/80 text-indigo-200">US Navy Veteran</Badge>
                      <Badge className="bg-purple-900/80 text-purple-200">Research & Innovation</Badge>
                      <Badge className="bg-cyan-900/80 text-cyan-200">Technical Architecture</Badge>
                      <Badge className="bg-amber-900/80 text-amber-200">UI/UX Strategy</Badge>
                    </div>
                  </div>
                  <div className="text-gray-300 space-y-4 leading-relaxed">
                    <p>
                      Christopher brings over 30 years of technology consulting and project management expertise to his role as 
                      Founder, CEO, and CTO of Lumen Helix Solutions. His disciplined, strategic approach—honed through military 
                      service in the US Navy—ensures operational excellence across all aspects of the organization.
                    </p>
                    <p>
                      As a researcher and innovator, Christopher has authored 7 research papers exploring quantum-inspired computing, 
                      reversible architectures, and AI systems. His work bridges theoretical breakthroughs with practical implementation, 
                      creating solutions that deliver measurable impact while advancing the field.
                    </p>
                    <p>
                      Christopher oversees technical innovation, UI/UX strategy, compliance frameworks, training programs, and customer 
                      support operations while driving the company's overall vision and providing critical sales support. His leadership 
                      embodies the values of precision, accountability, and unwavering commitment that define the Lumen Helix experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Eric J. Buck - CIO and CFO */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-primary-500/30 rounded-xl overflow-hidden mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="md:col-span-1 relative h-80 md:h-full order-2 md:order-1">
                  <Image
                    src="/images/team/eric-buck-cto-sales.jpg"
                    alt="Eric J. Buck - CIO and CFO"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:col-span-2 p-8 flex flex-col justify-center order-1 md:order-2">
                  <div className="mb-4">
                    <h3 className="text-3xl font-bold text-white mb-2">Eric J. Buck</h3>
                    <p className="text-primary-400 text-xl font-semibold mb-4">Chief Information Officer and Chief Financial Officer</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge className="bg-primary-900/80 text-primary-200">Information Systems</Badge>
                      <Badge className="bg-emerald-900/80 text-emerald-200">Financial Strategy</Badge>
                      <Badge className="bg-blue-900/80 text-blue-200">Business Operations</Badge>
                      <Badge className="bg-cyan-900/80 text-cyan-200">Data Management</Badge>
                      <Badge className="bg-purple-900/80 text-purple-200">Enterprise Systems</Badge>
                    </div>
                  </div>
                  <div className="text-gray-300 space-y-4 leading-relaxed">
                    <p>
                      Eric brings 13+ years of experience in enterprise information systems and financial management to his dual role 
                      as CIO and CFO. He oversees all information technology infrastructure, data systems, and digital operations while 
                      managing the company's financial strategy, budgeting, and fiscal health.
                    </p>
                    <p>
                      As CIO, Eric ensures our technology infrastructure remains secure, scalable, and aligned with business objectives. 
                      He directs data management initiatives, system integrations, and IT governance frameworks that support our 
                      quantum-inspired computing and AI implementations.
                    </p>
                    <p>
                      In his CFO capacity, Eric manages financial planning, resource allocation, and investment strategies that fuel 
                      our growth. His unique ability to bridge technical operations with financial acumen ensures sustainable business 
                      practices while maintaining our commitment to innovation and research excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link 
                href="/team" 
                className="inline-flex items-center text-primary-400 hover:text-primary-300 font-semibold text-lg transition-colors"
              >
                Meet our full team of specialists →
              </Link>
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Research & Innovation</h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Our commitment to research excellence drives us to explore the frontiers of computational science. We're actively 
              advancing breakthroughs in quantum-inspired systems, reversible computing, and AI applications:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-700/50">
                <h3 className="text-primary-400 font-bold mb-2">Clinical AI & Precision Medicine</h3>
                <p className="text-gray-300 text-sm">Quantum-inspired diagnostics framework (C.O.R.E. and R.U.B.I.C.) achieving 30x performance improvements for breast cancer biomarker optimization.</p>
              </div>
              <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-700/50">
                <h3 className="text-primary-400 font-bold mb-2">Computational Irreducibility</h3>
                <p className="text-gray-300 text-sm">Observer-Relative Causality theory and Cone-Nonlocality Tests proving computational irreducibility in Rule 30 cellular automata.</p>
              </div>
              <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-700/50">
                <h3 className="text-primary-400 font-bold mb-2">Hypercomplex Algebras</h3>
                <p className="text-gray-300 text-sm">Unified framework integrating octonionic and sedenionic mathematics with sacred geometry for advanced symbolic computation.</p>
              </div>
              <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-700/50">
                <h3 className="text-primary-400 font-bold mb-2">Reversible Computing Architecture</h3>
                <p className="text-gray-300 text-sm">R.U.B.I.C. framework proving energy-efficient, reversible computational paradigms with information preservation.</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mt-6">
              <Link href="/research-development" className="text-primary-400 hover:text-primary-300">
                Explore our full research portfolio →
              </Link>
            </p>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Core Values</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900/60 p-6 rounded-lg border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
                <h3 className="text-xl font-bold text-primary-400 mb-3">Innovation with Purpose</h3>
                <p className="text-gray-300">
                  We pursue innovation not for its own sake, but to solve real business challenges and create tangible
                  value. Our solutions combine cutting-edge technologies with practical implementation strategies,
                  always grounded in mathematical rigor and proven methodologies.
                </p>
              </div>

              <div className="bg-gray-900/60 p-6 rounded-lg border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
                <h3 className="text-xl font-bold text-primary-400 mb-3">Reversibility & Sustainability</h3>
                <p className="text-gray-300">
                  We believe computing must be sustainable. Our research into reversible architectures and energy-efficient
                  systems reflects a commitment to technology that preserves information and minimizes waste—for our clients
                  and our planet.
                </p>
              </div>

              <div className="bg-gray-900/60 p-6 rounded-lg border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
                <h3 className="text-xl font-bold text-primary-400 mb-3">Integrated Excellence</h3>
                <p className="text-gray-300">
                  True digital transformation requires holistic thinking. Our integrated services work in harmony,
                  combining strategic consulting, advanced research, and implementation expertise to address the full
                  spectrum of digital challenges.
                </p>
              </div>

              <div className="bg-gray-900/60 p-6 rounded-lg border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
                <h3 className="text-xl font-bold text-primary-400 mb-3">Client Partnership</h3>
                <p className="text-gray-300">
                  We view our clients as partners in the transformation journey. We invest in understanding your
                  business, culture, and objectives to deliver solutions that align with your vision and drive
                  sustainable growth.
                </p>
              </div>

              <div className="bg-gray-900/60 p-6 rounded-lg border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
                <h3 className="text-xl font-bold text-primary-400 mb-3">Continuous Learning</h3>
                <p className="text-gray-300">
                  In a rapidly evolving digital landscape, continuous learning is essential. We invest in ongoing
                  education and research to ensure our team remains at the forefront of emerging technologies and
                  methodologies.
                </p>
              </div>

              <div className="bg-gray-900/60 p-6 rounded-lg border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 md:col-span-2">
                <h3 className="text-xl font-bold text-primary-400 mb-3">Measurable Impact</h3>
                <p className="text-gray-300">
                  We believe in accountability and measurable results. Our solutions are designed with clear success
                  metrics and performance indicators to ensure they deliver tangible business value.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Partner With Us</h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              We believe in collaborative partnerships that drive meaningful transformation. Whether you're exploring AI integration, 
              seeking quantum-inspired optimization, or planning comprehensive digital transformation, we're here to illuminate the path forward.
            </p>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Our team combines decades of proven expertise with cutting-edge innovation to deliver solutions that create lasting value. 
              Let's explore how we can work together to achieve your strategic objectives.
            </p>

            <div className="mt-8 text-center">
              <Button asChild className="bg-primary-500 hover:bg-primary-600 text-white">
                <Link href="/contact">Start a Conversation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
