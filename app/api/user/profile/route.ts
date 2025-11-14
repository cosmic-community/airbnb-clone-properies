import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getUserById, updateUserProfile } from '@/lib/cosmic'

export async function GET() {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const user = await getUserById(session.userId)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      {
        id: user.id,
        name: user.metadata.name,
        email: user.metadata.email,
        bio: user.metadata.bio || '',
        phone: user.metadata.phone || '',
        profile_photo: user.metadata.profile_photo,
        created_at: user.metadata.created_at
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { name, bio, phone } = body
    
    const updatedUser = await updateUserProfile(session.userId, {
      name,
      bio,
      phone
    })
    
    return NextResponse.json(
      {
        success: true,
        user: {
          id: updatedUser.id,
          name: updatedUser.metadata.name,
          email: updatedUser.metadata.email,
          bio: updatedUser.metadata.bio || '',
          phone: updatedUser.metadata.phone || ''
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}