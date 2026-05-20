import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useListsContext } from '../context/ListsContext'
import { getList } from '../api/client'
import { CATEGORIES, type Category, type ListFormData } from '../types'

const EMPTY_ITEMS = Array.from({ length: 5 }, () => ({ name: '', description: '' }))

export default function EditList() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { editList } = useListsContext()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Category>('other')
  const [items, setItems] = useState(EMPTY_ITEMS)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [loadingList, setLoadingList] = useState(true)

  useEffect(() => {
    if (!id) return
    getList(id)
      .then(list => {
        setTitle(list.title)
        setCategory(list.category)
        setItems(list.items.map(item => ({
          name: item.name,
          description: item.description ?? '',
        })))
      })
      .catch(() => navigate('/'))
      .finally(() => setLoadingList(false))
  }, [id, navigate])

  function updateItem(index: number, field: 'name' | 'description', value: string) {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item))
    setErrors(prev => { const next = { ...prev }; delete next[`item-${index}`]; return next })
  }

  function validate(): boolean {
    const next: Record<string, string> = {}
    if (!title.trim()) next.title = 'Title is required.'
    items.forEach((item, i) => {
      if (!item.name.trim()) next[`item-${i}`] = 'Name is required.'
    })
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate() || !id) return
    setSubmitting(true)
    try {
      const data: ListFormData = {
        title: title.trim(),
        category,
        items: items.map(item => ({
          name: item.name.trim(),
          description: item.description.trim(),
        })),
      }
      await editList(id, data)
      navigate(`/list/${id}`)
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' })
      setSubmitting(false)
    }
  }

  if (loadingList) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-stone-200 border-t-stone-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link
        to={`/list/${id}`}
        className="text-sm text-stone-400 hover:text-stone-600 transition-colors mb-6 inline-block"
      >
        ← Back to list
      </Link>

      <h1 className="text-3xl font-bold mb-8 tracking-tight text-stone-900">
        Edit list
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            List title
          </label>
          <input
            type="text"
            value={title}
            onChange={e => {
              setTitle(e.target.value)
              setErrors(p => ({ ...p, title: '' }))
            }}
            placeholder="e.g. Best films of all time"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-stone-300 transition ${
              errors.title ? 'border-red-300 bg-red-50' : 'border-stone-200'
            }`}
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="category-select" className="block text-sm font-medium text-stone-700 mb-1.5">
            Category
          </label>
          <select
            id="category-select"
            value={category}
            onChange={e => setCategory(e.target.value as Category)}
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-stone-300 bg-white"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="block text-sm font-medium text-stone-700 mb-3">
            Your Top 5 — in order
          </p>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-8 h-8 shrink-0 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-500 mt-2">
                  {i + 1}
                </div>
                <div className="flex-1 space-y-1.5">
                  <input
                    type="text"
                    value={item.name}
                    onChange={e => updateItem(i, 'name', e.target.value)}
                    placeholder={`#${i + 1} — name`}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-stone-300 transition ${
                      errors[`item-${i}`] ? 'border-red-300 bg-red-50' : 'border-stone-200'
                    }`}
                  />
                  {errors[`item-${i}`] && (
                    <p className="text-xs text-red-500">{errors[`item-${i}`]}</p>
                  )}
                  <input
                    type="text"
                    value={item.description}
                    onChange={e => updateItem(i, 'description', e.target.value)}
                    placeholder="Short description (optional)"
                    className="w-full border border-stone-200 rounded-xl px-4 py-2 text-sm text-stone-500 outline-none focus:ring-2 focus:ring-stone-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {errors.form && (
          <p className="text-sm text-red-500">{errors.form}</p>
        )}

        <p className="text-xs text-stone-400">
          All 5 items are required. Descriptions are optional.
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-stone-900 text-white font-medium py-3 rounded-full hover:bg-stone-700 transition-colors disabled:opacity-50 text-sm"
        >
          {submitting ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}