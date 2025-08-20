import type { NextConfig } from "next"
import createMDX from "@next/mdx"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"

const nextConfig: NextConfig = {
  // Configure page extensions to include MDX
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Enable experimental mdxRs for better performance
  experimental: {
    mdxRs: true,
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
})

export default withMDX(nextConfig)
