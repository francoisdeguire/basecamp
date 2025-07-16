import React from "react"
import { loadAllExamples } from "@/lib/examples"
import { ComponentPreview } from "@/components/component-preview"

export default async function TestExamplesPage() {
  const buttonExamples = await loadAllExamples("button")

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Example System Test</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Button Examples</h2>
          <div className="space-y-6">
            {buttonExamples.map((example) => (
              <div key={example.name}>
                <h3 className="text-lg font-medium mb-2 capitalize">
                  {example.name} Example
                </h3>
                <ComponentPreview
                  name="button"
                  example={example.name}
                  initialCode={example.code}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Dynamic Loading Test</h2>
          <p className="text-gray-600 mb-4">
            These examples are loaded dynamically without initial data:
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Basic Button</h3>
              <ComponentPreview name="button" example="basic" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Variants</h3>
              <ComponentPreview name="button" example="variants" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Sizes</h3>
              <ComponentPreview name="button" example="sizes" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
