import { BrainCircuit, Code, Palette, LineChart, Server, ClipboardCheck } from "lucide-react"

export const services = [
  {
    icon: <BrainCircuit className="h-6 w-6 text-primary-400" />,
    title: "AI Strategy & Fusion",
    description:
      "Integrating AI solutions with business processes for transformative outcomes and competitive advantage.",
    color: "bg-primary-900/30",
    link: "/services/ai-strategy-fusion",
  },
  {
    icon: <ClipboardCheck className="h-6 w-6 text-secondary-400" />,
    title: "Project Management",
    description: "Delivering complex initiatives with precision through proven methodologies and adaptive frameworks.",
    color: "bg-secondary-900/30",
    link: "/services/project-management",
  },
  {
    icon: <Code className="h-6 w-6 text-accent-400" />,
    title: "Web Development",
    description: "Building robust, user-friendly, and scalable websites and web applications.",
    color: "bg-accent-900/30",
    link: "/services/web-development",
  },
  {
    icon: <Palette className="h-6 w-6 text-secondary-400" />,
    title: "Graphic Design",
    description: "Creating impactful visual identities, compelling brand assets, and engaging user interfaces.",
    color: "bg-secondary-900/30",
    link: "/services/graphic-design",
  },
  {
    icon: <LineChart className="h-6 w-6 text-primary-300" />,
    title: "Marketing Strategy",
    description: "Developing data-driven plans for digital growth, audience engagement, and conversions.",
    color: "bg-primary-800/30",
    link: "/services/marketing-strategy",
  },
  {
    icon: <Server className="h-6 w-6 text-accent-300" />,
    title: "Tech Consulting & Hosting",
    description:
      "Providing expert technological guidance, infrastructure recommendations, and reliable hosting services.",
    color: "bg-accent-800/30",
    link: "/services/tech-consulting",
  },
]
