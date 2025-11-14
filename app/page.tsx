import { getListings } from '@/lib/cosmic'
import { Listing } from '@/types'
import PropertyCard from '@/components/PropertyCard'
import Hero from '@/components/Hero'

export default async function HomePage() {
  const listings = await getListings() as Listing[]

  return (
    <div>
      <Hero />
      <div className="container-custom py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Explore Amazing Stays
          </h2>
          <p className="text-gray-600">
            Discover unique places to stay around the world
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
    </div>
  )
}