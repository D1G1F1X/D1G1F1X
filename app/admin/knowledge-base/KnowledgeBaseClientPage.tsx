"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2, BookOpen, FileText, Search } from "lucide-react"
import Link from "next/link"

export default function KnowledgeBaseClientPage() {
  // This is a placeholder for article data. In a real app, you'd fetch this from a database.
  const articles = [
    { id: "1", title: "Understanding Life Path Numbers", slug: "life-path-numbers", status: "Published" },
    { id: "2", title: "The Symbolism of the Cauldron Card", slug: "cauldron-card-symbolism", status: "Draft" },
    { id: "3", title: "How to Interpret Oracle Spreads", slug: "interpret-oracle-spreads", status: "Published" },
  ]

  const handleEdit = (id: string) => {
    console.log("Edit article:", id)
    // Implement edit logic, e.g., open a dialog or navigate to an edit page
  }

  const handleDelete = (id: string) => {
    console.log("Delete article:", id)
    // Implement delete logic, e.g., show a confirmation dialog and then delete
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Knowledge Base Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Article
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> Knowledge Base Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Manage uploaded documents and files associated with the knowledge base.
          </p>
          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/admin/knowledge-base/files">Go to Files Manager</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" /> All Articles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search-articles">Search Articles</Label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="search-articles" placeholder="Search by title or slug..." className="pl-8" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.slug}</TableCell>
                  <TableCell>{article.status}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(article.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(article.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Add New Article</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="article-title">Article Title</Label>
                <Input id="article-title" placeholder="Enter article title" />
              </div>
              <div>
                <Label htmlFor="article-slug">Article Slug</Label>
                <Input id="article-slug" placeholder="Enter article slug (e.g., understanding-numerology)" />
              </div>
              <div>
                <Label htmlFor="article-content">Content</Label>
                <textarea
                  id="article-content"
                  rows={8}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Write your article content here..."
                ></textarea>
              </div>
              <Button className="w-full">Create Article</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
