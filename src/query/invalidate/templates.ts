import type { QueryClient } from "@tanstack/react-query";

import { templateKeys } from "@/query/keys/templates";

export async function invalidateTemplateQueries(queryClient: QueryClient, templateId?: string): Promise<void> {
  await queryClient.invalidateQueries({ queryKey: templateKeys.all });

  if (templateId) {
    await queryClient.invalidateQueries({ queryKey: templateKeys.detail(templateId) });
    await queryClient.invalidateQueries({ queryKey: templateKeys.publicDetail(templateId) });
  }
}
