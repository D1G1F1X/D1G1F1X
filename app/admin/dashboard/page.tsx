import { EmailServiceMonitor } from "@/components/admin/email-service-monitor"

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example Dashboard Items - Replace with actual components */}
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Users</h2>
          <p>Manage user accounts and permissions.</p>
        </div>

        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Products</h2>
          <p>Add, edit, and manage products.</p>
        </div>

        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Orders</h2>
          <p>View and process customer orders.</p>
        </div>

        {/* System Monitoring Section */}
        <div className="bg-white shadow-md rounded-md p-4 col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-lg font-semibold mb-2">System Monitoring</h2>
          <EmailServiceMonitor />
        </div>
      </div>
    </div>
  )
}
