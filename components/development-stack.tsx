"use client"

import {
  ToyBrick,
  Layers,
  FileCode,
  Wind,
  Code,
  Palette,
  ServerCog,
  Container,
  Database,
  GitFork,
  Rocket,
  DraftingCompass,
  BrainCircuit,
  ShieldCheck,
  Smartphone,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const stackItems = [
  { name: "React", icon: <ToyBrick className="h-8 w-8 text-primary-400" />, category: "Frontend" },
  { name: "Next.js", icon: <Layers className="h-8 w-8 text-sky-400" />, category: "Frontend" },
  { name: "TypeScript", icon: <FileCode className="h-8 w-8 text-blue-400" />, category: "Languages" },
  { name: "Tailwind CSS", icon: <Wind className="h-8 w-8 text-teal-400" />, category: "Frontend" },
  { name: "HTML5", icon: <Code className="h-8 w-8 text-orange-400" />, category: "Frontend" },
  { name: "CSS3", icon: <Palette className="h-8 w-8 text-indigo-400" />, category: "Frontend" },
  { name: "Node.js", icon: <ServerCog className="h-8 w-8 text-green-400" />, category: "Backend" },
  { name: "Python", icon: <Container className="h-8 w-8 text-yellow-400" />, category: "Backend" },
  { name: "PostgreSQL", icon: <Database className="h-8 w-8 text-cyan-400" />, category: "Databases" },
  { name: "Git", icon: <GitFork className="h-8 w-8 text-red-400" />, category: "Tools" },
  { name: "Vercel", icon: <Rocket className="h-8 w-8 text-neutral-300" />, category: "Deployment" },
  { name: "Figma", icon: <DraftingCompass className="h-8 w-8 text-pink-400" />, category: "Design" },
  { name: "AI/ML", icon: <BrainCircuit className="h-8 w-8 text-purple-400" />, category: "Specialized" },
  { name: "Security", icon: <ShieldCheck className="h-8 w-8 text-lime-400" />, category: "Practices" },
  { name: "Mobile Dev", icon: <Smartphone className="h-8 w-8 text-rose-400" />, category: "Platforms" },
]

export default function DevelopmentStack() {
  return (
    <section id="tech-stack" className="py-24 bg-gray-800/70 backdrop-blur-md relative overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="techStackGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(100, 116, 139, 0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#techStackGrid)" />
        </svg>
      </div>

      {/* Glowing orbs for visual consistency */}
      <div className="absolute -top-1/4 left-10 w-80 h-80 bg-primary-500/80 rounded-full filter blur-[180px] opacity-15 animate-pulse-slow"></div>
      <div className="absolute -bottom-1/4 right-10 w-80 h-80 bg-secondary-500/80 rounded-full filter blur-[180px] opacity-15 animate-pulse-slow animation-delay-2000"></div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4 bg-accent-500/20 text-accent-300 border-accent-500/30 px-4 py-1 text-sm">
            Our Toolkit
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Technologies We Master</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We leverage a modern, robust, and scalable technology stack to build high-performance digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {stackItems.map((item) => (
            <div
              key={item.name}
              className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 
                         hover:border-primary-500/40 hover:shadow-xl hover:shadow-primary-500/10
                         transition-all duration-300 group text-center flex flex-col items-center justify-center aspect-square"
            >
              <div className="mb-3 transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
              <h3 className="text-md font-semibold text-gray-200 group-hover:text-white transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-xs text-gray-400 group-hover:text-primary-300 transition-colors duration-300">
                {item.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
