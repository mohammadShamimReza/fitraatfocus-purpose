import { useMutation } from "@tanstack/react-query";

import { createSection } from "@/lib/api/templates";
import type { CreateSectionInput } from "@/types/template";

import { useInvalidateTemplates } from "./use-invalidate-templates";

export function useCreateSectionMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: (input: CreateSectionInput) => createSection(templateId, input),
    onSuccess: () => invalidate(),
  });
}
