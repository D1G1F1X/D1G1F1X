import { PromptManager } from "@/components/admin/prompt-manager"
import { Separator } from "@/components/ui/separator"

export default function PromptsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Prompt Management</h2>
          <p className="text-muted-foreground">Manage and fine-tune AI prompts for various functionalities.</p>
        </div>
      </div>

      <Separator />

      <PromptManager />
    </div>
  )
}
