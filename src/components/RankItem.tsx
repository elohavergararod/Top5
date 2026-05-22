import type { ListItem } from '../types'

interface Props {
  item: ListItem
}

const RANK_STYLES: Record<number, string> = {
  1: 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400',
  2: 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-500',
  3: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400',
}

export default function RankItem({ item }: Props) {
  const rankStyle = RANK_STYLES[item.rank] ?? 'bg-white dark:bg-stone-900 border-stone-100 dark:border-stone-800 text-stone-400 dark:text-stone-800'
  const delay = (item.rank - 1) * 80

  return (
    <div
      className="flex items-start gap-4 p-4 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center font-bold text-sm ${rankStyle}`}>
        {item.rank}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-stone-900 dark:text-stone-100 leading-snug">{item.name}</p>
        {item.description && (
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </div>
  )
}