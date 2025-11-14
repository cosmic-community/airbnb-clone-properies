import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb Clone - Find Your Perfect Getaway',
  description: 'Browse beautiful vacation rentals and book your next adventure',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏠</text></svg>',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">About</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>How it works</li>
                  <li>Newsroom</li>
                  <li>Careers</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Blog</li>
                  <li>Forum</li>
                  <li>Events</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Host</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Become a host</li>
                  <li>Host resources</li>
                  <li>Community forum</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Help center</li>
                  <li>Safety information</li>
                  <li>Contact us</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
              <p>© 2025 Airbnb Clone. Powered by Cosmic CMS.</p>
            </div>
          </div>
        </footer>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}