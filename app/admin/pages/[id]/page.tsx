import { PageEditor } from "@/components/admin/page-editor"

interface PageEditPageProps {
  params: {
    id: string
  }
}

export default function PageEditPage({ params }: PageEditPageProps) {
  const { id } = params

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Page: {id}</h1>
      <PageEditor pageId={id} />
    </div>
  )
}
