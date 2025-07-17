import fs from "fs"
import path from "path"
import matter from "gray-matter"
import {
  ComponentFrontmatter,
  ComponentProp,
  ValidationResult,
} from "@/types/component"
import { validateFrontmatter } from "@/lib/doc-utils"
import { CONFIG } from "@/lib/config"

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

export interface MDXContent {
  frontmatter: ComponentFrontmatter
  content: string
  validation: ValidationResult
}

/**
 * Parse an MDX file and extract frontmatter and content
 * Compatible with next-mdx-remote-client for direct rendering
 */
export async function parseMDXFile(
  filePath: string
): Promise<MDXContent | null> {
  try {
    // Read the MDX file
    const fileContent = fs.readFileSync(filePath, "utf8")

    // Parse frontmatter and content
    const { data, content } = matter(fileContent)

    // Determine if this is a component/primitive page that needs validation
    const isComponentPage = filePath.includes(CONFIG.COMPONENTS_DOCS_DIR)
    const isPrimitivePage = filePath.includes(CONFIG.PRIMITIVES_DOCS_DIR)
    const needsValidation = isComponentPage || isPrimitivePage

    // Validate frontmatter only for component and primitive pages
    const componentName = path.basename(filePath, ".mdx")
    const validation = needsValidation
      ? validateFrontmatter(componentName, data)
      : { isValid: true, errors: [] }

    if (!validation.isValid) {
      console.error(
        `Validation errors for ${componentName}:`,
        validation.errors
      )
      return null
    }

    return {
      frontmatter: data as ComponentFrontmatter,
      content,
      validation,
    }
  } catch (error) {
    console.error(`Error parsing MDX file ${filePath}:`, error)
    return null
  }
}

/**
 * Recursively find all MDX files in a directory
 */
export function findMDXFiles(directory: string): string[] {
  const mdxFiles: string[] = []

  try {
    if (!fs.existsSync(directory)) {
      console.warn(`Directory ${directory} does not exist`)
      return mdxFiles
    }

    const items = fs.readdirSync(directory, { withFileTypes: true })

    for (const item of items) {
      const fullPath = path.join(directory, item.name)

      if (item.isDirectory()) {
        // Recursively search subdirectories
        mdxFiles.push(...findMDXFiles(fullPath))
      } else if (item.isFile() && item.name.endsWith(".mdx")) {
        mdxFiles.push(fullPath)
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error)
  }

  return mdxFiles
}

/**
 * Extract props from a component's MDX documentation file
 */
export async function getComponentProps(
  componentName: string
): Promise<Record<string, ComponentProp> | null> {
  try {
    // Try to find the MDX file in components directory first
    let mdxFilePath = path.join(
      CONFIG.COMPONENTS_DOCS_DIR,
      `${componentName}.mdx`
    )

    // If not found, try primitives directory
    if (!fs.existsSync(mdxFilePath)) {
      mdxFilePath = path.join(
        CONFIG.PRIMITIVES_DOCS_DIR,
        `${componentName}.mdx`
      )
    }

    // If still not found, return null
    if (!fs.existsSync(mdxFilePath)) {
      console.warn(`MDX file not found for component: ${componentName}`)
      return null
    }

    // Parse the MDX file to get frontmatter
    const mdxContent = await parseMDXFile(mdxFilePath)

    if (!mdxContent || !mdxContent.frontmatter.props) {
      console.warn(`No props found in MDX file for component: ${componentName}`)
      return null
    }

    return mdxContent.frontmatter.props
  } catch (error) {
    console.error(
      `Error extracting props for component ${componentName}:`,
      error
    )
    return null
  }
}
