import type { Project } from "../types/project"

export const projects: Project[] = [
  {
    id: "numoracle-oracle-cards",
    title: "NUMO Oracle Card Platform",
    description:
      "Interactive oracle card platform combining numerology with mystical card readings. Features real-time calculations and personalized insights.",
    image: "/images/projects/numoracle-oracle-cards.jpg",
    category: "in-house",
    stage: "deployed",
    url: "https://numoracle.com",
    tags: ["Next.js", "React", "Node.js", "CSS3", "JavaScript"],
    featured: true,
  },
  {
    id: "kraftwerk-numerology",
    title: "Kraftwerk Numerology Platform",
    description: "Advanced numerological calculation platform with real-time processing and analytics dashboard.",
    image: "/images/projects/kraftwerk-numerology.jpg",
    category: "in-house",
    stage: "deployed",
    url: "https://kraftwerked.com",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
    featured: true,
  },
  {
    id: "hodge-documentary",
    title: "The Hodge Documentary Website",
    description: "Website for a social impact documentary showcasing Cleveland artists and their stories of change.",
    image: "/images/projects/hodge-documentary.jpg",
    category: "client",
    stage: "deployed",
    url: "https://hodgedoc.com",
    tags: ["HTML5", "CSS3", "JavaScript", "Video.js"],
    featured: false,
  },
  {
    id: "melt",
    title: "M.E.L.T. (Monitor Enforcement Locate Threats)",
    description:
      "Real-time community-powered platform for monitoring and reporting immigration enforcement activities.",
    image: "/images/projects/melt.jpg",
    category: "in-house",
    stage: "beta",
    url: "https://icemelt.app",
    tags: ["Next.js", "React", "Mapbox", "Supabase", "Tailwind CSS"],
    featured: true,
  },
  {
    id: "lolita-wilson-portfolio",
    title: "Lolita Wilson Creative Portfolio",
    description:
      "Sophisticated portfolio showcase for a creative professional featuring art gallery and photography sections.",
    image: "/images/projects/lolita-wilson-portfolio.jpg",
    category: "client",
    stage: "building",
    url: "https://lolitawilson.com",
    tags: ["Next.js", "React", "Tailwind", "Framer Motion"],
    featured: false,
  },
  {
    id: "nowo-radio",
    title: "NOWO Radio Platform",
    description:
      "Interactive radio station website with cyberpunk aesthetic, featuring live broadcasts and community features.",
    image: "/images/projects/nowo-radio.jpg",
    category: "client",
    stage: "building",
    url: "https://noworadio.vercel.app",
    tags: ["Next.js", "React", "Audio API", "Tailwind CSS"],
    featured: false,
  },
  {
    id: "oyah-love",
    title: "Oyah Love Spiritual Platform",
    description:
      "Spiritual wellness platform with integrated e-commerce and blog functionality for personal transformation.",
    image: "/images/projects/oyah-love.jpg",
    category: "client",
    stage: "building",
    url: "https://oyah.vercel.app",
    tags: ["Next.js", "React", "E-commerce", "Content Management"],
    featured: false,
  },
  {
    id: "ai-content-generator",
    title: "AI Content Generator",
    description: "Advanced AI-powered content generation platform for marketing teams.",
    image: "/images/projects/ai-content-generator.png",
    category: "client",
    stage: "deployed",
    url: "#",
    tags: ["React", "Node.js", "OpenAI API", "MongoDB"],
    featured: false,
  },
  {
    id: "brand-identity-system",
    title: "Brand Identity System",
    description: "Comprehensive brand identity system with design guidelines and asset management.",
    image: "/images/projects/brand-identity-system.png",
    category: "client",
    stage: "deployed",
    url: "#",
    tags: ["Design System", "Figma", "React", "Storybook"],
    featured: false,
  },
  {
    id: "data-visualization-dashboard",
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with real-time updates.",
    image: "/images/projects/data-visualization-dashboard.png",
    category: "client",
    stage: "deployed",
    url: "#",
    tags: ["D3.js", "React", "Node.js", "PostgreSQL"],
    featured: false,
  },
  {
    id: "e-commerce-platform",
    title: "E-commerce Platform",
    description: "Full-featured e-commerce platform with inventory management and payment processing.",
    image: "/images/projects/e-commerce-platform.png",
    category: "client",
    stage: "deployed",
    url: "#",
    tags: ["Next.js", "Stripe", "MongoDB", "Redux"],
    featured: false,
  },
  {
    id: "enterprise-project-management-system",
    title: "Enterprise Project Management System",
    description: "Comprehensive project management system for enterprise teams with resource allocation and reporting.",
    image: "/images/projects/enterprise-project-management.png",
    category: "client",
    stage: "deployed",
    url: "#",
    tags: ["React", "GraphQL", "PostgreSQL", "Docker"],
    featured: false,
  },
  {
    id: "virtual-event-platform",
    title: "Virtual Event Platform",
    description: "Interactive platform for hosting virtual events with networking features and content delivery.",
    image: "/images/projects/virtual-event-platform.png",
    category: "client",
    stage: "deployed",
    url: "#",
    tags: ["React", "WebRTC", "Node.js", "Socket.io"],
    featured: false,
  },
]

// Add the missing featuredProjects export
export const featuredProjects = [
  projects.find((p) => p.id === "numoracle-oracle-cards")!,
  projects.find((p) => p.id === "kraftwerk-numerology")!,
  projects.find((p) => p.id === "melt")!,
  projects.find((p) => p.id === "enterprise-project-management-system")!,
]

// Helper functions for project categorization
export const getRecentlyDeployedProjects = () => {
  return projects.filter((project) => project.stage === "deployed").slice(0, 3)
}

export const getInHouseProjects = () => {
  return projects.filter((project) => project.category === "in-house")
}

export const getClientProjects = () => {
  return projects.filter((project) => project.category === "client")
}

export const getBuildingProjects = () => {
  return projects.filter((project) => project.stage === "building")
}

export const getBetaProjects = () => {
  return projects.filter((project) => project.stage === "beta")
}
