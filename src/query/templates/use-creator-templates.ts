import { queryOptions, useQuery } from "@tanstack/react-query";

import { listTemplatesByCreator } from "@/lib/functions/templates";
import { templateKeys } from "@/query/keys/templates";

export function creatorTemplatesQueryOptions(creatorId: string) {
  return queryOptions({
    queryKey: templateKeys.byCreator(creatorId),
    queryFn: () => listTemplatesByCreator(creatorId),
  });
}

export function useCreatorTemplatesQuery(creatorId: string, enabled: boolean) {
  return useQuery({
    ...creatorTemplatesQueryOptions(creatorId),
    enabled: enabled && Boolean(creatorId),
  });
}
