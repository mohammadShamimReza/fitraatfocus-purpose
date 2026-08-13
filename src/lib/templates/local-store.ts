import type { PurposeTemplateDetail } from "@/types/template";

import { SEED_TEMPLATES } from "./seed";

const CATALOG_KEY = "fitraat.studio.templates.catalog";
const LEGACY_PREFIX = "fitraat.studio.templates.";

function parseTemplates(raw: string | null): PurposeTemplateDetail[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as PurposeTemplateDetail[]) : [];
  } catch {
    return [];
  }
}

function mergeById(collections: PurposeTemplateDetail[][]): PurposeTemplateDetail[] {
  const byId = new Map<string, PurposeTemplateDetail>();

  for (const collection of collections) {
    for (const template of collection) {
      if (!template.id) {
        continue;
      }

      const current = byId.get(template.id);

      if (!current || template.updatedAt > current.updatedAt) {
        byId.set(template.id, template);
      }
    }
  }

  return [...byId.values()];
}

function readLegacyTemplates(): PurposeTemplateDetail[] {
  if (typeof window === "undefined") {
    return [];
  }

  const collections: PurposeTemplateDetail[][] = [];

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);

    if (!key?.startsWith(LEGACY_PREFIX) || key === CATALOG_KEY) {
      continue;
    }

    collections.push(parseTemplates(window.localStorage.getItem(key)));
  }

  return mergeById(collections);
}

function readCount(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function readStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function normalizeTemplate(template: PurposeTemplateDetail): PurposeTemplateDetail {
  const raw = template as unknown as Record<string, unknown>;
  const downloadCount = readCount(raw.downloadCount, readCount(raw.forkCount));

  return {
    ...template,
    downloadCount,
    forkCount: readCount(raw.forkCount, downloadCount),
    downloaderUids: readStringArray(raw.downloaderUids),
  };
}

export function readLocalTemplates(): PurposeTemplateDetail[] {
  if (typeof window === "undefined") {
    return [];
  }

  const catalog = parseTemplates(window.localStorage.getItem(CATALOG_KEY)).map(normalizeTemplate);
  const legacy = readLegacyTemplates().map(normalizeTemplate);
  const seeded = mergeById([SEED_TEMPLATES, catalog, legacy]).map(normalizeTemplate);
  const needsWrite = seeded.some((template) => !catalog.some((item) => item.id === template.id));

  if (needsWrite) {
    writeLocalTemplates(seeded);
  }

  return seeded;
}

export function writeLocalTemplates(templates: PurposeTemplateDetail[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CATALOG_KEY, JSON.stringify(templates));
}

export function upsertLocalTemplate(template: PurposeTemplateDetail): PurposeTemplateDetail {
  const templates = readLocalTemplates();
  const next = templates.filter((item) => item.id !== template.id);
  next.unshift(template);
  writeLocalTemplates(next);
  return template;
}

export function getLocalTemplate(templateId: string): PurposeTemplateDetail | undefined {
  return readLocalTemplates().find((item) => item.id === templateId);
}
