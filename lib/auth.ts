"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { kv } from "@vercel/kv"

// Mock database for users - Enhanced with better validation
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@numoracle.com",
    username: "admin",
    password: "numoracle", // In production, this should be hashed
    role: "admin",
  },
]

// Enhanced session management with better error handling
async function createSession(userId: string): Promise<string> {
  try {
    const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

    await kv.set(
      `session:${sessionId}`,
      {
        userId,
        expiresAt,
        createdAt: Date.now(),
      },
      { ex: 86400 }, // expire in 24 hours
    )

    console.log("Session created successfully:", sessionId)
    return sessionId
  } catch (error) {
    console.error("Error creating session:", error)
    throw new Error("Failed to create session")
  }
}

async function getSession(sessionId: string): Promise<{ userId: string; expiresAt: number } | null> {
  if (!sessionId) return null

  try {
    const session = await kv.get(`session:${sessionId}`)
    console.log("Retrieved session:", sessionId, session ? "found" : "not found")
    return session as { userId: string; expiresAt: number } | null
  } catch (error) {
    console.error("Error retrieving session:", error)
    return null
  }
}

async function deleteSession(sessionId: string): Promise<void> {
  if (sessionId) {
    try {
      await kv.del(`session:${sessionId}`)
      console.log("Session deleted:", sessionId)
    } catch (error) {
      console.error("Error deleting session:", error)
    }
  }
}

export async function login(prevState: any, formData: FormData) {
  console.log("=== LOGIN ATTEMPT ===")
  const identifier = formData.get("identifier") as string
  const password = formData.get("password") as string

  console.log("Login attempt with identifier:", identifier)
  console.log(
    "Available users:",
    users.map((u) => ({ username: u.username, email: u.email })),
  )

  if (!identifier || !password) {
    console.log("Missing credentials")
    return {
      errors: {
        identifier: !identifier ? "Username or email is required" : null,
        password: !password ? "Password is required" : null,
      },
      message: "Please fill in all fields",
      success: false,
    }
  }

  // Find user by email or username with case-insensitive matching
  const user = users.find((u) => {
    const emailMatch = u.email.toLowerCase() === identifier.toLowerCase()
    const usernameMatch = u.username.toLowerCase() === identifier.toLowerCase()
    const passwordMatch = u.password === password

    console.log(`Checking user ${u.username}:`, {
      emailMatch,
      usernameMatch,
      passwordMatch,
      providedPassword: password,
      expectedPassword: u.password,
    })

    return (emailMatch || usernameMatch) && passwordMatch
  })

  if (!user) {
    console.log("Authentication failed - user not found or password mismatch")
    return {
      errors: null,
      message: "Invalid credentials. Please check your username/email and password.",
      success: false,
    }
  }

  console.log("User authenticated successfully:", user.username)

  try {
    // Create session
    const sessionId = await createSession(user.id)

    // Set cookie with enhanced security
    cookies().set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
      sameSite: "lax",
    })

    console.log("Login successful, session created")
    return {
      errors: null,
      message: null,
      success: true,
    }
  } catch (error) {
    console.error("Error during login process:", error)
    return {
      errors: null,
      message: "Login failed due to server error. Please try again.",
      success: false,
    }
  }
}

export async function logout() {
  const sessionId = cookies().get("session_id")?.value

  if (sessionId) {
    await deleteSession(sessionId)
  }

  cookies().delete("session_id")
  console.log("User logged out successfully")
}

export async function getCurrentUser() {
  const sessionId = cookies().get("session_id")?.value

  if (!sessionId) {
    console.log("No session ID found")
    return null
  }

  const session = await getSession(sessionId)

  if (!session) {
    console.log("No valid session found")
    return null
  }

  // Check if session is expired
  if (session.expiresAt < Date.now()) {
    console.log("Session expired")
    await deleteSession(sessionId)
    cookies().delete("session_id")
    return null
  }

  const user = users.find((u) => u.id === session.userId)

  if (!user) {
    console.log("User not found for session")
    return null
  }

  // Don't return password
  const { password, ...userWithoutPassword } = user
  console.log("Current user retrieved:", userWithoutPassword.username)
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
