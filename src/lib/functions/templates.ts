import { isFunctionsApiEnabled } from "@/lib/firebase/config";
import * as local from "@/lib/templates/repository";
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

import { FunctionsApiError } from "./errors";
import { functionsRequest } from "./http";
import { functionPaths } from "./paths";
import { unwrapData } from "./unwrap";

function useRemote(): boolean {
  return isFunctionsApiEnabled();
}

export async function listPublicTemplates(): Promise<CatalogTemplate[]> {
  if (!useRemote()) {
    return local.listPublicTemplates();
  }

  return unwrapData(await functionsRequest(functionPaths.templates.public, { auth: false }));
}

export async function listTemplatesByCreator(creatorId: string): Promise<CatalogTemplate[]> {
  if (!useRemote()) {
    return local.listTemplatesByCreator(creatorId);
  }

  return unwrapData(
    await functionsRequest(functionPaths.templates.byCreator, {
      auth: false,
      searchParams: { creatorId },
    }),
  );
}

export async function listMyTemplates(): Promise<PurposeTemplate[]> {
  if (!useRemote()) {
    return local.listMyTemplates();
  }

  return unwrapData(await functionsRequest(functionPaths.templates.mine));
}

export async function getTemplate(templateId: string): Promise<PurposeTemplateDetail> {
  if (!useRemote()) {
    return local.getTemplate(templateId);
  }

  return unwrapData(await functionsRequest(functionPaths.templates.detail(templateId), { auth: "optional" }));
}

export async function getPublicTemplate(templateId: string): Promise<PublicTemplateDetail> {
  if (!useRemote()) {
    return local.getPublicTemplate(templateId);
  }

  return unwrapData(await functionsRequest(functionPaths.templates.publicDetail(templateId), { auth: false }));
}

export async function createTemplate(input: CreateTemplateInput): Promise<PurposeTemplate> {
  if (!useRemote()) {
    return local.createTemplate(input);
  }

  return unwrapData(await functionsRequest(functionPaths.templates.public, { method: "POST", body: input }));
}

export async function updateTemplate(templateId: string, input: UpdateTemplateInput): Promise<PurposeTemplate> {
  if (!useRemote()) {
    return local.updateTemplate(templateId, input);
  }

  return unwrapData(
    await functionsRequest(functionPaths.templates.detail(templateId), { method: "PATCH", body: input }),
  );
}

export async function publishTemplate(templateId: string): Promise<PurposeTemplate> {
  if (!useRemote()) {
    return local.publishTemplate(templateId);
  }

  return unwrapData(await functionsRequest(functionPaths.templates.publish(templateId), { method: "POST" }));
}

export async function downloadTemplate(templateId: string): Promise<PurposeTemplate> {
  if (!useRemote()) {
    return local.downloadTemplate(templateId);
  }

  return unwrapData(await functionsRequest(functionPaths.templates.download(templateId), { method: "POST" }));
}

export async function createSection(templateId: string, input: CreateSectionInput): Promise<TemplateSection> {
  if (!useRemote()) {
    return local.createSection(templateId, input);
  }

  return unwrapData(
    await functionsRequest(functionPaths.templates.sections(templateId), { method: "POST", body: input }),
  );
}

export async function updateSection(
  templateId: string,
  sectionId: string,
  input: UpdateSectionInput,
): Promise<TemplateSection> {
  if (!useRemote()) {
    const section = await local.updateSection(templateId, sectionId, input);
    if (!section) {
      throw new FunctionsApiError("Section not found.", 404);
    }
    return section;
  }

  return unwrapData(
    await functionsRequest(functionPaths.templates.section(templateId, sectionId), { method: "PATCH", body: input }),
  );
}

export async function deleteSection(templateId: string, sectionId: string): Promise<void> {
  if (!useRemote()) {
    return local.deleteSection(templateId, sectionId);
  }

  await functionsRequest(functionPaths.templates.section(templateId, sectionId), { method: "DELETE" });
}

export async function createTask(templateId: string, input: CreateTaskInput): Promise<TemplateTask> {
  if (!useRemote()) {
    return local.createTask(templateId, input);
  }

  return unwrapData(await functionsRequest(functionPaths.templates.tasks(templateId), { method: "POST", body: input }));
}

export async function updateTask(
  templateId: string,
  taskId: string,
  input: UpdateTaskInput,
): Promise<TemplateTask> {
  if (!useRemote()) {
    const task = await local.updateTask(templateId, taskId, input);
    if (!task) {
      throw new FunctionsApiError("Task not found.", 404);
    }
    return task;
  }

  return unwrapData(
    await functionsRequest(functionPaths.templates.task(templateId, taskId), { method: "PATCH", body: input }),
  );
}

export async function deleteTask(templateId: string, taskId: string): Promise<void> {
  if (!useRemote()) {
    return local.deleteTask(templateId, taskId);
  }

  await functionsRequest(functionPaths.templates.task(templateId, taskId), { method: "DELETE" });
}
