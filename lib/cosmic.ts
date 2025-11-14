import { createBucketClient } from '@cosmicjs/sdk'
import { User } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all listings
export async function getListings() {
  try {
    const response = await cosmic.objects
      .find({ type: 'listings' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch listings');
  }
}

// Fetch a single listing
export async function getListing(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'listings', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch listing');
  }
}

// Fetch reviews for a listing
export async function getListingReviews(listingId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'reviews',
        'metadata.listing': listingId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews');
  }
}

// Fetch all hosts
export async function getHosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'hosts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch hosts');
  }
}

// Fetch a single host
export async function getHost(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'hosts', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch host');
  }
}

// Fetch listings by host
export async function getHostListings(hostId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'listings',
        'metadata.host': hostId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch host listings');
  }
}

// User authentication functions

// Find user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'users',
        'metadata.email': email
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0);
    
    if (response.objects && response.objects.length > 0) {
      return response.objects[0] as User;
    }
    return null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch user');
  }
}

// Find user by ID
export async function getUserById(userId: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'users',
        id: userId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0);
    
    return response.object as User;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch user');
  }
}

// Create a new user
export async function createUser(data: {
  name: string;
  email: string;
  password_hash: string;
}): Promise<User> {
  try {
    // Changed: Using metadata object instead of metafields array for Cosmic API v1.5+
    const response = await cosmic.objects.insertOne({
      title: data.name,
      type: 'users',
      metadata: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
        created_at: new Date().toISOString()
      }
    });
    
    return response.object as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

// Update user profile
export async function updateUserProfile(
  userId: string,
  data: {
    name?: string;
    bio?: string;
    phone?: string;
  }
): Promise<User> {
  try {
    const response = await cosmic.objects.updateOne(userId, {
      title: data.name,
      metadata: data
    });
    
    return response.object as User;
  } catch (error) {
    throw new Error('Failed to update user profile');
  }
}