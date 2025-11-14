import { getHosts } from '@/lib/cosmic'
import { Host } from '@/types'
import Link from 'next/link'

export default async function HostsPage() {
  const hosts = await getHosts() as Host[]

  return (
    <div className="container-custom py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2">
          Our Hosts
        </h1>
        <p className="text-gray-600">
          Meet the wonderful people who make these stays possible
        </p>
      </div>

      {hosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No hosts available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hosts.map((host) => (
            <Link
              key={host.id}
              href={`/hosts/${host.slug}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                {host.metadata.profile_photo && (
                  <img
                    src={`${host.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                    alt={host.metadata.name}
                    className="w-20 h-20 rounded-full object-cover"
                    width={80}
                    height={80}
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {host.metadata.name}
                  </h2>
                  {host.metadata.member_since && (
                    <p className="text-sm text-gray-600">
                      Hosting since {new Date(host.metadata.member_since).getFullYear()}
                    </p>
                  )}
                </div>
              </div>
              {host.metadata.bio && (
                <p className="text-gray-700 line-clamp-3">
                  {host.metadata.bio}
                </p>
              )}
              {host.metadata.response_rate !== undefined && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm">
                    <span className="font-semibold text-gray-900">
                      {host.metadata.response_rate}%
                    </span>
                    <span className="text-gray-600"> response rate</span>
                  </span>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}