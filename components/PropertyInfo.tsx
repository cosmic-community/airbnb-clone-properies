import { Listing } from '@/types'

interface PropertyInfoProps {
  listing: Listing
}

export default function PropertyInfo({ listing }: PropertyInfoProps) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <span>{listing.metadata.property_type.value}</span>
          <span>·</span>
          <span>{listing.metadata.guests} guests</span>
          <span>·</span>
          <span>{listing.metadata.bedrooms} bedrooms</span>
          <span>·</span>
          <span>{listing.metadata.bathrooms} bathrooms</span>
        </div>
        <p className="text-gray-600">{listing.metadata.location}</p>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          About this place
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {listing.metadata.description}
        </p>
      </div>

      {listing.metadata.amenities && listing.metadata.amenities.length > 0 && (
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What this place offers
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {listing.metadata.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-gray-600">✓</span>
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}