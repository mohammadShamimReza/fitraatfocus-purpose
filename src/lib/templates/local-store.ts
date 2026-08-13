import type { PurposeTemplateDetail } from "@/types/template";

function storageKey(uid: string): string {
  return `fitraat.studio.templates.${uid}`;
}

export function readLocalTemplates(uid: string): PurposeTemplateDetail[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(storageKey(uid));
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as PurposeTemplateDetail[]) : [];
  } catch {
    return [];
  }
}

export function writeLocalTemplates(uid: string, templates: PurposeTemplateDetail[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey(uid), JSON.stringify(templates));
}

export function upsertLocalTemplate(uid: string, template: PurposeTemplateDetail): PurposeTemplateDetail {
  const templates = readLocalTemplates(uid);
  const next = templates.filter((item) => item.id !== template.id);
  next.unshift(template);
  writeLocalTemplates(uid, next);
  return template;
}

export function getLocalTemplate(uid: string, templateId: string): PurposeTemplateDetail | undefined {
  return readLocalTemplates(uid).find((item) => item.id === templateId);
}
