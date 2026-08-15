import { queryOptions, useQuery } from "@tanstack/react-query";

import { getTemplate } from "@/lib/api/templates";
import { templateKeys } from "@/query/keys/templates";

export function templateQueryOptions(templateId: string) {
  return queryOptions({
    queryKey: templateKeys.detail(templateId),
    queryFn: () => getTemplate(templateId),
  });
}

export function useTemplateQuery(templateId: string, enabled: boolean) {
  return useQuery({
    ...templateQueryOptions(templateId),
    enabled: enabled && Boolean(templateId),
  });
}
