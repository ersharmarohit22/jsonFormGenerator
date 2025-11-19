import type { FormSchema } from '@/types'
import { exampleSchemas } from './schemaExamples'

export const parseJSONSchema = (jsonString: string): FormSchema | null => {
  try {
    const parsed = JSON.parse(jsonString)
    
    // Validate schema structure
    if (!parsed.title || !parsed.fields || !Array.isArray(parsed.fields)) {
      throw new Error('Invalid schema: must have title and fields array')
    }

    // Validate each field
    parsed.fields.forEach((field: Record<string, unknown>, index: number) => {
      if (!field.name || !field.label || !field.type) {
        throw new Error(`Invalid field at index ${index}: missing required properties (name, label, type)`)
      }
    })

    return parsed as FormSchema
  } catch (error) {
    console.error('Error parsing JSON schema:', error)
    return null
  }
}

export const getExampleSchema = (): FormSchema => {
  // Return the first example schema (Contact Form)
  return exampleSchemas[0].schema
}

export const schemaToJSON = (schema: FormSchema, pretty: boolean = true): string => {
  return JSON.stringify(schema, null, pretty ? 2 : 0)
}

