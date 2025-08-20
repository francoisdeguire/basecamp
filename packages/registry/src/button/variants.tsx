import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] invalid:ring-destructive/20 dark:invalid:ring-destructive/40 invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        secondary:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        tertiary:
          "hover:bg-accent text-accent-foreground hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        md: "h-9 px-4 has-[>svg]:px-3",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
      destructive: {
        true: null,
        false: null,
      },
    },
    compoundVariants: [
      // Layout adjustments for link variant
      {
        variant: "link",
        size: ["sm", "md", "lg"],
        className: "p-0 h-max self-center",
      },

      // Destructive variants
      {
        variant: "primary",
        destructive: true,
        className:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      {
        variant: "secondary",
        destructive: true,
        className:
          "text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 hover:shadow-destructive/30 dark:hover:bg-destructive/50 dark:hover:text-destructive-foreground",
      },
      {
        variant: "tertiary",
        destructive: true,
        className:
          "text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 hover:shadow-destructive/30 dark:hover:bg-destructive/50 dark:hover:text-destructive-foreground",
      },
      {
        variant: "link",
        destructive: true,
        className: "text-destructive",
      },
    ],
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  }
)
