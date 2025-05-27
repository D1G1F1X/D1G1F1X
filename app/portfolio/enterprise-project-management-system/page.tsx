import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ProjectPage() {
  const project = {
    id: "enterprise-project-management-system",
    title: "Enterprise Project Management System",
    description:
      "A comprehensive project management platform for enterprise-level coordination and resource optimization.",
    image: "/placeholder.svg?height=500&width=1000&text=Enterprise%20Project%20Management%20System",
    category: "in-house",
    stage: "deployed",
    tags: ["Project Management", "Enterprise Software", "SaaS"],
    client: "Internal Product",
    duration: "18 months",
    year: "2024-2025",
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 relative overflow-hidden">
      {/* Digital circuit pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="projectGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <pattern id="project-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M25,0 L25,100 M0,25 L100,25 M75,0 L75,100 M0,75 L100,75"
              stroke="url(#projectGradient)"
              strokeWidth="0.5"
              fill="none"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#project-pattern)" />
        </svg>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-12 relative z-10">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-secondary-400 font-medium mb-8 hover:text-secondary-300 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to portfolio
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="bg-secondary-500 text-white">
              {project.category === "in-house" ? "In-House" : "Client"}
            </Badge>
            <Badge className="bg-primary-500 text-white">
              {project.stage.charAt(0).toUpperCase() + project.stage.slice(1)}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{project.title}</h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">{project.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/80 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">Client</h3>
              <p className="text-gray-300">{project.client}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">Duration</h3>
              <p className="text-gray-300">{project.duration}</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">Year</h3>
              <p className="text-gray-300">{project.year}</p>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative rounded-xl overflow-hidden mb-16 border border-gray-700/50 shadow-xl">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30"></div>
          </div>

          {/* Project details */}
          <div className="prose prose-lg max-w-none prose-invert mb-16">
            <h2>Project Overview</h2>
            <p>
              The Enterprise Project Management System (EPMS) is a comprehensive platform designed to streamline project
              planning, execution, and monitoring across large organizations. Developed as an in-house product by Lumen
              Helix Solutions, EPMS addresses the complex challenges of enterprise-level project coordination, resource
              allocation, and performance tracking.
            </p>

            <p>
              This system represents our deep expertise in both project management methodologies and software
              development, combining best practices from traditional and agile frameworks with cutting-edge technology.
            </p>

            <h2>Key Features</h2>

            <h3>Integrated Project Portfolio Management</h3>
            <p>
              EPMS provides a centralized view of all projects across the organization, enabling executives and PMO
              leaders to:
            </p>
            <ul>
              <li>Prioritize initiatives based on strategic alignment and resource constraints</li>
              <li>Monitor portfolio health through customizable dashboards and reports</li>
              <li>Optimize resource allocation across multiple projects</li>
              <li>Track financial performance against budgets and forecasts</li>
            </ul>

            <h3>Adaptive Methodology Support</h3>
            <p>
              Recognizing that different projects require different approaches, EPMS supports multiple project
              management methodologies:
            </p>
            <ul>
              <li>Agile frameworks (Scrum, Kanban, SAFe) with sprint planning and backlog management</li>
              <li>Traditional Waterfall with Gantt charts and critical path analysis</li>
              <li>Hybrid approaches that combine elements of both methodologies</li>
              <li>Custom workflows tailored to specific organizational needs</li>
            </ul>

            <h3>Advanced Resource Management</h3>
            <p>
              One of the most challenging aspects of enterprise project management is resource allocation. EPMS
              addresses this with:
            </p>
            <ul>
              <li>Capacity planning tools that prevent overallocation</li>
              <li>Skill-based resource matching to ensure the right people are assigned to the right tasks</li>
              <li>Predictive analytics to identify potential resource bottlenecks</li>
              <li>Integration with HR systems for accurate availability tracking</li>
            </ul>

            <h3>Real-time Collaboration</h3>
            <p>EPMS facilitates seamless collaboration among project teams through:</p>
            <ul>
              <li>Integrated document management with version control</li>
              <li>Task-level commenting and discussion threads</li>
              <li>Real-time status updates and notifications</li>
              <li>Virtual meeting spaces with video conferencing integration</li>
            </ul>

            <h2>Technical Implementation</h2>
            <p>
              The EPMS platform was built using a modern technology stack to ensure scalability, security, and
              performance:
            </p>
            <ul>
              <li>Microservices architecture for modularity and scalability</li>
              <li>React-based frontend for responsive and intuitive user experience</li>
              <li>GraphQL API for efficient data retrieval and updates</li>
              <li>PostgreSQL database with advanced data partitioning for performance</li>
              <li>Kubernetes orchestration for reliable cloud deployment</li>
              <li>Enterprise-grade security with SSO integration and role-based access control</li>
            </ul>

            <h2>Results and Impact</h2>
            <p>Since its deployment, EPMS has delivered significant benefits to organizations that have adopted it:</p>
            <ul>
              <li>35% reduction in project delivery time</li>
              <li>28% improvement in resource utilization</li>
              <li>42% decrease in budget overruns</li>
              <li>65% increase in stakeholder satisfaction with project visibility</li>
              <li>Standardized project management practices across diverse teams</li>
            </ul>
          </div>

          {/* Key technologies */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "Node.js",
                "GraphQL",
                "PostgreSQL",
                "Redis",
                "Docker",
                "Kubernetes",
                "AWS",
                "Material UI",
                "Chart.js",
              ].map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-gray-300 border-gray-700 bg-gray-800/50 hover:border-secondary-500/30 transition-colors px-3 py-1"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Project gallery */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["Dashboard View", "Resource Allocation", "Gantt Chart", "Analytics Dashboard"].map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300 group"
                >
                  <img
                    src={`/placeholder_image.png?height=300&width=500&text=${encodeURIComponent(item)}`}
                    alt={item}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Client Testimonials</h2>
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
              <p className="text-gray-300 italic mb-4">
                "The Enterprise Project Management System has transformed how we manage our portfolio of initiatives. We
                now have real-time visibility across all projects, enabling better decision-making and resource
                allocation. The system's flexibility allows us to adapt to changing business priorities while
                maintaining governance and control."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary-500/20 rounded-full flex items-center justify-center border border-secondary-500/30 mr-4">
                  <span className="text-secondary-400 font-bold">JD</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Jane Doe</p>
                  <p className="text-gray-400">Chief Technology Officer, Fortune 500 Financial Services Company</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="bg-gradient-to-r from-secondary-900/70 to-primary-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Interested in EPMS for Your Organization?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover how our Enterprise Project Management System can transform your organization's project delivery
              capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white">
                <Link href="/#contact">Request a Demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                <Link href="/services/project-management">Learn About Our PM Services</Link>
              </Button>
            </div>
          </div>

          {/* Related projects */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 group">
                <div className="h-48 bg-gray-900/80 relative">
                  <img
                    src="/placeholder.svg?height=200&width=300&text=AI%20Content%20Generator"
                    alt="AI Content Generator"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    AI Content Generator
                  </h3>
                  <Link
                    href="/portfolio/ai-content-generator"
                    className="inline-flex items-center text-primary-400 font-medium group-hover:text-primary-300 transition-colors"
                  >
                    View project
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Link>
                </div>
              </div>

              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300 group">
                <div className="h-48 bg-gray-900/80 relative">
                  <img
                    src="/placeholder.svg?height=200&width=300&text=Data%20Visualization%20Dashboard"
                    alt="Data Visualization Dashboard"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-secondary-400 transition-colors">
                    Data Visualization Dashboard
                  </h3>
                  <Link
                    href="/portfolio/data-visualization-dashboard"
                    className="inline-flex items-center text-secondary-400 font-medium group-hover:text-secondary-300 transition-colors"
                  >
                    View project
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Link>
                </div>
              </div>

              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300 group">
                <div className="h-48 bg-gray-900/80 relative">
                  <img
                    src="/placeholder.svg?height=200&width=300&text=Cloud%20Infrastructure%20Solution"
                    alt="Cloud Infrastructure Solution"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                    Cloud Infrastructure Solution
                  </h3>
                  <Link
                    href="/portfolio/cloud-infrastructure-solution"
                    className="inline-flex items-center text-accent-400 font-medium group-hover:text-accent-300 transition-colors"
                  >
                    View project
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
