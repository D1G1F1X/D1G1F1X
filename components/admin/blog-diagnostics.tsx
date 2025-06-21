"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function BlogDiagnostics() {
  const [diagnostics, setDiagnostics] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runDiagnostics = async () => {
    setLoading(true)
    try {
      // Test the blog API
      const blogResponse = await fetch("/api/blog")
      const blogData = await blogResponse.json()

      // Test content import directly (this won't work in browser, but shows the attempt)
      const diagnosticData = {
        timestamp: new Date().toISOString(),
        blogApi: {
          status: blogResponse.status,
          ok: blogResponse.ok,
          postsCount: blogData.posts?.length || 0,
          posts:
            blogData.posts?.slice(0, 3).map((p: any) => ({
              id: p.id,
              title: p.title,
              isPublished: p.isPublished,
            })) || [],
        },
        environment: {
          nodeEnv: process.env.NODE_ENV,
          baseUrl: window.location.origin,
        },
      }

      setDiagnostics(diagnosticData)
    } catch (error) {
      setDiagnostics({
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Blog System Diagnostics</CardTitle>
        <CardDescription>Debug information for blog posts and content system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runDiagnostics} disabled={loading}>
          {loading ? "Running Diagnostics..." : "Refresh Diagnostics"}
        </Button>

        {diagnostics && (
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Diagnostic Results</h3>
              <pre className="text-sm overflow-auto">{JSON.stringify(diagnostics, null, 2)}</pre>
            </div>

            {diagnostics.blogApi && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">API Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>Status: {diagnostics.blogApi.status}</div>
                      <div>OK: {diagnostics.blogApi.ok ? "✅" : "❌"}</div>
                      <div>Posts Count: {diagnostics.blogApi.postsCount}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sample Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {diagnostics.blogApi.posts.length > 0 ? (
                      <ul className="space-y-1">
                        {diagnostics.blogApi.posts.map((post: any) => (
                          <li key={post.id} className="text-sm">
                            {post.title} ({post.isPublished ? "Published" : "Draft"})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-red-600">No posts found</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
