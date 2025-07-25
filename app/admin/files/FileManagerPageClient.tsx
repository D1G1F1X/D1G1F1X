"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Download, Trash2, FileText, ImageIcon } from "lucide-react"

export default function FileManagerPageClient() {
  // This is a placeholder for file data. In a real app, you'd fetch this from a database or storage service.
  const files = [
    { id: "1", name: "Guidebook_v1.pdf", type: "pdf", size: "2.5 MB", uploaded: "2023-01-15" },
    { id: "2", name: "Card_Meanings_Chart.xlsx", type: "xlsx", size: "0.8 MB", uploaded: "2023-02-20" },
    { id: "3", name: "Promo_Image_Spring.jpg", type: "jpg", size: "1.2 MB", uploaded: "2023-03-10" },
    { id: "4", name: "Welcome_Email_Template.html", type: "html", size: "0.1 MB", uploaded: "2023-04-01" },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "xlsx":
        return <Table className="h-5 w-5 text-green-500" />
      case "jpg":
      case "png":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "html":
        return <FileText className="h-5 w-5 text-orange-500" />
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
        <h1 className="text-3xl font-bold">File Manager</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Upload New File
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Files</CardTitle>
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
            <h2 className="text-xl font-semibold mb-4">Upload File</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="file-input">Choose File</Label>
                <Input id="file-input" type="file" />
              </div>
              <Button className="w-full">Upload File</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
