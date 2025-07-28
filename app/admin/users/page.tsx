import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, PlusCircle, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function AdminUsersPage() {
  const users = [
    { id: "user1", name: "Jane Doe", email: "jane.doe@example.com", role: "user", status: "Active" },
    { id: "user2", name: "Admin User", email: "admin@example.com", role: "admin", status: "Active" },
    { id: "user3", name: "Guest User", email: "guest@example.com", role: "user", status: "Inactive" },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">User Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
          <CardDescription>Find users by name, email, or role.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search users..." className="pl-9" />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New User</CardTitle>
          <CardDescription>Add a new user account to your system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/admin/users/new" passHref>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New User
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all registered users.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Role</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Status</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-200">{user.name}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">{user.email}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">{user.role}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          user.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="flex justify-end space-x-2 whitespace-nowrap px-4 py-2 text-sm">
                      <Link href={`/admin/users/${user.id}`} passHref>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
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
