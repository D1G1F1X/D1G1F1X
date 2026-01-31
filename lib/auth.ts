import crypto from 'crypto'
import { query } from './db'
import type { User, Session, AuthRequest, AuthResponse, UserRole } from './auth-types'

const SALT_ROUNDS = 10
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

// Hash password using built-in crypto
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex')
  return `${salt}:${hash}`
}

// Verify password
export function verifyPassword(password: string, hash: string): boolean {
  const [salt, stored_hash] = hash.split(':')
  const hash_buffer = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex')
  return hash_buffer === stored_hash
}

// Generate session token
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Register new user
export async function registerUser(
  email: string,
  name: string,
  password: string,
  role: UserRole = 'user'
): Promise<AuthResponse> {
  try {
    const password_hash = hashPassword(password)
    const result = await query(
      `INSERT INTO users (email, name, password_hash, role, is_active) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, email, name, role, is_active, created_at, updated_at`,
      [email, name, password_hash, role, true]
    )

    if (result.rows.length === 0) {
      return { success: false, message: 'Failed to create user' }
    }

    return {
      success: true,
      message: 'User registered successfully',
      user: result.rows[0],
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Registration failed',
    }
  }
}

// Login user
export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const userResult = await query(
      `SELECT id, email, name, password_hash, role, is_active, last_login, created_at, updated_at 
       FROM users WHERE email = $1 AND is_active = true`,
      [email]
    )

    if (userResult.rows.length === 0) {
      return { success: false, message: 'Invalid email or password' }
    }

    const user = userResult.rows[0]

    if (!verifyPassword(password, user.password_hash)) {
      return { success: false, message: 'Invalid email or password' }
    }

    // Create session
    const token = generateSessionToken()
    const expires_at = new Date(Date.now() + SESSION_DURATION)

    const sessionResult = await query(
      `INSERT INTO sessions (user_id, token, expires_at) 
       VALUES ($1, $2, $3) 
       RETURNING id, user_id, token, expires_at`,
      [user.id, token, expires_at]
    )

    // Update last login
    await query(`UPDATE users SET last_login = NOW() WHERE id = $1`, [user.id])

    const { password_hash, ...userWithoutPassword } = user

    return {
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      session: sessionResult.rows[0],
      token,
    }
  } catch (error: any) {
    return { success: false, message: error.message || 'Login failed' }
  }
}

// Verify session token
export async function verifySession(token: string): Promise<Session | null> {
  try {
    const result = await query(
      `SELECT s.id, s.user_id, s.token, s.expires_at, s.created_at, 
              u.id, u.email, u.name, u.role, u.is_active, u.last_login, u.created_at, u.updated_at
       FROM sessions s
       JOIN users u ON s.user_id = u.id
       WHERE s.token = $1 AND s.expires_at > NOW() AND u.is_active = true`,
      [token]
    )

    if (result.rows.length === 0) {
      return null
    }

    const row = result.rows[0]
    return {
      id: row.id,
      user_id: row.user_id,
      token: row.token,
      expires_at: row.expires_at,
      created_at: row.created_at,
      user: {
        id: row.id,
        email: row.email,
        name: row.name,
        role: row.role,
        is_active: row.is_active,
        last_login: row.last_login,
        created_at: row.created_at,
        updated_at: row.updated_at,
        password_hash: '',
      },
    }
  } catch (error) {
    return null
  }
}

// Logout user
export async function logoutUser(token: string): Promise<boolean> {
  try {
    await query(`DELETE FROM sessions WHERE token = $1`, [token])
    return true
  } catch {
    return false
  }
}

// Get user by ID
export async function getUserById(userId: string): Promise<User | null> {
  try {
    const result = await query(
      `SELECT id, email, name, role, is_active, last_login, created_at, updated_at 
       FROM users WHERE id = $1`,
      [userId]
    )

    return result.rows.length > 0 ? result.rows[0] : null
  } catch {
    return null
  }
}

// Update user role
export async function updateUserRole(
  userId: string,
  newRole: UserRole
): Promise<boolean> {
  try {
    const result = await query(
      `UPDATE users SET role = $1, updated_at = NOW() WHERE id = $2 RETURNING id`,
      [newRole, userId]
    )
    return result.rows.length > 0
  } catch {
    return false
  }
}

// Deactivate user
export async function deactivateUser(userId: string): Promise<boolean> {
  try {
    const result = await query(
      `UPDATE users SET is_active = false, updated_at = NOW() WHERE id = $1 RETURNING id`,
      [userId]
    )
    return result.rows.length > 0
  } catch {
    return false
  }
}

// Log activity
export async function logActivity(
  userId: string,
  action: string,
  resource: string,
  details?: Record<string, any>
): Promise<void> {
  try {
    await query(
      `INSERT INTO activity_logs (user_id, action, resource, details) 
       VALUES ($1, $2, $3, $4)`,
      [userId, action, resource, JSON.stringify(details || {})]
    )
  } catch (error) {
    console.error('[v0] Failed to log activity:', error)
  }
}
