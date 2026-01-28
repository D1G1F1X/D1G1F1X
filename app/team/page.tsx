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
        badge='Our Support Team'
        title='Meet the Lumen Helix Support Staff'
        subtitle='Dedicated professionals providing 24/7 operational excellence and client support'
      />

      {/* Glowing orbs for visual effect */}
      <div className='absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow'></div>
      <div className='absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow'></div>

      <div className='container px-4 mx-auto py-16 relative z-10'>
        {/* Support Staff */}
        <div className='max-w-6xl mx-auto mb-20'>
          <div className='mb-12'>
            <h2 className='text-4xl font-bold text-white mb-4 flex items-center'>
              <Users className='w-8 h-8 mr-3 text-primary-400' />
              Support Staff
            </h2>
            <p className='text-gray-300 text-lg'>
              Our dedicated support team ensures operational excellence and provides 24/7 assistance to clients.
            </p>
          </div>

          <div className='mb-12'>
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
