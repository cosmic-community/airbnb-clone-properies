import { cookies } from 'next/headers'
import { getUserById } from './cosmic'
import { Session } from '@/types'

const SESSION_COOKIE_NAME = 'session'
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

// Simple password hashing (in production, use bcrypt or similar)
export async function hashPassword(password: string): Promise<string> {
  // This is a simple hash for demo purposes
  // In production, use bcrypt or argon2
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// Create session
export async function createSession(userId: string, email: string, name: string): Promise<void> {
  const session: Session = {
    userId,
    email,
    name
  }
  
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/'
  })
}

// Get current session
export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
    
    if (!sessionCookie || !sessionCookie.value) {
      return null
    }
    
    const session: Session = JSON.parse(sessionCookie.value)
    
    // Verify user still exists
    const user = await getUserById(session.userId)
    if (!user) {
      await destroySession()
      return null
    }
    
    return session
  } catch (error) {
    return null
  }
}

// Destroy session
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session !== null
}