"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    image: string
    category: "in-house" | "client"
    stage: "concept" | "building" | "beta" | "deployed"
    tags: string[]
    demoUrl?: string
  }
  stageColors: Record<string, string>
  categoryColors: Record<string, string>
}

export default function ProjectCard({ project, stageColors, categoryColors }: ProjectCardProps) {
  const [imageSrc, setImageSrc] = useState(
    project.image || `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(project.title)}`,
  )

  const handleImageError = () => {
    setImageSrc(`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(project.title)}`)
  }

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-700/50 hover:border-primary-500/50 relative">
      {/* Futuristic circuit pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="circuitGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <pattern id="circuit2" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M 30 10 L 70 10 M 50 10 L 50 30 M 30 30 L 70 30 M 30 30 L 30 70 M 30 50 L 50 50 M 50 50 L 50 70 M 30 70 L 70 70 M 70 30 L 70 70"
              stroke="url(#circuitGradient2)"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="30" cy="10" r="2" fill="#3B82F6" />
            <circle cx="50" cy="10" r="2" fill="#3B82F6" />
            <circle cx="70" cy="10" r="2" fill="#3B82F6" />
            <circle cx="30" cy="30" r="2" fill="#3B82F6" />
            <circle cx="50" cy="30" r="2" fill="#3B82F6" />
            <circle cx="70" cy="30" r="2" fill="#3B82F6" />
            <circle cx="30" cy="50" r="2" fill="#3B82F6" />
            <circle cx="50" cy="50" r="2" fill="#3B82F6" />
            <circle cx="30" cy="70" r="2" fill="#3B82F6" />
            <circle cx="50" cy="70" r="2" fill="#3B82F6" />
            <circle cx="70" cy="70" r="2" fill="#3B82F6" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit2)" />
        </svg>
      </div>

      <div className="h-48 bg-gray-900/80 relative overflow-hidden">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className={cn("text-white", categoryColors[project.category])}>
            {project.category === "in-house" ? "In-House" : "Client"}
          </Badge>
          <Badge className={cn("text-white", stageColors[project.stage])}>
            {project.stage.charAt(0).toUpperCase() + project.stage.slice(1)}
          </Badge>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6 relative">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-gray-300 border-gray-700 bg-gray-900/50 group-hover:border-primary-500/30 transition-colors"
            >
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge
              variant="outline"
              className="text-gray-300 border-gray-700 bg-gray-900/50 group-hover:border-primary-500/30 transition-colors"
            >
              +{project.tags.length - 3} more
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Link
            href={`/portfolio/${project.id}`}
            className="inline-flex items-center text-primary-400 font-semibold group-hover:text-primary-300 transition-colors"
          >
            View project
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-accent-400 font-semibold hover:text-accent-300 transition-colors"
            >
              Preview Build
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* Futuristic corner accent */}
      <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden opacity-30 group-hover:opacity-60 transition-opacity duration-300">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 right-0"
        >
          <circle cx="100" cy="100" r="50" stroke="url(#circuitGradient2)" strokeWidth="1" />
          <circle cx="100" cy="100" r="40" stroke="url(#circuitGradient2)" strokeWidth="1" />
          <circle cx="100" cy="100" r="30" stroke="url(#circuitGradient2)" strokeWidth="1" />
          <path d="M50 100H100V50" stroke="url(#circuitGradient2)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  )
}
