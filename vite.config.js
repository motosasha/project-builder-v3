import path from "path";
import { defineConfig } from "vite"
import { config } from "./project.config.js";

import vituum from "vituum";
import pug from "@vituum/vite-plugin-pug";
import inspect from "vite-plugin-inspect";

import vitePugLint from "./plugins/vite-pug-lint";

export default defineConfig({
  base: process.env.MODE === "deploy" ? config.projectName : "/",
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, './src/components'),
      "@core": path.resolve(__dirname, './src/components/core'),
      "@modules": path.resolve(__dirname, './src/components/modules'),
      "@data": path.resolve(__dirname, './src/data'),
      "@pages": path.resolve(__dirname, './src/pages'),
      "@scss": path.resolve(__dirname, './src/scss'),
    }
  },
  plugins: [
    vituum(),
    vitePugLint(),
    pug({
      root: "./src",
      data: ["./src/data/**/*.json"],
      globals: config
    }),
    inspect(),
  ],
})
