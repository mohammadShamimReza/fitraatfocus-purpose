import { collections, db } from "../config/admin";
import { badRequest, notFound } from "../lib/http-error";
import { newId, nowIso } from "../lib/ids";
import type { AuthUser } from "../middleware/auth.middleware";
import {
  type CatalogTemplate,
  type CreateSectionInput,
  type CreateTaskInput,
  type CreateTemplateInput,
  type PublicTemplateDetail,
  type PurposeTemplate,
  type PurposeTemplateDetail,
  type TemplateSection,
  type TemplateTask,
  type UpdateSectionInput,
  type UpdateTaskInput,
  type UpdateTemplateInput,
  canViewTemplate,
  isPublicTemplate,
  toSummary,
  withCounts,
} from "../models/template.model";
import { getCatalogCreator, getOrCreateMyProfile } from "./profile.service";
import { ensurePurposeTrack, syncTrackCovers } from "./purpose-track.service";

const templates = db.collection(collections.templates);

function asTemplate(id: string, data: Record<string, unknown>): PurposeTemplateDetail {
  return {
    id,
    title: String(data.title ?? ""),
    purpose: String(data.purpose ?? ""),
    story: String(data.story ?? ""),
    description: String(data.description ?? ""),
    category: String(data.category ?? "other"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    creatorUid: String(data.creatorUid ?? ""),
    creatorName: String(data.creatorName ?? ""),
    status: data.status === "published" ? "published" : "draft",
    visibility:
      data.visibility === "private" || data.visibility === "unlisted" ?
        data.visibility :
        "public",
    access: "free",
    sectionCount: Number(data.sectionCount ?? 0),
    taskCount: Number(data.taskCount ?? 0),
    forkCount: Number(data.forkCount ?? data.downloadCount ?? 0),
    downloadCount: Number(data.downloadCount ?? 0),
    downloaderUids: Array.isArray(data.downloaderUids) ?
      data.downloaderUids.map(String) :
      [],
    createdAt: String(data.createdAt ?? nowIso()),
    updatedAt: String(data.updatedAt ?? nowIso()),
    ...(typeof data.imageUrl === "string" && data.imageUrl.trim() ?
      { imageUrl: data.imageUrl.trim() } :
      {}),
    ...(typeof data.storagePath === "string" && data.storagePath.trim() ?
      { storagePath: data.storagePath.trim() } :
      {}),
    sections: Array.isArray(data.sections) ?
      (data.sections as TemplateSection[]) :
      [],
    tasks: Array.isArray(data.tasks) ?
      (data.tasks as TemplateTask[]) :
      [],
  };
}

async function readTemplate(templateId: string): Promise<PurposeTemplateDetail | undefined> {
  const snapshot = await templates.doc(templateId).get();
  if (!snapshot.exists) {
    return undefined;
  }

  return asTemplate(
    snapshot.id,
    (snapshot.data() ?? {}) as Record<string, unknown>,
  );
}

async function saveTemplate(template: PurposeTemplateDetail): Promise<PurposeTemplateDetail> {
  const next = withCounts({ ...template, updatedAt: nowIso() });
  await templates.doc(next.id).set(next);
  return next;
}

async function toCatalog(template: PurposeTemplateDetail): Promise<CatalogTemplate> {
  const creator = await getCatalogCreator(
    template.creatorUid,
    template.creatorName,
  );
  return { ...toSummary(template), creator };
}

async function requireVisible(
  templateId: string,
  uid?: string,
): Promise<PurposeTemplateDetail> {
  const template = await readTemplate(templateId);
  if (!template || !canViewTemplate(template, uid)) {
    throw notFound("System not found.");
  }

  return template;
}

async function requireOwned(
  templateId: string,
  uid: string,
): Promise<PurposeTemplateDetail> {
  const template = await readTemplate(templateId);
  if (!template || template.creatorUid !== uid) {
    throw notFound("System not found.");
  }

  return template;
}

function assertPermutation(currentIds: string[], nextIds: string[]): void {
  if (nextIds.length !== currentIds.length) {
    throw badRequest("Order must include every item once.");
  }

  const unique = new Set(nextIds);
  if (unique.size !== nextIds.length) {
    throw badRequest("Order must include every item once.");
  }

  const current = new Set(currentIds);
  for (const id of nextIds) {
    if (!current.has(id)) {
      throw badRequest("Order must include every item once.");
    }
  }
}

function compactSectionOrders(sections: TemplateSection[]): TemplateSection[] {
  return [...sections]
    .sort((left, right) => left.order - right.order)
    .map((section, index) => ({ ...section, order: index }));
}

function compactTaskOrders(
  tasks: TemplateTask[],
  sectionId: string,
): TemplateTask[] {
  const inSection = tasks
    .filter((task) => task.sectionId === sectionId)
    .sort((left, right) => left.order - right.order);
  const nextOrder = new Map(
    inSection.map((task, index) => [task.id, index]),
  );
  return tasks.map((task) => {
    const order = nextOrder.get(task.id);
    return order === undefined ? task : { ...task, order };
  });
}

export async function listPublicTemplates(): Promise<CatalogTemplate[]> {
  const snapshot = await templates.where("status", "==", "published").get();
  const items = snapshot.docs
    .map((doc) => asTemplate(doc.id, doc.data() as Record<string, unknown>))
    .filter(isPublicTemplate)
    .sort((left, right) => {
      return right.downloadCount - left.downloadCount ||
        right.updatedAt.localeCompare(left.updatedAt);
    });

  return Promise.all(items.map(toCatalog));
}

export async function listTemplatesByCreator(
  creatorId: string,
): Promise<CatalogTemplate[]> {
  const items = await listPublicTemplates();
  return items.filter((template) => template.creatorUid === creatorId);
}

export async function listMyTemplates(uid: string): Promise<PurposeTemplate[]> {
  const snapshot = await templates.where("creatorUid", "==", uid).get();
  return snapshot.docs
    .map((doc) => {
      return toSummary(asTemplate(doc.id, doc.data() as Record<string, unknown>));
    })
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export async function getTemplate(
  templateId: string,
  uid?: string,
): Promise<PurposeTemplateDetail> {
  return requireVisible(templateId, uid);
}

export async function getPublicTemplate(
  templateId: string,
): Promise<PublicTemplateDetail> {
  const template = await readTemplate(templateId);
  if (!template || !isPublicTemplate(template)) {
    throw notFound("System not found.");
  }

  const catalog = await toCatalog(template);
  return {
    ...template,
    ...catalog,
    sections: template.sections,
    tasks: template.tasks,
  };
}

export async function createTemplate(
  user: AuthUser,
  input: CreateTemplateInput,
): Promise<PurposeTemplate> {
  const profile = await getOrCreateMyProfile(
    user.uid,
    user.name || user.email || "User",
    user.picture ?? "",
    user.email ?? "",
  );
  const createdAt = nowIso();
  const template = await saveTemplate({
    id: newId(),
    title: input.title,
    purpose: input.purpose,
    story: input.story,
    description: input.description,
    category: input.category,
    tags: input.tags ?? [],
    creatorUid: user.uid,
    creatorName: profile.displayName,
    status: "draft",
    visibility: input.visibility ?? "private",
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

export async function updateTemplate(
  uid: string,
  templateId: string,
  input: UpdateTemplateInput,
): Promise<PurposeTemplate> {
  const current = await requireOwned(templateId, uid);
  const next: PurposeTemplateDetail = { ...current, ...input };
  if (input.imageUrl !== undefined && !input.imageUrl.trim()) {
    delete next.imageUrl;
  }
  if (input.storagePath !== undefined && !input.storagePath.trim()) {
    delete next.storagePath;
  }
  const saved = await saveTemplate(next);
  if (input.imageUrl !== undefined) {
    await syncTrackCovers(templateId, saved.imageUrl);
  }
  return toSummary(saved);
}

export async function publishTemplate(
  uid: string,
  templateId: string,
): Promise<PurposeTemplate> {
  const current = await requireOwned(templateId, uid);
  if (current.tasks.length < 1) {
    throw badRequest("Add at least one task before publishing.");
  }
  return toSummary(await saveTemplate({ ...current, status: "published" }));
}

export async function downloadTemplate(
  uid: string,
  templateId: string,
): Promise<PurposeTemplate> {
  const current = await readTemplate(templateId);
  if (!current || !isPublicTemplate(current)) {
    throw notFound("System not found.");
  }

  if (current.creatorUid === uid) {
    throw badRequest("You already own this system.");
  }

  if (current.downloaderUids.includes(uid)) {
    await ensurePurposeTrack(uid, current);
    return toSummary(current);
  }

  const next = await saveTemplate({
    ...current,
    downloaderUids: [...current.downloaderUids, uid],
    downloadCount: current.downloadCount + 1,
  });
  await ensurePurposeTrack(uid, next);
  return toSummary(next);
}

export async function createSection(
  uid: string,
  templateId: string,
  input: CreateSectionInput,
): Promise<TemplateSection> {
  const current = await requireOwned(templateId, uid);
  const section: TemplateSection = {
    id: newId(),
    title: input.title,
    description: input.description ?? "",
    order: current.sections.length,
  };
  await saveTemplate({ ...current, sections: [...current.sections, section] });
  return section;
}

export async function updateSection(
  uid: string,
  templateId: string,
  sectionId: string,
  input: UpdateSectionInput,
): Promise<TemplateSection> {
  const current = await requireOwned(templateId, uid);
  const { order: _order, ...fields } = input;
  const sections = current.sections.map((section) => {
    return section.id === sectionId ? { ...section, ...fields } : section;
  });
  const updated = sections.find((section) => section.id === sectionId);
  if (!updated) {
    throw notFound("Section not found.");
  }

  await saveTemplate({ ...current, sections });
  return updated;
}

export async function deleteSection(
  uid: string,
  templateId: string,
  sectionId: string,
): Promise<void> {
  const current = await requireOwned(templateId, uid);
  const sections = compactSectionOrders(
    current.sections.filter((section) => section.id !== sectionId),
  );
  const tasks = current.tasks.filter((task) => task.sectionId !== sectionId);
  await saveTemplate({ ...current, sections, tasks });
}

export async function reorderSections(
  uid: string,
  templateId: string,
  sectionIds: string[],
): Promise<PurposeTemplateDetail> {
  const current = await requireOwned(templateId, uid);
  assertPermutation(
    current.sections.map((section) => section.id),
    sectionIds,
  );
  const byId = new Map(
    current.sections.map((section) => [section.id, section]),
  );
  const sections = sectionIds.map((id, index) => {
    const section = byId.get(id);
    if (!section) {
      throw badRequest("Order must include every item once.");
    }
    return { ...section, order: index };
  });
  return saveTemplate({ ...current, sections });
}

export async function reorderTasks(
  uid: string,
  templateId: string,
  sectionId: string,
  taskIds: string[],
): Promise<PurposeTemplateDetail> {
  const current = await requireOwned(templateId, uid);
  if (!current.sections.some((section) => section.id === sectionId)) {
    throw notFound("Section not found.");
  }

  const inSection = current.tasks.filter((task) => task.sectionId === sectionId);
  assertPermutation(
    inSection.map((task) => task.id),
    taskIds,
  );
  const byId = new Map(inSection.map((task) => [task.id, task]));
  const reordered = taskIds.map((id, index) => {
    const task = byId.get(id);
    if (!task) {
      throw badRequest("Order must include every item once.");
    }
    return { ...task, order: index };
  });
  const others = current.tasks.filter((task) => task.sectionId !== sectionId);
  return saveTemplate({ ...current, tasks: [...others, ...reordered] });
}

export async function createTask(
  uid: string,
  templateId: string,
  input: CreateTaskInput,
): Promise<TemplateTask> {
  const current = await requireOwned(templateId, uid);
  if (!current.sections.some((section) => section.id === input.sectionId)) {
    throw badRequest("Section not found.");
  }

  const task: TemplateTask = {
    id: newId(),
    title: input.title,
    notes: input.notes ?? "",
    priority: input.priority ?? "medium",
    tags: input.tags ?? [],
    sectionId: input.sectionId,
    order: current.tasks.filter((item) => item.sectionId === input.sectionId)
      .length,
    ...(typeof input.estimatedMinutes === "number" ?
      { estimatedMinutes: input.estimatedMinutes } :
      {}),
  };
  await saveTemplate({ ...current, tasks: [...current.tasks, task] });
  return task;
}

export async function updateTask(
  uid: string,
  templateId: string,
  taskId: string,
  input: UpdateTaskInput,
): Promise<TemplateTask> {
  const current = await requireOwned(templateId, uid);
  const existing = current.tasks.find((task) => task.id === taskId);
  if (!existing) {
    throw notFound("Task not found.");
  }

  const nextSectionId = input.sectionId ?? existing.sectionId;
  if (!current.sections.some((section) => section.id === nextSectionId)) {
    throw badRequest("Section not found.");
  }

  const moved = nextSectionId !== existing.sectionId;
  const destCount = current.tasks.filter((task) => {
    return task.sectionId === nextSectionId && task.id !== taskId;
  }).length;

  const { order: _order, sectionId: _sectionId, ...fields } = input;
  const patched: TemplateTask = {
    ...existing,
    ...fields,
    sectionId: nextSectionId,
    order: moved ? destCount : existing.order,
  };

  let tasks = current.tasks.map((task) => {
    return task.id === taskId ? patched : task;
  });
  if (moved) {
    tasks = compactTaskOrders(tasks, existing.sectionId);
    tasks = compactTaskOrders(tasks, nextSectionId);
  }

  await saveTemplate({ ...current, tasks });
  return patched;
}

export async function deleteTask(
  uid: string,
  templateId: string,
  taskId: string,
): Promise<void> {
  const current = await requireOwned(templateId, uid);
  const existing = current.tasks.find((task) => task.id === taskId);
  const remaining = current.tasks.filter((task) => task.id !== taskId);
  const tasks = existing
    ? compactTaskOrders(remaining, existing.sectionId)
    : remaining;
  await saveTemplate({ ...current, tasks });
}
