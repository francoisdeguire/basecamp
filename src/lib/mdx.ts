import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import { remark } from "remark"
import html from "remark-html"
import { ComponentFrontmatter, ValidationResult } from "@/types/component"
import { validateFrontmatter } from "@/lib/doc-utils"

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

    // Validate frontmatter (skip validation for index.mdx)
    const componentName = path.basename(filePath, ".mdx")
    const validation =
      componentName === "index"
        ? { isValid: true, errors: [] }
        : validateFrontmatter(componentName, data)

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
