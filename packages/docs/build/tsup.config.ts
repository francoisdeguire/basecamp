import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["build-content.ts", "build-examples.ts"],
  format: ["cjs", "esm"],
  dts: false, // Disable DTS generation to avoid tsconfig conflicts
  sourcemap: true,
  clean: true,
  silent: true,
  shims: true,
})
