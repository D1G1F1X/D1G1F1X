"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectPreviewProps {
  project: {
    id: string
    title: string
    description: string
    image: string
    category: "in-house" | "client"
    stage: "concept" | "building" | "beta" | "deployed"
    tags: string[]
  }
}

export default function ProjectPreview({ project }: ProjectPreviewProps) {
  const [imageSrc, setImageSrc] = useState(
    project.image || `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(project.title)}`,
  )

  const handleImageError = () => {
    setImageSrc(`/placeholder.svg?height=300&width=400&text=${encodeURIComponent(project.title)}`)
  }

  const stageColors = {
    concept: "bg-secondary-500",
    building: "bg-primary-500",
    beta: "bg-secondary-600",
    deployed: "bg-accent-500",
    live: "bg-accent-500", // new
    development: "bg-primary-500", // new
    archived: "bg-gray-600", // new
  }

  const categoryColors = {
    "in-house": "bg-primary-600",
    client: "bg-accent-600",
  }

  // Accept either `stage` (old) or `status` (new) from the project data
  const stageLabel =
    (project as { stage?: string; status?: string }).stage ?? (project as { status?: string }).status ?? ""

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 border border-gray-700/50 hover:border-primary-500/50 group relative flex flex-col h-full transform hover:-translate-y-1">
      {/* Futuristic circuit pattern overlay */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 pointer-events-none transition-opacity duration-500">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M 30 10 L 70 10 M 50 10 L 50 30 M 30 30 L 70 30 M 30 30 L 30 70 M 30 50 L 50 50 M 50 50 L 50 70 M 30 70 L 70 70 M 70 30 L 70 70"
              stroke="url(#circuitGradient)"
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
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="h-52 bg-gray-900/80 relative overflow-hidden">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <Badge className={cn("text-white", categoryColors[project.category])}>
            {project.category === "in-house" ? "In-House" : "Client"}
          </Badge>
          <Badge className={cn("text-white", stageColors[stageLabel as keyof typeof stageColors] ?? "bg-gray-600")}>
            {stageLabel ? stageLabel.charAt(0).toUpperCase() + stageLabel.slice(1) : "N/A"}
          </Badge>
        </div>

        {/* Digital overlay effect */}
        <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
          <div className="w-full h-1 bg-primary-400/50 animate-[scanline_3s_linear_infinite] blur-[1px]"></div>
        </div>
      </div>

      <div className="p-6 relative flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-5 flex-grow">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-gray-300 border-gray-700 bg-gray-800/50 group-hover:border-primary-500/30 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <Link
          href={`/portfolio/${project.id}`}
          className="inline-flex items-center text-primary-400 font-semibold group-hover:text-primary-300 transition-colors mt-auto"
        >
          View project
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Futuristic corner accent */}
      <div className="absolute bottom-0 right-0 w-32 h-32 overflow-hidden opacity-30 group-hover:opacity-60 transition-opacity duration-500">
        <svg
          width="128"
          height="128"
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 right-0"
        >
          <circle cx="128" cy="128" r="64" stroke="url(#circuitGradient)" strokeWidth="1" />
          <circle cx="128" cy="128" r="48" stroke="url(#circuitGradient)" strokeWidth="1" />
          <circle cx="128" cy="128" r="32" stroke="url(#circuitGradient)" strokeWidth="1" />
          <path d="M64 128H128V64" stroke="url(#circuitGradient)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  )
}
