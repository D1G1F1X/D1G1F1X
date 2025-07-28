import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import Link from "next/link"

export default function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const userId = params.id
  // Mock data for a single user
  const user = {
    id: userId,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "user",
    createdAt: "2023-01-15",
    lastLogin: "2023-10-26",
    isActive: true,
    isPremium: false,
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Details: {user.name}</h1>
        <Link href="/admin/users" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Edit user profile and permissions.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="user-name">Name</Label>
            <Input id="user-name" defaultValue={user.name} />
          </div>
          <div>
            <Label htmlFor="user-email">Email</Label>
            <Input id="user-email" type="email" defaultValue={user.email} />
          </div>
          <div>
            <Label htmlFor="user-role">Role</Label>
            <select
              id="user-role"
              defaultValue={user.role}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option>user</option>
              <option>admin</option>
            </select>
          </div>
          <div>
            <Label htmlFor="created-at">Created At</Label>
            <Input id="created-at" defaultValue={user.createdAt} readOnly />
          </div>
          <div>
            <Label htmlFor="last-login">Last Login</Label>
            <Input id="last-login" defaultValue={user.lastLogin} readOnly />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="is-active" checked={user.isActive} />
            <Label htmlFor="is-active">Active User</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="is-premium" checked={user.isPremium} />
            <Label htmlFor="is-premium">Premium Member</Label>
          </div>
          <div className="md:col-span-2 flex gap-4">
            <Button className="flex-1">
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
            <Button variant="destructive" className="flex-1">
              <Trash2 className="mr-2 h-4 w-4" /> Delete User
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
