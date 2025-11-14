import Link from 'next/link'
import { Host } from '@/types'

interface HostCardProps {
  host: Host
}

export default function HostCard({ host }: HostCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Hosted by {host.metadata.name}
      </h3>
      
      <Link 
        href={`/hosts/${host.slug}`}
        className="flex items-center gap-4 group"
      >
        {host.metadata.profile_photo && (
          <img
            src={`${host.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={host.metadata.name}
            className="w-16 h-16 rounded-full object-cover"
            width={64}
            height={64}
          />
        )}
        <div className="flex-1">
          <p className="font-medium text-gray-900 group-hover:text-primary transition-colors">
            {host.metadata.name}
          </p>
          {host.metadata.member_since && (
            <p className="text-sm text-gray-600">
              Joined {new Date(host.metadata.member_since).getFullYear()}
            </p>
          )}
        </div>
      </Link>

      {host.metadata.response_rate !== undefined && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm">
            <span className="font-semibold text-gray-900">
              {host.metadata.response_rate}%
            </span>
            <span className="text-gray-600"> response rate</span>
          </div>
        </div>
      )}

      <button className="w-full mt-4 bg-white hover:bg-gray-50 text-gray-900 font-medium py-2 px-4 rounded-lg border border-gray-300 transition-colors">
        Contact Host
      </button>
    </div>
  )
}