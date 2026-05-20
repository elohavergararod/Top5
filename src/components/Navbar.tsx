import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-stone-900">Top 5</span>
          <span className="text-stone-400 text-sm font-medium">of Everything</span>
        </Link>
        {pathname !== '/new' && (
          <Link
            to="/new"
            className="bg-stone-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-stone-700 transition-colors"
          >
            + New list
          </Link>
        )}
      </div>
    </header>
  )
}