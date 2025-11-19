import type { FormField, FormValues, FormErrors } from '@/types'

export const validateField = (field: FormField, value: string | number | boolean | undefined): string | null => {
  const validation = field.validation

  if (!validation) return null

  // Required validation
  if (validation.required && (!value || value === '')) {
    return `${field.label} is required`
  }

  // Skip other validations if value is empty and not required
  if (!value || value === '') return null

  // String validations
  if (typeof value === 'string') {
    if (validation.minLength && value.length < validation.minLength) {
      return `${field.label} must be at least ${validation.minLength} characters`
    }

    if (validation.maxLength && value.length > validation.maxLength) {
      return `${field.label} must be no more than ${validation.maxLength} characters`
    }

    if (validation.pattern) {
      try {
        const regex = new RegExp(validation.pattern)
        if (!regex.test(value)) {
          return `${field.label} format is invalid`
        }
      } catch {
        console.error('Invalid regex pattern:', validation.pattern)
      }
    }
  }

  // Number validations
  if (field.type === 'number' && typeof value === 'number') {
    if (validation.min !== undefined && value < validation.min) {
      return `${field.label} must be at least ${validation.min}`
    }

    if (validation.max !== undefined && value > validation.max) {
      return `${field.label} must be no more than ${validation.max}`
    }
  }

  // Email validation
  if (field.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
  }

  // URL validation
  if (field.type === 'url') {
    try {
      new URL(value)
    } catch {
      return 'Please enter a valid URL'
    }
  }

  return null
}

export const validateForm = (fields: FormField[], values: FormValues): FormErrors => {
  const errors: FormErrors = {}

  fields.forEach(field => {
    const value = values[field.name]
    const error = validateField(field, value)
    
    if (error) {
      errors[field.name] = { message: error }
    }
  })

  return errors
}

export const hasErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0
}

