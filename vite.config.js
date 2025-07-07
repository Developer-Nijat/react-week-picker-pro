import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { copyFileSync } from "fs";

export default defineConfig(({ mode }) => {
  if (mode === "demo") {
    // Demo app build configuration
    return {
      plugins: [react()],
      base: "/react-week-picker-pro/",
      build: {
        outDir: "demo-dist",
        sourcemap: true,
      },
    };
  }

  // Library build configuration
  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        include: ["lib/**/*"],
        exclude: ["src/**/*", "**/*.test.*"],
      }),
      // Custom plugin to copy CSS file
      {
        name: "copy-css",
        writeBundle() {
          try {
            copyFileSync(
              resolve(__dirname, "lib/styles/week-picker.css"),
              resolve(__dirname, "dist/style.css")
            );
            console.log("✅ CSS file copied to dist/style.css");
          } catch (error) {
            console.error("❌ Failed to copy CSS:", error);
          }
        },
      },
    ],
    build: {
      lib: {
        entry: resolve(__dirname, "lib/index.js"),
        name: "ReactWeekPickerPro",
        formats: ["es", "cjs"],
        fileName: (format) =>
          `react-week-picker-pro.${format === "es" ? "js" : "cjs"}`,
      },
      rollupOptions: {
        external: ["react", "react-dom", "prop-types"],
        output: [
          {
            format: "es",
            exports: "auto",
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "prop-types": "PropTypes",
            },
          },
          {
            format: "cjs",
            exports: "auto",
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "prop-types": "PropTypes",
            },
          },
        ],
      },
      sourcemap: true,
    },
  };
});
