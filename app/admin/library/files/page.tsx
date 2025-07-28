import type { Metadata } from "next"
import { FileManager } from "@/components/admin/file-manager"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Library Files",
  description: "Manage files for the public library",
}

export default function LibraryFilesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Library Files</h1>
      <FileManager basePath="/library" />
    </div>
  )
}
