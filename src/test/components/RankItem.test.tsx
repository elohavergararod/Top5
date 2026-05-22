import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import RankItem from '../../components/RankItem'

describe('RankItem', () => {
  const item = {
    id: '1',
    rank: 1,
    name: 'Sushi',
    description: 'Best food ever',
  }

  it('renders the item name', () => {
    render(<RankItem item={item} />)
    expect(screen.getByText('Sushi')).toBeInTheDocument()
  })

  it('renders the rank number', () => {
    render(<RankItem item={item} />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('renders the description when provided', () => {
    render(<RankItem item={item} />)
    expect(screen.getByText('Best food ever')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    render(<RankItem item={{ ...item, description: undefined }} />)
    expect(screen.queryByText('Best food ever')).not.toBeInTheDocument()
  })
})