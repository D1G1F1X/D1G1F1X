import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { projects } from "@/lib/projects"
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react"

export default function MeltProjectPage() {
  const project = projects.find((p) => p.id === "melt")

  if (!project) {
    return <div className="flex items-center justify-center min-h-[60vh] text-xl text-gray-400">Project not found.</div>
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            {project.category === "in-house" ? "In-House Project" : "Client Project"}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">{project.title}</h1>
          <p className="text-lg text-gray-300">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-gray-300 border-gray-700 bg-gray-800/50">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4">
            {project.url && (
              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                  View Build Progress <ExternalLinkIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
            <Link href="/portfolio">
              <Button variant="outline" className="text-white border-gray-700 hover:bg-gray-800 bg-transparent">
                Back to Portfolio <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-700">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>

      <div className="mt-16 md:mt-24 space-y-12">
        <h2 className="text-3xl font-bold text-white text-center">Project Insights</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-primary-400">Core Functionality</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              Melt is designed as a real-time communication and threat assessment platform. Its core features include a
              local chat interface for secure messaging and a dynamic display of national threat levels, providing
              immediate insights into security statuses across various regions.
            </CardContent>
          </Card>
          <Card className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-primary-400">Technology Stack</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              Built with a focus on speed and responsiveness, Melt leverages modern web technologies for real-time data
              processing and communication. The backend is designed for high-throughput data streams, ensuring
              up-to-the-minute threat assessments.
            </CardContent>
          </Card>
          <Card className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-primary-400">Design Philosophy</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              The user interface of Melt is clean and intuitive, prioritizing clarity and ease of use for critical
              information. The dark theme reduces eye strain during prolonged monitoring, and the minimalist design
              ensures focus on essential data.
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 md:mt-24 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Explore More Projects</h2>
        <Link href="/portfolio">
          <Button className="bg-accent-600 hover:bg-accent-700 text-white text-lg px-8 py-4">
            View All Projects <ArrowRightIcon className="ml-3 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
