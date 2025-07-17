import { Button } from "@/registry/ui/button"

export function BasicExample() {
  return (
    <div className="flex gap-4">
      <Button>Default Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="ghost">Ghost Button</Button>
    </div>
  )
}
