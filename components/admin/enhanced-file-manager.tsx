"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import {
  File,
  FileText,
  Folder,
  FolderPlus,
  MoreVertical,
  Search,
  Trash2,
  Upload,
  FileJson,
  FileIcon as FilePdf,
  ArrowLeft,
  Download,
  Edit,
  Tag,
  Eye,
  EyeOff,
} from "lucide-react"

// Types
interface FileMetadata {
  id: string
  name: string
  type: string
  size: number
  path: string
  url: string
  pathname?: string
  tags: string[]
  category: string
  createdAt: string
  updatedAt: string
  isPublic: boolean
}

interface FolderMetadata {
  id: string
  name: string
  path: string
  createdAt: string
  updatedAt: string
}

interface EnhancedFileManagerProps {
  initialPath?: string
  initialCategory?: string
}

export function EnhancedFileManager({ initialPath = "/", initialCategory = "all" }: EnhancedFileManagerProps) {
  // State
  const [files, setFiles] = useState<FileMetadata[]>([])
  const [folders, setFolders] = useState<FolderMetadata[]>([])
  const [currentPath, setCurrentPath] = useState(initialPath)
  const [selectedTab, setSelectedTab] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [showFileDetailsDialog, setShowFileDetailsDialog] = useState(false)
  const [currentFile, setCurrentFile] = useState<FileMetadata | null>(null)
  const [editTags, setEditTags] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [uploadCategory, setUploadCategory] = useState("knowledge-base")

  const router = useRouter()

  // Initialize from props
  useEffect(() => {
    setCurrentPath(initialPath)
    setSelectedTab(initialCategory)
  }, [initialPath, initialCategory])

  // Fetch files and folders
  const fetchFilesAndFolders = useCallback(async () => {
    setIsLoading(true)
    try {
      // Fetch folders
      const foldersResponse = await fetch(`/api/folders?path=${encodeURIComponent(currentPath)}`)
      const foldersData = await foldersResponse.json()

      // Fetch files
      let filesUrl = `/api/files?path=${encodeURIComponent(currentPath)}`
      if (selectedTab !== "all" && selectedTab !== "recent") {
        filesUrl = `/api/files?category=${selectedTab}`
      }
      if (searchQuery) {
        filesUrl = `/api/files?query=${encodeURIComponent(searchQuery)}`
      }

      const filesResponse = await fetch(filesUrl)
      const filesData = await filesResponse.json()

      setFolders(foldersData.folders || [])
      setFiles(filesData.files || [])
    } catch (error) {
      console.error("Error fetching files and folders:", error)
      toast({
        title: "Error",
        description: "Failed to load files and folders",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [currentPath, selectedTab, searchQuery])

  useEffect(() => {
    fetchFilesAndFolders()
  }, [fetchFilesAndFolders])

  // Navigate to folder
  const navigateToFolder = (folderPath: string) => {
    setCurrentPath(folderPath)
    router.push(`?path=${encodeURIComponent(folderPath)}`)
  }

  // Navigate up one level
  const navigateUp = () => {
    if (currentPath === "/") return

    const pathParts = currentPath.split("/").filter(Boolean)
    pathParts.pop()
    const newPath = pathParts.length ? `/${pathParts.join("/")}/` : "/"

    setCurrentPath(newPath)
    router.push(`?path=${encodeURIComponent(newPath)}`)
  }

  // Handle file selection
  const toggleFileSelection = (id: string) => {
    setSelectedFiles((prev) => (prev.includes(id) ? prev.filter((fileId) => fileId !== id) : [...prev, id]))
  }

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setIsUploading(true)

    try {
      const uploadPromises = Array.from(e.target.files).map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("category", uploadCategory)
        formData.append("path", currentPath)
        formData.append("tags", "")
        formData.append("isPublic", "false")

        const response = await fetch("/api/files/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        return response.json()
      })

      await Promise.all(uploadPromises)

      toast({
        title: "Files uploaded",
        description: `${e.target.files.length} file(s) uploaded successfully`,
      })

      fetchFilesAndFolders()
    } catch (error) {
      console.error("Error uploading files:", error)
      toast({
        title: "Upload failed",
        description: "Failed to upload one or more files",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      e.target.value = ""
    }
  }

  // Create new folder
  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return

    try {
      const response = await fetch("/api/folders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newFolderName.trim(),
          path: currentPath,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create folder")
      }

      toast({
        title: "Folder created",
        description: `Folder "${newFolderName}" created successfully`,
      })

      setNewFolderName("")
      setShowNewFolderDialog(false)
      fetchFilesAndFolders()
    } catch (error) {
      console.error("Error creating folder:", error)
      toast({
        title: "Error",
        description: "Failed to create folder",
        variant: "destructive",
      })
    }
  }

  // Delete selected files
  const handleDeleteSelected = async () => {
    if (selectedFiles.length === 0) return

    try {
      const deletePromises = selectedFiles.map(async (fileId) => {
        const response = await fetch(`/api/files/${fileId}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error(`Failed to delete file ${fileId}`)
        }

        return response.json()
      })

      await Promise.all(deletePromises)

      toast({
        title: "Files deleted",
        description: `${selectedFiles.length} file(s) deleted successfully`,
      })

      setSelectedFiles([])
      fetchFilesAndFolders()
    } catch (error) {
      console.error("Error deleting files:", error)
      toast({
        title: "Error",
        description: "Failed to delete one or more files",
        variant: "destructive",
      })
    }
  }

  // Delete folder
  const handleDeleteFolder = async (folderId: string) => {
    try {
      const response = await fetch(`/api/folders/${folderId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete folder")
      }

      toast({
        title: "Folder deleted",
        description: "Folder and its contents deleted successfully",
      })

      fetchFilesAndFolders()
    } catch (error) {
      console.error("Error deleting folder:", error)
      toast({
        title: "Error",
        description: "Failed to delete folder",
        variant: "destructive",
      })
    }
  }

  // View file details
  const handleViewFileDetails = (file: FileMetadata) => {
    setCurrentFile(file)
    setEditTags(file.tags.join(", "))
    setIsPublic(file.isPublic)
    setShowFileDetailsDialog(true)
  }

  // Update file details
  const handleUpdateFileDetails = async () => {
    if (!currentFile) return

    try {
      const response = await fetch(`/api/files/${currentFile.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tags: editTags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          isPublic,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update file")
      }

      toast({
        title: "File updated",
        description: "File details updated successfully",
      })

      setShowFileDetailsDialog(false)
      fetchFilesAndFolders()
    } catch (error) {
      console.error("Error updating file:", error)
      toast({
        title: "Error",
        description: "Failed to update file details",
        variant: "destructive",
      })
    }
  }

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Check if file is an image
  const isImageFile = (type: string): boolean => {
    return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(type.toLowerCase())
  }

  // Get file icon or preview
  const getFilePreview = (file: FileMetadata) => {
    if (isImageFile(file.type)) {
      return (
        <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-2 overflow-hidden">
          <Image
            src={file.url || "/placeholder.svg"}
            alt={file.name}
            width={200}
            height={200}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to icon if image fails to load
              e.currentTarget.style.display = "none"
              const parent = e.currentTarget.parentElement
              if (parent) {
                const icon = document.createElement("div")
                icon.innerHTML =
                  '<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>'
                parent.appendChild(icon)
              }
            }}
          />
        </div>
      )
    }

    // Return appropriate icon based on file type
    switch (file.type.toLowerCase()) {
      case "pdf":
        return <FilePdf className="h-16 w-16 text-red-500" />
      case "json":
        return <FileJson className="h-16 w-16 text-green-500" />
      case "md":
      case "txt":
        return <FileText className="h-16 w-16 text-gray-500" />
      default:
        return <File className="h-16 w-16 text-gray-500" />
    }
  }

  // Filter files based on selected tab
  const filteredFiles = files.filter((file) => {
    if (selectedTab === "all") return true
    if (selectedTab === "images") return isImageFile(file.type)
    if (selectedTab === "documents") return ["pdf", "doc", "docx", "txt", "md"].includes(file.type.toLowerCase())
    if (selectedTab === "data") return ["json", "csv", "xml"].includes(file.type.toLowerCase())
    if (selectedTab === "knowledge-base") return file.category === "knowledge-base"
    if (selectedTab === "library") return file.category === "library"
    return true
  })

  return (
    <div className="space-y-6">
      {/* Navigation and actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={navigateUp} disabled={currentPath === "/"}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Up
          </Button>
          <div className="text-sm text-muted-foreground">Current path: {currentPath}</div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-[200px]"
            />
          </div>

          <Dialog open={showNewFolderDialog} onOpenChange={setShowNewFolderDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FolderPlus className="h-4 w-4 mr-2" />
                New Folder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
                <DialogDescription>Enter a name for the new folder at {currentPath}</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="folderName">Folder Name</Label>
                <Input
                  id="folderName"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="mt-2"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewFolderDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateFolder} disabled={!newFolderName.trim()}>
                  Create
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
              disabled={isUploading}
            />
            <Button variant="outline" size="sm" disabled={isUploading}>
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? "Uploading..." : "Upload Files"}
            </Button>
          </div>

          {selectedFiles.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedFiles.length})
            </Button>
          )}
        </div>
      </div>

      {/* File category tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="knowledge-base">Knowledge Base</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {/* Folders */}
              {folders.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Folders</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {folders.map((folder) => (
                      <Card key={folder.id} className="cursor-pointer hover:border-primary transition-colors">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1" onClick={() => navigateToFolder(folder.path)}>
                            <Folder className="h-10 w-10 text-yellow-500" />
                            <div>
                              <div className="font-medium truncate">{folder.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(folder.updatedAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => navigateToFolder(folder.path)}>Open</DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDeleteFolder(folder.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Files */}
              {filteredFiles.length > 0 ? (
                <div>
                  <h3 className="text-lg font-medium mb-3">Files</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredFiles.map((file) => (
                      <Card
                        key={file.id}
                        className={`cursor-pointer transition-colors ${
                          selectedFiles.includes(file.id) ? "border-primary" : "hover:border-muted-foreground"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1" onClick={() => toggleFileSelection(file.id)}>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={selectedFiles.includes(file.id)}
                                  onCheckedChange={() => toggleFileSelection(file.id)}
                                />
                                {file.isPublic ? (
                                  <Eye className="h-4 w-4 text-green-500" />
                                ) : (
                                  <EyeOff className="h-4 w-4 text-amber-500" />
                                )}
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewFileDetails(file)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <a href={file.url} download>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => {
                                    setSelectedFiles([file.id])
                                    handleDeleteSelected()
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div
                            className="flex flex-col items-center justify-center py-4"
                            onClick={() => toggleFileSelection(file.id)}
                          >
                            {getFilePreview(file)}
                            <div className="mt-2 font-medium text-center truncate w-full">{file.name}</div>
                          </div>

                          <div className="text-xs text-muted-foreground flex justify-between mt-2">
                            <span>{formatFileSize(file.size)}</span>
                            <span>{new Date(file.updatedAt).toLocaleDateString()}</span>
                          </div>

                          {file.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {file.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted"
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <File className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No files found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchQuery ? "Try a different search term" : "Upload files or navigate to a different folder"}
                  </p>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* File details dialog */}
      <Dialog open={showFileDetailsDialog} onOpenChange={setShowFileDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
            <DialogDescription>View and edit file details</DialogDescription>
          </DialogHeader>
          {currentFile && (
            <div className="py-4 space-y-4">
              <div className="flex items-center justify-center py-4">
                {isImageFile(currentFile.type) ? (
                  <div className="w-full max-h-48 overflow-hidden rounded-md">
                    <Image
                      src={currentFile.url || "/placeholder.svg"}
                      alt={currentFile.name}
                      width={300}
                      height={200}
                      className="object-contain w-full h-auto"
                    />
                  </div>
                ) : (
                  getFilePreview(currentFile)
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="text-sm font-medium">Name:</div>
                <div className="col-span-2 text-sm">{currentFile.name}</div>

                <div className="text-sm font-medium">Type:</div>
                <div className="col-span-2 text-sm">{currentFile.type.toUpperCase()}</div>

                <div className="text-sm font-medium">Size:</div>
                <div className="col-span-2 text-sm">{formatFileSize(currentFile.size)}</div>

                <div className="text-sm font-medium">Path:</div>
                <div className="col-span-2 text-sm">{currentFile.path}</div>

                <div className="text-sm font-medium">Category:</div>
                <div className="col-span-2 text-sm capitalize">{currentFile.category}</div>

                <div className="text-sm font-medium">Created:</div>
                <div className="col-span-2 text-sm">{new Date(currentFile.createdAt).toLocaleString()}</div>

                <div className="text-sm font-medium">Updated:</div>
                <div className="col-span-2 text-sm">{new Date(currentFile.updatedAt).toLocaleString()}</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                  placeholder="Enter tags..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
                <Label htmlFor="public">Make file public in library</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFileDetailsDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateFileDetails}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
