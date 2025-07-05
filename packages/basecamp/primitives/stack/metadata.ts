import { ComponentMetadata } from "@basecamp/ui/utils"

export const stackMetadata: ComponentMetadata = {
  name: "Stack",
  description:
    "A flexible layout primitive for stacking elements vertically or horizontally.",
  category: "primitives",
  examples: [
    {
      name: "Vertical Stack",
      description: "Default vertical stacking with consistent spacing.",
      file: "examples/vertical.tsx",
    },
    {
      name: "Horizontal Stack",
      description: "Horizontal layout for side-by-side elements.",
      file: "examples/horizontal.tsx",
    },
    {
      name: "Spacing Variants",
      description: "Different spacing options for various layouts.",
      file: "examples/spacing.tsx",
    },
  ],
  props: {
    direction: {
      name: "direction",
      type: "'row' | 'column'",
      default: "'column'",
      description: "The direction to stack elements",
      required: false,
    },
    spacing: {
      name: "spacing",
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      description: "The spacing between stacked elements",
      required: false,
    },
    align: {
      name: "align",
      type: "'start' | 'center' | 'end' | 'stretch'",
      default: "'start'",
      description: "How to align items",
      required: false,
    },
    justify: {
      name: "justify",
      type: "'start' | 'center' | 'end' | 'between' | 'around'",
      default: "'start'",
      description: "How to justify content",
      required: false,
    },
    className: {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
      required: false,
    },
  },
  dependencies: ["clsx", "tailwind-merge"],
  imports: ["cn"],
}
