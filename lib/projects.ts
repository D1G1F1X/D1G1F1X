import type { Project } from "@/lib/types"

export const projects: Project[] = [
  {
    id: "numoracle-oracle-cards",
    title: "Numoracle Oracle Cards",
    category: "client",
    description: "A digital oracle card application for daily guidance and insights based on numerology.",
    image: "/images/projects/numoracle-oracle-cards.jpg",
    tags: ["Web Development", "Numerology", "Oracle Cards", "React", "Next.js", "Supabase"],
    link: "https://numoracle.com",
    timeline: "2024 - Present",
    stage: "live",
  },
  {
    id: "kraftwerk-numerology",
    title: "Kraftwerk Numerology",
    category: "client",
    description: "An interactive platform offering personalized numerology readings and reports.",
    image: "/images/projects/kraftwerk-numerology.jpg",
    tags: ["Web Development", "Numerology", "Personalized Reports", "React", "Next.js", "API Integration"],
    link: "https://kraftwerked.com",
    timeline: "2023 - Present",
    stage: "live",
  },
  {
    id: "hodge-documentary",
    title: "Hodge Documentary",
    category: "client",
    description:
      "A promotional website for a documentary film, featuring trailers, cast information, and screening schedules.",
    image: "/images/projects/hodge-documentary.jpg",
    tags: ["Web Design", "Film Promotion", "Documentary", "Next.js", "Content Management"],
    link: "https://hodgedoc.com",
    timeline: "2023 - 2024",
    stage: "live",
  },
  {
    id: "lolita-wilson-portfolio",
    title: "Lolita Wilson Portfolio",
    category: "client",
    description: "A professional portfolio website for artist Lolita Wilson, showcasing her artwork and exhibitions.",
    image: "/images/projects/lolita-wilson-portfolio.jpg",
    tags: ["Portfolio", "Art", "Web Design", "Next.js", "Gallery"],
    link: "https://lolitawilson.com",
    timeline: "2022 - 2023",
    stage: "live",
  },
  {
    id: "melt",
    title: "M.E.L.T. (Monitor Enforcement Locate Threats)",
    category: "in-house",
    description:
      "A web community-powered platform providing real-time alerts and insights into immigration & ICE sightings.",
    image: "/images/projects/melt.jpg",
    tags: [
      "Real-time Alerts",
      "Community Reporting",
      "Threat Monitoring",
      "Location-based Services",
      "Secure Communication",
    ],
    link: "https://icemelt.app",
    timeline: "2023 - Present",
    stage: "beta",
  },
  {
    id: "nowo-radio",
    title: "NOWO Radio",
    category: "client",
    description:
      "A modern web application for an online radio station, featuring live streaming, show schedules, and artist profiles.",
    image: "/images/projects/nowo-radio.jpg",
    tags: ["Web Development", "Live Streaming", "Radio", "Next.js", "Audio Player"],
    link: "https://noworadio.com",
    timeline: "2024 - Present",
    stage: "live",
  },
  {
    id: "oyah-love",
    title: "Oyah Love",
    category: "client",
    description:
      "An e-commerce platform for a unique fashion brand, focusing on sustainable and ethically sourced clothing.",
    image: "/images/projects/oyah-love.jpg",
    tags: ["E-commerce", "Fashion", "Sustainable", "Shopify Integration", "Web Design"],
    link: "https://oyahlove.com",
    timeline: "2023 - Present",
    stage: "live",
  },
  {
    id: "ai-content-generator",
    title: "AI Content Generator",
    category: "in-house",
    description: "An intelligent platform leveraging AI to generate high-quality content for various marketing needs.",
    image: "/images/projects/ai-content-generator.png",
    tags: ["AI", "Content Creation", "Marketing Automation", "GPT Integration", "SaaS"],
    link: "#",
    timeline: "2023 - Present",
    stage: "development",
  },
  {
    id: "brand-identity-system",
    title: "Brand Identity System",
    category: "client",
    description:
      "Development of a comprehensive brand identity system for a startup, including logo, typography, and style guides.",
    image: "/images/projects/brand-identity-system.png",
    tags: ["Branding", "Graphic Design", "Logo Design", "Style Guide", "Visual Identity"],
    link: "#",
    timeline: "2022 - 2023",
    stage: "completed",
  },
  {
    id: "data-visualization-dashboard",
    title: "Data Visualization Dashboard",
    category: "in-house",
    description:
      "An interactive dashboard for visualizing complex datasets, providing actionable insights for business intelligence.",
    image: "/images/projects/data-visualization-dashboard.png",
    tags: ["Data Visualization", "Business Intelligence", "Dashboard", "React", "D3.js", "Analytics"],
    link: "#",
    timeline: "2023 - Present",
    stage: "development",
  },
  {
    id: "e-commerce-platform",
    title: "E-commerce Platform",
    category: "client",
    description:
      "A scalable e-commerce solution for a retail client, featuring product management, secure payments, and order fulfillment.",
    image: "/images/projects/e-commerce-platform.png",
    tags: ["E-commerce", "Retail", "Payment Gateway", "Inventory Management", "Next.js", "Stripe"],
    link: "#",
    timeline: "2022 - 2023",
    stage: "completed",
  },
  {
    id: "enterprise-project-management-system",
    title: "Enterprise Project Management System",
    category: "in-house",
    description:
      "A robust system designed to streamline project workflows, resource allocation, and team collaboration for large enterprises.",
    image: "/images/projects/enterprise-project-management.png",
    tags: ["Project Management", "Enterprise Software", "Workflow Automation", "Collaboration Tools", "SaaS"],
    link: "#",
    timeline: "2024 - Present",
    stage: "development",
  },
  {
    id: "virtual-event-platform",
    title: "Virtual Event Platform",
    category: "client",
    description:
      "A comprehensive platform for hosting virtual conferences and events, with features like live streaming, networking, and interactive sessions.",
    image: "/images/projects/virtual-event-platform.png",
    tags: ["Virtual Events", "Live Streaming", "Networking", "Event Management", "WebRTC"],
    link: "#",
    timeline: "2023 - 2024",
    stage: "completed",
  },
]

export const featuredProjects = [
  projects.find((p) => p.id === "numoracle-oracle-cards")!,
  projects.find((p) => p.id === "kraftwerk-numerology")!,
  projects.find((p) => p.id === "hodge-documentary")!,
  projects.find((p) => p.id === "melt")!,
]

export const getBetaProjects = () => {
  return projects.filter((project) => project.stage === "beta")
}
