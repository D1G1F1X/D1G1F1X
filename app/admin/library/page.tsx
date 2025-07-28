import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Files, Plus, Users } from "lucide-react"
import Link from "next/link"

export default function AdminLibraryPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Library Management</h2>
          <p className="text-muted-foreground">Manage digital resources, reading lists, and user access.</p>
        </div>
        <Link href="/admin/library/add-document">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Document
          </Button>
        </Link>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Documents
            </CardTitle>
            <CardDescription>Manage your collection of articles, guides, and other documents.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Total Documents: <strong>150</strong>
            </p>
            <p>
              Categories: <strong>12</strong>
            </p>
            <Link href="/admin/library/files">
              <Button variant="outline">Browse Documents</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" /> User Reading Lists
            </CardTitle>
            <CardDescription>View and manage personalized reading lists for users.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Active Lists: <strong>75</strong>
            </p>
            <p>
              Popular Articles: <strong>10</strong>
            </p>
            <Button variant="outline">Manage Reading Lists</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Files className="h-5 w-5" /> Files (Legacy)
            </CardTitle>
            <CardDescription>Access the legacy file management interface for older library assets.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This section provides access to files managed outside the primary document system. Consider migrating
              important assets.
            </p>
            <Link href="/admin/files">
              <Button variant="outline">Go to Legacy File Manager</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
