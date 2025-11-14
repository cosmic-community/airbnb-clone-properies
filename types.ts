// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Property type literal
export type PropertyType = 'entire_place' | 'private_room' | 'shared_room';

// Host interface
export interface Host extends CosmicObject {
  type: 'hosts';
  metadata: {
    name: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    member_since?: string;
    response_rate?: number;
  };
}

// Listing interface
export interface Listing extends CosmicObject {
  type: 'listings';
  metadata: {
    title: string;
    description: string;
    price_per_night: number;
    location: string;
    property_type: {
      key: string;
      value: string;
    };
    guests: number;
    bedrooms: number;
    bathrooms: number;
    amenities?: string[];
    photos?: Array<{
      url: string;
      imgix_url: string;
    }>;
    host?: Host;
    available?: boolean;
  };
}

// Review interface
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    listing?: Listing;
    guest_name: string;
    rating: number;
    comment: string;
    review_date?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}