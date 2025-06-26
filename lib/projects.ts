export const projects = [
  // Priority Projects - Recently Deployed
  {
    id: "numoracle-oracle-cards",
    title: "NUMO Oracle Card Platform",
    description:
      "A mystical numerology platform featuring oracle card readings and ancient wisdom tools. Built on the NUMO system with over 20 years of underlying development, this represents the culmination of decades of numerological research and innovation.",
    image: "/images/projects/numoracle-oracle-cards.jpg",
    category: "in-house",
    stage: "deployed",
    tags: ["Numerology", "Oracle Tools", "React", "Node.js", "20+ Years Development"],
    url: "https://numoracle.com",
    featured: true,
    recentlyDeployed: true,
    developmentTimeline: "4 years (built on 20+ year NUMO system foundation)",
  },
  {
    id: "kraftwerk-numerology",
    title: "Kraftwerk Numerology Platform",
    description:
      "A comprehensive numerology platform with advanced calculation tools and mystical insights. This in-house project showcases decades of numerological expertise combined with modern web technologies.",
    image: "/images/projects/kraftwerk-numerology.jpg",
    category: "in-house",
    stage: "deployed",
    tags: ["Numerology", "SaaS", "Analytics", "Advanced Calculations"],
    url: "https://kraftwerked.com",
    featured: true,
    recentlyDeployed: true,
    developmentTimeline: "4 years",
  },
  {
    id: "hodge-documentary",
    title: "The Hodge Documentary Website",
    description:
      "A compelling documentary website showcasing Cleveland artists and their impact on social change. Recently deployed with full video integration and artist profiles.",
    image: "/images/projects/hodge-documentary.jpg",
    category: "client",
    stage: "deployed",
    tags: ["Documentary", "Video Integration", "Social Impact", "Cleveland Artists"],
    url: "https://hodgedoc.com",
    featured: true,
    recentlyDeployed: true,
  },
  {
    id: "nowo-radio",
    title: "NOWO Radio Platform",
    description:
      "A retro-futuristic radio station website featuring cyberpunk aesthetics and interactive broadcasting elements. Combines newschool vibes with oldschool rhythms in a digital frontier experience.",
    image: "/images/projects/nowo-radio.jpg",
    category: "client",
    stage: "deployed",
    tags: ["Radio", "Cyberpunk Design", "Interactive Media", "Broadcasting"],
    url: "https://noworadio.vercel.app",
    featured: false,
    recentlyDeployed: true,
  },
  {
    id: "lolita-wilson-portfolio",
    title: "Lolita Wilson Creative Portfolio",
    description:
      "A sophisticated portfolio website for a creative professional showcasing artistic works and projects.",
    image: "/images/projects/lolita-wilson-portfolio.jpg",
    category: "client",
    stage: "building",
    tags: ["Portfolio", "Creative", "Web Development", "Art"],
    url: "https://lolitawilson.com",
  },
  // Existing Projects
  {
    id: "enterprise-project-management-system",
    title: "Enterprise Project Management System",
    description:
      "A comprehensive project management platform for enterprise-level coordination and resource optimization.",
    image: "/images/projects/enterprise-project-management.png",
    category: "in-house",
    stage: "deployed",
    tags: ["Project Management", "Enterprise Software", "SaaS"],
  },
  {
    id: "ai-content-generator",
    title: "AI Content Generator",
    description: "An advanced tool that generates high-quality content for various marketing channels.",
    image: "/images/projects/ai-content-generator.png",
    category: "in-house",
    stage: "deployed",
    tags: ["AI", "Content Marketing", "SaaS"],
  },
  {
    id: "virtual-event-platform",
    title: "Virtual Event Platform",
    description: "A comprehensive platform for hosting engaging virtual events and conferences.",
    image: "/images/projects/virtual-event-platform.png",
    category: "client",
    stage: "deployed",
    tags: ["Web Development", "Real-time", "Events"],
  },
  {
    id: "brand-identity-system",
    title: "Brand Identity System",
    description: "A complete brand identity system for a tech startup in the healthcare space.",
    image: "/images/projects/brand-identity-system.png",
    category: "client",
    stage: "deployed",
    tags: ["Graphic Design", "Branding", "Healthcare"],
  },
  {
    id: "data-visualization-dashboard",
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing complex business data and analytics.",
    image: "/images/projects/data-visualization-dashboard.png",
    category: "client",
    stage: "beta",
    tags: ["Data Visualization", "Analytics", "UI/UX"],
  },
  {
    id: "e-commerce-platform",
    title: "E-Commerce Platform",
    description: "A scalable e-commerce platform with advanced product recommendation features.",
    image: "/images/projects/e-commerce-platform.png",
    category: "client",
    stage: "deployed",
    tags: ["E-Commerce", "Web Development", "AI"],
  },
  {
    id: "prompt-engineering-toolkit",
    title: "Prompt Engineering Toolkit",
    description: "A comprehensive toolkit for optimizing AI prompts across different models and use cases.",
    image: "/images/projects/prompt-engineering-toolkit.png",
    category: "in-house",
    stage: "beta",
    tags: ["AI", "Prompt Engineering", "Developer Tools"],
  },
  {
    id: "digital-marketing-campaign",
    title: "Digital Marketing Campaign",
    description: "A multi-channel digital marketing campaign for a consumer product launch.",
    image: "/images/projects/digital-marketing-campaign.png",
    category: "client",
    stage: "deployed",
    tags: ["Marketing", "Social Media", "Analytics"],
  },
  {
    id: "cloud-infrastructure-solution",
    title: "Cloud Infrastructure Solution",
    description: "A secure and scalable cloud infrastructure solution for a financial services company.",
    image: "/images/projects/cloud-infrastructure-solution.png",
    category: "client",
    stage: "deployed",
    tags: ["Cloud", "Security", "Infrastructure"],
  },
  {
    id: "ai-research-platform",
    title: "AI Research Platform",
    description: "A platform for conducting and sharing AI research and experiments.",
    image: "/images/projects/ai-research-platform.png",
    category: "in-house",
    stage: "building",
    tags: ["AI", "Research", "Collaboration"],
  },
  {
    id: "smart-city-concept",
    title: "Smart City Concept",
    description: "A conceptual design for smart city infrastructure and services.",
    image: "/images/projects/smart-city-concept.png",
    category: "in-house",
    stage: "concept",
    tags: ["IoT", "Urban Planning", "Sustainability"],
  },
  {
    id: "healthcare-app",
    title: "Healthcare Mobile App",
    description: "A mobile application for patient monitoring and healthcare management.",
    image: "/images/projects/healthcare-app.png",
    category: "client",
    stage: "beta",
    tags: ["Healthcare", "Mobile", "UX Design"],
  },
]

export const featuredProjects = [
  projects.find((p) => p.id === "numoracle-oracle-cards")!,
  projects.find((p) => p.id === "kraftwerk-numerology")!,
  projects.find((p) => p.id === "hodge-documentary")!,
  projects.find((p) => p.id === "enterprise-project-management-system")!,
]

// Helper functions for project categorization
export const getRecentlyDeployedProjects = () => {
  return projects.filter((project) => project.recentlyDeployed)
}

export const getInHouseProjects = () => {
  return projects.filter((project) => project.category === "in-house")
}

export const getClientProjects = () => {
  return projects.filter((project) => project.category === "client")
}
