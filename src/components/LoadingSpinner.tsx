export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-200 dark:border-primary-800 rounded-full" />
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}

