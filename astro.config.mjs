import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { readFileSync } from "fs";

// Load custom Shiki syntax theme
const uiGemsNight = JSON.parse(
  readFileSync(
    new URL("./src/styles/shiki-ui-gems-night.json", import.meta.url),
    "utf-8"
  )
);

export default defineConfig({
  site: "https://semanticpixel.github.io",
  base: "/ui-gems",
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: uiGemsNight,
      wrap: true,
    },
  },
});
