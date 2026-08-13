import { useMutation } from "@tanstack/react-query";

import { downloadTemplate } from "@/lib/functions/templates";

import { useInvalidateTemplates } from "./use-invalidate-templates";

export function useDownloadTemplateMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: () => downloadTemplate(templateId),
    onSuccess: () => invalidate(),
  });
}
