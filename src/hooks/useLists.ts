import { useState, useEffect, useCallback, useMemo } from 'react'
import { getLists, deleteList, createList } from '../api/client'
import type { TopList, Category, ListFormData } from '../types'

interface UseListsReturn {
  lists: TopList[]
  loading: boolean
  error: string | null
  activeCategory: Category | 'all'
  filtered: TopList[]
  setActiveCategory: (c: Category | 'all') => void
  refetch: () => Promise<void>
  remove: (id: string) => Promise<void>
  add: (data: ListFormData) => Promise<TopList>
}

export function useLists(): UseListsReturn {

  const [lists, setLists] = useState<TopList[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')

  const fetchLists = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getLists()
      setLists(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lists')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLists()
  }, [fetchLists])

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return lists
    return lists.filter(l => l.category === activeCategory)
  }, [lists, activeCategory])

  const remove = useCallback(async (id: string) => {
    await deleteList(id)
    setLists(prev => prev.filter(l => l.id !== id))
  }, [])

  const add = useCallback(async (data: ListFormData): Promise<TopList> => {
    const newList = await createList(data)
    setLists(prev => [newList, ...prev])
    return newList
  }, [])

  return {
    lists,
    loading,
    error,
    activeCategory,
    filtered,
    setActiveCategory,
    refetch: fetchLists,
    remove,
    add,
  }
}