import { cosmic } from '@/lib/cosmic'
import { Review } from '@/types'
import Link from 'next/link'

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all reviews with listing context
async function getAllReviews() {
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
        <div className="space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {review.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    by {review.metadata.guest_name}
                    {review.metadata.review_date && (
                      <span className="ml-2">
                        • {new Date(review.metadata.review_date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    )}
                  </p>
                </div>
                <StarRating rating={review.metadata.rating} />
              </div>

              {/* Review Comment */}
              <p className="text-gray-700 leading-relaxed mb-4">
                {review.metadata.comment}
              </p>

              {/* Listing Context */}
              {review.metadata.listing && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link 
                    href={`/listings/${review.metadata.listing.slug}`}
                    className="flex items-center gap-4 hover:bg-gray-50 rounded-lg p-3 transition-colors"
                  >
                    {review.metadata.listing.thumbnail && (
                      <img
                        src={`${review.metadata.listing.thumbnail}?w=200&h=150&fit=crop&auto=format,compress`}
                        alt={review.metadata.listing.metadata.title}
                        className="w-24 h-18 object-cover rounded"
                        width="96"
                        height="72"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {review.metadata.listing.metadata.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {review.metadata.listing.metadata.location}
                      </p>
                      <p className="text-sm font-semibold text-primary mt-1">
                        ${review.metadata.listing.metadata.price_per_night} / night
                      </p>
                    </div>
                    <div className="text-primary">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}