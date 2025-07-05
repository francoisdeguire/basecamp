import { Stack } from "../stack"

export default function SpacingExample() {
  return (
    <div className="space-y-4">
      <Stack spacing="xs">
        <div className="p-2 bg-primary text-primary-foreground rounded text-sm">
          Extra Small
        </div>
        <div className="p-2 bg-secondary text-secondary-foreground rounded text-sm">
          Extra Small
        </div>
      </Stack>
      <Stack spacing="sm">
        <div className="p-2 bg-primary text-primary-foreground rounded text-sm">
          Small
        </div>
        <div className="p-2 bg-secondary text-secondary-foreground rounded text-sm">
          Small
        </div>
      </Stack>
      <Stack spacing="md">
        <div className="p-2 bg-primary text-primary-foreground rounded text-sm">
          Medium
        </div>
        <div className="p-2 bg-secondary text-secondary-foreground rounded text-sm">
          Medium
        </div>
      </Stack>
      <Stack spacing="lg">
        <div className="p-2 bg-primary text-primary-foreground rounded text-sm">
          Large
        </div>
        <div className="p-2 bg-secondary text-secondary-foreground rounded text-sm">
          Large
        </div>
      </Stack>
    </div>
  )
}

export const code = `<div className="space-y-4">
  <Stack spacing="xs">
    <div className="p-2 bg-primary text-primary-foreground rounded text-sm">Extra Small</div>
    <div className="p-2 bg-secondary text-secondary-foreground rounded text-sm">Extra Small</div>
  </Stack>
  <Stack spacing="sm">
    <div className="p-2 bg-primary text-primary-foreground rounded text-sm">Small</div>
    <div className="p-2 bg-secondary text-secondary-foreground rounded text-sm">Small</div>
  </Stack>
  <Stack spacing="md">
    <div className="p-2 bg-primary text-primary-foreground rounded text-sm">Medium</div>
    <div className="p-2 bg-secondary text-secondary-foreground rounded text-sm">Medium</div>
  </Stack>
  <Stack spacing="lg">
    <div className="p-2 bg-primary text-primary-foreground rounded text-sm">Large</div>
    <div className="p-2 bg-secondary text-secondary-foreground rounded text-sm">Large</div>
  </Stack>
</div>`
