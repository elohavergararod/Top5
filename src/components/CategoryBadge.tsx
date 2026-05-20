import type { Category } from '../types'
import { getCategoryEmoji, getCategoryLabel } from '../utils'

interface Props {
  category: Category
  size?: 'sm' | 'md'
}

export default function CategoryBadge({ category, size = 'md' }: Props) {
  const sizes = { sm: 'text-xs px-2 py-0.5', md: 'text-sm px-3 py-1' }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-stone-100 text-stone-600 font-medium ${sizes[size]}`}>
      <span>{getCategoryEmoji(category)}</span>
      <span>{getCategoryLabel(category)}</span>
    </span>
  )
}