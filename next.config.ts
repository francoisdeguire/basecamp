import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Configure Turbopack (stable API)
  turbopack: {
    rules: {
      // Configure MDX handling for Turbopack
      "*.mdx": {
        loaders: ["@mdx-js/loader"],
        as: "*.jsx",
      },
    },
    // Performance optimizations
    resolveAlias: {
      // Add any custom aliases here if needed
    },
  },
  // Keep webpack config as fallback for production builds
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: "@mdx-js/loader",
          options: {
            providerImportSource: "@mdx-js/react",
          },
        },
      ],
    })
    return config
  },
  experimental: {
    mdxRs: true,
  },
}

export default nextConfig
