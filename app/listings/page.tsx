import { getListings } from '@/lib/cosmic'
import { Listing } from '@/types'
import PropertyCard from '@/components/PropertyCard'

export default async function ListingsPage() {
  const listings = await getListings() as Listing[]

  return (
    <div className="container-custom py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          All Listings
        </h1>
        <p className="text-gray-600 text-lg">
          Browse our complete collection of unique stays around the world
        </p>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No listings available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}