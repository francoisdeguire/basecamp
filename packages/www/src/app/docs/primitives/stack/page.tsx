import { Stack } from "@basecamp/primitives/stack/stack"

export default function StackPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Stack</h1>
        <p className="text-lg text-muted-foreground">
          A flexible layout primitive for stacking elements vertically or
          horizontally.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Vertical Stack</h3>
            <div className="p-4 border rounded-lg bg-muted/50">
              <Stack spacing="md">
                <div className="p-3 bg-primary text-primary-foreground rounded">
                  Item 1
                </div>
                <div className="p-3 bg-secondary text-secondary-foreground rounded">
                  Item 2
                </div>
                <div className="p-3 bg-accent text-accent-foreground rounded">
                  Item 3
                </div>
              </Stack>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Horizontal Stack</h3>
            <div className="p-4 border rounded-lg bg-muted/50">
              <Stack direction="row" spacing="md">
                <div className="p-3 bg-primary text-primary-foreground rounded">
                  Item 1
                </div>
                <div className="p-3 bg-secondary text-secondary-foreground rounded">
                  Item 2
                </div>
                <div className="p-3 bg-accent text-accent-foreground rounded">
                  Item 3
                </div>
              </Stack>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Spacing Variants</h3>
            <div className="p-4 border rounded-lg bg-muted/50 space-y-4">
              <Stack spacing="xs">
                <div className="p-2 bg-primary text-primary-foreground rounded text-sm">
                  Extra Small Spacing
                </div>
                <div className="p-2 bg-secondary text-secondary-foreground rounded text-sm">
                  Extra Small Spacing
                </div>
              </Stack>
              <Stack spacing="sm">
                <div className="p-2 bg-primary text-primary-foreground rounded text-sm">
                  Small Spacing
                </div>
                <div className="p-2 bg-secondary text-secondary-foreground rounded text-sm">
                  Small Spacing
                </div>
              </Stack>
              <Stack spacing="md">
                <div className="p-2 bg-primary text-primary-foreground rounded text-sm">
                  Medium Spacing
                </div>
                <div className="p-2 bg-secondary text-secondary-foreground rounded text-sm">
                  Medium Spacing
                </div>
              </Stack>
              <Stack spacing="lg">
                <div className="p-2 bg-primary text-primary-foreground rounded text-sm">
                  Large Spacing
                </div>
                <div className="p-2 bg-secondary text-secondary-foreground rounded text-sm">
                  Large Spacing
                </div>
              </Stack>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border px-4 py-2 text-left">
                  Prop
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  Type
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  Default
                </th>
                <th className="border border-border px-4 py-2 text-left">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  direction
                </td>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  'row' | 'column'
                </td>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  'column'
                </td>
                <td className="border border-border px-4 py-2">
                  The direction to stack elements
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  spacing
                </td>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  'xs' | 'sm' | 'md' | 'lg' | 'xl'
                </td>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  'md'
                </td>
                <td className="border border-border px-4 py-2">
                  The spacing between stacked elements
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  align
                </td>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  'start' | 'center' | 'end' | 'stretch'
                </td>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  'start'
                </td>
                <td className="border border-border px-4 py-2">
                  How to align items
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  justify
                </td>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  'start' | 'center' | 'end' | 'between' | 'around'
                </td>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  'start'
                </td>
                <td className="border border-border px-4 py-2">
                  How to justify content
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  className
                </td>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  string
                </td>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  -
                </td>
                <td className="border border-border px-4 py-2">
                  Additional CSS classes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
