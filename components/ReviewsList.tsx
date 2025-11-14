import { Review } from '@/types'

interface ReviewsListProps {
  reviews: Review[]
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

export default function ReviewsList({ reviews }: ReviewsListProps) {
  if (!reviews || reviews.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">
                {review.metadata.guest_name}
              </h3>
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
          <p className="text-gray-700 leading-relaxed">
            {review.metadata.comment}
          </p>
        </div>
      ))}
    </div>
  )
}