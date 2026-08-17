import { useMutation } from "@tanstack/react-query";

import { deleteTemplate } from "@/lib/api/templates";
import { deleteStorageFile } from "@/lib/firebase/storage";

import { useInvalidateTemplates } from "./use-invalidate-templates";

export function useDeleteTemplateMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: async (storagePath?: string) => {
      await deleteTemplate(templateId);
      if (storagePath) {
        await deleteStorageFile(storagePath);
      }
    },
    onSuccess: () => invalidate(),
  });
}
