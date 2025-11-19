'use client'

import type { FormField, FieldError, FormStyle } from '@/types'
import { getFieldContainerClass, getInputClass, getLabelClass, getFocusRingColor } from '@/lib/styleUtils'

interface FormFieldProps {
  field: FormField
  value: string | number | boolean | undefined
  error?: FieldError
  onChange: (name: string, value: string | number | boolean) => void
  formStyle?: FormStyle
}

export const FormFieldComponent = ({ field, value, error, onChange, formStyle }: FormFieldProps) => {
  const required = field.validation?.required
  const hasError = !!error

  const baseInputClass = `${getInputClass(formStyle, hasError)} ${getFocusRingColor(formStyle)}`
  const fieldContainerClass = getFieldContainerClass(formStyle)
  const labelClass = `${getLabelClass(formStyle)} ${
    hasError ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
  }`

  const renderField = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.id}
            name={field.name}
            value={value || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            required={required}
            className={baseInputClass}
          />
        )

      case 'select':
        return (
          <select
            id={field.id}
            name={field.name}
            value={value || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            required={required}
            className={baseInputClass}
          >
            <option value="">Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  required={required}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )

      case 'checkbox':
        return (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              id={field.id}
              name={field.name}
              checked={!!value}
              onChange={(e) => onChange(field.name, e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {field.label}{required && ' *'}
            </span>
          </label>
        )

      case 'file':
        return (
          <input
            type="file"
            id={field.id}
            name={field.name}
            onChange={(e) => {
              const file = e.target.files?.[0]
              onChange(field.name, file)
            }}
            required={required}
            className={`${baseInputClass} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
          />
        )

      default:
        return (
          <input
            type={field.type}
            id={field.id}
            name={field.name}
            value={value || ''}
            onChange={(e) => {
              const newValue = field.type === 'number' ? parseFloat(e.target.value) || '' : e.target.value
              onChange(field.name, newValue)
            }}
            placeholder={field.placeholder}
            required={required}
            min={field.validation?.min}
            max={field.validation?.max}
            minLength={field.validation?.minLength}
            maxLength={field.validation?.maxLength}
            pattern={field.validation?.pattern}
            className={baseInputClass}
          />
        )
    }
  }

  if (field.type === 'checkbox') {
    return (
      <div className={fieldContainerClass}>
        {renderField()}
        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">
            {error.message}
          </p>
        )}
        {field.description && !error && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {field.description}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={fieldContainerClass}>
      <label htmlFor={field.id} className={labelClass}>
        {field.label}{required && ' *'}
      </label>
      <div className="flex-1">
        {renderField()}
        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">
            {error.message}
          </p>
        )}
        {field.description && !error && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {field.description}
          </p>
        )}
      </div>
    </div>
  )
}

