import { APP_CONFIG, APP_LINKS } from "@/config/app-config";

/** Canonical origin for public pages. Locale stays in the cookie, so every URL has one English document. */
export const SITE_ORIGIN = APP_LINKS.studio.replace(/\/$/, "");

export const ROBOTS_INDEX = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
export const ROBOTS_PRIVATE = "noindex, nofollow";
export const ROBOTS_NOT_FOUND = "noindex, follow";

const META_DESCRIPTION_LENGTH = 160;

export function absoluteUrl(path: string): string {
  if (!path || path === "/") {
    return `${SITE_ORIGIN}/`;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function documentTitle(label: string): string {
  const trimmed = label.replace(/\s+/g, " ").trim();

  if (!trimmed || trimmed === APP_CONFIG.meta.title || trimmed.endsWith(`| ${APP_CONFIG.name}`)) {
    return trimmed || APP_CONFIG.meta.title;
  }

  return `${trimmed} | ${APP_CONFIG.name}`;
}

export function metaDescription(value?: string, fallback = APP_CONFIG.meta.description): string {
  const text = (value ?? "").replace(/\s+/g, " ").trim() || fallback;

  if (text.length <= META_DESCRIPTION_LENGTH) {
    return text;
  }

  return `${text.slice(0, META_DESCRIPTION_LENGTH - 1).trimEnd()}…`;
}

export function absoluteImageUrl(value?: string): string | undefined {
  const trimmed = value?.trim();

  if (!trimmed) {
    return undefined;
  }

  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    return absoluteUrl(trimmed);
  }

  return undefined;
}

export function httpUrl(value?: string): string | undefined {
  const trimmed = value?.trim();

  if (!trimmed) {
    return undefined;
  }

  try {
    const url = new URL(trimmed);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export function isoDateTime(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

export function sitemapDate(value?: string): string | undefined {
  return isoDateTime(value)?.slice(0, 10);
}
