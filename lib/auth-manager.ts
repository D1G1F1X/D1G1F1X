import { cookies } from "next/headers"
import { kv } from "@vercel/kv"

export type UserRole = "admin" | "user" | "guest"

export interface User {
  id: string
  email: string
  role: UserRole
  name: string
}

// Mock user database
const users: User[] = [
  {
    id: "1",
    email: "admin@numoracle.com",
    role: "admin",
    name: "Admin User",
  },
  {
    id: "2",
    email: "user@numoracle.com",
    role: "user",
    name: "Regular User",
  },
]

export class AuthManager {
  private static instance: AuthManager

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager()
    }
    return AuthManager.instance
  }

  async createSession(userId: string): Promise<string> {
    const sessionId = Math.random().toString(36).substring(2, 15)
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

    await kv.set(`session:${sessionId}`, { userId, expiresAt }, { ex: 86400 })

    return sessionId
  }

  async getSession(sessionId: string): Promise<{ userId: string; expiresAt: number } | null> {
    if (!sessionId) return null
    return await kv.get(`session:${sessionId}`)
  }

  async deleteSession(sessionId: string): Promise<void> {
    if (sessionId) {
      await kv.del(`session:${sessionId}`)
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const sessionId = cookies().get("session_id")?.value
    if (!sessionId) return null

    const session = await this.getSession(sessionId)
    if (!session || session.expiresAt < Date.now()) {
      return null
    }

    return users.find((u) => u.id === session.userId) || null
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simple password check (in production, use proper hashing)
    const user = users.find((u) => u.email === email)
    if (!user || password !== "numoracle") {
      return { success: false, error: "Invalid credentials" }
    }

    const sessionId = await this.createSession(user.id)
    cookies().set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60,
      path: "/",
    })

    return { success: true, user }
  }

  async logout(): Promise<void> {
    const sessionId = cookies().get("session_id")?.value
    if (sessionId) {
      await this.deleteSession(sessionId)
      cookies().delete("session_id")
    }
  }

  hasPermission(user: User | null, requiredRole: UserRole): boolean {
    if (!user) return requiredRole === "guest"

    const roleHierarchy = { guest: 0, user: 1, admin: 2 }
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole]
  }
}

export const authManager = AuthManager.getInstance()
