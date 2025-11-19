/**
 * Security utilities for production
 */

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Validate JSON input securely
 */
export const secureJSONParse = <T>(jsonString: string): T | null => {
  try {
    // Remove any potential script tags or dangerous content
    const cleaned = jsonString.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    return JSON.parse(cleaned) as T
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('JSON parse error:', error)
    }
    return null
  }
}

/**
 * Rate limiting helper (client-side)
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map()

  isAllowed(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now()
    const attempts = this.attempts.get(key) || []
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(timestamp => now - timestamp < windowMs)
    
    if (recentAttempts.length >= maxAttempts) {
      return false
    }
    
    recentAttempts.push(now)
    this.attempts.set(key, recentAttempts)
    return true
  }

  reset(key: string): void {
    this.attempts.delete(key)
  }
}

/**
 * Check if running in production
 */
export const isProduction = process.env.NODE_ENV === 'production'

/**
 * Check if running in development
 */
export const isDevelopment = process.env.NODE_ENV === 'development'

/**
 * Safe console.log that only works in development
 */
export const devLog = (...args: unknown[]) => {
  if (isDevelopment) {
    console.log(...args)
  }
}

/**
 * Safe console.error that always works but logs to error tracking in production
 */
export const safeError = (error: Error, context?: string) => {
  if (isDevelopment) {
    console.error(context || 'Error:', error)
  } else {
    // In production, send to error tracking service
    // Example: Sentry.captureException(error)
    console.error('Error occurred') // Minimal logging
  }
}

