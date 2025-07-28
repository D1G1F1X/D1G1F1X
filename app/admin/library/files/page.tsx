import { Separator } from "@/components/ui/separator"
import { FileManagerWrapper } from "@/components/admin/file-manager-wrapper"

export default function LibraryFilesPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Library Files</h2>
          <p className="text-muted-foreground">Manage files and documents for the user library.</p>
        </div>
      </div>
      <Separator />
      <FileManagerWrapper initialDirectory="/library-documents" />
    </div>
  )
}
