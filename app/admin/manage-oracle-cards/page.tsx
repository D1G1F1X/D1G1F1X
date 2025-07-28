import { Suspense } from "react"
import { OracleCardManager } from "@/components/admin/oracle-card-manager"
import { DashboardShell } from "@/components/admin/dashboard-shell" // Assuming you have this

export const metadata = {
  title: "Manage Oracle Cards",
  description: "Edit NUMO Oracle card data and image paths.",
}

export default async function ManageOracleCardsPage() {
  // Example server-side auth check, adapt to your auth system
  // const session = await isAuthenticated(); // Your auth check
  // if (!session?.user?.isAdmin) {
  //   redirect("/admin/login"); // Or your login page
  // }

  return (
    <DashboardShell>
      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-3xl font-bold">Manage Oracle Cards</h1>
        <Suspense fallback={<div>Loading Oracle Card Manager...</div>}>
          <OracleCardManager />
        </Suspense>
      </div>
    </DashboardShell>
  )
}
