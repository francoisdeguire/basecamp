import { Button } from "@basecamp/registry"

export function DisabledButton() {
  return (
    <div className="flex items-center gap-4">
      <Button isDisabled onPress={() => alert("This will not work")}>
        Can&apos;t touch this
      </Button>
    </div>
  )
}
