import React from "react"

export function CategoryTitle({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium text-muted-foreground h-[30px] flex items-center pl-3 select-none">
      {children}
    </span>
  )
}
