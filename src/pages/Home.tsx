import { useEffect, useMemo, useState } from 'react'
import { useListsContext } from '../context/ListsContext'
import { CATEGORIES, type Category } from '../types'
import ListCard from '../components/ListCard'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'

export default function Home() {
  const { lists, loading, error, fetchLists } = useListsContext()
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')

  useEffect(() => { fetchLists() }, [fetchLists])

  const filtered = useMemo(
    () => activeCategory === 'all' ? lists : lists.filter(l => l.category === activeCategory),
    [lists, activeCategory],
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 tracking-tight text-stone-900 dark:text-stone-100">All lists</h1>
        <p className="text-stone-500 dark:text-stone-400">Rank anything. Five slots. No compromises.</p>
      </div>

      <div className="flex gap-2 flex-wrap mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
            activeCategory === 'all'
              ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100'
              : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500'
          }`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
              activeCategory === cat.value
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100'
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500'
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {loading && <LoadingSpinner message="Fetching your lists…" />}

      {error && (
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-4 text-sm text-red-700 dark:text-red-400">
          {error} —{' '}
          <button onClick={fetchLists} className="underline font-medium">Retry</button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && <EmptyState />}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(list => <ListCard key={list.id} list={list} />)}
        </div>
      )}
    </div>
  )
}