import type { FormStyle } from '@/types'

export function getFormContainerClass(style?: FormStyle): string {
  const spacing = {
    compact: 'space-y-3',
    normal: 'space-y-6',
    relaxed: 'space-y-8',
  }[style?.spacing || 'normal']

  const layout = style?.layout || 'vertical'
  
  if (layout === 'grid') {
    const cols = style?.columns || 2
    return `grid grid-cols-1 md:grid-cols-${cols} gap-6`
  }
  
  return spacing
}

export function getFieldContainerClass(style?: FormStyle): string {
  const layout = style?.layout || 'vertical'
  const labelPosition = style?.labelPosition || 'top'
  
  if (layout === 'horizontal' || labelPosition === 'left') {
    return 'flex items-center space-x-4'
  }
  
  return ''
}

export function getInputClass(style?: FormStyle, hasError: boolean = false): string {
  const borderRadius = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  }[style?.fieldStyle?.borderRadius || 'md']

  const borderWidth = {
    thin: 'border',
    normal: 'border-2',
    thick: 'border-4',
  }[style?.fieldStyle?.borderWidth || 'thin']

  const height = {
    sm: 'py-1.5',
    md: 'py-2',
    lg: 'py-3',
  }[style?.fieldStyle?.fieldHeight || 'md']

  const borderColor = hasError
    ? 'border-red-500 dark:border-red-500'
    : `border-gray-300 dark:border-gray-600`

  return `w-full px-4 ${height} ${borderWidth} ${borderRadius} ${borderColor} focus:ring-2 focus:border-transparent transition-colors dark:bg-gray-800 dark:text-white`
}

export function getButtonClass(style?: FormStyle): string {
  const alignment = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
    full: 'w-full',
  }[style?.buttonAlignment || 'full']

  const borderRadius = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  }[style?.fieldStyle?.borderRadius || 'md']

  return `${alignment} px-6 py-3 ${borderRadius} font-semibold transition-colors shadow-lg hover:shadow-xl`
}

export function getLabelClass(style?: FormStyle): string {
  const labelPosition = style?.labelPosition || 'top'
  
  if (labelPosition === 'left') {
    return 'block text-sm font-medium min-w-[120px]'
  }
  
  if (labelPosition === 'floating') {
    return 'absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
  }
  
  return 'block text-sm font-medium mb-2'
}

export function getThemeStyles(style?: FormStyle): React.CSSProperties {
  const theme = style?.theme || {}
  
  return {
    ...(theme.backgroundColor && { backgroundColor: theme.backgroundColor }),
    ...(theme.textColor && { color: theme.textColor }),
  }
}

export function getButtonStyles(style?: FormStyle): React.CSSProperties {
  const theme = style?.theme || {}
  
  return {
    ...(theme.buttonColor && { backgroundColor: theme.buttonColor }),
    ...(theme.buttonTextColor && { color: theme.buttonTextColor }),
  }
}

export function getFocusRingColor(style?: FormStyle): string {
  const focusColor = style?.theme?.focusColor
  
  if (focusColor) {
    return `focus:ring-[${focusColor}]`
  }
  
  return 'focus:ring-blue-500'
}

