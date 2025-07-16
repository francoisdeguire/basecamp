import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import { remark } from "remark"
import html from "remark-html"
import {
  ComponentFrontmatter,
  ComponentProp,
  ValidationResult,
} from "@/types/component"
import { validateFrontmatter } from "@/lib/doc-utils"
import { CONFIG } from "@/lib/config"

export interface MDXContent {
  frontmatter: ComponentFrontmatter
  content: string
  htmlContent: string
  compiledSource: string
  validation: ValidationResult
}

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

    // Convert markdown to HTML
    const htmlContent = await remark().use(html).process(content)

    // Serialize MDX content
    const compiledSource = await serialize(content, {
      mdxOptions: {
        development: process.env.NODE_ENV === "development",
      },
    })

    return {
      frontmatter: data as ComponentFrontmatter,
      content,
      htmlContent: String(htmlContent),
      compiledSource: compiledSource.compiledSource,
      validation,
    }
  } catch (error) {
    console.error(`Error parsing MDX file ${filePath}:`, error)
    return null
  }
}

export function findMDXFiles(directory: string): string[] {
  const mdxFiles: string[] = []

  try {
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
