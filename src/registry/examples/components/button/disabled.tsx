import { Button } from "@/registry/ui/button"

export function DisabledButtonExample() {
  return (
    <div className="flex items-center gap-4">
      <Button isDisabled>Can&apos;t touch this</Button>
    </div>
  )
}
