import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">🏡</span>
            <span className="text-xl font-semibold text-gray-900">
              Airbnb Clone
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Explore
            </Link>
            <Link 
              href="/listings" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Listings
            </Link>
            <button className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Become a Host
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}