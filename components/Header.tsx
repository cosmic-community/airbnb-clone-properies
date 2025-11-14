import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container-custom py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Airbnb Clone
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Properties
            </Link>
            <Link 
              href="/reviews" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Reviews
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}