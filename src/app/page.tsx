import React from "react"
import Link from "next/link"
import { buildRegistry } from "@/lib/registry"

export default async function HomePage() {
  const registry = await buildRegistry()

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6">Component Library</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A collection of reusable components and primitives for building modern
          applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Components Card */}
        <Link href="/components" className="group block">
          <div className="border rounded-lg p-8 hover:shadow-lg transition-all duration-200 group-hover:border-blue-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold group-hover:text-blue-600 transition-colors">
                  Components
                </h2>
                <p className="text-gray-500">
                  {registry.components.length} components
                </p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Ready-to-use UI components with multiple variants and examples.
            </p>
            <div className="text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
              Browse components →
            </div>
          </div>
        </Link>

        {/* Primitives Card */}
        <Link href="/primitives" className="group block">
          <div className="border rounded-lg p-8 hover:shadow-lg transition-all duration-200 group-hover:border-green-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold group-hover:text-green-600 transition-colors">
                  Primitives
                </h2>
                <p className="text-gray-500">
                  {registry.primitives.length} primitives
                </p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Basic building blocks for creating more complex components.
            </p>
            <div className="text-green-600 font-medium group-hover:text-green-800 transition-colors">
              Browse primitives →
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Library Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {registry.components.length}
            </div>
            <div className="text-sm text-gray-600">UI Components</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {registry.primitives.length}
            </div>
            <div className="text-sm text-gray-600">Primitives</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {registry.totalCount}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>
      </div>
    </div>
  )
}
