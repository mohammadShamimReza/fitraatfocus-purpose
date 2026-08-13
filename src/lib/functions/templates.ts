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

import { functionsRequest } from "./http";
import { functionPaths } from "./paths";
import { unwrapData } from "./unwrap";

export async function listPublicTemplates(): Promise<CatalogTemplate[]> {
  return unwrapData(await functionsRequest(functionPaths.templates.public, { auth: false }));
}

export async function listTemplatesByCreator(creatorId: string): Promise<CatalogTemplate[]> {
  return unwrapData(
    await functionsRequest(functionPaths.templates.byCreator, {
      auth: false,
      searchParams: { creatorId },
    }),
  );
}

export async function listMyTemplates(): Promise<PurposeTemplate[]> {
  return unwrapData(await functionsRequest(functionPaths.templates.mine));
}

export async function getTemplate(templateId: string): Promise<PurposeTemplateDetail> {
  return unwrapData(await functionsRequest(functionPaths.templates.detail(templateId), { auth: "optional" }));
}

export async function getPublicTemplate(templateId: string): Promise<PublicTemplateDetail> {
  return unwrapData(await functionsRequest(functionPaths.templates.publicDetail(templateId), { auth: false }));
}

export async function createTemplate(input: CreateTemplateInput): Promise<PurposeTemplate> {
  return unwrapData(await functionsRequest(functionPaths.templates.public, { method: "POST", body: input }));
}

export async function updateTemplate(templateId: string, input: UpdateTemplateInput): Promise<PurposeTemplate> {
  return unwrapData(
    await functionsRequest(functionPaths.templates.detail(templateId), { method: "PATCH", body: input }),
  );
}

export async function publishTemplate(templateId: string): Promise<PurposeTemplate> {
  return unwrapData(await functionsRequest(functionPaths.templates.publish(templateId), { method: "POST" }));
}

export async function downloadTemplate(templateId: string): Promise<PurposeTemplate> {
  return unwrapData(await functionsRequest(functionPaths.templates.download(templateId), { method: "POST" }));
}

export async function createSection(templateId: string, input: CreateSectionInput): Promise<TemplateSection> {
  return unwrapData(
    await functionsRequest(functionPaths.templates.sections(templateId), { method: "POST", body: input }),
  );
}

export async function updateSection(
  templateId: string,
  sectionId: string,
  input: UpdateSectionInput,
): Promise<TemplateSection> {
  return unwrapData(
    await functionsRequest(functionPaths.templates.section(templateId, sectionId), { method: "PATCH", body: input }),
  );
}

export async function deleteSection(templateId: string, sectionId: string): Promise<void> {
  await functionsRequest(functionPaths.templates.section(templateId, sectionId), { method: "DELETE" });
}

export async function createTask(templateId: string, input: CreateTaskInput): Promise<TemplateTask> {
  return unwrapData(await functionsRequest(functionPaths.templates.tasks(templateId), { method: "POST", body: input }));
}

export async function updateTask(templateId: string, taskId: string, input: UpdateTaskInput): Promise<TemplateTask> {
  return unwrapData(
    await functionsRequest(functionPaths.templates.task(templateId, taskId), { method: "PATCH", body: input }),
  );
}

export async function deleteTask(templateId: string, taskId: string): Promise<void> {
  await functionsRequest(functionPaths.templates.task(templateId, taskId), { method: "DELETE" });
}
