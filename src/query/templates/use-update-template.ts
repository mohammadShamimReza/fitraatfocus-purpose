import { useMutation } from "@tanstack/react-query";

import { updateTemplate } from "@/lib/functions/templates";
import type { UpdateTemplateInput } from "@/types/template";

import { useInvalidateTemplates } from "./use-invalidate-templates";

export function useUpdateTemplateMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: (input: UpdateTemplateInput) => updateTemplate(templateId, input),
    onSuccess: () => invalidate(),
  });
}
