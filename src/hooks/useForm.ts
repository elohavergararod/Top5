import { useState, useCallback } from 'react'

type ValidationRules<T> = Partial<{
  [K in keyof T]: (value: T[K]) => string | undefined
}>

interface UseFormReturn<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void
  validate: () => boolean
  reset: () => void
}

export function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  validationRules?: ValidationRules<T>,
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const setFieldValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }, [])

  const validate = useCallback((): boolean => {
    if (!validationRules) return true
    const newErrors: Partial<Record<keyof T, string>> = {}
    let isValid = true
    for (const field in validationRules) {
      const rule = validationRules[field]
      if (rule) {
        const error = rule(values[field])
        if (error) { newErrors[field] = error; isValid = false }
      }
    }
    setErrors(newErrors)
    return isValid
  }, [values, validationRules])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])

  return { values, errors, setFieldValue, validate, reset }
}