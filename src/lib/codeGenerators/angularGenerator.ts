import type { FormSchema, FormField } from '@/types'

export const generateAngularCode = (schema: FormSchema): string => {
  const componentName = toPascalCase(schema.title)
  const fields = schema.fields.map(field => generateFieldTemplate(field)).join('\n      ')
  const formControls = schema.fields.map(f => `      ${f.name}: ['${getDefaultValue(f)}', ${getValidators(f)}]`).join(',\n')

  const componentTS = `import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-${toKebabCase(schema.title)}-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './${toKebabCase(schema.title)}-form.component.html',
  styleUrls: ['./${toKebabCase(schema.title)}-form.component.css']
})
export class ${componentName}FormComponent {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
${formControls}
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('Form submitted:', this.formGroup.value);
      // Handle form submission
    } else {
      Object.keys(this.formGroup.controls).forEach(key => {
        this.formGroup.get(key)?.markAsTouched();
      });
    }
  }

  getErrorMessage(fieldName: string): string {
    const control = this.formGroup.get(fieldName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('minlength')) {
      return \`Minimum \${control.errors?.['minlength'].requiredLength} characters required\`;
    }
    if (control?.hasError('maxlength')) {
      return \`Maximum \${control.errors?.['maxlength'].requiredLength} characters allowed\`;
    }
    if (control?.hasError('pattern')) {
      return 'Invalid format';
    }
    return '';
  }
}`

  const componentHTML = `<form [formGroup]="formGroup" (ngSubmit)="onSubmit()" class="form-container"${schema.style?.theme ? ` [ngStyle]="formStyle"` : ''}>
  <div class="form-header">
    <h2>${schema.title}</h2>
    ${schema.description ? `<p class="description">${schema.description}</p>` : ''}
  </div>

  <div class="fields-container">
    ${fields}
  </div>

  <button type="submit" class="submit-button"${schema.style?.theme?.buttonColor ? ` [ngStyle]="buttonStyle"` : ''}>
    Submit
  </button>
</form>`

  const componentCSS = `.form-container {
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
  grid-template-columns: repeat(${schema.style.columns || 2}, 1fr);
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
  box-shadow: 0 0 0 2px ${schema.style?.theme?.focusColor || '#3b82f6'}22;
}

.error {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.submit-button {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${schema.style?.theme?.buttonColor || '#3b82f6'};
  color: ${schema.style?.theme?.buttonTextColor || 'white'};
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  ${getButtonAlignment(schema.style?.buttonAlignment)}
}

.submit-button:hover {
  opacity: 0.9;
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkbox-group,
.radio-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.radio-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .fields-container {
    grid-template-columns: 1fr !important;
  }
}`

  return `// ${componentName}FormComponent TypeScript
// File: ${toKebabCase(schema.title)}-form.component.ts
${componentTS}

// ========================================

// ${componentName}FormComponent HTML Template
// File: ${toKebabCase(schema.title)}-form.component.html
${componentHTML}

// ========================================

// ${componentName}FormComponent Styles
// File: ${toKebabCase(schema.title)}-form.component.css
${componentCSS}`
}

const generateFieldTemplate = (field: FormField): string => {
  const required = field.validation?.required ? ' *' : ''

  switch (field.type) {
    case 'textarea':
      return `<div class="form-group">
      <label for="${field.id}">${field.label}${required}</label>
      <textarea
        id="${field.id}"
        formControlName="${field.name}"
        placeholder="${field.placeholder || ''}"
        rows="4"
      ></textarea>
      <span *ngIf="formGroup.get('${field.name}')?.invalid && formGroup.get('${field.name}')?.touched" class="error">
        {{ getErrorMessage('${field.name}') }}
      </span>
    </div>`

    case 'select':
      return `<div class="form-group">
      <label for="${field.id}">${field.label}${required}</label>
      <select id="${field.id}" formControlName="${field.name}">
        <option value="">Select...</option>
        ${field.options?.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('\n        ')}
      </select>
      <span *ngIf="formGroup.get('${field.name}')?.invalid && formGroup.get('${field.name}')?.touched" class="error">
        {{ getErrorMessage('${field.name}') }}
      </span>
    </div>`

    case 'checkbox':
      return `<div class="form-group">
      <div class="checkbox-group">
        <input
          type="checkbox"
          id="${field.id}"
          formControlName="${field.name}"
        />
        <label for="${field.id}">${field.label}${required}</label>
      </div>
      <span *ngIf="formGroup.get('${field.name}')?.invalid && formGroup.get('${field.name}')?.touched" class="error">
        {{ getErrorMessage('${field.name}') }}
      </span>
    </div>`

    case 'radio':
      return `<div class="form-group">
      <label>${field.label}${required}</label>
      <div class="radio-options">
        ${field.options?.map(opt => `<div class="radio-group">
          <input
            type="radio"
            id="${field.id}-${opt.value}"
            formControlName="${field.name}"
            value="${opt.value}"
          />
          <label for="${field.id}-${opt.value}">${opt.label}</label>
        </div>`).join('\n        ')}
      </div>
      <span *ngIf="formGroup.get('${field.name}')?.invalid && formGroup.get('${field.name}')?.touched" class="error">
        {{ getErrorMessage('${field.name}') }}
      </span>
    </div>`

    default:
      return `<div class="form-group">
      <label for="${field.id}">${field.label}${required}</label>
      <input
        type="${field.type}"
        id="${field.id}"
        formControlName="${field.name}"
        placeholder="${field.placeholder || ''}"
      />
      <span *ngIf="formGroup.get('${field.name}')?.invalid && formGroup.get('${field.name}')?.touched" class="error">
        {{ getErrorMessage('${field.name}') }}
      </span>
    </div>`
  }
}

const getValidators = (field: FormField): string => {
  if (!field.validation) return '[]'

  const validators: string[] = []

  if (field.validation.required) {
    validators.push('Validators.required')
  }
  if (field.validation.minLength) {
    validators.push(`Validators.minLength(${field.validation.minLength})`)
  }
  if (field.validation.maxLength) {
    validators.push(`Validators.maxLength(${field.validation.maxLength})`)
  }
  if (field.validation.pattern) {
    validators.push(`Validators.pattern(/${field.validation.pattern}/)`)
  }

  return validators.length > 0 ? `[${validators.join(', ')}]` : '[]'
}

const getDefaultValue = (field: FormField): string => {
  if (field.defaultValue !== undefined) {
    return typeof field.defaultValue === 'string' ? field.defaultValue : String(field.defaultValue)
  }
  if (field.type === 'checkbox') return 'false'
  if (field.type === 'number') return '0'
  return ''
}

const toPascalCase = (str: string): string => {
  return str.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()).replace(/\s+/g, '')
}

const toKebabCase = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, '-')
}

const getBorderRadius = (radius?: string): string => {
  switch (radius) {
    case 'none': return '0'
    case 'sm': return '0.25rem'
    case 'lg': return '0.75rem'
    case 'full': return '9999px'
    default: return '0.375rem'
  }
}

const getButtonAlignment = (alignment?: string): string => {
  switch (alignment) {
    case 'left': return ''
    case 'center': return 'display: block; margin-left: auto; margin-right: auto;'
    case 'right': return 'display: block; margin-left: auto;'
    case 'full': return 'width: 100%;'
    default: return 'width: 100%;'
  }
}

