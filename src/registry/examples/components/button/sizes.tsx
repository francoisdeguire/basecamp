import { Button } from "@/registry/ui/button"

export function ButtonSizesExample() {
  return (
    <div className="flex items-center gap-4">
      <Button size="sm">smol</Button>
      <Button size="default">Medium</Button>
      <Button size="lg">BEEG</Button>
    </div>
  )
}
