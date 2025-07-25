"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2, Lightbulb, Search } from "lucide-react"

export default function PromptManagerClientPage() {
  // This is a placeholder for prompt data. In a real app, you'd fetch this from a database.
  const prompts = [
    { id: "1", name: "Daily Reading Prompt", type: "AI", description: "Generates a daily oracle card reading." },
    {
      id: "2",
      name: "Numerology Report Template",
      type: "Template",
      description: "Template for comprehensive numerology reports.",
    },
    {
      id: "3",
      name: "Elemental Oracle Reading",
      type: "AI",
      description: "Generates a reading based on elemental dice roll.",
    },
  ]

  const handleEdit = (id: string) => {
    console.log("Edit prompt:", id)
    // Implement edit logic, e.g., open a dialog or navigate to an edit page
  }

  const handleDelete = (id: string) => {
    console.log("Delete prompt:", id)
    // Implement delete logic, e.g., show a confirmation dialog and then delete
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Prompt Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Prompt
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" /> All Prompts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search-prompts">Search Prompts</Label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="search-prompts" placeholder="Search by name or description..." className="pl-8" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prompts.map((prompt) => (
                <TableRow key={prompt.id}>
                  <TableCell className="font-medium">{prompt.name}</TableCell>
                  <TableCell>{prompt.type}</TableCell>
                  <TableCell>{prompt.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(prompt.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(prompt.id)}>
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
            <h2 className="text-xl font-semibold mb-4">Add New Prompt</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="prompt-name">Prompt Name</Label>
                <Input id="prompt-name" placeholder="Enter prompt name" />
              </div>
              <div>
                <Label htmlFor="prompt-type">Prompt Type</Label>
                <Input id="prompt-type" placeholder="e.g., AI, Template" />
              </div>
              <div>
                <Label htmlFor="prompt-description">Description</Label>
                <Textarea id="prompt-description" rows={3} placeholder="Brief description of the prompt..." />
              </div>
              <div>
                <Label htmlFor="prompt-content">Prompt Content</Label>
                <Textarea
                  id="prompt-content"
                  rows={8}
                  placeholder="Enter the full prompt content or template here..."
                />
              </div>
              <Button className="w-full">Create Prompt</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
