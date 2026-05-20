import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { pathname } = useLocation()
  const { isDark, toggle } = useTheme()

    return (
    <header className="border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Top 5
          </span>
          <span className="text-stone-400 text-sm font-medium">of Everything</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-600 dark:text-stone-300"
            aria-label="Toggle dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {pathname !== '/new' && (
            <Link
              to="/new"
              className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-medium px-4 py-2 rounded-full hover:bg-stone-700 dark:hover:bg-stone-300 transition-colors"
            >
              + New list
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}