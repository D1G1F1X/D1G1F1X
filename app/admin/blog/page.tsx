"use client"

import { useState, useEffect } from "react"
import { PremiumBlogEditor } from "@/components/admin/premium-blog-editor"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import { DataTable } from "./data-table"
import { columns } from "./columns"

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

async function getPosts(): Promise<any[]> {
  // Replace with your actual API call to fetch posts
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog`, { cache: "no-store" })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch posts")
  }
  return res.json()
}

export default async function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("posts")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts()
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
          <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Blog Posts</h2>
                <p className="text-muted-foreground">Manage your blog posts here.</p>
              </div>
            </div>
            <DataTable data={posts} columns={columns} />
          </div>
        </TabsContent>

        <TabsContent value="editor" className="mt-0">
          <PremiumBlogEditor initialPost={selectedPost || undefined} onSave={handleSavePost} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
