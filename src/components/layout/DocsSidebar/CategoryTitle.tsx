import React from "react"

export function CategoryTitle({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium text-muted-foreground h-8 flex items-center pl-3">
      {children}
    </span>
  )
}
