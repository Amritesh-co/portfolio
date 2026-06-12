import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// Inline project slugs — mirrors src/data/projects.js
// Update this list whenever a project is added or removed.
const PROJECT_SLUGS = [
  "multi-agent-medical-assistant",
  "openclaw-swarm",
  "woodcraft-store",
  "portfolio",
  "friday",
  "gemma-ui",
  "algo-visualizer",
  "stubble-vision",
  "graph-path-models",
  "eco-tracker",
];

const BASE = "https://amriteshsahu.me";
const TODAY = new Date().toISOString().split("T")[0];

const staticRoutes = [
  { loc: "/",        priority: "1.0", changefreq: "monthly" },
  { loc: "/projects", priority: "0.9", changefreq: "monthly" },
  { loc: "/friday",   priority: "0.8", changefreq: "monthly" },
  { loc: "/resume",   priority: "0.8", changefreq: "monthly" },
];

const projectRoutes = PROJECT_SLUGS.map((slug) => ({
  loc: `/projects/${slug}`,
  priority: "0.7",
  changefreq: "monthly",
}));

const allRoutes = [...staticRoutes, ...projectRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) => `  <url>
    <loc>${BASE}${r.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <priority>${r.priority}</priority>
    <changefreq>${r.changefreq}</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const out = resolve(ROOT, "public", "sitemap.xml");
writeFileSync(out, xml, "utf-8");
console.log(`sitemap.xml generated — ${allRoutes.length} URLs (${TODAY})`);
