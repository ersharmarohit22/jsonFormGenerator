import type { FormSchema, FormField } from '@/types'

export function generateVueCode(schema: FormSchema): string {
  const fields = schema.fields.map(field => generateFieldTemplate(field)).join('\n      ')
  const dataFields = schema.fields.map(f => `      ${f.name}: ${getDefaultValue(f)}`).join(',\n')
  const validation = schema.fields.filter(f => f.validation).map(f => generateValidation(f)).join('\n      ')

  return `<template>
  <form @submit.prevent="handleSubmit" class="form-container"${schema.style?.theme ? ` :style="formStyle"` : ''}>
    <div class="form-header">
      <h2>${schema.title}</h2>
      ${schema.description ? `<p class="description">${schema.description}</p>` : ''}
    </div>

    <div class="fields-container">
      ${fields}
    </div>

    <button type="submit" class="submit-button"${schema.style?.theme?.buttonColor ? ` :style="buttonStyle"` : ''}>
      Submit
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const formData = reactive({
${dataFields}
})

const errors = reactive<Record<string, string>>({})

${schema.style?.theme ? `const formStyle = {
  ${schema.style.theme.backgroundColor ? `backgroundColor: '${schema.style.theme.backgroundColor}',` : ''}
  ${schema.style.theme.textColor ? `color: '${schema.style.theme.textColor}',` : ''}
}

const buttonStyle = {
  ${schema.style.theme.buttonColor ? `backgroundColor: '${schema.style.theme.buttonColor}',` : ''}
  ${schema.style.theme.buttonTextColor ? `color: '${schema.style.theme.buttonTextColor}',` : ''}
}` : ''}

const validate = (): boolean => {
  const newErrors: Record<string, string> = {}
  
${validation}
  
  Object.keys(errors).forEach(key => delete errors[key])
  Object.assign(errors, newErrors)
  
  return Object.keys(newErrors).length === 0
}

const handleSubmit = () => {
  if (validate()) {
    console.log('Form submitted:', formData)
    // Handle form submission
  }
}
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-header {
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.description {
  color: #6b7280;
}

.fields-container {
  ${schema.style?.layout === 'grid' ? `
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  ` : `
  display: flex;
  flex-direction: column;
  gap: ${schema.style?.spacing === 'compact' ? '0.75rem' : schema.style?.spacing === 'relaxed' ? '2rem' : '1.5rem'};
  `}
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

input,
select,
textarea {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: ${getBorderRadius(schema.style?.fieldStyle?.borderRadius)};
  font-size: 1rem;
  width: 100%;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: ${schema.style?.theme?.focusColor || '#3b82f6'};
  ring: 2px ${schema.style?.theme?.focusColor || '#3b82f6'};
}

.error {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.submit-button {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  ${getButtonAlignment(schema.style?.buttonAlignment)}
}

.submit-button:hover {
  background-color: #2563eb;
}

.checkbox-group,
.radio-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.radio-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>`
}

function generateFieldTemplate(field: FormField): string {
  const required = field.validation?.required ? ' *' : ''

  switch (field.type) {
    case 'textarea':
      return `<div class="form-group">
        <label for="${field.id}">${field.label}${required}</label>
        <textarea
          id="${field.id}"
          v-model="formData.${field.name}"
          placeholder="${field.placeholder || ''}"
          rows="4"
        ></textarea>
        <span v-if="errors.${field.name}" class="error">{{ errors.${field.name} }}</span>
      </div>`

    case 'select':
      return `<div class="form-group">
        <label for="${field.id}">${field.label}${required}</label>
        <select id="${field.id}" v-model="formData.${field.name}">
          <option value="">Select...</option>
          ${field.options?.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('\n          ')}
        </select>
        <span v-if="errors.${field.name}" class="error">{{ errors.${field.name} }}</span>
      </div>`

    case 'checkbox':
      return `<div class="form-group">
        <div class="checkbox-group">
          <input
            type="checkbox"
            id="${field.id}"
            v-model="formData.${field.name}"
          />
          <label for="${field.id}">${field.label}${required}</label>
        </div>
        <span v-if="errors.${field.name}" class="error">{{ errors.${field.name} }}</span>
      </div>`

    case 'radio':
      return `<div class="form-group">
        <label>${field.label}${required}</label>
        <div class="radio-options">
          ${field.options?.map(opt => `<div class="radio-group">
            <input
              type="radio"
              id="${field.id}-${opt.value}"
              v-model="formData.${field.name}"
              value="${opt.value}"
            />
            <label for="${field.id}-${opt.value}">${opt.label}</label>
          </div>`).join('\n          ')}
        </div>
        <span v-if="errors.${field.name}" class="error">{{ errors.${field.name} }}</span>
      </div>`

    default:
      return `<div class="form-group">
        <label for="${field.id}">${field.label}${required}</label>
        <input
          type="${field.type}"
          id="${field.id}"
          v-model="formData.${field.name}"
          placeholder="${field.placeholder || ''}"
        />
        <span v-if="errors.${field.name}" class="error">{{ errors.${field.name} }}</span>
      </div>`
  }
}

function generateValidation(field: FormField): string {
  const validation = field.validation!
  const checks: string[] = []

  if (validation.required) {
    checks.push(`  if (!formData.${field.name}) {
    newErrors.${field.name} = '${field.label} is required'
  }`)
  }

  if (validation.minLength) {
    checks.push(`  if (formData.${field.name}.length < ${validation.minLength}) {
    newErrors.${field.name} = 'Minimum ${validation.minLength} characters required'
  }`)
  }

  if (validation.maxLength) {
    checks.push(`  if (formData.${field.name}.length > ${validation.maxLength}) {
    newErrors.${field.name} = 'Maximum ${validation.maxLength} characters allowed'
  }`)
  }

  if (validation.pattern) {
    checks.push(`  if (!/${validation.pattern}/.test(formData.${field.name})) {
    newErrors.${field.name} = 'Invalid format'
  }`)
  }

  return checks.join('\n  ')
}

function getDefaultValue(field: FormField): string {
  if (field.defaultValue !== undefined) {
    return typeof field.defaultValue === 'string' ? `'${field.defaultValue}'` : String(field.defaultValue)
  }
  if (field.type === 'checkbox') return 'false'
  if (field.type === 'number') return '0'
  return "''"
}

function getBorderRadius(radius?: string): string {
  switch (radius) {
    case 'none': return '0'
    case 'sm': return '0.25rem'
    case 'lg': return '0.75rem'
    case 'full': return '9999px'
    default: return '0.375rem'
  }
}

function getButtonAlignment(alignment?: string): string {
  switch (alignment) {
    case 'left': return ''
    case 'center': return 'display: block; margin-left: auto; margin-right: auto;'
    case 'right': return 'display: block; margin-left: auto;'
    case 'full': return 'width: 100%;'
    default: return 'width: 100%;'
  }
}

