import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getList } from '../api/client'
import { useListsContext } from '../context/ListsContext'
import type { TopList } from '../types'
import RankItem from '../components/RankItem'
import CategoryBadge from '../components/CategoryBadge'
import LoadingSpinner from '../components/LoadingSpinner'
import ConfirmModal from '../components/ConfirmModal'
import { formatDate } from '../utils'

export default function ListDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { removeList } = useListsContext()

  const [list, setList] = useState<TopList | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getList(id)
      .then(setList)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  async function handleDelete() {
    if (!id) return
    setDeleting(true)
    try {
      await removeList(id)
      navigate('/')
    } catch {
      setDeleting(false)
      setShowModal(false)
    }
  }

  if (loading) return <LoadingSpinner message="Loading list…" />

  if (error || !list) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-stone-500 mb-4">{error ?? 'List not found.'}</p>
        <Link to="/" className="text-sm underline text-stone-400">← Back to all lists</Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link to="/" className="text-sm text-stone-400 hover:text-stone-600 transition-colors mb-6 inline-block">
        ← All lists
      </Link>

      <div className="mb-6">
        <CategoryBadge category={list.category} />
        <h1 className="text-3xl font-bold mt-3 mb-1 tracking-tight text-stone-900">
          {list.title}
        </h1>
        <p className="text-sm text-stone-400">Created {formatDate(list.createdAt)}</p>
      </div>

      <div className="space-y-3 mb-8">
        {list.items.map(item => <RankItem key={item.id} item={item} />)}
      </div>

      <div className="flex gap-3 pt-4 border-t border-stone-100">
        <button
          onClick={() => setShowModal(true)}
          className="text-sm px-4 py-2 border border-red-200 text-red-500 rounded-full hover:bg-red-50 transition-colors"
        >
          Delete list
        </button>
      </div>

      {showModal && (
        <ConfirmModal
          title="Delete this list?"
          message="This action cannot be undone."
          confirmLabel={deleting ? 'Deleting…' : 'Delete'}
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  )
}