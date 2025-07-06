"use client"

import React, { useState } from "react"
import { loadExample } from "@/lib/examples"

interface ComponentPreviewProps {
  name: string
  example: string
  type?: "ui" | "primitive"
  initialCode?: string
}

export function ComponentPreview({
  name,
  example,
  type = "ui",
  initialCode,
}: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false)
  const [code, setCode] = useState(initialCode || "")
  const [ExampleComponent, setExampleComponent] =
    useState<React.ComponentType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copySuccess, setCopySuccess] = useState(false)

  // Load example data on client side
  React.useEffect(() => {
    setIsLoading(true)
    loadExample(name, example, type).then((exampleData) => {
      if (exampleData) {
        setCode(exampleData.code)
        setExampleComponent(() => exampleData.component)
      }
      setIsLoading(false)
    })
  }, [name, example, type])

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error("Failed to copy code:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
          <span>Loading example...</span>
        </div>
      </div>
    )
  }

  if (!ExampleComponent) {
    return (
      <div className="border rounded-lg p-4">
        <div className="text-red-500">Failed to load example</div>
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Header with tabs */}
      <div className="flex items-center justify-between border-b bg-gray-50">
        <div className="flex">
          <button
            onClick={() => setShowCode(false)}
            className={`px-4 py-3 text-sm font-medium transition-colors flex items-center space-x-2 ${
              !showCode
                ? "bg-white text-gray-900 border-b-2 border-blue-500"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>Preview</span>
          </button>
          <button
            onClick={() => setShowCode(true)}
            className={`px-4 py-3 text-sm font-medium transition-colors flex items-center space-x-2 ${
              showCode
                ? "bg-white text-gray-900 border-b-2 border-blue-500"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <span>Code</span>
          </button>
        </div>

        {showCode && (
          <button
            onClick={handleCopyCode}
            className="px-3 py-2 mr-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors flex items-center space-x-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>{copySuccess ? "Copied!" : "Copy"}</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {showCode ? (
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto font-mono">
              <code className="language-tsx">{code}</code>
            </pre>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[200px] bg-gray-50 rounded-lg">
            <ExampleComponent />
          </div>
        )}
      </div>
    </div>
  )
}
