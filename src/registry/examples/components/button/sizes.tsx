import { Button } from "@/registry/ui/button"

export function ButtonSizes() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm">smol</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">BEEG</Button>
    </div>
  )
}
