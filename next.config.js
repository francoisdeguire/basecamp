const createMDX = require("@next/mdx")
const remarkGfm = require("remark-gfm")
const rehypeSlug = require("rehype-slug")

/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = withMDX(nextConfig)
