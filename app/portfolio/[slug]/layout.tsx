import type React from "react"
import type { Metadata } from "next"
import { projects } from "@/lib/projects"

interface ProjectLayoutProps {
  params: Promise<{
    slug: string
  }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: ProjectLayoutProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.id === slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.name} | Lumen Helix Solutions`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      type: "website",
      url: `https://lumenhelix.com/portfolio/${project.id}`,
      images: [
        {
          url: project.image || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description,
      images: [project.image || "/og-image.jpg"],
    },
  }
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  return <>{children}</>
}
