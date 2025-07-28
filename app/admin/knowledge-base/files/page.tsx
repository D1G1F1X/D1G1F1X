import { Separator } from "@/components/ui/separator"
import { FileManagerWrapper } from "@/components/admin/file-manager-wrapper"

export default function KnowledgeBaseFilesPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Knowledge Base Files</h2>
          <p className="text-muted-foreground">Manage files and documents for the knowledge base.</p>
        </div>
      </div>
      <Separator />
      <FileManagerWrapper initialDirectory="/knowledge-base" />
    </div>
  )
}
