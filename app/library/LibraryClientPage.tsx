"use client"

import { AlertDescription } from "@/components/ui/alert"

import { AlertTitle } from "@/components/ui/alert"

import { Alert } from "@/components/ui/alert"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Book, PlusCircle, RefreshCw, AlertTriangle, Eye } from "lucide-react"
import Link from "next/link"
import type { LibraryResource } from "@/types/library"
import { getLibraryResources } from "@/lib/services/library-service"
import { useToast } from "@/hooks/use-toast"

interface LibraryClientPageProps {
  initialResources: LibraryResource[]
}

export default function LibraryClientPage({ initialResources }: LibraryClientPageProps) {
  const [resources, setResources] = useState<LibraryResource[]>(initialResources)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const fetchResources = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedResources = await getLibraryResources()
      setResources(fetchedResources)
      toast({
        title: "Library Refreshed",
        description: `Successfully loaded ${fetchedResources.length} resources.`,
      })
    } catch (err) {
      console.error("Failed to fetch library resources:", err)
      setError("Failed to fetch library resources. Please check your network connection.")
      toast({
        title: "Error",
        description: "Failed to refresh library resources.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchResources()
  }, [fetchResources])

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" /> Library Resources
          </CardTitle>
          <CardDescription>Explore a collection of resources to enhance your understanding.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources by title, author, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button asChild>
              <Link href="/admin/library">
                <PlusCircle className="mr-2 h-4 w-4" />
                Manage Library
              </Link>
            </Button>
            <Button onClick={fetchResources} disabled={loading}>
              <RefreshCw className={loading ? "mr-2 h-4 w-4 animate-spin" : "mr-2 h-4 w-4"} />
              {loading ? "Refreshing..." : "Refresh Resources"}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResources.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      No resources found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium">{resource.title}</TableCell>
                      <TableCell>{resource.author}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{resource.description}</TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/library/resource/${resource.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
