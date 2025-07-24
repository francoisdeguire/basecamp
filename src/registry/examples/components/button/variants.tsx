import { Button } from "@/registry/ui/button"

export function ButtonVariantsExample() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}
