import { defineConfig } from "vite"
import { fileURLToPath, URL } from "node:url"
import { config } from "./project.config.js";

import vituum from "vituum";
import pug from "@vituum/vite-plugin-pug";

export default defineConfig({
  base: process.env.MODE === "deploy" ? config.projectName : '/',
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  plugins: [
    vituum(),
    pug({
      root: "./src",
      data: ["./src/data/**/*.json"],
      globals: config
    }),
  ],
})
