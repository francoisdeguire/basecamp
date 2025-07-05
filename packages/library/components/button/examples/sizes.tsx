import { Button } from "../button"

export default function SizesExample() {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🔍</Button>
    </div>
  )
}

export const code = `<div className="flex gap-2 items-center flex-wrap">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
  <Button size="icon">🔍</Button>
</div>`
