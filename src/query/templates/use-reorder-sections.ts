import { useMutation } from "@tanstack/react-query";

import { reorderSections } from "@/lib/functions/templates";
import type { ReorderSectionsInput } from "@/types/template";

import { useInvalidateTemplates } from "./use-invalidate-templates";

export function useReorderSectionsMutation(templateId: string) {
  const invalidate = useInvalidateTemplates(templateId);

  return useMutation({
    mutationFn: (input: ReorderSectionsInput) => reorderSections(templateId, input),
    onSuccess: () => invalidate(),
  });
}
