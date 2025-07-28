import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { UserIcon, Calendar, Mail, Edit } from "lucide-react"

interface UserDetailPageProps {
  params: {
    id: string
  }
}

// Mock data for a single user
const mockUser = {
  id: "user123",
  fullName: "John Doe",
  email: "john.doe@example.com",
  role: "customer", // or "admin", "member"
  registrationDate: new Date("2023-01-15T10:00:00Z"),
  lastLogin: new Date("2024-07-25T11:30:00Z"),
  isActive: true,
  preferences: {
    newsletter: true,
    darkMode: true,
  },
  readingCount: 42,
  reportsGenerated: 5,
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = params
  // In a real application, you would fetch user data based on the 'id'
  const user = mockUser // Using mock data for demonstration

  if (!user) {
    return <div className="p-8 text-center text-muted-foreground">User with ID &quot;{id}&quot; not found.</div>
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Profile: {user.fullName}</h1>
          <p className="text-muted-foreground">Manage user details, activity, and permissions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
          <Button variant="destructive">Delete User</Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" /> Basic Information
            </CardTitle>
            <CardDescription>Core details about the user.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="font-medium">Full Name:</div>
              <div>{user.fullName}</div>

              <div className="font-medium">Email:</div>
              <div>{user.email}</div>

              <div className="font-medium">Role:</div>
              <div>{user.role}</div>

              <div className="font-medium">Account Status:</div>
              <div>
                <span className={`font-semibold ${user.isActive ? "text-green-500" : "text-red-500"}`}>
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <Label htmlFor="adminNotes">Admin Notes</Label>
              <Textarea id="adminNotes" placeholder="Add internal notes about this user..." rows={3} />
              <Button size="sm" className="mt-2">
                Save Notes
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Activity
              </CardTitle>
              <CardDescription>Recent user activity and key dates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Registration Date: {user.registrationDate.toLocaleDateString()}</p>
              <p>Last Login: {user.lastLogin.toLocaleString()}</p>
              <p>Total Readings: {user.readingCount}</p>
              <p>Reports Generated: {user.reportsGenerated}</p>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                View All Activity
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" /> Preferences
              </CardTitle>
              <CardDescription>User-specific settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter" defaultChecked={user.preferences.newsletter} />
                <Label htmlFor="newsletter">Subscribed to Newsletter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="darkMode" defaultChecked={user.preferences.darkMode} />
                <Label htmlFor="darkMode">Dark Mode Enabled</Label>
              </div>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                Update Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

import { Textarea } from "@/components/ui/textarea"
