import { Skeleton } from "@/components/ui/skeleton"

export default function KnowledgeBaseLoading() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Skeleton className="h-10 w-1/2 mb-6" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-[150px] rounded-lg" />
        <Skeleton className="h-[150px] rounded-lg" />
        <Skeleton className="h-[150px] rounded-lg" />
      </div>
      <Skeleton className="h-[400px] w-full mt-6 rounded-lg" />
    </div>
  )
}
