import { APP_CONFIG } from "@/config/app-config";

import {
  absoluteImageUrl,
  absoluteUrl,
  documentTitle,
  metaDescription,
  ROBOTS_INDEX,
  ROBOTS_NOT_FOUND,
  ROBOTS_PRIVATE,
} from "./site";

type HeadMeta = { title: string } | { name: string; content: string } | { property: string; content: string };

type PageHeadInput = {
  title: string;
  description?: string;
  path?: string;
  imageUrl?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  robots?: string;
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: object[];
};

function jsonLdScript(data: object) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data).replaceAll("<", "\\u003c"),
  };
}

export function buildPageHead(input: PageHeadInput): {
  meta: HeadMeta[];
  links?: Array<{ rel: string; href: string }>;
  scripts?: Array<{ type: string; children: string }>;
} {
  const title = documentTitle(input.title);
  const description = metaDescription(input.description);
  const robots = input.robots ?? ROBOTS_INDEX;
  const indexable = robots.startsWith("index");
  const canonical = input.path && indexable ? absoluteUrl(input.path) : undefined;
  const imageUrl = absoluteImageUrl(input.imageUrl);
  const meta: HeadMeta[] = [
    { title },
    { name: "description", content: description },
    { name: "robots", content: robots },
    { property: "og:type", content: input.type ?? "website" },
    { property: "og:site_name", content: APP_CONFIG.name },
    { property: "og:locale", content: "en_US" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:card", content: imageUrl ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  if (indexable && canonical) {
    meta.push({ property: "og:url", content: canonical });
  }

  if (imageUrl) {
    meta.push({ property: "og:image", content: imageUrl }, { name: "twitter:image", content: imageUrl });
    if (input.imageAlt) {
      meta.push({ property: "og:image:alt", content: input.imageAlt });
    }
  }

  if (input.type === "article" && input.publishedTime) {
    meta.push({ property: "article:published_time", content: input.publishedTime });
  }

  if (input.type === "article" && input.modifiedTime) {
    meta.push({ property: "article:modified_time", content: input.modifiedTime });
  }

  const scripts = (input.jsonLd ?? []).map(jsonLdScript);

  return {
    meta,
    ...(canonical ? { links: [{ rel: "canonical", href: canonical }] } : {}),
    ...(scripts.length > 0 ? { scripts } : {}),
  };
}

export function privatePageHead(title: string) {
  return buildPageHead({
    title,
    description: "Private Fitraat Focus studio page.",
    robots: ROBOTS_PRIVATE,
  });
}

export function notFoundPageHead() {
  return buildPageHead({
    title: "Page not found",
    description: "That page is not on Fitraat Focus.",
    robots: ROBOTS_NOT_FOUND,
  });
}
