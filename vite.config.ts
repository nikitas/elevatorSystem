/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { UserConfig } from "vite";
import { defineConfig } from "vitest/config";

function pathResolve(dir: string) {
  return resolve(__dirname, ".", dir);
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "@testing-library/jest-dom",
    mockReset: true,
  },
});
