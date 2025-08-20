/**
 * Text formatting and manipulation utilities
 * Consolidated from various files for better organization
 */

// Note: formatComponentName and slugify functions removed as they were unused

// Header ID generation (from toc.ts)
export function generateHeaderId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
}

// HTML escaping for server-side use (from highlight-code.ts)
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
