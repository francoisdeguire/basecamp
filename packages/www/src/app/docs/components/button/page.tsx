import { Button } from "@basecamp/components/button/button"

export default function ButtonPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Button</h1>
        <p className="text-lg text-muted-foreground">
          A versatile button component with multiple variants and sizes.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Basic Button</h3>
            <div className="p-4 border rounded-lg bg-muted/50">
              <Button>Click me</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Variants</h3>
            <div className="p-4 border rounded-lg bg-muted/50 space-y-2">
              <div className="flex gap-2 flex-wrap">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Sizes</h3>
            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex gap-2 items-center flex-wrap">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">🔍</Button>
              </div>
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
                  variant
                </td>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
                  | 'link'
                </td>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  'default'
                </td>
                <td className="border border-border px-4 py-2">
                  The visual style of the button
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  size
                </td>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  'default' | 'sm' | 'lg' | 'icon'
                </td>
                <td className="border border-border px-4 py-2 font-mono text-sm">
                  'default'
                </td>
                <td className="border border-border px-4 py-2">
                  The size of the button
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
