import { Skeleton } from "@/components/ui/skeleton"
import ConstellationBackground from "@/components/constellation-background"

export default function AboutLoading() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 opacity-30">
        <ConstellationBackground />
      </div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="space-y-16">
          {/* Introduction Section */}
          <section className="text-center mb-12">
            <Skeleton className="h-12 w-3/4 mx-auto mb-6 bg-purple-900/30" />
            <Skeleton className="h-6 w-2/3 mx-auto bg-purple-900/20" />
          </section>

          {/* Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4 bg-purple-900/30" />
              <Skeleton className="h-24 w-full bg-purple-900/20" />
              <Skeleton className="h-24 w-full bg-purple-900/20" />
            </div>
            <div className="flex justify-center">
              <Skeleton className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-purple-900/30" />
            </div>
          </div>

          {/* Number Pairings Diagram */}
          <Skeleton className="h-[500px] w-full bg-purple-900/20 rounded-lg" />

          {/* Goddess Danu Section */}
          <Skeleton className="h-[400px] w-full bg-purple-900/20 rounded-lg" />

          {/* Danu's Gifts Section */}
          <Skeleton className="h-[500px] w-full bg-purple-900/20 rounded-lg" />

          {/* Number Pairings Detailed Section */}
          <Skeleton className="h-[600px] w-full bg-purple-900/20 rounded-lg" />

          {/* Call to Action Section */}
          <section className="text-center py-12">
            <Skeleton className="h-8 w-1/2 mx-auto mb-6 bg-purple-900/30" />
            <Skeleton className="h-6 w-2/3 mx-auto mb-8 bg-purple-900/20" />
            <div className="flex justify-center gap-4">
              <Skeleton className="h-12 w-32 bg-purple-900/40 rounded-md" />
              <Skeleton className="h-12 w-32 bg-purple-900/30 rounded-md" />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
