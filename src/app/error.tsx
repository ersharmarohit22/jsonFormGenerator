'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Page error:', error)
    }
    // In production, you would log this to an error tracking service
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full glass-effect rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Oops! Something went wrong
          </h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We encountered an unexpected error while loading this page. This has been logged and we'll look into it.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-2">
              Error details (dev mode only)
            </summary>
            <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
              <p className="text-xs font-mono text-red-600 dark:text-red-400 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-gray-500 mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          </details>
        )}

        <div className="flex space-x-3">
          <button
            onClick={() => reset()}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  )
}

