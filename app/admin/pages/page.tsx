import { DataTable } from "./data-table"
import { columns } from "./columns"

async function getPages(): Promise<any[]> {
  // Replace with your actual API call to fetch pages
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/content?type=page`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch pages")
  }
  return res.json()
}

export default async function PagesPage() {
  const pages = await getPages()

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pages</h2>
          <p className="text-muted-foreground">Manage your website&apos;s static pages.</p>
        </div>
      </div>
      <DataTable data={pages} columns={columns} />
    </div>
  )
}
