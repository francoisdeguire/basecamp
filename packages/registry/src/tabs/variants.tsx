import { cva, type VariantProps } from "class-variance-authority"

export const tabsVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "flex flex-col",
      vertical: "flex flex-row",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

export const tabListVariants = cva(
  "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col h-auto w-fit",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

export const tabVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected=true]:bg-background data-[selected=true]:text-foreground data-[selected=true]:shadow",
  {
    variants: {
      variant: {
        default: "",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground data-[selected=true]:bg-background",
        underline:
          "rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 pt-2 font-semibold text-muted-foreground shadow-none data-[selected=true]:border-primary data-[selected=true]:bg-transparent data-[selected=true]:text-foreground",
      },
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export const tabPanelVariants = cva(
  "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {},
    defaultVariants: {},
  }
)

export type TabsVariants = VariantProps<typeof tabsVariants>
export type TabListVariants = VariantProps<typeof tabListVariants>
export type TabVariants = VariantProps<typeof tabVariants>
export type TabPanelVariants = VariantProps<typeof tabPanelVariants>
