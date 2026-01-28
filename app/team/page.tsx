import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Mail, Linkedin, Phone, MapPin } from "lucide-react"

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Our Team"
        title="Leadership & Expertise"
        subtitle="Pioneering quantum-inspired solutions with 40+ years of combined technology innovation and research leadership"
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-16 relative z-10">
        {/* Co-Founders Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Founders & Leadership</h2>
            <p className="text-gray-300 text-lg">
              Our co-founders bring together expertise in AI architecture, quantum-inspired computing, and enterprise technology transformation.
            </p>
          </div>

          {/* Chris Phillips - Co-Founder & CTO */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="md:col-span-1 relative h-96 md:h-full">
                <Image
                  src="/images/team/chris-phillips-profile-hero.jpg"
                  alt="Chris Phillips - Co-Founder & CTO"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-2 p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <h3 className="text-3xl font-bold text-white mb-2">Christopher Phillips</h3>
                  <p className="text-primary-400 text-lg font-semibold mb-4">Co-Founder & Chief Technology Officer</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge className="bg-primary-900/80 text-primary-200">AI Strategy</Badge>
                    <Badge className="bg-cyan-900/80 text-cyan-200">Quantum Computing</Badge>
                    <Badge className="bg-purple-900/80 text-purple-200">Mathematics</Badge>
                    <Badge className="bg-red-900/80 text-red-200">Clinical AI</Badge>
                    <Badge className="bg-indigo-900/80 text-indigo-200">UI/Compliance</Badge>
                    <Badge className="bg-emerald-900/80 text-emerald-200">Training</Badge>
                    <Badge className="bg-orange-900/80 text-orange-200">Support</Badge>
                  </div>
                </div>

                <div className="text-gray-300 space-y-3 mb-6 text-sm">
                  <p>
                    Christopher brings 30+ years of experience as a seasoned technology consultant and project manager across enterprise development companies. 
                    His journey spans from early enterprise computing through modern AI and quantum-inspired systems. Beyond technical innovation, he oversees 
                    UI/UX strategy, regulatory compliance frameworks, team training programs, and 24/7 customer support operations.
                  </p>
                  <p>
                    Post-pandemic, Christopher recognized the AI revolution's transformative potential and founded Lumen Helix Solutions to help organizations 
                    navigate this frontier. His expertise combines strategic consulting with cutting-edge research in reversible computing, quantum optimization, 
                    clinical AI applications, and comprehensive support infrastructure.
                  </p>
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <h4 className="font-semibold text-white">Key Achievements (2025-2026):</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Published 7 peer-reviewed papers on quantum-inspired computing and clinical diagnostics</li>
                    <li>Developed C.O.R.E. and R.U.B.I.C. frameworks achieving 30x optimization performance improvements</li>
                    <li>Submitted Rule 30 computational irreducibility proofs to Wolfram Research competition</li>
                    <li>Created quantum-inspired precision medicine systems for oncology applications</li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" className="border-primary-500/50 text-primary-400 hover:bg-primary-950 bg-transparent">
                    <Mail className="w-4 h-4 mr-2" />
                    Chris@oiq.to
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Eric J. Buck - Co-Founder & AI Systems Director */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="md:col-span-1 relative h-96 md:h-full order-2 md:order-1">
                <Image
                  src="/images/team/eric-buck-profile-hero.jpg"
                  alt="Eric J. Buck - Co-Founder & AI Systems Director"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-2 p-8 flex flex-col justify-center order-1 md:order-2">
                <div className="mb-4">
                  <h3 className="text-3xl font-bold text-white mb-2">Eric J. Buck</h3>
                  <p className="text-secondary-400 text-lg font-semibold mb-4">Co-Founder & AI Systems Director</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge className="bg-secondary-900/80 text-secondary-200">AI Architecture</Badge>
                    <Badge className="bg-blue-900/80 text-blue-200">Enterprise Integration</Badge>
                    <Badge className="bg-indigo-900/80 text-indigo-200">Governance</Badge>
                    <Badge className="bg-emerald-900/80 text-emerald-200">Business Strategy</Badge>
                  </div>
                </div>

                <div className="text-gray-300 space-y-3 mb-6 text-sm">
                  <p>
                    Eric is an independent researcher and business architect specializing in invariant-driven AI architecture and enterprise integration. 
                    With 13 years of business experience as founder and principal, he has deep expertise in translating advanced AI systems into 
                    deployable, contract-bounded solutions.
                  </p>
                  <p>
                    His focus on human-in-the-loop governance and AI safety ensures that systems balance innovation with organizational security and 
                    regulatory compliance. Eric bridges technical system design, business strategy, and long-term solution stewardship for enterprises 
                    across security, education, and financial applications.
                  </p>
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <h4 className="font-semibold text-white">Core Expertise:</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Invariant-driven AI system architecture and design patterns</li>
                    <li>Enterprise AI integration with governance frameworks</li>
                    <li>Human-gated AI systems for security and compliance</li>
                    <li>Business brokerage and property management technologies</li>
                    <li>AI safety research and decision system governance</li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" className="border-secondary-500/50 text-secondary-400 hover:bg-secondary-950 bg-transparent">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    812-655-5857
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Team Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Core Technical Team</h2>
            <p className="text-gray-300 text-lg">
              Expert specialists driving innovation across development, security, design, and strategic optimization.
            </p>
          </div>

          {/* Sarah Chen - Senior Full-Stack Developer */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="md:col-span-1 relative h-80 md:h-full">
                <Image
                  src="/images/team/sarah-chen-profile.jpg"
                  alt="Sarah Chen - Senior Full-Stack Developer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-2 p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-1">Sarah Chen</h3>
                  <p className="text-cyan-400 text-base font-semibold mb-3">Senior Full-Stack Developer & Architecture Lead</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-cyan-900/80 text-cyan-200">React/Next.js</Badge>
                    <Badge className="bg-blue-900/80 text-blue-200">Node.js</Badge>
                    <Badge className="bg-purple-900/80 text-purple-200">Cloud Architecture</Badge>
                    <Badge className="bg-green-900/80 text-green-200">Microservices</Badge>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Sarah leads the technical architecture for all web and cloud-based systems. With 8+ years of full-stack development experience, 
                  she specializes in scalable microservices, cloud infrastructure optimization, and enterprise-grade system design. Her technical 
                  leadership ensures all solutions meet the highest standards of performance, security, and maintainability.
                </p>
                <div className="text-sm text-gray-400">
                  <p className="font-semibold text-gray-300 mb-2">Specialization:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Scalable distributed system architecture</li>
                    <li>Cloud infrastructure and deployment optimization</li>
                    <li>Performance monitoring and optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Alex Torres - Full-Stack Developer & AI Integration Specialist */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="md:col-span-1 relative h-80 md:h-full order-2 md:order-1">
                <Image
                  src="/images/team/alex-torres-profile.jpg"
                  alt="Alex Torres - Full-Stack Developer & AI Integration"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-2 p-8 flex flex-col justify-center order-1 md:order-2">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-1">Alex Torres</h3>
                  <p className="text-blue-400 text-base font-semibold mb-3">Full-Stack Developer & AI Integration Specialist</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-blue-900/80 text-blue-200">Python/TypeScript</Badge>
                    <Badge className="bg-indigo-900/80 text-indigo-200">ML Integration</Badge>
                    <Badge className="bg-cyan-900/80 text-cyan-200">API Development</Badge>
                    <Badge className="bg-purple-900/80 text-purple-200">Data Pipelines</Badge>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Alex specializes in integrating AI and machine learning systems into production environments. With 6+ years of development experience, 
                  he bridges backend systems with AI inference engines, managing complex data pipelines and ensuring seamless integration between 
                  traditional software and cutting-edge machine learning models.
                </p>
                <div className="text-sm text-gray-400">
                  <p className="font-semibold text-gray-300 mb-2">Specialization:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>AI/ML system integration and deployment</li>
                    <li>Real-time data processing pipelines</li>
                    <li>API design for machine learning services</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Jordan Blake - Cryptography & Security Specialist */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="md:col-span-1 relative h-80 md:h-full">
                <Image
                  src="/images/team/jordan-blake-profile.jpg"
                  alt="Jordan Blake - Cryptography Specialist"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-2 p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-1">Jordan Blake</h3>
                  <p className="text-red-400 text-base font-semibold mb-3">Cryptography & Security Specialist</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-red-900/80 text-red-200">Cryptography</Badge>
                    <Badge className="bg-rose-900/80 text-rose-200">Security Architecture</Badge>
                    <Badge className="bg-orange-900/80 text-orange-200">Quantum-Safe</Badge>
                    <Badge className="bg-pink-900/80 text-pink-200">Compliance</Badge>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Jordan is our security backbone, specializing in cryptographic systems and quantum-resistant encryption. With 9+ years in information 
                  security, Jordan designs and implements enterprise-grade security architectures, ensures quantum-safe protocols, and manages security 
                  compliance across all systems and deployments.
                </p>
                <div className="text-sm text-gray-400">
                  <p className="font-semibold text-gray-300 mb-2">Specialization:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Post-quantum cryptography and encryption schemes</li>
                    <li>Enterprise security architecture and threat modeling</li>
                    <li>Compliance certification and security auditing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Maya Patel - Game Theory & Optimization Specialist */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="md:col-span-1 relative h-80 md:h-full order-2 md:order-1">
                <Image
                  src="/images/team/maya-patel-profile.jpg"
                  alt="Maya Patel - Game Theory Specialist"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-2 p-8 flex flex-col justify-center order-1 md:order-2">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-1">Maya Patel</h3>
                  <p className="text-purple-400 text-base font-semibold mb-3">Game Theory & Strategic Optimization Specialist</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-purple-900/80 text-purple-200">Game Theory</Badge>
                    <Badge className="bg-violet-900/80 text-violet-200">Strategic Analysis</Badge>
                    <Badge className="bg-indigo-900/80 text-indigo-200">QUBO Optimization</Badge>
                    <Badge className="bg-fuchsia-900/80 text-fuchsia-200">Simulation</Badge>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Maya applies game theory and strategic optimization to solve complex business and technical problems. With a PhD in applied mathematics 
                  and 7+ years in optimization research, she designs algorithms for competitive market analysis, resource allocation optimization, and 
                  strategic decision-making systems.
                </p>
                <div className="text-sm text-gray-400">
                  <p className="font-semibold text-gray-300 mb-2">Specialization:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Game theory applications to business strategy</li>
                    <li>Strategic optimization and equilibrium analysis</li>
                    <li>QUBO problem formulation and solving</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Liam Moore - UI/UX Designer & Product Specialist */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="md:col-span-1 relative h-80 md:h-full">
                <Image
                  src="/images/team/liam-moore-profile.jpg"
                  alt="Liam Moore - UI/UX Designer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-2 p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-1">Liam Moore</h3>
                  <p className="text-emerald-400 text-base font-semibold mb-3">UI/UX Designer & Product Strategist</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-emerald-900/80 text-emerald-200">UI/UX Design</Badge>
                    <Badge className="bg-teal-900/80 text-teal-200">Design Systems</Badge>
                    <Badge className="bg-cyan-900/80 text-cyan-200">Accessibility</Badge>
                    <Badge className="bg-green-900/80 text-green-200">Product Strategy</Badge>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Liam crafts intuitive, accessible user experiences for complex technical systems. With 8+ years in UX design and a passion for 
                  accessibility, he designs beautiful interfaces that make quantum-inspired systems and enterprise software approachable for all users. 
                  His design systems ensure consistency and scalability across all client-facing products.
                </p>
                <div className="text-sm text-gray-400">
                  <p className="font-semibold text-gray-300 mb-2">Specialization:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Enterprise UI/UX design and usability research</li>
                    <li>Accessible design systems and component libraries</li>
                    <li>Product strategy and user-centered innovation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Structure Section */}
        <div className="max-w-6xl mx-auto mb-20 pt-12 border-t border-gray-700/50">
          <h2 className="text-4xl font-bold text-white mb-12">Team Structure</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* In-House Staff */}
            <Card className="bg-gray-800/80 backdrop-blur-sm border-primary-500/30">
              <CardHeader>
                <CardTitle className="text-xl text-white">In-House Specialists</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <div>
                  <h4 className="font-semibold text-primary-400 mb-2">Research & Development</h4>
                  <p className="text-sm">Quantum computing specialists, computational mathematicians, and clinical AI researchers driving innovation in cutting-edge systems.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-400 mb-2">Technical Operations</h4>
                  <p className="text-sm">Full-stack developers, cloud architects, and infrastructure engineers ensuring scalable, secure deployments across all platforms.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-400 mb-2">Client Success</h4>
                  <p className="text-sm">Project managers and technical consultants working directly with clients to ensure successful implementation and maximum ROI.</p>
                </div>
              </CardContent>
            </Card>

            {/* External Support */}
            <Card className="bg-gray-800/80 backdrop-blur-sm border-secondary-500/30">
              <CardHeader>
                <CardTitle className="text-xl text-white">External & Specialized Support</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <div>
                  <h4 className="font-semibold text-secondary-400 mb-2">Academic Partners</h4>
                  <p className="text-sm">Collaborations with leading research institutions for peer review, validation, and advancement of academic publications.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-400 mb-2">Strategic Consultants</h4>
                  <p className="text-sm">Domain experts in healthcare, finance, and enterprise systems providing specialized guidance on industry-specific implementations.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-400 mb-2">24/7 Support Network</h4>
                  <p className="text-sm">Round-the-clock technical support, infrastructure monitoring, and incident response ensuring maximum uptime and reliability.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Collaboration */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Integrated Excellence Through Collaboration</h3>
                <p className="text-gray-300 mb-4">
                  Our team operates as an integrated unit where in-house specialists and external partners collaborate seamlessly. 
                  This hybrid approach combines deep technical expertise with specialized domain knowledge, ensuring clients receive 
                  cutting-edge solutions backed by 24/7 support.
                </p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-primary-400 mr-3 font-bold">•</span>
                    <span>Cross-functional innovation combining research, development, and operations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-400 mr-3 font-bold">•</span>
                    <span>Flexible scaling to match project complexity and client requirements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-400 mr-3 font-bold">•</span>
                    <span>Round-the-clock support for mission-critical deployments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-400 mr-3 font-bold">•</span>
                    <span>Quality assurance through peer review and continuous improvement</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/images/team/team-collaboration.jpg"
                  alt="Team collaboration and integration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center py-12 border-t border-gray-700/50">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Work With Our Team?</h2>
          <p className="text-gray-300 mb-8">
            Whether you need quantum-optimized solutions, enterprise AI integration, or specialized consulting, our team is ready to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services">
              <Button className="bg-primary-500 hover:bg-primary-600 text-white">
                Explore Our Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-primary-500/50 text-primary-400 bg-transparent">
                Schedule a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
