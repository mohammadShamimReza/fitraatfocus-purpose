import { getUserDisplayName } from "@/lib/auth/user-display";
import { FunctionsApiError } from "@/lib/functions/client";
import type {
  CreateSectionInput,
  CreateTaskInput,
  CreateTemplateInput,
  PurposeTemplate,
  PurposeTemplateDetail,
  TemplateSection,
  TemplateTask,
  UpdateSectionInput,
  UpdateTaskInput,
  UpdateTemplateInput,
} from "@/types/template";

import { getLocalTemplate, readLocalTemplates, upsertLocalTemplate } from "./local-store";

async function requireUser() {
  const { getFirebaseAuth } = await import("@/lib/firebase/client");
  const user = getFirebaseAuth().currentUser;

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
    forkCount: template.forkCount,
    createdAt: template.createdAt,
    updatedAt: template.updatedAt,
  };
}

function persist(uid: string, template: PurposeTemplateDetail): PurposeTemplateDetail {
  return upsertLocalTemplate(uid, {
    ...template,
    sectionCount: template.sections.length,
    taskCount: template.tasks.length,
    updatedAt: nowIso(),
  });
}

function loadOwnedTemplate(uid: string, templateId: string): PurposeTemplateDetail {
  const local = getLocalTemplate(uid, templateId);

  if (!local) {
    throw new FunctionsApiError("System not found.", 404);
  }

  return local;
}

export async function listMyTemplates(): Promise<PurposeTemplate[]> {
  const user = await requireUser();
  return readLocalTemplates(user.uid)
    .map(toSummary)
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export async function getTemplate(templateId: string): Promise<PurposeTemplateDetail> {
  const user = await requireUser();
  return loadOwnedTemplate(user.uid, templateId);
}

export async function createTemplate(input: CreateTemplateInput): Promise<PurposeTemplate> {
  const user = await requireUser();
  const createdAt = nowIso();
  const template = persist(user.uid, {
    id: newId(),
    title: input.title,
    purpose: input.purpose,
    story: input.story,
    description: input.description,
    category: input.category,
    tags: input.tags ?? [],
    creatorUid: user.uid,
    creatorName: getUserDisplayName(user),
    status: "draft",
    visibility: input.visibility ?? "public",
    access: input.access ?? "free",
    sectionCount: 0,
    taskCount: 0,
    forkCount: 0,
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
  return toSummary(persist(user.uid, { ...current, ...input }));
}

export async function publishTemplate(templateId: string): Promise<PurposeTemplate> {
  const user = await requireUser();
  const current = loadOwnedTemplate(user.uid, templateId);
  return toSummary(persist(user.uid, { ...current, status: "published", visibility: "public" }));
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
  persist(user.uid, { ...current, sections: [...current.sections, section] });
  return section;
}

export async function updateSection(templateId: string, sectionId: string, input: UpdateSectionInput) {
  const user = await requireUser();
  const current = loadOwnedTemplate(user.uid, templateId);
  const sections = current.sections.map((section) => (section.id === sectionId ? { ...section, ...input } : section));
  persist(user.uid, { ...current, sections });
  return sections.find((section) => section.id === sectionId);
}

export async function deleteSection(templateId: string, sectionId: string): Promise<void> {
  const user = await requireUser();
  const current = loadOwnedTemplate(user.uid, templateId);
  persist(user.uid, {
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
  persist(user.uid, { ...current, tasks: [...current.tasks, task] });
  return task;
}

export async function updateTask(templateId: string, taskId: string, input: UpdateTaskInput) {
  const user = await requireUser();
  const current = loadOwnedTemplate(user.uid, templateId);
  const tasks = current.tasks.map((task) => (task.id === taskId ? { ...task, ...input } : task));
  persist(user.uid, { ...current, tasks });
  return tasks.find((task) => task.id === taskId);
}

export async function deleteTask(templateId: string, taskId: string): Promise<void> {
  const user = await requireUser();
  const current = loadOwnedTemplate(user.uid, templateId);
  persist(user.uid, { ...current, tasks: current.tasks.filter((task) => task.id !== taskId) });
}
