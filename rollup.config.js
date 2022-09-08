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
import { DateHelper } from "./src/date-helper"

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
      TemplateParsers: [
        NunjucksTemplateParser({}, [
          {
            Async: false,
            Filter: (postDate) => {
              const helper = new DateHelper(postDate)
              return helper.BlogPostDate
            },
            Name: "postdate",
          },
        ]),
      ],
      TemplatesPath: "site/templates",
      Authors: new Map([
        [
          "an-author",
          {
            Name: "Author One",
            TwitterHandle: "@authorone",
            Url: "https://example.com",
            FacebookPage: "https://www.facebook.com/author-url",
          },
        ],
        [
          "another-author",
          {
            Name: "Author Two",
            TwitterHandle: "@authortwo",
            Url: "https://example.com",
            FacebookPage: "https://www.facebook.com/author-url",
          },
        ],
      ]),
      Publisher: {
        Name: "<TODO> The name of your site",
        TwitterHandle: "@taprootio",
        Url: "https://www.taproot.io/",
        FacebookPage: "https://www.facebook.com/taprootio",
      },
      SiteRootUrl: "https://starter.taproot.io/",
      CharSet: "UTF-8",
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
