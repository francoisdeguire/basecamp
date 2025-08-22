import { Box } from "@basecamp/registry"

export default function AsElementExample() {
  return (
    <div className="space-y-4">
      <Box as="section" className="p-4 bg-gray-100">
        This box renders as a section element
      </Box>
      <Box as="article" className="p-4 bg-white border rounded">
        This box renders as an article element
      </Box>
      <Box as="aside" className="p-4 bg-yellow-100 rounded">
        This box renders as an aside element
      </Box>
      <Box as="header" className="p-4 bg-blue-100 rounded">
        This box renders as a header element
      </Box>
    </div>
  )
}
