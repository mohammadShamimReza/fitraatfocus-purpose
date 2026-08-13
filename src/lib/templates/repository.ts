import { getUserDisplayName } from "@/lib/auth/user-display";
import { FunctionsApiError } from "@/lib/functions/client";
import { toCatalogCreator } from "@/lib/profiles/repository";
import type {
  CatalogTemplate,
  CreateSectionInput,
  CreateTaskInput,
  CreateTemplateInput,
  PublicTemplateDetail,
  PurposeTemplate,
  PurposeTemplateDetail,
  TemplateSection,
  TemplateTask,
  UpdateSectionInput,
  UpdateTaskInput,
  UpdateTemplateInput,
} from "@/types/template";

import { getLocalTemplate, readLocalTemplates, upsertLocalTemplate } from "./local-store";

async function getOptionalUser() {
  try {
    const { getFirebaseAuth } = await import("@/lib/firebase/client");
    return getFirebaseAuth().currentUser;
  } catch {
    return null;
  }
}

async function requireUser() {
  const user = await getOptionalUser();

  if (!user) {
    throw new FunctionsApiError("You need to sign in first.", 401);
  }

  return user;
}

function nowIso(): string {
  return new Date().toISOString();
}

function newId(): string {
  return crypto.randomUUID();
}

function toSummary(template: PurposeTemplateDetail): PurposeTemplate {
  return {
    id: template.id,
    title: template.title,
    purpose: template.purpose,
    story: template.story,
    description: template.description,
    category: template.category,
    tags: template.tags,
    creatorUid: template.creatorUid,
    creatorName: template.creatorName,
    status: template.status,
    visibility: template.visibility,
    access: template.access,
    sectionCount: template.sections.length,
    taskCount: template.tasks.length,
    forkCount: template.downloadCount,
    downloadCount: template.downloadCount,
    downloaderUids: template.downloaderUids,
    createdAt: template.createdAt,
    updatedAt: template.updatedAt,
  };
}

function toCatalogTemplate(template: PurposeTemplateDetail): CatalogTemplate {
  const summary = toSummary(template);

  return {
    ...summary,
    creator: toCatalogCreator(template.creatorUid, template.creatorName),
  };
}

function persist(template: PurposeTemplateDetail): PurposeTemplateDetail {
  return upsertLocalTemplate({
    ...template,
    sectionCount: template.sections.length,
    taskCount: template.tasks.length,
    forkCount: template.downloadCount,
    updatedAt: nowIso(),
  });
}

function isPublicTemplate(template: PurposeTemplateDetail): boolean {
  return template.status === "published" && template.visibility !== "private";
}

function canViewTemplate(template: PurposeTemplateDetail, uid: string | undefined): boolean {
  return isPublicTemplate(template) || Boolean(uid && template.creatorUid === uid);
}

function loadVisibleTemplate(templateId: string, uid: string | undefined): PurposeTemplateDetail {
  const local = getLocalTemplate(templateId);

  if (!local || !canViewTemplate(local, uid)) {
    throw new FunctionsApiError("System not found.", 404);
  }

  return local;
}

function loadOwnedTemplate(uid: string, templateId: string): PurposeTemplateDetail {
  const local = getLocalTemplate(templateId);

  if (!local || local.creatorUid !== uid) {
    throw new FunctionsApiError("System not found.", 404);
  }

  return local;
}

export async function listPublicTemplates(): Promise<CatalogTemplate[]> {
  return readLocalTemplates()
    .filter(isPublicTemplate)
    .map(toCatalogTemplate)
    .sort((left, right) => right.downloadCount - left.downloadCount || right.updatedAt.localeCompare(left.updatedAt));
}

export async function listTemplatesByCreator(uid: string): Promise<CatalogTemplate[]> {
  return (await listPublicTemplates()).filter((template) => template.creatorUid === uid);
}

export async function listMyTemplates(): Promise<PurposeTemplate[]> {
  const user = await requireUser();

  return readLocalTemplates()
    .filter((template) => template.creatorUid === user.uid)
    .map(toSummary)
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export async function getTemplate(templateId: string): Promise<PurposeTemplateDetail> {
  const user = await getOptionalUser();
  return loadVisibleTemplate(templateId, user?.uid);
}

export async function getPublicTemplate(templateId: string): Promise<PublicTemplateDetail> {
  const template = getLocalTemplate(templateId);

  if (!template || !isPublicTemplate(template)) {
    throw new FunctionsApiError("System not found.", 404);
  }

  return {
    ...template,
    ...toCatalogTemplate(template),
    sections: template.sections,
    tasks: template.tasks,
  };
}

export async function createTemplate(input: CreateTemplateInput): Promise<PurposeTemplate> {
  const user = await requireUser();
  const creator = toCatalogCreator(user.uid, getUserDisplayName(user));
  const createdAt = nowIso();
  const template = persist({
    id: newId(),
    title: input.title,
    purpose: input.purpose,
    story: input.story,
    description: input.description,
    category: input.category,
    tags: input.tags ?? [],
    creatorUid: user.uid,
    creatorName: creator.displayName,
    status: "draft",
    visibility: input.visibility ?? "public",
    access: input.access ?? "free",
    sectionCount: 0,
    taskCount: 0,
    forkCount: 0,
    downloadCount: 0,
    downloaderUids: [],
    createdAt,
    updatedAt: createdAt,
    sections: [],
    tasks: [],
  });

  return toSummary(template);
}

export async function updateTemplate(templateId: string, input: UpdateTemplateInput): Promise<PurposeTemplate> {
  const user = await requireUser();
  const current = loadOwnedTemplate(user.uid, templateId);
  return toSummary(persist({ ...current, ...input }));
}

export async function publishTemplate(templateId: string): Promise<PurposeTemplate> {
  const user = await requireUser();
  const current = loadOwnedTemplate(user.uid, templateId);
  return toSummary(persist({ ...current, status: "published", visibility: "public" }));
}

export async function downloadTemplate(templateId: string): Promise<PurposeTemplate> {
  const user = await requireUser();
  const current = getLocalTemplate(templateId);

  if (!current || !isPublicTemplate(current)) {
    throw new FunctionsApiError("System not found.", 404);
  }

  if (current.creatorUid === user.uid) {
    throw new FunctionsApiError("You already own this system.", 400);
  }

  const downloaderUids = current.downloaderUids;

  if (downloaderUids.includes(user.uid)) {
    return toSummary(current);
  }

  return toSummary(
    persist({
      ...current,
      downloaderUids: [...downloaderUids, user.uid],
      downloadCount: current.downloadCount + 1,
    }),
  );
}

export async function createSection(templateId: string, input: CreateSectionInput) {
  const user = await requireUser();
  const current = loadOwnedTemplate(user.uid, templateId);
  const section: TemplateSection = {
    id: newId(),
    title: input.title,
    description: input.description ?? "",
    order: current.sections.length,
  };
  persist({ ...current, sections: [...current.sections, section] });
  return section;
}

export async function updateSection(templateId: string, sectionId: string, input: UpdateSectionInput) {
  const user = await requireUser();
  const current = loadOwnedTemplate(user.uid, templateId);
  const sections = current.sections.map((section) => (section.id === sectionId ? { ...section, ...input } : section));
  persist({ ...current, sections });
  return sections.find((section) => section.id === sectionId);
}

export async function deleteSection(templateId: string, sectionId: string): Promise<void> {
  const user = await requireUser();
  const current = loadOwnedTemplate(user.uid, templateId);
  persist({
    ...current,
    sections: current.sections.filter((section) => section.id !== sectionId),
    tasks: current.tasks.filter((task) => task.sectionId !== sectionId),
  });
}

export async function createTask(templateId: string, input: CreateTaskInput) {
  const user = await requireUser();
  const current = loadOwnedTemplate(user.uid, templateId);
  const task: TemplateTask = {
    id: newId(),
    title: input.title,
    notes: input.notes ?? "",
    priority: input.priority ?? "medium",
    tags: input.tags ?? [],
    sectionId: input.sectionId,
    order: current.tasks.filter((item) => item.sectionId === input.sectionId).length,
    estimatedMinutes: input.estimatedMinutes,
  };
  persist({ ...current, tasks: [...current.tasks, task] });
  return task;
}

export async function updateTask(templateId: string, taskId: string, input: UpdateTaskInput) {
  const user = await requireUser();
  const current = loadOwnedTemplate(user.uid, templateId);
  const tasks = current.tasks.map((task) => (task.id === taskId ? { ...task, ...input } : task));
  persist({ ...current, tasks });
  return tasks.find((task) => task.id === taskId);
}

export async function deleteTask(templateId: string, taskId: string): Promise<void> {
  const user = await requireUser();
  const current = loadOwnedTemplate(user.uid, templateId);
  persist({ ...current, tasks: current.tasks.filter((task) => task.id !== taskId) });
}
