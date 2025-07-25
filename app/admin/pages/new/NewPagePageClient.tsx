"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { createContent } from "@/lib/enhanced-content" // Assuming this function exists
import type { ContentItem } from "@/lib/enhanced-content"

export function NewPagePageClient() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const newPage: ContentItem = {
        id: crypto.randomUUID(), // Generate a unique ID for the new page
        type: "page", // Assuming this is for general pages
        title,
        slug,
        content,
        published,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      await createContent(newPage) // Call API to create content
      toast({
        title: "Page Created",
        description: "New page has been successfully created.",
      })
      router.push("/admin/pages") // Redirect back to pages list
    } catch (error) {
      console.error("Failed to create page:", error)
      toast({
        title: "Error",
        description: "Failed to create new page.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Create New Page</h1>

      <Card>
        <CardHeader>
          <CardTitle>New Page Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={15} required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="published"
                checked={published}
                onCheckedChange={(checked) => setPublished(Boolean(checked))}
              />
              <Label htmlFor="published">Published</Label>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Page"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
