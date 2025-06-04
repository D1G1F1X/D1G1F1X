"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, FileText, FileIcon, Brain, Database, Flame, Upload, Trash2, File } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type KnowledgeFile = {
  id: string
  name: string
  type: string
  category: string
  tags: string[]
  content: string
  createdAt: string
  updatedAt: string
  size: number
  url?: string
  path?: string
}

type KnowledgeFolder = {
  id: string
  name: string
  path: string
  createdAt: string
  updatedAt: string
}

export function KnowledgeBaseManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [isUploading, setIsLoading] = useState(false)
  const [showNewFileDialog, setShowNewFileDialog] = useState(false)
  const [newFileName, setNewFileName] = useState("")
  const [newFileContent, setNewFileContent] = useState("")
  const [newFileCategory, setNewFileCategory] = useState("numerology")
  const [newFileTags, setNewFileTags] = useState("")

  // Mock data
  const files: KnowledgeFile[] = [
    {
      id: "1",
      name: "numerology-basics.md",
      type: "markdown",
      category: "numerology",
      tags: ["basics", "guide", "reference"],
      content: "# Numerology Basics\n\nNumerology is the study of numbers and their influence on human life...",
      createdAt: "2023-05-15T10:30:00Z",
      updatedAt: "2023-05-20T14:20:00Z",
      size: 15200,
      path: "/numerology/",
    },
    {
      id: "2",
      name: "card-meanings.md",
      type: "markdown",
      category: "cards",
      tags: ["reference", "meanings", "interpretation"],
      content: "# Card Meanings\n\nThis document contains detailed meanings for all NUMO Oracle cards...",
      createdAt: "2023-04-10T14:20:00Z",
      updatedAt: "2023-06-05T09:15:00Z",
      size: 42500,
      path: "/cards/",
    },
    {
      id: "3",
      name: "reading-prompts.json",
      type: "json",
      category: "prompts",
      tags: ["ai", "templates", "readings"],
      content:
        '{\n  "templates": [\n    {\n      "name": "Basic Reading",\n      "prompt": "Analyze the following cards..."\n    }\n  ]\n}',
      createdAt: "2023-06-01T08:00:00Z",
      updatedAt: "2023-06-10T11:30:00Z",
      size: 8700,
      path: "/prompts/",
    },
    {
      id: "4",
      name: "elemental-correspondences.md",
      type: "markdown",
      category: "elements",
      tags: ["reference", "elements", "correspondences"],
      content: "# Elemental Correspondences\n\nThis document outlines the relationships between elements and cards...",
      createdAt: "2023-05-05T09:15:00Z",
      updatedAt: "2023-05-25T16:45:00Z",
      size: 18300,
      path: "/elements/",
    },
    {
      id: "5",
      name: "astrological-influences.md",
      type: "markdown",
      category: "astrology",
      tags: ["reference", "planets", "zodiac"],
      content: "# Astrological Influences\n\nThis document details the astrological correspondences for NUMO cards...",
      createdAt: "2023-05-12T11:45:00Z",
      updatedAt: "2023-06-02T13:20:00Z",
      size: 23600,
      path: "/astrology/",
    },
  ]

  const folders: KnowledgeFolder[] = [
    {
      id: "1",
      name: "Numerology",
      path: "/numerology/",
      createdAt: "2023-04-01T08:00:00Z",
      updatedAt: "2023-04-01T08:00:00Z",
    },
    {
      id: "2",
      name: "Card Meanings",
      path: "/cards/",
      createdAt: "2023-04-02T10:00:00Z",
      updatedAt: "2023-04-02T10:00:00Z",
    },
    {
      id: "3",
      name: "AI Prompts",
      path: "/prompts/",
      createdAt: "2023-04-03T11:30:00Z",
      updatedAt: "2023-04-03T11:30:00Z",
    },
  ]

  const categories = [
    { id: "all", name: "All Files" },
    { id: "numerology", name: "Numerology" },
    { id: "cards", name: "Cards" },
    { id: "prompts", name: "Prompts" },
    { id: "elements", name: "Elements" },
    { id: "astrology", name: "Astrology" },
  ]

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "markdown":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "json":
        return <Database className="h-5 w-5 text-green-500" />
      case "txt":
        return <FileText className="h-5 w-5 text-gray-500" />
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "numerology":
        return <FileText className="h-5 w-5 text-purple-500" />
      case "cards":
        return <FileIcon className="h-5 w-5 text-blue-500" />
      case "prompts":
        return <Brain className="h-5 w-5 text-green-500" />
      case "elements":
        return <Flame className="h-5 w-5 text-red-500" />
      case "astrology":
        return <FileText className="h-5 w-5 text-yellow-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      // Reset file input
      e.target.value = ""
    }, 1500)
  }

  const handleCreateFile = () => {
    // Would call API to create file
    console.log(`Creating file: ${newFileName} with category: ${newFileCategory}`)
    setShowNewFileDialog(false)
    setNewFileName("")
    setNewFileContent("")
    setNewFileCategory("numerology")
    setNewFileTags("")
  }

  const handleDeleteSelected = () => {
    // Would call API to delete selected files
    console.log(`Deleting files: ${selectedFiles.join(", ")}`)
    setSelectedFiles([])
  }

  const toggleFileSelection = (id: string) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.includes(id) ? prevSelectedFiles.filter((fileId) => fileId !== id) : [...prevSelectedFiles, id],
    )
  }

  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || file.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddVariable = () => {
    // Placeholder for adding tags
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search files by name or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Dialog open={showNewFileDialog} onOpenChange={setShowNewFileDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                New File
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Create New Knowledge Base File</DialogTitle>
                <DialogDescription>
                  Add a new file to the knowledge base for AI training and reference.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="filename" className="text-right">
                    File Name
                  </Label>
                  <Input
                    id="filename"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    className="col-span-3"
                    placeholder="e.g., numerology-guide.md"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <select
                    id="category"
                    value={newFileCategory}
                    onChange={(e) => setNewFileCategory(e.target.value)}
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="numerology">Numerology</option>
                    <option value="cards">Cards</option>
                    <option value="prompts">Prompts</option>
                    <option value="elements">Elements</option>
                    <option value="astrology">Astrology</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="content" className="text-right pt-2">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    value={newFileContent}
                    onChange={(e) => setNewFileContent(e.target.value)}
                    className="col-span-3 min-h-[200px]"
                    placeholder="Enter file content here..."
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <Label className="text-right">Tags</Label>
                  <div className="col-span-3 space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={newFileTags}
                        onChange={(e) => setNewFileTags(e.target.value)}
                        placeholder="e.g., reference, guide, basics (comma separated)"
                      />
                      <Button type="button" onClick={handleAddVariable} size="sm">
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewFileDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateFile} disabled={!newFileName.trim()}>
                  Create File
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="relative">
            <Input
              type="file"
              id="fileUpload"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileUpload}
            />
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>

          {selectedFiles.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete ({selectedFiles.length})
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredFiles.map((file) => (
          <Card
            key={file.id}
            className={`cursor-pointer transition-all ${selectedFiles.includes(file.id) ? "ring-2 ring-primary" : ""}`}
            onClick={() => toggleFileSelection(file.id)}
          >
            <CardContent className="p-4">
              <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-2 overflow-hidden">
                {file.type === "image" ? (
                  <img src={file.url || "/placeholder.svg"} alt={file.name} className="w-full h-full object-cover" />
                ) : (
                  getFileIcon(file.type)
                )}
              </div>
              <div className="truncate font-medium">{file.name}</div>
              <div className="text-xs text-muted-foreground flex justify-between mt-1">
                <span>{formatFileSize(file.size)}</span>
                <span>{file.path}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <File className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No files found</h3>
          <p className="text-muted-foreground">Upload files or change your filter to see results.</p>
        </div>
      )}
    </div>
  )
}
