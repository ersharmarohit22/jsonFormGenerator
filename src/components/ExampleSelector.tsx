'use client'

import { useState } from 'react'
import { FileJson, ChevronDown } from 'lucide-react'
import { exampleSchemas, categories, type ExampleSchema } from '@/lib/schemaExamples'

interface ExampleSelectorProps {
  onSelectExample: (example: ExampleSchema) => void
}

export const ExampleSelector = ({ onSelectExample }: ExampleSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredExamples = selectedCategory === 'all'
    ? exampleSchemas
    : exampleSchemas.filter(ex => ex.category === selectedCategory)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
      >
        <FileJson className="w-4 h-4" />
        <span>Load Example</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-96 glass-effect rounded-xl shadow-2xl z-20 max-h-[600px] overflow-hidden flex flex-col">
            {/* Header with filters */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-3">Choose a Template</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      selectedCategory === cat.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Examples list */}
            <div className="overflow-y-auto p-2">
              {filteredExamples.map(example => (
                <button
                  key={example.id}
                  onClick={() => {
                    onSelectExample(example)
                    setIsOpen(false)
                  }}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mb-1"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileJson className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1">{example.name}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {example.description}
                      </p>
                      <div className="mt-1">
                        <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded-full">
                          {example.schema.fields.length} fields
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {filteredExamples.length === 0 && (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No examples found in this category
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

