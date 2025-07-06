"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button/button"
import { Box } from "@/components/primitives/box/box"

interface ComponentPreviewProps {
  name: string
  example: string
}

export function ComponentPreview({ name, example }: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false)

  // This is a placeholder - in the real implementation, you'd load examples dynamically
  const getExampleCode = () => {
    switch (name) {
      case "button":
        switch (example) {
          case "basic":
            return `<Button>Click me</Button>`
          case "variants":
            return `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>`
          case "sizes":
            return `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`
          default:
            return `// Example code for ${name} - ${example}`
        }
      case "box":
        switch (example) {
          case "basic":
            return `<Box className="p-4 bg-blue-100 rounded">
  This is a basic box
</Box>`
          case "as-element":
            return `<Box as="section" className="p-4 bg-gray-100">
  This box renders as a section element
</Box>`
          default:
            return `// Example code for ${name} - ${example}`
        }
      default:
        return `// Example code for ${name} - ${example}`
    }
  }

  const renderExample = () => {
    switch (name) {
      case "button":
        switch (example) {
          case "basic":
            return <Button>Click me</Button>
          case "variants":
            return (
              <div className="flex gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            )
          case "sizes":
            return (
              <div className="flex gap-2 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            )
          default:
            return (
              <div className="p-4 bg-gray-100 rounded">
                Example: {name} - {example}
              </div>
            )
        }
      case "box":
        switch (example) {
          case "basic":
            return (
              <Box className="p-4 bg-blue-100 rounded">This is a basic box</Box>
            )
          case "as-element":
            return (
              <Box as="section" className="p-4 bg-gray-100">
                This box renders as a section element
              </Box>
            )
          default:
            return (
              <div className="p-4 bg-gray-100 rounded">
                Example: {name} - {example}
              </div>
            )
        }
      default:
        return (
          <div className="p-4 bg-gray-100 rounded">
            Example: {name} - {example}
          </div>
        )
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex border-b">
        <button
          onClick={() => setShowCode(false)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            !showCode
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setShowCode(true)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            showCode
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Code
        </button>
      </div>

      <div className="p-4">
        {showCode ? (
          <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
            <code>{getExampleCode()}</code>
          </pre>
        ) : (
          <div className="flex justify-center p-4">{renderExample()}</div>
        )}
      </div>
    </div>
  )
}
