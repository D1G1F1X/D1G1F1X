import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "@/components/image-with-fallback"

export default function ProjectPage() {
  const project = {
    id: "data-visualization-dashboard",
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing complex business data and analytics.",
    image: "/images/projects/data-visualization-dashboard.png",
    category: "client",
    stage: "beta",
    tags: ["Data Visualization", "Analytics", "UI/UX"],
    client: "Global Financial Services Corp",
    duration: "6 months",
    year: "2023-2024",
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
      <div className="absolute top-40 left-20 w-96 h-96 bg-secondary-600 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
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
            <Badge className="bg-accent-600 text-white">
              {project.category === "in-house" ? "In-House" : "Client"}
            </Badge>
            <Badge className="bg-secondary-600 text-white">
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
            <ImageWithFallback
              src={project.image || "/placeholder.svg"}
              fallbackSrc={`/placeholder.svg?height=500&width=1000&text=${encodeURIComponent(project.title)}`}
              alt={project.title}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30"></div>
          </div>

          {/* Project details */}
          <div className="prose prose-lg max-w-none prose-invert mb-16">
            <h2>Project Overview</h2>
            <p>
              The Data Visualization Dashboard is a sophisticated analytics platform designed for Global Financial
              Services Corp to transform complex financial data into intuitive, actionable insights. This interactive
              dashboard enables stakeholders across the organization to explore, analyze, and share critical business
              metrics through a unified, user-friendly interface.
            </p>

            <p>
              This project represents our expertise in data visualization, UX design, and front-end development,
              delivering a solution that makes complex data accessible and meaningful to users with varying levels of
              technical expertise.
            </p>

            <h2>Key Features</h2>

            <h3>Interactive Data Exploration</h3>
            <p>The dashboard provides powerful tools for exploring complex datasets:</p>
            <ul>
              <li>Dynamic filtering and segmentation capabilities</li>
              <li>Drill-down functionality from high-level metrics to granular details</li>
              <li>Cross-filtering between visualizations for multidimensional analysis</li>
              <li>Custom date range selection with comparative period analysis</li>
            </ul>

            <h3>Advanced Visualization Library</h3>
            <p>We developed a comprehensive suite of visualization components tailored to financial data:</p>
            <ul>
              <li>Interactive time-series charts with anomaly detection</li>
              <li>Geospatial visualizations for regional performance analysis</li>
              <li>Network diagrams for relationship mapping</li>
              <li>Custom financial-specific visualizations (e.g., waterfall charts, candlestick plots)</li>
              <li>AI-powered trend identification and forecasting visualizations</li>
            </ul>

            <h3>Personalized Dashboard Experience</h3>
            <p>The platform adapts to individual user needs and preferences:</p>
            <ul>
              <li>Role-based dashboard configurations for different stakeholders</li>
              <li>Customizable layouts with drag-and-drop functionality</li>
              <li>Saved views and bookmarking capabilities</li>
              <li>Personalized alerts and notifications based on KPI thresholds</li>
              <li>User-specific annotation and collaboration tools</li>
            </ul>

            <h3>Enterprise Integration</h3>
            <p>The dashboard seamlessly integrates with existing enterprise systems:</p>
            <ul>
              <li>Secure API connections to multiple data sources</li>
              <li>Real-time data streaming capabilities</li>
              <li>Single sign-on (SSO) integration</li>
              <li>Export functionality to various formats (PDF, Excel, PowerPoint)</li>
              <li>Embedded analytics for integration into other internal platforms</li>
            </ul>

            <h2>Technical Implementation</h2>
            <p>
              The Data Visualization Dashboard was built using cutting-edge technologies to ensure performance,
              scalability, and a seamless user experience:
            </p>
            <ul>
              <li>React.js frontend with TypeScript for type safety</li>
              <li>D3.js and Three.js for custom advanced visualizations</li>
              <li>GraphQL API for efficient data fetching</li>
              <li>Node.js backend with data processing microservices</li>
              <li>Redis for caching and real-time updates</li>
              <li>PostgreSQL for structured data storage</li>
              <li>Elasticsearch for high-performance analytics queries</li>
              <li>Docker and Kubernetes for containerization and orchestration</li>
            </ul>

            <h2>Results and Impact</h2>
            <p>
              Though still in beta, the Data Visualization Dashboard has already demonstrated significant value for
              Global Financial Services Corp:
            </p>
            <ul>
              <li>85% reduction in time spent generating reports</li>
              <li>62% increase in data-driven decision making across departments</li>
              <li>Identification of previously undetected cost-saving opportunities worth $2.4M annually</li>
              <li>40% improvement in cross-team collaboration on data analysis</li>
              <li>Positive user feedback with 92% satisfaction rating from beta testers</li>
            </ul>
          </div>

          {/* Key technologies */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "TypeScript",
                "D3.js",
                "Three.js",
                "GraphQL",
                "Node.js",
                "Redis",
                "PostgreSQL",
                "Elasticsearch",
                "Docker",
              ].map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-gray-300 border-gray-700 bg-gray-800/50 hover:border-secondary-600/30 transition-colors px-3 py-1"
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
              {[
                "Executive Dashboard",
                "Financial Analysis View",
                "Geospatial Visualization",
                "Predictive Analytics Module",
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden border border-gray-700/50 hover:border-secondary-600/30 transition-all duration-300 group"
                >
                  <ImageWithFallback
                    src={`/placeholder_image.png?height=300&width=500&text=${encodeURIComponent(item)}`}
                    fallbackSrc={`/placeholder.svg?height=300&width=500&text=${encodeURIComponent(item)}`}
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
                "The Data Visualization Dashboard developed by Lumen Helix has transformed how we interact with our
                financial data. Even in its beta stage, it's providing insights that were previously impossible to
                obtain without days of manual analysis. The intuitive interface makes complex data accessible to
                stakeholders across all levels of technical expertise, and the customization options ensure everyone
                gets exactly the view they need. We're already seeing significant improvements in our decision-making
                processes."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary-600/20 rounded-full flex items-center justify-center border border-secondary-600/30 mr-4">
                  <span className="text-secondary-400 font-bold">RJ</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Robert Johnson</p>
                  <p className="text-gray-400">Chief Data Officer, Global Financial Services Corp</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="bg-gradient-to-r from-secondary-900/70 to-primary-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Need a Custom Data Visualization Solution?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover how our data visualization expertise can transform your complex data into actionable insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary-600 hover:bg-secondary-700 text-white">
                <Link href="/#contact">Request a Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                <Link href="/services/web-development">Learn About Our Web Development Services</Link>
              </Button>
            </div>
          </div>

          {/* Related projects */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 group">
                <div className="h-48 bg-gray-900/80 relative">
                  <ImageWithFallback
                    src="/images/projects/enterprise-project-management.png"
                    fallbackSrc="/placeholder.svg?height=200&width=300&text=Enterprise%20Project%20Management%20System"
                    alt="Enterprise Project Management System"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    Enterprise Project Management System
                  </h3>
                  <Link
                    href="/portfolio/enterprise-project-management-system"
                    className="inline-flex items-center text-primary-400 font-medium group-hover:text-primary-300 transition-colors"
                  >
                    View project
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Link>
                </div>
              </div>

              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden border border-gray-700/50 hover:border-secondary-500/30 transition-all duration-300 group">
                <div className="h-48 bg-gray-900/80 relative">
                  <ImageWithFallback
                    src="/images/projects/ai-content-generator.png"
                    fallbackSrc="/placeholder.svg?height=200&width=300&text=AI%20Content%20Generator"
                    alt="AI Content Generator"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 bg-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-secondary-400 transition-colors">
                    AI Content Generator
                  </h3>
                  <Link
                    href="/portfolio/ai-content-generator"
                    className="inline-flex items-center text-secondary-400 font-medium group-hover:text-secondary-300 transition-colors"
                  >
                    View project
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Link>
                </div>
              </div>

              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden border border-gray-700/50 hover:border-accent-500/30 transition-all duration-300 group">
                <div className="h-48 bg-gray-900/80 relative">
                  <ImageWithFallback
                    src="/images/projects/cloud-infrastructure-solution.png"
                    fallbackSrc="/placeholder.svg?height=200&width=300&text=Cloud%20Infrastructure%20Solution"
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
