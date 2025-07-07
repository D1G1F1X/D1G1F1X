/* ----------------------------------------------------------------
   Project catalogue (shared across Portfolio and Project pages)
----------------------------------------------------------------- */

export type Project = {
  id: string
  title: string
  description: string
  image: string
  category: "in-house" | "client"
  /* legacy field expected by existing UI components */
  stage: "concept" | "building" | "beta" | "deployed"
  /* new status field used internally */
  status: "in-progress" | "beta" | "completed"
  tags: string[]
  domain?: string
  liveSiteUrl?: string
  deploymentDate?: string
  timeline?: string
  featured?: boolean
}

/* Helper to convert the newer “status” to the legacy “stage” label */
const toStage = (status: Project["status"]): Project["stage"] => {
  switch (status) {
    case "in-progress":
      return "building"
    case "beta":
      return "beta"
    case "completed":
    default:
      return "deployed"
  }
}

/* ------------------------  Projects list  ---------------------- */
export const projects: Project[] = [
  {
    id: "numoracle-oracle-cards",
    title: "Numoracle Oracle Cards",
    description: "A digital oracle-card experience that combines numerology analytics with intuitive daily guidance.",
    image: "/images/projects/numoracle-oracle-cards.jpg",
    category: "in-house",
    status: "in-progress",
    stage: toStage("in-progress"),
    tags: ["Numerology", "Oracle Cards", "Next.js", "Tailwind CSS"],
    domain: "numoracle.com",
    liveSiteUrl: "https://numoracle.com",
    deploymentDate: "2024-06-15",
    timeline: "2024 – Present",
    featured: true,
  },
  {
    id: "kraftwerk-numerology",
    title: "Kraftwerk Numerology",
    description:
      "An advanced numerology engine delivering personalised reports, compatibility charts and predictive insights.",
    image: "/images/projects/kraftwerk-numerology.jpg",
    category: "in-house",
    status: "in-progress",
    stage: toStage("in-progress"),
    tags: ["Numerology", "Analytics", "Next.js"],
    domain: "kraftwerked.com",
    liveSiteUrl: "https://kraftwerked.com",
    deploymentDate: "2024-05-20",
    timeline: "2023 – Present",
    featured: true,
  },
  {
    id: "hodge-documentary",
    title: "Hodge Documentary",
    description:
      "Promotional hub for a social-impact documentary, featuring teasers, cast bios and screening schedules.",
    image: "/images/projects/hodge-documentary.jpg",
    category: "client",
    status: "completed",
    stage: toStage("completed"),
    tags: ["Film", "Next.js"],
    domain: "hodgedoc.com",
    liveSiteUrl: "https://hodgedoc.com",
    deploymentDate: "2023-11-01",
    timeline: "2023",
    featured: true,
  },
  {
    id: "melt",
    title: "M.E.L.T. (Monitor Enforcement Locate Threats)",
    description:
      "Community-powered platform providing real-time alerts and interactive mapping of immigration-enforcement activity.",
    image: "/images/projects/ice-melt-app-screenshot.png",
    category: "in-house",
    status: "beta",
    stage: toStage("beta"),
    tags: ["Real-time", "Mapbox", "Supabase", "Next.js"],
    domain: "icemelt.app",
    liveSiteUrl: "https://icemelt.app",
    deploymentDate: "2024-07-05",
    timeline: "2023 – Present",
    featured: true,
  },
  {
    id: "lolita-wilson-portfolio",
    title: "Lolita Wilson Portfolio",
    description: "A modern showcase of mixed-media artwork and exhibitions for contemporary artist Lolita Wilson.",
    image: "/images/projects/lolita-wilson-portfolio.jpg",
    category: "client",
    status: "completed",
    stage: toStage("completed"),
    tags: ["Portfolio", "Art", "Next.js"],
    domain: "lolitawilson.com",
    liveSiteUrl: "https://lolitawilson.com",
    deploymentDate: "2023-09-10",
    timeline: "2023",
    featured: false,
  },
  {
    id: "nowo-radio",
    title: "NOWO Radio",
    description: "Interactive cyber-inspired radio platform with live streams, podcasts and community schedule.",
    image: "/images/projects/nowo-radio.jpg",
    category: "client",
    status: "completed",
    stage: toStage("completed"),
    tags: ["Streaming", "Radio", "Web Audio"],
    domain: "noworadio.com",
    liveSiteUrl: "https://noworadio.com",
    deploymentDate: "2022-08-20",
    timeline: "2022",
    featured: false,
  },
  {
    id: "oyah-love",
    title: "Oyah Love",
    description: "E-commerce boutique for handcrafted jewellery with a focus on sustainable sourcing.",
    image: "/images/projects/oyah-love.jpg",
    category: "client",
    status: "completed",
    stage: toStage("completed"),
    tags: ["E-commerce", "Shopify"],
    domain: "oyahlove.com",
    liveSiteUrl: "https://oyahlove.com",
    deploymentDate: "2022-03-05",
    timeline: "2022",
    featured: false,
  },
  {
    id: "ai-content-generator",
    title: "AI Content Generator",
    description: "SaaS platform that leverages GPT models to create on-brand marketing copy and long-form articles.",
    image: "/images/projects/ai-content-generator.png",
    category: "in-house",
    status: "completed",
    stage: toStage("completed"),
    tags: ["AI", "SaaS"],
    deploymentDate: "2023-10-20",
    timeline: "2023",
    featured: false,
  },
  {
    id: "brand-identity-system",
    title: "Brand Identity System",
    description: "Comprehensive visual-identity guidelines and asset library for a venture-backed startup.",
    image: "/images/projects/brand-identity-system.png",
    category: "client",
    status: "completed",
    stage: toStage("completed"),
    tags: ["Branding", "Design System"],
    deploymentDate: "2023-07-15",
    timeline: "2023",
    featured: false,
  },
  {
    id: "data-visualization-dashboard",
    title: "Data Visualization Dashboard",
    description: "Interactive analytics dashboard turning complex datasets into actionable insights.",
    image: "/images/projects/data-visualization-dashboard.png",
    category: "in-house",
    status: "completed",
    stage: toStage("completed"),
    tags: ["Data", "D3.js", "React"],
    deploymentDate: "2023-05-01",
    timeline: "2023",
    featured: false,
  },
  {
    id: "e-commerce-platform",
    title: "E-commerce Platform",
    description: "Scalable online-retail solution with inventory management and secure Stripe integration.",
    image: "/images/projects/e-commerce-platform.png",
    category: "client",
    status: "completed",
    stage: toStage("completed"),
    tags: ["E-commerce", "Stripe", "Next.js"],
    deploymentDate: "2022-11-30",
    timeline: "2022",
    featured: false,
  },
  {
    id: "enterprise-project-management-system",
    title: "Enterprise Project-Management System",
    description: "Robust toolset for resource allocation, milestone tracking and executive reporting.",
    image: "/images/projects/enterprise-project-management.png",
    category: "client",
    status: "completed",
    stage: toStage("completed"),
    tags: ["Project Management", "SaaS"],
    deploymentDate: "2022-09-01",
    timeline: "2022",
    featured: false,
  },
  {
    id: "virtual-event-platform",
    title: "Virtual Event Platform",
    description: "End-to-end virtual-conference solution with live streaming, networking and interactive sessions.",
    image: "/images/projects/virtual-event-platform.png",
    category: "in-house",
    status: "completed",
    stage: toStage("completed"),
    tags: ["WebRTC", "Events"],
    deploymentDate: "2022-06-20",
    timeline: "2022",
    featured: false,
  },
]

/* -----------------------  Helper selectors  -------------------- */

export const featuredProjects = projects.filter((p) => p.featured)

export const getBetaProjects = () => projects.filter((p) => p.stage === "beta")

export const getInHouseProjects = () => projects.filter((p) => p.category === "in-house")

export const getClientProjects = () => projects.filter((p) => p.category === "client")

export const getRecentlyDeployedProjects = (limit = 6) =>
  [...projects]
    .filter((p) => p.deploymentDate)
    .sort((a, b) => new Date(b.deploymentDate ?? 0).getTime() - new Date(a.deploymentDate ?? 0).getTime())
    .slice(0, limit)
