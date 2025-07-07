import type { StaticImageData } from "next/image"

export type Project = {
  id: string
  title: string
  description: string
  image: string | StaticImageData
  category: "in-house" | "client"
  tags: string[]
  link?: string
  status?: "live" | "beta" | "archived" | "development"
  timeline?: string
  featured?: boolean
  details?: {
    domain?: string
    features?: string[]
    technologies?: string[]
    problemSolved?: string
    futureEnhancements?: string[]
    teamSize?: string
  }
}

export const projects: Project[] = [
  {
    id: "numoracle-oracle-cards",
    title: "Numoracle Oracle Cards",
    description: "A digital oracle card application combining numerology and intuitive guidance for daily insights.",
    image: "/images/projects/numoracle-oracle-cards.jpg",
    category: "in-house",
    tags: ["Web Development", "AI/ML", "Numerology", "Spiritual Tech"],
    link: "https://numoracle.com",
    status: "live",
    timeline: "2023 - Present",
    featured: true,
    details: {
      domain: "numoracle.com",
      features: [
        "Daily card draws with personalized interpretations",
        "Numerology insights based on birth date and name",
        "Journaling feature for reflections",
        "AI-powered interpretive guidance",
      ],
      technologies: ["Next.js", "React", "Tailwind CSS", "Supabase", "OpenAI API"],
      problemSolved:
        "Provides accessible, personalized spiritual guidance and self-reflection tools through a modern digital interface.",
      futureEnhancements: [
        "Integration with wearable devices for mood tracking",
        "Community sharing features",
        "Advanced customization of card decks",
      ],
      teamSize: "3 developers",
    },
  },
  {
    id: "kraftwerk-numerology",
    title: "Kraftwerked Numerology",
    description: "A comprehensive numerology platform offering detailed reports and personalized readings.",
    image: "/images/projects/kraftwerk-numerology.jpg",
    category: "in-house",
    tags: ["Web Development", "Numerology", "Personal Development"],
    link: "https://kraftwerked.com",
    status: "live",
    timeline: "2022 - Present",
    featured: true,
    details: {
      domain: "kraftwerked.com",
      features: [
        "Life path number calculations",
        "Destiny number analysis",
        "Personal year forecasts",
        "Compatibility reports",
      ],
      technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Stripe API"],
      problemSolved:
        "Offers in-depth numerological insights to help individuals understand their strengths, challenges, and life purpose.",
      futureEnhancements: ["Live numerologist consultations", "Educational content and courses", "Mobile application"],
      teamSize: "2 developers",
    },
  },
  {
    id: "hodge-documentary",
    title: "Hodge Documentary",
    description:
      "Official website for the documentary 'Hodge,' featuring trailers, cast information, and screening schedules.",
    image: "/images/projects/hodge-documentary.jpg",
    category: "client",
    tags: ["Web Development", "Film", "Portfolio"],
    link: "https://hodgedoc.com",
    status: "live",
    timeline: "2023",
    featured: true,
    details: {
      domain: "hodgedoc.com",
      features: [
        "Full-width video trailer integration",
        "Responsive design for all devices",
        "Event calendar for screenings",
        "Press kit download area",
      ],
      technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
      problemSolved:
        "Created a compelling online presence for the documentary, attracting viewers and facilitating event promotion.",
      futureEnhancements: [
        "E-commerce for merchandise",
        "Interactive behind-the-scenes content",
        "Multi-language support",
      ],
      teamSize: "1 developer",
    },
  },
  {
    id: "melt",
    title: "M.E.L.T. (Monitor Enforcement Locate Threats)",
    description:
      "A community-powered platform providing real-time alerts and insights into immigration & ICE sightings.",
    image: "/images/projects/melt.jpg",
    category: "in-house",
    tags: ["Web Development", "Real-time", "Community", "Location-based Services"],
    link: "https://icemelt.app",
    status: "beta",
    timeline: "2023 - Present",
    featured: true,
    details: {
      domain: "icemelt.app",
      features: [
        "Interactive Map: Visualize sightings and threat perimeters on a dynamic, real-time map.",
        "Live Chat: Share and receive details on real-time sighting updates through an integrated live chat system.",
        "Community-Powered Reporting: Users can easily report new sightings, contributing to a continuously updated and comprehensive database of information.",
        "Secure Authentication: Robust user authentication ensures data integrity and privacy, with distinct roles for general users and administrators.",
        "Admin Dashboard: A dedicated administrative portal for authorized personnel to manage reports, analyze data, and oversee community contributions.",
      ],
      technologies: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "Mapbox GL JS", "Supabase", "Vercel"],
      problemSolved:
        "Provides a vital resource for collective awareness and response to immigration and ICE-related activities, empowering communities with critical, real-time information.",
      futureEnhancements: [
        "Advanced analytics and reporting for administrators.",
        "Push notifications for real-time alerts based on user-defined perimeters.",
        "Integration with additional data sources for enriched threat assessment.",
        "Mobile application development for enhanced accessibility.",
      ],
      teamSize: "4 developers",
    },
  },
  {
    id: "lolita-wilson-portfolio",
    title: "Lolita Wilson Portfolio",
    description: "A sleek and modern portfolio website for artist Lolita Wilson, showcasing her diverse works.",
    image: "/images/projects/lolita-wilson-portfolio.jpg",
    category: "client",
    tags: ["Web Development", "Portfolio", "Art", "Design"],
    link: "https://lolitawilson.com",
    status: "live",
    timeline: "2024",
    featured: false,
    details: {
      domain: "lolitawilson.com",
      features: [
        "Dynamic image galleries with lightbox functionality",
        "Artist biography and statement section",
        "Contact form for inquiries",
        "Responsive design for mobile and desktop",
      ],
      technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      problemSolved:
        "Provided a professional and visually appealing online presence for the artist to showcase her work and attract clients.",
      futureEnhancements: [
        "E-commerce integration for art sales",
        "Blog section for artist insights",
        "Virtual gallery tours",
      ],
      teamSize: "1 developer",
    },
  },
  {
    id: "nowo-radio",
    title: "NOWO Radio",
    description: "An online radio streaming platform featuring live shows, podcasts, and music archives.",
    image: "/images/projects/nowo-radio.jpg",
    category: "client",
    tags: ["Web Development", "Streaming", "Audio", "Entertainment"],
    link: "https://noworadio.com",
    status: "live",
    timeline: "2023",
    featured: false,
    details: {
      domain: "noworadio.com",
      features: [
        "Live audio streaming with real-time metadata",
        "On-demand podcast library",
        "Show schedules and artist profiles",
        "User-friendly interface for seamless navigation",
      ],
      technologies: ["Next.js", "React", "Shadcn/ui", "Vercel", "Cloudinary"],
      problemSolved:
        "Created a robust and engaging online presence for the radio station, expanding its reach and audience.",
      futureEnhancements: [
        "Mobile application development",
        "User accounts and personalized playlists",
        "Integration with smart speakers",
      ],
      teamSize: "2 developers",
    },
  },
  {
    id: "oyah-love",
    title: "Oyah Love",
    description: "An e-commerce platform for unique, handcrafted jewelry and accessories.",
    image: "/images/projects/oyah-love.jpg",
    category: "client",
    tags: ["E-commerce", "Web Development", "Design", "Retail"],
    link: "https://oyahlove.com",
    status: "live",
    timeline: "2024",
    featured: false,
    details: {
      domain: "oyahlove.com",
      features: [
        "Product catalog with high-resolution images",
        "Secure shopping cart and checkout process",
        "Customer reviews and ratings",
        "Integrated payment gateways",
      ],
      technologies: ["Next.js", "React", "Stripe", "Sanity.io (headless CMS)"],
      problemSolved:
        "Provided a beautiful and functional online store for the client to sell their handcrafted products globally.",
      futureEnhancements: [
        "Personalized product recommendations",
        "Subscription box service",
        "Augmented reality (AR) try-on feature",
      ],
      teamSize: "1 developer",
    },
  },
  {
    id: "enterprise-project-management-system",
    title: "Enterprise Project Management System",
    description:
      "A robust, scalable project management solution for large organizations, focusing on efficiency and collaboration.",
    image: "/images/projects/enterprise-project-management.png",
    category: "client",
    tags: ["Enterprise Software", "Project Management", "SaaS", "Data Visualization"],
    link: "/portfolio/enterprise-project-management-system",
    status: "live",
    timeline: "2022 - 2023",
    featured: true,
    details: {
      features: [
        "Task management with dependencies and deadlines",
        "Resource allocation and tracking",
        "Gantt charts and Kanban boards",
        "Real-time collaboration tools",
        "Customizable dashboards and reporting",
      ],
      technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "GraphQL", "Docker"],
      problemSolved:
        "Streamlined complex project workflows, improved team collaboration, and provided comprehensive oversight for enterprise-level projects.",
      futureEnhancements: [
        "AI-powered project forecasting and risk assessment",
        "Integration with third-party enterprise tools (CRM, ERP)",
        "Advanced analytics and predictive modeling",
      ],
      teamSize: "8 developers",
    },
  },
  {
    id: "ai-content-generator",
    title: "AI Content Generator",
    description: "An intelligent platform that generates high-quality, SEO-optimized content using advanced AI models.",
    image: "/images/projects/ai-content-generator.png",
    category: "in-house",
    tags: ["AI/ML", "Content Creation", "SaaS", "Natural Language Processing"],
    link: "/portfolio/ai-content-generator",
    status: "live",
    timeline: "2023 - Present",
    featured: false,
    details: {
      features: [
        "Article and blog post generation",
        "Product description and marketing copy creation",
        "Keyword integration and SEO optimization",
        "Plagiarism checking and originality scores",
        "Multi-language support",
      ],
      technologies: ["Next.js", "React", "Python (Flask)", "TensorFlow", "GPT-4", "PostgreSQL"],
      problemSolved:
        "Automated content creation processes, saving time and resources for businesses and marketers while ensuring high-quality output.",
      futureEnhancements: [
        "Voice-to-text content generation",
        "Integration with popular CMS platforms",
        "Customizable AI models for specific brand voices",
      ],
      teamSize: "5 developers",
    },
  },
  {
    id: "data-visualization-dashboard",
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing complex datasets, enabling data-driven decision-making.",
    image: "/images/projects/data-visualization-dashboard.png",
    category: "client",
    tags: ["Data Analytics", "Business Intelligence", "Dashboard", "UI/UX"],
    link: "/portfolio/data-visualization-dashboard",
    status: "live",
    timeline: "2023",
    featured: false,
    details: {
      features: [
        "Real-time data updates",
        "Customizable charts and graphs (bar, line, pie, scatter)",
        "Drill-down capabilities for detailed analysis",
        "User authentication and role-based access control",
        "Exportable reports (PDF, CSV)",
      ],
      technologies: ["React", "D3.js", "Chart.js", "Node.js", "MongoDB", "AWS S3"],
      problemSolved:
        "Transformed raw data into actionable insights, empowering businesses to identify trends, monitor performance, and make informed strategic decisions.",
      futureEnhancements: [
        "Predictive analytics integration",
        "Machine learning-driven anomaly detection",
        "Mobile responsiveness and dedicated mobile app",
      ],
      teamSize: "3 developers",
    },
  },
  {
    id: "e-commerce-platform",
    title: "Custom E-commerce Platform",
    description: "A scalable and secure e-commerce solution tailored for a growing online retail business.",
    image: "/images/projects/e-commerce-platform.png",
    category: "client",
    tags: ["E-commerce", "Web Development", "Payment Gateway", "Inventory Management"],
    link: "/portfolio/e-commerce-platform",
    status: "live",
    timeline: "2022",
    featured: false,
    details: {
      features: [
        "Product catalog and search functionality",
        "Shopping cart and secure checkout",
        "Order management and fulfillment",
        "Customer accounts and order history",
        "Promotional codes and discount management",
      ],
      technologies: ["Next.js", "Stripe", "Sanity.io", "Vercel", "TypeScript"],
      problemSolved:
        "Provided a robust and flexible e-commerce platform that significantly increased online sales and streamlined operations for the client.",
      futureEnhancements: [
        "Personalized product recommendations",
        "Subscription model integration",
        "Multi-vendor marketplace capabilities",
      ],
      teamSize: "4 developers",
    },
  },
  {
    id: "brand-identity-system",
    title: "Brand Identity System",
    description:
      "Development of a comprehensive brand identity, including logo, typography, color palette, and brand guidelines.",
    image: "/images/projects/brand-identity-system.png",
    category: "client",
    tags: ["Branding", "Graphic Design", "UI/UX", "Marketing"],
    link: "/portfolio/brand-identity-system",
    status: "live",
    timeline: "2023",
    featured: false,
    details: {
      features: [
        "Logo design and variations",
        "Typography selection and usage guidelines",
        "Color palette definition (CMYK, RGB, Hex)",
        "Brand voice and messaging framework",
        "Stationery and marketing collateral design",
      ],
      technologies: ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Miro"],
      problemSolved:
        "Established a strong, cohesive, and memorable brand identity that resonated with the target audience and differentiated the client in the market.",
      futureEnhancements: [
        "Animated brand assets",
        "Brand style guide interactive web application",
        "Brand training workshops for employees",
      ],
      teamSize: "2 designers",
    },
  },
  {
    id: "virtual-event-platform",
    title: "Virtual Event Platform",
    description:
      "A dynamic platform for hosting virtual conferences, webinars, and online events with interactive features.",
    image: "/images/projects/virtual-event-platform.png",
    category: "client",
    tags: ["Event Management", "Web Development", "Streaming", "Community"],
    link: "/portfolio/virtual-event-platform",
    status: "live",
    timeline: "2023",
    featured: false,
    details: {
      features: [
        "Live streaming and on-demand content",
        "Interactive Q&A and polling",
        "Virtual networking lounges",
        "Exhibitor booths and sponsorship opportunities",
        "Analytics and attendee engagement tracking",
      ],
      technologies: ["Next.js", "WebRTC", "Socket.IO", "AWS Media Services", "PostgreSQL"],
      problemSolved:
        "Enabled seamless execution of large-scale virtual events, providing an engaging and interactive experience for attendees and valuable data for organizers.",
      futureEnhancements: [
        "AI-powered matchmaking for networking",
        "Gamification elements for increased engagement",
        "Hybrid event support (integrating in-person and virtual)",
      ],
      teamSize: "6 developers",
    },
  },
]

export const featuredProjects = [
  projects.find((p) => p.id === "numoracle-oracle-cards")!,
  projects.find((p) => p.id === "kraftwerk-numerology")!,
  projects.find((p) => p.id === "hodge-documentary")!,
  projects.find((p) => p.id === "melt")!,
]

export const getProjectById = (id: string) => projects.find((project) => project.id === id)

export const getInHouseProjects = () => projects.filter((project) => project.category === "in-house")

export const getClientProjects = () => projects.filter((project) => project.category === "client")

export const getBetaProjects = () => projects.filter((project) => project.status === "beta")
