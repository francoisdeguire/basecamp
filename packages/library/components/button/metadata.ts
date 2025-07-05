import { ComponentMetadata } from "../../lib/metadata"

export const buttonMetadata: ComponentMetadata = {
  name: "Button",
  description: "A versatile button component with multiple variants and sizes.",
  category: "components",
  examples: [
    {
      name: "Basic Button",
      description: "A simple button with default styling.",
      file: "examples/basic.tsx",
    },
    {
      name: "Variants",
      description: "Different visual styles for different use cases.",
      file: "examples/variants.tsx",
    },
    {
      name: "Sizes",
      description: "Various sizes to fit different contexts.",
      file: "examples/sizes.tsx",
    },
    {
      name: "With Icon",
      description: "Buttons can include icons for better visual communication.",
      file: "examples/with-icon.tsx",
    },
  ],
  props: {
    variant: {
      name: "variant",
      type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
      default: "'default'",
      description: "The visual style of the button",
      required: false,
    },
    size: {
      name: "size",
      type: "'default' | 'sm' | 'lg' | 'icon'",
      default: "'default'",
      description: "The size of the button",
      required: false,
    },
    className: {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
      required: false,
    },
  },
  dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  imports: ["cn"],
  customSections: [
    {
      title: "Links",
      order: 1, // This will appear after Examples but before Props
      content: `## Using Button as Links

The Button component can be used as a link by wrapping it in an anchor tag or using it as a link button.

### As an Anchor

\`\`\`tsx
<a href="/dashboard">
  <Button>Go to Dashboard</Button>
</a>
\`\`\`

### As a Link Button

\`\`\`tsx
<Button asChild>
  <a href="/settings">Settings</a>
</Button>
\`\`\`

### External Links

\`\`\`tsx
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  <Button variant="outline">Visit External Site</Button>
</a>
\`\`\`

### Programmatic Navigation

\`\`\`tsx
import { useRouter } from 'next/router'

function NavigationButton() {
  const router = useRouter()
  
  return (
    <Button onClick={() => router.push('/profile')}>
      View Profile
    </Button>
  )
}
\`\`\`

> **Note**: When using buttons as links, ensure proper accessibility by using semantic HTML and providing appropriate ARIA attributes when needed.`,
    },
  ],
}
