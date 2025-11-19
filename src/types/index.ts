export type FieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'tel'
  | 'url'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'time'
  | 'file'

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: string
  custom?: string
}

export interface SelectOption {
  label: string
  value: string
}

export interface FormField {
  id: string
  name: string
  label: string
  type: FieldType
  placeholder?: string
  defaultValue?: string | number | boolean
  options?: SelectOption[]
  validation?: ValidationRule
  description?: string
}

export interface FormStyle {
  layout?: 'vertical' | 'horizontal' | 'grid'
  columns?: number
  spacing?: 'compact' | 'normal' | 'relaxed'
  labelPosition?: 'top' | 'left' | 'floating'
  buttonAlignment?: 'left' | 'center' | 'right' | 'full'
  theme?: {
    primaryColor?: string
    backgroundColor?: string
    borderColor?: string
    textColor?: string
    buttonColor?: string
    buttonTextColor?: string
    focusColor?: string
  }
  fieldStyle?: {
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
    borderWidth?: 'thin' | 'normal' | 'thick'
    fieldHeight?: 'sm' | 'md' | 'lg'
  }
}

export interface FormSchema {
  title: string
  description?: string
  fields: FormField[]
  style?: FormStyle
}

export interface FormValues {
  [key: string]: any
}

export interface FieldError {
  message: string
}

export interface FormErrors {
  [key: string]: FieldError
}
