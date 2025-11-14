// app/listings/[slug]/page.tsx
import { getListing, getListingReviews } from '@/lib/cosmic'
import { Listing, Review } from '@/types'
import { notFound } from 'next/navigation'
import PropertyGallery from '@/components/PropertyGallery'
import PropertyInfo from '@/components/PropertyInfo'
import ReviewsList from '@/components/ReviewsList'
import HostCard from '@/components/HostCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = await params
  const listing = await getListing(slug) as Listing | null

  if (!listing) {
    notFound()
  }

  const reviews = await getListingReviews(listing.id) as Review[]

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">
        {listing.metadata.title}
      </h1>

      <PropertyGallery photos={listing.metadata.photos || []} title={listing.metadata.title} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <PropertyInfo listing={listing} />
          
          {reviews.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Guest Reviews ({reviews.length})
              </h2>
              <ReviewsList reviews={reviews} />
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
              <div className="mb-4">
                <span className="text-2xl font-semibold text-gray-900">
                  ${listing.metadata.price_per_night}
                </span>
                <span className="text-gray-600"> / night</span>
              </div>
              <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Check Availability
              </button>
            </div>

            {listing.metadata.host && (
              <HostCard host={listing.metadata.host} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}