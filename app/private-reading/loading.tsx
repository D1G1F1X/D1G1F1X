export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-4 text-white">Loading private reading page...</p>
      </div>
    </div>
  )
}

