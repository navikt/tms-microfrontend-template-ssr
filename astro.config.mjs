import { defineConfig } from "astro/config";
import { rollupImportMapPlugin } from "rollup-plugin-import-map";
import importmap from "./importmap.json";
import react from "@astrojs/react";
import node from "@astrojs/node";
import prefixer from "postcss-prefix-selector";

// https://astro.build/config
export default defineConfig({
  base: "/tms-microfrontend-template-ssr/",
  build: {
    assetsPrefix: "https://cdn.nav.no/min-side/tms-microfrontend-test",
  },
  vite: {
    css: {
      postcss: {
        plugins: [
          prefixer({
            prefix: ".tms-microfrontend-template-ssr",
            ignoreFiles: [/module.css/],
          }),
        ],
      },
    },
  },
  integrations: [
    react(),
    {
      name: "importmap",
      hooks: {
        "astro:build:setup": ({ vite, target }) => {
          if (target === "client") {
            vite.plugins.push({
              ...rollupImportMapPlugin(importmap),
              enforce: "pre",
              apply: "build",
            });
          }
        },
      },
    },
  ],
  i18n: {
    defaultLocale: "nb",
    locales: ["nb", "nn", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
