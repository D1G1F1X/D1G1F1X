import type { Metadata } from "next"
import { KnowledgeBaseManager } from "@/components/admin/knowledge-base-manager"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Knowledge Base",
  description: "Internal knowledge base for AI reading features and content development",
}

export default function AdminKnowledgeBasePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Knowledge Base Management</h1>
      <KnowledgeBaseManager />
    </div>
  )
}
