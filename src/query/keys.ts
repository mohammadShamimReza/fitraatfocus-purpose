export const queryKeys = {
  templates: {
    all: ["templates"] as const,
    public: () => [...queryKeys.templates.all, "public"] as const,
    mine: () => [...queryKeys.templates.all, "mine"] as const,
    detail: (templateId: string) => [...queryKeys.templates.all, "detail", templateId] as const,
    publicDetail: (templateId: string) => [...queryKeys.templates.all, "public", templateId] as const,
  },
  profiles: {
    all: ["profiles"] as const,
    me: () => [...queryKeys.profiles.all, "me"] as const,
    detail: (uid: string) => [...queryKeys.profiles.all, "detail", uid] as const,
  },
};
