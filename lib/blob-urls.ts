// This file contains URLs for assets stored in Vercel Blob
// Replace these URLs with the actual ones from your Blob storage

export const blobUrls = {
  // Background images
  "futuristic-ai-neural-network.png": "https://your-blob-url.com/futuristic-ai-neural-network.png",
  "abstract-tech-project.png": "https://your-blob-url.com/abstract-tech-project.png",

  // Logo images
  "logo-white.png": "https://your-blob-url.com/logo-white.png",
  "logo-bulb.png": "https://your-blob-url.com/logo-bulb.png",
  "logo-horizontal-white.png": "https://your-blob-url.com/logo-horizontal-white.png",

  // Project images
  "ai-content-generator.png": "https://your-blob-url.com/ai-content-generator.png",
  "virtual-event-platform.png": "https://your-blob-url.com/virtual-event-platform.png",
  // Add more as needed
}

// Helper function to get a Blob URL or fallback to public path
export function getBlobUrl(filename: string): string {
  // If the blob URL is available, use it
  if (blobUrls[filename] && blobUrls[filename] !== `https://your-blob-url.com/${filename}`) {
    return blobUrls[filename]
  }

  // Otherwise, fallback to the local public path
  return `/images/${filename}`
}
