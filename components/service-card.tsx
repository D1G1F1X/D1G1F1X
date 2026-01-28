import type React from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  service: {
    icon: React.ReactNode
    title: string
    description: string
    color: string
    link: string
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 group border border-gray-800/50 hover:border-primary-500/50 h-full flex flex-col">
      {/* Futuristic tech pattern background */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <pattern id="techGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="url(#gridGradient)" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#techGrid)" />
          <circle cx="25" cy="25" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="75" cy="75" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
        </svg>
      </div>

      <div className={cn("p-6 relative", service.color)}>
        <div className="w-14 h-14 flex items-center justify-center bg-gray-800/80 backdrop-blur-sm rounded-full mb-4 border border-gray-700/50 shadow-inner group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-500 group-hover:scale-110">
          {service.icon}
        </div>
      </div>

      <div className="p-6 relative flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>
        <Link
          href={service.link}
          className="inline-flex items-center text-primary-400 font-semibold group-hover:text-primary-300 transition-colors mt-auto"
        >
          Learn more
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Glowing corner accent */}
      <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden opacity-0 group-hover:opacity-70 transition-opacity duration-500">
        <div className={cn("absolute -bottom-12 -right-12 w-24 h-24 rounded-full blur-md bg-primary-500")}></div>
      </div>

      {/* Digital circuit lines */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <svg width="100%" height="100%" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,200 L300,200 M150,0 L150,400"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <circle cx="150" cy="200" r="5" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
          <circle cx="150" cy="200" r="10" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  )
}
