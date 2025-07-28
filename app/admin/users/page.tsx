import { DataTable } from "./data-table"
import { columns } from "./columns"

async function getUsers(): Promise<any[]> {
  // Replace with your actual API call to fetch users
  // This is mock data for demonstration purposes
  return [
    {
      id: "user001",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "customer",
      status: "active",
      lastLogin: "2024-07-25T10:30:00Z",
    },
    {
      id: "user002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "member",
      status: "active",
      lastLogin: "2024-07-24T14:15:00Z",
    },
    {
      id: "user003",
      name: "Alice Johnson",
      email: "alice.j@example.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-07-25T09:00:00Z",
    },
    {
      id: "user004",
      name: "Bob Brown",
      email: "bob.b@example.com",
      role: "customer",
      status: "inactive",
      lastLogin: "2024-06-10T18:00:00Z",
    },
    {
      id: "user005",
      name: "Charlie Davis",
      email: "charlie.d@example.com",
      role: "customer",
      status: "active",
      lastLogin: "2024-07-23T11:00:00Z",
    },
  ]
}

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Manage your site users and their roles.</p>
        </div>
      </div>
      <DataTable data={users} columns={columns} />
    </div>
  )
}
