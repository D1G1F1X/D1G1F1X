"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, Download, Lock } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Resource {
  id: string
  title: string
  category: string
  image: string | null
  excerpt: string
  readTime?: string
  pages?: string
  date: string
  price?: string
  updated?: string
  free?: boolean
  url: string
  isPublic: boolean
}

interface LibraryResourceGridProps {
  category: string
}

export function LibraryResourceGrid({ category }: LibraryResourceGridProps) {
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true)
      try {
        // Fetch files from our API that are marked as public and in the library category
        const response = await fetch(`/api/files?category=library&public=true`)
        const data = await response.json()

        // Transform file data into resource format
        const resourceData: Resource[] = data.files.map((file: any) => ({
          id: file.id,
          title: file.name.replace(/\.[^/.]+$/, "").replace(/-/g, " "),
          category: file.tags[0] || "Resource",
          // Ensure image is never an empty string
          image: file.type.match(/^(jpg|jpeg|png|gif|webp)$/i) ? file.url || null : null,
          excerpt: file.tags.slice(1).join(", "),
          date: new Date(file.createdAt).toLocaleDateString(),
          url: file.url,
          isPublic: file.isPublic,
          free: true,
        }))

        setResources(resourceData)
      } catch (error) {
        console.error("Error fetching resources:", error)
        toast({
          title: "Error",
          description: "Failed to load library resources",
          variant: "destructive",
        })

        // Fallback to empty array
        setResources([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchResources()
  }, [category])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (resources.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/20 rounded-lg">
        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No resources found</h3>
        <p className="text-muted-foreground mt-1">
          {category === "member"
            ? "Sign up for membership to access exclusive resources"
            : "Check back later for new resources"}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <Card
          key={resource.id}
          className="bg-gray-800 border-gray-700 overflow-hidden hover:border-purple-500 transition-all"
        >
          <div className="relative h-48">
            {category === "member" && !resource.isPublic && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <Lock className="h-12 w-12 text-purple-400" />
              </div>
            )}
            {resource.image ? (
              <Image src={resource.image || "/placeholder.svg"} alt={resource.title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-gray-500" />
              </div>
            )}
          </div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center mb-2">
              <span className="bg-purple-900/50 text-purple-300 px-2 py-1 rounded-full text-xs">
                {resource.category}
              </span>
              <span className="text-gray-400 text-xs">{resource.date}</span>
            </div>
            <CardTitle className="text-xl text-purple-400">{resource.title}</CardTitle>
            <CardDescription className="text-gray-400">{resource.readTime || resource.pages}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-gray-300">{resource.excerpt}</p>
          </CardContent>
          <CardFooter>
            {category === "premium" ? (
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Download className="mr-2 h-4 w-4" /> Purchase & Download
              </Button>
            ) : category === "member" && !resource.isPublic ? (
              <Button className="w-full bg-gray-700 hover:bg-gray-600">
                <Lock className="mr-2 h-4 w-4" /> Members Only
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                asChild
              >
                <Link href={resource.url || "#"}>
                  Read Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
