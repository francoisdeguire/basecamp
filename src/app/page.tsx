import Link from "next/link"
import React from "react"

export default async function HomePage() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to Basecamp</h1>

      <p className="text-xl text-gray-600 max-w-3xl mx-auto ">
        A v7 design system for building modern applications.
      </p>

      <Link
        href="/docs"
        className="m-8 bg-primary text-sm font-dm-sans font-medium text-white px-4 py-2 rounded-md"
      >
        Go to docs
      </Link>
    </div>
  )
}
