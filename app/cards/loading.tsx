import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-50">
        <Skeleton className="mx-auto h-10 w-64" />
      </h1>
      <p className="mb-12 text-center text-lg text-gray-300">
        <Skeleton className="mx-auto h-6 w-96" />
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg">
            <Skeleton className="h-full w-full" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center">
              <Skeleton className="mx-auto h-4 w-3/4" />
              <Skeleton className="mx-auto mt-1 h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
