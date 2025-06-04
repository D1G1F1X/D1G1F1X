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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Manage Oracle Cards</h1>
      </div>
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Edit card details from <code>comprehensive-card-data.json</code> and their image paths from{" "}
          <code>card-image-paths.json</code>.
        </p>
        <Suspense fallback={<div>Loading Oracle Card Manager...</div>}>
          <OracleCardManager />
        </Suspense>
      </div>
    </DashboardShell>
  )
}
