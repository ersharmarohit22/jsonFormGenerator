import type { FormSchema, FormField } from '@/types'

export const generateRemixCode = (schema: FormSchema): string => {
  const fields = schema.fields.map(field => generateFieldCode(field, schema.style)).join('\n\n')
  const styleClasses = generateStyleClasses(schema.style)
  const actionValidation = schema.fields.filter(f => f.validation).map(f => generateActionValidation(f)).join('\n  ')

  return `import { json, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  // Validation
  const errors: Record<string, string> = {};
  
${actionValidation}
  
  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }
  
  // Process form data
  console.log('Form submitted:', data);
  
  return json({ success: true, data });
}

export default function ${toPascalCase(schema.title)}Form() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className="max-w-2xl mx-auto p-6"${schema.style?.theme ? ` style={{ ${generateInlineStyles(schema.style.theme)} }}` : ''}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">${schema.title}</h2>
        ${schema.description ? `<p className="text-gray-600">${schema.description}</p>` : ''}
      </div>

      {actionData?.success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">Form submitted successfully!</p>
        </div>
      )}

      <div className="${styleClasses.container}">
${fields}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="${styleClasses.button} disabled:opacity-50 disabled:cursor-not-allowed"${schema.style?.theme?.buttonColor ? `\n          style={{ ${generateButtonStyles(schema.style.theme)} }}` : ''}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </Form>
  );
}`
}

const generateFieldCode = (field: FormField, style?: import('@/types').FormStyle): string => {
  const required = field.validation?.required
  const error = `{actionData?.errors?.${field.name} && (
          <p className="text-red-600 text-sm mt-1">{actionData.errors.${field.name}}</p>
        )}`
  const inputClass = getInputClassForGeneration(style)

  switch (field.type) {
    case 'textarea':
      return `        <div>
          <label htmlFor="${field.id}" className="block text-sm font-medium mb-2">
            ${field.label}${required ? ' *' : ''}
          </label>
          <textarea
            id="${field.id}"
            name="${field.name}"
            placeholder="${field.placeholder || ''}"
            defaultValue="${field.defaultValue || ''}"
            className="${inputClass}"
            rows={4}
            ${required ? 'required' : ''}
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
            name="${field.name}"
            defaultValue="${field.defaultValue || ''}"
            className="${inputClass}"
            ${required ? 'required' : ''}
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
              name="${field.name}"
              value="true"
              defaultChecked={${field.defaultValue || false}}
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
                defaultChecked={${field.defaultValue === opt.value}}
                className="w-4 h-4"
                ${required ? 'required' : ''}
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
            name="${field.name}"
            placeholder="${field.placeholder || ''}"
            defaultValue="${field.defaultValue || ''}"
            className="${inputClass}"
            ${required ? 'required' : ''}
          />
          ${error}
        </div>`
  }
}

const generateActionValidation = (field: FormField): string => {
  const validation = field.validation!
  const checks: string[] = []

  if (validation.required) {
    checks.push(`  if (!data.${field.name} || data.${field.name}.toString().trim() === '') {
    errors.${field.name} = '${field.label} is required';
  }`)
  }

  if (validation.minLength) {
    checks.push(`  if (data.${field.name} && data.${field.name}.toString().length < ${validation.minLength}) {
    errors.${field.name} = 'Minimum ${validation.minLength} characters required';
  }`)
  }

  if (validation.maxLength) {
    checks.push(`  if (data.${field.name} && data.${field.name}.toString().length > ${validation.maxLength}) {
    errors.${field.name} = 'Maximum ${validation.maxLength} characters allowed';
  }`)
  }

  if (validation.pattern) {
    checks.push(`  if (data.${field.name} && !/${validation.pattern}/.test(data.${field.name}.toString())) {
    errors.${field.name} = 'Invalid format';
  }`)
  }

  return checks.join('\n  ')
}

const toPascalCase = (str: string): string => {
  return str.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()).replace(/\s+/g, '')
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
  if (theme?.backgroundColor) styles.push(`backgroundColor: '${theme.backgroundColor}'`)
  if (theme?.textColor) styles.push(`color: '${theme.textColor}'`)
  return styles.join(', ')
}

const generateButtonStyles = (theme: import('@/types').FormStyle['theme']): string => {
  const styles: string[] = []
  if (theme?.buttonColor) styles.push(`backgroundColor: '${theme.buttonColor}'`)
  if (theme?.buttonTextColor) styles.push(`color: '${theme.buttonTextColor}'`)
  return styles.join(', ')
}

