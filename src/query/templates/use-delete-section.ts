import { useMutation } from "@tanstack/react-query";

import { deleteSection } from "@/lib/api/templates";

import { useInvalidateTemplates } from "./use-invalidate-templates";

export function useDeleteSectionMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: (sectionId: string) => deleteSection(templateId, sectionId),
    onSuccess: () => invalidate(),
  });
}
