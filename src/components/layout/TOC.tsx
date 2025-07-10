"use client"

import * as React from "react"
import { TocItem } from "@/lib/toc"
import { cn } from "@/lib/utils"

interface TocProps {
  toc: TocItem[]
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () => toc.map((item) => item.id).filter(Boolean),
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)

  if (!toc?.length) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <Tree items={toc} activeItem={activeHeading} />
    </div>
  )
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds?.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

interface TreeProps {
  items: TocItem[]
  level?: number
  activeItem?: string | null
}

function Tree({ items, level = 1, activeItem }: TreeProps) {
  return items?.length && level < 3 ? (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {items.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-2")}>
            <a
              href={`#${item.id}`}
              className={cn(
                "inline-block no-underline transition-colors hover:text-foreground",
                item.id === activeItem
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.text}
            </a>
            {item.children?.length ? (
              <Tree
                items={item.children}
                level={level + 1}
                activeItem={activeItem}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
