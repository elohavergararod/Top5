import type { ListItem } from '../types'

interface Props {
  item: ListItem
}

const RANK_STYLES: Record<number, string> = {
  1: 'bg-amber-50 border-amber-200 text-amber-700',
  2: 'bg-stone-50 border-stone-200 text-stone-500',
  3: 'bg-orange-50 border-orange-200 text-orange-600',
}

export default function RankItem({ item }: Props) {
  const rankStyle = RANK_STYLES[item.rank] ?? 'bg-white border-stone-100 text-stone-400'

  return (
    <div className="flex items-start gap-4 p-4 bg-white border border-stone-100 rounded-xl">
      <div className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center font-bold text-sm ${rankStyle}`}>
        {item.rank}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-stone-900 leading-snug">{item.name}</p>
        {item.description && (
          <p className="text-sm text-stone-500 mt-0.5 leading-relaxed">{item.description}</p>
        )}
      </div>
    </div>
  )
}