import { getSession } from '@/lib/auth-session'
import { redirect } from 'next/navigation'
import GuestManagementPanel from '@/components/admin/guest-management-panel'
import StaffAccessPanel from '@/components/admin/staff-access-panel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata = {
  title: 'Admin Dashboard | Lumen Helix',
  description: 'Manage guest access and staff permissions',
}

export default async function AdminDashboard() {
  const session = await getSession()

  if (!session || session.user.role !== 'admin') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-32 pb-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-gray-400 text-lg">
            Manage guest registrations, project access, and staff permissions
          </p>
        </div>

        <Tabs defaultValue="guests" className="space-y-6">
          <TabsList className="bg-gray-800 border border-gray-700">
            <TabsTrigger value="guests" className="data-[state=active]:bg-primary-600">
              Guest Management
            </TabsTrigger>
            <TabsTrigger value="staff" className="data-[state=active]:bg-primary-600">
              Staff Access
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guests">
            <GuestManagementPanel />
          </TabsContent>

          <TabsContent value="staff">
            <StaffAccessPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
