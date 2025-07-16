import { getExampleCode } from "./code-extractor"
import { dynamicImportMap, componentExamplesMap } from "./dynamic-imports"

export interface ExampleInfo {
  name: string
  component: React.ComponentType
  code: string
}

// Client-side example loading using dynamic imports
export async function loadExample(
  componentName: string,
  exampleName: string
): Promise<ExampleInfo | null> {
  try {
    const key = `${componentName.toLowerCase()}-${exampleName}`
    const importFn = dynamicImportMap[key]

    if (!importFn) {
      throw new Error(`No import mapping found for ${key}`)
    }

    const exampleModule = await importFn()
    const ExampleComponent = exampleModule.default

    // Get the actual source code
    const code = getExampleCode(componentName, exampleName)

    return {
      name: exampleName,
      component: ExampleComponent,
      code: code,
    }
  } catch (error) {
    console.error(
      `Failed to load example ${exampleName} for ${componentName}:`,
      error
    )
    return null
  }
}

// Client-side example listing using dynamic component examples map
export async function loadAllExamples(
  componentName: string
): Promise<ExampleInfo[]> {
  // Get available examples from dynamically generated map
  const exampleNames = componentExamplesMap[componentName] || []
  const examples: ExampleInfo[] = []

  for (const exampleName of exampleNames) {
    try {
      const example = await loadExample(componentName, exampleName)
      if (example) {
        examples.push(example)
      }
    } catch {
      // Skip examples that don't exist
      continue
    }
  }

  return examples
}
