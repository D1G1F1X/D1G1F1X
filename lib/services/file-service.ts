"use server"

// This would normally interact with a database or file storage service
// For this demo, we'll use in-memory storage

interface FileMetadata {
  id: string
  name: string
  type: string
  size: number
  path: string
  url: string
  pathname?: string // Add pathname field for Blob storage
  tags: string[]
  category: string
  createdAt: string
  updatedAt: string
  isPublic: boolean
}

interface FolderMetadata {
  id: string
  name: string
  path: string
  createdAt: string
  updatedAt: string
}

// In-memory storage
let files: FileMetadata[] = [
  {
    id: "file-1",
    name: "numerology-basics.pdf",
    type: "pdf",
    size: 2500000,
    path: "/knowledge-base/numerology/",
    url: "/files/numerology-basics.pdf",
    tags: ["numerology", "basics", "guide"],
    category: "knowledge-base",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublic: false,
  },
  {
    id: "file-2",
    name: "card-meanings.pdf",
    type: "pdf",
    size: 3800000,
    path: "/knowledge-base/cards/",
    url: "/files/card-meanings.pdf",
    tags: ["cards", "meanings", "reference"],
    category: "knowledge-base",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublic: false,
  },
  {
    id: "file-3",
    name: "getting-started-guide.pdf",
    type: "pdf",
    size: 1500000,
    path: "/library/guides/",
    url: "/files/getting-started-guide.pdf",
    tags: ["guide", "beginners", "introduction"],
    category: "library",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublic: true,
  },
  {
    id: "file-4",
    name: "elemental-correspondences.jpg",
    type: "jpg",
    size: 850000,
    path: "/library/images/",
    url: "/files/elemental-correspondences.jpg",
    tags: ["elements", "correspondences", "chart"],
    category: "library",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublic: true,
  },
  {
    id: "file-5",
    name: "ai-training-data.json",
    type: "json",
    size: 1200000,
    path: "/knowledge-base/ai/",
    url: "/files/ai-training-data.json",
    tags: ["ai", "training", "data"],
    category: "knowledge-base",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublic: false,
  },
]

let folders: FolderMetadata[] = [
  {
    id: "folder-1",
    name: "numerology",
    path: "/knowledge-base/numerology/",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "folder-2",
    name: "cards",
    path: "/knowledge-base/cards/",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "folder-3",
    name: "guides",
    path: "/library/guides/",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "folder-4",
    name: "images",
    path: "/library/images/",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "folder-5",
    name: "ai",
    path: "/knowledge-base/ai/",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Helper function to generate a unique ID
function generateId(): string {
  return `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

// Get all files
export async function getAllFiles(): Promise<FileMetadata[]> {
  return files
}

// Get files by category
export async function getFilesByCategory(category: string): Promise<FileMetadata[]> {
  return files.filter((file) => file.category === category)
}

// Get files by path
export async function getFilesByPath(path: string): Promise<FileMetadata[]> {
  return files.filter((file) => file.path === path)
}

// Get file by ID
export async function getFileById(id: string): Promise<FileMetadata | null> {
  const file = files.find((file) => file.id === id)
  return file || null
}

// Create a new file
export async function createFile(
  fileData: Omit<FileMetadata, "id" | "createdAt" | "updatedAt">,
): Promise<FileMetadata> {
  const now = new Date().toISOString()
  const newFile: FileMetadata = {
    id: generateId(),
    ...fileData,
    createdAt: now,
    updatedAt: now,
  }

  files.push(newFile)
  return newFile
}

// Update a file
export async function updateFile(
  id: string,
  fileData: Partial<Omit<FileMetadata, "id" | "createdAt" | "updatedAt">>,
): Promise<FileMetadata | null> {
  const fileIndex = files.findIndex((file) => file.id === id)

  if (fileIndex === -1) {
    return null
  }

  files[fileIndex] = {
    ...files[fileIndex],
    ...fileData,
    updatedAt: new Date().toISOString(),
  }

  return files[fileIndex]
}

// Delete a file
export async function deleteFile(id: string): Promise<boolean> {
  const initialLength = files.length
  files = files.filter((file) => file.id !== id)
  return files.length !== initialLength
}

// Get all folders
export async function getAllFolders(): Promise<FolderMetadata[]> {
  return folders
}

// Get folders by path
export async function getFoldersByPath(path: string): Promise<FolderMetadata[]> {
  // Get direct subfolders
  return folders.filter((folder) => {
    const folderPathParts = folder.path.split("/").filter(Boolean)
    const queryPathParts = path.split("/").filter(Boolean)

    // Check if this folder is a direct child of the query path
    if (folderPathParts.length !== queryPathParts.length + 1) {
      return false
    }

    // Check if all parent path parts match
    for (let i = 0; i < queryPathParts.length; i++) {
      if (folderPathParts[i] !== queryPathParts[i]) {
        return false
      }
    }

    return true
  })
}

// Create a new folder
export async function createFolder(name: string, path: string): Promise<FolderMetadata> {
  const now = new Date().toISOString()
  let newPath = path

  // Ensure path ends with a slash
  if (!newPath.endsWith("/")) {
    newPath += "/"
  }

  // Append folder name to path
  newPath += `${name}/`

  const newFolder: FolderMetadata = {
    id: generateId(),
    name,
    path: newPath,
    createdAt: now,
    updatedAt: now,
  }

  folders.push(newFolder)
  return newFolder
}

// Delete a folder
export async function deleteFolder(id: string): Promise<boolean> {
  const folderIndex = folders.findIndex((folder) => folder.id === id)

  if (folderIndex === -1) {
    return false
  }

  const folderPath = folders[folderIndex].path

  // Delete the folder
  folders = folders.filter((folder) => folder.id !== id)

  // Delete all files in the folder
  files = files.filter((file) => !file.path.startsWith(folderPath))

  // Delete all subfolders
  folders = folders.filter((folder) => !folder.path.startsWith(folderPath) || folder.path === folderPath)

  return true
}

// Search files by name or tags
export async function searchFiles(query: string): Promise<FileMetadata[]> {
  const lowerQuery = query.toLowerCase()
  return files.filter(
    (file) =>
      file.name.toLowerCase().includes(lowerQuery) || file.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  )
}

// Get file statistics
export async function getFileStatistics(): Promise<{
  totalFiles: number
  totalSize: number
  filesByCategory: Record<string, number>
  filesByType: Record<string, number>
}> {
  const totalFiles = files.length
  const totalSize = files.reduce((sum, file) => sum + file.size, 0)

  const filesByCategory: Record<string, number> = {}
  const filesByType: Record<string, number> = {}

  files.forEach((file) => {
    // Count by category
    if (filesByCategory[file.category]) {
      filesByCategory[file.category]++
    } else {
      filesByCategory[file.category] = 1
    }

    // Count by type
    if (filesByType[file.type]) {
      filesByType[file.type]++
    } else {
      filesByType[file.type] = 1
    }
  })

  return {
    totalFiles,
    totalSize,
    filesByCategory,
    filesByType,
  }
}
