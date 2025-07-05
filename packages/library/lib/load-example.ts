import { ComponentExample } from "./metadata"

// This is a simplified version - in a real implementation, you'd use
// a more sophisticated approach to load and parse the files
export interface LoadedExample {
  name: string
  description?: string
  component: React.ComponentType
  code: string
}

export async function loadExample(
  metadata: ComponentExample,
  componentPath: string
): Promise<LoadedExample> {
  // In a real implementation, this would dynamically import the example file
  // For now, we'll use a mapping approach
  const exampleMap: Record<string, any> = {
    "components/button/examples/basic.tsx": {
      component: (await import("../components/button/examples/basic")).default,
      code: (await import("../components/button/examples/basic")).code,
    },
    "components/button/examples/variants.tsx": {
      component: (await import("../components/button/examples/variants"))
        .default,
      code: (await import("../components/button/examples/variants")).code,
    },
    "components/button/examples/sizes.tsx": {
      component: (await import("../components/button/examples/sizes")).default,
      code: (await import("../components/button/examples/sizes")).code,
    },
    "components/button/examples/with-icon.tsx": {
      component: (await import("../components/button/examples/with-icon"))
        .default,
      code: (await import("../components/button/examples/with-icon")).code,
    },
    "primitives/stack/examples/vertical.tsx": {
      component: (await import("../primitives/stack/examples/vertical"))
        .default,
      code: (await import("../primitives/stack/examples/vertical")).code,
    },
    "primitives/stack/examples/horizontal.tsx": {
      component: (await import("../primitives/stack/examples/horizontal"))
        .default,
      code: (await import("../primitives/stack/examples/horizontal")).code,
    },
    "primitives/stack/examples/spacing.tsx": {
      component: (await import("../primitives/stack/examples/spacing")).default,
      code: (await import("../primitives/stack/examples/spacing")).code,
    },
  }

  const examplePath = `${componentPath}/${metadata.file}`
  const example = exampleMap[examplePath]

  if (!example) {
    throw new Error(`Example not found: ${examplePath}`)
  }

  return {
    name: metadata.name,
    description: metadata.description,
    component: example.component,
    code: example.code,
  }
}
