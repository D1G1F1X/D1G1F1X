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
  Code,
  Palette,
  Globe,
  Smartphone,
  ShoppingBag,
  Calendar,
  Layout,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageHero from "@/components/page-hero"

export default function LolitaWilsonCaseStudy() {
  const [activeTab, setActiveTab] = useState("overview")

  const metrics = [
    { label: "Mobile Usability", value: "98%", icon: Smartphone },
    { label: "Load Time", value: "<1.5s", icon: Zap },
    { label: "User Retention", value: "+142%", icon: Users },
    { label: "Conversion Rate", value: "+78%", icon: TrendingUp },
  ]

  const services = [
    { name: "Web Development", icon: Code, description: "Responsive artist portfolio with modern frameworks" },
    { name: "Logo Design", icon: Palette, description: "Elegant gold typography and brand identity" },
    { name: "E-commerce", icon: ShoppingBag, description: "Integrated shop for merchandise and artwork" },
    { name: "Event Management", icon: Calendar, description: "Custom calendar and event booking system" },
    { name: "UI/UX Design", icon: Layout, description: "Intuitive interface with dark mode support" },
    { name: "SEO Optimization", icon: Globe, description: "Artist-focused search engine strategy" },
  ]

  const timeline = [
    { phase: "Discovery & Research", duration: "2 weeks", description: "Artist needs analysis and audience research" },
    { phase: "Brand Development", duration: "2 weeks", description: "Logo design and visual identity" },
    { phase: "Wireframing", duration: "1 week", description: "User flow and interface planning" },
    { phase: "Development Sprint 1", duration: "3 weeks", description: "Core portfolio and authentication" },
    { phase: "Development Sprint 2", duration: "3 weeks", description: "E-commerce and event management" },
    { phase: "Content Integration", duration: "1 week", description: "Artist portfolio content upload" },
    { phase: "Testing & Refinement", duration: "2 weeks", description: "Performance tuning and QA" },
    { phase: "Beta Launch", duration: "1 week", description: "Controlled release and feedback collection" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        title="LolitaWilson.com Case Study"
        subtitle="Artist portfolio website with integrated e-commerce and event management"
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
              LolitaWilson.com represents a comprehensive digital platform for an established artist, combining an
              elegant portfolio showcase with practical e-commerce and event management functionality.
            </p>
            <p className="text-muted-foreground mb-6">
              This project demonstrates our ability to create sophisticated, brand-aligned digital experiences that
              serve both aesthetic and functional purposes, helping artists connect with their audience while monetizing
              their work effectively.
            </p>
            <div className="flex gap-4 mb-8">
              <Button asChild>
                <Link href="https://lolitawilson.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Preview Beta
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <span className="font-semibold">Category:</span> Client Project
              </div>
              <div>
                <span className="font-semibold">Status:</span> <Badge variant="default">Beta</Badge>
              </div>
              <div>
                <span className="font-semibold">Duration:</span> 3 months
              </div>
              <div>
                <span className="font-semibold">Team Size:</span> 5 specialists
              </div>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/images/projects/lolita-wilson-website.png"
              alt="LolitaWilson.com Screenshot"
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
                  LolitaWilson.com was conceived as a sophisticated digital platform to showcase the artist's diverse
                  portfolio while providing practical tools for audience engagement and commerce. The vision was to
                  create a digital experience that would reflect the artist's unique aesthetic while serving as a
                  functional hub for their professional activities.
                </p>
                <p>
                  By combining elegant design with practical functionality, we aimed to create a platform that would
                  elevate the artist's online presence and provide multiple avenues for audience connection and business
                  growth.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h4 className="font-semibold mb-3">Primary Objectives</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Create a visually striking portfolio showcase</li>
                      <li>• Implement seamless e-commerce functionality</li>
                      <li>• Develop an intuitive event management system</li>
                      <li>• Establish a cohesive brand identity</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Target Audience</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Art collectors and enthusiasts</li>
                      <li>• Gallery owners and curators</li>
                      <li>• Event organizers and venues</li>
                      <li>• Art students and educators</li>
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
                <p>Creating LolitaWilson.com presented several unique challenges that required innovative solutions:</p>
                <div className="space-y-6 mt-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Palette className="mr-2 h-5 w-5 text-primary" />
                      Balancing Aesthetics and Functionality
                    </h4>
                    <p className="text-muted-foreground">
                      Creating a visually striking design that showcased the artist's work while ensuring intuitive
                      navigation and practical functionality for e-commerce and event management.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
                      Integrated E-commerce
                    </h4>
                    <p className="text-muted-foreground">
                      Developing a seamless shopping experience that could handle both physical merchandise and digital
                      products while maintaining the site's elegant aesthetic.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      Event Management Complexity
                    </h4>
                    <p className="text-muted-foreground">
                      Creating a flexible event system that could handle various types of events, from gallery openings
                      to workshops, with different registration requirements and capacity limitations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Zap className="mr-2 h-5 w-5 text-primary" />
                      Performance with Rich Media
                    </h4>
                    <p className="text-muted-foreground">
                      Optimizing the site to load quickly and perform smoothly despite featuring numerous high-quality
                      images and interactive elements essential for showcasing the artist's work.
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
                  We approached LolitaWilson.com with a comprehensive strategy that integrated multiple services into a
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
                      <span>Custom portfolio gallery with category filtering</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Integrated event calendar with booking functionality</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Secure e-commerce with multiple payment options</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Content management system for artist self-updates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Elegant dark mode with gold accent color scheme</span>
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
                  Our implementation followed an agile methodology with continuous client feedback:
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
                          <strong>Frontend:</strong> Next.js 14, React, Tailwind CSS
                        </li>
                        <li>
                          <strong>Backend:</strong> Node.js, Serverless Functions
                        </li>
                        <li>
                          <strong>E-commerce:</strong> Custom integration with Stripe
                        </li>
                        <li>
                          <strong>Authentication:</strong> NextAuth.js, JWT
                        </li>
                        <li>
                          <strong>Deployment:</strong> Vercel, CI/CD pipeline
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
                          <strong>Lighthouse Score:</strong> 94/100
                        </li>
                        <li>
                          <strong>First Contentful Paint:</strong> 0.9s
                        </li>
                        <li>
                          <strong>Time to Interactive:</strong> 1.5s
                        </li>
                        <li>
                          <strong>Core Web Vitals:</strong> All green
                        </li>
                        <li>
                          <strong>Mobile Performance:</strong> 92/100
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
              LolitaWilson.com represents a successful integration of artistic vision with practical functionality. The
              platform has significantly enhanced the artist's online presence and provided new avenues for audience
              engagement and revenue generation.
            </p>
            <p>
              The project demonstrates our ability to create sophisticated digital platforms that serve both aesthetic
              and practical purposes, tailored to the unique needs of creative professionals.
            </p>
            <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-3">Looking Forward</h4>
              <p className="text-muted-foreground">
                As the platform moves from beta to full launch, we continue to refine features based on user feedback
                and plan to implement advanced analytics, virtual exhibition capabilities, and enhanced social media
                integration to further expand the artist's digital reach.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Need a Similar Solution?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can create a tailored digital platform that showcases your unique vision and connects
            you with your audience.
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
