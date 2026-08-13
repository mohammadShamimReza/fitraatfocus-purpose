import { useQueryClient } from "@tanstack/react-query";

import { invalidateTemplateQueries } from "@/query/invalidate/templates";

export function useInvalidateTemplates(templateId?: string) {
  const queryClient = useQueryClient();

  return () => invalidateTemplateQueries(queryClient, templateId);
}
