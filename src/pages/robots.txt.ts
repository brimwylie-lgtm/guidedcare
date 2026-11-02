import type { APIRoute } from "astro";
import { site } from "../site.config";

// While indexable is false, pages carry a noindex tag. Crawling stays allowed
// so search engines can see that tag; blocking them here would hide it.
export const GET: APIRoute = () => {
  const lines = ["User-agent: *", "Allow: /"];
  if (site.indexable) lines.push(`Sitemap: ${new URL("/sitemap-index.xml", site.url).href}`);
  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
