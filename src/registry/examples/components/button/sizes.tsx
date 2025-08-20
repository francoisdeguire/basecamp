import { Button } from "@/components/registry-client"

export function ButtonSizes() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm">smol</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">BEEG</Button>
    </div>
  )
}
