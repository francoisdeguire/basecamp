import { Stack } from "../stack"

export default function VerticalStackExample() {
  return (
    <Stack spacing="md">
      <div className="p-3 bg-primary text-primary-foreground rounded">
        Item 1
      </div>
      <div className="p-3 bg-secondary text-secondary-foreground rounded">
        Item 2
      </div>
      <div className="p-3 bg-accent text-accent-foreground rounded">Item 3</div>
    </Stack>
  )
}

export const code = `<Stack spacing="md">
  <div className="p-3 bg-primary text-primary-foreground rounded">Item 1</div>
  <div className="p-3 bg-secondary text-secondary-foreground rounded">Item 2</div>
  <div className="p-3 bg-accent text-accent-foreground rounded">Item 3</div>
</Stack>`
