'use client'

import { X, Maximize2 } from 'lucide-react'
import { FormRenderer } from './FormRenderer'
import type { FormSchema } from '@/types'

interface FormPreviewModalProps {
  schema: FormSchema
  isOpen: boolean
  onClose: () => void
}

export const FormPreviewModal = ({ schema, isOpen, onClose }: FormPreviewModalProps) => {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Maximize2 className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold">Full Size Preview</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <FormRenderer
                schema={schema}
                onSubmit={(values) => {
                  console.log('Form submitted:', values)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

