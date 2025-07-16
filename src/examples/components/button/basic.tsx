import { Button } from "@/components/ui/button"

export default function BasicExample() {
  return (
    <div className="flex gap-4">
      <Button className="mix-blend-multiply">Default Button</Button>
      <Button variant="secondary" className="mix-blend-multiply">
        Secondary Button
      </Button>
      <Button variant="ghost">Ghost Button</Button>
    </div>
  )
}
