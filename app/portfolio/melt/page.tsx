import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { projects } from "@/lib/projects"
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react"
import { PageHero } from "@/components/page-hero"

export default function MeltProjectPage() {
  const project = projects.find((p) => p.id === "melt")

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-bold text-red-500">Project Not Found</h1>
        <p className="text-gray-400 mt-2">The requested project could not be found.</p>
        <Link href="/portfolio" className="mt-6">
          <Button variant="outline">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <PageHero
        title={project.title}
        description={project.description}
        image={project.image}
        tags={project.tags}
        category={project.category}
        stage={project.stage}
      />

      <main className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Project Overview</h2>
            <p className="text-lg text-gray-300">
              Melt is an innovative in-house project focused on real-time threat assessment and data visualization. It
              provides a dynamic platform for monitoring national threat levels and facilitating local communication
              through an integrated chat interface. The system is designed to offer rapid intelligence gathering and
              communication capabilities, crucial for proactive security measures.
            </p>
            <p className="text-lg text-gray-300">
              The platform's intuitive dashboard presents a clear overview of threat statuses across various regions,
              allowing users to quickly identify and respond to emerging situations. The integrated chat feature enables
              seamless collaboration and information sharing among users, enhancing situational awareness and
              coordinated response efforts.
            </p>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Key Features</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Real-time National Threat Assessment</li>
                <li>Interactive Local Chat Interface</li>
                <li>Dynamic Data Visualization of Threat Levels</li>
                <li>Secure Communication Channels</li>
                <li>Scalable Architecture for Data Processing</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-gray-700 text-gray-200 border-gray-600">
                  React
                </Badge>
                <Badge variant="secondary" className="bg-gray-700 text-gray-200 border-gray-600">
                  Next.js
                </Badge>
                <Badge variant="secondary" className="bg-gray-700 text-gray-200 border-gray-600">
                  WebSockets
                </Badge>
                <Badge variant="secondary" className="bg-gray-700 text-gray-200 border-gray-600">
                  Data Streaming
                </Badge>
                <Badge variant="secondary" className="bg-gray-700 text-gray-200 border-gray-600">
                  Tailwind CSS
                </Badge>
              </div>
            </div>
            {project.url && (
              <Button asChild className="mt-6">
                <Link href={project.url} target="_blank" rel="noopener noreferrer">
                  View Build Progress
                  <ExternalLinkIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
          <div className="relative">
            <Card className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </CardContent>
            </Card>
            <div className="absolute inset-0 border-2 border-primary-500 rounded-xl pointer-events-none animate-pulse-border" />
          </div>
        </div>
      </main>
    </div>
  )
}
