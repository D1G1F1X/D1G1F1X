import { PromptManager } from "@/components/admin/prompt-manager"

export default function AdminPromptsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Prompt Management</h1>
      <PromptManager />
    </div>
  )
}
