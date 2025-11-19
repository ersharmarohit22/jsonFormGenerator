'use client'

import { useState, type FormEvent } from 'react'
import type { FormSchema, FormValues, FormErrors } from '@/types'
import { validateForm, hasErrors } from '@/lib/validation'
import { FormFieldComponent } from './FormFieldComponent'
import { getFormContainerClass, getButtonClass, getButtonStyles, getThemeStyles } from '@/lib/styleUtils'

interface FormRendererProps {
  schema: FormSchema
  onSubmit?: (values: FormValues) => void
}

export const FormRenderer = ({ schema, onSubmit }: FormRendererProps) => {
  const [values, setValues] = useState<FormValues>(() => {
    const initialValues: FormValues = {}
    schema.fields.forEach(field => {
      initialValues[field.name] = field.defaultValue ?? ''
    })
    return initialValues
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validateForm(schema.fields, values)
    
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors)
      return
    }

    setSubmitted(true)
    if (onSubmit) {
      onSubmit(values)
    }

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
  }

  const formContainerClass = getFormContainerClass(schema.style)
  const buttonClass = getButtonClass(schema.style)
  const buttonStyles = getButtonStyles(schema.style)
  const themeStyles = getThemeStyles(schema.style)

  return (
    <div className="w-full" style={themeStyles}>
      {submitted && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded-lg">
          <p className="font-semibold">Success!</p>
          <p className="text-sm">Form submitted successfully.</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {schema.title}
          </h2>
          {schema.description && (
            <p className="text-gray-600 dark:text-gray-400">
              {schema.description}
            </p>
          )}
        </div>

        <div className={formContainerClass}>
          {schema.fields.map(field => (
            <FormFieldComponent
              key={field.id}
              field={field}
              value={values[field.name]}
              error={errors[field.name]}
              onChange={handleChange}
              formStyle={schema.style}
            />
          ))}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className={buttonClass}
            style={buttonStyles}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

