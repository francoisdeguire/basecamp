import fs from "fs"
import path from "path"
import matter from "gray-matter"
import {
  ComponentFrontmatter,
  ValidationResult,
} from "../../src/shared/types/component"
import { validateFrontmatter } from "./validation"
import { CONFIG } from "./config"

export interface MDXContent {
  frontmatter: ComponentFrontmatter
  content: string
  validation: ValidationResult
}

/**
 * Parse an MDX file and extract frontmatter and content (BUILD TIME ONLY)
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
 * Recursively find all MDX files in a directory (BUILD TIME ONLY)
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
