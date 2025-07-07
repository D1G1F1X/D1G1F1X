export type Project = {
  id: string
  title: string
  description: string
  image: string
  category: "in-house" | "client"
  tags: string[]
  domain?: string
  liveSiteUrl?: string
  deploymentDate?: string
  timeline?: string
  status?: "completed" | "in-progress" | "beta"
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: "numoracle-oracle-cards",
    title: "Numoracle Oracle Cards",
    description:
      "A digital oracle card application that merges numerology with intuitive card readings for daily guidance.",
    image: "/images/projects/numoracle-oracle-cards.jpg",
    category: "in-house",
    tags: ["Numerology", "Oracle Cards", "Next.js", "Tailwind CSS"],
    domain: "numoracle.com",
    liveSiteUrl: "https://numoracle.com",
    deploymentDate: "2024-06-15",
    timeline: "2024 – Present",
    status: "in-progress",
    featured: true,
  },
  {
    id: "kraftwerk-numerology",
    title: "Kraftwerk Numerology",
    description:
      "An advanced numerology platform offering personalised reports, compatibility charts and predictive insights.",
    image: "/images/projects/kraftwerk-numerology.jpg",
    category: "in-house",
    tags: ["Numerology", "Analytics", "Next.js"],
    domain: "kraftwerked.com",
    liveSiteUrl: "https://kraftwerked.com",
    deploymentDate: "2024-05-20",
    timeline: "2023 – Present",
    status: "in-progress",
    featured: true,
  },
  {
    id: "hodge-documentary",
    title: "Hodge Documentary",
    description: "Promo site for a social-impact documentary, featuring trailers, cast bios and screening schedules.",
    image: "/images/projects/hodge-documentary.jpg",
    category: "client",
    tags: ["Film", "Next.js"],
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
    description: "A community-powered platform delivering real-time alerts about immigration & ICE activity.",
    image: "/images/projects/ice-melt-app-screenshot.png", // NEW screenshot
    category: "in-house",
    tags: ["Real-time Alerts", "Mapbox", "Supabase", "Next.js", "Tailwind CSS"],
    domain: "icemelt.app",
    liveSiteUrl: "https://icemelt.app",
    deploymentDate: "2024-07-05",
    timeline: "2023 – Present",
    status: "beta",
    featured: true,
  },
  {
    id: "lolita-wilson-portfolio",
    title: "Lolita Wilson Portfolio",
    description: "A modern portfolio showcasing artist Lolita Wilson’s mixed-media works and exhibitions.",
    image: "/images/projects/lolita-wilson-portfolio.jpg",
    category: "client",
    tags: ["Portfolio", "Art", "Next.js"],
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
    image: "/images/projects/nowo-radio.jpg",
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
    image: "/images/projects/oyah-love.jpg",
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
    image: "/images/projects/ai-content-generator.png",
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
    image: "/images/projects/brand-identity-system.png",
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
    image: "/images/projects/data-visualization-dashboard.png",
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
    image: "/images/projects/e-commerce-platform.png",
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
    image: "/images/projects/enterprise-project-management.png",
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
    image: "/images/projects/virtual-event-platform.png",
    category: "in-house",
    tags: ["Virtual Events", "Live Streaming", "Networking", "Event Management"],
    deploymentDate: "2022-06-20",
    timeline: "2022",
    status: "completed",
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export const getBetaProjects = () => projects.filter((project) => project.status === "beta")

// --- Helper queries ---------------------------------------------------------

/** Projects built internally by the Lumen Helix team */
export const getInHouseProjects = () => projects.filter((project) => project.category === "in-house")

/** Projects delivered for clients */
export const getClientProjects = () => projects.filter((project) => project.category === "client")

/**
 * Recently-deployed projects – sorted by deploymentDate (newest first).
 * Falls back gracefully if a project has no deploymentDate.
 */
export const getRecentlyDeployedProjects = (limit = 6) =>
  [...projects]
    .filter((p) => p.deploymentDate)
    .sort((a, b) => new Date(b.deploymentDate ?? 0).getTime() - new Date(a.deploymentDate ?? 0).getTime())
    .slice(0, limit)
