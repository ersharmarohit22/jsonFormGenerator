import type { FormSchema, FormField } from '@/types'

export function generateReactCode(schema: FormSchema): string {
  const fields = schema.fields.map(field => generateFieldCode(field, schema.style)).join('\n\n')
  const styleClasses = generateStyleClasses(schema.style)

  return `'use client'

import { useState } from 'react'

export default function ${toPascalCase(schema.title)}Form() {
  const [formData, setFormData] = useState({
${schema.fields.map(f => `    ${f.name}: ${getDefaultValue(f)}`).join(',\n')}
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
${schema.fields.filter(f => f.validation).map(f => generateValidationCode(f)).join('\n')}
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      console.log('Form submitted:', formData)
      // Handle form submission
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6"${schema.style?.theme ? ` style={{ ${generateInlineStyles(schema.style.theme)} }}` : ''}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">${schema.title}</h2>
        ${schema.description ? `<p className="text-gray-600">${schema.description}</p>` : ''}
      </div>

      <div className="${styleClasses.container}">
${fields}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="${styleClasses.button}"${schema.style?.theme?.buttonColor ? `\n          style={{ ${generateButtonStyles(schema.style.theme)} }}` : ''}
        >
          Submit
        </button>
      </div>
    </form>
  )
}`
}

function generateFieldCode(field: FormField, style?: import('@/types').FormStyle): string {
  const required = field.validation?.required
  const error = `{errors.${field.name} && <p className="text-red-600 text-sm mt-1">{errors.${field.name}}</p>}`
  const inputClass = getInputClassForGeneration(style)

  switch (field.type) {
    case 'textarea':
      return `        <div>
          <label htmlFor="${field.id}" className="block text-sm font-medium mb-2">
            ${field.label}${required ? ' *' : ''}
          </label>
          <textarea
            id="${field.id}"
            value={formData.${field.name}}
            onChange={(e) => handleChange('${field.name}', e.target.value)}
            placeholder="${field.placeholder || ''}"
            className="${inputClass}"
            rows={4}
          />
          ${error}
        </div>`

    case 'select':
      return `        <div>
          <label htmlFor="${field.id}" className="block text-sm font-medium mb-2">
            ${field.label}${required ? ' *' : ''}
          </label>
          <select
            id="${field.id}"
            value={formData.${field.name}}
            onChange={(e) => handleChange('${field.name}', e.target.value)}
            className="${inputClass}"
          >
            <option value="">Select...</option>
            ${field.options?.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('\n            ')}
          </select>
          ${error}
        </div>`

    case 'checkbox':
      return `        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="${field.id}"
              checked={formData.${field.name}}
              onChange={(e) => handleChange('${field.name}', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">${field.label}${required ? ' *' : ''}</span>
          </label>
          ${error}
        </div>`

    case 'radio':
      return `        <div>
          <label className="block text-sm font-medium mb-2">
            ${field.label}${required ? ' *' : ''}
          </label>
          <div className="space-y-2">
            ${field.options?.map(opt => `<label className="flex items-center space-x-2">
              <input
                type="radio"
                name="${field.name}"
                value="${opt.value}"
                checked={formData.${field.name} === '${opt.value}'}
                onChange={(e) => handleChange('${field.name}', e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm">${opt.label}</span>
            </label>`).join('\n            ')}
          </div>
          ${error}
        </div>`

    default:
      return `        <div>
          <label htmlFor="${field.id}" className="block text-sm font-medium mb-2">
            ${field.label}${required ? ' *' : ''}
          </label>
          <input
            type="${field.type}"
            id="${field.id}"
            value={formData.${field.name}}
            onChange={(e) => handleChange('${field.name}', e.target.value)}
            placeholder="${field.placeholder || ''}"
            className="${inputClass}"
          />
          ${error}
        </div>`
  }
}

function toPascalCase(str: string): string {
  return str.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()).replace(/\s+/g, '')
}

function getDefaultValue(field: FormField): string {
  if (field.defaultValue !== undefined) {
    return typeof field.defaultValue === 'string' ? `'${field.defaultValue}'` : String(field.defaultValue)
  }
  if (field.type === 'checkbox') return 'false'
  if (field.type === 'number') return '0'
  return "''"
}

function generateValidationCode(field: FormField): string {
  const validation = field.validation!
  const checks: string[] = []

  if (validation.required) {
    checks.push(`    if (!formData.${field.name}) newErrors.${field.name} = '${field.label} is required'`)
  }
  if (validation.minLength) {
    checks.push(`    if (formData.${field.name}.length < ${validation.minLength}) newErrors.${field.name} = 'Minimum ${validation.minLength} characters'`)
  }
  if (validation.maxLength) {
    checks.push(`    if (formData.${field.name}.length > ${validation.maxLength}) newErrors.${field.name} = 'Maximum ${validation.maxLength} characters'`)
  }
  if (validation.pattern) {
    checks.push(`    if (!/${validation.pattern}/.test(formData.${field.name})) newErrors.${field.name} = 'Invalid format'`)
  }

  return checks.join('\n')
}

function generateStyleClasses(style?: import('@/types').FormStyle) {
  const spacing = style?.spacing === 'compact' ? 'space-y-3' :
                  style?.spacing === 'relaxed' ? 'space-y-8' : 'space-y-6'

  const layout = style?.layout === 'grid'
    ? `grid grid-cols-1 md:grid-cols-${style.columns || 2} gap-6`
    : spacing

  const buttonAlignment = style?.buttonAlignment === 'left' ? 'mr-auto' :
                          style?.buttonAlignment === 'center' ? 'mx-auto' :
                          style?.buttonAlignment === 'right' ? 'ml-auto' : 'w-full'

  const borderRadius = style?.fieldStyle?.borderRadius === 'none' ? 'rounded-none' :
                       style?.fieldStyle?.borderRadius === 'sm' ? 'rounded' :
                       style?.fieldStyle?.borderRadius === 'lg' ? 'rounded-xl' :
                       style?.fieldStyle?.borderRadius === 'full' ? 'rounded-full' : 'rounded-lg'

  return {
    container: layout,
    button: `${buttonAlignment} px-6 py-3 ${borderRadius} font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg`,
  }
}

function getInputClassForGeneration(style?: import('@/types').FormStyle): string {
  const borderRadius = style?.fieldStyle?.borderRadius === 'none' ? 'rounded-none' :
                       style?.fieldStyle?.borderRadius === 'sm' ? 'rounded' :
                       style?.fieldStyle?.borderRadius === 'lg' ? 'rounded-xl' :
                       style?.fieldStyle?.borderRadius === 'full' ? 'rounded-full' : 'rounded-lg'

  const height = style?.fieldStyle?.fieldHeight === 'sm' ? 'py-1.5' :
                 style?.fieldStyle?.fieldHeight === 'lg' ? 'py-3' : 'py-2'

  return `w-full px-4 ${height} border ${borderRadius} border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent`
}

function generateInlineStyles(theme: import('@/types').FormStyle['theme']): string {
  const styles: string[] = []
  if (theme?.backgroundColor) styles.push(`backgroundColor: '${theme.backgroundColor}'`)
  if (theme?.textColor) styles.push(`color: '${theme.textColor}'`)
  return styles.join(', ')
}

function generateButtonStyles(theme: import('@/types').FormStyle['theme']): string {
  const styles: string[] = []
  if (theme?.buttonColor) styles.push(`backgroundColor: '${theme.buttonColor}'`)
  if (theme?.buttonTextColor) styles.push(`color: '${theme.buttonTextColor}'`)
  return styles.join(', ')
}

