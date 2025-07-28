import type { Metadata } from "next"
import { EnhancedFileManager } from "@/components/admin/enhanced-file-manager"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Knowledge Base Files",
  description: "Manage files for the AI knowledge base",
}

export default function KnowledgeBaseFilesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Knowledge Base Files</h1>
          <p className="text-gray-400">Manage files used for AI training and knowledge base</p>
        </div>
      </div>

      <EnhancedFileManager />
    </div>
  )
}
