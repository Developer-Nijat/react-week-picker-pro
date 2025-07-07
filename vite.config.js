import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

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
        output: {
          exports: "named",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "prop-types": "PropTypes",
          },
        },
      },
      sourcemap: true,
      cssCodeSplit: false,
    },
    css: {
      modules: {
        generateScopedName: "[name]__[local]___[hash:base64:5]",
      },
    },
  };
});
