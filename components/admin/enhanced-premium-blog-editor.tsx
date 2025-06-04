"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Globe, Calendar, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

interface BlogPost {
  id?: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  createdAt?: string
  updatedAt?: string
  isPublished: boolean
  featuredImage?: string
  categories?: string[]
  tags?: string[]
  scheduledPublishDate?: string
}

interface AIWritingOptions {
  prompt: string
  tone: string
  style: string
  length: string
}

export function EnhancedPremiumBlogEditor({
  initialPost,
  onSave,
}: {
  initialPost?: BlogPost
  onSave: (post: BlogPost, autoPublish?: boolean) => Promise<void>
}) {
  const [post, setPost] = useState<BlogPost>(
    initialPost || {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      author: "",
      isPublished: false,
      categories: [],
      tags: [],
    },
  )
  const [activeTab, setActiveTab] = useState("edit")
  const [isSaving, setIsSaving] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [newCategory, setNewCategory] = useState("")
  const [newTag, setNewTag] = useState("")
  const [scheduledPublish, setScheduledPublish] = useState(false)
  const [publishDate, setPublishDate] = useState<string>("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [aiOptions, setAiOptions] = useState<AIWritingOptions>({
    prompt: "",
    tone: "professional",
    style: "informative",
    length: "medium",
  })

  // Generate slug from title
  useEffect(() => {
    if (post.title && !initialPost) {
      const slug = post.title
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-")
      setPost((prev) => ({ ...prev, slug }))
    }
  }, [post.title, initialPost])

  // Set date when publishDate changes
  useEffect(() => {
    if (publishDate) {
      setDate(new Date(publishDate))
    }
  }, [publishDate])

  // Set publishDate when date changes
  useEffect(() => {
    if (date) {
      setPublishDate(date.toISOString())
    }
  }, [date])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    setPost((prev) => ({ ...prev, content }))

    // Auto-generate excerpt if empty
    if (!post.excerpt) {
      const plainText = content.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1")
      const excerpt = plainText.substring(0, 150) + (plainText.length > 150 ? "..." : "")
      setPost((prev) => ({ ...prev, excerpt }))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPost((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setPost((prev) => ({ ...prev, isPublished: checked }))
  }

  const handleAddCategory = () => {
    if (newCategory && !post.categories?.includes(newCategory)) {
      setPost((prev) => ({
        ...prev,
        categories: [...(prev.categories || []), newCategory],
      }))
      setNewCategory("")
    }
  }

  const handleRemoveCategory = (category: string) => {
    setPost((prev) => ({
      ...prev,
      categories: prev.categories?.filter((c) => c !== category),
    }))
  }

  const handleAddTag = () => {
    if (newTag && !post.tags?.includes(newTag)) {
      setPost((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag],
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag),
    }))
  }

  const handleAIOptionChange = (name: keyof AIWritingOptions, value: string) => {
    setAiOptions((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleGenerateContent = async () => {
    if (!aiOptions.prompt) {
      toast({
        title: "Error",
        description: "Please provide a prompt for the AI to generate content.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Create a detailed prompt based on the user's options
      const detailedPrompt = `
        Write a blog post about "${aiOptions.prompt}".
        
        Tone: ${aiOptions.tone}
        Style: ${aiOptions.style}
        Length: ${aiOptions.length === "short" ? "around 500 words" : aiOptions.length === "medium" ? "around 1000 words" : "around 2000 words"}
        
        The blog post should be well-structured with headings, subheadings, and paragraphs. 
        Use markdown formatting with ## for headings and ### for subheadings.
        Include an introduction and conclusion.
        
        If relevant, include practical tips, examples, or actionable advice.
        
        Categories: ${post.categories?.join(", ") || "None specified"}
        Tags: ${post.tags?.join(", ") || "None specified"}
      `

      // Generate content using AI
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: detailedPrompt,
        maxTokens: aiOptions.length === "short" ? 800 : aiOptions.length === "medium" ? 1500 : 3000,
      })

      // Extract a title from the generated content if none exists
      let title = post.title
      if (!title) {
        const firstLine = text.split("\n")[0]
        if (firstLine.startsWith("# ")) {
          title = firstLine.substring(2)
        } else {
          // Use the first sentence or part of it as title
          title = text.split(".")[0].substring(0, 60)
        }
      }

      // Update the post with the generated content
      setPost((prev) => ({
        ...prev,
        title: title,
        content: text,
        excerpt:
          text
            .replace(/\*\*(.*?)\*\*/g, "$1")
            .replace(/\*(.*?)\*/g, "$1")
            .substring(0, 150) + "...",
      }))

      toast({
        title: "Content Generated",
        description: "AI has successfully generated content for your blog post.",
      })

      // Switch to edit tab to review the generated content
      setActiveTab("edit")
    } catch (err) {
      console.error("Error generating content:", err)
      setError("Failed to generate content. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = async (autoPublish = false) => {
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    try {
      // Validate required fields
      if (!post.title) throw new Error("Title is required")
      if (!post.content) throw new Error("Content is required")
      if (!post.slug) throw new Error("Slug is required")

      // Add scheduled publish date if enabled
      const postToSave = {
        ...post,
        scheduledPublishDate: scheduledPublish ? publishDate : undefined,
      }

      await onSave(postToSave, autoPublish)
      setSuccess(autoPublish ? "Post scheduled for publishing!" : "Post saved successfully!")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post")
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublishNow = async () => {
    setIsPublishing(true)
    setError(null)
    setSuccess(null)

    try {
      // Set post to published state
      const publishedPost = {
        ...post,
        isPublished: true,
      }

      setPost(publishedPost)
      await onSave(publishedPost, true)
      setSuccess("Post published successfully!")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to publish post")
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Premium Blog Editor</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="published" checked={post.isPublished} onCheckedChange={handleSwitchChange} />
            <Label htmlFor="published">{post.isPublished ? "Published" : "Draft"}</Label>
          </div>
          <Button onClick={() => handleSave(false)} disabled={isSaving} className="bg-purple-600 hover:bg-purple-700">
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>
          <Button
            onClick={handlePublishNow}
            disabled={isPublishing || isSaving}
            className="bg-green-600 hover:bg-green-700"
          >
            <Globe className="mr-2 h-4 w-4" />
            {isPublishing ? "Publishing..." : "Publish Now"}
          </Button>
        </div>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/50 text-red-700 p-3 rounded-md">{error}</div>}

      {success && (
        <div className="bg-green-500/10 border border-green-500/50 text-green-700 p-3 rounded-md">{success}</div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="edit">Edit Content</TabsTrigger>
          <TabsTrigger value="ai">AI Writer</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={post.title} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" value={post.slug} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="content">Content (Markdown supported)</Label>
              <Textarea
                id="content"
                name="content"
                value={post.content}
                onChange={handleContentChange}
                className="min-h-[400px] font-mono"
              />
            </div>
            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={post.excerpt}
                onChange={handleInputChange}
                className="h-24"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="ai-prompt">What would you like to write about?</Label>
              <Textarea
                id="ai-prompt"
                value={aiOptions.prompt}
                onChange={(e) => handleAIOptionChange("prompt", e.target.value)}
                className="h-24"
                placeholder="Enter a topic or detailed instructions for the AI to write about..."
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="ai-tone">Tone</Label>
                <Select value={aiOptions.tone} onValueChange={(value) => handleAIOptionChange("tone", value)}>
                  <SelectTrigger id="ai-tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ai-style">Style</Label>
                <Select value={aiOptions.style} onValueChange={(value) => handleAIOptionChange("style", value)}>
                  <SelectTrigger id="ai-style">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="informative">Informative</SelectItem>
                    <SelectItem value="narrative">Narrative</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                    <SelectItem value="descriptive">Descriptive</SelectItem>
                    <SelectItem value="analytical">Analytical</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ai-length">Length</Label>
                <Select value={aiOptions.length} onValueChange={(value) => handleAIOptionChange("length", value)}>
                  <SelectTrigger id="ai-length">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (~500 words)</SelectItem>
                    <SelectItem value="medium">Medium (~1000 words)</SelectItem>
                    <SelectItem value="long">Long (~2000 words)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerateContent}
              disabled={isGenerating || !aiOptions.prompt}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isGenerating ? "Generating..." : "Generate Content with AI"}
            </Button>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h3 className="font-medium mb-2">AI Writing Tips:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Be specific in your prompt for better results</li>
                <li>Include key points you want covered</li>
                <li>Mention your target audience</li>
                <li>Always review and edit AI-generated content</li>
                <li>Add categories and tags before generating for more relevant content</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="author">Author</Label>
              <Input id="author" name="author" value={post.author} onChange={handleInputChange} />
            </div>

            <div>
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input
                id="featuredImage"
                name="featuredImage"
                value={post.featuredImage || ""}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-4">
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {post.categories?.map((category) => (
                  <Badge key={category} variant="outline" className="flex items-center gap-1">
                    {category}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(category)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Add category"
                  onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                />
                <Button type="button" onClick={handleAddCategory} size="sm">
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags?.map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
                  onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                />
                <Button type="button" onClick={handleAddTag} size="sm">
                  Add
                </Button>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="scheduledPublish" checked={scheduledPublish} onCheckedChange={setScheduledPublish} />
                <Label htmlFor="scheduledPublish">Schedule Publishing</Label>
              </div>

              {scheduledPublish && (
                <div className="flex flex-col space-y-2">
                  <Label>Publication Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>

                  <Button
                    onClick={() => handleSave(true)}
                    disabled={!date || isSaving}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {isSaving ? "Scheduling..." : "Schedule Publication"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
