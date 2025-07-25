import { Skeleton } from "@/components/ui/skeleton"

export default function AboutLoading() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-10 w-3/4 mb-6" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-6 w-11/12 mb-8" />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>

        <div className="space-y-8">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
