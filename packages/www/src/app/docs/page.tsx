export default function DocsPage() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Welcome to BaseCamp</h1>
      <p className="text-lg text-muted-foreground">
        A modern component library built with React and Tailwind CSS.
      </p>

      <h2>Getting Started</h2>
      <p>
        BaseCamp provides a collection of reusable components and primitives to
        help you build beautiful, accessible user interfaces quickly.
      </p>

      <h3>What's Included</h3>
      <ul>
        <li>
          <strong>Components</strong> - High-level, feature-rich components like
          Button, Card, Modal
        </li>
        <li>
          <strong>Primitives</strong> - Low-level building blocks like Stack,
          Box, Text
        </li>
        <li>
          <strong>Documentation</strong> - Comprehensive guides and examples
        </li>
      </ul>

      <h3>Quick Start</h3>
      <p>
        Browse the sidebar to explore our components and primitives. Each page
        includes live examples, usage instructions, and API documentation.
      </p>
    </div>
  )
}
