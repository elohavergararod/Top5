import { CATEGORIES, type Category } from '../types'

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  }).format(new Date(iso))
}

export function getCategoryLabel(category: Category): string {
  return CATEGORIES.find(c => c.value === category)?.label ?? category
}

export function getCategoryEmoji(category: Category): string {
  return CATEGORIES.find(c => c.value === category)?.emoji ?? '⭐'
}

export function truncate(str: string, max: number): string {
  return str.length > max ? `${str.slice(0, max - 1)}…` : str
}