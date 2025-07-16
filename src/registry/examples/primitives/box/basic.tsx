import { Box } from "@/registry/ui/box"

export default function BasicExample() {
  return (
    <div className="space-y-4">
      <Box className="p-4 bg-blue-100 rounded">
        This is a basic box with blue background
      </Box>
      <Box className="p-4 bg-gray-100 rounded border">
        This is a box with gray background and border
      </Box>
      <Box className="p-4 bg-green-100 rounded shadow">
        This is a box with green background and shadow
      </Box>
    </div>
  )
}
