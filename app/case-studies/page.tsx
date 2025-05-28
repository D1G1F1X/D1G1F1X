"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, Users, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PageHero from "@/components/page-hero"

const caseStudies = [
  {
    id: "kraftwerked",
    title: "Kraftwerked.com",
    description: "A comprehensive digital platform showcasing the full spectrum of our capabilities",
    image: "/images/projects/kraftwerked-website.png",
    category: "In-House Project",
    metrics: [
      { label: "User Engagement", value: "+287%", icon: Users },
      { label: "Performance", value: "98/100", icon: Zap },
      { label: "Conversion Rate", value: "+156%", icon: BarChart3 },
    ],
    tags: ["Web Development", "Branding", "Web Apps", "Full-Stack"],
  },
  {
    id: "numo-oracle",
    title: "NUMO Oracle System",
    description: "An innovative divination platform bridging ancient wisdom with modern AI technology",
    image: "/images/projects/numo-oracle-system.png",
    category: "In-House Project",
    metrics: [
      { label: "User Retention", value: "+342%", icon: Users },
      { label: "AI Accuracy", value: "94%", icon: Zap },
      { label: "Engagement", value: "+215%", icon: BarChart3 },
    ],
    tags: ["AI Integration", "Spiritual Tech", "Interactive Design", "Branding"],
  },
  {
    id: "lolita-wilson",
    title: "LolitaWilson.com",
    description: "A sophisticated artist portfolio with integrated e-commerce and event management",
    image: "/images/projects/lolita-wilson-website.png",
    category: "Client Project",
    metrics: [
      { label: "Mobile Usability", value: "98%", icon: Users },
      { label: "Load Time", value: "<1.5s", icon: Zap },
      { label: "Conversion Rate", value: "+78%", icon: BarChart3 },
    ],
    tags: ["Artist Portfolio", "E-commerce", "Custom Web App"],
  },
  {
    id: "hodge-documentary",
    title: "The Hodge Documentary",
    description: "A powerful web presence for a social impact documentary featuring Cleveland artists",
    image: "/images/projects/hodge-documentary.png",
    category: "Client Project",
    metrics: [
      { label: "Page Views", value: "+450%", icon: Users },
      { label: "Load Time", value: "<2s", icon: Zap },
      { label: "Engagement", value: "+320%", icon: BarChart3 },
    ],
    tags: ["Web Development", "Logo Design", "Social Impact"],
  },
  {
    id: "enterprise-pm",
    title: "Enterprise Project Management",
    description: "A scalable project management platform for enterprise-level coordination",
    image: "/images/projects/enterprise-project-management.png",
    category: "In-House Project",
    metrics: [
      { label: "Active Users", value: "10K+", icon: Users },
      { label: "Uptime", value: "99.9%", icon: Zap },
      { label: "Productivity", value: "+45%", icon: BarChart3 },
    ],
    tags: ["SaaS", "Enterprise", "Project Management"],
  },
]

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHero title="Case Studies" subtitle="Deep dives into our most impactful projects and their success stories" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8">
          {caseStudies.map((study) => (
            <Card key={study.id} className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-video md:aspect-auto">
                  <Image src={study.image || "/placeholder.svg"} alt={study.title} fill className="object-cover" />
                </div>
                <div className="p-8">
                  <CardHeader className="p-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{study.category}</Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2">{study.title}</CardTitle>
                    <CardDescription className="text-base">{study.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 mt-6">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {study.metrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                          <metric.icon className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                          <div className="font-bold text-lg">{metric.value}</div>
                          <div className="text-xs text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/case-studies/${study.id}`}>
                        Read Full Case Study
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Have a Project in Mind?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar results for your business.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Start a Conversation</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
