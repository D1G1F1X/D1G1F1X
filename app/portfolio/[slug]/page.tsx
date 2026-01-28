import { projects } from "@/lib/projects"
import { notFound } from "next/navigation"
import PageHero from "@/components/page-hero"
import Breadcrumbs from "@/components/breadcrumbs"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 relative overflow-hidden">
      <div className="container px-4 mx-auto py-8 relative z-10">
        <Breadcrumbs />

        <PageHero badge={project.category} badgeVariant="accent" title={project.name} subtitle={project.description} />

        <div className="py-12">
          {/* Redirect to specific project detail pages */}
          <p className="text-gray-300">Redirecting to project details...</p>
        </div>
      </div>
    </div>
  )
}
