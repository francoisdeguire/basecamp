import fs from "fs"
import path from "path"
import { CONFIG } from "./config"

/**
 * Dynamically discover all root pages (BUILD TIME ONLY)
 */
export function getRootPages(): { slug: string; path: string }[] {
  try {
    const files = fs.readdirSync(CONFIG.DOCS_ROOT_DIR)
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => ({
        slug: file === "index.mdx" ? "" : path.basename(file, ".mdx"),
        path: path.join(CONFIG.DOCS_ROOT_DIR, file),
      }))
  } catch (error) {
    console.error("Error reading root pages directory:", error)
    return []
  }
}
