import { getHosts } from '@/lib/cosmic'
import { Host } from '@/types'
import Link from 'next/link'

export default async function HostsPage() {
  const hosts = await getHosts() as Host[]

  return (
    <div className="container-custom py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2">
          Meet Our Hosts
        </h1>
        <p className="text-gray-600 text-lg">
          Connect with experienced hosts who are passionate about hospitality
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
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  {host.metadata.profile_photo && (
                    <img
                      src={`${host.metadata.profile_photo.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
                      alt={host.metadata.name}
                      className="w-32 h-32 rounded-full object-cover mb-4"
                      width={128}
                      height={128}
                    />
                  )}
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {host.metadata.name}
                  </h2>
                  {host.metadata.member_since && (
                    <p className="text-sm text-gray-600 mb-3">
                      Hosting since {new Date(host.metadata.member_since).getFullYear()}
                    </p>
                  )}
                  {host.metadata.bio && (
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                      {host.metadata.bio}
                    </p>
                  )}
                  {host.metadata.response_rate !== undefined && (
                    <div className="mt-auto pt-4 border-t border-gray-200 w-full">
                      <div className="text-sm">
                        <span className="font-semibold text-gray-900">
                          {host.metadata.response_rate}%
                        </span>
                        <span className="text-gray-600"> response rate</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}