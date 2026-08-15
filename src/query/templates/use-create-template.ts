import { useMutation } from "@tanstack/react-query";

import { createTemplate } from "@/lib/api/templates";
import type { CreateTemplateInput } from "@/types/template";

import { useInvalidateTemplates } from "./use-invalidate-templates";

export function useCreateTemplateMutation() {
  const invalidate = useInvalidateTemplates();

  return useMutation({
    mutationFn: (input: CreateTemplateInput) => createTemplate(input),
    onSuccess: () => invalidate(),
  });
}
