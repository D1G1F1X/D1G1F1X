import { cn } from "@/lib/utils"

interface SkeletonLoaderProps {
  className?: string
}

export function SkeletonCard() {
  return (
    <div className="bg-gray-800 rounded-lg p-6 animate-pulse">
      <div className="w-full h-48 bg-gray-700 rounded mb-4" />
      <div className="h-4 bg-gray-700 rounded mb-2" />
      <div className="h-4 bg-gray-700 rounded w-5/6 mb-4" />
      <div className="h-10 bg-gray-700 rounded w-1/3" />
    </div>
  )
}

export function SkeletonGrid({ className }: SkeletonLoaderProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", className)}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}

export function SkeletonText({ lines = 3, className }: { lines?: number } & SkeletonLoaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={cn("h-4 bg-gray-700 rounded", i === lines - 1 ? "w-4/5" : "w-full")} />
      ))}
    </div>
  )
}

export function SkeletonHero() {
  return <div className="w-full h-64 md:h-96 bg-gray-800 rounded-lg animate-pulse" />
}
