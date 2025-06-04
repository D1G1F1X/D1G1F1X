"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
  CalendarIcon,
  Wand2Icon,
  SaveIcon,
  SendIcon,
  ClockIcon,
  CheckIcon,
  AlertCircleIcon,
  ImageIcon,
  TagIcon,
  FileTextIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface BlogPost {
  id?: string
  title: string
  content: string
  excerpt: string
  slug: string
  featuredImage: string
  tags: string[]
  category: string
  status: "draft" | "scheduled" | "published"
  publishDate?: Date
  author: string
}

export function PremiumBlogEditor({ post }: { post?: BlogPost }) {
  const [blogPost, setBlogPost] = useState<BlogPost>(
    post || {
      title: "",
      content: "",
      excerpt: "",
      slug: "",
      featuredImage: "",
      tags: [],
      category: "",
      status: "draft",
      author: "Admin",
    },
  )

  const [activeTab, setActiveTab] = useState("content")
  const [tagInput, setTagInput] = useState("")
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiTone, setAiTone] = useState("informative")
  const [aiStyle, setAiStyle] = useState("casual")
  const [aiLength, setAiLength] = useState("medium")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isAutoPostDialogOpen, setIsAutoPostDialogOpen] = useState(false)
  const [autoPostSchedule, setAutoPostSchedule] = useState<Date | undefined>(undefined)
  const [autoPostEnabled, setAutoPostEnabled] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("")

  const contentEditorRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (blogPost.title) {
      const slug = blogPost.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      setBlogPost((prev) => ({ ...prev, slug }))
    }
  }, [blogPost.title])

  const handleAddTag = () => {
    if (tagInput && !blogPost.tags.includes(tagInput)) {
      setBlogPost((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput],
      }))
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setBlogPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const generateAIContent = async () => {
    if (!aiPrompt) {
      toast({
        title: "Prompt Required",
        description: "Please enter a prompt for the AI to generate content.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // This would be an actual API call to an AI service
      // For demo purposes, we'll simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const generatedContent =
        `# ${blogPost.title || "Generated Blog Post"}\n\n` +
        `This is AI-generated content based on the prompt: "${aiPrompt}"\n\n` +
        `It's written in a ${aiTone} tone with a ${aiStyle} style and ${aiLength} length.\n\n` +
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.\n\n` +
        `## Key Points\n\n` +
        `- Point one about the topic\n` +
        `- Another important consideration\n` +
        `- Something readers should know\n\n` +
        `## Conclusion\n\n` +
        `In conclusion, this topic is fascinating and deserves more attention. We hope you found this information helpful!`

      setBlogPost((prev) => ({
        ...prev,
        content: generatedContent,
        excerpt: generatedContent.split("\n\n")[1] || "AI-generated excerpt",
      }))

      toast({
        title: "Content Generated",
        description: "AI has successfully generated content for your blog post.",
      })

      setActiveTab("content")
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveDraft = async () => {
    if (!blogPost.title) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your blog post.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      // This would be an actual API call to save the draft
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Draft Saved",
        description: "Your blog post has been saved as a draft.",
      })
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "There was an error saving your draft. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    if (!blogPost.title || !blogPost.content) {
      toast({
        title: "Content Required",
        description: "Please enter a title and content for your blog post.",
        variant: "destructive",
      })
      return
    }

    setIsPublishing(true)

    try {
      // This would be an actual API call to publish the post
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setBlogPost((prev) => ({
        ...prev,
        status: "published",
        publishDate: new Date(),
      }))

      toast({
        title: "Post Published",
        description: "Your blog post has been published successfully.",
      })

      // Generate a preview URL
      setPreviewUrl(`/blog/${blogPost.slug}`)
    } catch (error) {
      toast({
        title: "Publish Failed",
        description: "There was an error publishing your post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPublishing(false)
    }
  }

  const handleScheduleAutoPost = () => {
    if (!autoPostSchedule) {
      toast({
        title: "Schedule Required",
        description: "Please select a date and time for auto-posting.",
        variant: "destructive",
      })
      return
    }

    setAutoPostEnabled(true)
    setIsAutoPostDialogOpen(false)

    toast({
      title: "Auto-Post Scheduled",
      description: `Your post will be automatically published on ${format(autoPostSchedule, "PPP")} at ${format(autoPostSchedule, "p")}.`,
    })

    setBlogPost((prev) => ({
      ...prev,
      status: "scheduled",
      publishDate: autoPostSchedule,
    }))
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card className="border-purple-300 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-800 dark:text-purple-300 flex items-center justify-between">
            <span>Premium Blog Editor</span>
            {blogPost.status === "published" && (
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                Published
              </Badge>
            )}
            {blogPost.status === "scheduled" && (
              <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                Scheduled
              </Badge>
            )}
          </CardTitle>
          <CardDescription>Create and manage your blog content with advanced AI assistance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Post Title</Label>
            <Input
              id="title"
              value={blogPost.title}
              onChange={(e) => setBlogPost((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter a compelling title"
              className="w-full"
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="content">Post Content</Label>
                <Textarea
                  id="content"
                  ref={contentEditorRef}
                  value={blogPost.content}
                  onChange={(e) => setBlogPost((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your blog post content here..."
                  className="min-h-[400px] font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={blogPost.excerpt}
                  onChange={(e) => setBlogPost((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Write a short excerpt for your post..."
                  className="min-h-[100px]"
                />
              </div>
            </TabsContent>

            <TabsContent value="ai-assistant" className="space-y-4 mt-4">
              <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Wand2Icon className="mr-2 h-5 w-5 text-purple-600" />
                  AI Content Generator
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  Let AI help you create engaging blog content. Provide a prompt and customize the output.
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-prompt">What would you like to write about?</Label>
                    <Textarea
                      id="ai-prompt"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="E.g., Write a blog post about the benefits of numerology in daily life..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ai-tone">Tone</Label>
                      <Select value={aiTone} onValueChange={setAiTone}>
                        <SelectTrigger id="ai-tone">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="informative">Informative</SelectItem>
                          <SelectItem value="conversational">Conversational</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                          <SelectItem value="thoughtful">Thoughtful</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ai-style">Style</Label>
                      <Select value={aiStyle} onValueChange={setAiStyle}>
                        <SelectTrigger id="ai-style">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="storytelling">Storytelling</SelectItem>
                          <SelectItem value="persuasive">Persuasive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ai-length">Length</Label>
                      <Select value={aiLength} onValueChange={setAiLength}>
                        <SelectTrigger id="ai-length">
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short (~300 words)</SelectItem>
                          <SelectItem value="medium">Medium (~600 words)</SelectItem>
                          <SelectItem value="long">Long (~1000 words)</SelectItem>
                          <SelectItem value="comprehensive">Comprehensive (~1500 words)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={generateAIContent}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isGenerating || !aiPrompt}
                  >
                    {isGenerating ? (
                      <>Generating Content...</>
                    ) : (
                      <>
                        <Wand2Icon className="mr-2 h-4 w-4" />
                        Generate Content
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Auto-Posting</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  Schedule your AI-generated content to be automatically published at a specific time.
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto-post"
                      checked={autoPostEnabled}
                      onCheckedChange={(checked) => {
                        if (checked && !autoPostSchedule) {
                          setIsAutoPostDialogOpen(true)
                        } else {
                          setAutoPostEnabled(checked)
                        }
                      }}
                    />
                    <Label htmlFor="auto-post">Enable Auto-Posting</Label>
                  </div>

                  {autoPostEnabled && autoPostSchedule && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <ClockIcon className="mr-1 h-4 w-4" />
                      Scheduled for {format(autoPostSchedule, "PPP")} at {format(autoPostSchedule, "p")}
                    </div>
                  )}

                  {autoPostEnabled && (
                    <Button variant="outline" size="sm" onClick={() => setIsAutoPostDialogOpen(true)}>
                      Change Schedule
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={blogPost.slug}
                    onChange={(e) => setBlogPost((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="post-url-slug"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="featured-image">Featured Image URL</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="featured-image"
                      value={blogPost.featuredImage}
                      onChange={(e) => setBlogPost((prev) => ({ ...prev, featuredImage: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                      className="w-full"
                    />
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Select Featured Image</DialogTitle>
                          <DialogDescription>
                            Choose an image from your media library or upload a new one.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-3 gap-2 py-4">
                          {/* This would be populated with actual images */}
                          <div className="aspect-square bg-gray-200 rounded cursor-pointer hover:opacity-80" />
                          <div className="aspect-square bg-gray-200 rounded cursor-pointer hover:opacity-80" />
                          <div className="aspect-square bg-gray-200 rounded cursor-pointer hover:opacity-80" />
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Upload New</Button>
                          <Button>Select Image</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={blogPost.category}
                    onValueChange={(value) => setBlogPost((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="numerology">Numerology</SelectItem>
                      <SelectItem value="tarot">Tarot</SelectItem>
                      <SelectItem value="astrology">Astrology</SelectItem>
                      <SelectItem value="spirituality">Spirituality</SelectItem>
                      <SelectItem value="divination">Divination</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Select
                    value={blogPost.author}
                    onValueChange={(value) => setBlogPost((prev) => ({ ...prev, author: value }))}
                  >
                    <SelectTrigger id="author">
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Numerology Expert">Numerology Expert</SelectItem>
                      <SelectItem value="Guest Writer">Guest Writer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex space-x-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    className="w-full"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button variant="outline" onClick={handleAddTag}>
                    <TagIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {blogPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-0.5"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-950">
                <div className="p-4">
                  {blogPost.content ? (
                    <div className="prose dark:prose-invert max-w-none">
                      <h1>{blogPost.title || "Untitled Post"}</h1>
                      {blogPost.featuredImage && (
                        <img
                          src={blogPost.featuredImage || "/placeholder.svg"}
                          alt={blogPost.title}
                          className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                      )}
                      <div className="whitespace-pre-wrap">{blogPost.content}</div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">No content</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Add some content to see a preview</p>
                    </div>
                  )}
                </div>
              </div>

              {previewUrl && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" />
                    Your post is live! View it at:{" "}
                    <a href={previewUrl} className="ml-1 underline" target="_blank" rel="noopener noreferrer">
                      {previewUrl}
                    </a>
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
              {isSaving ? (
                "Saving..."
              ) : (
                <>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save Draft
                </>
              )}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="default" className="bg-purple-600 hover:bg-purple-700" disabled={isPublishing}>
                  {isPublishing ? (
                    "Publishing..."
                  ) : (
                    <>
                      <SendIcon className="mr-2 h-4 w-4" />
                      Publish
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will publish your blog post and make it visible to all visitors.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handlePublish}>Publish</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {blogPost.status === "draft" && (
            <Button variant="outline" onClick={() => setIsAutoPostDialogOpen(true)}>
              <ClockIcon className="mr-2 h-4 w-4" />
              Schedule
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={isAutoPostDialogOpen} onOpenChange={setIsAutoPostDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Auto-Post</DialogTitle>
            <DialogDescription>Choose when you want this post to be automatically published.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Publication Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !autoPostSchedule && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {autoPostSchedule ? format(autoPostSchedule, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={autoPostSchedule} onSelect={setAutoPostSchedule} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Publication Time</Label>
              <Select
                value={autoPostSchedule ? format(autoPostSchedule, "HH:mm") : "09:00"}
                onValueChange={(value) => {
                  if (autoPostSchedule) {
                    const [hours, minutes] = value.split(":").map(Number)
                    const newDate = new Date(autoPostSchedule)
                    newDate.setHours(hours, minutes)
                    setAutoPostSchedule(newDate)
                  } else {
                    const today = new Date()
                    const [hours, minutes] = value.split(":").map(Number)
                    today.setHours(hours, minutes)
                    setAutoPostSchedule(today)
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, hour) => (
                    <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                      {hour.toString().padStart(2, "0")}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg border p-4 bg-amber-50 dark:bg-amber-950/20">
              <div className="flex items-start">
                <AlertCircleIcon className="h-5 w-5 text-amber-600 dark:text-amber-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800 dark:text-amber-300">Important Note</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Auto-posting requires your account to remain active. The post will be published automatically at the
                    scheduled time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAutoPostDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleAutoPost}>Schedule Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
