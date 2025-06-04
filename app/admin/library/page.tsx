import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, FolderOpen, Plus, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Library Management",
  description: "Manage library resources and files",
}

export default function LibraryManagementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Library Management</h1>
          <p className="text-gray-400">Manage public library resources and files</p>
        </div>
        <Button asChild>
          <Link href="/admin/library/resources/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Resources
            </CardTitle>
            <CardDescription>Manage library resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">Total resources</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/admin/library/resources">View All Resources</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FolderOpen className="mr-2 h-5 w-5" />
              Files
            </CardTitle>
            <CardDescription>Manage library files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">48</div>
            <p className="text-sm text-muted-foreground">Total files</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/admin/library/files">Manage Files</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Access
            </CardTitle>
            <CardDescription>Manage resource access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">Member-only resources</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/admin/library/access">Manage Access</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Resources</h2>
          <div className="bg-card rounded-lg border shadow-sm">
            <div className="grid grid-cols-1 divide-y">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <div className="font-medium">Resource Title {i}</div>
                      <div className="text-sm text-muted-foreground">Added: {new Date().toLocaleDateString()}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/library/resources/${i}`}>Edit</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
