export const queryKeys = {
  templates: {
    all: ["templates"] as const,
    mine: () => [...queryKeys.templates.all, "mine"] as const,
    detail: (templateId: string) => [...queryKeys.templates.all, "detail", templateId] as const,
  },
};
