import type { Metadata } from "next"
import { Suspense } from "react"
import { FileManagerWrapper } from "@/components/admin/file-manager-wrapper"

export const metadata: Metadata = {
  title: "NUMO ORACLE | Library Files",
  description: "Manage files for the public library",
}

export default function LibraryFilesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Library Files</h1>
          <p className="text-gray-400">Manage files available in the public library</p>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading file manager...</span>
          </div>
        }
      >
        <FileManagerWrapper />
      </Suspense>
    </div>
  )
}
