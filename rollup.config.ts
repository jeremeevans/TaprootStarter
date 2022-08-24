import { defineConfig } from "rollup"
import { Taproot } from "@taprootio/rollup-plugin-taproot"
import { NunjucksTemplateParser } from "@taprootio/nunjucks-template-parser"
import { MarkdownPageRenderer } from "@taprootio/markdown-page-renderer"
import postcss from "rollup-plugin-postcss"
import url from "postcss-url"
import typescript from "@rollup/plugin-typescript"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import copy from "rollup-plugin-copy"
import cjs from "@rollup/plugin-commonjs"

export default defineConfig({
  input: "./site/main.ts",
  plugins: [
    cjs(),
    nodeResolve(),
    typescript(),
    postcss({
      plugins: [
        url({
          url: "inline",
        }),
      ],
    }),
    Taproot({
      PageRenderers: [MarkdownPageRenderer],
      PagesPath: "site/pages",
      TemplateParsers: [NunjucksTemplateParser],
      TemplatesPath: "site/templates",
    }),
    copy({
      targets: [
        { src: "site/assets/**/*", dest: "dist/assets" },
        { src: "site/favicons/**/*", dest: "dist" },
      ],
    }),
  ],
  output: {
    dir: "dist",
    sourcemap: true,
    assetFileNames: "[name]-[hash][extname]",
    chunkFileNames: "[name]-[hash][extname]",
    entryFileNames: "[name]-[hash].js",
  },
})
