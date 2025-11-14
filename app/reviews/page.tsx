import { cosmic } from '@/lib/cosmic'
import { Review } from '@/types'
import Link from 'next/link'

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all reviews
async function getAllReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Review[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews');
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default async function ReviewsPage() {
  const reviews = await getAllReviews()

  return (
    <div className="container-custom py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Guest Reviews
        </h1>
        <p className="text-gray-600">
          Read what our guests have to say about their stays
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No reviews available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
            >
              {/* Listing reference */}
              {review.metadata.listing && (
                <Link 
                  href={`/listings/${review.metadata.listing.slug}`}
                  className="block mb-4"
                >
                  <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3">
                    <img
                      src={`${review.metadata.listing.thumbnail}?w=800&h=600&fit=crop&auto=format,compress`}
                      alt={review.metadata.listing.metadata?.title || review.metadata.listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors">
                    {review.metadata.listing.metadata?.title || review.metadata.listing.title}
                  </h3>
                  {review.metadata.listing.metadata?.location && (
                    <p className="text-sm text-gray-600">
                      {review.metadata.listing.metadata.location}
                    </p>
                  )}
                </Link>
              )}

              {/* Review header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {review.metadata.guest_name}
                  </h4>
                  {review.metadata.review_date && (
                    <p className="text-sm text-gray-600">
                      {new Date(review.metadata.review_date).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  )}
                </div>
                <StarRating rating={review.metadata.rating} />
              </div>

              {/* Review comment */}
              <p className="text-gray-700 leading-relaxed line-clamp-4">
                {review.metadata.comment}
              </p>

              {/* Read more link */}
              {review.metadata.listing && (
                <Link 
                  href={`/listings/${review.metadata.listing.slug}`}
                  className="inline-block mt-4 text-primary hover:text-primary-dark font-medium text-sm"
                >
                  View Property →
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}