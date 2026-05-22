import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from '../../components/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders default message', () => {
    render(<LoadingSpinner />)
    expect(screen.getByText('Loading…')).toBeInTheDocument()
  })

  it('renders custom message', () => {
    render(<LoadingSpinner message="Fetching lists…" />)
    expect(screen.getByText('Fetching lists…')).toBeInTheDocument()
  })
})