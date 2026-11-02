import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { site } from "./src/site.config";

export default defineConfig({
  site: site.url,
  trailingSlash: "ignore",
  build: { format: "directory" },
  integrations: [sitemap()],
});
