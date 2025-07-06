"use client"

import { useEffect, useState } from "react"

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Extract headings from the page content
    const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    const extractedHeadings: Heading[] = []

    headingElements.forEach((element) => {
      const id = element.id || generateId(element.textContent || "")
      const text = element.textContent || ""
      const level = parseInt(element.tagName.charAt(1))

      // Add id to element if it doesn't have one
      if (!element.id) {
        element.id = id
      }

      extractedHeadings.push({ id, text, level })
    })

    setHeadings(extractedHeadings)
  }, [])

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0,
      }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const generateId = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <aside className={className}>
      <div className="mb-4 text-xs font-semibold uppercase text-muted-foreground">
        On This Page
      </div>
      <nav>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHeading(heading.id)
                }}
                className={`block text-sm transition-colors hover:text-foreground ${
                  activeId === heading.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                } ${
                  heading.level === 1
                    ? "pl-0"
                    : heading.level === 2
                    ? "pl-2"
                    : heading.level === 3
                    ? "pl-4"
                    : "pl-6"
                }`}
                style={{
                  borderLeft:
                    activeId === heading.id
                      ? "2px solid hsl(var(--primary))"
                      : "2px solid transparent",
                  paddingLeft: heading.level > 1 ? "0.75rem" : "0",
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
