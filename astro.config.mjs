// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://romanyamal.github.io",
  base: "/SacMobileMechanic/",
  integrations: [sitemap()],

  compressHTML: true,

  build: {
    inlineStylesheets: "always",
  },

  vite: {
    plugins: [tailwindcss()],
    css: {
      devSourcemap: false,
    },
    build: {
      minify: "esbuild",
      sourcemap: false,
    },
  },
});
