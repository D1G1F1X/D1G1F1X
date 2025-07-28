import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { FileManager } from "@/components/admin/file-manager"

export default function FilesPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">File Manager (Legacy)</h2>
          <p className="text-muted-foreground">Manage your site files (images, documents, etc.).</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Upload New File
        </Button>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>File List</CardTitle>
          <CardDescription>Browse and manage uploaded files.</CardDescription>
        </CardHeader>
        <CardContent>
          <FileManager />
        </CardContent>
      </Card>
    </div>
  )
}
