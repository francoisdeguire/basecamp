import { Button } from "@basecamp/components/button/button"
import { Stack } from "@basecamp/primitives/stack/stack"

export default function DocsIntroPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome to BaseCamp</h1>
        <p className="text-lg text-muted-foreground">
          A modern component library built with React, TypeScript, and Tailwind
          CSS.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="text-muted-foreground mb-6">
          BaseCamp provides a collection of reusable components and primitives
          that you can copy into your projects. Each component is designed to be
          customizable, accessible, and follows modern React patterns.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="font-semibold mb-3 text-lg">Components</h3>
            <p className="text-sm text-muted-foreground mb-4">
              High-level UI components like buttons, inputs, modals, and more.
              These are ready-to-use components that handle common UI patterns.
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                Button
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                Input
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                Modal
              </span>
            </div>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h3 className="font-semibold mb-3 text-lg">Primitives</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Low-level layout primitives that provide flexible building blocks
              for creating custom layouts and components.
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded">
                Stack
              </span>
              <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded">
                Grid
              </span>
              <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded">
                Container
              </span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Quick Example</h2>
        <div className="p-6 border rounded-lg bg-muted/50">
          <Stack spacing="md">
            <div className="flex gap-2">
              <Button>Get Started</Button>
              <Button variant="outline">Learn More</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              This example combines our Button component and Stack primitive to
              create a simple layout with consistent spacing.
            </p>
          </Stack>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">TypeScript</h3>
            <p className="text-sm text-muted-foreground">
              Full TypeScript support with comprehensive type definitions and
              IntelliSense.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Tailwind CSS</h3>
            <p className="text-sm text-muted-foreground">
              Built with Tailwind CSS for consistent styling and easy
              customization.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Accessible</h3>
            <p className="text-sm text-muted-foreground">
              Components follow accessibility best practices and ARIA
              guidelines.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-3">
            BaseCamp components are designed to be copied directly into your
            project. No npm install required!
          </p>
          <div className="bg-background border rounded p-3">
            <code className="text-sm">
              # Copy components directly from the docs # Each component includes
              all necessary dependencies
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What's Next?</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm">
              Browse the components to see what's available
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm">
              Copy components you need into your project
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm">
              Customize styles and behavior as needed
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
