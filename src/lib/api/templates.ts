import type {
  CatalogTemplate,
  CreateSectionInput,
  CreateTaskInput,
  CreateTemplateInput,
  PublicTemplateDetail,
  PurposeCompletionReview,
  PurposeTemplate,
  PurposeTemplateDetail,
  ReorderSectionsInput,
  ReorderTasksInput,
  TemplateSection,
  TemplateTask,
  UpdateSectionInput,
  UpdateTaskInput,
  UpdateTemplateInput,
} from "@/types/template";

import { functionsRequest } from "./http";
import { functionPaths } from "./paths";
import { unwrapData } from "./unwrap";

/** API: API-TEMPLATE-001 */
export async function listPublicTemplates(): Promise<CatalogTemplate[]> {
  return unwrapData(await functionsRequest(functionPaths.templates.public, { auth: false }));
}

/** API: API-TEMPLATE-001 */
export async function listTemplatesByCreator(creatorId: string): Promise<CatalogTemplate[]> {
  return unwrapData(
    await functionsRequest(functionPaths.templates.byCreator, {
      auth: false,
      searchParams: { creatorId },
    }),
  );
}

/** API: API-TEMPLATE-002 */
export async function listMyTemplates(): Promise<PurposeTemplate[]> {
  return unwrapData(await functionsRequest(functionPaths.templates.mine));
}

/** API: API-TEMPLATE-005 */
export async function getTemplate(templateId: string): Promise<PurposeTemplateDetail> {
  return unwrapData(await functionsRequest(functionPaths.templates.detail(templateId), { auth: "optional" }));
}

/** API: API-TEMPLATE-004 */
export async function getPublicTemplate(templateId: string): Promise<PublicTemplateDetail> {
  return unwrapData(await functionsRequest(functionPaths.templates.publicDetail(templateId), { auth: "optional" }));
}

export async function listPublicTemplateReviews(
  templateId: string,
  options?: { limit?: number; before?: string },
): Promise<{ reviews: PurposeCompletionReview[]; nextCursor?: string }> {
  return unwrapData(
    await functionsRequest(functionPaths.templates.publicReviews(templateId), {
      auth: false,
      searchParams: {
        ...(options?.limit ? { limit: String(options.limit) } : {}),
        ...(options?.before ? { before: options.before } : {}),
      },
    }),
  );
}

/** API: API-TEMPLATE-003 */
export async function createTemplate(input: CreateTemplateInput): Promise<PurposeTemplate> {
  return unwrapData(await functionsRequest(functionPaths.templates.public, { method: "POST", body: input }));
}

/** API: API-TEMPLATE-006 */
export async function updateTemplate(templateId: string, input: UpdateTemplateInput): Promise<PurposeTemplate> {
  return unwrapData(
    await functionsRequest(functionPaths.templates.detail(templateId), { method: "PATCH", body: input }),
  );
}

/** API: API-TEMPLATE-008 */
export async function publishTemplate(templateId: string): Promise<PurposeTemplate> {
  return unwrapData(await functionsRequest(functionPaths.templates.publish(templateId), { method: "POST" }));
}

/** API: API-TEMPLATE-007 */
export async function deleteTemplate(templateId: string): Promise<void> {
  await functionsRequest(functionPaths.templates.detail(templateId), { method: "DELETE" });
}

/** API: API-TEMPLATE-009 */
export async function downloadTemplate(templateId: string): Promise<PurposeTemplate> {
  return unwrapData(await functionsRequest(functionPaths.templates.download(templateId), { method: "POST" }));
}

/** API: API-TEMPLATE-010 */
export async function createSection(templateId: string, input: CreateSectionInput): Promise<TemplateSection> {
  return unwrapData(
    await functionsRequest(functionPaths.templates.sections(templateId), { method: "POST", body: input }),
  );
}

/** API: API-TEMPLATE-011 */
export async function updateSection(
  templateId: string,
  sectionId: string,
  input: UpdateSectionInput,
): Promise<TemplateSection> {
  return unwrapData(
    await functionsRequest(functionPaths.templates.section(templateId, sectionId), { method: "PATCH", body: input }),
  );
}

/** API: API-TEMPLATE-012 */
export async function deleteSection(templateId: string, sectionId: string): Promise<void> {
  await functionsRequest(functionPaths.templates.section(templateId, sectionId), { method: "DELETE" });
}

/** API: API-TEMPLATE-013 */
export async function reorderSections(templateId: string, input: ReorderSectionsInput): Promise<PurposeTemplateDetail> {
  return unwrapData(
    await functionsRequest(functionPaths.templates.reorderSections(templateId), { method: "POST", body: input }),
  );
}

/** API: API-TEMPLATE-014 */
export async function createTask(templateId: string, input: CreateTaskInput): Promise<TemplateTask> {
  return unwrapData(await functionsRequest(functionPaths.templates.tasks(templateId), { method: "POST", body: input }));
}

/** API: API-TEMPLATE-015 */
export async function updateTask(templateId: string, taskId: string, input: UpdateTaskInput): Promise<TemplateTask> {
  return unwrapData(
    await functionsRequest(functionPaths.templates.task(templateId, taskId), { method: "PATCH", body: input }),
  );
}

/** API: API-TEMPLATE-016 */
export async function deleteTask(templateId: string, taskId: string): Promise<void> {
  await functionsRequest(functionPaths.templates.task(templateId, taskId), { method: "DELETE" });
}

/** API: API-TEMPLATE-017 */
export async function reorderTasks(templateId: string, input: ReorderTasksInput): Promise<PurposeTemplateDetail> {
  return unwrapData(
    await functionsRequest(functionPaths.templates.reorderTasks(templateId), { method: "POST", body: input }),
  );
}
