import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/projects"

export default function MeltProjectPage() {
  const project = projects.find((p) => p.id === "melt")

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/portfolio" className="flex items-center text-primary-400 hover:text-primary-300 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Link>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="bg-secondary-500/10 text-secondary-400 border-secondary-500/30">
            In-house Project
          </Badge>
          <Badge variant="outline" className="bg-accent-500/10 text-accent-400 border-accent-500/30">
            Beta
          </Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">{project.title}</h1>
        <p className="text-xl text-primary-400 mb-6">
          <a
            href="https://icemelt.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center"
          >
            iceMELT.app <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </p>
        <p className="text-xl text-gray-300 mb-8">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-800/50 text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mb-12 relative overflow-hidden rounded-xl border border-gray-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={1200}
          height={675}
          className="w-full object-cover"
          priority
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-primary-500/30 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4">Project: M.E.L.T. (Monitor Enforcement Locate Threats)</h2>
            <p className="text-gray-300 mb-4">
              <strong>Domain:</strong> <code className="text-primary-400">iceMELT.app</code>
            </p>
            <p className="text-gray-300 mb-6">
              M.E.L.T. (Monitor Enforcement Locate Threats) is a web community-powered platform designed to provide
              real-time alerts, notifications, and insights into immigration & ICE sightings and threat levels in your
              area! 🚨 M.E.L.T. aims to empower communities with critical information.
            </p>

            <h3 className="text-xl font-bold mb-3">Key Features:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-6">
              <li>
                <strong>Interactive Map:</strong> Visualize sightings and threat perimeters on a dynamic, real-time map.
                This feature allows users to quickly understand the geographical context of reported incidents.
              </li>
              <li>
                <strong>Live Chat:</strong> Share and receive details on real-time sighting updates through an
                integrated live chat system. This fosters immediate communication and community collaboration.
              </li>
              <li>
                <strong>Community-Powered Reporting:</strong> Users can easily report new sightings, contributing to a
                continuously updated and comprehensive database of information.
              </li>
              <li>
                <strong>Secure Authentication:</strong> Robust user authentication ensures data integrity and privacy,
                with distinct roles for general users and administrators.
              </li>
              <li>
                <strong>Admin Dashboard:</strong> A dedicated administrative portal for authorized personnel to manage
                reports, analyze data, and oversee community contributions.
              </li>
            </ul>

            <h3 className="text-xl font-bold mb-3">Technologies Used:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-6">
              <li>
                <strong>Frontend:</strong> Next.js, React, Tailwind CSS, shadcn/ui
              </li>
              <li>
                <strong>Mapping:</strong> Mapbox GL JS
              </li>
              <li>
                <strong>Backend/Database:</strong> Supabase (for authentication and real-time data)
              </li>
              <li>
                <strong>Deployment:</strong> Vercel
              </li>
            </ul>

            <h3 className="text-xl font-bold mb-3">Problem Solved:</h3>
            <p className="text-gray-300 mb-6">
              In an increasingly complex environment, M.E.L.T. provides a vital resource for collective awareness and
              response to immigration and ICE-related activities. It empowers communities by giving them access to
              critical, real-time information, enabling more informed decisions and proactive measures.
            </p>

            <h3 className="text-xl font-bold mb-3">Future Enhancements:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Advanced analytics and reporting for administrators.</li>
              <li>Push notifications for real-time alerts based on user-defined perimeters.</li>
              <li>Integration with additional data sources for enriched threat assessment.</li>
              <li>Mobile application development for enhanced accessibility.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-primary-500/30 transition-all duration-300">
            <h3 className="text-xl font-bold mb-4">Project Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Category</p>
                <p className="text-white">{project.category === "in-house" ? "In-house Project" : "Client Project"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <p className="text-white">Beta</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Timeline</p>
                <p className="text-white">2023 - Present</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Team Size</p>
                <p className="text-white">4 developers</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-primary-500/30 transition-all duration-300">
            <h3 className="text-xl font-bold mb-4">Links</h3>
            <div className="space-y-4">
              <Button asChild className="w-full" variant="default">
                <a
                  href="https://icemelt.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  Visit Live Site <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button asChild variant="outline" className="border-primary-500/50 text-primary-400 bg-transparent">
          <Link href="/portfolio">View All Projects</Link>
        </Button>
      </div>
    </div>
  )
}
