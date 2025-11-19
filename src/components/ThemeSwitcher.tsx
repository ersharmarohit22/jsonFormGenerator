'use client'

import type { ReactNode } from 'react'
import { useTheme, type Theme } from '@/contexts/ThemeContext'
import { Sun, Moon, Monitor } from 'lucide-react'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const themes: { value: Theme; icon: ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
    { value: 'grey', icon: <Monitor className="w-4 h-4" />, label: 'Grey' },
    { value: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
  ]

  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 grey:bg-gray-300 rounded-lg p-1">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`
            flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all duration-200
            ${
              theme === t.value
                ? 'bg-white dark:bg-gray-700 grey:bg-gray-100 shadow-sm text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 grey:text-gray-700 hover:text-gray-900 dark:hover:text-gray-200 grey:hover:text-gray-900'
            }
          `}
          title={`${t.label} theme`}
          aria-label={`Switch to ${t.label} theme`}
        >
          {t.icon}
          <span className="text-sm font-medium hidden sm:inline">{t.label}</span>
        </button>
      ))}
    </div>
  )
}

