"use client"

import { useState, useEffect } from "react"
import { PremiumBlogEditor } from "@/components/admin/premium-blog-editor"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2 } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  createdAt: string
  updatedAt: string
  isPublished: boolean
  featuredImage?: string
  categories?: string[]
  tags?: string[]
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("posts")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog")
        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError("Error loading posts. Please try again later.")
        console.error("Error fetching posts:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleSavePost = async (post: BlogPost) => {
    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      })

      if (!response.ok) {
        throw new Error("Failed to save post")
      }

      const savedPost = await response.json()

      // Update posts list
      if (post.id) {
        setPosts(posts.map((p) => (p.id === post.id ? savedPost : p)))
      } else {
        setPosts([...posts, savedPost])
      }

      // Reset selected post and go back to posts list
      setSelectedPost(null)
      setActiveTab("posts")

      return savedPost
    } catch (error) {
      console.error("Error saving post:", error)
      throw error
    }
  }

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post)
    setActiveTab("editor")
  }

  const handleNewPost = () => {
    setSelectedPost(null)
    setActiveTab("editor")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-purple-400">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center p-6 bg-red-900/20 border border-red-900/30 rounded-lg max-w-md">
          <h3 className="text-xl font-semibold text-red-400 mb-2">Error</h3>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <Button onClick={handleNewPost} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" /> New Post
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="posts">All Posts</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-0">
          <div className="grid gap-4">
            {posts.length === 0 ? (
              <div className="text-center p-8 bg-purple-900/10 border border-purple-900/20 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-400 mb-2">No Posts Found</h3>
                <p className="text-gray-300 mb-4">Get started by creating your first blog post.</p>
                <Button onClick={handleNewPost} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" /> Create New Post
                </Button>
              </div>
            ) : (
              posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {post.featuredImage && (
                      <div className="md:w-1/4 h-40 md:h-auto relative">
                        <img
                          src={post.featuredImage || "/placeholder.svg"}
                          alt={post.title}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                          }}
                        />
                      </div>
                    )}
                    <div className={`flex-1 ${post.featuredImage ? "md:w-3/4" : "w-full"}`}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{post.title}</CardTitle>
                            <CardDescription>
                              <div className="flex items-center gap-2 mt-1">
                                <span>By {post.author}</span>
                                <span>•</span>
                                <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString()}</time>
                                <span>•</span>
                                <span className={post.isPublished ? "text-green-500" : "text-yellow-500"}>
                                  {post.isPublished ? "Published" : "Draft"}
                                </span>
                              </div>
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-500 line-clamp-2">{post.excerpt}</p>

                        {(post.categories?.length || post.tags?.length) && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {post.categories?.map((category) => (
                              <div
                                key={category}
                                className="bg-purple-100 text-purple-800 px-2 py-1 text-xs rounded-md"
                              >
                                {category}
                              </div>
                            ))}

                            {post.tags?.map((tag) => (
                              <div key={tag} className="bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded-md">
                                #{tag}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <div className="flex justify-between items-center w-full">
                          <Button
                            variant="link"
                            className="p-0 h-auto text-purple-500"
                            onClick={() => window.open(`/blog/${post.slug}`, "_blank")}
                          >
                            View Post
                          </Button>
                          <div className="text-sm text-gray-500">Slug: {post.slug}</div>
                        </div>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="editor" className="mt-0">
          <PremiumBlogEditor initialPost={selectedPost || undefined} onSave={handleSavePost} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
