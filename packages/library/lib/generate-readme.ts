import { ComponentMetadata } from "./metadata"
import { loadExample } from "./load-example"

export async function generateReadme(
  metadata: ComponentMetadata,
  componentName: string
): Promise<string> {
  const { name, description, examples, props, dependencies, imports } = metadata

  let readme = `# ${name}\n\n`
  readme += `${description}\n\n`

  // Usage section
  readme += `## Usage\n\n`
  readme += `\`\`\`tsx\n`
  readme += `import { ${name} } from "./${componentName}"\n\n`
  readme += `export default function Example() {\n`
  readme += `  return <${name}>Example</${name}>\n`
  readme += `}\n`
  readme += `\`\`\`\n\n`

  // Props section
  if (Object.keys(props).length > 0) {
    readme += `## Props\n\n`
    readme += `| Prop | Type | Default | Description |\n`
    readme += `|------|------|---------|-------------|\n`

    Object.values(props).forEach((prop) => {
      const required = prop.required ? "**" : ""
      const type = prop.type.replace(/\|/g, "\\|")
      const defaultValue = prop.default || "-"

      readme += `| ${required}${prop.name}${required} | \`${type}\` | \`${defaultValue}\` | ${prop.description} |\n`
    })
    readme += `\n`
  }

  // Examples section
  if (examples.length > 0) {
    readme += `## Examples\n\n`

    // Load examples from files
    const loadedExamples = await Promise.all(
      examples.map(async (example) => {
        try {
          const componentPath = `${metadata.category}/${componentName}`
          return await loadExample(example, componentPath)
        } catch (error) {
          console.error(`Failed to load example ${example.name}:`, error)
          return null
        }
      })
    )

    const validExamples = loadedExamples.filter(
      (example): example is NonNullable<typeof example> => example !== null
    )

    validExamples.forEach((example) => {
      readme += `### ${example.name}\n`
      if (example.description) {
        readme += `${example.description}\n\n`
      }
      readme += `\`\`\`tsx\n`
      readme += example.code
      readme += `\n\`\`\`\n\n`
    })
  }

  // Custom sections
  if (metadata.customSections && metadata.customSections.length > 0) {
    const sortedSections = metadata.customSections.sort((a, b) => {
      const orderA = a.order ?? 999
      const orderB = b.order ?? 999
      return orderA - orderB
    })

    sortedSections.forEach((section) => {
      readme += `## ${section.title}\n\n`
      readme += section.content
      readme += `\n\n`
    })
  }

  // Dependencies section
  if (dependencies && dependencies.length > 0) {
    readme += `## Dependencies\n\n`
    readme += `This component requires the following dependencies:\n\n`
    dependencies.forEach((dep) => {
      readme += `- \`${dep}\`\n`
    })
    readme += `\n`
  }

  // Imports section
  if (imports && imports.length > 0) {
    readme += `## Required Imports\n\n`
    readme += `Make sure you have the following utility functions available:\n\n`
    imports.forEach((imp) => {
      readme += `- \`${imp}\`\n`
    })
    readme += `\n`
  }

  return readme
}

// Example usage:
// const readme = await generateReadme(buttonMetadata, 'button');
// console.log(readme);
