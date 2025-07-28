import { CardFooter } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { CardDescription } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
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

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
            <Skeleton className="h-48 w-full rounded-t-lg" />
            <CardHeader className="flex-grow">
              <CardTitle className="text-xl font-semibold text-gray-50">
                <Skeleton className="h-6 w-3/4" />
              </CardTitle>
              <CardDescription className="text-gray-400">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-5/6" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24" />
            </CardContent>
            <CardFooter className="mt-auto">
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
