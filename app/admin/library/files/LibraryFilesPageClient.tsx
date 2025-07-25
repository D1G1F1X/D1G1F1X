"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Download, Trash2, FileText, Folder, BookOpen } from "lucide-react"

export default function LibraryFilesPageClient() {
  // This is a placeholder for file data. In a real app, you'd fetch this from a database or storage service.
  const files = [
    { id: "1", name: "Ancient_Texts_Collection.pdf", type: "pdf", size: "12.5 MB", uploaded: "2022-11-01" },
    { id: "2", name: "Historical_Readings.epub", type: "epub", size: "5.8 MB", uploaded: "2023-01-10" },
    { id: "3", name: "Rare_Manuscripts_Scans.zip", type: "zip", size: "25.0 MB", uploaded: "2023-03-05" },
    { id: "4", name: "Modern_Interpretations.txt", type: "txt", size: "0.5 MB", uploaded: "2023-04-15" },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "epub":
        return <BookOpen className="h-5 w-5 text-purple-500" />
      case "txt":
        return <FileText className="h-5 w-5 text-gray-500" />
      case "zip":
        return <Folder className="h-5 w-5 text-yellow-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const handleDownload = (id: string) => {
    console.log("Download file:", id)
    // Implement download logic
  }

  const handleDelete = (id: string) => {
    console.log("Delete file:", id)
    // Implement delete logic
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Library Files</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Upload New File
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Library Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search-files">Search Files</Label>
            <Input id="search-files" placeholder="Search by file name..." />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>{getFileIcon(file.type)}</TableCell>
                  <TableCell className="font-medium">{file.name}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>{file.uploaded}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleDownload(file.id)}>
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(file.id)}>
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
            <h2 className="text-xl font-semibold mb-4">Upload File to Library</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="library-file-input">Choose File</Label>
                <Input id="library-file-input" type="file" />
              </div>
              <Button className="w-full">Upload File</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
