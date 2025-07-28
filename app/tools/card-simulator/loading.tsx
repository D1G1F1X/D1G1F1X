import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-10">
      <div className="mb-8 text-center">
        <Skeleton className="h-12 w-[300px] mx-auto" />
        <Skeleton className="h-6 w-[500px] mx-auto mt-4" />
      </div>
      <div className="space-y-8">
        <Skeleton className="h-[500px] w-full" />
      </div>
    </div>
  )
}
