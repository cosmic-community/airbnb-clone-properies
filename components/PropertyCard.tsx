import Link from 'next/link'
import { Listing } from '@/types'

interface PropertyCardProps {
  listing: Listing
}

export default function PropertyCard({ listing }: PropertyCardProps) {
  const firstPhoto = listing.metadata.photos?.[0]

  return (
    <Link 
      href={`/listings/${listing.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {firstPhoto && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={`${firstPhoto.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={listing.metadata.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={300}
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
            {listing.metadata.title}
          </h3>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          {listing.metadata.location}
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
          <span>{listing.metadata.guests} guests</span>
          <span>·</span>
          <span>{listing.metadata.bedrooms} bedrooms</span>
          <span>·</span>
          <span>{listing.metadata.bathrooms} bathrooms</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-semibold text-gray-900">
            ${listing.metadata.price_per_night}
          </span>
          <span className="text-sm text-gray-600">/ night</span>
        </div>
      </div>
    </Link>
  )
}