import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { TopList, ListFormData } from '../types'
import * as api from '../api/client'

interface ListsState {
  lists: TopList[]
  loading: boolean
  error: string | null
}

interface ListsContextValue extends ListsState {
  fetchLists: () => Promise<void>
  addList: (data: ListFormData) => Promise<TopList>
  editList: (id: string, data: ListFormData) => Promise<TopList>
  removeList: (id: string) => Promise<void>
}

const ListsContext = createContext<ListsContextValue | null>(null)

export function ListsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ListsState>({
    lists: [],
    loading: false,
    error: null,
  })

  const fetchLists = useCallback(async () => {
    setState(s => ({ ...s, loading: true, error: null }))
    try {
      const lists = await api.getLists()
      setState({ lists, loading: false, error: null })
    } catch (err) {
      setState(s => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch lists',
      }))
    }
  }, [])

  const addList = useCallback(async (data: ListFormData): Promise<TopList> => {
    const newList = await api.createList(data)
    setState(s => ({ ...s, lists: [newList, ...s.lists] }))
    return newList
  }, [])

  const editList = useCallback(async (id: string, data: ListFormData): Promise<TopList> => {
    const updated = await api.updateList(id, data)
    setState(s => ({
      ...s,
      lists: s.lists.map(l => (l.id === id ? updated : l)),
    }))
    return updated
  }, [])

  const removeList = useCallback(async (id: string) => {
    await api.deleteList(id)
    setState(s => ({ ...s, lists: s.lists.filter(l => l.id !== id) }))
  }, [])

  return (
    <ListsContext.Provider
      value={{ ...state, fetchLists, addList, editList, removeList }}
    >
      {children}
    </ListsContext.Provider>
  )
}

export function useListsContext(): ListsContextValue {
  const ctx = useContext(ListsContext)
  if (!ctx) throw new Error('useListsContext must be used inside <ListsProvider>')
  return ctx
}