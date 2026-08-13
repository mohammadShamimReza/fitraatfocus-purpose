import { useMutation } from "@tanstack/react-query";

import { publishTemplate } from "@/lib/functions/templates";

import { useInvalidateTemplates } from "./use-invalidate-templates";

export function usePublishTemplateMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: () => publishTemplate(templateId),
    onSuccess: () => invalidate(),
  });
}
