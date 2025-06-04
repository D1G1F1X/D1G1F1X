import { DashboardShell } from "@/components/admin/dashboard-shell"
import { Button } from "@/components/ui/button"
import { PlusCircle, Star } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { getPages } from "@/lib/content"

export const dynamic = "force-dynamic"

export default async function PagesPage() {
  const pages = await getPages()

  return (
    <DashboardShell>
      <ProtectedRoute>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Pages</h1>
            <Link href="/admin/pages/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Page
              </Button>
            </Link>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages && pages.length > 0 ? (
                  pages.map((page) => (
                    <TableRow key={page.id} className={page.id === "landing" ? "bg-muted/50" : ""}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {page.id === "landing" && <Star className="h-4 w-4 text-yellow-500" />}
                          {page.title}
                          {page.id === "landing" && (
                            <Badge variant="outline" className="ml-2">
                              Landing Page
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{page.slug}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            page.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {page.isPublished ? "Published" : "Draft"}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(page.updatedAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/pages/${page.id}`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No pages found. Create your first page.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </ProtectedRoute>
    </DashboardShell>
  )
}
