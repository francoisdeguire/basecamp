import React from "react"

interface StackProps {
  children: React.ReactNode
  direction?: "row" | "column"
  spacing?: "xs" | "sm" | "md" | "lg" | "xl"
  align?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "end" | "between" | "around"
  className?: string
}

const spacingClasses = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
}

const directionClasses = {
  row: "flex-row",
  column: "flex-col",
}

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
}

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
}

export const Stack: React.FC<StackProps> = ({
  children,
  direction = "column",
  spacing = "md",
  align = "start",
  justify = "start",
  className = "",
}) => {
  const classes = [
    "flex",
    directionClasses[direction],
    spacingClasses[spacing],
    alignClasses[align],
    justifyClasses[justify],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return <div className={classes}>{children}</div>
}
