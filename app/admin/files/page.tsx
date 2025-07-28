import { FileManagerWrapper } from "@/components/admin/file-manager-wrapper"

export default function AdminFilesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">File Management</h1>
      <FileManagerWrapper />
    </div>
  )
}
