// app/hosts/[slug]/page.tsx
import { getHost, getHostListings } from '@/lib/cosmic'
import { Host, Listing } from '@/types'
import { notFound } from 'next/navigation'
import PropertyCard from '@/components/PropertyCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function HostPage({ params }: PageProps) {
  const { slug } = await params
  const host = await getHost(slug) as Host | null

  if (!host) {
    notFound()
  }

  const listings = await getHostListings(host.id) as Listing[]

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-start gap-6">
            {host.metadata.profile_photo && (
              <img
                src={`${host.metadata.profile_photo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
                alt={host.metadata.name}
                className="w-32 h-32 rounded-full object-cover"
                width={128}
                height={128}
              />
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                {host.metadata.name}
              </h1>
              {host.metadata.member_since && (
                <p className="text-gray-600 mb-4">
                  Hosting since {new Date(host.metadata.member_since).getFullYear()}
                </p>
              )}
              {host.metadata.bio && (
                <p className="text-gray-700 leading-relaxed mb-4">
                  {host.metadata.bio}
                </p>
              )}
              {host.metadata.response_rate !== undefined && (
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-900">
                      {host.metadata.response_rate}%
                    </span>
                    <span className="text-gray-600"> response rate</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {host.metadata.name}'s Listings
          </h2>
          
          {listings.length === 0 ? (
            <p className="text-gray-600">No listings available from this host.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {listings.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}