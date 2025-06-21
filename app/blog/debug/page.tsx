import { getAllPosts } from "@/lib/content"

export default async function BlogDebugPage() {
  // Get posts directly from the content file
  const directPosts = getAllPosts({ includeUnpublished: false })

  // Test API fetch
  let apiPosts = []
  let apiError = null

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const response = await fetch(`${baseUrl}/api/blog`, {
      cache: "no-store",
    })

    if (response.ok) {
      const data = await response.json()
      apiPosts = data.posts || []
    } else {
      apiError = `API returned ${response.status}: ${response.statusText}`
    }
  } catch (error) {
    apiError = error instanceof Error ? error.message : "Unknown error"
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Blog Debug Information</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Direct Content Access */}
          <div className="bg-white/5 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-green-400">Direct Content Access</h2>
            <p className="mb-2">
              Posts found: <span className="font-mono">{directPosts.length}</span>
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {directPosts.map((post, index) => (
                <div key={post.id} className="text-sm">
                  <span className="text-gray-400">{index + 1}.</span> {post.title}
                  <div className="text-xs text-gray-500 ml-4">
                    ID: {post.id} | Published: {post.isPublished ? "Yes" : "No"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Access */}
          <div className="bg-white/5 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">API Access</h2>
            {apiError ? (
              <div className="text-red-400">
                <p className="mb-2">Error: {apiError}</p>
              </div>
            ) : (
              <>
                <p className="mb-2">
                  Posts found: <span className="font-mono">{apiPosts.length}</span>
                </p>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {apiPosts.map((post: any, index: number) => (
                    <div key={post.id} className="text-sm">
                      <span className="text-gray-400">{index + 1}.</span> {post.title}
                      <div className="text-xs text-gray-500 ml-4">
                        ID: {post.id} | Author: {post.author}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Environment Info */}
        <div className="bg-white/5 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-yellow-400">Environment Information</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm font-mono">
            <div>
              <p>NODE_ENV: {process.env.NODE_ENV}</p>
              <p>NEXT_PUBLIC_APP_URL: {process.env.NEXT_PUBLIC_APP_URL || "undefined"}</p>
              <p>VERCEL_URL: {process.env.VERCEL_URL || "undefined"}</p>
            </div>
            <div>
              <p>Timestamp: {new Date().toISOString()}</p>
              <p>Direct vs API Match: {directPosts.length === apiPosts.length ? "✅" : "❌"}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/blog"
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            ← Back to Blog
          </a>
        </div>
      </div>
    </div>
  )
}
