'use client'

import Link from 'next/link'
import { FileJson } from 'lucide-react'
import { ThemeSwitcher } from './ThemeSwitcher'

export const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass-effect shadow-lg py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <FileJson className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:block">
              JSON Form Builder
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}
