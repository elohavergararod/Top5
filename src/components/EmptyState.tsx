import { Link } from 'react-router-dom'

interface Props {
  message?: string
  showAction?: boolean
}

export default function EmptyState({
  message = 'No lists yet.',
  showAction = true,
}: Props) {
  return (
    <div className="text-center py-24">
      <p className="text-5xl mb-4">📋</p>
      <p className="text-stone-500 mb-6">{message}</p>
      {showAction && (
        <Link
          to="/new"
          className="inline-block bg-stone-900 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-stone-700 transition-colors"
        >
          Create a list
        </Link>
      )}
    </div>
  )
}