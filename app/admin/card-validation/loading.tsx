import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">
        <Skeleton className="h-9 w-72" />
      </h1>
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="mt-8">
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  )
}
