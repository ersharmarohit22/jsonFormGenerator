import type { FormSchema, FormField, SelectOption } from '@/types'
import { generateReactCode } from './codeGenerators/reactGenerator'
import { generateJavaScriptCode } from './codeGenerators/javascriptGenerator'
import { generateVueCode } from './codeGenerators/vueGenerator'
import { generateAngularCode } from './codeGenerators/angularGenerator'
import { generateRemixCode } from './codeGenerators/remixGenerator'

export type Framework = 'react' | 'javascript' | 'vue' | 'angular' | 'remix'

export const generateCode = (schema: FormSchema, framework: Framework = 'react'): string => {
  switch (framework) {
    case 'react':
      return generateReactCode(schema)
    case 'javascript':
      return generateJavaScriptCode(schema)
    case 'vue':
      return generateVueCode(schema)
    case 'angular':
      return generateAngularCode(schema)
    case 'remix':
      return generateRemixCode(schema)
    default:
      return generateReactCode(schema)
  }
}

// Keep the old function for backwards compatibility
export const generateReactCodeLegacy = (schema: FormSchema): string => {
  const fields = schema.fields.map(field => generateFieldCode(field, schema.style)).join('\n\n')
  const styleClasses = generateStyleClasses(schema.style)
  
  return `'use client'

import { useState } from 'react'

export default function ${toPascalCase(schema.title)}Form() {
  const [formData, setFormData] = useState({
${schema.fields.map(f => `    ${f.name}: ${getDefaultValue(f)}`).join(',\n')}
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    
    setFormData(prev => ({ ...prev, [name]: newValue }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

${generateValidationCode(schema.fields)}

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Handle form submission
    console.log('Form submitted:', formData)
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

const generateFieldCode = (field: FormField, style?: import('@/types').FormStyle): string => {
  const required = field.validation?.required
  const error = `{errors.${field.name} && <p className="text-red-600 text-sm mt-1">{errors.${field.name}}</p>}`
  const inputClass = getInputClassForGeneration(style)

  switch (field.type) {
    case 'textarea':
      return `      <div>
        <label htmlFor="${field.name}" className="block text-sm font-medium mb-2">
          ${field.label}${required ? ' *' : ''}
        </label>
        <textarea
          id="${field.name}"
          name="${field.name}"
          value={formData.${field.name}}
          onChange={handleChange}
          placeholder="${field.placeholder || ''}"
          rows={4}
          className="${inputClass}"
          ${required ? 'required' : ''}
        />
        ${error}
      </div>`

    case 'select':
      return `      <div>
        <label htmlFor="${field.name}" className="block text-sm font-medium mb-2">
          ${field.label}${required ? ' *' : ''}
        </label>
        <select
          id="${field.name}"
          name="${field.name}"
          value={formData.${field.name}}
          onChange={handleChange}
          className="${inputClass}"
          ${required ? 'required' : ''}
        >
          <option value="">Select an option</option>
${field.options?.map((opt: SelectOption) => `          <option value="${opt.value}">${opt.label}</option>`).join('\n')}
        </select>
        ${error}
      </div>`

    case 'checkbox':
      return `      <div className="flex items-center">
        <input
          type="checkbox"
          id="${field.name}"
          name="${field.name}"
          checked={formData.${field.name}}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="${field.name}" className="ml-2 text-sm font-medium">
          ${field.label}${required ? ' *' : ''}
        </label>
        ${error}
      </div>`

    default:
      return `      <div>
        <label htmlFor="${field.name}" className="block text-sm font-medium mb-2">
          ${field.label}${required ? ' *' : ''}
        </label>
        <input
          type="${field.type}"
          id="${field.name}"
          name="${field.name}"
          value={formData.${field.name}}
          onChange={handleChange}
          placeholder="${field.placeholder || ''}"
          className="${inputClass}"
          ${required ? 'required' : ''}
        />
        ${error}
      </div>`
  }
}

const generateValidationCode = (fields: FormField[]): string => {
  const validations = fields
    .filter(f => f.validation)
    .map(field => {
      const checks: string[] = []
      const v = field.validation!

      if (v.required) {
        checks.push(`    if (!formData.${field.name}) {
      newErrors.${field.name} = '${field.label} is required'
    }`)
      }

      if (v.minLength) {
        checks.push(`    if (formData.${field.name} && formData.${field.name}.length < ${v.minLength}) {
      newErrors.${field.name} = '${field.label} must be at least ${v.minLength} characters'
    }`)
      }

      if (v.pattern) {
        checks.push(`    if (formData.${field.name} && !/${v.pattern}/.test(formData.${field.name})) {
      newErrors.${field.name} = '${field.label} format is invalid'
    }`)
      }

      return checks.join('\n')
    })
    .filter(Boolean)
    .join('\n\n')

  return validations || '    // No validation rules'
}

const toPascalCase = (str: string): string => {
  return str
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

const getDefaultValue = (field: FormField): string => {
  if (field.defaultValue !== undefined) {
    if (typeof field.defaultValue === 'string') {
      return `'${field.defaultValue}'`
    }
    return String(field.defaultValue)
  }

  switch (field.type) {
    case 'number':
      return '0'
    case 'checkbox':
      return 'false'
    default:
      return "''"
  }
}

const generateStyleClasses = (style?: import('@/types').FormStyle) => {
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

const getInputClassForGeneration = (style?: import('@/types').FormStyle): string => {
  const borderRadius = style?.fieldStyle?.borderRadius === 'none' ? 'rounded-none' :
                       style?.fieldStyle?.borderRadius === 'sm' ? 'rounded' :
                       style?.fieldStyle?.borderRadius === 'lg' ? 'rounded-xl' :
                       style?.fieldStyle?.borderRadius === 'full' ? 'rounded-full' : 'rounded-lg'
  
  const height = style?.fieldStyle?.fieldHeight === 'sm' ? 'py-1.5' :
                 style?.fieldStyle?.fieldHeight === 'lg' ? 'py-3' : 'py-2'
  
  return `w-full px-4 ${height} border ${borderRadius} border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent`
}

const generateInlineStyles = (theme: import('@/types').FormStyle['theme']): string => {
  const styles: string[] = []
  if (theme.backgroundColor) styles.push(`backgroundColor: '${theme.backgroundColor}'`)
  if (theme.textColor) styles.push(`color: '${theme.textColor}'`)
  return styles.join(', ')
}

const generateButtonStyles = (theme: import('@/types').FormStyle['theme']): string => {
  const styles: string[] = []
  if (theme.buttonColor) styles.push(`backgroundColor: '${theme.buttonColor}'`)
  if (theme.buttonTextColor) styles.push(`color: '${theme.buttonTextColor}'`)
  return styles.join(', ')
}

