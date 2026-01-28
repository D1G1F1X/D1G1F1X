'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PageHero from '@/components/page-hero'
import { Mail, Linkedin, Users, Award, Code, Shield, Palette, Zap } from 'lucide-react'

export default function TeamPage() {
  return (
    <main className='min-h-screen bg-gray-900 relative overflow-hidden'>
      <PageHero
        badge='Our Leadership & Experts'
        title='Meet the Lumen Helix Team'
        subtitle='A collective of innovators, strategists, and technical specialists driving digital transformation'
      />

      {/* Glowing orbs for visual effect */}
      <div className='absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow'></div>
      <div className='absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow'></div>

      <div className='container px-4 mx-auto py-16 relative z-10'>
        {/* Executive Leadership */}
        <div className='max-w-6xl mx-auto mb-20'>
          <div className='mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>Executive Leadership</h2>
            <p className='text-gray-300 text-lg'>
              Visionary founders with decades of combined expertise in technology strategy, innovation, and organizational leadership.
            </p>
          </div>

          {/* Eric J. Buck - CIO and CFO */}
          <div className='bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-primary-500/30 rounded-xl overflow-hidden mb-12'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-0'>
              <div className='md:col-span-1 relative h-80 md:h-full'>
                <Image
                  src='/images/team/eric-buck-cto-sales.jpg'
                  alt='Eric J. Buck - CIO and CFO'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='md:col-span-2 p-8 flex flex-col justify-center'>
                <div className='mb-6'>
                  <h3 className='text-3xl font-bold text-white mb-2'>Eric J. Buck</h3>
                  <p className='text-primary-400 text-lg font-semibold mb-4'>Chief Information Officer and Chief Financial Officer</p>
                  <div className='flex flex-wrap gap-2 mb-6'>
                    <Badge className='bg-primary-900/80 text-primary-200'>Information Systems</Badge>
                    <Badge className='bg-emerald-900/80 text-emerald-200'>Financial Strategy</Badge>
                    <Badge className='bg-blue-900/80 text-blue-200'>Business Operations</Badge>
                    <Badge className='bg-cyan-900/80 text-cyan-200'>Data Management</Badge>
                    <Badge className='bg-purple-900/80 text-purple-200'>Enterprise Systems</Badge>
                  </div>
                </div>
                <div className='text-gray-300 space-y-3 mb-6 text-sm'>
                  <p>
                    Eric brings 13+ years of experience in enterprise information systems and financial management to his dual role 
                    as CIO and CFO. Working remotely, he oversees all information technology infrastructure, data systems, and digital 
                    operations while managing the company's financial strategy, budgeting, and fiscal health with precision and efficiency.
                  </p>
                  <p>
                    As CIO, Eric ensures our technology infrastructure remains secure, scalable, and aligned with business objectives. 
                    He directs data management initiatives, system integrations, and IT governance frameworks that support our 
                    quantum-inspired computing and AI implementations. In his CFO capacity, Eric manages financial planning, resource 
                    allocation, and investment strategies that fuel our growth while maintaining fiscal responsibility. His remote work 
                    model leverages cloud-based systems and secure collaboration tools to maintain seamless oversight of operations.
                  </p>
                </div>
                <div className='text-sm text-gray-400'>
                  <p className='font-semibold text-gray-300 mb-2'>Leadership Focus:</p>
                  <ul className='list-disc list-inside space-y-1'>
                    <li>IT infrastructure and information systems management</li>
                    <li>Financial planning, budgeting, and fiscal oversight</li>
                    <li>Data management and system integration</li>
                    <li>Resource allocation and investment strategy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Christopher G. Phillips - Founder, CEO and CTO, Navy Veteran */}
          <div className='bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-secondary-500/30 rounded-xl overflow-hidden mb-12'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-0'>
              <div className='md:col-span-1 relative h-80 md:h-full order-2 md:order-1'>
                <Image
                  src='/images/team/chris-phillips-cio-navy.jpg'
                  alt='Christopher G. Phillips - Founder, CEO and CTO'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='md:col-span-2 p-8 flex flex-col justify-center order-1 md:order-2'>
                <div className='mb-6'>
                  <h3 className='text-3xl font-bold text-white mb-2'>Christopher G. Phillips</h3>
                  <p className='text-secondary-400 text-lg font-semibold mb-4'>Founder, CEO and CTO, US Navy Veteran</p>
                  <div className='flex flex-wrap gap-2 mb-6'>
                    <Badge className='bg-secondary-900/80 text-secondary-200'>Strategic Leadership</Badge>
                    <Badge className='bg-blue-900/80 text-blue-200'>Sales Support</Badge>
                    <Badge className='bg-indigo-900/80 text-indigo-200'>UI/UX Strategy</Badge>
                    <Badge className='bg-red-900/80 text-red-200'>Compliance & Governance</Badge>
                    <Badge className='bg-orange-900/80 text-orange-200'>Training & Development</Badge>
                    <Badge className='bg-emerald-900/80 text-emerald-200'>Support Operations</Badge>
                    <Badge className='bg-amber-900/80 text-amber-200'>Research & Innovation</Badge>
                  </div>
                </div>
                <div className='text-gray-300 space-y-3 mb-6 text-sm'>
                  <p>
                    Christopher brings 30+ years of technology consulting expertise and military service to his role as Founder, CEO, and CTO. 
                    Working remotely, his disciplined, strategic approach to organizational leadership ensures operational excellence across all departments. 
                    He oversees technical innovation, UI/UX strategy, regulatory compliance frameworks, team training programs, and 24/7 customer support 
                    operations while driving overall company vision and providing critical sales support.
                  </p>
                  <p>
                    As author of 7 research papers on quantum-inspired computing, reversible architectures, and AI systems (not peer-reviewed or published), 
                    Christopher combines deep technical knowledge with practical business acumen. His Navy background instilled a culture of 
                    precision, accountability, and unwavering support—values that define the Lumen Helix experience. His remote leadership model 
                    enables agile, responsive coordination across our distributed team.
                  </p>
                </div>
                <div className='text-sm text-gray-400'>
                  <p className='font-semibold text-gray-300 mb-2'>Research Papers (Not Peer-Reviewed or Published):</p>
                  <ul className='list-disc list-inside space-y-1'>
                    <li>Quantum-Inspired Optimization in Clinical Diagnostics</li>
                    <li>Reversible Computing Architecture: Energy-Efficient Systems</li>
                    <li>Observer-Relative Causality in Computational Irreducibility</li>
                    <li>And four additional contributions to quantum computing and AI safety research</li>
                  </ul>
                  <p className='font-semibold text-gray-300 mb-2 mt-3'>Contact:</p>
                  <p className='text-cyan-400'>Chris@oiq.to</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Technical Team */}
        <div className='max-w-6xl mx-auto mb-20'>
          <div className='mb-16'>
            <h2 className='text-4xl font-bold text-white mb-4'>Core Technical Team</h2>
            <p className='text-gray-300 text-lg'>
              Specialist engineers and designers driving innovation across development, security, and user experience.
            </p>
          </div>

          {/* Marcus Rodriguez - Developer & Sales */}
          <div className='bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl overflow-hidden mb-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-0'>
              <div className='md:col-span-1 relative h-80 md:h-full'>
                <Image
                  src='/images/team/marcus-rodriguez-developer-sales.jpg'
                  alt='Marcus Rodriguez - Full-Stack Developer & Sales Engineer'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='md:col-span-2 p-8 flex flex-col justify-center'>
                <div className='mb-4'>
                  <h3 className='text-2xl font-bold text-white mb-1'>Marcus Rodriguez</h3>
                  <p className='text-cyan-400 text-base font-semibold mb-3'>Full-Stack Developer & Sales Engineer</p>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    <Badge className='bg-cyan-900/80 text-cyan-200'>React/Next.js</Badge>
                    <Badge className='bg-blue-900/80 text-blue-200'>Node.js</Badge>
                    <Badge className='bg-purple-900/80 text-purple-200'>Client Success</Badge>
                    <Badge className='bg-green-900/80 text-green-200'>Technical Sales</Badge>
                  </div>
                </div>
                <p className='text-gray-300 text-sm mb-3'>
                  Marcus bridges development and business, translating client needs into elegant technical solutions. With 7+ years of full-stack 
                  development and proven sales skills, he manages high-value client relationships, identifies upsell opportunities, and ensures 
                  technical implementations exceed expectations. His combination of coding expertise and sales acumen makes him invaluable to 
                  enterprise account management.
                </p>
                <div className='text-sm text-gray-400'>
                  <p className='font-semibold text-gray-300 mb-2'>Specialization:</p>
                  <ul className='list-disc list-inside space-y-1'>
                    <li>Enterprise full-stack architecture</li>
                    <li>Technical presales and solution consulting</li>
                    <li>Client relationship management and account growth</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Priya Sharma - Developer */}
          <div className='bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-blue-500/30 rounded-xl overflow-hidden mb-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-0'>
              <div className='md:col-span-1 relative h-80 md:h-full order-2 md:order-1'>
                <Image
                  src='/images/team/priya-sharma-developer.jpg'
                  alt='Priya Sharma - Senior Full-Stack Developer'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='md:col-span-2 p-8 flex flex-col justify-center order-1 md:order-2'>
                <div className='mb-4'>
                  <h3 className='text-2xl font-bold text-white mb-1'>Priya Sharma</h3>
                  <p className='text-blue-400 text-base font-semibold mb-3'>Senior Full-Stack Developer & Database Architect</p>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    <Badge className='bg-blue-900/80 text-blue-200'>TypeScript/Python</Badge>
                    <Badge className='bg-emerald-900/80 text-emerald-200'>PostgreSQL</Badge>
                    <Badge className='bg-indigo-900/80 text-indigo-200'>Distributed Systems</Badge>
                    <Badge className='bg-violet-900/80 text-violet-200'>Performance Optimization</Badge>
                  </div>
                </div>
                <p className='text-gray-300 text-sm mb-3'>
                  Priya is the backbone of our infrastructure, designing and implementing complex distributed systems and database architectures 
                  that power enterprise-scale applications. With 8+ years of backend development experience, she specializes in performance 
                  optimization, data modeling, and ensuring systems remain scalable as organizations grow exponentially.
                </p>
                <div className='text-sm text-gray-400'>
                  <p className='font-semibold text-gray-300 mb-2'>Specialization:</p>
                  <ul className='list-disc list-inside space-y-1'>
                    <li>Distributed database design and optimization</li>
                    <li>System scalability and high-performance architecture</li>
                    <li>Data pipeline engineering and management</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* David Chen - Cryptography & Game Theory */}
          <div className='bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-red-500/30 rounded-xl overflow-hidden mb-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-0'>
              <div className='md:col-span-1 relative h-80 md:h-full'>
                <Image
                  src='/images/team/david-chen-crypto-gametheory.jpg'
                  alt='David Chen - Cryptography & Game Theory Specialist'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='md:col-span-2 p-8 flex flex-col justify-center'>
                <div className='mb-4'>
                  <h3 className='text-2xl font-bold text-white mb-1'>David Chen</h3>
                  <p className='text-red-400 text-base font-semibold mb-3'>Cryptography Specialist & Game Theory Expert</p>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    <Badge className='bg-red-900/80 text-red-200'>Post-Quantum Cryptography</Badge>
                    <Badge className='bg-rose-900/80 text-rose-200'>Game Theory</Badge>
                    <Badge className='bg-pink-900/80 text-pink-200'>Strategic Analysis</Badge>
                    <Badge className='bg-orange-900/80 text-orange-200'>Security Architecture</Badge>
                  </div>
                </div>
                <p className='text-gray-300 text-sm mb-3'>
                  David is a world-class cryptographer and game theorist who ensures our systems remain secure against current and future threats. 
                  With a PhD in applied mathematics and 9+ years in cryptographic systems, David designs quantum-resistant encryption, develops 
                  secure protocols, and applies game theory to optimize strategic decision-making in system design.
                </p>
                <div className='text-sm text-gray-400'>
                  <p className='font-semibold text-gray-300 mb-2'>Specialization:</p>
                  <ul className='list-disc list-inside space-y-1'>
                    <li>Post-quantum cryptography and encryption schemes</li>
                    <li>Game theory applications to system design and strategy</li>
                    <li>Security architecture and threat modeling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Emma Wilson - UI/UX Designer */}
          <div className='bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-emerald-500/30 rounded-xl overflow-hidden mb-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-0'>
              <div className='md:col-span-1 relative h-80 md:h-full order-2 md:order-1'>
                <Image
                  src='/images/team/emma-wilson-uxui.jpg'
                  alt='Emma Wilson - UI/UX Designer'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='md:col-span-2 p-8 flex flex-col justify-center order-1 md:order-2'>
                <div className='mb-4'>
                  <h3 className='text-2xl font-bold text-white mb-1'>Emma Wilson</h3>
                  <p className='text-emerald-400 text-base font-semibold mb-3'>UI/UX Designer & Product Strategist</p>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    <Badge className='bg-emerald-900/80 text-emerald-200'>UI/UX Design</Badge>
                    <Badge className='bg-teal-900/80 text-teal-200'>Design Systems</Badge>
                    <Badge className='bg-cyan-900/80 text-cyan-200'>Accessibility</Badge>
                    <Badge className='bg-green-900/80 text-green-200'>Product Strategy</Badge>
                  </div>
                </div>
                <p className='text-gray-300 text-sm mb-3'>
                  Emma transforms complex technical systems into intuitive, accessible user experiences. With 8+ years in UX design and a passion 
                  for accessibility, she designs beautiful interfaces that make quantum-inspired systems and enterprise software approachable for 
                  all users. Her design systems ensure consistency and scalability across products.
                </p>
                <div className='text-sm text-gray-400'>
                  <p className='font-semibold text-gray-300 mb-2'>Specialization:</p>
                  <ul className='list-disc list-inside space-y-1'>
                    <li>Enterprise UI/UX design and usability research</li>
                    <li>Accessible design systems and component libraries</li>
                    <li>Product strategy and user-centered innovation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subordinate Team Members */}
        <div className='max-w-6xl mx-auto mb-20'>
          <div className='mb-12'>
            <h2 className='text-3xl font-bold text-white mb-4'>Extended Team</h2>
            <p className='text-gray-300 text-base'>
              Supporting specialists and external collaborators who contribute expertise across specialized domains.
            </p>
          </div>

          {/* In-House Support Staff */}
          <div className='mb-12'>
            <h3 className='text-2xl font-bold text-white mb-6 flex items-center'>
              <Users className='w-6 h-6 mr-3 text-primary-400' />
              In-House Support Staff
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Card className='bg-gray-800/60 border-gray-700/50 hover:border-primary-500/50 transition-all'>
                <CardHeader>
                  <CardTitle className='text-white flex items-center'>
                    <Zap className='w-5 h-5 mr-2 text-primary-400' />
                    DevOps Engineer
                  </CardTitle>
                  <CardDescription className='text-gray-400'>Infrastructure & Cloud Operations</CardDescription>
                </CardHeader>
                <CardContent className='text-gray-300 text-sm'>
                  <p className='mb-3'>
                    Manages cloud infrastructure, CI/CD pipelines, system monitoring, and deployment automation. Ensures 99.99% uptime 
                    and optimal performance across all systems.
                  </p>
                  <ul className='list-disc list-inside space-y-1 text-gray-400'>
                    <li>AWS/Cloud infrastructure management</li>
                    <li>Container orchestration and Kubernetes</li>
                    <li>Monitoring, logging, and alerting systems</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='bg-gray-800/60 border-gray-700/50 hover:border-secondary-500/50 transition-all'>
                <CardHeader>
                  <CardTitle className='text-white flex items-center'>
                    <Award className='w-5 h-5 mr-2 text-secondary-400' />
                    QA & Testing Specialist
                  </CardTitle>
                  <CardDescription className='text-gray-400'>Quality Assurance & Test Automation</CardDescription>
                </CardHeader>
                <CardContent className='text-gray-300 text-sm'>
                  <p className='mb-3'>
                    Develops comprehensive testing strategies, automation frameworks, and quality assurance protocols. Ensures every 
                    deployment meets enterprise-grade reliability standards.
                  </p>
                  <ul className='list-disc list-inside space-y-1 text-gray-400'>
                    <li>Automated testing and CI/CD integration</li>
                    <li>Performance and load testing</li>
                    <li>Security vulnerability assessment</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='bg-gray-800/60 border-gray-700/50 hover:border-cyan-500/50 transition-all'>
                <CardHeader>
                  <CardTitle className='text-white flex items-center'>
                    <Code className='w-5 h-5 mr-2 text-cyan-400' />
                    Technical Documentation Specialist
                  </CardTitle>
                  <CardDescription className='text-gray-400'>Documentation & Knowledge Management</CardDescription>
                </CardHeader>
                <CardContent className='text-gray-300 text-sm'>
                  <p className='mb-3'>
                    Creates comprehensive technical documentation, API references, and training materials. Ensures knowledge transfer 
                    and smooth onboarding for all stakeholders.
                  </p>
                  <ul className='list-disc list-inside space-y-1 text-gray-400'>
                    <li>Technical API documentation</li>
                    <li>Training materials and guides</li>
                    <li>Knowledge base management</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='bg-gray-800/60 border-gray-700/50 hover:border-red-500/50 transition-all'>
                <CardHeader>
                  <CardTitle className='text-white flex items-center'>
                    <Shield className='w-5 h-5 mr-2 text-red-400' />
                    Support Operations Manager
                  </CardTitle>
                  <CardDescription className='text-gray-400'>24/7 Support & Customer Success</CardDescription>
                </CardHeader>
                <CardContent className='text-gray-300 text-sm'>
                  <p className='mb-3'>
                    Oversees 24-hour live support operations, ensures SLA compliance, manages support tickets, and maintains customer 
                    satisfaction metrics. First point of contact for enterprise clients.
                  </p>
                  <ul className='list-disc list-inside space-y-1 text-gray-400'>
                    <li>24/7 support desk management</li>
                    <li>SLA monitoring and compliance</li>
                    <li>Customer issue resolution and escalation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* External Support Staff */}
          <div>
            <h3 className='text-2xl font-bold text-white mb-6 flex items-center'>
              <Palette className='w-6 h-6 mr-3 text-secondary-400' />
              External Support & Specialist Partners
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Card className='bg-gray-800/60 border-gray-700/50 hover:border-green-500/50 transition-all'>
                <CardHeader>
                  <CardTitle className='text-white'>Specialized Consultants</CardTitle>
                  <CardDescription className='text-gray-400'>Domain-Specific Expertise</CardDescription>
                </CardHeader>
                <CardContent className='text-gray-300 text-sm space-y-2'>
                  <p>Contract specialists for healthcare compliance, financial services regulations, and industry-specific optimization.</p>
                  <ul className='list-disc list-inside space-y-1 text-gray-400'>
                    <li>Compliance and regulatory experts</li>
                    <li>Healthcare HIPAA specialists</li>
                    <li>Financial services consultants</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='bg-gray-800/60 border-gray-700/50 hover:border-purple-500/50 transition-all'>
                <CardHeader>
                  <CardTitle className='text-white'>Research Partners</CardTitle>
                  <CardDescription className='text-gray-400'>Academic & Innovation Collaboration</CardDescription>
                </CardHeader>
                <CardContent className='text-gray-300 text-sm space-y-2'>
                  <p>Academic institutions and research organizations contributing to quantum computing, AI, and mathematical innovation.</p>
                  <ul className='list-disc list-inside space-y-1 text-gray-400'>
                    <li>University research collaborators</li>
                    <li>Peer-review publications support</li>
                    <li>Quantum research partnerships</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='bg-gray-800/60 border-gray-700/50 hover:border-indigo-500/50 transition-all'>
                <CardHeader>
                  <CardTitle className='text-white'>Integration Specialists</CardTitle>
                  <CardDescription className='text-gray-400'>Third-Party & Legacy System Integration</CardDescription>
                </CardHeader>
                <CardContent className='text-gray-300 text-sm space-y-2'>
                  <p>Expert contractors for integrating with existing enterprise systems and third-party platforms.</p>
                  <ul className='list-disc list-inside space-y-1 text-gray-400'>
                    <li>Legacy system modernization</li>
                    <li>API and middleware integration</li>
                    <li>Data migration specialists</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='bg-gray-800/60 border-gray-700/50 hover:border-orange-500/50 transition-all'>
                <CardHeader>
                  <CardTitle className='text-white'>Training & Enablement</CardTitle>
                  <CardDescription className='text-gray-400'>Client Education Programs</CardDescription>
                </CardHeader>
                <CardContent className='text-gray-300 text-sm space-y-2'>
                  <p>Certified trainers and instructional designers developing custom training programs and certifications.</p>
                  <ul className='list-disc list-inside space-y-1 text-gray-400'>
                    <li>Custom training curriculum development</li>
                    <li>Certification program management</li>
                    <li>Hands-on workshop facilitation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Our Commitment Section */}
        <div className='max-w-4xl mx-auto mb-20 bg-gradient-to-r from-primary-900/40 to-secondary-900/40 border border-primary-500/20 rounded-xl p-12'>
          <h2 className='text-3xl font-bold text-white mb-6'>Our Team Commitment</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div>
              <h3 className='text-primary-400 font-bold mb-3'>Excellence</h3>
              <p className='text-gray-300 text-sm'>
                Every team member upholds the highest standards of technical excellence, professional integrity, and client service.
              </p>
            </div>
            <div>
              <h3 className='text-secondary-400 font-bold mb-3'>Innovation</h3>
              <p className='text-gray-300 text-sm'>
                We continuously push boundaries, research emerging technologies, and bring cutting-edge solutions to enterprise challenges.
              </p>
            </div>
            <div>
              <h3 className='text-cyan-400 font-bold mb-3'>Support</h3>
              <p className='text-gray-300 text-sm'>
                24/7 availability, rapid response times, and unwavering commitment to client success define our support philosophy.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='max-w-4xl mx-auto text-center mb-8'>
          <h2 className='text-3xl font-bold text-white mb-6'>Ready to Transform Your Organization?</h2>
          <p className='text-gray-300 text-lg mb-8'>
            Connect with our team to discover how Lumen Helix Solutions can drive your digital transformation.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/contact'>
              <Button className='bg-primary-600 hover:bg-primary-700 text-white px-8'>
                Schedule a Consultation
              </Button>
            </Link>
            <Link href='/services'>
              <Button variant='outline' className='border-primary-500 text-primary-400 hover:bg-primary-950 bg-transparent px-8'>
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
