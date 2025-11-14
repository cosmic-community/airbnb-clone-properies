export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
      <div className="container-custom">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Find your next adventure
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Discover amazing places to stay around the world
          </p>
          <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-4">
            <input
              type="text"
              placeholder="Where are you going?"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}