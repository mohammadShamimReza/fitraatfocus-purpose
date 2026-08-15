import { useMutation } from "@tanstack/react-query";

import { updateTask } from "@/lib/api/templates";
import type { UpdateTaskInput } from "@/types/template";

import { useInvalidateTemplates } from "./use-invalidate-templates";

export function useUpdateTaskMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: ({ taskId, input }: { taskId: string; input: UpdateTaskInput }) =>
      updateTask(templateId, taskId, input),
    onSuccess: () => invalidate(),
  });
}
