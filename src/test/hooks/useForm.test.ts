import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useForm } from '../../hooks/useForm'

describe('useForm', () => {
  const initial = { title: '', category: 'film' }

  it('initializes with the provided values', () => {
    const { result } = renderHook(() => useForm(initial))
    expect(result.current.values.title).toBe('')
    expect(result.current.values.category).toBe('film')
  })

  it('updates a field value with setFieldValue', () => {
    const { result } = renderHook(() => useForm(initial))
    act(() => {
      result.current.setFieldValue('title', 'Best films')
    })
    expect(result.current.values.title).toBe('Best films')
  })

  it('validates required fields', () => {
    const { result } = renderHook(() =>
      useForm(initial, {
        title: v => (!v ? 'Title is required.' : undefined),
      }),
    )
    let isValid: boolean
    act(() => {
      isValid = result.current.validate()
    })
    expect(isValid!).toBe(false)
    expect(result.current.errors.title).toBe('Title is required.')
  })

  it('resets values and errors', () => {
    const { result } = renderHook(() => useForm(initial))
    act(() => { result.current.setFieldValue('title', 'Something') })
    act(() => { result.current.reset() })
    expect(result.current.values.title).toBe('')
  })
})