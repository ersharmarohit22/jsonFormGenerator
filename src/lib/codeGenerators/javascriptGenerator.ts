import type { FormSchema, FormField } from '@/types'

export function generateJavaScriptCode(schema: FormSchema): string {
  const fields = schema.fields.map(field => generateFieldHTML(field)).join('\n      ')
  const validation = schema.fields.filter(f => f.validation).map(f => generateValidationJS(f)).join('\n    ')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${schema.title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      ${schema.style?.theme?.backgroundColor ? `background-color: ${schema.style.theme.backgroundColor};` : 'background-color: #f9fafb;'}
      ${schema.style?.theme?.textColor ? `color: ${schema.style.theme.textColor};` : ''}
    }
    
    form {
      background: white;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
    }
    
    .description {
      color: #6b7280;
      margin-bottom: 1.5rem;
    }
    
    .form-container {
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
    
    input, select, textarea {
      padding: 0.5rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 1rem;
      ${schema.style?.fieldStyle?.borderRadius === 'full' ? 'border-radius: 9999px;' : ''}
      ${schema.style?.fieldStyle?.borderRadius === 'lg' ? 'border-radius: 0.75rem;' : ''}
    }
    
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: ${schema.style?.theme?.focusColor || '#3b82f6'};
      ring: 2px;
    }
    
    .error {
      color: #dc2626;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: none;
    }
    
    .form-group.has-error input,
    .form-group.has-error select,
    .form-group.has-error textarea {
      border-color: #dc2626;
    }
    
    .form-group.has-error .error {
      display: block;
    }
    
    button {
      padding: 0.75rem 1.5rem;
      background-color: ${schema.style?.theme?.buttonColor || '#3b82f6'};
      color: ${schema.style?.theme?.buttonTextColor || 'white'};
      border: none;
      border-radius: 0.375rem;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 1.5rem;
      ${schema.style?.buttonAlignment === 'center' ? 'display: block; margin-left: auto; margin-right: auto;' : ''}
      ${schema.style?.buttonAlignment === 'right' ? 'display: block; margin-left: auto;' : ''}
      ${schema.style?.buttonAlignment === 'full' ? 'width: 100%;' : ''}
    }
    
    button:hover {
      opacity: 0.9;
    }
    
    .checkbox-group, .radio-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    
    @media (max-width: 768px) {
      .form-container {
        grid-template-columns: 1fr !important;
      }
    }
  </style>
</head>
<body>
  <form id="${toCamelCase(schema.title)}Form">
    <h2>${schema.title}</h2>
    ${schema.description ? `<p class="description">${schema.description}</p>` : ''}
    
    <div class="form-container">
      ${fields}
    </div>
    
    <button type="submit">Submit</button>
  </form>

  <script>
    const form = document.getElementById('${toCamelCase(schema.title)}Form');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Clear previous errors
      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('has-error');
      });
      
      let isValid = true;
      
      // Validation
${validation}
      
      if (isValid) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log('Form submitted:', data);
        alert('Form submitted successfully!');
        // Add your form submission logic here
      }
    });
  </script>
</body>
</html>`
}

function generateFieldHTML(field: FormField): string {
  const required = field.validation?.required ? ' *' : ''

  switch (field.type) {
    case 'textarea':
      return `<div class="form-group" data-field="${field.name}">
        <label for="${field.id}">${field.label}${required}</label>
        <textarea 
          id="${field.id}" 
          name="${field.name}"
          placeholder="${field.placeholder || ''}"
          rows="4"
          ${field.validation?.required ? 'required' : ''}
        ></textarea>
        <span class="error" data-error="${field.name}"></span>
      </div>`

    case 'select':
      return `<div class="form-group" data-field="${field.name}">
        <label for="${field.id}">${field.label}${required}</label>
        <select 
          id="${field.id}" 
          name="${field.name}"
          ${field.validation?.required ? 'required' : ''}
        >
          <option value="">Select...</option>
          ${field.options?.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('\n          ')}
        </select>
        <span class="error" data-error="${field.name}"></span>
      </div>`

    case 'checkbox':
      return `<div class="form-group" data-field="${field.name}">
        <div class="checkbox-group">
          <input 
            type="checkbox" 
            id="${field.id}" 
            name="${field.name}"
            ${field.defaultValue ? 'checked' : ''}
          />
          <label for="${field.id}">${field.label}${required}</label>
        </div>
        <span class="error" data-error="${field.name}"></span>
      </div>`

    case 'radio':
      return `<div class="form-group" data-field="${field.name}">
        <label>${field.label}${required}</label>
        ${field.options?.map(opt => `
        <div class="radio-group">
          <input 
            type="radio" 
            id="${field.id}-${opt.value}" 
            name="${field.name}" 
            value="${opt.value}"
          />
          <label for="${field.id}-${opt.value}">${opt.label}</label>
        </div>`).join('')}
        <span class="error" data-error="${field.name}"></span>
      </div>`

    default:
      return `<div class="form-group" data-field="${field.name}">
        <label for="${field.id}">${field.label}${required}</label>
        <input 
          type="${field.type}" 
          id="${field.id}" 
          name="${field.name}"
          placeholder="${field.placeholder || ''}"
          ${field.validation?.required ? 'required' : ''}
        />
        <span class="error" data-error="${field.name}"></span>
      </div>`
  }
}

function generateValidationJS(field: FormField): string {
  const validation = field.validation!
  const checks: string[] = []

  if (validation.required) {
    checks.push(`      const ${field.name}Value = form.elements['${field.name}'].value;
      if (!${field.name}Value || ${field.name}Value.trim() === '') {
        showError('${field.name}', '${field.label} is required');
        isValid = false;
      }`)
  }

  if (validation.minLength) {
    checks.push(`      if (form.elements['${field.name}'].value.length < ${validation.minLength}) {
        showError('${field.name}', 'Minimum ${validation.minLength} characters required');
        isValid = false;
      }`)
  }

  if (validation.maxLength) {
    checks.push(`      if (form.elements['${field.name}'].value.length > ${validation.maxLength}) {
        showError('${field.name}', 'Maximum ${validation.maxLength} characters allowed');
        isValid = false;
      }`)
  }

  if (validation.pattern) {
    checks.push(`      if (!/${validation.pattern}/.test(form.elements['${field.name}'].value)) {
        showError('${field.name}', 'Invalid format');
        isValid = false;
      }`)
  }

  return checks.join('\n      ')
}

function showErrorFunction(): string {
  return `    function showError(fieldName, message) {
      const group = document.querySelector(\`[data-field="\${fieldName}"]\`);
      const error = document.querySelector(\`[data-error="\${fieldName}"]\`);
      if (group) group.classList.add('has-error');
      if (error) error.textContent = message;
    }`
}

function toCamelCase(str: string): string {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
    index === 0 ? word.toLowerCase() : word.toUpperCase()
  ).replace(/\s+/g, '')
}

