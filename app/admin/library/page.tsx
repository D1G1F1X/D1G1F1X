import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Edit, Trash2, FileText, Folder } from "lucide-react"
import Link from "next/link"

export default function AdminLibraryPage() {
  const documents = [
    { id: "1", title: "The History of Numerology", author: "Jane Doe", type: "Document" },
    { id: "2", title: "Understanding Oracle Spreads", author: "John Smith", type: "Document" },
    { id: "3", title: "Elemental Influences", author: "Alice Brown", type: "Document" },
  ]

  const folders = [
    { id: "f1", name: "Advanced Readings", type: "Folder" },
    { id: "f2", name: "Symbolism Guides", type: "Folder" },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Library Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Library Resource</CardTitle>
          <CardDescription>Upload a new document or create a new folder for the library.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="resource-type">Resource Type</Label>
              <select
                id="resource-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option>Document</option>
                <option>Folder</option>
              </select>
            </div>
            <div>
              <Label htmlFor="resource-name">Name/Title</Label>
              <Input id="resource-name" placeholder="e.g., New Document Title" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="upload-file">Upload File (for documents)</Label>
              <Input id="upload-file" type="file" />
            </div>
            <div className="md:col-span-2">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Resource
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Library Resources</CardTitle>
          <CardDescription>Manage your documents and folders.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Type</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Name/Title</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Author</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {folders.map((resource) => (
                  <tr key={resource.id}>
                    <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-200">
                      <Folder className="mr-2 inline-block h-4 w-4" /> {resource.type}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">{resource.name}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">-</td>
                    <td className="flex justify-end space-x-2 whitespace-nowrap px-4 py-2 text-sm">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/library/files?folder=${resource.name}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">View Contents</span>
                        </Link>
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </td>
                  </tr>
                ))}
                {documents.map((resource) => (
                  <tr key={resource.id}>
                    <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-200">
                      <FileText className="mr-2 inline-block h-4 w-4" /> {resource.type}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">{resource.title}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">{resource.author}</td>
                    <td className="flex justify-end space-x-2 whitespace-nowrap px-4 py-2 text-sm">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
