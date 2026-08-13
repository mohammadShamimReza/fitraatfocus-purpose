import { queryOptions, useQuery } from "@tanstack/react-query";

import { getPublicTemplate } from "@/lib/functions/templates";
import { templateKeys } from "@/query/keys/templates";

export function publicTemplateQueryOptions(templateId: string) {
  return queryOptions({
    queryKey: templateKeys.publicDetail(templateId),
    queryFn: () => getPublicTemplate(templateId),
  });
}

export function usePublicTemplateQuery(templateId: string, enabled: boolean) {
  return useQuery({
    ...publicTemplateQueryOptions(templateId),
    enabled: enabled && Boolean(templateId),
  });
}
