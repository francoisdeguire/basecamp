"use client"

import { Button } from "@/registry/ui/button"

export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  )
}
