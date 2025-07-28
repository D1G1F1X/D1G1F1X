import { PageEditor } from "@/components/admin/page-editor"

export default function AdminEditPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Edit Page</h1>
      <PageEditor pageId={params.id} />
    </div>
  )
}
