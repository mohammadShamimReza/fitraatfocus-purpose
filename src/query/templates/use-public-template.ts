import { queryOptions, useQuery } from "@tanstack/react-query";

import { getPublicTemplate } from "@/lib/api/templates";
import { templateKeys } from "@/query/keys/templates";

export function publicTemplateQueryOptions(
  templateId: string,
  viewerUid?: string | null,
) {
  return queryOptions({
    queryKey: templateKeys.publicDetail(templateId, viewerUid),
    queryFn: () => getPublicTemplate(templateId),
  });
}

export function usePublicTemplateQuery(
  templateId: string,
  enabled: boolean,
  viewerUid?: string | null,
) {
  return useQuery({
    ...publicTemplateQueryOptions(templateId, viewerUid),
    enabled: enabled && Boolean(templateId),
  });
}
