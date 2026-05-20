interface Props {
  message?: string
}

export default function LoadingSpinner({ message = 'Loading…' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <div className="w-8 h-8 border-2 border-stone-200 dark:border-stone-700 border-t-stone-600 dark:border-t-stone-300 rounded-full animate-spin" />
      <p className="text-sm text-stone-400">{message}</p>
    </div>
  )
}