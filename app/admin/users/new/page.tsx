import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle } from "lucide-react"

export default function AdminNewUserPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Create New User</h1>

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Enter the details for the new user account.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="user-name">Name</Label>
            <Input id="user-name" placeholder="e.g., John Doe" />
          </div>
          <div>
            <Label htmlFor="user-email">Email</Label>
            <Input id="user-email" type="email" placeholder="e.g., john.doe@example.com" />
          </div>
          <div>
            <Label htmlFor="user-password">Password</Label>
            <Input id="user-password" type="password" placeholder="Enter password" />
          </div>
          <div>
            <Label htmlFor="user-role">Role</Label>
            <select
              id="user-role"
              defaultValue="user"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option>user</option>
              <option>admin</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="is-active" defaultChecked />
            <Label htmlFor="is-active">Active User</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="is-premium" />
            <Label htmlFor="is-premium">Premium Member</Label>
          </div>
          <div className="md:col-span-2">
            <Button className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Create User
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
