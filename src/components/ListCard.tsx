import { Link } from 'react-router-dom'
import type { TopList } from '../types'
import { getCategoryEmoji, formatDate, truncate } from '../utils'

interface Props {
  list: TopList
}

export default function ListCard({ list }: Props) {
  return (
    <Link
      to={`/list/${list.id}`}
      className="group block bg-white border border-stone-200 rounded-2xl p-5 hover:border-stone-400 hover:shadow-sm transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-2xl">{getCategoryEmoji(list.category)}</span>
        <span className="text-xs text-stone-400 mt-1">{formatDate(list.createdAt)}</span>
      </div>

      <h2 className="font-semibold text-stone-900 text-base mb-3 leading-snug group-hover:text-stone-600 transition-colors">
        {list.title}
      </h2>

      <ol className="space-y-1.5">
        {list.items.map(item => (
          <li key={item.id} className="flex items-start gap-2.5 text-sm">
            <span className="text-xs font-bold text-stone-300 mt-0.5 w-4 shrink-0">
              {item.rank}
            </span>
            <span className="text-stone-600 leading-snug">
              {truncate(item.name, 40)}
            </span>
          </li>
        ))}
      </ol>
    </Link>
  )
}