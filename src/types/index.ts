export type Category =
  | 'film' | 'music' | 'food' | 'travel' | 'sport' | 'books' | 'games' | 'other'

export const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: 'film',   label: 'Film',   emoji: '🎬' },
  { value: 'music',  label: 'Music',  emoji: '🎵' },
  { value: 'food',   label: 'Food',   emoji: '🍜' },
  { value: 'travel', label: 'Travel', emoji: '✈️' },
  { value: 'sport',  label: 'Sport',  emoji: '⚽' },
  { value: 'books',  label: 'Books',  emoji: '📚' },
  { value: 'games',  label: 'Games',  emoji: '🎮' },
  { value: 'other',  label: 'Other',  emoji: '⭐' },
]

export interface ListItem {
  id: string
  rank: number
  name: string
  description?: string
}

export interface TopList {
  id: string
  title: string
  category: Category
  items: ListItem[]
  createdAt: string
  updatedAt: string
}

export interface ListFormData {
  title: string
  category: Category
  items: { name: string; description: string }[]
}