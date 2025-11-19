import { LoadingSpinner } from '@/components/LoadingSpinner'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
          Loading amazing content...
        </p>
      </div>
    </div>
  )
}

