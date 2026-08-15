import { useMutation } from "@tanstack/react-query";

import { reorderTasks } from "@/lib/api/templates";
import type { ReorderTasksInput } from "@/types/template";

import { useInvalidateTemplates } from "./use-invalidate-templates";

export function useReorderTasksMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: (input: ReorderTasksInput) => reorderTasks(templateId, input),
    onSuccess: () => invalidate(),
  });
}
