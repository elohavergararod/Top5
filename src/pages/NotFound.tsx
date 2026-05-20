import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-6 py-32 text-center">
      <p className="text-8xl font-bold text-stone-100 dark:text-stone-800 mb-4">404</p>
      <h1 className="text-xl font-semibold text-stone-700 dark:text-stone-300 mb-2">Page not found</h1>
      <p className="text-stone-400 dark:text-stone-400 text-sm mb-8">This page doesn't exist — but your Top 5 can.</p>
      <Link
        to="/"
        className="inline-block bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-medium px-6 py-2.5 rounded-full hover:bg-stone-700 transition-colors"
      >
        Back to lists
      </Link>
    </div>
  )
}