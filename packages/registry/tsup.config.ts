import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  silent: true,
  external: ["react", "react-dom"],
  banner: {
    js: '"use client";',
  },
})
