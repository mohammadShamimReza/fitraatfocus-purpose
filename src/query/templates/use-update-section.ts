import { useMutation } from "@tanstack/react-query";

import { updateSection } from "@/lib/functions/templates";
import type { UpdateSectionInput } from "@/types/template";

import { useInvalidateTemplates } from "./use-invalidate-templates";

export function useUpdateSectionMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: ({ sectionId, input }: { sectionId: string; input: UpdateSectionInput }) =>
      updateSection(templateId, sectionId, input),
    onSuccess: () => invalidate(),
  });
}
