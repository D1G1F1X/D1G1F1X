"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FolderPlus, FileText, File, Trash2, ImageIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock file data
const initialFiles = [
  {
    id: "1",
    name: "numoracle-logo.png",
    type: "image",
    size: "45 KB",
    path: "/images",
    url: "/numoracle-icon-logo.png",
  },
  {
    id: "2",
    name: "numerology-symbols.png",
    type: "image",
    size: "120 KB",
    path: "/images",
    url: "/numerology-symbols.png",
  },
  {
    id: "3",
    name: "mystical-oracle-spread.png",
    type: "image",
    size: "230 KB",
    path: "/images",
    url: "/mystical-oracle-spread.png",
  },
  { id: "4", name: "privacy-policy.pdf", type: "document", size: "78 KB", path: "/documents", url: "#" },
  { id: "5", name: "terms-of-service.pdf", type: "document", size: "92 KB", path: "/documents", url: "#" },
]

export function FileManager() {
  const [files, setFiles] = useState(initialFiles)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [newFolderName, setNewFolderName] = useState("")
  const [showNewFolderInput, setShowNewFolderInput] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredFiles =
    activeTab === "all"
      ? files
      : activeTab === "images"
        ? files.filter((file) => file.type === "image")
        : files.filter((file) => file.type === "document")

  const handleFileSelect = (id: string) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter((fileId) => fileId !== id))
    } else {
      setSelectedFiles([...selectedFiles, id])
    }
  }

  const handleDeleteSelected = () => {
    if (selectedFiles.length === 0) return

    setFiles(files.filter((file) => !selectedFiles.includes(file.id)))
    setSelectedFiles([])

    toast({
      title: "Files deleted",
      description: `${selectedFiles.length} file(s) have been deleted.`,
    })
  }

  const handleCreateFolder = () => {
    if (!newFolderName) return

    toast({
      title: "Folder created",
      description: `Folder "${newFolderName}" has been created.`,
    })

    setNewFolderName("")
    setShowNewFolderInput(false)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const uploadedFiles = []

      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i]

        // Update progress
        setUploadProgress(Math.round((i / e.target.files.length) * 100))

        // For demo purposes, we'll simulate the upload
        // In a real app, you would use uploadToBlob here
        await new Promise((resolve) => setTimeout(resolve, 500))

        const fileType = file.type.startsWith("image/") ? "image" : "document"
        const fileSize = `${Math.round(file.size / 1024)} KB`

        uploadedFiles.push({
          id: `new-${Date.now()}-${i}`,
          name: file.name,
          type: fileType,
          size: fileSize,
          path: "/uploads",
          url: URL.createObjectURL(file),
        })
      }

      setFiles([...files, ...uploadedFiles])

      toast({
        title: "Files uploaded",
        description: `${uploadedFiles.length} file(s) have been uploaded.`,
      })
    } catch (error) {
      console.error("Error uploading files:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      setShowUploadDialog(false)

      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "image":
        return <ImageIcon className="h-16 w-16 text-muted-foreground" />
      case "document":
        return <FileText className="h-16 w-16 text-muted-foreground" />
      default:
        return <File className="h-16 w-16 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex gap-2">
          {showNewFolderInput ? (
            <div className="flex gap-2">
              <Input
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Folder name"
                className="w-40"
              />
              <Button size="sm" onClick={handleCreateFolder}>
                Create
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowNewFolderInput(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setShowNewFolderInput(true)}>
              <FolderPlus className="mr-2 h-4 w-4" />
              New Folder
            </Button>
          )}

          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Files</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Select files to upload</Label>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    id="file-upload"
                    multiple
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="text-sm">Uploading... {uploadProgress}%</div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

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
            onClick={() => handleFileSelect(file.id)}
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
                <span>{file.size}</span>
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
