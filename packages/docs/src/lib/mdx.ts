// Runtime MDX configuration (no filesystem operations)

// rehype-pretty-code configuration
export const rehypePrettyCodeOptions = {
  theme: {
    dark: "min-dark",
    light: "min-light",
  },
  defaultLang: {
    block: "tsx",
    inline: "tsx",
  },
  // Keep background transparent to match existing styling
  keepBackground: false,
  // Add line numbers for code blocks
  grid: false, // We'll handle line numbers in CSS if needed
}

// NOTE: MDX file parsing functions have been moved to scripts/lib/build-mdx.ts
// for build-time usage only. Runtime code should use static content from @/lib/content
