import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.js"],
    css: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "tests/", "src/", "dist/", "**/*.test.*"],
    },
  },
});
