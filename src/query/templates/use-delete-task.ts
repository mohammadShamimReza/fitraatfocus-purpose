import { useMutation } from "@tanstack/react-query";

import { deleteTask } from "@/lib/functions/templates";

import { useInvalidateTemplates } from "./use-invalidate-templates";

export function useDeleteTaskMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(templateId, taskId),
    onSuccess: () => invalidate(),
  });
}
