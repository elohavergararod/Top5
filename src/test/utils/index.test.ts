import { describe, it, expect } from 'vitest'
import { formatDate, truncate, getCategoryLabel, getCategoryEmoji } from '../../utils'

describe('formatDate', () => {
  it('formats an ISO date string', () => {
    const result = formatDate('2025-01-15T10:00:00.000Z')
    expect(result).toContain('2025')
    expect(result).toContain('Jan')
  })
})

describe('truncate', () => {
  it('returns the string unchanged if shorter than max', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('truncates and adds ellipsis if longer than max', () => {
    expect(truncate('hello world', 8)).toBe('hello w…')
  })
})

describe('getCategoryLabel', () => {
  it('returns the correct label for a category', () => {
    expect(getCategoryLabel('film')).toBe('Film')
    expect(getCategoryLabel('music')).toBe('Music')
  })
})

describe('getCategoryEmoji', () => {
  it('returns the correct emoji for a category', () => {
    expect(getCategoryEmoji('film')).toBe('🎬')
    expect(getCategoryEmoji('food')).toBe('🍜')
  })
})