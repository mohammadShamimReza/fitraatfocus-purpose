import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createSection,
  createTask,
  createTemplate,
  deleteSection,
  deleteTask,
  downloadTemplate,
  getPublicTemplate,
  getTemplate,
  listMyTemplates,
  listPublicTemplates,
  listTemplatesByCreator,
  publishTemplate,
  updateSection,
  updateTask,
  updateTemplate,
} from "@/lib/functions/templates";
import type {
  CreateSectionInput,
  CreateTaskInput,
  CreateTemplateInput,
  UpdateSectionInput,
  UpdateTaskInput,
  UpdateTemplateInput,
} from "@/types/template";

import { queryKeys } from "./keys";

export function usePublicTemplatesQuery(enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.templates.public(),
    queryFn: listPublicTemplates,
    enabled,
  });
}

export function useMyTemplatesQuery(enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.templates.mine(),
    queryFn: listMyTemplates,
    enabled,
  });
}

export function useCreatorTemplatesQuery(creatorId: string, enabled: boolean) {
  return useQuery({
    queryKey: [...queryKeys.templates.public(), "creator", creatorId],
    queryFn: () => listTemplatesByCreator(creatorId),
    enabled: enabled && Boolean(creatorId),
  });
}

export function useTemplateQuery(templateId: string, enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.templates.detail(templateId),
    queryFn: () => getTemplate(templateId),
    enabled: enabled && Boolean(templateId),
  });
}

export function usePublicTemplateQuery(templateId: string, enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.templates.publicDetail(templateId),
    queryFn: () => getPublicTemplate(templateId),
    enabled: enabled && Boolean(templateId),
  });
}

function useInvalidateTemplates(templateId?: string) {
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.templates.public() });
    await queryClient.invalidateQueries({ queryKey: queryKeys.templates.mine() });

    if (templateId) {
      await queryClient.invalidateQueries({ queryKey: queryKeys.templates.detail(templateId) });
      await queryClient.invalidateQueries({ queryKey: queryKeys.templates.publicDetail(templateId) });
    }
  };
}

export function useCreateTemplateMutation() {
  const invalidate = useInvalidateTemplates();

  return useMutation({
    mutationFn: (input: CreateTemplateInput) => createTemplate(input),
    onSuccess: () => invalidate(),
  });
}

export function useUpdateTemplateMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: (input: UpdateTemplateInput) => updateTemplate(templateId, input),
    onSuccess: () => invalidate(),
  });
}

export function usePublishTemplateMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: () => publishTemplate(templateId),
    onSuccess: () => invalidate(),
  });
}

export function useDownloadTemplateMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: () => downloadTemplate(templateId),
    onSuccess: () => invalidate(),
  });
}

export function useCreateSectionMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: (input: CreateSectionInput) => createSection(templateId, input),
    onSuccess: () => invalidate(),
  });
}

export function useUpdateSectionMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: ({ sectionId, input }: { sectionId: string; input: UpdateSectionInput }) =>
      updateSection(templateId, sectionId, input),
    onSuccess: () => invalidate(),
  });
}

export function useDeleteSectionMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: (sectionId: string) => deleteSection(templateId, sectionId),
    onSuccess: () => invalidate(),
  });
}

export function useCreateTaskMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: (input: CreateTaskInput) => createTask(templateId, input),
    onSuccess: () => invalidate(),
  });
}

export function useUpdateTaskMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: ({ taskId, input }: { taskId: string; input: UpdateTaskInput }) =>
      updateTask(templateId, taskId, input),
    onSuccess: () => invalidate(),
  });
}

export function useDeleteTaskMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(templateId, taskId),
    onSuccess: () => invalidate(),
  });
}
