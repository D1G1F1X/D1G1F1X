export default function CardDirectoryLoading() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className="h-10 w-3/4 bg-purple-900/20 animate-pulse rounded-lg mx-auto mb-4"></div>
          <div className="h-6 w-full bg-purple-900/20 animate-pulse rounded-lg mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-[3/4] w-full bg-purple-900/20 animate-pulse rounded-lg"></div>
          <div className="h-[600px] bg-purple-900/20 animate-pulse rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}
