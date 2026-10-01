import { listPublicTemplates } from "@/lib/api/templates";

import { absoluteUrl, sitemapDate } from "./site";

type SitemapChangeFreq = "daily" | "weekly" | "monthly";

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq: SitemapChangeFreq;
  priority: string;
};

function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function urlEntry(entry: SitemapEntry): string {
  const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : "";

  return `  <url>
    <loc>${xmlEscape(entry.loc)}</loc>${lastmod}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
}

export async function buildSitemapXml(): Promise<string> {
  const entries: SitemapEntry[] = [
    { loc: absoluteUrl("/"), changefreq: "weekly", priority: "1.0" },
    { loc: absoluteUrl("/systems"), changefreq: "daily", priority: "0.9" },
  ];

  try {
    const templates = await listPublicTemplates();
    const creators = new Map<string, string | undefined>();

    for (const template of templates) {
      if (!template.id) {
        continue;
      }

      const lastmod = sitemapDate(template.updatedAt);
      entries.push({
        loc: absoluteUrl(`/systems/${encodeURIComponent(template.id)}`),
        lastmod,
        changefreq: "weekly",
        priority: "0.8",
      });

      if (!template.creatorUid) {
        continue;
      }

      const current = creators.get(template.creatorUid);
      if (!creators.has(template.creatorUid) || (lastmod && (!current || lastmod > current))) {
        creators.set(template.creatorUid, lastmod);
      }
    }

    for (const [creatorId, lastmod] of creators) {
      entries.push({
        loc: absoluteUrl(`/creators/${encodeURIComponent(creatorId)}`),
        lastmod,
        changefreq: "weekly",
        priority: "0.6",
      });
    }
  } catch {
    // Keep the static public URLs when the catalog cannot be loaded.
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(urlEntry).join("\n")}
</urlset>
`;
}
