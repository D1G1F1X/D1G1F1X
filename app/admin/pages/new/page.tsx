import { PageEditor } from "@/components/admin/page-editor"

export default function AdminNewPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Create New Page</h1>
      <PageEditor />
    </div>
  )
}
