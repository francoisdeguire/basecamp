import { getExampleCode } from "./code-extractor"

export interface ExampleInfo {
  name: string
  component: React.ComponentType
  code: string
}

// Client-side example loading
export async function loadExample(
  componentName: string,
  exampleName: string
): Promise<ExampleInfo | null> {
  try {
    // Static mapping for dynamic imports
    const importMap: Record<
      string,
      () => Promise<{ default: React.ComponentType }>
    > = {
      "button-basic": () =>
        import("@/registry/examples/components/button/basic"),
      "button-variants": () =>
        import("@/registry/examples/components/button/variants"),
      "button-sizes": () =>
        import("@/registry/examples/components/button/sizes"),
      "box-basic": () => import("@/registry/examples/primitives/box/basic"),
      "box-as-element": () =>
        import("@/registry/examples/primitives/box/as-element"),
    }

    const key = `${componentName.toLowerCase()}-${exampleName}`
    const importFn = importMap[key]

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

// Client-side example listing
export async function loadAllExamples(
  componentName: string
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
