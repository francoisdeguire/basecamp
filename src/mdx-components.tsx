import * as React from "react"
import Link from "next/link"
import type { MDXComponents } from "mdx/types"

import { cn } from "@/lib/utils"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"
import { SourceCode } from "@/components/source-code"
import { CopyButton } from "@/components/copy-button"
import { PropsTable } from "@/components/props-table"
import { Button } from "@/components/registry-client"
import { CodeTabs, CodeTabsContent } from "./components/code-tabs"
import { LinkPills } from "@/components/link-pills"

// Extract raw text from code children for copy button
const extractTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === "string") {
    return children
  }
  if (React.isValidElement(children)) {
    const childProps = children.props as {
      children?: React.ReactNode
      __raw__?: string
    }
    // Check for raw text from rehype-pretty-code
    if (childProps.__raw__) {
      return childProps.__raw__
    }
    if (childProps.children) {
      return extractTextFromChildren(childProps.children)
    }
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("")
  }
  return ""
}

// Shared component definitions - no more duplication!
const sharedComponents = {
  h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
    <h1
      className={cn(
        "mt-2 scroll-m-24 text-3xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.ComponentProps<"h2">) => {
    return (
      <h2
        id={props.children
          ?.toString()
          .replace(/ /g, "-")
          .replace(/'/g, "")
          .replace(/\?/g, "")
          .toLowerCase()}
        className={cn(
          "mt-12 scroll-m-24 text-2xl tracking-tight first:mt-0 lg:mt-24 [&+p]:!mt-3 *:[code]:text-2xl font-medium",
          className
        )}
        {...props}
      />
    )
  },
  h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "mt-8 scroll-m-24 text-xl font-medium tracking-tight [&+p]:!mt-2",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
    <h4
      className={cn(
        "mt-6 scroll-m-24 text-lg font-medium tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.ComponentProps<"h5">) => (
    <h5
      className={cn(
        "mt-6 scroll-m-24 text-lg font-medium tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.ComponentProps<"h6">) => (
    <h6
      className={cn(
        "mt-6 scroll-m-24 text-base font-medium tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.ComponentProps<"a">) => (
    <a
      className={cn(
        "font-medium underline-offset-4 underline-red-500",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <p className={cn("[&:not(:first-child)]:mt-6", className)} {...props} />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={cn("font-medium", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.ComponentProps<"hr">) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <div className="my-6 w-full overflow-y-auto">
      <table
        className={cn(
          "relative w-full overflow-hidden border-none text-sm",
          className
        )}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
    <tr
      className={cn("last:border-b-none m-0 border-b", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.ComponentProps<"th">) => (
    <th
      className={cn(
        "px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentProps<"td">) => (
    <td
      className={cn(
        "px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => {
    const rawText = extractTextFromChildren(children)

    return (
      <div className="relative -mx-4">
        {rawText && <CopyButton value={rawText} />}
        <pre
          className={cn(
            "no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none bg-muted rounded-md mt-4",
            // Handle rehype-pretty-code classes
            "[&_code]:bg-transparent [&_code]:p-0",
            className
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    )
  },
  figure: ({ className, ...props }: React.ComponentProps<"figure">) => {
    return <figure className={cn(className)} {...props} />
  },
  figcaption: ({
    className,
    children,
    ...props
  }: React.ComponentProps<"figcaption">) => {
    return (
      <figcaption
        className={cn(
          "text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70",
          className
        )}
        {...props}
      >
        {children}
      </figcaption>
    )
  },
  code: ({ className, ...props }: React.ComponentProps<"code">) => {
    // Check if this is inline code vs code block
    // Inline code typically has no className, or doesn't have syntax highlighting classes
    const isInlineCode =
      !className ||
      (!className.includes("language-") && !className.includes("shiki"))

    if (isInlineCode) {
      // Inline Code - when used outside of pre tags
      return (
        <code
          className={cn(
            "bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.9rem] outline-none font-medium",
            className
          )}
          {...props}
        />
      )
    }

    // Code block content - when used inside pre tags or highlighted by rehype-pretty-code
    return (
      <code
        className={cn(
          "font-mono",
          // Ensure proper styling for highlighted code
          "[&_span]:font-mono",
          className
        )}
        {...props}
      />
    )
  },
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "mt-16 text-base space-y-4 scroll-m-32 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step steps mb-32 [counter-reset:step] *:[h3]:first:!mt-0"
      {...props}
    />
  ),

  // Custom components
  Button,
  ComponentPreview,
  ComponentSource,
  SourceCode,
  CodeTabs,
  CodeTabsContent,
  PropsTable,
  LinkPills,
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        "bg-surface text-surface-foreground hover:bg-surface/80 flex w-full flex-col items-center rounded-xl p-6 transition-colors sm:p-10",
        className
      )}
      {...props}
    />
  ),
}

// Define MDX components for use with Next.js 15
/* eslint-disable @typescript-eslint/no-explicit-any */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...Object.fromEntries(
      Object.entries(sharedComponents).map(([key, Component]) => [
        key,
        Component as any,
      ])
    ),
    ...components,
  }
}

// Legacy export for compatibility with next-mdx-remote
export const mdxComponents = sharedComponents
