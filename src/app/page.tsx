'use client'

import { useState, useEffect } from 'react'
import { FileJson, Eye, Code, Sparkles } from 'lucide-react'
import type { FormSchema } from '@/types'
import { JSONEditor } from '@/components/JSONEditor'
import { FormRenderer } from '@/components/FormRenderer'
import { CodePreview } from '@/components/CodePreview'
import { ExampleSelector } from '@/components/ExampleSelector'
import { FormPreviewModal } from '@/components/FormPreviewModal'
import { FrameworkSelector } from '@/components/FrameworkSelector'
import { parseJSONSchema, getExampleSchema, schemaToJSON } from '@/lib/schemaParser'
import { generateCode, type Framework } from '@/lib/codeGenerator'
import type { ExampleSchema } from '@/lib/schemaExamples'

type TabType = 'preview' | 'code'

export default function Home() {
  const [jsonInput, setJsonInput] = useState('')
  const [schema, setSchema] = useState<FormSchema | null>(null)
  const [parseError, setParseError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('preview')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFramework, setSelectedFramework] = useState<Framework>('react')

  // Load example schema on mount
  useEffect(() => {
    const exampleSchema = getExampleSchema()
    const jsonString = schemaToJSON(exampleSchema)
    setJsonInput(jsonString)
    setSchema(exampleSchema)
  }, [])

  const handleJSONChange = (value: string) => {
    setJsonInput(value)
    
    if (!value.trim()) {
      setSchema(null)
      setParseError(null)
      return
    }

    const parsed = parseJSONSchema(value)
    if (parsed) {
      setSchema(parsed)
      setParseError(null)
    } else {
      setSchema(null)
      setParseError('Invalid JSON format or schema structure')
    }
  }

  const handleSelectExample = (example: ExampleSchema) => {
    const jsonString = schemaToJSON(example.schema)
    setJsonInput(jsonString)
    setSchema(example.schema)
    setParseError(null)
  }

  const generatedCode = schema ? generateCode(schema, selectedFramework) : ''

  return (
    <>
      {/* Modal */}
      {schema && (
        <FormPreviewModal
          schema={schema}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 grey:bg-blue-200/50 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 grey:text-blue-700" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 grey:text-blue-700">
              JSON to Form Generator
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Build Forms from JSON
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 grey:text-gray-800 max-w-2xl mx-auto">
            Paste your JSON schema, upload a file, or choose from 25+ ready-made templates to instantly generate beautiful, validated forms. Export code for React, Vue, Angular, Remix, or vanilla JavaScript.
          </p>

          <div className="mt-6 flex justify-center">
            <ExampleSelector onSelectExample={handleSelectExample} />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - JSON Editor */}
          <div className="space-y-6">
            <div className="glass-effect rounded-2xl p-6 h-[700px] flex flex-col">
              <div className="flex items-center space-x-2 mb-4 flex-shrink-0">
                <FileJson className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold">JSON Schema Input</h2>
              </div>
              <div className="flex-1 overflow-hidden">
                <JSONEditor
                  value={jsonInput}
                  onChange={handleJSONChange}
                  error={parseError}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Preview/Code */}
          <div className="space-y-6">
            <div className="glass-effect rounded-2xl p-6 h-[700px] flex flex-col">
              {/* Tabs */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200 dark:border-gray-700 grey:border-gray-400">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`flex items-center space-x-2 px-4 py-2 font-medium transition-colors border-b-2 -mb-3 ${
                      activeTab === 'preview'
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400 grey:text-blue-700'
                        : 'border-transparent text-gray-600 dark:text-gray-400 grey:text-gray-700 hover:text-gray-900 dark:hover:text-gray-200 grey:hover:text-gray-900'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Form Preview</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`flex items-center space-x-2 px-4 py-2 font-medium transition-colors border-b-2 -mb-3 ${
                      activeTab === 'code'
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400 grey:text-blue-700'
                        : 'border-transparent text-gray-600 dark:text-gray-400 grey:text-gray-700 hover:text-gray-900 dark:hover:text-gray-200 grey:hover:text-gray-900'
                    }`}
                  >
                    <Code className="w-4 h-4" />
                    <span>Generated Code</span>
                  </button>
                </div>

                {/* Full Size Button */}
                {schema && activeTab === 'preview' && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900/30 grey:bg-blue-200/50 text-blue-600 dark:text-blue-400 grey:text-blue-700 hover:bg-blue-200 dark:hover:bg-blue-900/50 grey:hover:bg-blue-300/60 rounded-lg transition-colors"
                    title="View full-size preview"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span>Full Size</span>
                  </button>
                )}
              </div>

              {/* Tab Content with fixed height and scroll */}
              <div className="flex-1 overflow-hidden flex flex-col">
                {!schema ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <FileJson className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600 grey:text-gray-500" />
                      <p className="text-gray-500 dark:text-gray-400 grey:text-gray-700">
                        Enter a valid JSON schema to see the form preview
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Framework Selector for Code Tab */}
                    {activeTab === 'code' && (
                      <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 grey:border-gray-400 flex-shrink-0">
                        <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300 grey:text-gray-800">
                          Select Framework
                        </label>
                        <FrameworkSelector
                          selected={selectedFramework}
                          onChange={setSelectedFramework}
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                      {activeTab === 'preview' ? (
                        <FormRenderer
                          schema={schema}
                          onSubmit={(values) => {
                            console.log('Form submitted:', values)
                          }}
                        />
                      ) : (
                        <CodePreview code={generatedCode} />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-effect p-6 rounded-xl">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 grey:bg-blue-200/50 rounded-lg flex items-center justify-center mb-4">
              <FileJson className="w-6 h-6 text-blue-600 dark:text-blue-400 grey:text-blue-700" />
            </div>
            <h3 className="text-lg font-semibold mb-2">JSON Schema Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 grey:text-gray-800">
              Paste or upload JSON schemas with full validation support including required fields, min/max lengths, and regex patterns.
            </p>
          </div>

          <div className="glass-effect p-6 rounded-xl">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 grey:bg-purple-200/50 rounded-lg flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400 grey:text-purple-700" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 grey:text-gray-800">
              See your form render in real-time as you edit the JSON schema with instant validation feedback.
            </p>
          </div>

          <div className="glass-effect p-6 rounded-xl">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 grey:bg-green-200/50 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-green-600 dark:text-green-400 grey:text-green-700" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Multi-Framework Export</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 grey:text-gray-800">
              Generate production-ready code for React, Vue, Angular, Remix, or vanilla JavaScript with validation and styling.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
