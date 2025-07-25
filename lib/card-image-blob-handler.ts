import { del, list, put } from "@vercel/blob"
import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7) // 7-character random string

export async function uploadCardImage(file: File): Promise<{ url: string; pathname: string }> {
  const filename = `${nanoid()}-${file.name}`
  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: false, // We add our own nanoid prefix
  })
  return { url: blob.url, pathname: blob.pathname }
}

export async function deleteCardImage(pathname: string): Promise<void> {
  await del(pathname)
}

export async function listCardImages(): Promise<{ url: string; pathname: string }[]> {
  const { blobs } = await list()
  return blobs.map((blob) => ({ url: blob.url, pathname: blob.pathname }))
}

export async function getCardImage(pathname: string): Promise<{ url: string; pathname: string } | null> {
  const { blobs } = await list({ prefix: pathname })
  if (blobs.length > 0) {
    return { url: blobs[0].url, pathname: blobs[0].pathname }
  }
  return null
}
