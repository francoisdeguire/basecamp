import { Button } from "../button"

export default function VariantsExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" className="opacity-50 cursor-not-allowed">
          Primary Disabled
        </Button>
        <Button variant="secondary" className="opacity-50 cursor-not-allowed">
          Secondary Disabled
        </Button>
        <Button variant="ghost" className="opacity-50 cursor-not-allowed">
          Ghost Disabled
        </Button>
      </div>
    </div>
  )
}
