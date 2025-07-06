import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { ProjectImage } from "@/components/project-image"

export const metadata: Metadata = {
  title: "Melt",
  description: "A landing page for a SaaS product.",
}

const project = {
  title: "Melt",
  description: "A landing page for a SaaS product. Built with Next.js, TypeScript, and Tailwind CSS.",
  image: "/images/melt-hero.png",
  url: "https://meltice.vercel.app/",
  stage: "building",
  tags: ["Next.js", "TypeScript", "Tailwind CSS"],
}

export default function MeltPage() {
  return (
    <div className="container py-12">
      <PageHero
        title={project.title}
        description={project.description}
        image={project.image}
        stage="beta" // Explicitly set to "beta"
        tags={project.tags}
      >
        <Button asChild>
          <Link href={project.url} target="_blank" rel="noopener noreferrer">
            Visit Live Site
          </Link>
        </Button>
      </PageHero>

      <p className="text-lg text-primary-400 mb-8">
        <Link href={project.url} target="_blank" rel="noopener noreferrer">
          {project.url.replace("https://", "")}
        </Link>
      </p>

      <ProjectImage src="/images/melt-dashboard.png" alt="Melt Dashboard" />
      <ProjectImage src="/images/melt-pricing.png" alt="Melt Pricing" />
    </div>
  )
}
