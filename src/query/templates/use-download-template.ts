import { useMutation, useQueryClient } from "@tanstack/react-query";

import { downloadTemplate } from "@/lib/api/templates";
import { templateKeys } from "@/query/keys/templates";
import type { PublicTemplateDetail, PurposeTemplateDetail } from "@/types/template";

import { useInvalidateTemplates } from "./use-invalidate-templates";

export function useDownloadTemplateMutation(templateId: string) {
  const queryClient = useQueryClient();
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: () => downloadTemplate(templateId),
    onSuccess: async (next) => {
      queryClient.setQueryData(
        templateKeys.detail(templateId),
        (current: PurposeTemplateDetail | undefined) =>
          current ?
            {
              ...current,
              addedToApp: true,
              downloaderUids: next.downloaderUids,
            } :
            current,
      );
      queryClient.setQueriesData(
        { queryKey: templateKeys.publicDetail(templateId) },
        (current: PublicTemplateDetail | undefined) =>
          current ?
            {
              ...current,
              addedToApp: true,
              downloaderUids: next.downloaderUids,
            } :
            current,
      );
      await invalidate();
    },
  });
}
