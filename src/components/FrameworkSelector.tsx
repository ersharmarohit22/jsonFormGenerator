'use client'

import type { Framework } from '@/lib/codeGenerator'

interface FrameworkSelectorProps {
  selected: Framework
  onChange: (framework: Framework) => void
}

export function FrameworkSelector({ selected, onChange }: FrameworkSelectorProps) {
  const frameworks: { value: Framework; label: string; icon: string }[] = [
    { value: 'react', label: 'React', icon: '⚛️' },
    { value: 'vue', label: 'Vue', icon: '💚' },
    { value: 'angular', label: 'Angular', icon: '🅰️' },
    { value: 'remix', label: 'Remix', icon: '💿' },
    { value: 'javascript', label: 'JavaScript', icon: '📜' },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {frameworks.map((framework) => (
        <button
          key={framework.value}
          onClick={() => onChange(framework.value)}
          className={`
            flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium
            ${
              selected === framework.value
                ? 'bg-blue-600 text-white shadow-md transform scale-105'
                : 'bg-gray-100 dark:bg-gray-800 grey:bg-gray-300 text-gray-700 dark:text-gray-300 grey:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 grey:hover:bg-gray-400'
            }
          `}
          title={`Generate ${framework.label} code`}
        >
          <span className="text-base">{framework.icon}</span>
          <span>{framework.label}</span>
        </button>
      ))}
    </div>
  )
}

