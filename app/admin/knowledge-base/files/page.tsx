import { FileManager } from "@/components/admin/file-manager"

export default function KnowledgeBaseFilesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Knowledge Base Files</h1>
      <FileManager basePath="/knowledge-base" />
    </div>
  )
}
