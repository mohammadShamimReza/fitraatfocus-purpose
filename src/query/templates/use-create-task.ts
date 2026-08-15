import { useMutation } from "@tanstack/react-query";

import { createTask } from "@/lib/api/templates";
import type { CreateTaskInput } from "@/types/template";

import { useInvalidateTemplates } from "./use-invalidate-templates";

export function useCreateTaskMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: (input: CreateTaskInput) => createTask(templateId, input),
    onSuccess: () => invalidate(),
  });
}
