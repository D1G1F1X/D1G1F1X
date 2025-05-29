import { Badge } from "@/components/ui/badge"

interface PageHeroProps {
  title: string
  subtitle?: string
  badge?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline" | "accent"
  className?: string
  align?: "left" | "center"
}

export default function PageHero({
  title,
  subtitle,
  badge,
  badgeVariant = "default",
  className = "",
  align = "center",
}: PageHeroProps) {
  return (
    <div className={`relative bg-gradient-to-b from-gray-900 to-gray-800 py-24 ${className}`}>
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div
        className={`container relative z-10 mx-auto px-4 pt-20 pb-16 ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        {badge && (
          <div className="mb-4">
            <Badge
              variant={badgeVariant as any}
              className={`${badgeVariant === "accent" ? "bg-accent-500 hover:bg-accent-600 text-white" : ""}`}
            >
              {badge}
            </Badge>
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mt-20">{title}</h1>
        {subtitle && <p className="mt-6 max-w-3xl text-xl text-gray-300 mx-auto">{subtitle}</p>}
      </div>
    </div>
  )
}
