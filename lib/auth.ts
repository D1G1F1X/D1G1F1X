"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { kv } from "@vercel/kv"

// Mock database for users
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@numoracle.com", // Added proper email format
    username: "admin", // Added username field
    password: "numoracle",
    role: "admin",
  },
]

// Mock sessions
// const sessions: Record<string, { userId: string; expiresAt: number }> = {}

// With Redis-based session handling:
async function createSession(userId: string): Promise<string> {
  const sessionId = Math.random().toString(36).substring(2, 15)
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

  await kv.set(
    `session:${sessionId}`,
    {
      userId,
      expiresAt,
    },
    { ex: 86400 },
  ) // expire in 24 hours

  return sessionId
}

async function getSession(sessionId: string): Promise<{ userId: string; expiresAt: number } | null> {
  if (!sessionId) return null
  return await kv.get(`session:${sessionId}`)
}

async function deleteSession(sessionId: string): Promise<void> {
  if (sessionId) {
    await kv.del(`session:${sessionId}`)
  }
}

export async function login(prevState: any, formData: FormData) {
  const identifier = formData.get("identifier") as string
  const password = formData.get("password") as string

  if (!identifier || !password) {
    return {
      errors: {
        identifier: !identifier ? "Username or email is required" : null,
        password: !password ? "Password is required" : null,
      },
      message: "Please fill in all fields",
      success: false,
    }
  }

  // Find user by email or username
  const user = users.find((u) => (u.email === identifier || u.username === identifier) && u.password === password)

  if (!user) {
    return {
      errors: null,
      message: "Invalid credentials",
      success: false,
    }
  }

  // Create session
  // const sessionId = Math.random().toString(36).substring(2, 15)
  // const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

  // sessions[sessionId] = {
  //   userId: user.id,
  //   expiresAt,
  // }

  const sessionId = await createSession(user.id)

  // Set cookie
  cookies().set("session_id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60, // 24 hours
    path: "/",
  })

  return {
    errors: null,
    message: null,
    success: true,
  }
}

export async function logout() {
  const sessionId = cookies().get("session_id")?.value

  // if (sessionId && sessions[sessionId]) {
  //   delete sessions[sessionId]
  // }
  await deleteSession(sessionId)

  cookies().delete("session_id")
}

export async function getCurrentUser() {
  const sessionId = cookies().get("session_id")?.value

  if (!sessionId) {
    return null
  }

  const session = await getSession(sessionId)

  if (!session) {
    return null
  }

  // Check if session is expired
  if (session.expiresAt < Date.now()) {
    await deleteSession(sessionId)
    cookies().delete("session_id")
    return null
  }

  const user = users.find((u) => u.id === session.userId)

  if (!user) {
    return null
  }

  // Don't return password
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function getUsers() {
  // Return users without passwords
  return users.map(({ password, ...user }) => user)
}

export async function createUser(userData: any) {
  const id = (users.length + 1).toString()
  const newUser = { id, ...userData }
  users.push(newUser)
  return { id, ...userData }
}

export async function updateUser(id: string, userData: any) {
  const userIndex = users.findIndex((u) => u.id === id)
  if (userIndex === -1) return null

  users[userIndex] = { ...users[userIndex], ...userData }
  return users[userIndex]
}

export async function deleteUser(id: string) {
  const userIndex = users.findIndex((u) => u.id === id)
  if (userIndex === -1) return false

  users.splice(userIndex, 1)
  return true
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/admin/login")
  }

  return user
}

export async function getToken() {
  // In a real application, this would fetch a token from a secure source
  // For this example, we'll just return a dummy token
  return "dummy-token"
}
