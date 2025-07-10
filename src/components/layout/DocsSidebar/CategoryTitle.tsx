import React from "react"

export function CategoryTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-medium text-muted-foreground h-8 flex items-center">
      {children}
    </div>
  )
}
