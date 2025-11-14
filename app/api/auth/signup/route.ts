import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail, createUser } from '@/lib/cosmic'
import { hashPassword, createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }
    
    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }
    
    // Hash password
    const passwordHash = await hashPassword(password)
    
    // Create user
    const user = await createUser({
      name,
      email,
      password_hash: passwordHash
    })
    
    // Create session
    await createSession(user.id, user.metadata.email, user.metadata.name)
    
    return NextResponse.json(
      { 
        success: true,
        user: {
          id: user.id,
          name: user.metadata.name,
          email: user.metadata.email
        }
      },
      { status: 201 }
    )
  } catch (error) {
    // Changed: Added more detailed error logging
    console.error('Signup error details:', error)
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    )
  }
}