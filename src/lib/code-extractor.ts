// Client-side code extraction utility
// This is a simple approach to get source code from example components

const exampleCodeMap: Record<string, string> = {
  // Button examples
  "button-basic": `import { Button } from "@/components/ui/button"

export default function BasicExample() {
  return (
    <div className="flex gap-4">
      <Button>Default Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="ghost">Ghost Button</Button>
    </div>
  )
}`,
  "button-variants": `import { Button } from "@/components/ui/button"

export default function VariantsExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" className="opacity-50 cursor-not-allowed">
          Primary Disabled
        </Button>
        <Button variant="secondary" className="opacity-50 cursor-not-allowed">
          Secondary Disabled
        </Button>
        <Button variant="ghost" className="opacity-50 cursor-not-allowed">
          Ghost Disabled
        </Button>
      </div>
    </div>
  )
}`,
  "button-sizes": `import { Button } from "@/components/ui/button"

export default function SizesExample() {
  return (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}`,

  // Box examples
  "box-basic": `import { Box } from "@/components/ui/box"

export default function BasicExample() {
  return (
    <div className="space-y-4">
      <Box className="p-4 bg-blue-100 rounded">
        This is a basic box with blue background
      </Box>
      <Box className="p-4 bg-gray-100 rounded border">
        This is a box with gray background and border
      </Box>
      <Box className="p-4 bg-green-100 rounded shadow">
        This is a box with green background and shadow
      </Box>
    </div>
  )
}`,
  "box-as-element": `import { Box } from "@/components/ui/box"

export default function AsElementExample() {
  return (
    <div className="space-y-4">
      <Box as="section" className="p-4 bg-gray-100">
        This box renders as a section element
      </Box>
      <Box as="article" className="p-4 bg-white border rounded">
        This box renders as an article element
      </Box>
      <Box as="aside" className="p-4 bg-yellow-100 rounded">
        This box renders as an aside element
      </Box>
      <Box as="header" className="p-4 bg-blue-100 rounded">
        This box renders as a header element
      </Box>
    </div>
  )
}`,
}

export function getExampleCode(
  componentName: string,
  exampleName: string
): string {
  const key = `${componentName}-${exampleName}`
  return (
    exampleCodeMap[key] ||
    `// No code available for ${componentName}/${exampleName}`
  )
}
