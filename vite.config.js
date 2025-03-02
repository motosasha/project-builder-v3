import { defineConfig } from "vite"
import { fileURLToPath, URL } from "node:url"
import { config } from "./project.config.js";

import vituum from "vituum";
import pug from "@vituum/vite-plugin-pug";

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  plugins: [
    vituum(),
    pug({
      root: "./src",
      data: ["src/data/**/*.json", "src/pages/pages.json"],
      globals: config
    }),
  ],
})
