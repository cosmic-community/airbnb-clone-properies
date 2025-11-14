'use client'

import { useState } from 'react'

interface Photo {
  url: string
  imgix_url: string
}

interface PropertyGalleryProps {
  photos: Photo[]
  title: string
}

export default function PropertyGallery({ photos, title }: PropertyGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState(0)

  if (!photos || photos.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="aspect-[16/9] rounded-lg overflow-hidden">
        <img
          src={`${photos[selectedPhoto]?.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={`${title} - Photo ${selectedPhoto + 1}`}
          className="w-full h-full object-cover"
          width={800}
          height={450}
        />
      </div>

      {photos.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setSelectedPhoto(index)}
              className={`aspect-[4/3] rounded-lg overflow-hidden ${
                selectedPhoto === index ? 'ring-2 ring-primary' : ''
              }`}
            >
              <img
                src={`${photo.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                alt={`${title} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                width={200}
                height={150}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}