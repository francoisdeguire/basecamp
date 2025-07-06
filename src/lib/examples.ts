import { getExampleCode } from "./code-extractor"

export interface ExampleInfo {
  name: string
  component: React.ComponentType
  code: string
}

// Client-side example loading
export async function loadExample(
  componentName: string,
  exampleName: string,
  type: "ui" | "primitive" = "ui"
): Promise<ExampleInfo | null> {
  try {
    const basePath = type === "ui" ? "ui" : "primitives"

    // Dynamic import of the example component
    const exampleModule = await import(
      `@/components/${basePath}/${componentName.toLowerCase()}/examples/${exampleName}`
    )
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

// Client-side example listing
export async function loadAllExamples(
  componentName: string,
  type: "ui" | "primitive" = "ui"
): Promise<ExampleInfo[]> {
  // Define available examples for each component
  const componentExamples: Record<string, string[]> = {
    button: ["basic", "variants", "sizes"],
    box: ["basic", "as-element"],
  }

  const exampleNames = componentExamples[componentName] || []
  const examples: ExampleInfo[] = []

  for (const exampleName of exampleNames) {
    try {
      const example = await loadExample(componentName, exampleName, type)
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
