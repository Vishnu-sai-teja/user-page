import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * Configures Vite for a static React application and applies a strict coverage
 * gate to the authored runtime code under src.
 */
export default defineConfig({
  base: "/user-page/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["src/main.tsx", "src/tests/**"],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100
      }
    }
  }
});