'use client'

import { useState, useRef } from 'react'
import { Upload, FileJson, AlertCircle } from 'lucide-react'

interface JSONEditorProps {
  value: string
  onChange: (value: string) => void
  error?: string | null
}

export function JSONEditor({ value, onChange, error }: JSONEditorProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      alert('Please upload a JSON file')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      onChange(text)
    }
    reader.readAsText(file)
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between flex-shrink-0">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 grey:text-gray-800">
          JSON Schema
        </label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 grey:bg-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 grey:hover:bg-gray-400 rounded-lg transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Upload JSON</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      <div
        className={`relative flex-1 ${dragActive ? 'ring-2 ring-blue-500' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your JSON schema here or drag & drop a JSON file..."
          className={`w-full h-full px-4 py-3 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-gray-100 grey:bg-gray-100 grey:text-gray-900 resize-none custom-scrollbar ${
            error 
              ? 'border-red-500 dark:border-red-500 grey:border-red-600' 
              : 'border-gray-300 dark:border-gray-600 grey:border-gray-400'
          }`}
        />
        
        {dragActive && (
          <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 grey:bg-blue-100/40 border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <FileJson className="w-12 h-12 mx-auto mb-2 text-blue-500" />
              <p className="text-blue-600 dark:text-blue-400 grey:text-blue-700 font-medium">
                Drop JSON file here
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-start space-x-2 p-3 bg-red-50 dark:bg-red-900/20 grey:bg-red-100/40 border border-red-200 dark:border-red-800 grey:border-red-400 rounded-lg flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              Invalid JSON
            </p>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {error}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

