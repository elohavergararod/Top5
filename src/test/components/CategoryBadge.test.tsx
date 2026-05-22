import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CategoryBadge from '../../components/CategoryBadge'

describe('CategoryBadge', () => {
  it('renders the category label', () => {
    render(<CategoryBadge category="film" />)
    expect(screen.getByText('Film')).toBeInTheDocument()
  })

  it('renders the category emoji', () => {
    render(<CategoryBadge category="music" />)
    expect(screen.getByText('🎵')).toBeInTheDocument()
  })

  it('applies small size classes', () => {
    const { container } = render(<CategoryBadge category="food" size="sm" />)
    expect(container.firstChild).toHaveClass('text-xs')
  })

  it('applies medium size by default', () => {
    const { container } = render(<CategoryBadge category="food" />)
    expect(container.firstChild).toHaveClass('text-sm')
  })
})