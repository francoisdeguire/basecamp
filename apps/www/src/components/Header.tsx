"use client"

import { useState } from "react"

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  return (
    <header className="w-full h-16 flex items-center border-b px-6 sticky top-0 z-30 bg-background">
      <span className="font-bold text-lg tracking-tight mr-8">BaseCamp</span>
      {/* Desktop Nav (lg+) */}
      <nav className="hidden lg:flex items-center gap-8 flex-1">
        <a href="/docs" className="hover:underline">
          Docs
        </a>
        <a href="/components" className="hover:underline">
          Components
        </a>
      </nav>
      {/* Hamburger (below lg) */}
      <button
        className="lg:hidden ml-auto p-2 rounded hover:bg-muted focus:outline-none"
        aria-label="Open navigation menu"
        onClick={() => setMobileNavOpen(true)}
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-menu"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex">
          <nav className="bg-background w-64 h-full p-8 flex flex-col gap-6 shadow-lg">
            <button
              className="self-end mb-8 p-2 rounded hover:bg-muted focus:outline-none"
              aria-label="Close navigation menu"
              onClick={() => setMobileNavOpen(false)}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <a
              href="/docs"
              className="hover:underline text-lg"
              onClick={() => setMobileNavOpen(false)}
            >
              Docs
            </a>
            <a
              href="/components"
              className="hover:underline text-lg"
              onClick={() => setMobileNavOpen(false)}
            >
              Components
            </a>
          </nav>
          <div className="flex-1" onClick={() => setMobileNavOpen(false)} />
        </div>
      )}
    </header>
  )
}
