"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ExternalLink,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Sparkles,
  Code,
  Palette,
  BarChart3,
  Globe,
  Smartphone,
  Database,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageHero from "@/components/page-hero"

export default function KraftwerkedCaseStudy() {
  const [activeTab, setActiveTab] = useState("overview")

  const metrics = [
    { label: "User Engagement", value: "+287%", icon: Users },
    { label: "Load Time", value: "<1.2s", icon: Zap },
    { label: "Conversion Rate", value: "+156%", icon: TrendingUp },
    { label: "Uptime", value: "99.9%", icon: Shield },
  ]

  const services = [
    { name: "Web Development", icon: Code, description: "Full-stack development with modern frameworks" },
    { name: "Graphic Design", icon: Palette, description: "Complete brand identity and visual system" },
    { name: "Web Applications", icon: Globe, description: "Suite of interactive numerology tools" },
    { name: "Marketing Strategy", icon: BarChart3, description: "SEO optimization and content strategy" },
    { name: "Mobile Optimization", icon: Smartphone, description: "Responsive design across all devices" },
    { name: "Data Architecture", icon: Database, description: "Scalable backend infrastructure" },
  ]

  const timeline = [
    { phase: "Discovery & Research", duration: "2 weeks", description: "Market analysis and user research" },
    { phase: "Brand Development", duration: "3 weeks", description: "Logo design and visual identity" },
    { phase: "Architecture Planning", duration: "2 weeks", description: "Technical stack and infrastructure" },
    { phase: "Development Sprint 1", duration: "4 weeks", description: "Core platform and authentication" },
    { phase: "Development Sprint 2", duration: "4 weeks", description: "Numerology engines and calculators" },
    { phase: "Development Sprint 3", duration: "3 weeks", description: "User dashboard and analytics" },
    { phase: "Testing & Optimization", duration: "2 weeks", description: "Performance tuning and QA" },
    { phase: "Launch & Deployment", duration: "1 week", description: "Production deployment and monitoring" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        title="Kraftwerked.com Case Study"
        subtitle="A comprehensive digital platform showcasing the full spectrum of our capabilities"
      />

      <div className="container mx-auto px-4 py-12">
        <Link href="/portfolio" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Link>

        {/* Project Overview */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Kraftwerked.com represents the pinnacle of our in-house capabilities, combining cutting-edge web
              development, sophisticated branding, and a suite of custom web applications into a unified platform for
              numerology insights and analysis.
            </p>
            <p className="text-muted-foreground mb-6">
              This project showcases our ability to conceptualize, design, and execute complex digital ecosystems that
              seamlessly integrate multiple services while maintaining exceptional performance and user experience.
            </p>
            <div className="flex gap-4 mb-8">
              <Button asChild>
                <Link href="https://www.kraftwerked.com/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Live Site
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <span className="font-semibold">Category:</span> In-House Project
              </div>
              <div>
                <span className="font-semibold">Status:</span> <Badge variant="default">Deployed</Badge>
              </div>
              <div>
                <span className="font-semibold">Duration:</span> 5 months
              </div>
              <div>
                <span className="font-semibold">Team Size:</span> 8 specialists
              </div>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/images/projects/kraftwerked-website.png"
              alt="Kraftwerked.com Screenshot"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Impact & Results</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric) => (
              <Card key={metric.label}>
                <CardContent className="p-6 text-center">
                  <metric.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold mb-2">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Project Gallery */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Project Gallery</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/projects/kraftwerked-website.png"
                alt="Kraftwerked.com Homepage"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/projects/kraftwerked-loading.png"
                alt="Kraftwerked.com Loading Screen"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Detailed Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-16">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="challenge">Challenge</TabsTrigger>
            <TabsTrigger value="solution">Solution</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>The Vision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Kraftwerked.com was conceived as a flagship demonstration of our integrated service capabilities. The
                  platform serves as both a functional numerology service and a testament to our expertise in creating
                  sophisticated digital experiences.
                </p>
                <p>
                  By leveraging our full spectrum of services—from initial brand conception to complex web application
                  development—we created a platform that not only meets user needs but exceeds expectations in terms of
                  performance, aesthetics, and functionality.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h4 className="font-semibold mb-3">Primary Objectives</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Create a unified platform for numerology services</li>
                      <li>• Demonstrate our full-service capabilities</li>
                      <li>• Establish a scalable architecture for future growth</li>
                      <li>• Deliver exceptional user experience across devices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Target Audience</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Numerology enthusiasts and practitioners</li>
                      <li>• Individuals seeking personal insights</li>
                      <li>• Spiritual and wellness communities</li>
                      <li>• Mobile-first users requiring on-the-go access</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenge" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>The Challenge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Creating Kraftwerked.com presented unique challenges that required innovative solutions across
                  multiple disciplines:
                </p>
                <div className="space-y-6 mt-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Sparkles className="mr-2 h-5 w-5 text-primary" />
                      Technical Complexity
                    </h4>
                    <p className="text-muted-foreground">
                      Developing accurate numerology algorithms while maintaining real-time performance required
                      sophisticated optimization techniques and efficient data processing.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Users className="mr-2 h-5 w-5 text-primary" />
                      User Experience Design
                    </h4>
                    <p className="text-muted-foreground">
                      Making complex numerological concepts accessible to both beginners and experts demanded intuitive
                      interface design and progressive disclosure of information.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-primary" />
                      Data Security & Privacy
                    </h4>
                    <p className="text-muted-foreground">
                      Handling sensitive personal information required implementing robust security measures and
                      ensuring compliance with data protection regulations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Zap className="mr-2 h-5 w-5 text-primary" />
                      Performance Optimization
                    </h4>
                    <p className="text-muted-foreground">
                      Delivering instant calculations and smooth animations while maintaining sub-second load times
                      across all devices and network conditions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="solution" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Our Solution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>
                  We approached Kraftwerked.com with a holistic strategy that integrated all our services into a
                  cohesive solution:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {services.map((service) => (
                    <div key={service.name} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <service.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{service.name}</h4>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-4">Key Innovations</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Custom numerology engine with millisecond calculation times</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Progressive web app architecture for offline functionality</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>AI-powered insights and personalized recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Microservices architecture for independent scaling</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Real-time collaboration features for practitioners</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Process</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-8">
                  Our implementation followed an agile methodology with continuous integration and deployment:
                </p>

                <div className="space-y-4">
                  {timeline.map((phase, index) => (
                    <div key={phase.phase} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{phase.phase}</h4>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Technology Stack</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>Frontend:</strong> Next.js 14, TypeScript, Tailwind CSS
                        </li>
                        <li>
                          <strong>Backend:</strong> Node.js, Express, PostgreSQL
                        </li>
                        <li>
                          <strong>Infrastructure:</strong> Vercel, AWS, Cloudflare
                        </li>
                        <li>
                          <strong>Analytics:</strong> Custom analytics engine
                        </li>
                        <li>
                          <strong>Security:</strong> OAuth 2.0, JWT, SSL/TLS
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>Lighthouse Score:</strong> 98/100
                        </li>
                        <li>
                          <strong>First Contentful Paint:</strong> 0.8s
                        </li>
                        <li>
                          <strong>Time to Interactive:</strong> 1.2s
                        </li>
                        <li>
                          <strong>Core Web Vitals:</strong> All green
                        </li>
                        <li>
                          <strong>Mobile Performance:</strong> 96/100
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Conclusion */}
        <Card>
          <CardHeader>
            <CardTitle>Project Impact & Future</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Kraftwerked.com stands as a testament to what's possible when all our services work in harmony. The
              platform has not only achieved its initial objectives but has exceeded expectations in user adoption and
              engagement.
            </p>
            <p>
              The success of this project demonstrates our ability to handle complex, multi-faceted digital initiatives
              from conception to deployment and beyond. It serves as both a functional platform and a showcase of our
              comprehensive capabilities.
            </p>
            <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-3">Looking Forward</h4>
              <p className="text-muted-foreground">
                We continue to enhance Kraftwerked.com with new features, including AI-powered predictions, expanded
                calculation methods, and integration with emerging technologies. The platform serves as our innovation
                lab where we test and refine new approaches before offering them to clients.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can apply the same comprehensive approach and attention to detail to your project.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Start Your Project</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">View More Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
