export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-purple-500 border-t-transparent"></div>
        <p className="text-lg">Loading About Page...</p>
      </div>
    </div>
  )
}
