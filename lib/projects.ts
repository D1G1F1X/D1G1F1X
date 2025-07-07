import type { StaticImageData } from "next/image"

import numoracleImage from "@/public/images/projects/numoracle-oracle-cards.jpg"
import kraftwerkImage from "@/public/images/projects/kraftwerk-numerology.jpg"
import hodgeDocImage from "@/public/images/projects/hodge-documentary.jpg"
import lolitaWilsonImage from "@/public/images/projects/lolita-wilson-portfolio.jpg"
import nowoRadioImage from "@/public/images/projects/nowo-radio.jpg"
import oyahLoveImage from "@/public/images/projects/oyah-love.jpg"
import meltImage from "@/public/images/projects/melt.jpg"
import aiContentGeneratorImage from "@/public/images/projects/ai-content-generator.png"
import brandIdentitySystemImage from "@/public/images/projects/brand-identity-system.png"
import dataVisualizationDashboardImage from "@/public/images/projects/data-visualization-dashboard.png"
import eCommercePlatformImage from "@/public/images/projects/e-commerce-platform.png"
import enterpriseProjectManagementImage from "@/public/images/projects/enterprise-project-management.png"
import virtualEventPlatformImage from "@/public/images/projects/virtual-event-platform.png"

export type Project = {
  id: string
  title: string
  description: string
  image: StaticImageData | string
  category: "in-house" | "client"
  tags: string[]
  domain?: string
  liveSiteUrl?: string
  githubUrl?: string
  deploymentDate?: string
  timeline?: string
  status?: "completed" | "in-progress" | "beta" | "archived"
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: "numoracle-oracle-cards",
    title: "Numoracle Oracle Cards",
    description:
      "A digital oracle card application that combines numerology with intuitive card readings for daily guidance and insights.",
    image: numoracleImage,
    category: "in-house",
    tags: ["Numerology", "Oracle Cards", "Spirituality", "Web App", "React", "Next.js"],
    domain: "numoracle.com",
    liveSiteUrl: "https://numoracle.com",
    deploymentDate: "2024-06-15",
    timeline: "2024 - Present",
    status: "in-progress",
    featured: true,
  },
  {
    id: "kraftwerk-numerology",
    title: "Kraftwerk Numerology",
    description:
      "An advanced numerology platform offering personalized reports, compatibility analysis, and predictive insights.",
    image: kraftwerkImage,
    category: "in-house",
    tags: ["Numerology", "Personal Development", "Analytics", "Web Platform", "React", "Node.js"],
    domain: "kraftwerked.com",
    liveSiteUrl: "https://kraftwerked.com",
    deploymentDate: "2024-05-20",
    timeline: "2023 - Present",
    status: "in-progress",
    featured: true,
  },
  {
    id: "hodge-documentary",
    title: "Hodge Documentary",
    description:
      "A promotional website for a documentary film, featuring trailers, cast information, and screening schedules.",
    image: hodgeDocImage,
    category: "client",
    tags: ["Film", "Documentary", "Promotional", "Website", "Next.js", "Content Management"],
    domain: "hodgedoc.com",
    liveSiteUrl: "https://hodgedoc.com",
    deploymentDate: "2023-11-01",
    timeline: "2023",
    status: "completed",
    featured: true,
  },
  {
    id: "melt",
    title: "M.E.L.T. (Monitor Enforcement Locate Threats)",
    description:
      "A web community-powered platform designed to provide real-time alerts, notifications, and insights into immigration & ICE sightings and threat levels in your area!",
    image: meltImage, // This will be updated to the new screenshot
    category: "in-house",
    tags: [
      "Real-time Alerts",
      "Community Reporting",
      "Threat Monitoring",
      "Location-based Services",
      "Secure Communication",
    ],
    domain: "icemelt.app",
    liveSiteUrl: "https://icemelt.app",
    deploymentDate: "2024-07-05",
    timeline: "2023 - Present",
    status: "beta",
    featured: true,
  },
  {
    id: "lolita-wilson-portfolio",
    title: "Lolita Wilson Portfolio",
    description:
      "A professional portfolio website for artist Lolita Wilson, showcasing her diverse range of artworks and exhibitions.",
    image: lolitaWilsonImage,
    category: "client",
    tags: ["Art", "Portfolio", "Artist", "Website", "Gallery", "Next.js"],
    domain: "lolitawilson.com",
    liveSiteUrl: "https://lolitawilson.com",
    deploymentDate: "2023-09-10",
    timeline: "2023",
    status: "completed",
    featured: false,
  },
  {
    id: "nowo-radio",
    title: "NOWO Radio",
    description:
      "An online radio streaming platform featuring live broadcasts, podcasts, and a schedule of upcoming shows.",
    image: nowoRadioImage,
    category: "client",
    tags: ["Radio", "Streaming", "Podcast", "Entertainment", "Web App"],
    domain: "noworadio.com",
    liveSiteUrl: "https://noworadio.com",
    deploymentDate: "2022-08-20",
    timeline: "2022",
    status: "completed",
    featured: false,
  },
  {
    id: "oyah-love",
    title: "Oyah Love",
    description:
      "An e-commerce store specializing in unique, handcrafted jewelry and accessories, with secure payment integration.",
    image: oyahLoveImage,
    category: "client",
    tags: ["E-commerce", "Jewelry", "Handcrafted", "Online Store", "Shopify"],
    domain: "oyahlove.com",
    liveSiteUrl: "https://oyahlove.com",
    deploymentDate: "2022-03-05",
    timeline: "2022",
    status: "completed",
    featured: false,
  },
  {
    id: "ai-content-generator",
    title: "AI Content Generator",
    description: "A powerful AI-driven platform for generating high-quality articles, blog posts, and marketing copy.",
    image: aiContentGeneratorImage,
    category: "in-house",
    tags: ["AI", "Content Creation", "SaaS", "GPT", "Next.js", "Tailwind CSS"],
    deploymentDate: "2023-10-20",
    timeline: "2023",
    status: "completed",
    featured: false,
  },
  {
    id: "brand-identity-system",
    title: "Brand Identity System",
    description:
      "Comprehensive brand guidelines and asset library for a startup, ensuring consistent visual communication.",
    image: brandIdentitySystemImage,
    category: "client",
    tags: ["Branding", "Design System", "Guidelines", "UI/UX"],
    deploymentDate: "2023-07-15",
    timeline: "2023",
    status: "completed",
    featured: false,
  },
  {
    id: "data-visualization-dashboard",
    title: "Data Visualization Dashboard",
    description:
      "An interactive dashboard for analyzing complex datasets, providing actionable insights through intuitive visualizations.",
    image: dataVisualizationDashboardImage,
    category: "in-house",
    tags: ["Data Analytics", "Dashboard", "BI", "React", "D3.js"],
    deploymentDate: "2023-05-01",
    timeline: "2023",
    status: "completed",
    featured: false,
  },
  {
    id: "e-commerce-platform",
    title: "E-commerce Platform",
    description:
      "A scalable e-commerce solution with robust product management, secure payment gateway, and user-friendly interface.",
    image: eCommercePlatformImage,
    category: "client",
    tags: ["E-commerce", "Online Store", "Payment Gateway", "Next.js", "Stripe"],
    deploymentDate: "2022-11-30",
    timeline: "2022",
    status: "completed",
    featured: false,
  },
  {
    id: "enterprise-project-management-system",
    title: "Enterprise Project Management System",
    description:
      "A custom-built system for large organizations to manage projects, track progress, and collaborate efficiently.",
    image: enterpriseProjectManagementImage,
    category: "client",
    tags: ["Project Management", "Enterprise Software", "Collaboration", "SaaS"],
    deploymentDate: "2022-09-01",
    timeline: "2022",
    status: "completed",
    featured: false,
  },
  {
    id: "virtual-event-platform",
    title: "Virtual Event Platform",
    description:
      "A comprehensive platform for hosting virtual conferences and events, featuring live streaming, networking, and interactive sessions.",
    image: virtualEventPlatformImage,
    category: "in-house",
    tags: ["Virtual Events", "Live Streaming", "Networking", "Event Management"],
    deploymentDate: "2022-06-20",
    timeline: "2022",
    status: "completed",
    featured: false,
  },
]

export const featuredProjects = [
  projects.find((p) => p.id === "numoracle-oracle-cards")!,
  projects.find((p) => p.id === "kraftwerk-numerology")!,
  projects.find((p) => p.id === "hodge-documentary")!,
  projects.find((p) => p.id === "melt")!,
]

export function getBetaProjects() {
  return projects.filter((project) => project.status === "beta")
}
