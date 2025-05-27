import type React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PageHeroProps {
  badge?: string
  badgeVariant?: "primary" | "secondary" | "accent"
  title: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
}

export default function PageHero({
  badge,
  badgeVariant = "primary",
  title,
  subtitle,
  children,
  className,
}: PageHeroProps) {
  const badgeColors = {
    primary: "bg-primary-500/20 text-primary-300 border-primary-500/30",
    secondary: "bg-secondary-500/20 text-secondary-300 border-secondary-500/30",
    accent: "bg-accent-500/20 text-accent-300 border-accent-500/30",
  }

  return (
    <section className={cn("relative pt-32 md:pt-40 pb-16 md:pb-24", className)}>
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {badge && <Badge className={cn("mb-4 px-4 py-1 text-sm", badgeColors[badgeVariant])}>{badge}</Badge>}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">{subtitle}</p>
          )}
          {children}
        </div>
      </div>

      {/* Glowing orbs for visual consistency */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
    </section>
  )
}
